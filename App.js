
import { Alert, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React, { createRef, useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './src/Store/AppStore'
import { ThemeProvider } from './src/Constants/ThemeContext'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigation from './src/Navigation/MainNavigation'
import NavigationService from './src/Services/Navigation'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { setHostStatus, setToken, setUserDetails } from './src/Store/Reducers/AuthReducer'
import { SplashScreen } from './src/Screens'
import {check, PERMISSIONS, request, requestMultiple, RESULTS} from 'react-native-permissions';

import { getData } from './src/Services/LocalStorage'
import AuthNavigation from './src/Navigation/AuthNavigation'
import { setCurrencyDetails, setLanguageDetails } from './src/Store/Reducers/CommonReducer'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
import HelperFunctions from './src/Constants/HelperFunctions'
import HostNavigation from './src/Navigation/HostNavigation'
import { LogLevel, OneSignal } from 'react-native-onesignal';
export const navRef=createRef()
export const isReady=createRef()
const Stack = createNativeStackNavigator();

const App = () => {

  const { login_status, userDetails,token ,host_status } = useSelector(state => state.authData);
  const dispatch = useDispatch()
  const [LoderStatus, setLoderStatus] = useState(true);
  // OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // // OneSignal Initialization
  // OneSignal.initialize("e21407db-c9d5-4417-9913-f1df3d03e60e");

  // // requestPermission will show the native iOS or Android notification permission prompt.
  // // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  // OneSignal.Notifications.requestPermission(true);

  // // Method for listening for notification clicks
  // OneSignal.Notifications.addEventListener('click', (event) => {
  //   console.log('OneSignal: notification clicked:', event);
  // });
  // const headerHeight = useHeaderHeight();
  const checkUser = async () => {
    let result = await getData('account');
    let resulttoken = await getData('token');
    let currencyy = await getData("currency")
    let languagee = await getData("language")
    let host = await getData("host")



    // console.log('resultttltl>>>>>>>>>', host)
    
    if (result && resulttoken ) {
      dispatch(setUserDetails(result))
      dispatch(setToken(resulttoken))
      
    }
    if(currencyy){

      dispatch(setCurrencyDetails(currencyy))
    }
    if(languagee){
      dispatch(setLanguageDetails(languagee))
    }
    if(host){
      dispatch(setHostStatus(host))
    }
   
    setLoderStatus(false)
  }
  const requestLocationPermission = async () => {
    if (Platform.OS == 'ios') {
      request(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(result => {
          if (result == RESULTS.GRANTED) {
            // sendLocation();
            checkUser()
          }else{
            checkUser()
          }
        })
        .catch(error => {
          console.warn(err);
        });
    }
  };

  
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Location Permission',
            'message': 'This App needs access to your location ' +
                       'so we can know where you are.'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use locations ")
          checkUser()
        } else {
          console.log("Location permission denied")
          checkUser()
        }
      } catch (err) {
        console.warn(err)
      }
    }
  
};
  useEffect(() => {
    // Platform.OS === 'ios' ? requestLocationPermission() : getPermission()
    checkUser()
    // setTimeout(() => {
    //   setLoderStatus(false)
    // },2000)
  }, [])
  React.useEffect(() => {
    return () => (isReady.current = false);
  }, []);
  if (LoderStatus) return <SplashScreen/>

    return (
      <View style={{flex:1}}>
        <AutocompleteDropdownContextProvider >
    <ThemeProvider>
    <NavigationContainer onReady={()=>isReady.current=true} ref={r => NavigationService.setTopLevelNavigator(r)}>
    <Stack.Navigator
            initialRouteName='MainNavigation'
            screenOptions={{ 
              animation: 'none',
              headerShown: false,
               }}
          >
             {console.log('login_status',userDetails,token,host_status)}
             {host_status == true ? (
                        <Stack.Screen name="HostNavigation" component={HostNavigation} />
                    ) : ( 
                        <Stack.Screen name="MainNavigation" component={MainNavigation} />
                     )} 

          </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
    </AutocompleteDropdownContextProvider>
    </View>
    )
}

export default App

const styles = StyleSheet.create({})

// const license = require("./pesdk_license");

// try {
//   await PESDK.unlockWithLicense(license);
// } catch (error) {
//   console.log(`Failed to unlock PE.SDK with error: ${error}.`);
// }