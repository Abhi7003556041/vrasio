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
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../Services/LocalStorage';
import { postApi } from '../../Services/Service';
import { setUserDetails } from '../../Store/Reducers/AuthReducer';
const { width, height } = Dimensions.get('window');

const UpdatePassword = (props) => {
    const route = useRoute();
    const dispatch = useDispatch()
    const [UserId, setUserId] = useState();
    // Access the customProp passed from the source screen
    const customProp = route.params?.showButton;
    
    const { login_status, userDetails, token } = useSelector(state => state.authData);
    const [email, setEmail] = useState('');
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
    const [Loder, setLoader] = useState(false);

    const [Pass, setPass] = useState('');
    const [OldPass, setOldPass] = useState('');
    const [ConfPass, setConfPass] = useState('');

    const [Phone, setPhone] = useState('');

    const [show, setShow] = useState(false);
    const [showP, setShowP] = useState(true);
    const [showPass, setShowPass] = useState(false);

    const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() + 15 : StatusBar.currentHeight + 10;
    const changePass = () => {
        if (OldPass == null || OldPass == undefined || OldPass?.length == 0) {
            HelperFunctions.showToastMsg("Please enter Old password")
        }
        else if (Pass == null || Pass == undefined || Pass?.length == 0) {
            HelperFunctions.showToastMsg("Please enter your password")
        }
        else if (ConfPass == null || ConfPass == undefined || ConfPass?.length == 0) {
          HelperFunctions.showToastMsg("Please enter Confirm Old password")
      }
      else if(ConfPass != Pass){
        HelperFunctions.showToastMsg("Confirm password & New password are not same!!!")

      }
        else {
            setLoader(true)
            let data = {    
              "type":"passwordchange",
              "password":Pass,
              "oldpassword":OldPass          
                
            }
            postApi("api/profiledata", data, token).then(response => {
                console.log('response',response)
                if (response?.status) {
                    storeToLocalAndRedux(response)
                    NavigationService.back()
                    HelperFunctions.showToastMsg(response?.message)
                    setLoader(false)

                } else {
                    HelperFunctions.showToastMsg(response?.message?.password_confirmation[0] 
                      + response?.message?.password_confirmation[1] ?? "")
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
      console.log('userDataa',userDataa?.data)
    
      setData('account', userDataa?.data)
     
      dispatch(setUserDetails(userDataa?.data))
      
    }
    return (
        <ScreenLayout
            headerStyle={{ backgroundColor: '#FFF' }}
            // showLoading={Loading}
            //   isScrollable={true}
            leftHeading={'Reset Password'}
            viewStyle={{ backgroundColor: '#F9F6F6' }}
            // hideLeftIcon={customProp ? false : true}
            onLeftIconPress={() => NavigationService.back()}
        >
            <View style={styles.container}>
            <View style={{ alignItems: 'center', marginTop: 0 }}>
                    <Image
                        source={userDetails.avatar ? { uri: userDetails.avatar } : require('../../assets/images/Profile.png')}
                        style={{
                            height: 110,
                            width: 110,
                            borderRadius: 100
                        }}
                    />
                    {/* <Pressable style={{position:'absolute',bottom:15,right:width/2.75,height:20,width:20,borderRadius:20,backgroundColor:'#E15454',alignItems:'center',justifyContent:'center'}}>
                <EditIcon/>
            </Pressable> */}

                </View>
                <View style={{ alignItems: 'center', marginTop: 15 ,marginBottom:30}}>
                    <Text style={{ fontFamily: Theme.FontFamily.bold, fontSize: 22, color: '#000', }}>
                        {userDetails.first_name} {userDetails.last_name}
                    </Text>
                   
                </View>
                {/* {console.log('object', UserId)} */}
                <StatusBar
                    backgroundColor={'transparent'}
                    // animated={true}
                    barStyle={'dark-content'}
                    translucent={true}
                />
                <FloatingLabelTextInput
                    label="Old Password"
                    value={OldPass}
                    onChangeText={setOldPass}
                    secureTextEntry
                />
                <FloatingLabelTextInput
                    label="New Password"
                    value={Pass}
                    onChangeText={setPass}
                    secureTextEntry
                />
                <FloatingLabelTextInput
                    label="Confirm Password"
                    value={ConfPass}
                    onChangeText={setConfPass}
                    secureTextEntry
                />
               

                <Pressable
                    onPress={() => changePass()}

                    style={{
                        height: 50, width: width - 150, borderRadius: 5, flexDirection: 'row',alignSelf:'center',
                        backgroundColor: '#E15454', marginTop: 25, alignItems: 'center', justifyContent: 'center'
                    }}>
                    <Text style={{ fontFamily: Theme.FontFamily.bold, color: '#fff', fontSize: 15 }}>
                        Update Password</Text>
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

export default UpdatePassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 35, paddingBottom: 50,
        paddingHorizontal: 25,
        // alignItems:'center',
        backgroundColor: '#fff'
    }
})