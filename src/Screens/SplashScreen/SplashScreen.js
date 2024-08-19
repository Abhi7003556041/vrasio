import { ActivityIndicator, Dimensions, Image, ImageBackground, Platform, SafeAreaView, StyleSheet, Text, View ,StatusBar} from 'react-native'
import React, { useEffect } from 'react';
import AllSourcePath from '../../Constants/PathConfig';
import LinearGradient from 'react-native-linear-gradient';
import { getData, setData } from '../../Services/LocalStorage';
import { postApi } from '../../Services/Service';
import HelperFunctions from '../../Constants/HelperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUserDetails } from '../../Store/Reducers/AuthReducer';



const SplashScreen = (props) => {
  
  

  const dispatch=useDispatch()

  // useEffect(() => {

  //   setTimeout(()=>{
  //     props.navigation.replace("Login")
  //   },2000)
    
  // }, [])





  return (
    <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#2F64AC'}}>
      <StatusBar
          backgroundColor={'transparent'}
          // animated={true}
          barStyle={'dark-content'}
          translucent={true}
        />
       <Image 
                source={require('../../assets/images/Logo.png')}
                style={{
                    height:70,
                    width:140
                }}
                resizeMode='contain'
                />
    </SafeAreaView>
  )
}

export default SplashScreen
const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
})