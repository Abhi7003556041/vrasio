import { ActivityIndicator, Dimensions, FlatList, Image, Platform, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Theme from '../../Constants/Theme';
import LocationIcon from '../../assets/icons/LocationIcon';
import NavigationService from '../../Services/Navigation';
import { postApi } from '../../Services/Service';
import HelperFunctions from '../../Constants/HelperFunctions';
import { useSelector } from 'react-redux';
import moment from 'moment';
import NodataFound from '../../Components/NoData/NodataFound';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const { width, height } = Dimensions.get('window');

const ReservationCard = (props) => {
    const { login_status, userDetails, token,host_status } = useSelector(state => state.authData);
    const [refreshing, setrefreshing] = useState(false);

    const [Loder, setLoader] = useState(false);

    const [upcomingData, setUpcomingData] = useState([
        

    ])
    const upcomingBooking = () => {

        setLoader(true)

        let data = {
            "booking_type": "upcoming"
        }
        postApi("api/mybookinglist", data, token).then(response => {
            console.log('responseupcomingBooking', JSON.stringify(response))
            if (response?.status) {
                //   storeToLocalAndRedux(response)
                setLoader(false)
                setUpcomingData(response?.data?.data)
                //  HelperFunctions.showToastMsg(response?.message)

            } else {
                setLoader(false)
                HelperFunctions.showToastMsg(response?.message ?? 'Not available')
            }
        }).catch(error => {
            setLoader(false)
            HelperFunctions.showToastMsg(error?.message ?? 'error occurred')


        }).finally(() => {
            setLoader(false)
        })
    }
    const upcomingBookingRefress = () => {

        setrefreshing(true)

        let data = {
            "booking_type": "upcoming"
        }
        postApi("api/mybookinglist", data, token).then(response => {
            // console.log('responseupcomingBooking', JSON.stringify(response))
            if (response?.status) {
                //   storeToLocalAndRedux(response)
                setrefreshing(false)
                setUpcomingData(response?.data?.data)
                //  HelperFunctions.showToastMsg(response?.message)

            } else {
                setrefreshing(false)
                HelperFunctions.showToastMsg(response?.message ?? 'Not available')
            }
        }).catch(error => {
            setrefreshing(false)
            HelperFunctions.showToastMsg(error?.message ?? 'error occurred')


        }).finally(() => {
            setrefreshing(false)
        })
    }
    const handleRefresh = () => {
     
        
        upcomingBookingRefress()
     
        // setTimeout(() => {
        //   setrefreshing(false);
        // }, 1000);
    
        // console.log(UserData)
      };
    useEffect(()=>{
        upcomingBooking()
    },[])

    if (Loder) {
        return (
            <View style={{ position: 'absolute', height: '100%', width: '100%', bottom: 0, backgroundColor: 'rgba(255,255,255,0.4)' }}>
            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' ,alignItems:'center'}}>
              <FlatList
              data={[1,2,3]}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ marginTop: 25, alignItems: 'center', paddingBottom: 20, }}
              renderItem={({item,index})=>{
                return(
                    <SkeletonPlaceholder borderRadius={10}>
                      <View style={{alignItems: 'center',marginBottom:20, shadowOffset: { width: 2, height: 2 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 6,
                                    elevation: 6,}}>
                        <View style={{ 
                          height: 315,
                          width: width-40,
                        }} />
                        
                      </View>
                    </SkeletonPlaceholder>
                )
              }}
              />
            </View>
          </View>
        )
    }
    return (
        <View style={styles.container}>
            {upcomingData.length > 0 ?
            <View>
                <FlatList
                    data={upcomingData}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={() => {
                            // setPage(1)
                            handleRefresh();
                          }}
                        />
                      }
                    //  ListFooterComponent={<View style={{height:1,backgroundColor:'#000',width:width-40}}/>}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ marginTop: 25, alignItems: 'center', paddingBottom: 20, }}
                    renderItem={({ item, index }) => {
                        return (
                            <Pressable
                            disabled={host_status}
                                onPress={() => NavigationService.navigate('ReservationDetails',{details:item})}
                                style={{
                                    height: 320, width: width - 40,
                                    backgroundColor: '#fff',shadowColor: '#000',
                                    shadowOffset: { width: 2, height: 2 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 6,
                                    elevation: 6,
                                    borderRadius: 10,  marginBottom: 20
                                }}>
                                    {/* {console.log('item?.coverimage?.replaceAll(" ","%20")()',JSON.stringify(upcomingData))} */}
                                    {/* ?.replaceAll(" ","") */}
                                <Image
                                    source={{uri:item?.propertydetails?.coverimage?.replaceAll(" ","")}}
                                    style={{
                                        height: 200,
                                        width: '100%',
                                        borderTopLeftRadius:10,
                                        borderTopRightRadius:10

                                    }}
                                    // resizeMode='contain'
                                />
                                <View style={{
                                    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 22
                                }}>
                                     <View
                                        style={{flex:1, height: 130, justifyContent: 'center'}}
                                    >
                                        <Text style={{ fontFamily: Theme.FontFamily.bold, fontSize: 17, color: '#000000', marginTop: Platform.OS === 'ios' ? 2 : 2 }}>
                                        {moment(item?.from_date).format('MMM')} {moment(item?.from_date).format('DD')} - {moment(item?.to_date).format('MMM')} {moment(item?.to_date).format('DD')}
                                        </Text>
                                        <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 14, color: 'grey', marginTop: 3 }}>
                                        {moment(item?.from_date).format('YYYY')}
                                        </Text>
                                    </View>
                                    <View
                                        style={{flex:2.2, paddingHorizontal: 20, height: 130, justifyContent: 'center' }}
                                    >
                                        <Text numberOfLines={1} style={{ fontFamily: Theme.FontFamily.normal, fontSize: 20, color: '#000000' }}>
                                            {item?.propertydetails?.title}
                                        </Text>
                                        <Text numberOfLines={1} style={{ fontFamily: Theme.FontFamily.normal, fontSize: 13, color: '#000000', marginTop: Platform.OS === 'ios' ? 0 : -3 }}>
                                        {item?.propertydetails?.description}
                                        </Text>
                                        <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6,left:-2 }}>
                                            <Pressable style={{ height: 24, width: 24, borderRadius: 17, backgroundColor: '#E15454', alignItems: 'center', justifyContent: 'center' }}>
                                                <LocationIcon />
                                            </Pressable>
                                            <Text numberOfLines={1} style={{ fontFamily: Theme.FontFamily.bold, fontSize: 13, width: '90%', marginLeft: 5, color: '#000000' }}>
                                                {item?.propertydetails?.address?.state_name}, {item?.propertydetails?.address?.country_name}
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Pressable>
                        )
                    }}
                />

            </View>
             :
             <NodataFound/>
                 }
        </View>
    )
}

export default ReservationCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        //  paddingBottom: 20
    }
})