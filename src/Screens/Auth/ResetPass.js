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
const { width, height } = Dimensions.get('window');

const ResetPass = (props) => {
    const route = useRoute();
    const dispatch = useDispatch()
    const [UserId, setUserId] = useState(props?.route?.params?.usrid);
    // Access the customProp passed from the source screen
    const customProp = route.params?.showButton;
    const [email, setEmail] = useState('');
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
    const [Loder, setLoader] = useState(false);

    const [Pass, setPass] = useState('');
    const [ConfirmPass, setConfirmPass] = useState('');
    const [Phone, setPhone] = useState('');

    const [show, setShow] = useState(false);
    const [showP, setShowP] = useState(true);
    const [showPass, setShowPass] = useState(false);

    const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() + 15 : StatusBar.currentHeight + 10;
    const SignUp = () => {
        if (Pass == null || Pass == undefined || Pass?.length == 0) {
            HelperFunctions.showToastMsg("Please enter your password")
        }
        else if (ConfirmPass == null || ConfirmPass == undefined || ConfirmPass?.length == 0) {
            HelperFunctions.showToastMsg("Please confirm your password")
        }
        else {
            setLoader(true)
            let data = {    
              "user_id": UserId,
              "password": Pass,
              "password_confirmation":ConfirmPass
                
            }
            postApi("api/reset-password", data, "").then(response => {
                console.log('response',response)
                if (response?.status) {
                    //   storeToLocalAndRedux(response)
                    props.navigation.replace("Login")
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
                {console.log('object', UserId)}
                <StatusBar
                    backgroundColor={'transparent'}
                    // animated={true}
                    barStyle={'dark-content'}
                    translucent={true}
                />
               
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
                        Reset</Text>
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

export default ResetPass

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50, paddingBottom: 50,
        paddingHorizontal: 25,
        // alignItems:'center',
        backgroundColor: '#fff'
    }
})