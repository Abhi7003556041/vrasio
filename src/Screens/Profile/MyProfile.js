import { Alert, Dimensions, FlatList, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import { useRoute } from '@react-navigation/native';
import { AppTextInput } from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import DoubleTick from '../../assets/icons/DoubleTick';
import EditIcon from '../../assets/icons/EditIcon';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { setData } from '../../Services/LocalStorage';
import { resetAuthData, resetHostStatus } from '../../Store/Reducers/AuthReducer';
import { setTotalFavourite } from '../../Store/Reducers/CommonReducer';
const { width, height } = Dimensions.get('window');

const MyProfile = (props) => {
    const route = useRoute();
    // Access the customProp passed from the source screen
    const customProp = route.params?.showButton;
    const dispatch = useDispatch()

    const { login_status, userDetails, token,host_status } = useSelector(state => state.authData);
  const {dashboardDetails, currencyDetails } = useSelector(state => state.commonData);

    const [email, setEmail] = useState('');

    const logout = () => {


        setData('account', null)
        setData('token', null)
        setData('host',null)
        dispatch(resetHostStatus())
        dispatch(resetAuthData())
        dispatch(setTotalFavourite([]))
        NavigationService.back()

    }
    const createTwoButtonAlert = () =>
        Alert.alert('Logout', 'Are you sure?', [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => logout() },
        ]);
    return (
        <ScreenLayout
            headerStyle={{ backgroundColor: '#FFF' }}
            // showLoading={Loading}
            //   isScrollable={true}
            leftHeading={'My Profile'}
            viewStyle={{ backgroundColor: '#fff', paddingHorizontal: 5 }}
            hideLeftIcon={customProp ? false : true}
            onLeftIconPress={() => NavigationService.back()}
        >
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 25 }}>
                <View style={{ alignItems: 'center', marginTop: 35 }}>
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
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ fontFamily: Theme.FontFamily.bold, fontSize: 22, color: '#000', }}>
                        {userDetails.first_name} {userDetails.last_name}
                    </Text>
                    <Text
                        onPress={() => NavigationService.navigate('EditProfile')}
                        style={{ fontFamily: Theme.FontFamily.normal, fontSize: 13, color: '#E15454', }}>
                        Edit basic info
                    </Text>
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                    <Text style={{ fontFamily: Theme.FontFamily.bold, fontSize: 13, color: '#000', }}>
                        First name
                    </Text>
                    <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 13, color: '#000', marginTop: 1 }}>
                        {userDetails.first_name}
                    </Text>
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Text style={{ fontFamily: Theme.FontFamily.bold, fontSize: 13, color: '#000', }}>
                        Last name
                    </Text>
                    <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 13, color: '#000', marginTop: 1 }}>
                        {userDetails.last_name}
                    </Text>
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Text style={{ fontFamily: Theme.FontFamily.bold, fontSize: 13, color: '#000', }}>
                        Mobile number
                    </Text>
                    <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 13, color: '#000', marginTop: 1 }}>
                        {userDetails.mobile}
                    </Text>
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Text style={{ fontFamily: Theme.FontFamily.bold, fontSize: 13, color: '#000', }}>
                        Email address
                    </Text>
                    <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 13, color: '#000', marginTop: 1 }}>
                        {userDetails.email}
                    </Text>
                </View>
                {/* <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Text style={{ fontFamily: Theme.FontFamily.bold, fontSize: 13, color: '#000', }}>
                        Date of birth
                    </Text>
                    <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 13, color: '#000', marginTop: 1 }}>
                        {moment(userDetails?.dob, 'MM-DD-YYYY').format('MMM Do YYYY')}
                    </Text>
                </View> */}
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Text style={{ fontFamily: Theme.FontFamily.bold, fontSize: 13, color: '#000', }}>
                        Gender
                    </Text>
                    <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 13, color: '#000', marginTop: 1 }}>
                        {userDetails.gender}
                    </Text>
                </View>
                <View style={{ height: 1.2, backgroundColor: '#DFDFDF', width: width - 40, marginTop: 40, alignSelf: 'center' }} />
               {host_status ? null : <View style={{ marginTop: 20 }}>
                    <Text onPress={createTwoButtonAlert} style={{ fontFamily: Theme.FontFamily.normal, fontSize: 15, color: '#E15454', textAlign: 'center' }}>
                        Log Out
                    </Text>
                   
                </View>}
                <Pressable
                onPress={()=>NavigationService.navigate('UpdatePassword')}
                style={{ marginVertical: 20 ,width:150,backgroundColor:Theme.colors.lightRed,padding:10,borderRadius:5,alignSelf:'center'}}>
                   
                    <Text  style={{ fontFamily: Theme.FontFamily.normal, fontSize: 14, color: '#fff', textAlign: 'center' }}>
                        Update Password
                    </Text>
                </Pressable>
            </ScrollView>
        </ScreenLayout>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    text_style: {
        fontFamily: Theme.FontFamily.normal,
        width: '100%',
        fontSize: 14,
        color: '#000',
    },
})