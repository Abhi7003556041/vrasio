import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Pressable, Dimensions, TouchableOpacity, Platform, ScrollView,
  Animated, PermissionsAndroid, RefreshControl, Alert,
} from 'react-native';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import NavigationService from '../../Services/Navigation';
import { ImageBackground } from 'react-native';
import { Image } from 'react-native';
import Theme from '../../Constants/Theme';
import { AppTextInput, Icon, StatusBar } from 'react-native-basic-elements';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SearchIcon from '../../assets/icons/SearchIcon';
import FilterIcon from '../../assets/icons/FilterIcon';
import MapView, { Marker } from 'react-native-maps';
import BottomSheett from '../../Components/BottomSheet/BottomSheet,';
import ReactNativeModal from 'react-native-modal';
import MapModView from '../../Components/Map/MapView';
// import BottomSheett from "react-native-simple-bottom-sheet";
import { moderateScale } from '../../Constants/PixelRatio';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useLayoutEffect } from 'react';
import RedHeartIcon from '../../assets/icons/RedHeartIcon';
import FavouriteIcon from '../../assets/icons/favouriteIcon';
import MapToggleIcon from '../../assets/icons/MapToggleIcon';
import { Easing } from 'react-native';
import RangeSliderWithDynamicHistogram from '../../Components/Slider/SliderHistogram';
import Caleder from '../../assets/icons/Caleder';
import TravelIcon from '../../assets/icons/TravelIcon';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { postApi } from '../../Services/Service';
import HelperFunctions from '../../Constants/HelperFunctions';
import { setFavouriteList, setTotalFavourite } from '../../Store/Reducers/CommonReducer';
import { setHostStatus, setUserDetails } from '../../Store/Reducers/AuthReducer';
import { setData } from '../../Services/LocalStorage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import CalendarPicker from "react-native-calendar-picker";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import moment from 'moment';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


// import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
const { width, height } = Dimensions.get('window');

