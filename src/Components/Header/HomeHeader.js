import {
	View,
	Text,
	TextInput,
	TextInputComponent,
	TouchableOpacity,
	StyleSheet,
    Image,
    Pressable,
    StatusBar
  } from 'react-native';
  import React, {useState} from 'react';
  import Theme from '../../Constants/Theme';
  import IonIcon from 'react-native-vector-icons/Ionicons'
import { FONTS } from '../../Constants/Fonts';
import NavigationService from '../../Services/Navigation';
import DrawerIcon from '../../assets/icons/DrawerIcon';
import Notification from '../../assets/icons/Notification';
import ChatIcon from '../../assets/icons/ChatIcon';
import { Platform } from 'react-native';
import EditIcon from '../../assets/icons/EditIcon';
import EditProfileIcon from '../../assets/icons/EditProfileIcon';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSelector } from 'react-redux';

// import IonIcon from 'react-native-vector-icons/Ionicons'


  const HomeHeader = props => {
		const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight()+20 : StatusBar.currentHeight;
    const { login_status, userDetails, token } = useSelector(state => state.authData);
	  
	return (
    <>
    
	  <View style={[{
			  backgroundColor: props.HeaderColor ? props.HeaderColor : 'white',
        // paddingTop:Platform.OS ==='ios' ? 20 : 60,
          paddingVertical:0,paddingHorizontal:20,
		  height: 64,width: '100%',alignItems:'center',flexDirection:'row',justifyContent:'space-between'
		  },props.style]}>
       
			{/* {props.leftIconComponent?props.leftIconComponent:<IonIcon onPress={props.onLeftIconPress} style={[styles.lefticonStyle]} name={props.vectorIconName?props.vectorIconName:"chevron-back"} color={props.vectorIconColor?props.vectorIconColor:Theme.colors.white} size={25} />} */}
            <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',alignItems:'center'}}>
            <Pressable
            onPress={props.onLeftIconPress}
            >
             <Image
              source={require('../../assets/images/Logo.png')}
              resizeMode='contain'
              style={{
                width: 103,
                height: 30,
                // marginTop:2
              }}
            />
            </Pressable>
            {login_status ?
            <TouchableOpacity 
            onPress={() => NavigationService.navigate('MyProfile')}
            style={{
                height:41,
                width:41,
                borderRadius:40,
                borderColor: '#E15454',
                borderWidth: 1.5,
                padding:1.5
            }}
            // onPress={props.NotiIconPress}
            >
          <Image
              source={userDetails.avatar ? { uri: userDetails.avatar } : {uri:'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'}}
              resizeMode='cover'
              style={{
                width: 35,
                height: 35,
                borderRadius:39
                // marginTop:2
              }}
            />
           </TouchableOpacity> : null
  }
            </View>
        
            {/* <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={props.NotiIconPress}>
           <Notification/>
           </TouchableOpacity>
                <TouchableOpacity onPress={props.ChatIconPress}>
                <ChatIcon/>

                </TouchableOpacity>
            </View> */}

				  
		  </View>
      </>
	);
  };

  const styles=StyleSheet.create({
	lefticonStyle:{
		// marginStart:'3%',
		// paddingHorizontal:20
	},
	leftHeadingStyle:{
		color:Theme.colors.white,
		fontFamily:Theme.FontFamily.medium,
		fontSize:16,textAlign:'center'
	}
  })
  
  export default HomeHeader;
  
