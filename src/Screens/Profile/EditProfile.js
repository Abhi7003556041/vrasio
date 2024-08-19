import { ActivityIndicator, Button, Dimensions, FlatList, Image, PermissionsAndroid, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import { useRoute } from '@react-navigation/native';
import { AppTextInput, Icon } from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import DoubleTick from '../../assets/icons/DoubleTick';
import EditIcon from '../../assets/icons/EditIcon';
import FloatingLabelTextInput from '../../Components/EditTextComponent/FloatingLabelTextInput';
import MyDropDownComponent from '../../Components/MyDropDownComponent/MyDropDownComponent';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import {getApi, postApi } from '../../Services/Service';
import HelperFunctions from '../../Constants/HelperFunctions';
import { setUserDetails } from '../../Store/Reducers/AuthReducer';
import { setData } from '../../Services/LocalStorage';
const { width, height } = Dimensions.get('window');

const EditProfile = (props) => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const { login_status, userDetails, token } = useSelector(state => state.authData);
  const form = new FormData(null);
  const [Loder, setLoader] = useState(false);
  const [UpdateLoader, setUpdateLoader] = useState(false);

  const [Info, setInfo] = useState()
  const dispatch = useDispatch()

  const [Phone, setPhone] = useState(userDetails.mobile ?? '');
  const [Gender, setGender] = useState(userDetails.gender);
  const [GenderNew, setGenderNew] = useState(userDetails.gender);

  const [fName, setfName] = useState(userDetails.first_name ??'');
  const [lName, setlName] = useState(userDetails.last_name ?? '');
  const [email, setEmail] = useState(userDetails.email ?? '');
  const [DOB,setDOB] = useState(userDetails?.dob ?? 'Date of birth')
  const [datee,setDatee] = useState(userDetails?.dob ?? 'Date of birth')
  const [choseDate,setChoseDate] = useState(false)
  const [genderDropDown,setGenderDropDown] = useState(false)
  const [allData, setAllData] = useState([])
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [images, setimages] = useState(userDetails.avatar ? userDetails.avatar : '')
  const [imagesdet, setimagesdet] = useState('')
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", moment(date).format('MMM Do YYYY'));
    setDOB(moment(date).format('MMM Do YYYY'))
    setDatee(moment(date).format('YYYY-MM-DD'))
    setChoseDate(true)
    hideDatePicker();
  };
  function getOriginalname(data) {
    let arr = data.split("/");
    let lent = Number(arr.length - 1);
    return arr[lent];
}
const getPermissionIos = async () => {
    if(Platform.OS === 'ios') {
        requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MEDIA_LIBRARY]).then((statuses) => {
            console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
            console.log('MEDIA_LIBRARY', statuses[PERMISSIONS.IOS.MEDIA_LIBRARY]);
          });
    }
};
const getPermission = async () => {
    if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
            // PermissionsAndroid.PERMISSIONS.MEDIA_LIBRARY,
            PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
    }
  
};
const imageUpload = () => {
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
    }).then(image => {
        console.log('imaher', image)
    let get_originalname = getOriginalname(image.path);
        
      // form.append('image_for', 'profile_image');
      form.append('profile_image', {
        uri: image.path,
        type: image.mime,
        name: get_originalname,
      });
      console.log('form',form)
       if(form!=null && image){
        UpdateProfileImage()
       }

    });
}
// const cameraUpload = () => {
//     ImagePicker.openCamera({
//         width: 300,
//         height: 400,
//         cropping: true
//     }).then(image => {
//         console.log('imaher', image)
//         let get_originalname = getOriginalname(image.path);
        
//       // form.append('image_for', 'profile_image');
//       form.append('profile_image', {
//         uri: image.path,
//         type: image.mime,
//         name: get_originalname,
//       });
//       console.log('form',form)

//         setimages(image.path);
//         setimagesdet(image)
//     });
// }

