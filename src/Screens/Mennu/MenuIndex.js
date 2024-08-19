import { Alert, Dimensions, FlatList, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import { useRoute } from '@react-navigation/native';
// import { AppTextInput } from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import DoubleTick from '../../assets/icons/DoubleTick';
import ReservationIcon from '../../assets/icons/ReservationIcon';
import CurrencyIcon from '../../assets/icons/CurrencyIcon';
import LanguageIcon from '../../assets/icons/LanguageIcon';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import HelpIcon from '../../assets/icons/HelpIcon';
import FeedbackIcon from '../../assets/icons/FeedbackIcon';
import { AppTextInput, Icon, RadioButton } from 'react-native-basic-elements';
import { setData } from '../../Services/LocalStorage';
import { resetAuthData, resetHostStatus, setHostStatus } from '../../Store/Reducers/AuthReducer';
import { useDispatch, useSelector } from 'react-redux';
import HelperFunctions from '../../Constants/HelperFunctions';
import { setTotalFavourite } from '../../Store/Reducers/CommonReducer';
import DeviceInfo from 'react-native-device-info';
const { width, height } = Dimensions.get('window');

const MenuIndex = (props) => {
    const route = useRoute();
  const dispatch = useDispatch()
  const { login_status, userDetails,token,host_status  } = useSelector(state => state.authData);

    // Access the customProp passed from the source screen
    const customProp = route.params?.showButton;
    const [email, setEmail] = useState('');
    const logout = () => {
   

        setData('account', null)
        setData('token', null)
        setData('host',null)
        // dispatch(resetHostStatus())
        dispatch(resetAuthData())
        dispatch(setTotalFavourite([]))
    
      }
      const switchHost = () => {
          setData('host',true)
          dispatch(setHostStatus(true))
      }
      const createTwoButtonAlert = () =>
      Alert.alert('Logout', 'Are you sure?', [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => logout()},
      ]);
    const [allData, setAllData] = useState(
        [
        {
            'title': 'My profile',
            'image': require('../../assets/images/image.png'),
            'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
            'screen':'MyProfile'
        },
        
        {
            'title': 'Login',
            'image1': require('../../assets/images/enter.png'),
            'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
            'screen': 'Login'

        },
        {
            'title': 'My Trips',
            'icon': <ReservationIcon />,
            'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
            'screen': 'MyReservation'

        },
        {
            'title': 'Currency',
            'icon': <CurrencyIcon />,
            'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',

        },
        {
            'title': 'Language',
            'icon': <LanguageIcon />,
            'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',

        },
        {
            'title': 'Settings',
            'icon': <SettingsIcon />,
            'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',

        },
        {
            'title': 'Help Centre',
            'icon': <HelpIcon />,
            'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',

        },
        {
            'title': 'Give us Feedback',
            'icon': <FeedbackIcon />,
            'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',

        },

    ]
    )
    useEffect(()=>{
        login_status ? 
        setAllData([
            {
                'title': 'My profile',
                'image': { uri: userDetails.avatar },
                'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
                'screen':'MyProfile'
            },
            
           
            {
                'title': 'My Trips',
                'icon': <ReservationIcon />,
                'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
                'screen': 'MyReservation'
    
            },
            {
                'title': 'Currency',
                'icon': <CurrencyIcon />,
                'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
                'screen' :'CurrencyIndex'
            },
            {
                'title': 'Language',
                'icon': <LanguageIcon />,
                'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
                'screen' :'LanguageIndex'
            },
            {
                'title': 'Transaction History',
                'icon': <Icon 
                name='bank-transfer'
                type='MaterialCommunityIcon'
                size={28}
                style={{marginLeft:5}}
                color={'#000'}
                />,
                'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
                'screen' :'TransactionList'
            },
            {
                'title': 'Settings',
                'icon': <SettingsIcon />,
                'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
    
            },
            {
                'title': 'Help Centre',
                'icon': <HelpIcon />,
                'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
    
            },
            // {
            //     'title': 'Give us Feedback',
            //     'icon': <FeedbackIcon />,
            //     'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
    
            // },
    
        ]) :
        setAllData([
           
            
            {
                'title': 'Login',
                'image1': require('../../assets/images/enter.png'),
                'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
                'screen': 'Login'
    
            },
           
            {
                'title': 'Currency',
                'icon': <CurrencyIcon />,
                'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
                'screen' :'CurrencyIndex'
            },
            {
                'title': 'Language',
                'icon': <LanguageIcon />,
                'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
                'screen' :'LanguageIndex'
            },
            {
                'title': 'Settings',
                'icon': <SettingsIcon />,
                'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
                // 'screen' :'CurrencyIndex'
            },
            {
                'title': 'Help Centre',
                'icon': <HelpIcon />,
                'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
    
            },
            // {
            //     'title': 'Give us Feedback',
            //     'icon': <FeedbackIcon />,
            //     'details': 'Lorem ipsum dolor sit amet, consetetur sadips…',
    
            // },
    
        ])
        
    },[userDetails,login_status])
    return (
        <ScreenLayout
            headerStyle={{ backgroundColor: '#356BB5' }}
            // showLoading={Loading}
            isScrollable
            Home
            viewStyle={{backgroundColor:'#fff',flex:1}}
            hideLeftIcon={customProp ? false : true}
        // onLeftIconPress={() => NavigationService.openDrawer()}
        >
            {console.log('host_status',host_status)}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:20}}>
            <View >
            <FlatList
                data={allData}
                //  ListFooterComponent={<View style={{height:1,backgroundColor:'#000',width:width-40}}/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{  marginTop: 5 ,alignItems:'center'}}
                renderItem={({ item, index }) => {
                    return (
                        <View key={index} style={{ marginTop: 15, marginHorizontal: 0,width:width-40 }}>
                            <Pressable
                            onPress={()=>{
                                item?.screen ? NavigationService.navigate(item.screen) : null
                            }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                                <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center' }}>
                                    {item.image ?
                                        <Image
                                            source={item.image}
                                            resizeMode='cover'
                                            style={{
                                                height: 32, width: 32, borderRadius: 30
                                            }}
                                        /> :item.image1 ?
                                        <Image
                                            source={item.image1}
                                            resizeMode='contain'
                                            style={{
                                                height: 25, width: 25, borderRadius: 30,marginHorizontal:4
                                            }}
                                        /> :
                                        item.icon
                                    }
                                    <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' ,marginLeft:10}}>{item.title}</Text>

                                </View>
                                <Icon
                                    name="angle-right"
                                    type="FontAwesome"
                                    size={20}
                                    style={{ alignSelf: 'center', marginRight: 5 }}
                                />
                            </Pressable>
                            {index != allData.length -1 ?
                            <View style={{ height: 1.5, backgroundColor: '#DFDFDF', width: width - 40, marginTop: 20 }} />
                            :null}
                        </View>
                    )
                }}
            />
</View>
{login_status ? 
<>
            <Pressable
            onPress={()=>{
                userDetails?.host_status ==="ACTIVE" ? switchHost() :userDetails?.host_status ==="REQUEST" ? HelperFunctions.showLongToastMsg('Request already sent, Please wait for admin approval'):
                NavigationService.navigate('BecomeHostNew')
            }}
            style={{
                height:60,width:width -40,borderRadius:5,borderColor:'#000',borderWidth:1,
                // backgroundColor:userDetails?.host_status ==="ACTIVE" ? '' :'#fff',
                alignSelf:'center',marginVertical:15,marginTop:30,alignItems:'center',justifyContent:'center'
            }}
            >
            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' ,marginLeft:0}}>
                {userDetails?.host_status ==="ACTIVE" ? "Switch to Host" :userDetails?.host_status ==="REQUEST" ? "Requested for Host" : "Become a Host"}</Text>

            </Pressable>
         
            <Pressable
            onPress={()=>createTwoButtonAlert()}
            style={{
                height:60,width:width -40,borderRadius:5,backgroundColor:'#000',
                alignSelf:'center',marginVertical:0,alignItems:'center',justifyContent:'center'
            }}
            >
            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#fff' ,marginLeft:10}}>Log Out</Text>

            </Pressable></> : null
}
            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000' ,textAlign:'center',marginTop:20}}>Terms of Service • Privacy Policy</Text>
            <Text style={{ fontSize: 13, fontFamily: Theme.FontFamily.semiBold, color: '#747A82' ,textAlign:'center',marginTop:5}}>Version : {DeviceInfo.getVersion()}</Text>
            </ScrollView>
        </ScreenLayout>
    )
}

export default MenuIndex

const styles = StyleSheet.create({
    text_style: {
        fontFamily: Theme.FontFamily.normal,
        width: '100%',
        fontSize: 14,
        color: '#000',
    },
})