const HomePage = (props) => {

  const { login_status, userDetails, token } = useSelector(state => state.authData);
  const { dashboardDetails, currencyDetails, favouriteList } = useSelector(state => state.commonData);
  const dispatch = useDispatch()
  // Access the customProp passed from the source screen
  const Heigth = useRef(new Animated.Value(0)).current
  const opacit = useRef(new Animated.Value(0).current)
  const [searchLoc, setSearchLoc] = useState({})
  const [searchLocAddress, setSearchLocAddress] = useState(null)

  const [countryList, setCountryList] = useState([])
  const [loading, setLoading] = useState(false)
  const [suggestionsList, setSuggestionsList] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [countrySelect, setCountrySelect] = useState(false)
  const searchRef = useRef(null)
  const dropdownController = useRef(null)


  const [propertyIndex, setpropertyIndex] = useState([])

  const [loadingState, changeloadingState] = useState(true);
  const [refreshing, setrefreshing] = useState(false);

  const [Loading, changeLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [selectedProperty, setSelectedProperty] = useState(null);
  var nextDay = new Date();
  const [selected1, setSelected1] = useState(new Date());
  // nextDay.setDate(new Date().getDate() + 1);
  const [checkout, setCheckout] = useState(null)
  const [ModalState, setModalState] = useState(false)
  const [FilterModal, setFilterModal] = useState(false)
  const [GoModal, setGoModal] = useState(false)
  const [search, setSearch] = useState('')
  const [loadMore, setLoadMore] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [sceneview, setSceneview] = useState([selected]);
  const [Property, setProperty] = useState([]);
  const [hgt, setHgt] = useState(100);
  const fref = useRef(0);
  const [Index, setIndex] = useState(0);
  const [cat, setCat] = useState(null);
  const bottomSheet = useRef();
  const tabBarHeight = useBottomTabBarHeight();
  const [allProperty, setAllProperty] = useState([]);
  const [allType, setAllType] = useState([
    'Any','Shared Room','Entire Place',
  ]);
  const [RoomType, setRoomType] = useState(null);

  const [currency, setCurrency] = useState(currencyDetails.id ?? 1)
  const [tabData, setTabData] = useState([
    {}, {}, {}, {}, {}, {}, {},
  ])
  const [amenities, setAmenities] = useState([])
  const [host_language, sethost_language] = useState([])
  const [roomswithvalue, setroomswithvalue] = useState([])
  const [minprice, setMinprice] = useState(0)
  const [maxprice, setmaxprice] = useState(10000)
  const [room, setRoom] = useState([])
  const [aminity, setAminity] = useState([])
  const [aminityIndex, setAminityIndex] = useState([])
  const [open, setOpen] = useState(false)
  const [adult, setAdult] = useState(1)
  const [Child, setChild] = useState(0)
  const [Loder, setLoader] = useState(false);

  const [Infants, setInfants] = useState(0)
  const [Pets, setPets] = useState(0)
  const [ModalState1, setModalState1] = useState(false)
  const [ModalState2, setModalState2] = useState(false)
  const minDate = new Date(); // Today

  const [hotelData, sethotelData] = useState([

  ])
  // { name: 'Barn in Palisade', details: 'Beautiful Vineyard Barn House', price: "$80/night", Img: require("../../assets/images/beach.png") },
  //   { name: 'Barn in Palisade', details: 'Beautiful Vineyard Barn House', price: "$80/night", Img: require("../../assets/images/pexels.png") },
  //   { name: 'Barn in Palisade', details: 'Beautiful Vineyard Barn House', price: "$80/night", Img: require("../../assets/images/beach.png") },
  const getSuggestions = useCallback(async q => {

    const filterToken = q.toLowerCase()
    console.log('getSuggestions', q[1])
    if (typeof q !== 'string' || q.length < 1 || q === '' || q == ' ') {
      setSuggestionsList(countryList)

    }
    else if (q.length > 0) {
      console.log('resdpospdosd', countryList)
      // const items =  countryList
      const suggestions = countryList
        .filter(item => item.name.toLowerCase().includes(filterToken))
        .map(item => ({
          _id: item.id,
          name: item.name,
        }))
      setSuggestionsList(suggestions)
      // setUserLoader(false)
    }

  }, [countryList])
  const handleAddTag = (val) => {
    if (val.name.trim() !== '') {

      setSelectedItem(val)
      setCountrySelect(true);
      setSuggestionsList(countryList)
      setSearch("")
    }
  };
  const onClearPress = useCallback(() => {
    setSuggestionsList(null)
  }, [])

  const onOpenSuggestionsList = useCallback(isOpened => { }, [])
  const getAllCountry = () => {
    let data = {
      "type": "country"
    }
    changeLoading(true)
    console.log('masterdatalistdata>>', data)
    changeLoading(true)
    postApi("api/masterdatalist", data, token).then(response => {
      // console.log('getAllProperty>>>>>>>>>>', response)
      if (response?.status) {
        // console.log('getAllCountry>>fjkwhsdkfjhskjd>>>>>>>>', JSON.stringify(response.data))
        changeLoading(false)
        setCountryList(response?.data)
        setSuggestionsList(response?.data)

      } else {
        HelperFunctions.showLongToastMsg(response?.message)
        setCountryList([])
      }
    }).catch(error => {
      HelperFunctions.showToastMsg(error?.message)
      changeLoading(false)

    }).finally(() => {
      changeLoading(false)

    })
  }
  const onDateChange = (date, type) => {
    const newDate = JSON.stringify(date)
    const newDate1 = newDate.substring(1, newDate.length - 1)
    const dates = newDate1.split("T")
    const date1 = dates[0].split("-")
    const day = date1[2]
    const month = date1[1]
    const year = date1[0]
    console.log(type)
    if (type === "END_DATE") {
      if (day == undefined) {
        setCheckout(new Date())
        // console.log('ddayad',day)
      }
      else if (selected1 == newDate1) {
        HelperFunctions.showToastMsg("Checkin &  Checkout date should not be same")
      }
      else {
        setCheckout(newDate1)
        setTimeout(() => {

          setOpen(false)
        }, 500)
      }

    } else {
      setSelected1(newDate1)
      setCheckout(null)

    }
  }
  const getProfile = () => {
    let data = {
      "type": "fetch"
    }
    // changeLoading(true)
    // console.log('masterdatalistdata>>', data)
    // changeLoading(true)
    postApi("api/profiledata", data, token).then(response => {
      console.log('getProfilelel>>4444', response)
      if (response?.status) {
        // console.log('getProfilelel>>4444', JSON.stringify(response.data))
        // changeLoading(false)
        storeToLocalAndRedux(response)

      } else {
        HelperFunctions.showLongToastMsg(response?.message)
        // setCountryList([])
      }
    }).catch(error => {
      HelperFunctions.showToastMsg(error?.message)
      // changeLoading(false)

    }).finally(() => {
      // changeLoading(false)

    })
  }
  const storeToLocalAndRedux = (userDataa) => {
    console.log('userDataa', userDataa?.data)

    setData('account', userDataa?.data)

    dispatch(setUserDetails(userDataa?.data))

  }
  const whereToGo = () => {
    let data = {
      page: 1,
      "scenicview": [selected],
      "property_type": Property,
      "currency_id": currencyDetails.id ?? 1,
      "userid": userDetails.id,
      "where": searchLocAddress,
      "latitude": searchLoc?.lat ?? null,
      "longitude": searchLoc?.lng ?? null,
      "startdate": selected1 != null ? moment(selected1).format("YYYY-MM-DD") : null,
      "enddate": checkout != null ? moment(checkout).format("YYYY-MM-DD") : null,
      "guests": Number(adult + Child + Infants + Pets) > 0 ? adult + Child + Infants + Pets : null
    }
    console.log('data', data)
    changeLoading(true)

    // setHasMore(true)
    // setSelected(iddd)
    setPage(1)
    setHasMore(false)
    postApi("api/propertylist", data, token).then(response => {
      console.log('whereToGo>>>>>>>>>>', JSON.stringify(response?.data?.data))

      if (response?.status) {
        setrefreshing(false)
        if (response?.data?.data.length > 0) {
          sethotelData(response.data.data)
          setHasMore(true)


          setPage(2);
          setGoModal(false)
          setSelected1(new Date())
          setCheckout(null)
          setAdult(1)
          setChild(0)
          setInfants(0)
          setPets(0)
          setSearchLoc({})
          setSearchLocAddress(null)
        }
        else {
          HelperFunctions.showLongToastMsg('No Data found')
          setGoModal(false)
        }

      } else {
        setLoadMore(false);

      }
      changeLoading(false)
    }).catch(error => {
      setLoadMore(false);
      HelperFunctions.showToastMsg(error?.message)
      changeLoading(false)
    }).finally(() => {
      setLoadMore(false);
    })
  }
  const getAllHotel = (iddd, properti, pge) => {
    let data = {
      page: 1,
      "scenicview": [iddd],
      "property_type": Property,
      "currency_id": currencyDetails.id ?? 1,
      "userid": userDetails.id,
      amenities: aminityIndex,
      host_language: host_language,
      min_price: minprice,
      max_price: maxprice,
      roomswithvalue: room,
      "offers":RoomType
    }
    console.log('datagetAllPlan>>>>>>>>>', data)
    changeLoading(true)
    // setHasMore(true)
    setSelected(iddd)
    // setSelectedProperty(properti)
    setPage(1)
    setHasMore(false)
    postApi("api/propertylist", data, token).then(response => {
      // console.log('getAllPlan>>>>>>>>>>', response)
      if (response?.status) {
        console.log('getAllPlan>>>>>>>>>>', JSON.stringify(response.data.data))
        changeLoading(false)
        if (response?.data?.data.length > 0) {

          sethotelData(response.data.data)
          setPage(pge + 1);
          setHasMore(true)
          getAllCountry()
        }
      } else {
        setLoadMore(false);
        HelperFunctions.showToastMsg("No data found")


      }
    }).catch(error => {
      setLoadMore(false);
      HelperFunctions.showToastMsg(error?.message)
      changeLoading(false)

    }).finally(() => {
      setLoadMore(false);
      changeLoading(false)

    })
  }
  const getAllHotelReset = (iddd, properti, pge) => {
    let data = {
      page: 1,
      "scenicview": [iddd],
      "property_type": [],
      "currency_id": currencyDetails.id ,
      "userid": userDetails.id,
      amenities: [],
      host_language: host_language,
      min_price: 0,
      max_price: 10000,
      roomswithvalue: [],
      "offers":''
    }
    console.log('datagetAllPlan>>>>>>>>>', data)
    changeLoading(true)
    // setHasMore(true)
    setSelected(iddd)
    // setSelectedProperty(properti)
    setPage(1)
    setHasMore(false)
    postApi("api/propertylist", data, token).then(response => {
      // console.log('getAllPlan>>>>>>>>>>', response)
      if (response?.status) {
        console.log('getAllPlan>>>>>>>>>>', JSON.stringify(response.data.data))
        changeLoading(false)
        if (response?.data?.data.length > 0) {

          sethotelData(response.data.data)
          setPage(pge + 1);
          setHasMore(true)
          getAllCountry()
        }
      } else {
        setLoadMore(false);



      }
    }).catch(error => {
      setLoadMore(false);
      HelperFunctions.showToastMsg(error?.message)
      changeLoading(false)

    }).finally(() => {
      setLoadMore(false);
      changeLoading(false)

    })
  }

  const getAllPlanRefress = () => {
    // setIndex(0)
    let data = {
      page: 1,
      "scenicview": [selected],
      "property_type": Property,
      "currency_id": currencyDetails.id ?? 1,
      "userid": userDetails.id,
      amenities: aminityIndex,
      host_language: host_language,
      min_price: minprice,
      max_price: maxprice,
      roomswithvalue: room
    }
    console.log('getAllPlanRefressDatatata', data)
    setrefreshing(true)
    // setHasMore(true)
    // setSelected(iddd)
    setPage(1)
    setHasMore(false)
    postApi("api/propertylist", data, token).then(response => {
      // console.log('getAllPlanRefress>>>>>>>>>>',JSON.stringify(response.data.data))
      if (response?.status) {
        setrefreshing(false)
        if (response?.data?.data.length > 0) {
          sethotelData(response.data.data)
          setHasMore(true)
          setPage(2);
        }
      } else {
        setLoadMore(false);
      }
    }).catch(error => {
      setLoadMore(false);
      HelperFunctions.showToastMsg(error?.message)

    }).finally(() => {
      setLoadMore(false);
    })
  }
  const getAllDetails = () => {
    let data = {
      "type": "all"
    }
    // console.log('masterdatalistdata>>', data)
    changeLoading(true)
    postApi("api/masterdatalist", data, token).then(response => {
      // console.log('masterdatalist>>>>>>>>>>', response)
      if (response?.status) {
        console.log('masterdatalist>>fjkwhsdkfjhskjd>>>>>>>>', JSON.stringify(response.data))
        changeLoading(false)
        setTabData(response?.data?.sceneview)
        setAmenities(response?.data?.amenities)
        setroomswithvalue(response?.data?.rooms)
        setAllProperty(response?.data?.propertytype)
        getAllHotel(response?.data?.sceneview[0]?.id, [], 1)
      } else {
        // setTabData([])
      }
    }).catch(error => {
      HelperFunctions.showToastMsg(error?.message)
      // changeLoading(false)

    }).finally(() => {
      // changeLoading(false)

    })

  }
  const getAllScenenicview = () => {
    let data = {
      "type": "sceneview"
    }
    console.log('masterdatalistdata>>', data)
    changeLoading(true)
    postApi("api/masterdatalist", data, token).then(response => {
      // console.log('masterdatalist>>>>>>>>>>', response)
      if (response?.status) {
        // console.log('masterdatalist>>fjkwhsdkfjhskjd>>>>>>>>', JSON.stringify(response.data))
        // changeLoading(false)
        setTabData(response?.data)

        getAllHotel(response?.data[0]?.id, [], 1)
      } else {
        setTabData([])
      }
    }).catch(error => {
      HelperFunctions.showToastMsg(error?.message)
      // changeLoading(false)

    }).finally(() => {
      // changeLoading(false)

    })
  }
  const getAllProperty = () => {
    let data = {
      "type": "propertytype"
    }
    console.log('masterdatalistdata>>', data)
    changeLoading(true)
    postApi("api/masterdatalist", data, token).then(response => {
      // console.log('getAllProperty>>>>>>>>>>', response)
      if (response?.status) {
        // console.log('getAllProperty>>fjkwhsdkfjhskjd>>>>>>>>', JSON.stringify(response.data))
        // changeLoading(false)
        setAllProperty(response?.data)


      } else {
        setAllProperty([])
      }
    }).catch(error => {
      HelperFunctions.showToastMsg(error?.message)
      // changeLoading(false)

    }).finally(() => {
      // changeLoading(false)

    })
  }


  const getPagewiseHotel = () => {
    let data = {
      page: page,
      "scenicview": sceneview,
      "property_type": Property,
      "currency_id": currencyDetails.id ?? 1,
      "userid": userDetails.id,
      amenities: aminityIndex,
      host_language: host_language,
      min_price: minprice,
      max_price: maxprice,
      roomswithvalue: room
    }
    console.log('datagetPagewisePldfdsfan', data)

    postApi("api/propertylist", data, token).then(response => {
      // console.log('getPagewisePlan>>>>>>>>>>',response)
      if (response?.status) {
        // console.log('getPagewisePlanlesfsdhfljhdfs;n>>>>>>>>>>', response.data.data)
        // Alert.alert('sdfkjdfs')
        if (response?.data?.data.length > 0) {
          sethotelData([...hotelData, ...response.data.data])
          setPage(page + 1);

        } else {
          setHasMore(false);
          setLoadMore(false);
        }

      } else {
        setLoadMore(false);
      }
    }).catch(error => {
      setLoadMore(false);
      HelperFunctions.showToastMsg(error?.message)

    }).finally(() => {
      setLoadMore(false);
    })
  }
  const addToFavourites = (val) => {
    let data = {
      propertySlug: val?.slug
    }
    console.log('addToFavourites', data)
    dispatch(setFavouriteList(val))
    postApi("api/addtofav", data, token).then(response => {
      // console.log('getPagewisePlan>>>>>>>>>>',response)
      if (response?.status) {
        console.log('addToFavourites;n>>>>>>>>>>', response.data)
        // HelperFunctions.showToastMsg(response?.message)


      } else {
        HelperFunctions.showToastMsg(response?.message)
      }
    }).catch(error => {
      // setLoadMore(false);
      HelperFunctions.showToastMsg(error?.message)

    }).finally(() => {
      // setLoadMore(false);
    })
  }

  const getNextData = () => {
    if (hasMore) {
      // getFilterData();
      getPagewiseHotel()
    }
  };
  const listFooter = () => {
    return (
      <View style={{}}>
        {hasMore ? (
          <View style={{}}>

            {/* <Lottie style={{width:90,aspectRatio:1 }} source={require('../../assets/icons/loading.json')} autoPlay loop /> */}
            <ActivityIndicator size={'small'} color={'#000'} />

            {/* <Lottie style={{width:90,aspectRatio:1 }} source={require('../../assets/icons/new_loading.json')} autoPlay loop /> */}

          </View>
        ) : null}
      </View>
    );
  };
  const handleRefresh = () => {
    setrefreshing(true);
    setPage(1);
    setHasMore(true)
    // getAllPlanRefress()
    // getAllPostRefress();
    // console.log('called=>>>');

    getAllPlanRefress()

    // setTimeout(() => {
    //   setrefreshing(false);
    // }, 1000);

    // console.log(UserData)
  };

  const fetchFavouriteList = () => {

    postApi("api/favlist", "", token).then(response => {
      // console.log('getPagewisePlan>>>>>>>>>>',response)
      if (response?.status) {
        console.log('fetchFavouriteList;n>>>>>>>>>>', JSON.stringify(response.data.data))
        // HelperFunctions.showToastMsg(response?.message)
        dispatch(setTotalFavourite(response.data.data))

      } else {
        HelperFunctions.showToastMsg(response?.message)
      }
    }).catch(error => {
      // setLoadMore(false);
      HelperFunctions.showToastMsg(error?.message)

    }).finally(() => {
      // setLoadMore(false);
    })
  }
  useEffect(() => {

    if (fref.current) {
      fref.current.scrollToIndex({
        index: Index,
        animated: true,
      })
    }

  }, [Index])
  useLayoutEffect(() => {
    props.navigation.setOptions({
      tabBarStyle: [{
        display: !ModalState ? '' : 'none', height: !ModalState ? 70 : 0,
        paddingBottom: Platform.OS === 'ios' ? 15 : 10,
      }],
      tabBarHideOnKeyboard: !ModalState,
    });
  }, [ModalState]);
  useEffect(() => {
    // getAllHotel()
    getAllDetails()


    // setPage(1)
  }, [])
  useEffect(() => {
    login_status ? getProfile() : null
    // login_status ? fetchFavouriteList() : null

    // fetchFavouriteList()
    // searchRef.current.blur()

  }, [])
  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: '#356BB5' }}
      showLoading={Loading}
      // isScrollable={true}
      Home
    >


      {console.log('currencyycyc', roomswithvalue)}

      <Pressable
        onPress={() => searchRef.current.blur()}
        style={{
          height: 72,
          width: width,
          backgroundColor: '#356BB5',
          paddingHorizontal: 20
        }}>
        <Pressable style={{
          height: 60,
          backgroundColor: '#fff',
          borderRadius: 7,
          padding: 11,
          // paddingHorizontal:10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <TouchableOpacity
            onPress={() => {
              setGoModal(!GoModal)

            }}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable style={{ marginHorizontal: 5 }}>
              <SearchIcon />
            </Pressable>
            <View style={{ marginHorizontal: 10 }} >
              <Text style={{ color: '#000', fontSize: 14, fontFamily: Theme.FontFamily.bold }}>Where</Text>
              <Text style={{ marginTop: 3, color: '#747A82', fontSize: 12, fontFamily: Theme.FontFamily.normal }}>Search destination</Text>

            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 0 }}>
            <TouchableOpacity
              onPress={() => setFilterModal(!FilterModal)}

              style={{
                height: 32, width: 32, borderRadius: 5, backgroundColor: "#000000", alignItems: 'center', justifyContent: 'center',
              }}>
              <FilterIcon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setAminity([])
                setAminityIndex([])
                setRoom([])
                setpropertyIndex([])
                setProperty([])
                setMinprice(0)
                setmaxprice(10000)
                setSelected1(new Date())
                setCheckout(null)
                setAdult(1)
                setChild(0)
                setInfants(0)
                setPets(0)
                setRoomType('')
                getAllHotelReset(selected, [], 1)

              }}

              style={{
                height: 32, width: 32, borderRadius: 5, backgroundColor: "#fff", alignItems: 'center', justifyContent: 'center', marginLeft: 15
              }}>
              <Icon
                name='reload-circle'
                type='Ionicons'
                size={32}
                color={'#000'}
              />
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>

      <View >
        <FlatList
          data={tabData}
          ref={fref}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          // style={{ backgroundColor: '#fff', position: Platform.OS === 'android' ? 'absolute' : 'relative', top: 0, right: 0, zIndex: 999999999, }}
          // removeClippedSubviews={true}
          // showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 0, height: 60, paddingBottom: 0,
          }}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={() => {
                  // fref.scrollToIndex(index);
                  getAllHotel(item?.id, [], 1)
                  setIndex(index)

                }}
                style={{
                  flexDirection: 'row', alignItems: 'center', marginLeft: 15, paddingVertical: 15,
                  borderBottomColor: '#000000', borderBottomWidth: !Loading && Index == index ? 1.8 : 0,
                  backgroundColor: !Loading && Index == index ? "#F9F6F6" : '#fff',
                  paddingHorizontal: 10
                  // elevation:5
                }}>
                {/* {console.log('idd',item?.id)} */}
                <Image
                  source={{ uri: item?.logowithpath }}
                  resizeMode='cover'
                  style={{
                    height: 32, width: 32, borderRadius: 5
                  }}
                />
                <Text style={{ color: '#000', fontSize: 15, marginLeft: 12,fontFamily:Theme.FontFamily.bold }}>{item?.title}</Text>
              </Pressable>
            )
          }}
        />
      </View>
      {console.log('height', height)}

      <MapModView allHotel={hotelData} inputRef={bottomSheet} func={() => setModalState(!ModalState)} />
      <BottomSheett
        func={(val) => setModalState(val)}
        isOpen={true}
        outerContentStyle={{ borderRadius: 20 }}
        lineContainerStyle={{ marginBottom: ModalState ? 60 : -5 }}
        // isPanelVisible
        animationDuration={300}
        ref={bottomSheet}
        sliderMaxHeight={Platform.OS === 'ios' ? height < 700 ? 375 : height < 800 ? 500 : height < 850 ? 520 : height < 900 ? 560 :
          height < 950 ? 640 : height < 1000 ? 700 : height < 1150 ? 850 : height < 1190 ? 890 : height < 1250 ? 940 : height < 1350 ? 990 : height < 1400 ? 1070 : 520 :
          Platform.OS === 'android' ? height < 700 ? 411 : height < 810 ? 540 : height < 850 ? 570 : height < 920 ? 600 : height < 1000 ? 650 : 630 : 588}
        innerContentStyle={{
          marginHorizontal: -20.58, marginTop: -10, borderRadius: 0, alignSelf: 'center',
          height: Loading ? Platform.OS === 'ios' ? height < 700 ? 375 : height < 800 ? 500 : height < 850 ? 520 : height < 900 ? 560 :
            height < 950 ? 640 : height < 1000 ? 700 : height < 1150 ? 850 : height < 1190 ? 890 : height < 1250 ? 940 : height < 1350 ? 990 : height < 1400 ? 1070 : 520 :
            Platform.OS === 'android' ? height < 700 ? 411 : height < 850 ? 570 : height < 920 ? 600 : height < 1000 ? 650 : 630 : 588
            : null
        }}
      >
        {
          // console.log('bottomSheet',bottomSheet.current.state.isPanelOpened)
        }
        {/* <KeyboardAwareScrollView contentContainerStyle={{flex:1}} > */}
        <FlatList
          data={hotelData}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={getNextData}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                // setPage(1)
                handleRefresh();
              }}
            />
          }
          // horizontal
          onEndReachedThreshold={0.5}
          ListFooterComponent={listFooter}
          // ListFooterComponentStyle={{height:50,width:50,backgroundColor:'rgba(0,0,0,0.2)',borderRadius:10,
          // alignSelf:'center',alignItems:'center',justifyContent:'center'}}
          contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 0, marginBottom: 10, paddingBottom: 110 }}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={() => NavigationService.navigate('FavouriteDetails', { slug: item?.slug })}
                key={index} style={{
                  // height:365 + 85,
                  // marginVertical:5,
                  // borderRadius: 10,
                  // overflow: 'visible',
                  marginBottom: 25,
                  marginHorizontal: 20
                  // backgroundColor:'red'
                }}>

                <Image
                  source={{ uri: item?.coverimage }}
                  // resizeMode='contain'
                  style={{
                    height: 365, width: width - 40, borderRadius: 10
                  }}
                />
                {login_status ?
                  <TouchableOpacity onPress={() => { addToFavourites(item) }} style={{
                    position: 'absolute', top: 10, right: 10,
                    paddingVertical: 3, paddingHorizontal: 2.2, height: 30, width: 30, borderRadius: 20
                  }}>
                    {favouriteList.find((favourite) => favourite.slug == item?.slug) ? <RedHeartIcon
                      Color={favouriteList.find((favourite) => favourite.slug == item?.slug) ? "#ED4040" :
                        "rgba(0,0,0,0.3)"}
                    /> :
                      <FavouriteIcon />
                    }
                  </TouchableOpacity> : null
                }
                <View style={{ marginTop: Platform.OS === 'ios' ? 5 : 5, paddingHorizontal: 2 }}>
                  <Text style={{ color: '#000', fontSize: 20, fontFamily: Theme.FontFamily.bold, }}>{item?.title}</Text>
                  <Text
                    numberOfLines={1}
                    style={{ color: '#747A82', fontSize: 15,fontWeight:'600',marginTop:Platform.OS === 'ios' ? 0 : -5 }}>{item?.description}</Text>
                  <Text style={{ color: '#000', fontSize: 16.5, fontFamily: Theme.FontFamily.semiBold, marginTop: Platform.OS === 'ios' ? 4 : 3 }}>
                    {item?.currency_symbol} {(item.average_price)}/night </Text>
                </View>

              </Pressable>
            )
          }}
        />

        {!Loading ?
          <Pressable
            onPress={() => {
              bottomSheet.current.togglePanel()
              setModalState(!ModalState)

            }}
            style={{
              height: 48, width: 48, borderRadius: 48, backgroundColor: '#000',
              position: 'absolute', bottom: '25%', right: 25, alignItems: 'center', justifyContent: 'center',
            }}>
            <MapToggleIcon />
          </Pressable>
          : null
        }
        {/* </BottomSheet> */}
      </BottomSheett>

      <ReactNativeModal
        isVisible={FilterModal}
        // backdropColor={'rgba(228, 14, 104, 1)'}
        backdropOpacity={0.3}
        style={{
          margin: 0,
          padding: 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        // animationIn={'zoomInDown'}
        // animationOut={'zoomOut'}
        onBackButtonPress={() => {
          //   setPlay(false)
          setFilterModal(false)
        }
        }
        onBackdropPress={() => {
          //   setPlay(false)
          setFilterModal(false)
        }}>
        <View
          style={{
            width: width,
            height: height / 1.2,
            backgroundColor: '#fff',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            // overflow:'visible',
            // alignItems: 'center',
            paddingHorizontal: 15,
            // paddingHorizontal:25
            // justifyContent:'center',
            // paddingHorizontal: 10,
          }}>
          {/* <MapModView/> */}
          <View style={[styles.line]} />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 105 }}>
            <Text style={{ fontSize: 30, fontFamily: Theme.FontFamily.normal, color: '#000' }}>Filter</Text>
            <Text style={{ fontSize: 19, fontFamily: Theme.FontFamily.bold, color: '#000', marginVertical: 10 }}>Property Type</Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal contentContainerStyle={{ marginVertical: 10 }}>
              {allProperty?.map((res, ind) => {
                return (
                  <Pressable
                    onPress={() => {
                      // getAllHotel(selected,[res?.id],1)
                      setpropertyIndex([res])
                      setProperty([res?.id])
                      // setFilterModal(false)
                    }}
                    style={{
                      height: 90, width: 120,
                      borderRadius: 10, borderWidth: propertyIndex.find((it) => it.id == res.id) ? 1.5 : 1,
                      borderColor: propertyIndex.find((it) => it.id == res.id) ? Theme.colors.red : '#DFDFDF',
                      alignItems: 'center', justifyContent: 'center', marginRight: 10, paddingHorizontal: 10
                    }}>
                    <Image
                      source={{ uri: res?.logowithpath }}
                      style={{ height: 35, width: 50, borderRadius: 5 }}
                      resizeMode='contain'
                    />
                    <Text numberOfLines={2} style={{ fontSize: 13, fontFamily: Theme.FontFamily.bold, marginTop: 0, color: '#000', marginTop: 10, textAlign: 'center' }}>
                      {res?.title}</Text>
                  </Pressable>
                )
              })}
            </ScrollView>
            <View
              style={{ height: 0.9, width: width - 20, backgroundColor: '#AAACB729', marginTop: 10, marginBottom: 5 }}
            />
            <Text style={{ fontSize: 19, fontFamily: Theme.FontFamily.bold, marginTop: 10, color: '#000' }}>Type of place</Text>
            <Text style={{ fontSize: 13, fontFamily: Theme.FontFamily.normal, marginTop: 5, color: '#4D4D4D' }}>
              Search rooms, entire homes and more. Nightly prices don't include fees or taxes.</Text>
              <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal contentContainerStyle={{ marginVertical: 10 }}>
              {allType?.map((res, ind) => {
                return (
                  <Pressable
                  onPress={()=>{
                    setRoomType(res)
                  }}
                  style={{
                    height: 49, width: width/3.5,backgroundColor:RoomType == res ? '#000' : '#fff',
                    borderRadius: 10, borderWidth: 1, borderColor: '#DFDFDF',
                    alignItems: 'center', justifyContent: 'center',marginRight:10
                  }}>
                    <Text style={{ fontSize: 13, fontFamily: Theme.FontFamily.bold, marginTop: 0, color:RoomType == res ? '#fff' : '#000', }}>{res}</Text>
                  </Pressable>
                )
              })}
            </ScrollView>
            
            <View
              style={{ height: 0.9, width: width - 20, backgroundColor: '#AAACB729', marginTop: 10, marginBottom: 0 }}
            />
            <View style={{}}>
              <Text style={{ fontSize: 19, fontFamily: Theme.FontFamily.bold, color: '#000', bottom: -15 }}>Price range</Text>

              <RangeSliderWithDynamicHistogram max={maxprice} min={minprice}
                fixMax={(mx) => setmaxprice(mx)}
                fixMin={(mn) => setMinprice(mn)}
                func={(a, b) => {
                  setMinprice(a)
                  setmaxprice(b)
                }} />
            </View>

            <View
              style={{ height: 0.9, width: width - 20, backgroundColor: '#AAACB729', marginTop: 25, marginBottom: 0 }}
            />

            <Text style={{ fontSize: 19, fontFamily: Theme.FontFamily.bold, color: '#000', marginVertical: 10 }}>Rooms and beds</Text>
            {roomswithvalue.map((ress, ind) => {
              return (
                <>
                  <Text style={{ fontSize: 13, fontFamily: Theme.FontFamily.bold, color: '#4D4D4D', marginVertical: 0 }}>{ress.title}</Text>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal contentContainerStyle={{ height: 60, marginTop: 10 }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((res, ind) => {
                      return (
                        <Pressable
                          onPress={() => {
                            setRoom(s => s.findIndex((ab) => ab.room == ress.id) != -1 ?
                              s.filter((bb) => bb.room != ress.id)
                              // room.splice(room.indexOf((room.find((it)=>it.room==ress.id && it.value==res))),1,{"room": ress.id,"value": res})
                              : [...s, {
                                "room": ress.id,
                                "value": res
                              }])
                          }}
                          key={ind} style={{
                            height: 45, width: 56, backgroundColor: room.find((it) => it.room == ress.id && it.value == res) ? "#000" : "transparent",
                            borderRadius: 10, borderWidth: 1, borderColor: '#DFDFDF',
                            alignItems: 'center', justifyContent: 'center', marginRight: 10, marginLeft: 5
                          }}>
                          {/* {console.log('dfdfdfdf',room.indexOf((room.find((it)=>it.room==ress.id && it.value==res))))} */}
                          <Text style={{
                            fontSize: 13, fontFamily: Theme.FontFamily.bold,
                            marginTop: 0, color: room.find((it) => it.room == ress.id && it.value == res) ? "#fff" : '#000'
                          }}>{res}</Text>
                        </Pressable>
                      )
                    })}
                  </ScrollView>
                </>
              )
            })}
            <View
              style={{ height: 0.9, width: width - 20, backgroundColor: '#AAACB729', marginTop: 5, marginBottom: 5 }}
            />
            <Text style={{ fontSize: 19, fontFamily: Theme.FontFamily.bold, color: '#000', marginVertical: 10 }}>Amenities</Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal contentContainerStyle={{  marginTop: 0 }}>
              {amenities.map((res, ind) => {
                return (
                  <Pressable
                    onPress={() => {
                      if (aminity.find((it) => it.id == res.id)) {
                        setAminity(aminity.filter((it) => it.id != res.id))
                        setAminityIndex(aminityIndex.filter((it) => it != res.id))
                      } else {
                        setAminity(s => [...s, res])
                        setAminityIndex(s => [...s, res.id.toString()])
                      }
                    }}
                    style={{
                     paddingHorizontal: 10, borderColor: aminity.find((it) => it.id == res.id) ? "#000" : "#DFDFDF",
                      borderRadius: 10, borderWidth:aminity.find((it) => it.id == res.id) ? 1.5:1,padding:10,marginBottom:10,
                      alignItems: 'center', justifyContent: 'center', marginRight: 10, marginLeft: 0,alignItems:'center'
                    }}>
                        <Image
                      source={{ uri: res?.logowithpath }}
                      style={{ height: 30, width: 50, borderRadius: 5,marginTop:2 }}
                      resizeMode='contain'
                    />
                    <Text numberOfLines={1} style={{
                      fontSize: 13, fontFamily: Theme.FontFamily.bold,maxWidth:800,textAlign:'center',
                      marginTop: 6, color: aminity.find((it) => it.id == res.id) ? "#000" : '#4D4D4D'
                    }}>{res?.title}</Text>
                  </Pressable>
                )
              })}
            </ScrollView>



          </ScrollView>
          <View style={{
            height: 100,
            backgroundColor: '#fff',
            // alignItems: 'center',
            paddingHorizontal: 25,
            marginTop: 10,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 0,
            width: width,
            elevation: 15,
            ...Platform.select({
              ios: {
                shadowColor: 'black',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              },

            }),
          }}>
            <View style={{}}>
              {/* <Text style={{ fontSize: 20, fontFamily: Theme.FontFamily.normal, color: '#000' }}>$255.99
                <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000' }}>/night</Text>
              </Text> */}
              <Text
                onPress={() => {
                  setAminity([])
                  setAminityIndex([])
                  setRoom([])
                  setpropertyIndex([])
                  setProperty([])
                  setMinprice(0)
                  setmaxprice(10000)
                  setRoomType('')
                }}
                style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000', textDecorationLine: 'underline', marginTop: 1 }}>Clear All</Text>
            </View>
            <Pressable
              onPress={() => {

                getAllHotel(null, [], 1)
                setFilterModal(false)
              }}
              style={{
                backgroundColor: '#E15454',
                height: 49,
                // paddingHorizontal: 20,
                width: 120,
                borderRadius: 5, alignItems: 'center', justifyContent: 'center'
              }}>
              <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#fff' }}>Apply</Text>
            </Pressable>
          </View>
        </View>

      </ReactNativeModal>
      <ReactNativeModal
        isVisible={GoModal}
        // backdropColor={'rgba(228, 14, 104, 1)'}
        backdropOpacity={0.4}
        style={{
          margin: 0,
          padding: 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
          // zIndex:99
        }}
        // animationIn={'zoomInDown'}
        // animationOut={'zoomOut'}
        onBackButtonPress={() => {
          //   setPlay(false)
          setGoModal(false)
        }
        }
        onBackdropPress={() => {
          //   setPlay(false)
          setGoModal(false)
        }}>

        <View
          style={{
            width: width,
            height: height / 1.4,
            backgroundColor: '#fff',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            // overflow:'visible',
            // alignItems: 'center',
            paddingHorizontal: 20,
            // zIndex:1
            // paddingHorizontal:25
            // justifyContent:'center',
            // paddingHorizontal: 10,
          }}>
          {/* <MapModView/> */}
          <View style={[styles.line]} />
          <KeyboardAwareScrollView keyboardShouldPersistTaps={"always"} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10, }}>
            <Text style={{ fontSize: 30, fontFamily: Theme.FontFamily.normal, color: '#000', marginBottom: 20 }}>Where to go?</Text>

            <View style={{ width: width - 40, alignSelf: 'center' }}>
              <GooglePlacesAutocomplete
                placeholder='Enter Location'
                placeholderTextColor={'#000'}
                textInputProps={{
                  placeholderTextColor: Theme.colors.grey,
                  returnKeyType: 'search',
                }}
                autoFillOnNotFound={true}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  // console.log(data,"\n", details);
                  setSearchLoc(details?.geometry?.location)
                  setSearchLocAddress(details?.formatted_address)
                }}
                query={{
                  key: 'AIzaSyC-ki3ImgxYzo8K2OCH9yDthHWIWV1yfj4',
                  language: 'en',
                }}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                // suppressDefaultStyles={true}
                styles={{
                  textInputContainer: {
                    backgroundColor: '#fff',
                    color:'#000'
                  },
                  // poweredContainer:{
                  //   backgroundColor: 'red',
                  //   color:'#000'
                  // },
                  textInput: {
                    
                    height: 50,
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    fontSize: 15,
                    borderWidth: 0.5,
                    borderColor: '#aaa',
                    flex: 1,
                    color:'#000'
                  },
                  listView: {
                    // backgroundColor: 'red',
                    color:'#000', zIndex: 100000
                  },
                  predefinedPlacesDescription: {
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderColor: '#c8c7cc',
                    borderTopWidth: 0.5,
                    color:'#000',
                  },
                  description: { color: 'gray', }
                }}
              />
            </View>
            <Pressable style={[styles.inputContainerStyle, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setOpen(!open)}>
                  <Caleder />
                </TouchableOpacity>

                <Text onPress={()=>setOpen(!open)} style={{ fontSize: 14, fontFamily: Theme.FontFamily.semiBold, color: '#000', marginLeft: 10, }}>
                  {selected1 == null ? "Checkin Date" : moment(selected1).format("MMM D YYYY")} - {checkout == null ? "Checkout Date" : moment(checkout).format("MMM D YYYY")}
                </Text>

              </View>
              <Text onPress={() => setOpen(!open)} style={{ fontSize: 13, fontFamily: Theme.FontFamily.bold, color: '#000', marginRight: 0,textDecorationLine:'underline',textDecorationColor:'#000' }}>Set time</Text>

            </Pressable>
            <Pressable style={[styles.inputContainerStyle, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TravelIcon />
                <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.semiBold, color: '#000', marginLeft: 12 }}>{adult + Child + Infants + Pets} Guest</Text>
              </View>
              <Text onPress={() => {

                setModalState1(!ModalState1)
              }} style={{ fontSize: 13, fontFamily: Theme.FontFamily.bold, color: '#000', marginRight: 0,textDecorationLine:'underline',textDecorationColor:'#000' }}>Add guests</Text>

            </Pressable>

          </KeyboardAwareScrollView>
          <View style={{
            height: 100,
            backgroundColor: '#fff',
            // alignItems: 'center',
            paddingHorizontal: 25,
            marginTop: 10,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 0,
            width: width,
            elevation: 15,
            ...Platform.select({
              ios: {
                shadowColor: 'black',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              },

            }),
          }}>
            <View style={{}}>
              {/* <Text style={{ fontSize: 20, fontFamily: Theme.FontFamily.normal, color: '#000' }}>$255.99
                <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000' }}>/night</Text>
              </Text> */}
              <Text
                onPress={() => {
                  setSelected1(new Date())
                  setCheckout(null)
                  setAdult(1)
                  setChild(0)
                  setInfants(0)
                  setPets(0)
                  setSearchLoc({})
                  setSearchLocAddress(null)
                }}
                style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000', textDecorationLine: 'underline', marginTop: 1 }}>
                Reset All</Text>
            </View>
            <Pressable
              onPress={() => whereToGo()}
              style={{
                backgroundColor: '#E15454',
                height: 50,
                paddingHorizontal: 15,
                width: 120,
                borderRadius: 5, alignItems: 'center', justifyContent: 'center',
                flexDirection: 'row'
              }}>
              <SearchIcon Color />
              <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#fff', marginLeft: 10 }}>Search</Text>
              {Loading ? <ActivityIndicator size={18} color={"#fff"} style={{ marginLeft: 10 }} /> : null}
            </Pressable>
          </View>

        </View>
        {open ?
          <Pressable onPress={() => setOpen(false)} style={styles.centerdView}>
            <View style={styles.modalView}>

              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                minDate={minDate}
                // maxDate={maxDate}
                todayBackgroundColor="blue"
                selectedDayColor="#7300e6"
                selectedDayTextColor="#FFFFFF"
                previousTitle="  ᐊ"
                nextTitle="ᐅ  "

                disabledDatesTextStyle={{
                  fontFamily: "Cochin",
                  color: "grey",
                }}
                textStyle={{
                  fontFamily: "Cochin",
                  color: "#fff",
                }}
                onDateChange={onDateChange}
              />
            </View>
          </Pressable>
          : null
        }
        <ReactNativeModal
          isVisible={ModalState2}
          // backdropColor={'rgba(228, 14, 104, 1)'}
          backdropOpacity={0.0}
          style={{
            marginTop: 215,
            padding: 0,
            alignItems: 'center',
            // justifyContent: 'flex-end',

          }}
          // animationIn={'zoomInDown'}
          // animationOut={'zoomOut'}
          onBackButtonPress={() => {
            //   setPlay(false)
            setModalState2(false)
          }
          }
          onBackdropPress={() => {
            //   setPlay(false)
            setModalState2(false)
          }}>

          <View style={{ height: height * 0.3, width: width - 50, backgroundColor: '#fff', borderRadius: 10, elevation: 3, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.5, shadowRadius: 4 }}>
            <AppTextInput
              value={search}
              onChangeText={a => {
                setSearch(a)
                getSuggestions(a)
              }}
              placeholder="Search destination"
              placeholderTextColor={'#747A82'}
              inputStyle={{ fontSize: 14 }}
              titleStyle={{
                fontFamily: Theme.FontFamily.normal,
                fontSize: Theme.sizes.s14,
              }}
              mainContainerStyle={
                {
                  margin: 0
                }
              }
              rightAction={<Icon
                name='search'
                type='Feather'
                color={'#000'}
                size={20}
              />}
              // leftIcon={{
              //   name: 'search',
              //   type: 'Feather',
              //   color: '#000',
              //   size: 20,
              // }}
              // onRightIconPress={() => setModalState2(true)}
              inputContainerStyle={{ ...styles.inputContainerStyle, width: width - 80, height: 45, marginTop: 10 }}
              style={styles.text_style}
            />
            <FlatList
              data={suggestionsList}
              contentContainerStyle={{ paddingTop: 5 }}
              renderItem={({ item, index }) => {
                return (
                  <Pressable>

                    <Text onPress={() => {
                      handleAddTag(item)
                      setModalState2(false)
                    }} style={{ color: '#000', padding: 10, paddingHorizontal: 20, fontWeight: '500' }}>
                      {item.name}</Text>
                  </Pressable>
                )
              }}
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal
          isVisible={ModalState1}
          // backdropColor={'rgba(228, 14, 104, 1)'}
          backdropOpacity={0.4}
          style={{
            margin: 0,
            padding: 0,
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 9999
          }}
          // animationIn={'zoomInDown'}
          // animationOut={'zoomOut'}
          onBackButtonPress={() => {
            //   setPlay(false)
            setModalState1(false)
          }
          }
          onBackdropPress={() => {
            //   setPlay(false)
            setModalState1(false)
          }}>
          <View
            style={{
              width: width,
              height: height / 2.6,
              backgroundColor: '#fff',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              // overflow:'visible',
              // alignItems: 'center',
              // justifyContent:'center',
              paddingHorizontal: 45,
              paddingTop: 35

            }}>
            {/* <Text style={{ fontSize: 20, fontFamily: Theme.FontFamily.normal, color: '#000' }}>Choose Payment Method</Text> */}

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ backgroundColor: '#fff', paddingBottom: 20, }}>
              <View style={{
                // height:222,
                backgroundColor: '#fff',
              }}>

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between', alignItems: 'center'
                  // justifyContent:'center'
                }}>
                  <View>
                    <Text style={{ fontSize: 18, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Adults</Text>
                    <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: 'grey' }}>Age 18+</Text>

                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center', paddingHorizontal: 5
                  }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (adult != 0) {
                          setAdult(adult - 1)
                        }
                      }}
                      style={{
                        height: 40, width: 40, borderRadius: 40, backgroundColor: '#ECECEC', elevation: 6,
                        alignItems: 'center', justifyContent: 'center',
                        ...Platform.select({
                          ios: {
                            shadowColor: 'black',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                          },
                          android: {
                            // elevation: 3,
                          },
                        }),
                      }}>
                      <Icon name='minus' type='AntDesign' size={23} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#000', marginHorizontal: 20, width: 20, textAlign: 'center' }}>
                      {adult}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setAdult(adult + 1)

                      }}
                      style={{
                        height: 40, width: 40, borderRadius: 40, backgroundColor: '#ECECEC', elevation: 6,
                        alignItems: 'center', justifyContent: 'center',
                        ...Platform.select({
                          ios: {
                            shadowColor: 'black',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                          },
                          android: {
                            // elevation: 3,
                          },
                        }),
                      }}>
                      <Icon name='plus' type='AntDesign' size={20} />

                    </TouchableOpacity>
                  </View>

                </View>



              </View>
              <View style={{
                // height:222,
                backgroundColor: '#fff', marginTop: 20
              }}>

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between', alignItems: 'center'
                  // justifyContent:'center'
                }}>
                  <View>
                    <Text style={{ fontSize: 18, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Childern</Text>
                    <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: 'grey' }}>Age 2-17</Text>

                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center', paddingHorizontal: 5
                  }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (Child != 0) {
                          setChild(Child - 1)
                        }
                      }}
                      style={{
                        height: 40, width: 40, borderRadius: 40, backgroundColor: '#ECECEC', elevation: 6,
                        alignItems: 'center', justifyContent: 'center',
                        ...Platform.select({
                          ios: {
                            shadowColor: 'black',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                          },
                          android: {
                            // elevation: 3,
                          },
                        }),
                      }}>
                      <Icon name='minus' type='AntDesign' size={23} />
                    </TouchableOpacity>
                    <Text style={{
                      fontSize: 16, fontWeight: '600', color: '#000',
                      marginHorizontal: 20, width: 20, textAlign: 'center'
                    }}>{Child}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setChild(Child + 1)
                      }}
                      style={{
                        height: 40, width: 40, borderRadius: 40, backgroundColor: '#ECECEC', elevation: 6,
                        alignItems: 'center', justifyContent: 'center',
                        ...Platform.select({
                          ios: {
                            shadowColor: 'black',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.4,
                            shadowRadius: 4,
                          },
                          android: {
                            // elevation: 3,
                          },
                        }),
                      }}>
                      <Icon name='plus' type='AntDesign' size={20} />

                    </TouchableOpacity>
                  </View>

                </View>



              </View>
              <View style={{
                // height:222,
                backgroundColor: '#fff', marginTop: 20
              }}>

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between', alignItems: 'center'
                  // justifyContent:'center'
                }}>
                  <View>
                    <Text style={{ fontSize: 18, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Infants</Text>
                    <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: 'grey' }}>Under 2</Text>

                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center', paddingHorizontal: 5
                  }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (Infants != 0) {
                          setInfants(Infants - 1)
                        }
                      }}
                      style={{
                        height: 40, width: 40, borderRadius: 40, backgroundColor: '#ECECEC', elevation: 6,
                        alignItems: 'center', justifyContent: 'center',
                        ...Platform.select({
                          ios: {
                            shadowColor: 'black',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                          },
                          android: {
                            // elevation: 3,
                          },
                        }),
                      }}>
                      <Icon name='minus' type='AntDesign' size={23} />
                    </TouchableOpacity>
                    <Text style={{
                      fontSize: 16, fontWeight: '600', color: '#000',
                      marginHorizontal: 20, width: 20, textAlign: 'center'
                    }}>{Infants}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setInfants(Infants + 1)
                      }}
                      style={{
                        height: 40, width: 40, borderRadius: 40, backgroundColor: '#ECECEC', elevation: 6,
                        alignItems: 'center', justifyContent: 'center',
                        ...Platform.select({
                          ios: {
                            shadowColor: 'black',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                          },
                          android: {
                            // elevation: 3,
                          },
                        }),
                      }}>
                      <Icon name='plus' type='AntDesign' size={20} />

                    </TouchableOpacity>
                  </View>

                </View>



              </View>
              <View style={{
                // height:222,
                backgroundColor: '#fff', marginTop: 20
              }}>

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between', alignItems: 'center'
                  // justifyContent:'center'
                }}>
                  <View>
                    <Text style={{ fontSize: 18, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Pets</Text>
                    <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: 'grey' }}>Any</Text>

                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center', padding: 5
                  }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (Pets != 0) {
                          setPets(Pets - 1)
                        }
                      }}
                      style={{
                        height: 40, width: 40, borderRadius: 40, backgroundColor: '#ECECEC', elevation: 6,
                        alignItems: 'center', justifyContent: 'center',
                        ...Platform.select({
                          ios: {
                            shadowColor: 'black',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                          },
                          android: {
                            // elevation: 3,
                          },
                        }),
                      }}>
                      <Icon name='minus' type='AntDesign' size={23} />
                    </TouchableOpacity>
                    <Text style={{
                      fontSize: 16, fontWeight: '600', color: '#000',
                      marginHorizontal: 20, width: 20, textAlign: 'center'
                    }}>{Pets}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setPets(Pets + 1)
                      }}
                      style={{
                        height: 40, width: 40, borderRadius: 40, backgroundColor: '#ECECEC', elevation: 6,
                        alignItems: 'center', justifyContent: 'center',
                        ...Platform.select({
                          ios: {
                            shadowColor: 'black',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                          },
                          android: {
                            // elevation: 3,
                          },
                        }),
                      }}>
                      <Icon name='plus' type='AntDesign' size={20} />

                    </TouchableOpacity>
                  </View>

                </View>



              </View>
              {/* <Pressable
            onPress={()=>setModalState(false)}
            style={{
              width:160,height:40,backgroundColor:Theme.colors.lightRed,borderRadius:5,
              alignItems:'center',justifyContent:'center',alignSelf:'center',marginTop:25
            }}
            >
              <Text style={{fontSize:14,color:'#fff',fontWeight:'600'}}>Confirm</Text>
            </Pressable> */}
            </ScrollView>
          </View>
        </ReactNativeModal>
      </ReactNativeModal>

      {/* </Pressable> */}


    </ScreenLayout>
  );
};

export default HomePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  text_style: {
    fontFamily: Theme.FontFamily.normal,
    width: '100%',
    fontSize: 14,
    color: '#000',
  },
  line: {
    width: 40,
    height: 4,
    borderRadius: 2,
    marginTop: 25,
    marginBottom: 25,
    backgroundColor: '#D5DDE0',
    alignSelf: 'center'
  },
  inputContainerStyle: {
    paddingHorizontal: 5,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    width: width - 40,
    borderColor: '#DFDFDF',
    borderWidth: 0.7,
    alignSelf: 'center',
    marginTop: 20, borderRadius: 6
  },
  centerdView: {

    alignItems: 'center', justifyContent: 'center',
    position: 'absolute',
    right: 0, left: 0,
    top: 100,
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: '100%',
    // zIndex:9999999999
  },
  modalView: {
    elevation: 10,
    marginHorizontal: 15,
    backgroundColor: '#000',
    borderRadius: 5,
    width: '95%',
    // zIndex:9999999999,
    // height:'100%',
    padding: 10,
    alignItems: 'center',
    shadowColor: 'gray',
    textShadowOffset: {

      width: 2,
      height: 2
    }
  }
});