const UpdateProfileImage = () => {
      setLoader(true)
      postApi("api/change-profile-image",form,token,'multipart/form-data').then(response=>{
        console.log('response',response)
        if (response?.status) {
          storeToLocalAndRedux(response)
        //   props.navigation.replace("DrawerNavigation")
        HelperFunctions.showToastMsg(response?.message)
          
        setLoader(false)
          
        } else {
          HelperFunctions.showToastMsg(response?.error ?? 'Failed')
          setLoader(false)

        }
      }).catch(error=>{
          HelperFunctions.showToastMsg(error?.message)
        setLoader(false)
      }).finally(()=>{
        setLoader(false)
      })
      

}
const UpdateProfile = () => {
  let data = {
    "type":"update",
    "first_name":fName,
    "last_name":lName,
    "dob":choseDate ?moment(datee).format('YYYY-MM-DD') : moment(datee,'MM-DD-YYYY').format('YYYY-MM-DD'),
    "gender":GenderNew
  }
  setUpdateLoader(true)
  postApi("api/profiledata",data,token).then(response=>{
    console.log('UpdateProfile',response)
    if (response?.status) {
      storeToLocalAndRedux(response)
    //   props.navigation.replace("DrawerNavigation")
    HelperFunctions.showToastMsg(response?.message)
    NavigationService.back()
    setUpdateLoader(false)
      
    } else {
      HelperFunctions.showToastMsg(response?.error ?? 'Failed')
      setUpdateLoader(false)

    }
  }).catch(error=>{
      HelperFunctions.showToastMsg(error?.message)
    setUpdateLoader(false)
  }).finally(()=>{
    setUpdateLoader(false)
  })
  

}

