import { ActivityIndicator, Dimensions, FlatList, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import NavigationService from '../../Services/Navigation';
import { useSelector } from 'react-redux';
import Theme from '../../Constants/Theme';
import FloatingLabelTextInput from '../../Components/EditTextComponent/FloatingLabelTextInput';
import { Icon } from 'react-native-basic-elements';
import array1 from '../../Components/ContextApi/GlobalComp';
import { postApi } from '../../Services/Service';
import HelperFunctions from '../../Constants/HelperFunctions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SearchMapCard from '../../Components/Map/SearchMapCard';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KeyboardAvoidingView } from 'react-native';
const { width, height } = Dimensions.get('window');

const PropertyAddStep5 = (props) => {
  const { login_status, userDetails, token } = useSelector(state => state.authData);
  const { dashboardDetails, currencyDetails, favouriteList } = useSelector(state => state.commonData);
  const {addResponse} = props.route.params
  const [Loder, setLoader] = useState(false);
  const [ADD1, setADD1] = useState('');
  const [ADD2, setADD2] = useState('');
  const [ADD3, setADD3] = useState('');
  const [ADD4, setADD4] = useState('');
  const [ADD5, setADD5] = useState('');
  const [ADD6, setADD6] = useState('');
  const [latitude,setLatitude] = useState('')
  const [longitude,setLongitude] = useState('')
  const [stateCode,setStateCode] = useState('')
  const [countryCode,setCountryCode] = useState('')
  const [Description, setDescription] = useState('');
  const [check, setCheck] = useState('')
  const [Amenities,setAmenities] = useState( array1[0]?.amenities ? array1[0]?.amenities :[] )
  const [amenitiesIndex, setamenitiesIndex] = useState([])
  const [aminity, setAminity] = useState([]);
  const [searchLoc, setSearchLoc] = useState({})
  const [searchLocAddress, setSearchLocAddress] = useState(null)
  const AddLocation = () => {
    if (aminity.length==0) {
      HelperFunctions.showToastMsg("Please Choose Aminities!!!")
      return
    }
    else {
      let data = {
        "propertySlug": addResponse?.slug,
        "amenities": aminity.map((res) => {
          return { "amenities_id": res?.id }
        })
      }
      setLoader(true)
      postApi("api/addamenities", data, token).then(response => {
        console.log('AddAmenities>>>>>>>>>>', data)
        if (response?.status) {
          console.log('AddAmenities>>fjkwhsdkfjhskjd>>>>>>>>', JSON.stringify(response.data))
          HelperFunctions.showLongToastMsg(response?.message ?? "Saved Successfully")

          // NavigationService.navigate('PropertyAddStep3',{addResponse:response?.data})
        } else {
          HelperFunctions.showLongToastMsg(response?.message ?? "failed")
          console.log('AddAmenities>>fjkwhsdkfjhskjd>>>>>>>>', JSON.stringify(response.data))
  
        }
        setLoader(false)
      }).catch(error => {
        HelperFunctions.showToastMsg("error?.message")
        setLoader(false)
  
      }).finally(() => {
        setLoader(false)
  
      })
    }
  }

  const getPropertyDetails = () => {
    let data = {
      propertySlug : addResponse?.slug
    }
   
    setLoader(true)
    postApi("api/propertydetailsbyid", data, token).then(response => {
      // console.log('12124545>>>>>>>>', response?.data?.propertytype)
      if (response?.status) {
        // console.log('getPropertyDetails>>87878>>>>>>>>',(response?.data))
        setLatitude(response?.data?.latitude)
        setLongitude(response?.data?.longitude) 
        // setSearchLoc(response?.data?.location?.address_one)
        setSearchLocAddress(response?.data?.location?.address_one)
        setADD3(response?.data?.location?.city)
        setADD4(response?.data?.location?.state)
        setADD5(response?.data?.location?.country)
        setADD6(response?.data?.location?.pincode)
        setStateCode(response?.data?.location?.state_code)
        setCountryCode(response?.data?.location?.country_code)
      } else {
        HelperFunctions.showLongToastMsg(response?.message)

      }
      setLoader(false)
    }).catch(error => {
      HelperFunctions.showToastMsg(error?.message)
      setLoader(false)

    }).finally(() => {
      setLoader(false)

    })
  }

  useEffect(()=>{
    if(addResponse?.slug){

      getPropertyDetails()
    }
  },[])

  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: '#FFF' }}
      showLoading={Loder} 
      //   isScrollable={true}
      leftHeading={'Tell Us Your Location'}
      viewStyle={{ backgroundColor: '#FFF' }}
      onLeftIconPress={() => NavigationService.back()}
    >
            {console.log('first12121>>>>>>>', countryCode,stateCode)}
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
       
      <View style={{paddingBottom:100,}}>
        {/* <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 45, borderBottomColor: '#C4C4C4', borderBottomWidth: 1.5 }}>
          <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.bold, fontSize: 20 }}>Location</Text>
          <Text style={{ color: Theme.colors.btnColor, fontFamily: Theme.FontFamily.bold, fontSize: 16 }}>05
            <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.bold, fontSize: 16 }}> / 07</Text>
          </Text>
        </Pressable> */}
        <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.bold, fontSize: 19, marginTop: 0, marginBottom: 10 }}>Search your specific location</Text>
 
       
        <View style={{ width: width - 70, alignSelf: 'center',position:'absolute',top:60,zIndex:999999999 }}>
              <GooglePlacesAutocomplete
                placeholder='Enter a Location'
                placeholderTextColor={'#000'}
                textInputProps={{
                  placeholderTextColor: Theme.colors.grey,
                  returnKeyType: 'search',
                }}
                // autoFillOnNotFound={true}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(JSON.stringify(details));
                  setLatitude(details?.geometry?.location?.lat)
                  setLongitude(details?.geometry?.location?.lng)
                  // setSearchLoc(details?.geometry?.location)
                  setSearchLocAddress(details?.formatted_address)
                  setADD5(details?.formatted_address.split(',')[details?.formatted_address.split(',').length-1])
                  setADD4(details?.formatted_address.split(',')[details?.formatted_address.split(',').length-2].split(' ').slice(1,3).join(' '))
                  setADD3(details?.formatted_address.split(',')[details?.formatted_address.split(',').length-3])
                  setADD6(details?.address_components.find((x)=>x.types.includes("postal_code")) ? details?.address_components.filter((x)=>x.types.includes("postal_code"))[0].long_name : "")
                  setStateCode(details?.address_components.find((x)=>x.types.includes("administrative_area_level_1")) ?
                   details?.address_components.filter((x)=>x.types.includes("administrative_area_level_1"))[0].short_name : "")
                   setCountryCode(details?.address_components.find((x)=>x.types.includes("country")) ?
                    details?.address_components.filter((x)=>x.types.includes("country"))[0].short_name : "")
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
                    // backgroundColor: '#fff',
                    color:'#000'
                  },
                  // poweredContainer:{
                  //   backgroundColor: 'red',
                  //   color:'#000'
                  // },
                  textInput: {
                    
                    height: 44,
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
                    color:'#000',
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
        <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:60}}>
          {latitude != '' && longitude != '' ?
       <View style={{height:220}}>
       <SearchMapCard latt={latitude  } longg={longitude } />
        </View> 
        : 
        <View style={{height:220,width:'100%',backgroundColor:'#BEBEBE',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                    <View style={{
           justifyContent: 'center', flexDirection: 'column', alignItems: 'center', backgroundColor: '#131313', width: 40, height: 40, alignSelf: 'center', borderRadius: 10,
           shadowColor: '#000',
           shadowOffset: { width: 0, height: 0 },
           shadowOpacity: 0.2,
           shadowRadius: 6,
           elevation: 6,
           backgroundColor: "white",
           // borderRadius:70

         }}>
                     <ActivityIndicator size={'small'} color={'#00AD70'}/>

         
         </View>
          </View>
}
        <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.bold, fontSize: 20, marginTop: 15, marginBottom: 0 }}>Enter Property Address
         </Text>
        <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.normal, fontSize: 14, marginTop: 5, marginBottom: 10 }}>Address line 1 
          <Text style={{ color: 'red' }} > *</Text></Text>
        <TextInput
          style={{ ...styles.input, height: 45, paddingTop: Platform.OS === 'ios' ? 0 : 10 }}
          placeholder='Address line 1 *'
          placeholderTextColor={'#8D8D8D'}
          value={searchLocAddress}
          // onChangeText={setTitle}
        />
         <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.normal, fontSize: 14, marginTop: 0, marginBottom: 10 }}>Address line 2
          <Text style={{ color: 'red' }} > *</Text></Text>
        
        <TextInput
          style={{ ...styles.input, height: 45, paddingTop: Platform.OS === 'ios' ? 0 : 10 }}
          placeholder='Address line 2 *'
          placeholderTextColor={'#8D8D8D'}
          value={searchLocAddress}
          // onChangeText={setTitle}
        />
        {searchLocAddress ?
        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
        <TextInput
          style={{ ...styles.input, height: 45, paddingTop: Platform.OS === 'ios' ? 0 : 10,width:'47%' }}
          // placeholder='Property Title *'
          placeholderTextColor={'#8D8D8D'}
          value={ADD3}
          // onChangeText={setTitle}
        />
        <TextInput
          style={{ ...styles.input, height: 45, paddingTop: Platform.OS === 'ios' ? 0 : 10,width:'47%' }}
          // placeholder='Property Title *'
          aria-disabled
          placeholderTextColor={'#8D8D8D'}
          value={ADD4}
          // onChangeText={setTitle}
        />
        <TextInput
          style={{ ...styles.input, height: 45, paddingTop: Platform.OS === 'ios' ? 0 : 10,width:'47%' }}
          // placeholder='Property Title *'
          placeholderTextColor={'#8D8D8D'}
          value={ADD5}
          // onChangeText={setTitle}
        />
        {ADD6 ? 
        <TextInput
          style={{ ...styles.input, height: 45, paddingTop: Platform.OS === 'ios' ? 0 : 10,width:'47%' }}
          // placeholder='Property Title *'
          placeholderTextColor={'#8D8D8D'}
          value={ADD6}
          // onChangeText={setTitle}
        /> : null}
        </View> : null}
        </KeyboardAwareScrollView>
        </View>
       
        <View style={{
        height: 80,
        backgroundColor: '#fff',
        // alignItems: 'center',
        paddingHorizontal: 25,
        marginTop: 0,
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
          <Text onPress={() => NavigationService.back()}  style={{ fontSize: 16, fontFamily: Theme.FontFamily.bold, color: 'grey',textDecorationLine:'underline' }}>Back</Text>
          {/* <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000',  marginTop: 1 }}>
            {moment(selected).format("MMMM Do")} - {checkout == null ? 'Checkout Date' : moment(checkout).format("MMMM Do")}</Text> */}
        </View>
        <Pressable onPress={() => {
        //  AddAmenities()
        }} style={{
          backgroundColor: '#E15454',
          height: 45,
          width: 100,
          borderRadius: 5, alignItems: 'center', justifyContent: 'center'
        }}>
          <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#fff' }}>Next</Text>
        </Pressable>
      </View>
      </View>
    </ScreenLayout>
  )
}

export default PropertyAddStep5

const styles = StyleSheet.create({
  input: {
    width: '100%', height: 48,
    borderColor: '#DFDFDF',color:'#000',
    borderWidth: 1.3, marginBottom: 15,
    fontSize: 14, borderRadius: 5, paddingHorizontal: 15,
  },
})