import { ActivityIndicator, Dimensions, Platform, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FloatingLabelTextInput from '../../Components/EditTextComponent/FloatingLabelTextInput'
import { Icon } from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Image } from 'react-native';
import NavigationService from '../../Services/Navigation';
import HelperFunctions from '../../Constants/HelperFunctions';
import { useFocusEffect } from '@react-navigation/native';
import { postApi } from '../../Services/Service';
import { getData, setData } from '../../Services/LocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUserDetails } from '../../Store/Reducers/AuthReducer';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { width, height } = Dimensions.get('window');

const Login = (props) => {
  const dispatch = useDispatch()
  const { login_status, userDetails, token } = useSelector(state => state.authData);

    const [email, setEmail] = useState(props.route?.params?.email ? props.route?.params?.email : '');
    const [Pass, setPass] = useState(props.route?.params?.pass ? props.route?.params?.pass : '');
    const [show, setShow] = useState(false);
    const [showP, setShowP] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const [Loder, setLoader] = useState(false);

    const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight()+15 : StatusBar.currentHeight +10;
    const Login = () => {
     if (email == null || email == undefined || email?.trim()?.length == 0) {
          HelperFunctions.showToastMsg("Please enter your email")
      }
      else if (!HelperFunctions.isvalidEmailFormat(email)) {
          HelperFunctions.showToastMsg("Please enter valid email")
      }
      else if (Pass == null || Pass == undefined || Pass?.length == 0) {
          HelperFunctions.showToastMsg("Please enter your password")
      }
      else {
          setLoader(true)
          let data = {
            "username":email,
            "password":Pass
          }
          postApi("api/login", data, "").then(response => {
              // console.log('response',response)
              if (response?.status) {
                  storeToLocalAndRedux(response)
                  HelperFunctions.showToastMsg("Logged In Successfully")
                  NavigationService.navigate('BottomTabNavigation')
                  setLoader(false)

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
  }

    const storeToLocalAndRedux=(userDataa)=>{
      console.log('userDataa',userDataa?.data?.user)

      setData('account', userDataa?.data?.user)
      setData('token',userDataa?.token)
      dispatch(setUserDetails(userDataa?.data?.user))
      dispatch(setToken(userDataa?.token))

    }
    return (
      <ScreenLayout
      headerStyle={{ backgroundColor: '#FFF' }}
      // showLoading={Loading}
      //   isScrollable={true}
      leftHeading={''}
      viewStyle={{ backgroundColor: '#F9F6F6' }}
      // hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}
  >
    
        <View style={styles.container}>
            {console.log('object',showP)}
         <StatusBar
          backgroundColor={'transparent'}
          // animated={true}
          barStyle={'dark-content'}
          translucent={true}
        />
        {
          console.log('first',props.route?.params?.email)
        }
      {console.log('props.navigation>>>>>>', userDetails,token,login_status,getData('account'))}
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{width:150,height:70,backgroundColor:Theme.colors.secondary,alignItems:'center',justifyContent:'center'
        ,alignSelf:'center',marginBottom:height/15,borderRadius:5,marginTop:20}}>
       <Image 
                source={require('../../assets/images/Logo.png')}
                style={{
                    height:70,
                    width:140
                }}
                resizeMode='contain'
                />
</View>
<FloatingLabelTextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        emai
      />
      <View style={{height:10}}/>
      <FloatingLabelTextInput
        label="Password"
        value={Pass}
        onChangeText={setPass}
        secureTextEntry
      />
         <Text
         onPress={()=>NavigationService.navigate('ForgotPass')}
         style={{fontFamily:Theme.FontFamily.bold,color:Theme.colors.secondary,fontSize:15,textAlign:'right',marginTop:5}}>
            Forgot Password ? </Text>
            <Pressable
                    onPress={() => Login()}

                    style={{
                        height: 50, width: width - 50, borderRadius: 5, flexDirection: 'row',
                        backgroundColor: '#E15454', marginTop: 25, alignItems: 'center', justifyContent: 'center'
                    }}>
                    <Text style={{ fontFamily: Theme.FontFamily.bold, color: '#fff', fontSize: 15 }}>
                        Log In</Text>
                    {Loder ?
                        <ActivityIndicator style={{ marginHorizontal: 10 }} color={"#fff"} size={20} />
                        :
                        null
                    }
                </Pressable>
        
         <View style={{alignSelf:'center',marginTop:100}}>
           <Text style={{fontFamily:Theme.FontFamily.bold,color:'#000',fontSize:14}}>
            Don't have an account ? <Text 
            onPress={()=>NavigationService.navigate('SignUp')}
            style={{fontFamily:Theme.FontFamily.bold,color:'#356BB5',fontSize:15,textDecorationLine:'underline'}}>
            Sign Up </Text></Text>
            </View>
        
        </KeyboardAwareScrollView>
        </View>
        </ScreenLayout>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
      paddingTop:20,paddingBottom:50,
        paddingHorizontal: 25,
        // alignItems:'center',
        backgroundColor:'#fff'
    }
})