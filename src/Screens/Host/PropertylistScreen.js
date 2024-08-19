import { Dimensions, FlatList, Image, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { postApi } from '../../Services/Service'
import HelperFunctions from '../../Constants/HelperFunctions'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import { useRoute } from '@react-navigation/native'
import NavigationService from '../../Services/Navigation'
import { useSelector } from 'react-redux'
import Theme from '../../Constants/Theme'
import NodataFound from '../../Components/NoData/NodataFound'
import { Icon } from 'react-native-basic-elements'
const { width, height } = Dimensions.get('window');

const PropertylistScreen = (props) => {
  const route = useRoute();
  const customProp = route.params?.showButton;
  const { login_status, userDetails,token  } = useSelector(state => state.authData);

  const [propertyList,setPropertyList] = useState([]);
  const [Loder, setLoader] = useState(false);
  
  const fetchPropertylist = () => {
    
    setLoader(true);
    postApi("api/mypropertylist", "", token).then(response => {
      console.log('getPagewisePlan>>>>>>>>>>',response)
      if (response?.status) {
        console.log('fetchPropertylist;n>>>>>>>>>>', JSON.stringify(response.data.data))
        // HelperFunctions.showToastMsg(response?.message)
        if(response.data.data.length==0){
          setPropertyList([])
          HelperFunctions.showToastMsg("Have not added any property yet!!!")
        }
        setPropertyList(response.data.data)
      setLoader(false);
        
      } else {
        HelperFunctions.showToastMsg(response?.message)
      } 
    }).catch(error => {
      setLoader(false);
      HelperFunctions.showToastMsg(error?.message)

    }).finally(() => {
      setLoader(false);
    })
  }
  useEffect(()=>{
    fetchPropertylist()
  },[])
  return (
    <ScreenLayout
    headerStyle={{ backgroundColor: '#356BB5' }}
    showLoading={Loder}
    // isScrollable={true}
    Home
    // leftHeading={'Become Host'}
    viewStyle={{ backgroundColor: '#fff', }}
    hideLeftIcon={customProp ? false : true}
    onLeftIconPress={() => NavigationService.back()}
  >
    <View style={{flex:1}}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20,paddingTop:15}}>
    <Text style={{color:Theme.colors.black,fontSize:22,fontFamily:Theme.FontFamily.bold,}}>
     Property Listing</Text>
     {/* <TouchableOpacity
     onPress={()=>NavigationService.navigate('PropertyAddStep1',{propertySlug:""})}
     style={{
      height:35,width:140,alignItems:'center',justifyContent:'space-evenly',borderWidth:1,borderColor:Theme.colors.black,borderRadius:5,flexDirection:'row'
     }}>
      <Icon
     name='plus'
     type='EvilIcon'
     size={22}
     color={'#000'}
     />
       <Text style={{color:Theme.colors.black,fontSize:16,fontFamily:Theme.FontFamily.semiBold,}}>
     Create Listing</Text>
     
     </TouchableOpacity> */}
     </View>
     {propertyList?.length>0 ?
    <View>
     <FlatList
          data={propertyList}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 0, marginBottom: 10, paddingBottom: 50,marginTop:15 }}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                // onPress={() => NavigationService.navigate('FavouriteDetails',{slug:item?.slug})}
                key={index} style={{
                  marginBottom: 20,
                  marginHorizontal: 20
                  // backgroundColor:'red'
                }}>
                  
                <Image
                  source={{uri:item?.coverimage}}
                  // resizeMode='contain'
                  style={{
                    height: 365, width: width - 40, borderRadius: 10
                  }}
                />
                <TouchableOpacity 
                onPress={()=>NavigationService.navigate('PropertyAddStep1',{propertySlug:item?.slug})}
                style={{ position: 'absolute', top: 10, right: 10,flexDirection:'row',alignItems:'center',justifyContent:'center',
               paddingVertical:3,paddingHorizontal:2.2,height:30,width:width/6.5,backgroundColor:'#fff',borderRadius:10 }}>
              
                 <Text  style={{color:Theme.colors.black,fontSize:13,fontFamily:Theme.FontFamily.bold,textDecorationLine:'underline'}}>Edit</Text>
                </TouchableOpacity>
                <View style={{ marginTop: Platform.OS === 'ios' ? 5 : 5, paddingHorizontal: 2 }}>
                  <Text style={{ color: '#000', fontSize: 20, fontFamily: Theme.FontFamily.bold, }}>{item?.title}</Text>
                  <Text 
                  numberOfLines={1}
                  style={{ color: '#747A82', fontSize: 14, fontFamily: Theme.FontFamily.normal ,marginTop:Platform.OS === 'ios' ? 0 : -5}}>{item?.description}</Text>
                  {/* <Text style={{ color: '#000', fontSize: 16, fontFamily: Theme.FontFamily.bold,marginTop:2 }}>
                    {item?.currency_symbol} {item.average_price}/night </Text> */}
                </View>
               
              </Pressable>
            )
          }}
        />
     </View>
     :<NodataFound/>
     }
     <Pressable
     onPress={()=>NavigationService.navigate('PropertyAddStep1',{propertySlug:""})}
     style={{
      height:55,width:55,position:'absolute',bottom:20,right:20,alignItems:'center',justifyContent:'center',backgroundColor:Theme.colors.black,borderRadius:50
     }}>
 <Icon
     name='plus'
     type='Entypo'
     size={30}
     color={'#fff'}
     />
     </Pressable>
    </View>
    </ScreenLayout>
  )
}

export default PropertylistScreen

const styles = StyleSheet.create({})