const getProfile = async () => {
  let data= {
    "type":"fetch"
}
  postApi("api/profiledata", data, token).then(response => {
      console.log('getProfile',response)
      if (response?.status) {
          storeToLocalAndRedux(response)
          setLoader(false)
          setInfo(response.data)
      } else {
          HelperFunctions.showToastMsg(response?.error)
          setLoader(false)
      }
  }).catch(error => {
      HelperFunctions.showToastMsg(error?.message)
      setLoader(false)
  }).finally(() => {
      setLoader(false)
  })
}
const storeToLocalAndRedux=(userDataa)=>{
  console.log('userDataa',userDataa?.data)

  setData('account', userDataa?.data)
 
  dispatch(setUserDetails(userDataa?.data))
  
}
useEffect(() => {
  getProfile()
  Platform.OS ==='ios' ?  getPermissionIos() : getPermission()
}, [])
  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: '#FFF' }}
      // showLoading={Loading}
        // isScrollable={true}
      leftHeading={'Edit Profile'}
      viewStyle={{ backgroundColor: '#fff', paddingHorizontal: 5 }}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}
    >
      {console.log('jdfhdjksfhjkdsf',form.getAll("profile_image"))}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={{flex:1, alignItems: 'center', marginTop: 50 }}>
          <Image
            source={userDetails.avatar ? {uri:userDetails.avatar} : require('../../assets/images/Profile.png')}
            style={{
              height: 110,
              width: 110,
              borderRadius: 200
            }}
          />
          {Loder ?
          <ActivityIndicator style={{position:'absolute',top:0,bottom:0,right:0,left:0}} color={'#fff'} /> : null}
          <TouchableOpacity
          onPress={imageUpload}
          style={{ position: 'absolute', bottom: 15, right:width>700 ? width/2.4 :width>1000 ? width/2.25 :  width / 2.85, height: 25, width: 25, borderRadius: 20, backgroundColor: '#E15454', alignItems: 'center', justifyContent: 'center' }}>
            <EditIcon />
          </TouchableOpacity>

        </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontFamily: Theme.FontFamily.bold, fontSize: 22, color: '#000', }}>
          {userDetails.first_name} {userDetails.last_name}
          </Text>
          {/* <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 13, color: '#E15454', }}>
                    Edit basic info
                    </Text> */}
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <FloatingLabelTextInput
            label="First name"
            value={fName}
            onChangeText={setfName}
          // emai
          />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <FloatingLabelTextInput
            label="Last name"
            value={lName}
            onChangeText={setlName}
          // emai
          />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <FloatingLabelTextInput
            label="Mobile number"
            value={Phone}
            onChangeText={setPhone}
            numb
            edit={false}
          />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <FloatingLabelTextInput
            label="Email address"
            value={email}
            onChangeText={setEmail}
            emai
            edit={false}

          />
        </View>
        {/* <TouchableOpacity 
        onPress={showDatePicker}
        style={{
          marginHorizontal: 20, marginTop: 20, borderWidth: 1, flexDirection: 'row', alignItems: 'center',
          borderColor: '#aaa', borderRadius: 5, paddingHorizontal: 10, height: 55, justifyContent: 'space-between'
        }}>
          <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 15, color:DOB == 'Date of birth' ? 'grey' : '#000', }}>
            {DOB}
          </Text>
          <Icon
            name="angle-right"
            type="FontAwesome"
            // color={'#aaa'}
            size={20}
            style={{ alignSelf: 'center', marginRight: 5 }}
          />
        </TouchableOpacity>
        {isDatePickerVisible ?
        <View>
     
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        // minimumDate={new Date(new Date().toDateString())}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View> : null
} */}
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <View
            style={{}}>

            <MyDropDownComponent
              onBlur={() => setGenderDropDown(false)}
              onFocus={() => setGenderDropDown(true)}
              itemTextStyle={{ color: '#000' }}
              selectedTextStyle={{ color: '#000' }}
              itemTestIDField="English"
              placeholder="Select gender"
              renderRightIcon={
                genderDropDown
                  ? undefined
                  : () => (
                    <Icon
            name="angle-right"
            type="FontAwesome"
            // color={'#aaa'}
            size={20}
            style={{ alignSelf: 'center', marginRight: 5 }}
          />
                  )
              }
              style={{ ...styles.category_view, backgroundColor: '#fff' }}
              data={[
                {'type':'Male'},
                {'type':'Female'},
                {'type':'Others'},
              ]}
              labelField="type"
              valueField="type"
              value={Gender}
              onChange={e => {
                console.log('rtrt',e)
                setGender(e)
                setGenderNew(e.type)
              }
              }
            />
          </View>
        </View>
        <View style={{ height: 1.2, backgroundColor: '#DFDFDF', width: width - 40, marginTop: 40, alignSelf: 'center' }} />
        <Pressable
        onPress={UpdateProfile}
        style={{alignSelf:'center', marginTop: 20,padding:10,width:150,backgroundColor:Theme.colors.lightRed,alignItems:'center',justifyContent:'center',borderRadius:5 }}>
          <Text style={{ fontFamily: Theme.FontFamily.bold, fontSize: 14, color: '#fff', textAlign: 'center' }}>
            Update
          </Text>
          {UpdateLoader ?
          <ActivityIndicator collapsable color={'#fff'}/> : null}
        </Pressable>
      </ScrollView>
      {UpdateLoader ?
      <View style={{position:'absolute',height:'100%',width:'100%',bottom:0,backgroundColor:'rgba(0,0,0,0.5)'}}>
									<View style={{flex:1,justifyContent:'center',flexDirection:'column'}}>
										<View style={{justifyContent:'center',flexDirection:'column',alignItems:'center', backgroundColor:'white',width:70,height:70,alignSelf:'center',borderRadius:10,
									shadowColor: '#000',
									shadowOffset: { width: 0, height: 0 },
									shadowOpacity: 0.2,
									shadowRadius: 6,  
									elevation: 6,
									backgroundColor:"white",
									// borderRadius:70
									
									}}>
											{/* <Lottie style={{width:90,aspectRatio:1 }} source={require('../../assets/icons/loading.json')} autoPlay loop /> */}
											<ActivityIndicator size={'large'} color={'#00AD70'}/>
											
											{/* <Lottie style={{width:90,aspectRatio:1 }} source={require('../../assets/icons/new_loading.json')} autoPlay loop /> */}
										</View>
									</View>
								</View> : null
}
    </ScreenLayout>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  text_style: {
    fontFamily: Theme.FontFamily.normal,
    width: '100%',
    fontSize: 14,
    color: '#000',
  },
  category_view: {
    width: Dimensions.get('window').width - 50,
    borderRadius: 5,
    // marginHorizontal: 10,
    marginTop: 0,
    borderColor: '#aaa',
    borderWidth: 1,
    height: (55), paddingHorizontal: 15,
    // marginLeft:10
    alignSelf: 'center',
  },
})