import {
	View,
	Text,
	TextInput,
	TextInputComponent,
	TouchableOpacity,
	StyleSheet,
	Platform,
	StatusBar,
	Pressable,
	Share,
	Alert,
  } from 'react-native';
  import React, {useState} from 'react';
  import Theme from '../../Constants/Theme';
  import IonIcon from 'react-native-vector-icons/Ionicons'
import { FONTS } from '../../Constants/Fonts';
import PlaylistIcon from '../../assets/icons/PlayListIcon';
import Icon from 'react-native-vector-icons';
import ThreeDots from '../../assets/icons/ThreeDots';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ShareIcon from '../../assets/icons/ShareIcon';
import RedHeartIcon from '../../assets/icons/RedHeartIcon';

  

  const CustomHeader = props => {
		const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight()+20 : StatusBar.currentHeight;
		const onShare = async () => {
			try {
				const result = await Share.share({
					message:
						'React Native | A framework for building native apps using React',
				});
				if (result.action === Share.sharedAction) {
					if (result.activityType) {
						// shared with activity type of result.activityType
					} else {
						// shared
					}
				} else if (result.action === Share.dismissedAction) {
					// dismissed
				}
			} catch (error) {
				Alert.alert(error.message);
			}
		};
	
	return (
		<>
	  <View style={[{
			  backgroundColor: props.HeaderColor ? props.HeaderColor : 'black',
        //   paddingTop:Platform.OS ==='ios' ? 20 : 60,
		  paddingVertical:0,paddingHorizontal:20,
		  minHeight: 60,width: '100%',alignItems:'center',flexDirection:'row',justifyContent:'space-between'
		  },props.style]}>
			<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
			{
			props.leftIconComponent?props.leftIconComponent:<IonIcon onPress={props.onLeftIconPress} style={[styles.lefticonStyle]}
			 name={props.vectorIconName?props.vectorIconName:"arrow-back"} color={props.vectorIconColor?props.vectorIconColor:Theme.colors.black} size={25} />}
			<Text style={[styles.leftHeadingStyle]}>{props.leftHeading}</Text>
			</View>
			<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
			{props.Share ? 
			<Pressable onPress={props.ShareFunction}>
				<ShareIcon/> 
				</Pressable>
			: null}
		  <Pressable style={{marginLeft:10}}>
		{ props.fav ? <RedHeartIcon/> : null	
		}
		</Pressable>
		</View>
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
		color:Theme.colors.black,
		fontFamily:Theme.FontFamily.normal,
		fontSize:19,textAlign:'left',marginLeft:15,marginTop:Platform.OS ==='ios' ? 0 : 5
	},
	
  })
  
  export default CustomHeader;
  
