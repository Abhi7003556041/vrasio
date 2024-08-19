import { Alert, Animated, Dimensions, FlatList, Image, Platform, Pressable, ScrollView, Share, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import { useRoute } from '@react-navigation/native';
import Theme from '../../Constants/Theme';
import AppIntroSlider from 'react-native-app-intro-slider';
import NavigationService from '../../Services/Navigation';
import MapModCardView from '../../Components/Map/MapModCardView';
import { Icon } from 'react-native-basic-elements';
import StarIcon from '../../assets/icons/StarIcon';
import SmallStarIcon from '../../assets/icons/SmallStarIcon';
import * as Progress from 'react-native-progress';
import GalleryBlockIcon from '../../assets/icons/GalleryBloxkIcon';
import HelperFunctions from '../../Constants/HelperFunctions';
import { postApi } from '../../Services/Service';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ImageView from "react-native-image-viewing";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CustomHeader from '../../Components/Header/CustomHeader';
import ReactNativeModal from 'react-native-modal';

const { width, height } = Dimensions.get('window');

const FavouriteDetails = (props) => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const {dashboardDetails, currencyDetails,favouriteList } = useSelector(state => state.commonData);
  const [selected, setSelected] = useState(new Date());
  var nextDay = new Date();
  nextDay.setDate(new Date().getDate() + 1);
  const [checkout, setCheckout] = useState(null)
  const [skeletonLoading, setSkeletonLoading] = useState(true)

  const [ReviewModal, setReviewModal] = useState(false);
  const slugtype = props.route.params.slug
  const [Loder, setLoader] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [ratingArr, setRatingArr] = useState({})
  const { login_status, userDetails, token } = useSelector(state => state.authData);
  const messageee = useRef(new Animated.Value(1)).current
  const [profileImageLoading, setProfileImageLoading] = useState(true);
  const [visible, setIsVisible] = useState(false);
  const [visibleRoom, setIsVisibleRoom] = useState(false);

  const customProp = route.params?.showButton;
  const [hotelDetails, setHoteldetails] = useState({})
  const [sliderImage, setSliderImage] = useState([])
  const [sliderImageZoom, setSliderImageZoom] = useState([])
  const [RoomImageZoom, setRoomImageZoom] = useState([])

  const [reviewList, setReviewList] = useState([])
  const [SliderData, setSliderData] = useState([
    { title: 'California Days', Img: require("../../assets/images/pexels.png") },
    { title: 'California Days', Img: require("../../assets/images/beach.png") },
    { title: 'Australia Wildwilfe', Img: require("../../assets/images/wildlife.png") },
    { title: 'Australia Wildwilfe', Img: require("../../assets/images/nature.png") },
    { title: 'California Days', Img: require("../../assets/images/beach.png") },


  ])
  const images = [
    {
      uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    },
    {
      uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
    },
    {
      uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
    },
  ];
  const getReview = () => {

    let data = {
      "propertySlug": slugtype
    }
    console.log('dfdfdfdf', data)
    setLoading(true)

    postApi("api/rating", data, token).then(response => {
      // console.log('getReviewgetReview',JSON.stringify(response))
      if (response?.status) {
        // HelperFunctions.showToastMsg("Request Sent Successfully, Please wait for admin approval")
        setReviewList(response.data.propertyRatings)
        let arr = []
        let arr1 = {}
        response.data.propertyRatings.map((res, ind) => {
          arr.push({ [`${Number(res.rating).toFixed(0)}`]: Number(res.rating).toFixed(0), "count": 1, "id": Number(res.rating).toFixed(0) })
        })
        arr1 = arr.reduce((pV, cV, cI) => {
          const currCount = pV[cV.id] ? pV[cV.id] : 0;
          return {
            ...pV,
            [cV.id]: currCount + 1
          }
        }, {})
        setRatingArr(arr1)
        setLoading(false)

      } else {
        HelperFunctions.showToastMsg(response?.message)
        setLoading(false)

      }
    }).catch(error => {
      HelperFunctions.showToastMsg(error?.message)
      setLoading(false)
    }).finally(() => {
      setLoading(false)
    })

  }
  const getHotelDetails = () => {
    setLoader(true)
    let data = {
      "propertyslug": slugtype,
      "currency_id": currencyDetails.id,
    }
    postApi("api/propertydetails", data, "").then(response => {
      console.log('response1233', JSON.stringify(response))
      if (response?.status) {
        //   storeToLocalAndRedux(response)
        setHoteldetails(response?.data)
        setSliderImage([{ mainimage: response?.data?.coverimagemain }, ...response?.data?.photos])
        response?.data?.photos?.map((res, ind) => {
          sliderImageZoom.push({ uri: res.mainimage })
        })
        setSliderImageZoom([{ uri: response?.data?.coverimagemain }, ...sliderImageZoom,])
        setTimeout(() => {

          setLoader(false)
        }, 500)

      } else {
        HelperFunctions.showToastMsg(response?.message)
        setLoader(false)


      }
    }).catch(error => {
      HelperFunctions.showToastMsg(error?.message)
      setLoader(false)


    }).finally(() => {
      setLoader(false)


    })

  }
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    getHotelDetails()
    getReview()
  }, [])

  if (Loder || Loading) {
    return (
      <View style={{ position: 'absolute', height: '100%', width: '100%', bottom: 0, backgroundColor: 'rgba(255,255,255,0.4)' }}>
        <StatusBar
          backgroundColor={props.Home ? "#2F64AC" : '#fff'}
          barStyle={props.Home ? 'light-content' : 'dark-content'}
          translucent={true}
        />
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View >
            <SkeletonPlaceholder>
              <View style={{ alignItems: 'center', marginTop: 5 }}>
                <View style={{
                  height: 120,
                  width: '100%',
                }} />

              </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <View style={{
                  height: 400,
                  width: '100%',
                }} />

              </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View style={{ alignItems: 'center', marginTop: 5 }}>
                <View style={{
                  height: 80,
                  width: '100%',
                }} />

              </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View style={{ alignItems: 'center', marginTop: 5 }}>
                <View style={{
                  height: 90,
                  width: '100%',
                }} />

              </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View style={{ alignItems: 'center', marginTop: 5 }}>
                <View style={{
                  height: 90,
                  width: '100%',
                }} />

              </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View style={{ alignItems: 'center', marginTop: 5 }}>
                <View style={{
                  height: height > 1000 ? 400 : 100,
                  width: '100%',
                }} />

              </View>
            </SkeletonPlaceholder>
          </View>
        </View>
      </View>
    )
  }
  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => setIsVisible(true)}
        style={{
          height: 400,
          width: width,
          // borderRadius: 0,
          backgroundColor: "#FFFFFF",
          //    overflow: 'hidden'
        }}>
        <Image
          source={{ uri: item.mainimage }}
          //   resizeMode='contain'
          style={{ height: 400, width: width, borderRadius: 0 }}
          onPartialLoad={() => {
            setProfileImageLoading(true)
          }}
          onLoad={() => setProfileImageLoading(false)}
        />
      </Pressable>
    )
  }
  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: '#FFF' }}
      // showLoading={Loading}
      //   isScrollable={true}
      fav
      Share
      ShareFunction={onShare}
      leftHeading={'Details'}
      viewStyle={{ backgroundColor: '#F9F6F6' }}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}
    >
      {console.log('sliderImage', ratingArr)}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{
          height: 400,
          width: "100%",
          // overflow:'hidden'
        }}>
          <AppIntroSlider
            data={sliderImage}
            renderItem={renderItem}
            dotClickEnabled
            showDoneButton={false}
            showNextButton={false}
            showsHorizontalScrollIndicator={false}
            style={{}}
            // dotClickEnabled=
            initialNumToRender={1}
            paginationStyle={{
              //   bottom: 20
            }}
            // showsHorizontalScrollIndicator
            dotStyle={{ backgroundColor: "#00000055", marginVertical: "10%", height: 6, width: 6 }}
            activeDotStyle={{ backgroundColor: "#fff", width: 6, height: 6, marginVertical: "10%" }}
          />
        </View>
        {profileImageLoading ?
          <View style={{ position: 'absolute', top: 0 }}>
            <SkeletonPlaceholder enabled={profileImageLoading}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  height: 400,
                  width: '100%',
                }} />
                <View style={{ marginLeft: 20 }}>
                </View>
              </View>
            </SkeletonPlaceholder>
          </View> : null
        }
        <View style={{
          height: 120,
          backgroundColor: '#fff',
          // alignItems: 'center',
          paddingHorizontal: 25,
          justifyContent: 'center'
        }}>
          <Text numberOfLines={1} style={{ fontSize: 22, fontFamily: Theme.FontFamily.bold, color: '#000',marginTop:0 }}>{hotelDetails?.title}</Text>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:10,}}>
            <Image
              source={{ uri: hotelDetails?.user?.avatar }}
              resizeMode='cover'
              style={{ height: 45, width: 45, borderRadius: 35 }}
            />
            <View>
            <Text style={{ fontSize: 15,fontWeight:'600',  color: '#000', marginTop: 0 ,marginLeft:15}}>Hosted By {hotelDetails?.user?.name}</Text>
            <Text style={{ fontSize: 14,fontWeight:'600',  color: '#000', marginTop: 3 ,marginLeft:15}}>★ {hotelDetails?.user?.average_rating} ({hotelDetails?.user?.reviewCount})</Text>

            </View>
          </View>
        </View>
        <View style={{
          // height: 150,
          backgroundColor: '#fff',
          // alignItems: 'center',
          paddingHorizontal: 25,
          paddingVertical: 20,
          marginTop: 10,
          justifyContent: 'center'
        }}>
          <Text style={{ fontSize: 15, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Property Description</Text>
          <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000' }}>
            {hotelDetails?.description}</Text>
        </View>
        <View style={{
          // height:70,
          backgroundColor: '#fff',
          // alignItems: 'center',
          paddingHorizontal: 25,
          marginTop: 10,
          justifyContent: 'center', paddingTop: 20
        }}>
          <Text style={{ fontSize: 20, fontFamily: Theme.FontFamily.semiBold, color: '#000' }}>Scenicviews </Text>
          <View>
            <FlatList
              data={hotelDetails?.scenicview}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ marginTop: 20 }}
              renderItem={({ item, Index }) => {
                return (
                  <View style={{
                    marginBottom: 30, flexDirection: 'row', alignItems: 'center'
                  }}>
                    <Image
                      source={{ uri: item.logo }}
                      resizeMode='cover'
                      style={{ height: 38, width: 38, borderRadius: 5 }}
                    />
                    <Text style={{ color: '#000', fontSize: 14, fontFamily: Theme.FontFamily.bold, marginLeft: 22 }}>{item.title}</Text>
                  </View>
                )
              }}
            />
          </View>
          {/* <View
            style={{ height: 1.2, width: width - 40, backgroundColor: '#DFDFDF', marginBottom: 20, alignSelf: 'center' }}
          /> */}
          {/* <Text style={{ color: '#E15454', fontSize: 13.5, fontFamily: Theme.FontFamily.bold, marginLeft: 0 }}>View all 115 aminities</Text> */}

          {/* <Text style={{fontSize:14,fontFamily:Theme.FontFamily.normal,color:'#000'}}>Passambhati Villa is our exclusive villa at Cape Shark. The spacious villa of about 3000 sqft built in contemporary Thai style, is located at the very cape on a hillside about 35 metres above sea level.</Text> */}
        </View>
        <View style={{
          // height:70,
          backgroundColor: '#fff',
          // alignItems: 'center',
          paddingHorizontal: 25,
          marginTop: 10,
          justifyContent: 'center', paddingTop: 20
        }}>
          <Text style={{ fontSize: 20, fontFamily: Theme.FontFamily.semiBold, color: '#000' }}>What this place is offering you</Text>
          <View>
            <FlatList
              data={hotelDetails?.amenities}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ marginTop: 20 }}
              renderItem={({ item, Index }) => {
                return (
                  <View style={{
                    marginBottom: 30, flexDirection: 'row', alignItems: 'center'
                  }}>
                    <Image
                      source={{ uri: item.logo }}
                      resizeMode='cover'
                      style={{ height: 38, width: 38, borderRadius: 5 }}
                    />
                    <Text style={{ color: '#000', fontSize: 14, fontFamily: Theme.FontFamily.bold, marginLeft: 22 }}>{item.title}</Text>
                  </View>
                )
              }}
            />
          </View>
          {/* <View
            style={{ height: 1.2, width: width - 40, backgroundColor: '#DFDFDF', marginBottom: 20, alignSelf: 'center' }}
          /> */}
          {/* <Text style={{ color: '#E15454', fontSize: 13.5, fontFamily: Theme.FontFamily.bold, marginLeft: 0 }}>View all 115 aminities</Text> */}

          {/* <Text style={{fontSize:14,fontFamily:Theme.FontFamily.normal,color:'#000'}}>Passambhati Villa is our exclusive villa at Cape Shark. The spacious villa of about 3000 sqft built in contemporary Thai style, is located at the very cape on a hillside about 35 metres above sea level.</Text> */}
        </View>
        <View style={{
          // height:70,
          backgroundColor: '#fff',
          // alignItems: 'center',
          paddingHorizontal: 25,
          marginTop: 10,
          justifyContent: 'center', paddingVertical: 20
        }}>
          <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Cancellation & Refund Policy</Text>
          <Text style={{ fontSize: 13.5, fontFamily: Theme.FontFamily.normal, color: '#000', marginTop: 10, marginBottom: 0 }}>
            Passambhati Villa is our exclusive villa at Cape, Free cancellation for 48 hours. Cancel before 21st Jan to get partial refund.</Text>
        </View>
        <View style={{
          // height:70,
          backgroundColor: '#fff',
          // alignItems: 'center',
          paddingHorizontal: 0,
          marginTop: 10,
          justifyContent: 'center', paddingVertical: 20
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 25 }}>
            <Text style={{ fontSize: 16, fontFamily: Theme.FontFamily.bold, color: '#000', marginLeft: 0 }}>Areas you can use</Text>
            {/* <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#E15454', marginLeft: 0 }}>View all</Text> */}

          </View>
          {/* {console.log('{uri:res?.mainimage}',RoomImageZoom)} */}

          <View>
            <FlatList
              data={hotelDetails?.roomtypes ?? []}
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{ marginTop: 20, marginHorizontal: 5 }}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    onPress={() => {

                      item?.photos?.forEach((res) => {
                        RoomImageZoom.push({ uri: res?.mainimage, description: item.description })
                      })
                      setRoomImageZoom(RoomImageZoom)
                      setIsVisibleRoom(true)
                    }}
                    style={{
                      width: width > 700 ? width / 3.2 : width / 2.6, marginHorizontal: 20, alignItems: 'center'
                    }}>
                    <Image
                      source={{ uri: item.logo }}
                      resizeMode='contain'
                      style={{ height: 125, width: width > 700 ? width / 3.5 : width / 4.5, borderRadius: 5 }}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0 }}>
                      <Text style={{ fontSize: 18, fontFamily: Theme.FontFamily.bold, color: '#000' }}>{item.value}</Text>
                      <Text numberOfLines={1} style={{ fontSize: 16, fontFamily: Theme.FontFamily.normal, color: '#000', marginLeft: 10, }}>{item.title}</Text>

                    </View>
                    {/* <Text numberOfLines={2} style={{ fontSize: 15, fontFamily: Theme.FontFamily.normal, color: '#000' }}>{item.description}</Text> */}


                  </Pressable>
                )
              }}
            />
          </View>
        </View>
        {/* {console.log('widthh',width)} */}
        <View style={{
          // height:70,
          backgroundColor: '#fff',
          // alignItems: 'center',
          paddingHorizontal: 25,
          marginTop: 10,
          justifyContent: 'center', paddingVertical: 20
        }}>
          <Text style={{ fontSize: 20, fontFamily: Theme.FontFamily.normal, color: '#000' }}>Where you'll be</Text>
          <MapModCardView latt={parseFloat(hotelDetails?.latitude)} longg={parseFloat(hotelDetails?.longitude)} />
          <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000', marginTop: 12, }}>5331 Redfox Court, Montegomary AL 36116</Text>
          <Text style={{ fontSize: 13.5, fontFamily: Theme.FontFamily.normal, color: '#000', marginVertical: 5 }}>
            Lorem ipsum means nothing,
            it is a set of Latin words that make up a text of fake filling, random, placeholder.
            Use the online text generator.</Text>

        </View>
        {/* {console.log('hotelDetails?.latitude',Number(reviewList[0]?.property?.average_rating).toFixed(1))} */}
        <View style={{
          // height:70,
          backgroundColor: '#fff',
          // alignItems: 'center',
          paddingHorizontal: 25,
          marginTop: 10,
          justifyContent: 'center', paddingVertical: 20
        }}>
          <Text style={{ fontSize: 15, fontFamily: Theme.FontFamily.bold, color: '#000', marginLeft: 0 }}>Reviews & Ratings</Text>
          <View style={{
            flexDirection: 'row', alignItems: 'center', marginTop: 2
          }}>
            <Icon
              name='verified'
              type='MaterialIcon'
              color={'#E15454'}
              size={16}
            />
            <Text style={{ fontSize: 13, fontFamily: Theme.FontFamily.normal, color: '#E15454', marginLeft: 5 }}>By verified visitors</Text>

          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingLeft: 5 }}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000', marginRight: 15 }}>
                  {reviewList[0]?.property?.average_rating != null ? Number(reviewList[0]?.property?.average_rating).toFixed(1) : 0.0}
                  {/* 4.5 */}
                </Text>
                <StarIcon />
              </View>
              <Text style={{ fontSize: 12, fontFamily: Theme.FontFamily.bold, color: '#9AA1AB', marginTop: 10 }}> Verified Visitors</Text>

            </View>
            <View
              style={{ height: 90, width: 1, backgroundColor: '#DFDFDF', marginHorizontal: 15 }}
            />
            <View style={{ paddingLeft: 10 }}>
              <View style={{
                flexDirection: 'row', alignItems: 'center', marginBottom: 6, justifyContent: 'center'
              }}>
                <Text style={{ fontSize: 9, color: '#000', marginRight: 0, width: 10 }}>5</Text>
                <View style={{ marginHorizontal: 3, marginRight: 6 }}>
                  <SmallStarIcon /></View>
                <Progress.Bar
                  height={5}
                  progress={ratingArr["5"] ? (ratingArr["5"] / reviewList.length) : 0} width={width / 3}
                  borderRadius={100}
                  // style={{borderRightRadius:10}}
                  color='#2BA57C'
                  unfilledColor='#0000000D'
                  borderWidth={0}
                />
                <Text style={{ fontSize: 9, color: '#9AA1AB', marginHorizontal: 5, width: 20 }}>{ratingArr["5"]}</Text>

              </View>
              <View style={{
                flexDirection: 'row', alignItems: 'center', marginBottom: 6
              }}>
                <Text style={{ fontSize: 9.5, color: '#000', marginRight: 0, width: 10 }}>4</Text>
                <View style={{ marginHorizontal: 3, marginRight: 6 }}>
                  <SmallStarIcon /></View>
                <Progress.Bar
                  progress={ratingArr["4"] ? (ratingArr["4"] / reviewList.length) : 0} width={width / 3}
                  height={5}
                  color='#2BA57C'
                  unfilledColor='#0000000D'
                  borderWidth={0}
                />
                <Text style={{ fontSize: 9, color: '#9AA1AB', marginHorizontal: 5 }}>{ratingArr["4"]}</Text>

              </View>
              <View style={{
                flexDirection: 'row', alignItems: 'center', marginBottom: 6
              }}>
                <Text style={{ fontSize: 9.5, color: '#000', marginRight: 0, width: 10 }}>3</Text>
                <View style={{ marginHorizontal: 3, marginRight: 6 }}>
                  <SmallStarIcon /></View>
                <Progress.Bar
                  height={5}
                  progress={ratingArr["3"] ? (ratingArr["3"] / reviewList.length) : 0} width={width / 3}
                  color='#2BA57C'
                  unfilledColor='#0000000D'
                  borderWidth={0}
                />
                <Text style={{ fontSize: 9, color: '#9AA1AB', marginHorizontal: 5, }}>{ratingArr["3"]}</Text>

              </View>
              <View style={{
                flexDirection: 'row', alignItems: 'center', marginBottom: 6
              }}>
                <Text style={{ fontSize: 9.5, color: '#000', marginRight: 0, width: 10 }}>2</Text>
                <View style={{ marginHorizontal: 3, marginRight: 6 }}>
                  <SmallStarIcon /></View>
                <Progress.Bar
                  height={5}
                  progress={ratingArr["2"] ? (ratingArr["2"] / reviewList.length) : 0} width={width / 3}
                  color='#F5CD48'
                  unfilledColor='#0000000D'
                  borderWidth={0}
                />
                <Text style={{ fontSize: 9, color: '#9AA1AB', marginHorizontal: 5 }}>{ratingArr["2"]}</Text>

              </View>
              <View style={{
                flexDirection: 'row', alignItems: 'center', marginBottom: 0
              }}>
                <Text style={{ fontSize: 9.5, color: '#000', marginRight: 0, width: 10 }}>1</Text>
                <View style={{ marginHorizontal: 3, marginRight: 6 }}>
                  <SmallStarIcon /></View>
                <Progress.Bar
                  height={5}
                  progress={ratingArr["1"] ? (ratingArr["1"] / reviewList.length) : 0} width={width / 3}
                  color='#DB1414'
                  unfilledColor='#0000000D'
                  borderWidth={0}
                />
                <Text style={{ fontSize: 9, color: '#9AA1AB', marginHorizontal: 5 }}>{ratingArr["1"]}</Text>

              </View>

            </View>
          </View>
          <View
            style={{ height: 1.2, width: width - 40, backgroundColor: '#DFDFDF', marginVertical: 10 }}
          />
          <Text style={{ fontSize: 15, fontFamily: Theme.FontFamily.bold, color: '#000', marginVertical: 10 }}>Customer Reviews ({reviewList.length})</Text>
          <FlatList
            data={reviewList.slice(0, 2)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 10 }}
            renderItem={({ item, index }) => {
              return (
                <>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View style={{ width: 50, height: 25, backgroundColor: '#2BA57C', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 1 }}>
                      <Text style={{ fontSize: 12, fontWeight: '600', color: '#fff', marginRight: 5 }}>{item.rating}</Text>
                      <Icon name="star" type='AntDesign' color="#fff" size={10} />
                    </View>
                    <View style={{ width: '80%' }}>
                      <Text numberOfLines={2} style={{ fontSize: 12, fontFamily: Theme.FontFamily.normal, color: '#000', marginBottom: 15 }}>
                        {item.review}</Text>
                      {/* <GalleryBlockIcon/> */}
                      <Text numberOfLines={2} style={{ fontSize: 12, fontFamily: Theme.FontFamily.normal, color: '#747A82', marginTop: 15 }}>
                        {item.reviewer.first_name} {item.reviewer.last_name} |  {moment(item.created_at).format("MMM Do YYYY")}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ height: 1.2, width: width - 40, backgroundColor: '#DFDFDF', marginVertical: 20 }}
                  />
                </>
              )
            }}
          />
          {reviewList.length > 0 ?
            <Text onPress={() => setReviewModal(true)} numberOfLines={2} style={{ fontSize: 12, fontFamily: Theme.FontFamily.bold, color: '#E15454', marginBottom: 0 }}>
              View all reviews
            </Text> : null}


        </View>
      </ScrollView>
      <View style={{
        height: 80,
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
          android: {
            // elevation: 3,
          },
        }),
      }}>
        <View style={{}}>
          <Text style={{ fontSize: 19, fontFamily: Theme.FontFamily.bold, color: '#000' }}>$ {hotelDetails?.average_price}
            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000' }}>/night</Text>
          </Text>
          {/* <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000',  marginTop: 1 }}>
            {moment(selected).format("MMMM Do")} - {checkout == null ? 'Checkout Date' : moment(checkout).format("MMMM Do")}</Text> */}
        </View>
        <Pressable onPress={() => {
          if (login_status) NavigationService.navigate('ConfirmDetails', { details: hotelDetails })
          else {
            HelperFunctions.showToastMsg('Please login first')
            NavigationService.navigate('Login')
          }
        }} style={{
          backgroundColor: '#E15454',
          height: 45,
          width: 120,
          borderRadius: 5, alignItems: 'center', justifyContent: 'center'
        }}>
          <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#fff' }}>Book</Text>
        </Pressable>
      </View>
      <ImageView
        images={sliderImageZoom}
        imageIndex={0}
        // HeaderComponent={}
        visible={visible}
        doubleTapToZoomEnabled={true}
        animationType='fade'
        // backgroundColor='rgba(0,0,0,0.7)'
        onRequestClose={() => {

          setIsVisible(false)
        }}
      />
      <ImageView
        images={RoomImageZoom}
        imageIndex={0}
        // HeaderComponent={}
        visible={visibleRoom}
        doubleTapToZoomEnabled={true}
        animationType='fade'
        FooterComponent={({ imageIndex, imagesCount }) => (
          <View style={styles.root}>
            <Text style={styles.text}>{`${imageIndex + 1} / ${RoomImageZoom.length}`}</Text>
            <Text numberOfLines={2} style={{ ...styles.text, marginVertical: 10 }}>{RoomImageZoom[0]?.description ?? null}</Text>
          </View>
        )}
        // backgroundColor='rgba(0,0,0,0.7)'
        onRequestClose={() => {
          setRoomImageZoom([])
          setIsVisibleRoom(false)
        }}
      />
      <ReactNativeModal
        isVisible={ReviewModal}
        // backdropColor={'rgba(228, 14, 104, 1)'}
        backdropOpacity={0.7}
        style={{
          margin: 0,
          padding: 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        // animationIn={'zoomInDown'}
        // animationOut={'zoomOut'}
        onBackButtonPress={() => setReviewModal(false)}
        onBackdropPress={() => setReviewModal(false)}>
        <View
          style={{
            width: width,
            height: height / 1.8,
            backgroundColor: '#fff',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            // alignItems: 'center',
            // justifyContent:'center',
            padding: 20,
          }}>
          <Text
            // onPress={()=>setReviewModal(true)}
            numberOfLines={2} style={{ fontSize: 20, fontFamily: Theme.FontFamily.bold, color: '#000', textAlign: 'left', marginBottom: 10 }}>
            All reviews
          </Text>
          <FlatList
            data={reviewList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 10 }}
            renderItem={({ item, index }) => {
              return (
                <>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View style={{ width: 50, height: 25, backgroundColor: '#2BA57C', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 1 }}>
                      <Text style={{ fontSize: 12, fontWeight: '600', color: '#fff', marginRight: 5 }}>{item.rating}</Text>
                      <Icon name="star" type='AntDesign' color="#fff" size={10} />
                    </View>
                    <View style={{ width: '80%' }}>
                      <Text numberOfLines={2} style={{ fontSize: 12, fontFamily: Theme.FontFamily.normal, color: '#000', marginBottom: 15 }}>
                        {item.review}</Text>
                      {/* <GalleryBlockIcon/> */}
                      <Text numberOfLines={2} style={{ fontSize: 12, fontFamily: Theme.FontFamily.normal, color: '#747A82', marginTop: 15 }}>
                        {item.reviewer.first_name} {item.reviewer.last_name} |  {moment(item.created_at).format("MMM Do YYYY")}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ height: 1.2, width: width - 40, backgroundColor: '#DFDFDF', marginVertical: 20 }}
                  />
                </>
              )
            }}
          />
        </View>
      </ReactNativeModal>
    </ScreenLayout>
  )
}

export default FavouriteDetails

const styles = StyleSheet.create({
  root: {
    height: 70,
    backgroundColor: "#00000077",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 17,
    color: "#FFF"
  }
})