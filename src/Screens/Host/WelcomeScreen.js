import { Linking, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import { useRoute } from '@react-navigation/native';
import NavigationService from '../../Services/Navigation';
import Theme from '../../Constants/Theme';
import { useSelector } from 'react-redux';

const WelcomeScreen = (props) => {
  const route = useRoute();
  const customProp = route.params?.showButton;
  const { login_status, userDetails,token,host_status  } = useSelector(state => state.authData);
  const [Loder,setLoader] = useState(true)
  useEffect(()=>{
    setTimeout(()=>{
      setLoader(false)
      
    },1000)
  },[])
  return (
    <ScreenLayout
    headerStyle={{ backgroundColor: '#356BB5' }}
    showLoading={Loder}
    // isScrollable={true}
    Home
    leftHeading={'Become Host'}
    viewStyle={{ backgroundColor: '#fff', }}
    hideLeftIcon={customProp ? false : true}
    onLeftIconPress={() => NavigationService.back()}
  >
    <View style={{paddingHorizontal:20}}>
      <Text style={{color:Theme.colors.black,fontSize:22,fontFamily:Theme.FontFamily.bold,marginTop:15}}>Welcome, {userDetails?.first_name}!</Text>
      <Text style={{fontSize:14,fontFamily:Theme.FontFamily.normal,marginTop:5,color:Theme.colors.grey}}>Guests can reserve your place 24 hours after you publish – here’s how to prepare.</Text>
      {/* <Text onPress={()=>Linking.openURL("https://www.p82v1.updateapplications.com/vrasio/frontend/hosting/overview")}>WelcomeScreen</Text> */}
    </View>
    </ScreenLayout>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})