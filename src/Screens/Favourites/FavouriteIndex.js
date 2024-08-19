import { Dimensions, FlatList, Image, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import { useRoute } from '@react-navigation/native';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setFavouriteList, setTotalFavourite } from '../../Store/Reducers/CommonReducer';
import HelperFunctions from '../../Constants/HelperFunctions';
import { postApi } from '../../Services/Service';
import NodataFound from '../../Components/NoData/NodataFound';
import RedHeartIcon from '../../assets/icons/RedHeartIcon';
import FavouriteIcon from '../../assets/icons/favouriteIcon';
const {width, height} = Dimensions.get('window');

const FavouriteIndex = (props) => {
    const route = useRoute();
  // Access the customProp passed from the source screen
  const dispatch = useDispatch()
  const { login_status, userDetails, token } = useSelector(state => state.authData);
  const {dashboardDetails, currencyDetails,favouriteList } = useSelector(state => state.commonData);

  const customProp = route.params?.showButton;
  const [FavData, setFavData] = useState([
    // {title:'California Days',Img:require("../../assets/images/beach.png"),details:'24 Shortlisted inside'},
    // {title:'Australia Wildwilfe',Img:require("../../assets/images/wildlife.png"),details:'24 Shortlisted inside'},
    // {title:'California Days',Img:require("../../assets/images/pexels.png"),details:'24 Shortlisted inside'},
    // {title:'Australia Wildwilfe',Img:require("../../assets/images/nature.png"),details:'24 Shortlisted inside'},
    // {title:'California Days',Img:require("../../assets/images/beach.png"),details:'24 Shortlisted inside'},

    
  ])
  const fetchFavouriteList = () => {
    
    postApi("api/favlist", "", token).then(response => {
      // console.log('getPagewisePlan>>>>>>>>>>',response)
      if (response?.status) {
        console.log('fetchFavouriteList;n>>>>>>>>>>', JSON.stringify(response.data.data))
        // HelperFunctions.showToastMsg(response?.message)
        setFavData(response.data.data)
        dispatch(setTotalFavourite(response.data.data))
        
      } else {
        HelperFunctions.showToastMsg(response?.message)
      } 
    }).catch(error => {
      // setLoadMore(false);
      HelperFunctions.showToastMsg(error?.message)

    }).finally(() => {
      // setLoadMore(false);
    })
  }
  const addToFavourites = (val) => {
    let data = {
      propertySlug:val?.slug
    }
    console.log('addToFavourites', data)
    dispatch(setFavouriteList(val))
    postApi("api/addtofav", data, token).then(response => {
      // console.log('getPagewisePlan>>>>>>>>>>',response)
      if (response?.status) {
        console.log('addToFavourites;n>>>>>>>>>>', response.data)
        // HelperFunctions.showToastMsg(response?.message)
       
        
      } else {
        HelperFunctions.showToastMsg(response?.message)
      }
    }).catch(error => {
      // setLoadMore(false);
      HelperFunctions.showToastMsg(error?.message)

    }).finally(() => {
      // setLoadMore(false);
    })
  }
  useEffect(()=>{
    login_status ? fetchFavouriteList() : null
  },[])
  return (
    <ScreenLayout
      headerStyle={{backgroundColor: '#356BB5'}}
      // showLoading={Loading}
      // isScrollable={true}
      Home
      // viewStyle={{backgroundColor:'#131313'}}
      hideLeftIcon={customProp ? false : true}
      // onLeftIconPress={() => NavigationService.openDrawer()}
      >
        {favouriteList?.length>0 ?
          <FlatList
          data={favouriteList}
          showsVerticalScrollIndicator={false}
        //   horizontal
        style={{}}
        numColumns={2}
          contentContainerStyle={{marginLeft:22,paddingBottom:20,marginTop:10}}
          renderItem={({item, index}) => {
            return (
              <Pressable
              onPress={() => NavigationService.navigate('FavouriteDetails',{slug:item?.slug})}
                style={{
                  width:width>700 ? width/2.2 :width>1000 ? width/2.2 : width/2.4 ,
                  // height: 165 +40 ,
                  borderRadius: 10,
                  marginRight: 22,
                
                  marginTop:15
                }}>
                <Image
              source={{uri:item.coverimage}}
            //   resizeMode='contain'
              style={{
                height:165,width:'100%',marginBottom:10,borderRadius:10
              }}
              />
              <View style={{marginHorizontal:1}}>
              <Text numberOfLines={1} style={{color:'#000',fontSize:14,fontFamily:Theme.FontFamily.bold}}>{item.title}</Text>
              <Text numberOfLines={1} style={{color:'#747A82',fontSize:12,fontFamily:Theme.FontFamily.semiBold,marginVertical:Platform.OS==='ios'? 3 :1}}>{item.description}</Text>
              {/* <Text style={{color:'#000',fontSize:16,fontWeight:'500'}}>{item.price}</Text> */}
              </View>
              <TouchableOpacity onPress={() =>{addToFavourites(item)}} style={{ position: 'absolute', top: 4, right: 6,
               paddingVertical:3,paddingHorizontal:2.2,height:25,width:25,borderRadius:20 }}>
                 {favouriteList.find((favourite) => favourite.slug == item?.slug) ? <RedHeartIcon 
                  Color={favouriteList.find((favourite) => favourite.slug == item?.slug) ? "#ED4040" :
                    "rgba(0,0,0,0.3)" }
                    />:
                     <FavouriteIcon/>
                }
                </TouchableOpacity>
              </Pressable>
            );
          }}
        />
        :<NodataFound/>
}
        </ScreenLayout>
  )
}

export default FavouriteIndex

const styles = StyleSheet.create({})