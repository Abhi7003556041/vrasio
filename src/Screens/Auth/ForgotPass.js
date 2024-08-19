import { ActivityIndicator, Dimensions, Platform, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FloatingLabelTextInput from '../../Components/EditTextComponent/FloatingLabelTextInput'
import { Icon } from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Image } from 'react-native';
import NavigationService from '../../Services/Navigation';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import { useRoute } from '@react-navigation/native';
import HelperFunctions from '../../Constants/HelperFunctions';
import { useDispatch } from 'react-redux';
import { setData } from '../../Services/LocalStorage';
import { postApi } from '../../Services/Service';
import OtpInputs from 'react-native-otp-inputs';
import { moderateScale } from '../../Constants/PixelRatio';
const { width, height } = Dimensions.get('window');

const ForgotPass = (props) => {
    const route = useRoute();
    const dispatch = useDispatch()

    // Access the customProp passed from the source screen
    const customProp = route.params?.showButton;
    const [email, setEmail] = useState('');
    const [UserId, setUserId] = useState('');
    const [lName, setlName] = useState('');
    const [Loder, setLoader] = useState(false);
    const [userOtp, setUserOtp] = useState("");
    const [userOtpVerify, setUserOtpVerify] = useState(false);

    const [Pass, setPass] = useState('');
    const [ConfirmPass, setConfirmPass] = useState('');
    const [Phone, setPhone] = useState('');

    const [show, setShow] = useState(false);
    const [showP, setShowP] = useState(true);
    const [showPass, setShowPass] = useState(false);

    const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() + 15 : StatusBar.currentHeight + 10;
    const SendOtp = () => {
       if (email == null || email == undefined || email?.trim()?.length == 0) {
            HelperFunctions.showToastMsg("Please enter your email")
        }
        else if (!HelperFunctions.isvalidEmailFormat(email)) {
            HelperFunctions.showToastMsg("Please enter valid email")
        }
        else {
            setLoader(true)
            let data = {      
                "email":email,
            }
            postApi("api/forgot-password", data, "").then(response => {
                console.log('response',response)
                if (response?.status) {
                    //   storeToLocalAndRedux(response)
                    setUserId(response?.data?.user_id)
                    setUserOtpVerify(true)
                    HelperFunctions.showToastMsg(response?.message)
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

    const VerifyOtp = () => {
      if (userOtp == null || userOtp == undefined || userOtp?.trim()?.length < 6) {
        HelperFunctions.showToastMsg("Please provide OTP of 6 digit")
        }
        else{
           setLoader(true)
           let data = {      
            "user_id": UserId,
            "otp":userOtp
           }
           postApi("api/verify-forgot-password", data, "").then(response => {
               console.log('response',response)
               if (response?.status) {
                   //   storeToLocalAndRedux(response)
                   setLoader(false)
                   NavigationService.navigate("ResetPass",{usrid:UserId})
                   HelperFunctions.showToastMsg(response?.message)

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


    return (
        <ScreenLayout
            headerStyle={{ backgroundColor: '#FFF' }}
            // showLoading={Loading}
            //   isScrollable={true}
            leftHeading={'Forgot Password'}
            viewStyle={{ backgroundColor: '#F9F6F6' }}
            // hideLeftIcon={customProp ? false : true}
            onLeftIconPress={() => NavigationService.back()}
        >
            <View style={styles.container}>
                {console.log('object', UserId)}
                <StatusBar
                    backgroundColor={'transparent'}
                    // animated={true}
                    barStyle={'dark-content'}
                    translucent={true}
                />
               {/* <View style={{width:150,height:70,backgroundColor:Theme.colors.secondary,alignItems:'center',justifyContent:'center',alignSelf:'center',marginBottom:height/10,borderRadius:5,marginTop:20}}>
       <Image 
                source={require('../../assets/images/Logo.png')}
                style={{
                    height:70,
                    width:140
                }}
                resizeMode='contain'
                />
</View> */}
                <FloatingLabelTextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    edit={!userOtpVerify}
                    emai
                />
        {userOtpVerify ?        
          <View>
          <Text style={{
            fontSize:17,fontWeight:'600',color:Theme.colors.secondary,marginTop:20
          }}>
            Enter OTP
          </Text>
               <View style={{
          marginHorizontal: (0),
          justifyContent: 'center',
          marginTop: 10, height: moderateScale(70),width:width-50
        }}>

          <OtpInputs
            handleChange={(code) => {
              setUserOtp(code)
              console.log('first', code)
            }}
            onFocus={(e)=>console.log('first',e)}
            onBlur={()=>console.log('blur')}
            // editable={!userOtpVerify}
            numberOfInputs={6}
            inputContainerStyles={{
              width: 50, height: 50, borderWidth: 1.2, borderColor: '#aaa', borderRadius: 5, alignItems: 'center', justifyContent: 'center'
            }}
            inputStyles={{
              // fontFamily: Theme.FontFamily.bold,
              fontWeight:'600',
              fontSize: (18),
              textAlign: 'center',
             color: '#000'
            }}
            // keyboardType=''
            autofillFromClipboard={false}
            autofillListenerIntervalMS={false}
          />
        </View>
        </View>
        :
        null
}
                <Pressable
                    onPress={() =>{
                      userOtpVerify ? VerifyOtp() :
                      SendOtp()
                    } 
                  }

                    style={{
                        height: 50, width: width - 50, borderRadius: 5, flexDirection: 'row',
                        backgroundColor: '#E15454', marginTop: 25, alignItems: 'center', justifyContent: 'center'
                    }}>
                    <Text style={{ fontFamily: Theme.FontFamily.bold, color: '#fff', fontSize: 15 }}>
                      {userOtpVerify ? "Verify":  "Send"}</Text>
                    {Loder ?
                        <ActivityIndicator style={{ marginHorizontal: 10 }} color={"#fff"} size={20} />
                        :
                        null
                    }
                </Pressable>
                
            </View>
        </ScreenLayout>
    )
}

export default ForgotPass

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20, paddingBottom: 50,
        paddingHorizontal: 25,
        // alignItems:'center',
        backgroundColor: '#fff'
    }
})