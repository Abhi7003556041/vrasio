import {
    View,
    Text,
    TextInput,
    TextInputComponent,
    TouchableOpacity,
	StatusBar,
		SafeAreaView,
		ScrollView,
		Dimensions,
		KeyboardAvoidingView,
		Platform,
		Keyboard,
		ActivityIndicator,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
 
import Theme from '../../Constants/Theme';
import CustomHeader from '../Header/CustomHeader';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch } from 'react-redux';
import HomeHeader from '../Header/HomeHeader';
import ChatHeader from '../Header/ChatHeader';



  const ScreenLayout = props => {
		const dispatch = useDispatch();
		const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight()+15 : StatusBar.currentHeight +10;
		// useEffect(()=>{
		// 	const keyboardDidShowListener = Keyboard.addListener(
		// 	  'keyboardDidShow',
		// 	  (keyBoardData) => {
		// 		console.log(keyBoardData)
		// 	  }
		// 	);
		// 	const keyboardDidHideListener = Keyboard.addListener(
		// 	  'keyboardDidHide',
		// 	  (closeData) => {
		// 		console.log(closeData)
		// 	  }
		// 	);
		
		// 	return () => {
		// 	  keyboardDidHideListener.remove();
		// 	  keyboardDidShowListener.remove();
		// 	}; 
		//   },[])

    return (
			<>
				<View
				// forceInset={{top: 'never'}}
				style={[{
								backgroundColor: props.layoutBackground ? props.layoutBackground : '#FFFFFF',
								flex:1
				},props.style]}>
					<View style={{
            width: "100%",
            height: STATUS_BAR_HEIGHT,
            backgroundColor:props.Home ? "#2F64AC" : '#fff'
        }}>
					<StatusBar
			backgroundColor={props.Home ? "#2F64AC" : '#fff'}
			barStyle={props.Home ?'light-content' :'dark-content'}
			translucent={true}
			/>
			</View>
			{!props.hideCustomHeader?
				props.Home ?
				<View style={{width:'100%'}}>
				<HomeHeader
				style={props.headerStyle}
				showLeftIcon={props.showLeftIcon}
				vectorIconName={props.vectorIconName}
				onLeftIconPress={props.onLeftIconPress} 
				lefticonStyle={props.lefticonStyle}
				leftIconComponent={props.leftIconComponent}
				leftHeading={props.leftHeading}
				leftHeadingStyle={props.leftHeadingStyle}
				vectorIconColor={props.vectorIconColor}
				Play={props.Play}
				ChatIconPress={props.ChatIconPress}
				Chat={props.Chat}
				Edit={props.Edit}
				NotiIconPress={props.NotiIconPress}
				/>
				</View>:
				props.Chat ?
				<View style={{width:'100%'}}>
				<ChatHeader
				style={props.headerStyle}
				showLeftIcon={props.showLeftIcon}
				vectorIconName={props.vectorIconName}
				onLeftIconPress={props.onLeftIconPress} 
				lefticonStyle={props.lefticonStyle}
				leftIconComponent={props.leftIconComponent}
				leftHeading={props.leftHeading}
				leftHeadingStyle={props.leftHeadingStyle}
				vectorIconColor={props.vectorIconColor}
				right={props.right}
				Podcast={props.Podcast}
				onRightTextPress={props.onRightTextPress}
				Publish={props.Publish}
				Watch={props.Watch}
				Save={props.Save}
				Noti={props.Noti}
				host={props.host}
				property={props.property}
				/>
				</View>:
					<View style={{width:'100%'}}>
						<CustomHeader
						style={props.headerStyle}
							showLeftIcon={props.showLeftIcon}
							vectorIconName={props.vectorIconName}
							onLeftIconPress={props.onLeftIconPress} 
							lefticonStyle={props.lefticonStyle}
							leftIconComponent={props.leftIconComponent}
							leftHeading={props.leftHeading}
							leftHeadingStyle={props.leftHeadingStyle}
							vectorIconColor={props.vectorIconColor}
							right={props.right}
							Podcast={props.Podcast}
							onRightTextPress={props.onRightTextPress}
							Publish={props.Publish}
							Share={props.Share}
							ShareFunction={props.ShareFunction}
							fav={props.fav}
							hideLeftIcon={props.hideLeftIcon}
							Noti={props.Noti}
						/>	
					</View>:null
		}
		<KeyboardAvoidingView style={{flex:1,}}   >
					{props.isScrollable ? 
						<ScrollView scrollEnabled showsVerticalScrollIndicator={false} contentContainerStyle={[{flex:1},props.viewStyle]} refreshControl={props.refreshControl}>
							{props.children}
						</ScrollView>:<View style={[{flex:1},props.viewStyle]}>
							{props.children}
						</View>
					}
						</KeyboardAvoidingView>
					

						</View>
					{props.showLoading?
						<View style={{position:'absolute',height:'100%',width:'100%',bottom:0,backgroundColor:'black',opacity:0.4}}>
								<View style={{position:'absolute',height:'100%',width:'100%',top:0}}>
									<View style={{flex:1,justifyContent:'center',flexDirection:'column'}}>
										<View style={{justifyContent:'center',flexDirection:'row'}}>
											{/* <Lottie style={{width:200,aspectRatio:1,backgroundColor:'white' }} source={require('../../assets/icons/loading.json')} autoPlay loop />
											<View style={{width:100,aspectRatio:1,backgroundColor:'red',borderRadius:100}}>
											<Lottie source={require('../../assets/icons/loading.json')} autoPlay loop />
												
											</View> */}
										</View>
									</View>
								</View>
						</View>:null }
				{props.showLoading?
						<View style={{position:'absolute',height:'100%',width:'100%',bottom:0}}>
									<View style={{flex:1,justifyContent:'center',flexDirection:'column'}}>
										<View style={{justifyContent:'center',flexDirection:'column',alignItems:'center', backgroundColor:'white',width:70,height:70,alignSelf:'center',borderRadius:10,
									shadowColor: '#000',
									shadowOffset: { width: 0, height: 0 },
									shadowOpacity: 0.2,
									shadowRadius: 6,  
									elevation: 6,
									backgroundColor:"white",
									// borderRadius:70
									
									}}>
											{/* <Lottie style={{width:90,aspectRatio:1 }} source={require('../../assets/icons/loading.json')} autoPlay loop /> */}
											<ActivityIndicator size={'large'} color={'#00AD70'}/>
											
											{/* <Lottie style={{width:90,aspectRatio:1 }} source={require('../../assets/icons/new_loading.json')} autoPlay loop /> */}
										</View>
									</View>
								</View>:null}
					</>
    );
  };
  
  export default ScreenLayout;

	/*

		<CustomHeader
			showLeftIcon={props.showLeftIcon} 
			LeftIconComponent={props.LeftIconComponent}
			RightIconComponent={props.RightIconComponent} 
			RightIconStyle={props.RightIconStyle}
			LeftIconStyle={props.LeftIconStyle} 
			leftIconPress={props.leftIconPress}
			valueCount={props.valueCount} 
			hideBottomBorder={props.hideBottomBorder}
			HeaderColor={props.HeaderColor} 
			HeaderStyle={props.HeaderStyle}
			showHeaderTitle={props.showHeaderTitle} 
			HeaderTitleValue={props.HeaderTitleValue}
			HeaderSubTitleValue={props.HeaderSubTitleValue} 
			showRightIcon={props.showRightIcon} 
			RightIconPress={props.RightIconPress}

	/>
	*/
  