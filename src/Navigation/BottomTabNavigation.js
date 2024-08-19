import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';

import { useScrollToTop } from '@react-navigation/native';
import HomePage from '../Screens/Home/HomePage';

import HomeEnableIcon from '../assets/icons/HomeEnableIcon';



import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Animated, Easing, Platform, Pressable, View } from 'react-native';
import { FONTS } from '../Constants/Fonts';
import Theme from '../Constants/Theme';
import HomeDisabledIcon from '../assets/icons/HomeDIsableIcon';
import FavouriteEnable from '../assets/icons/favouriteEnable';
import FavouriteIcon from '../assets/icons/favouriteIcon';
import MessageEnable from '../assets/icons/MessageEnabled';
import MessageIcon from '../assets/icons/MessageIcon';
import NotificatioEnable from '../assets/icons/NotificationEnable';
import NotificationIcon from '../assets/icons/NotificationIcon';
import MenuEnable from '../assets/icons/MenuEnable';
import MenuIcon from '../assets/icons/MenuIcon';
import FavouriteIndex from '../Screens/Favourites/FavouriteIndex';
import MessageIndex from '../Screens/Messages/MessageIndex';
import NotificationIndex from '../Screens/Notifications/NotificationIndex';
import { useEffect, useRef } from 'react';
import MenuIndex from '../Screens/Mennu/MenuIndex';
// If you want Bottom Tabs Navigator then use Bottom Tabs
// https://reactnavigation.org/docs/bottom-tab-navigator
// import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  // const theme = useTheme();
  // theme.colors.secondaryContainer = 'transperent';
  // const translateYy = useRef(new Animated.Value(70)).current


  // const toggleBottomTab = () => {
  //   Animated.timing(Heigth, {
  //     toValue: 70,
  //     duration: 500,
  //     // easing: Easing.linear,
  //     useNativeDriver: false  // <-- neccessary
  //   }).start();
  // }
  // const toggleBottomTab1 = () => {
  //   Animated.timing(translateYy, {
  //     toValue: 0,
  //     duration: 50,
  //     // easing: Easing.linear,
  //     useNativeDriver: false  // <-- neccessary
  //   }).start();
  // }
  
  return (
    <Animated.View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="HomePage"

        // screenOptions={{ headerShown: false }}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#E15454',
          tabBarInactiveTintColor: '#000000',
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: Theme.FontFamily.bold,
            // marginBottom: moderateScale(7),
        },
          tabBarStyle: [{
            backgroundColor: '#fff',
            paddingBottom:Platform.OS ==='ios'? 15 :10,
            paddingTop:5,
            height: 70,
            borderWidth: 0,
            elevation:8,
            // borderColor: 'black',
            ...Platform.select({
              ios: {
                shadowColor: 'black',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
              },
              // android: {
              //   elevation: 1.5,
              //   backgroundColor: 'rgba(255, 255, 255, 0.5)',
              //   // paddingTop:10
              // },
            }),
            // paddingBottom: 5,

          }],

        }}
      >
        <Tab.Screen
          name="HomePage"
          component={HomePage}
          
          options={{
            unmountOnBlur: false,
            tabBarLabel:"Home",
            // lazy:true,
            tabBarLabelStyle:{
              fontSize: 10,
              fontFamily: Theme.FontFamily.bold,
              // marginBottom: moderateScale(7),
          },
            // tabBarIcon:'',
            tabBarIcon: ({ color,focused }) => (
              focused ?
              <HomeEnableIcon Color={color} /> : 
      <HomeDisabledIcon/>

            ),
          }}
        />
            <Tab.Screen
          name="FavouriteIndex"
          component={FavouriteIndex}
          
          options={{
            unmountOnBlur: true,
            tabBarLabel:"Favourite",
            tabBarLabelStyle:{
              fontSize: 10,
              fontFamily: Theme.FontFamily.bold,
              // marginBottom: moderateScale(7),
          },
            // tabBarIcon:'',
            tabBarIcon: ({ color ,focused}) => (
              focused ?
              <FavouriteEnable  /> : 
      <FavouriteIcon/>
            ),
          }}
        />
         <Tab.Screen
          name="MessageIndex"
          component={MessageIndex}
          
          options={{
            unmountOnBlur: false,
            tabBarLabel:"Messages",
            tabBarLabelStyle:{
              fontSize: 10,
              fontFamily: Theme.FontFamily.bold,
              // marginBottom: moderateScale(7),
          },
            // tabBarIcon:'',
            tabBarIcon: ({ color ,focused}) => (
              focused ?
              <MessageEnable Color={color} /> : 
      <MessageIcon/>
            ),
          }}
        />

<Tab.Screen
          name="NotificationIndex"
          component={NotificationIndex}
          
          options={{
            unmountOnBlur: false,
            tabBarLabel:"Notifications",
            tabBarLabelStyle:{
              fontSize: 10,
              fontFamily: Theme.FontFamily.bold,
              // marginBottom: moderateScale(7),
          },
            // tabBarIcon:'',
            tabBarIcon: ({ color ,focused}) => (
              focused ?
              <NotificatioEnable Color={color} /> : 
          <NotificationIcon/>
            ),
          }}
        />
        <Tab.Screen
          name="MenuIndex"
          component={MenuIndex}
          
          options={{
            unmountOnBlur: false,
            tabBarLabel:"Menu",
            tabBarLabelStyle:{
              fontSize: 10,
              fontFamily: Theme.FontFamily.bold,
              // marginBottom: moderateScale(7),
          },
            // tabBarIcon:'',
            tabBarIcon: ({ color ,focused}) => (
              focused ?
              <MenuEnable Color={color} /> : 
      <MenuIcon/>
            ),
          }}
        />

      </Tab.Navigator>
    
    </Animated.View>
  );
}

export default BottomTabNavigation;
