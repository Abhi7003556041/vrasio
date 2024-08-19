import { ActivityIndicator, Dimensions, FlatList, I18nManager, Platform, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FloatingLabelTextInput from '../../Components/EditTextComponent/FloatingLabelTextInput'
import { AppTextInput, Icon } from 'react-native-basic-elements';
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
import ReactNativeModal from 'react-native-modal';
import { countryCodes } from '../../Constants/countryCodes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');

const SignUp = (props) => {
    const route = useRoute();
    const dispatch = useDispatch()

    // Access the customProp passed from the source screen
    const customProp = route.params?.showButton;
    const [email, setEmail] = useState('');
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
    const [Loder, setLoader] = useState(false);
    const [countryCode, setCountryCode] = useState('91')
    const [countryCodeList, setCountryCodeList] = useState(countryCodes)
    const [Pass, setPass] = useState('');
    const [ConfirmPass, setConfirmPass] = useState('');
    const [Phone, setPhone] = useState('');
    const [CountryModal, setCountryModal] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const [show, setShow] = useState(false);
    const [showP, setShowP] = useState(true);
    const [showPass, setShowPass] = useState(false);

    const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() + 15 : StatusBar.currentHeight + 10;
    function handleSearchClick(val) {

        if (val === "") {
          setCountryCodeList(countryCodes);
          setSearchVal(val)
          return;
        }
        const filterBySearch = countryCodes.filter((item) => {
          if (item.name.en.toLowerCase()
            .includes(val.toLowerCase())) { return item; }
        })
        setSearchVal(val)
        setCountryCodeList(filterBySearch);
      }
    const SignUp = () => {
        if (fName == null || fName == undefined || fName?.length == 0) {
            HelperFunctions.showToastMsg("Please enter your first name")
        }
        else if (lName == null || lName == undefined || lName?.length == 0) {
            HelperFunctions.showToastMsg("Please enter last name")
        }
        else if (email == null || email == undefined || email?.trim()?.length == 0) {
            HelperFunctions.showToastMsg("Please enter your email")
        }
        else if (!HelperFunctions.isvalidEmailFormat(email)) {
            HelperFunctions.showToastMsg("Please enter valid email")
        }
        else if (Phone == null || Phone == undefined || Phone?.length == 0 ) {
            HelperFunctions.showToastMsg("Please enter your phone number")
        }
        else if ( Phone?.length < 10 ) {
            HelperFunctions.showToastMsg("Phone number cannot be less than 10 digit")
        }
        else if (Pass == null || Pass == undefined || Pass?.length == 0) {
            HelperFunctions.showToastMsg("Please enter your password")
        }
        else if ( Pass?.length < 8 ) {
            HelperFunctions.showToastMsg("Password cannot be less than 8 digit")
        }
        else if (ConfirmPass == null || ConfirmPass == undefined || ConfirmPass?.length == 0) {
            HelperFunctions.showToastMsg("Please confirm your password")
        }
        else if(ConfirmPass != Pass ){
        HelperFunctions.showToastMsg("Password & Confirm password are not same!!!")

        }
        else {
            setLoader(true)
            let data = {
                "first_name":fName,
                "last_name":lName,
                "email":email,
                "password":Pass,
                "password_confirmation":ConfirmPass,
                "mobile":Phone,
                "user_type":3,
                "country_code":countryCode
            }
            postApi("api/register", data, "").then(response => {
                console.log('response',response)
                if (response?.status) {
                    //   storeToLocalAndRedux(response)
                    props.navigation.replace("OtpInputPage",{User_Id:response?.data?.user_id,email:email,pass:Pass})
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

    //   const storeToLocalAndRedux=(userData)=>{
    //     // console.log('userData',userData)

    //     setData('account', userData?.user)
    //     setData('token',userData?.token)
    //     dispatch(setUserDetails(userData?.user))
    //     dispatch(setToken(userData?.token))

    //   }

    return (
        <ScreenLayout
            headerStyle={{ backgroundColor: '#FFF' }}
            // showLoading={Loading}
            //   isScrollable={true}
            leftHeading={'Sign Up'}
            viewStyle={{ backgroundColor: '#F9F6F6' }}
            // hideLeftIcon={customProp ? false : true}
            onLeftIconPress={() => NavigationService.back()}
        >
            <View style={styles.container}>
                {console.log('object', showP)}
                <StatusBar
                    backgroundColor={'transparent'}
                    // animated={true}
                    barStyle={'dark-content'}
                    translucent={true}
                />
           <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                
                <FloatingLabelTextInput
                    label="First Name"
                    value={fName}
                    onChangeText={setfName}
                />
                <FloatingLabelTextInput
                    label="Last Name"
                    value={lName}
                    onChangeText={setlName}
                />
                <FloatingLabelTextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                   
                    emai
                />
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:width-50}}>
                <View style={{
          paddingLeft: 10,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          width:countryCode.length > 3 ? 80 : 72, alignSelf: 'center',
          borderColor: 'rgba(0, 0, 0, 0.5)',
          borderWidth: 0.7, marginTop: 7,
          flexDirection: 'row', borderRadius: 5,marginRight:5
        }}>
                <TouchableOpacity
                           onPress={() => setCountryModal(true)}
                           style={{
                             flexDirection: 'row', alignItems: 'center', width: '90%',
                            //  marginLeft: countryCode.length > 3 ? 25  : 15,
                           }}>
                           <Text style={{ fontSize: 15, fontFamily: Theme.FontFamily.bold, color: '#000', }} >
                             +{countryCode}</Text>
                           <Icon
                             name='caretdown'
                             type='AntDesign'
                             color='#000'
                             size={8}
               
                             style={{ marginHorizontal: 5 }}
                           />
                         </TouchableOpacity>
                         </View>
                <FloatingLabelTextInput
                    label="Phone Number"
                    value={Phone}
                    onChangeText={setPhone}
                    numb
                    widthh='75%'
                />
                </View>
                <FloatingLabelTextInput
                    label="Password"
                    value={Pass}
                    onChangeText={setPass}
                    secureTextEntry
                />
                <FloatingLabelTextInput
                    label="Confirm Password"
                    value={ConfirmPass}
                    onChangeText={setConfirmPass}
                    secureTextEntry
                />

                <Pressable
                    onPress={() => SignUp()}

                    style={{
                        height: 50, width: width - 50, borderRadius: 5, flexDirection: 'row',
                        backgroundColor: '#E15454', marginTop: 25, alignItems: 'center', justifyContent: 'center'
                    }}>
                    <Text style={{ fontFamily: Theme.FontFamily.bold, color: '#fff', fontSize: 15 }}>
                        Sign Up</Text>
                    {Loder ?
                        <ActivityIndicator style={{ marginHorizontal: 10 }} color={"#fff"} size={20} />
                        :
                        null
                    }
                </Pressable>
                {/* <View
                    style={{ flex: 1 }}
                /> */}
                <View style={{ alignSelf: 'center',marginTop:100 }}>
                    <Text style={{ fontFamily: Theme.FontFamily.bold, color: '#000', fontSize: 14 }}>
                        Already have an account ? <Text
                            onPress={() => NavigationService.navigate('Login')}
                            style={{ fontFamily: Theme.FontFamily.bold, color: '#356BB5', fontSize: 15, textDecorationLine: 'underline' }}>
                            Log In </Text></Text>
                </View>
                {/* <></> */}
                </KeyboardAwareScrollView>
            </View>
            <ReactNativeModal
        isVisible={CountryModal}
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
        onBackButtonPress={() => setCountryModal(false)}
        onBackdropPress={() => setCountryModal(false)}>
        <View
          style={{
            width: width,
            height: height / 2,
            backgroundColor: '#fff',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            alignItems: 'center',
            // justifyContent:'center',
            padding: 20,
          }}>
            {/* {console.log('countryCode',countryCode)} */}
          <AppTextInput
            value={searchVal}
            onChangeText={handleSearchClick}
            placeholder="Search"
            placeholderTextColor={'rgba(0, 0, 0, 0.54)'}
            inputStyle={{ fontSize: 14 }}
            titleStyle={{
              fontFamily: Theme.FontFamily.semiBold,
              fontSize: Theme.sizes.s16,
            }}
            mainContainerStyle={
              {
                //   marginHorizontal:20
              }
            }
            leftIcon={{
              name: 'search',
              type: 'Ionicon',
              color: '#000',
              size: 25,
            }}
            inputContainerStyle={{
              width: width - 40,
              height: 60,
              backgroundColor: 'rgba(0, 0, 0, 0.1)', paddingRight: 20, paddingLeft: 10, borderWidth: 0,
              marginTop: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center'
            }}
            style={{ fontSize: 16, fontFamily: Theme.FontFamily.normal, color: '#000', marginLeft: 10 }}
          />
          <FlatList
            data={countryCodeList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  onPress={() => {
                    setCountryCode(item.dial_code.replace("+",""))
                    setCountryModal(false)
                    setSearchVal("")
                    setCountryCodeList(countryCodes)
                  }}
                  style={{
                    width: width - 40,
                    height: 60,
                    backgroundColor: 'rgba(0, 0, 0, 0.05)', paddingHorizontal: 20,
                    marginTop: 20, borderRadius: 10, flexDirection: 'row', alignItems: 'center'
                  }}>
                  <Text style={{ fontSize: 25, fontFamily: Theme.FontFamily.normal, color: '#000' }}>{item.flag}</Text>
                  <Text style={{ fontSize: 16, fontFamily: Theme.FontFamily.normal, color: '#000', width: '22%', textAlign: 'center' }}>{item.dial_code}</Text>
                  <Text style={{ fontSize: 16, fontFamily: Theme.FontFamily.normal, color: '#000' }}>{item.name.en}</Text>

                </Pressable>
              )
            }}
          />
        </View>
      </ReactNativeModal>
        </ScreenLayout>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10, paddingBottom: 50,
        paddingHorizontal: 25,
        // alignItems:'center',
        backgroundColor: '#fff'
    }
})