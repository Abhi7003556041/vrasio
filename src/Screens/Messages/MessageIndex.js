import { Dimensions, FlatList, Image, Platform, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import { useRoute } from '@react-navigation/native';
import { AppTextInput } from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import DoubleTick from '../../assets/icons/DoubleTick';
import { postApi } from '../../Services/Service';
import HelperFunctions from '../../Constants/HelperFunctions';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get('window');
import database from '@react-native-firebase/database';
import NodataFound from '../../Components/NoData/NodataFound';

const MessageIndex = (props) => {
    const route = useRoute();
    // Access the customProp passed from the source screen
    const customProp = route.params?.showButton;
    const ref = useRef(null)
    const [SearchVal, setSearchVal] = useState('');
  const [loadingState, setloadingState] = useState(false);
  const { login_status, userDetails, token } = useSelector(state => state.authData);
  const [refreshing, setrefreshing] = useState(false);

    const [allData, setAllData] = useState([])
    const [allDatacopy, setAllDatacopy] = useState([])
    const getChatlist = () => {
        setloadingState(true)
        postApi("api/chat-list", "", token).then(response => {
          if (response?.status) {
            setAllData(response?.chatList)
            setAllDatacopy(response?.chatList)
          }
          else {
          HelperFunctions.showToastMsg(response.message)

            // dispatch(setExtraUserDetails({"chat_room_id":}))
          }
          setloadingState(false)
        }).catch(error => {
          setloadingState(false)
          HelperFunctions.showToastMsg(error.message ?? 'Something went wrong')
        })
      }
     
      const handleRefresh = () => {
        setrefreshing(true);
        
        getChatlistRefress()
     
       
      };
      function handleSearchClick(val) {
       // console.log('vallaal',val)
        if (val === "") { 
          setAllData(allData); 
          setSearchVal(val)
           }
        const filterBySearch = allDatacopy.filter((item) => {
            if (Object.values(item.users_name).filter(res=>res!= userDetails.first_name+" "+userDetails.last_name)[0].toLowerCase()
                .includes(val.toLowerCase())) { return item; }
        })
        console.log('vallaal',filterBySearch)
        setSearchVal(val)
        setAllData(filterBySearch);
    }
    // setInterval(()=>{
    //     getChatlist()
    // },10000)
  const form = new FormData();
  const [Loder, setLoader] = useState(false);

 
   useEffect(()=>{
    // console.log('userDetails.id',userDetails.id)
    let onValueChange = ""
    if(userDetails.id){
     onValueChange = database().ref('chat_history')
      .orderByChild('receiepnts/participants_' + userDetails.id)
      .equalTo(userDetails.id)
      .on('value', snapshot => {
      console.log(snapshot.val())
      if(snapshot.exists()){

      
      const array = Object.values(snapshot.val()).sort((a, b) => b.sendTime - a.sendTime);
      setAllData(array)
      setAllDatacopy(array)
      }
      else{
        // setAllData([])
      }
      })
    }
      
      
        // getChatlist()
       
    },[])
    return (
        <ScreenLayout
            headerStyle={{ backgroundColor: '#356BB5' }}
            // showLoading={loadingState}
            // isScrollable={true}
            Home
            // viewStyle={{backgroundColor:'#131313'}}
            hideLeftIcon={customProp ? false : true}
        // onLeftIconPress={() => NavigationService.openDrawer()}
        >
            {allData.length > 0 ?
<>
            <AppTextInput
                value={SearchVal}
                ref={ref}
                onChangeText={a=>handleSearchClick(a)}
                placeholder="Search recipents"
                placeholderTextColor={'#000000'}
                inputStyle={{ fontSize: 14 }}
                titleStyle={{
                    fontFamily: Theme.FontFamily.normal,
                    fontSize: Theme.sizes.s14,
                }}
                mainContainerStyle={
                    {
                        //   marginHorizontal:20
                    }
                }
                leftIcon={{
                    name: 'search',
                    type: 'Feather',
                    color: '#000',
                    size: 18,
                }}
                inputContainerStyle={{
                    paddingHorizontal: 10,
                    height: 52,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F9F6F6',
                    borderWidth: 0.5,
                    width: width - 40,
                    borderColor: '#DFDFDF',
                    borderWidth: 0.7,
                    alignSelf: 'center',
                    marginTop: 25
                }}
                style={styles.text_style}
            />
            <FlatList
                data={allData}
                //  ListFooterComponent={<View style={{height:1,backgroundColor:'#000',width:width-40}}/>}
                // refreshControl={
                //     <RefreshControl
                //       refreshing={refreshing}
                //       onRefresh={() => {
                //         // setPage(1)
                //         handleRefresh();
                //       }}
                //     />
                //   }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 0,marginTop:5 }}
                renderItem={({ item, index }) => {
                    return (
                        <Pressable        
                        style={{ marginTop: 15, marginHorizontal: 0,width:width - 40,overflow:'hidden' }}>
                            <Pressable
                             onPress={()=>NavigationService.navigate('ChatPage',{room_Id:item?.roomId,
                                hostData:{
                                       "name":Object.values(item.users_name).filter(res=>res!= userDetails.first_name+" "+userDetails.last_name)[1] ?
                                       Object.values(item.users_name).filter(res=>res!= userDetails.first_name+" "+userDetails.last_name)[0] + ", " +
                                       Object.values(item.users_name).filter(res=>res!= userDetails.first_name+" "+userDetails.last_name)[1] 
                                       :
                                       Object.values(item.users_name).filter(res=>res!= userDetails.first_name+" "+userDetails.last_name)[0] 
                                       ,
                                        "avatar":item?.avatar
                                },
                                host_id:Object.values(item.receiepnts).filter(res=>res!= userDetails.id)[0],
                                propertyImage:item?.image,
                                slugType:item.slug,propertyName:item?.title})}
                            style={{
                                flexDirection: 'row', alignItems: 'center',justifyContent:'space-between'
                            }}>
                                
                                <View style={{ marginLeft: 0,flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                                <Image
                                    source={{uri:item.image}}
                                    resizeMode='cover'
                                    style={{
                                        height: 55, width: 55, borderRadius: 60
                                    }}
                                />
                                    <View style={{marginLeft:15,marginTop: Platform.OS === 'ios' ? 4 : 2 }}>
                                    <Text numberOfLines={1} style={{ color: '#000', fontSize: 15, fontFamily: Theme.FontFamily.bold,maxWidth:width/2 }}>
                                          {Object.values(item.users_name).filter(res=>res!= userDetails.first_name+" "+userDetails.last_name)[0]}
                                          {/* {item.title} */}
                                          </Text>
                                          <Text numberOfLines={1} style={{ color: '#aaa', fontSize: 11, fontFamily: Theme.FontFamily.bold,maxWidth:width/2 }}>
                                          {/* {Object.values(item.users_name).filter(res=>res!= userDetails.first_name+" "+userDetails.last_name)[0]} */}
                                          ({item.title})
                                          </Text>
                                       {/* {console.log('Object.values(item.users_name).find(re',Object.values(item.users_name).filter(res=>res!= userDetails.first_name+" "+userDetails.last_name)[0])} */}
                                        {item.msgType != "Text" ?
                                       <View style={{flexDirection:'row',alignItems:'center'}}>
                                       <Image
                                       source={{uri:item.lastMsg}}
                                       resizeMode='cover'
                                       style={{
                                           height: 14, width: 16, borderRadius: 3,marginHorizontal:1,marginTop:1
                                       }}
                                   />
                                    <Text 
                                    numberOfLines={1}
                                    style={{ color:item?.from != userDetails.id && item?.readStatus == "unread" ? '#000' : 'grey', fontSize: 13, fontFamily:item?.from != userDetails.id && item?.readStatus == "unread" ? Theme.FontFamily.semiBold :Theme.FontFamily.normal,maxWidth:width/2.5,marginLeft:5,
                                     marginVertical: Platform.OS === 'ios' ? 3 : 2 }}>{item.msgType.toLowerCase()}...</Text>
                                   </View>
                                   :
                                        <Text 
                                    numberOfLines={1}
                                    style={{ color:item?.from != userDetails.id && item?.readStatus == "unread" ? '#000' : 'grey', fontSize: 13, fontFamily:item?.from != userDetails.id &&item?.readStatus == "unread" ? Theme.FontFamily.semiBold :Theme.FontFamily.normal,
                                    maxWidth:width/2.1,
                                     marginVertical: Platform.OS === 'ios' ? 2 : 2 }}>{item.lastMsg}...</Text>
                                }
                                    </View>
                                    
                                    
                                </View>
                                    <Text style={{ color: '#747A82', fontSize: 8.5, fontFamily: Theme.FontFamily.semiBold,width:60,textAlign:'right',lineHeight:15,marginTop:4 }}>
                                    {/* {new Date(Math.floor((new Date().getTime()- new Date(item.sendTime).getTime())/ 1000 / 60 / (60 * 24))).getHours()}h{new Date(Math.floor((new Date().getTime()- new Date(item.sendTime).getTime())/ 1000 / 60 / (60 * 24))).getMinutes()}m ago */}
                                    {new Date(item.sendTime).getTime() > new Date().getTime() ? new Date(item.sendTime).toDateString() : 
                                    new Date(item.sendTime).toLocaleString()}
                                    </Text>
                            </Pressable>
                            <View style={{ height: 1.5, backgroundColor: '#DFDFDF', width: width - 40, marginTop: 20 }} />
                        </Pressable>
                    )
                }}
            />

</>: <NodataFound/>
}
        </ScreenLayout>
    )
}

export default MessageIndex

const styles = StyleSheet.create({
    text_style: {
        fontFamily: Theme.FontFamily.normal,
        width: '100%',
        fontSize: 14,
        color: '#000',
    },
})


// return () => database().ref(`/chat_history`).off('value', onValueChange);
// const getChatlistRefress = () => {
//   // setloadingState(true)
//   postApi("api/chat-list", "", token).then(response => {
//     if (response?.status) {
//       setAllData(response?.chatList)
//       setAllDatacopy(response?.chatList)
//     }
//     else {
//     HelperFunctions.showToastMsg(response.message)

//       // dispatch(setExtraUserDetails({"chat_room_id":}))
//     }
//     setrefreshing(false)
//   }).catch(error => {
//     setrefreshing(false)
//     HelperFunctions.showToastMsg(error.message ?? 'Something went wrong')
//   })
// }