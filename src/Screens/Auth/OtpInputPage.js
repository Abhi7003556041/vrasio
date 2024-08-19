//import liraries
import React, { Component, useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { AppButton, Container, Icon, useTheme } from 'react-native-basic-elements';

import OtpInputs from 'react-native-otp-inputs';
import { useDispatch } from 'react-redux';
import { moderateScale } from '../../Constants/PixelRatio';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import HelperFunctions from '../../Constants/HelperFunctions';
import { postApi } from '../../Services/Service';
import OtpInput from '../../Components/EditTextComponent/OtpInputComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


// create a component
const OtpInputPage = (props) => {
  const colors = useTheme()
  const { User_Id, email, pass } = props.route.params
  // const otpInput = useRef(null)
  const [userId, setUserID] = useState(props?.route?.params?.User_Id ?? "")
  const dispatch = useDispatch();
  // const { OTP, UserData, Exist, Phone } = props.route.params
  const [userOtp, setUserOtp] = useState("");
  const [userOtpVerify, setUserOtpVerify] = useState(false);
  const [Loder, setLoader] = useState(false);
  const [ResendLoader, setResendLoader] = useState(false);
  const [ResendLoaderM, setResendLoaderM] = useState(false);


  const [LoderM, setLoaderM] = useState(false);
  const [verifyRes, setVerifyRes] = useState('')

  const [userOtpM, setUserOtpM] = useState("");
  const [userOtpVerifyMobile, setUserOtpVerifyMobile] = useState(false);

  const [ootp, setOotp] = useState('')
  // var otp = 
  const handleOtpCompleteEmail = (enteredOtp) => {
    console.log("enteredOtp:", enteredOtp);
    if (enteredOtp != "") {
      setUserOtp(enteredOtp)
      console.log('first', enteredOtp)
      if (enteredOtp.length >5) {
        emailOtpVerify(enteredOtp)
      }
      else {
        setLoader(false)
      }
    }

  };
  const handleOtpCompleteMobile = (enteredOtp) => {
    console.log("enteredOtp:", enteredOtp);
    if (enteredOtp != "") {
      setUserOtpM(enteredOtp)
      console.log('first', enteredOtp)
      if (enteredOtp.length >5) {
        mobileOtpVerify(enteredOtp)
      }
      else {
        setLoaderM(false)
      }
    }

  };
  const emailOtpVerify = (ccodee) => {
    if (ccodee == null || ccodee == undefined || ccodee?.length == 0) {
      HelperFunctions.showToastMsg("Please enter your first name")
    }
    else {
      setLoader(true)
      let data = {
        "user_id": userId,
        "otp_for": "email",
        "otp": ccodee
      }
      postApi("api/verify-otp", data, "").then(response => {
        console.log('response', response)
        if (response?.status) {
          //   storeToLocalAndRedux(response)
          HelperFunctions.showToastMsg(response?.message)
          setLoader(false)
          setVerifyRes(response?.data)
          setUserOtpVerify(true)
        } else {
          HelperFunctions.showToastMsg(response?.error ? response.error : 'OTP not matched')
          setLoader(false)
          // setUserOtpVerify(false)
        }
      }).catch(error => {
        HelperFunctions.showToastMsg(response?.message ? response.message : 'Verification failed')
        setLoader(false)
        // setUserOtpVerify(false)

      }).finally(() => {
        setLoader(false)
        // setUserOtpVerify(false)

      })

    }
  }

  const mobileOtpVerify = (ccodee) => {
    if (ccodee == null || ccodee == undefined || ccodee?.length == 0) {
      HelperFunctions.showToastMsg("Please enter your first name")
    }
    else {
      setLoaderM(true)
      let data = {
        "user_id": userId,
        "otp_for": "mobile",
        "otp": ccodee
      }
      console.log('daadata',data)
      postApi("api/verify-otp", data, "").then(response => {
        console.log('response', response)
        if (response?.status) {
          //   storeToLocalAndRedux(response)
          HelperFunctions.showToastMsg(response?.message)
          setLoaderM(false)
          setVerifyRes(response?.data)
          setUserOtpVerifyMobile(true)
        } else {
          HelperFunctions.showToastMsg(response?.message ? response.message : 'OTP not matched')
          setLoaderM(false)
          // setUserOtpVerifyMobile(false)

        }
      }).catch(error => {
        HelperFunctions.showToastMsg(error?.error ? error.error : 'Verification failed')
        setLoaderM(false)
        // setUserOtpVerifyMobile(false)

      }).finally(() => {
        setLoaderM(false)
        // setUserOtpVerifyMobile(false)

      })

    }
  }

  const resendEmailOtp = () => {
    
      setResendLoader(true)
      let data = {
        "user_id": userId,
        "otp_for":"email"
      }
      postApi("api/resend-otp", data, "").then(response => {
        console.log('response', response)
        if (response?.status) {
          //   storeToLocalAndRedux(response)
          HelperFunctions.showToastMsg(response?.message)
          setResendLoader(false)
        } else {
          HelperFunctions.showToastMsg(response?.message )
          setResendLoader(false)
          // setUserOtpVerifyMobile(false)

        }
      }).catch(error => {
        HelperFunctions.showToastMsg(response?.error ? response.error : 'failed')
        setResendLoader(false)
        // setUserOtpVerifyMobile(false)

      }).finally(() => {
        setResendLoader(false)
        // setUserOtpVerifyMobile(false)

      })
    
  }
  const resendMobileOtp = () => {
   
      setResendLoaderM(true)
      let data = {
        "user_id": userId,
        "otp_for":"mobile"
      }
      postApi("api/resend-otp", data, "").then(response => {
        console.log('response', response)
        if (response?.status) {
          //   storeToLocalAndRedux(response)
          HelperFunctions.showToastMsg(response?.message)
          setResendLoaderM(false)
          
        } else {
          HelperFunctions.showToastMsg(response?.message )
          setResendLoaderM(false)
          // setUserOtpVerifyMobile(false)

        }
      }).catch(error => {
        HelperFunctions.showToastMsg(error?.message ? error?.message : 'failed')
        setResendLoaderM(false)
        // setUserOtpVerifyMobile(false)

      }).finally(() => {
        setResendLoaderM(false)
        // setUserOtpVerifyMobile(false)

      })
  }

  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: '#FFF' }}
      // showLoading={Loading}
      //   isScrollable={true}
      leftHeading={'OTP Verify'}
      viewStyle={{ backgroundColor: '#F9F6F6' }}
      // hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}
    >
      <View style={styles.container}>

        {/* <BackHeader title={'Otp Verifiy'} /> */}
        {
          console.log('email,pass', email, pass)
        }
        <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:20}}>
        <View style={{ height: moderateScale(50) }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
          <Text style={{
            ...styles.enter_otp_txt,
            color: Theme.colors.primary,
          }}>VRASIO: Email Registration OTP Verification </Text>
          {Loder ?
            <ActivityIndicator size='small' color={'#000'} style={{ marginHorizontal: 5 }} /> : null
          }
          {userOtpVerify ?
            <Icon
              name='verified'
              type='Octicons'
              size={20}
              color={'#2BA57C'}
              style={{ marginHorizontal: 5 }}
            />
            :
            !userOtpVerify && userOtp.length == 6 ?
              <Icon
                name='error-outline'
                type='MaterialIcon'
                size={23}
                color={'red'}
              />
              : null
          }
        </View>

        <View style={{
          marginHorizontal: (5),
          justifyContent: 'center',
          marginTop: 10, height: moderateScale(60)
        }}>

          {/* <OtpInputs
            handleChange={(code) => {
              setUserOtp(code)
              console.log('first', code)
              if (code.length == 6) {
                emailOtpVerify(code)
              }
              else {
                setLoader(false)
              }
            }}
            editable={!userOtpVerify}
            numberOfInputs={6}
            inputContainerStyles={{
              width: 45, height: 45, borderWidth: 1.2, borderColor: '#aaa', borderRadius: 5, alignItems: 'center', justifyContent: 'center'
            }}
            inputStyles={{
              // fontFamily: Theme.FontFamily.bold,
              fontWeight:'600',
              fontSize: (18),
              textAlign: 'center',
              marginTop: (0), color: '#000'
            }}
            // keyboardType='numbers-and-punctuation'
            autofillFromClipboard={false}
            autofillListenerIntervalMS={false}
          /> */}
           <OtpInput
            numInputs={6}
            editable={!userOtpVerify}
            onComplete={handleOtpCompleteEmail} />
        </View>
        <Pressable 
        disabled={ResendLoader || userOtpVerify}
        onPress={()=>resendEmailOtp()}
        style={{marginTop: 10, marginRight: 0,alignItems:'center',flexDirection:'row',justifyContent:'flex-end'}}>
        {ResendLoader ?
            <ActivityIndicator size='small' color={'#000'} style={{ marginHorizontal: 5 }} /> : null
          }
        <Text style={{ fontFamily: Theme.FontFamily.bold, 
        color: userOtpVerify ? Theme.colors.grey : Theme.colors.btnColor, fontSize: 15, textAlign: 'right',marginHorizontal:5
          }}>
          Resend OTP </Text>
          </Pressable>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, marginTop: 20 }}>
          <Text style={{
            ...styles.enter_otp_txt,
            color: Theme.colors.primary,
          }}>VRASIO: Phone Number Registration OTP Verification </Text>
          {LoderM ?
            <ActivityIndicator size='small' color={'#000'} style={{ marginHorizontal: 5 }} /> : null
          }
          {userOtpVerifyMobile ?
            <Icon
              name='verified'
              type='Octicons'
              size={20}
              color={'#2BA57C'}
              style={{ marginHorizontal: 5 }}
            />
            :
            !userOtpVerifyMobile && userOtpM.length == 6 ?
              <Icon
                name='error-outline'
                type='MaterialIcon'
                size={23}
                color={'red'}
              />
              : null
          }
        </View>
       
        <View style={{
          marginHorizontal: (5),
          justifyContent: 'center',
          marginTop: 10, height: moderateScale(60)
        }}>

          {/* <OtpInputs
            handleChange={(code) => {
              setUserOtpM(code)
              console.log('first', code)
              if (code.length == 6) {
                mobileOtpVerify(code)
              }
              else {
                setLoaderM(false)
              }
            }}
            editable={!userOtpVerifyMobile}
            numberOfInputs={6}
            inputContainerStyles={{
              width: 45, height: 45, borderWidth: 1.2, borderColor: '#aaa', borderRadius: 5, 
              alignItems: 'center', justifyContent: 'center'
            }}
            inputStyles={{
              // fontFamily: Theme.FontFamily.bold,
              fontWeight:'600',

              fontSize: (18),
              textAlign: 'center',
              marginTop: (0), color: '#000'
            }}
            // keyboardType='numbers-and-punctuation'
          autofillFromClipboard={false}
          autofillListenerIntervalMS={false}
          /> */}
          <OtpInput
            numInputs={6}
            editable={!userOtpVerifyMobile}
            onComplete={handleOtpCompleteMobile} />
        </View>
        <Pressable
        disabled={ResendLoaderM || userOtpVerifyMobile}
        onPress={()=>resendMobileOtp()}
        style={{marginTop: 10, marginRight: 0,alignItems:'center',flexDirection:'row',justifyContent:'flex-end'}}>
        {ResendLoaderM ?
            <ActivityIndicator size='small' color={'#000'} style={{ marginHorizontal: 5 }} /> : null
          }
        <Text style={{ fontFamily: Theme.FontFamily.bold, 
        color:userOtpVerifyMobile ? Theme.colors.grey : Theme.colors.btnColor, fontSize: 15, textAlign: 'right',marginHorizontal:5
          }}>
          Resend OTP </Text>
          </Pressable>
        <View style={{ flex: 1 }} />
        {/* {timer == 0 ?
            <AppButton
                title="Resend"
                style={styles.button}
                textStyle={{
                    ...styles.continue_txt,
                    color: Theme.colors.secondaryFontColor
                }}

                onPress={() =>
                    login()
                }
            />
            : */}
             </KeyboardAwareScrollView>
        <AppButton
          title="Submit"
          disabled={verifyRes?.is_email_verify == "yes" && verifyRes?.is_mobile_verify == "yes" ? false : true}
          style={{
            ...styles.button,
            backgroundColor: verifyRes?.is_email_verify == "yes" && verifyRes?.is_mobile_verify == "yes" ? Theme.colors.secondary : Theme.colors.grey
          }}
          textStyle={{
            ...styles.continue_txt,
            color: Theme.colors.white
          }}

          onPress={() =>
            // checkOtp(ootp)
            NavigationService.replace('Login',{email:email,pass:pass})
            // console.log('login')
          }
        />
        {/* } */}
        
      </View>
    </ScreenLayout>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0, paddingBottom: 50,
    paddingHorizontal: 20,
    // alignItems:'center',
    backgroundColor: '#fff'
  },
  enter_otp_txt: {
    // fontFamily: Theme.FontFamily.bold,
    fontWeight:'600',
    fontSize: (18),
    textAlign: 'center',
    // marginTop: (15)
  },
  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: (5),
    backgroundColor: "#FFFFFF",
    color: '#000000',
    fontFamily: Theme.FontFamily.normal,
    fontSize: (17),
    marginHorizontal: (5),
  },
  underlineStyleHighLighted: {
    backgroundColor: "#FFFFFF",
  },
  dontHaveAccoount_txt: {
    textAlign: 'center',
    fontFamily: Theme.FontFamily.bold,
    fontSize: (14),
    marginLeft: (7),
    marginTop: 20
  },
  continue_txt: {
    fontFamily: Theme.FontFamily.bold,
    fontSize: (16),
    paddingBottom: (5),
  },
  phone_number_txt: {
    fontFamily: Theme.FontFamily.bold,
    fontSize: (14),
    marginLeft: (5)
  },
  button: {
    width: '90%',
    height: (48),
    // alignSelf: 'center',
    borderRadius: (10),
   
    backgroundColor: Theme.colors.secondary
    // marginTop: (40),
  },
});

//make this component available to the app
export default OtpInputPage;
