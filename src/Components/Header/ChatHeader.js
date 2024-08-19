import {
	View,
	Text,
	TextInput,
	TextInputComponent,
	TouchableOpacity,
	StyleSheet,
	Platform,
    Pressable,
    Image,
  } from 'react-native';
  import React, {useState} from 'react';
  import Theme from '../../Constants/Theme';
  import IonIcon from 'react-native-vector-icons/Ionicons'
  import Entypo from 'react-native-vector-icons/Entypo'
  import database from '@react-native-firebase/database';


import Icon from 'react-native-vector-icons';
import ThreeDots from '../../assets/icons/ThreeDots';
import moment from 'moment-timezone';

// var momentt = require('moment-timezone');

  const ChatHeader = props => {
	 
	return (
	  <View style={[{
			  backgroundColor: props.HeaderColor ? props.HeaderColor : 'white',
              paddingVertical:0,paddingHorizontal:20,
              minHeight: 65,width: '100%',alignItems:'center',flexDirection:'row',justifyContent:'space-between'
		  },props.style]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
			{props.leftIconComponent?props.leftIconComponent:
            <IonIcon onPress={props.onLeftIconPress} style={[styles.lefticonStyle]} 
            name={props.vectorIconName?props.vectorIconName:"arrow-back"} color={props.vectorIconColor?props.vectorIconColor:Theme.colors.white} size={25} />}
			<View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity 
            style={{
                height:45,
                width:45,
                borderRadius:40,
                borderColor: '#E15454',
                borderWidth: 1.5,
                padding:1.5,marginLeft:10
            }}
            onPress={props.NotiIconPress}>
          <Image
              source={props.host ? {uri: props.host} : require('../../assets/images/image.png')}
              resizeMode='cover'
              style={{
                width: 39,
                height: 39,
                borderRadius:39
                // marginTop:2
              }}
            />
           </TouchableOpacity>
           <View style={{marginHorizontal:10}}>
           <Text numberOfLines={2} style={[styles.leftHeadingStyle,{fontSize:14,color:'#000',fontWeight:'bold',width:260}]}>{props.property}</Text>
            <Text style={[styles.leftHeadingStyle]}>{props.leftHeading}</Text>
            {/* <Text style={{fontSize:10,color:'#9AA1AB',fontFamily:Theme.FontFamily.semiBold}}>{props.property}</Text> */}
            {/* <Text>{console.log("=====>1",JSON.stringify(database.ServerValue.TIMESTAMP))}</Text> */}
            </View>
            </View>
            </View>
			{
			 props.Watch ? 
             <Pressable >
			<Entypo
            color={'#fff'}
            name='dots-three-vertical'
            size={16}
            // style={{transform: [{rotateY: '90deg'}]}}
            />
            </Pressable>
            :
			<Text style={[{
				color:props.Noti ? '#E1D01F': Theme.colors.white,
				fontFamily:Theme.FontFamily.medium,
				fontSize:15,textAlign:'center'
			},props.leftHeadingStyle]} onPress={props.onRightTextPress}>{props.right ? 'Next' : props.Save ? 'Save' : props.Publish ? 'Publish' :props.Noti ? 'Read All': '      '}</Text>
  }	  
		  </View>
	);
  };

  const styles=StyleSheet.create({
	lefticonStyle:{
        color:'#000'
		// marginStart:'3%',
		// paddingHorizontal:20
	},
	leftHeadingStyle:{
		color:Theme.colors.grey,
		// fontFamily:Theme.FontFamily.bold,
		fontSize:11,
	},
	
  })
  
  export default ChatHeader;
  
