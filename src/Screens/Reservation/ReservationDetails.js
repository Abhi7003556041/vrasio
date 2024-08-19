import { ActivityIndicator, Dimensions, FlatList, Image, Linking, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import { useRoute } from '@react-navigation/native';
import { AppTextInput } from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DoubleTick from '../../assets/icons/DoubleTick';
import ReservationCard from './ReservationCard';
import LinearGradient from 'react-native-linear-gradient';
import LocationIcon from '../../assets/icons/LocationIcon';
import { Icon } from 'react-native-basic-elements';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import { postApi } from '../../Services/Service';
import HelperFunctions from '../../Constants/HelperFunctions';
import { useSelector } from 'react-redux';
import moment from 'moment';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { width, height } = Dimensions.get('window');

const ReservationDetails = (props) => {
    const route = useRoute();
    const { login_status, userDetails, token,host_status } = useSelector(state => state.authData);
    const {dashboardDetails, currencyDetails,favouriteList } = useSelector(state => state.commonData);

    // Access the customProp passed from the source screen
    const {details,past} = props.route.params
    const customProp = route.params?.showButton;
    const [email, setEmail] = useState('');
    const [tabData, setTabData] = useState([
        { title: 'Upcoming', },
        { title: 'Completed', },
        { title: 'Cancelled ', },
        // {title:'Amazing Pools',Img:require("../../assets/images/pool.png")},

    ])
    const [allData, setAllData] = useState(
        past?
        [
        {
            'title': 'Get direction',
            'icon':<Icon name="location-outline" type='Ionicons' color="#000" size={22} />
            
            ,

        },
        {
            'title': 'Contact Host',
            'icon': <Icon name="call-outline" type='Ionicons' color="#000" size={20} />,

        },
        {
            'title': 'Chat with Host',
            'icon': <Icon name="message-processing-outline" type='MaterialCommunityIcon' color="#000" size={22} />,
            'screen':'ChatPage'

        },
        {
            'title': 'Raise an issue',
            'icon':<Icon name="warning" type='AntDesign' color="#000" size={20} />,

        },
       
        {
            'title': 'Write a review',
            'icon':<Icon name="reviews" type='MaterialIcon' color="#000" size={22} />,
            'screen':'ReviewRatingsScreen'

        }

    ]
    : [
        {
            'title': 'Get direction',
            'icon':<Icon name="location-outline" type='Ionicons' color="#000" size={22} />
            
            ,

        },
        {
            'title': 'Contact Host',
            'icon': <Icon name="call-outline" type='Ionicons' color="#000" size={20} />,

        },
        {
            'title': 'Chat with Host',
            'icon': <Icon name="message-processing-outline" type='MaterialCommunityIcon' color="#000" size={22} />,
            'screen':'ChatPage'

        },
        {
            'title': 'Raise an issue',
            'icon':<Icon name="warning" type='AntDesign' color="#000" size={20} />,

        },
       
       
    ]
    )
    const [Loder, setLoader] = useState(false);

    const [BookingData, setBookingData] = useState([
        

    ])
    const BookingDetails = () => {

        setLoader(true)

        let data = {
            "bookingid":details?.id,
            "currency_id": currencyDetails.id,

        }
        postApi("api/bookingdetails", data, token).then(response => {
            console.log('responseBookingDetails', JSON.stringify(response))
            if (response?.status) {
                //   storeToLocalAndRedux(response)
                setLoader(false)
                setBookingData(response?.data)
                //  HelperFunctions.showToastMsg(response?.message)

            } else {
                setLoader(false)
                HelperFunctions.showToastMsg(response?.message ?? 'Not data available')
            }
        }).catch(error => {
            setLoader(false)
            HelperFunctions.showToastMsg(error?.message ?? 'error occurred')


        }).finally(() => {
            setLoader(false)
        })
    }
    useEffect(()=>{
        BookingDetails()
    },[])
    if (Loder) {
        return (
            <View style={{ position: 'absolute', height: '100%', width: '100%', bottom: 0, backgroundColor: 'rgba(255,255,255,0.4)' }}>
            
            <View style={{ flex: 1,  flexDirection: 'column' ,}}>
            <StatusBar
                backgroundColor={props.Home ? "#2F64AC" : '#fff'}
                barStyle={props.Home ?'light-content' :'dark-content'}
                translucent={true}
                />
            <View >
            <SkeletonPlaceholder borderRadius={5}>
                      <View style={{alignItems: 'center',marginTop:5}}>
                        <View style={{ 
                          height: 110,
                          width: '100%',
                        }} />
                        
                      </View>
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder>
                      <View style={{ flexDirection: 'row', alignItems: 'center' ,marginTop:5}}>
                        <View style={{
                          height: height / 2.2,
                          width: '100%',
                        }} />
                      
                      </View>
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder>
                      <View style={{alignItems: 'center',marginTop:5}}>
                        <View style={{
                          height: 110,
                          width: '100%',
                        }} />
                        
                      </View>
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder>
                      <View style={{alignItems: 'center',marginTop:5}}>
                        <View style={{
                          height: 100,
                          width: '100%',
                        }} />
                        
                      </View>
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder>
                      <View style={{alignItems: 'center',marginTop:5}}>
                        <View style={{
                          height: 60,
                          width: '100%',
                        }} />
                        
                      </View>
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder>
                      <View style={{alignItems: 'center',marginTop:5}}>
                        <View style={{
                          height: 60,
                          width: '100%',
                        }} />
                        
                      </View>
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder>
                      <View style={{alignItems: 'center',marginTop:5}}>
                        <View style={{
                          height:height>1000 ?260 : 60,
                          width: '100%',
                        }} />
                      </View>
                    </SkeletonPlaceholder>
                  </View>
            </View>
          </View>
        )
    }
    return (
        <ScreenLayout
            headerStyle={{ backgroundColor: '#FFF' }}
            // showLoading={Loading}
            //   isScrollable={true}
            Share
            leftHeading={'Reservation Details'}
            viewStyle={{ backgroundColor: '#F9F6F6', }}
            hideLeftIcon={customProp ? false : true}
            onLeftIconPress={() => NavigationService.back()}
        >
            {console.log('detaislsslugg',BookingData)}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:20}}>
            <View>
                <Image
                    source={{uri:BookingData?.propertydetails?.coverimage?.replaceAll(" ","")}}
                    style={{
                        height: height / 2.1,
                        width: '100%'
                    }}
                />
                <LinearGradient
                    colors={['transparent', 'transparent', 'rgba(0, 0, 0, 0.9)',]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    // useAngle={true} angle={90}
                    // angleCenter={{ x: 0.5, y: 0.5 }}
                    style={{
                        height: height / 2.1,
                        width: '100%',
                        position: 'absolute',
                        top: 0

                    }}>
                    <View style={{ position: 'absolute', top: height / 3.05, left: 20,width:'92%' }}>
                        <Text numberOfLines={1} style={{ fontFamily: Theme.FontFamily.normal, fontSize: 30, color: '#fff' }}>
                            {BookingData?.propertydetails?.title}
                        </Text>
                        <Text numberOfLines={1} style={{ fontFamily: Theme.FontFamily.normal, fontSize: 14, color: '#fff', marginLeft: 1, marginTop: Platform.OS === 'ios' ? -3 : -6 }}>
                        {BookingData?.propertydetails?.description}
                        </Text>
                        <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginTop: Platform.OS === 'ios' ? 10 : 8 }}>
                            <Pressable style={{ height: 25, width: 25, borderRadius: 17, backgroundColor: '#E15454', alignItems: 'center', justifyContent: 'center' }}>
                                <LocationIcon />
                            </Pressable>
                            <Text numberOfLines={1} style={{ fontFamily: Theme.FontFamily.bold, fontSize: 14, marginLeft: 10, color: '#fff' }}>
                            {BookingData?.propertydetails?.address?.state_name}, {BookingData?.propertydetails?.address?.country_name}
                            </Text>
                        </Pressable>
                    </View>
                </LinearGradient>
            </View>
            <View style={{backgroundColor:'#fff'}}>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                paddingHorizontal:25,backgroundColor:'#fff',paddingVertical:15,
            }}>
                <View>
                    <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 14, color: '#000', }}>
                    CHECK IN
                    </Text>
                    <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 16, color: '#000', }}>
                    {moment(BookingData?.from_date).format("MMM D YYYY")}
                    </Text>
                    {/* <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 14, color: '#000', }}>
                    09:00 AM
                        </Text> */}
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <View
                style={{height:70, width:1,backgroundColor:'#DFDFDF',marginRight:30}}
                />
                <View>
                    <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 14, color: '#000', }}>
                    CHECK OUT
                    </Text>
                    <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 16, color: '#000', }}>
                    {moment(BookingData?.to_date).format("MMM D YYYY")}
                    </Text>
                    {/* <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 14, color: '#000', }}>
                    09:00 AM
                        </Text> */}
                </View>
                </View>
            </View>
            <View
                style={{height:1.2, width:width-40,backgroundColor:'#DFDFDF',marginRight:0,alignSelf:'center'}}
                />
                 <View style={{
                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                ,height:80,marginVertical:0,paddingHorizontal:25,backgroundColor:'#fff',paddingVertical:25,
            }}>
                <View>
                    <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 14, color: '#000', }}>
                    Guest
                    </Text>
                    <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 16, color: '#000', }}>
                    { Number(BookingData?.adult) 
                    +  Number(BookingData?.child) 
                     +  Number(BookingData?.infants) 
                      + Number(BookingData?.pets) } Guests
                    </Text>
                   
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                
                <Icon name="people-sharp" type='Ionicons' color="#EFE8E8" size={35} />
               
                </View>
            </View>
           </View>
           <View>
           <FlatList
                data={allData}
                //  ListFooterComponent={<View style={{height:1,backgroundColor:'#000',width:width-40}}/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{  marginTop: 5 ,alignItems:'center',backgroundColor:'#fff',paddingBottom:20}}
                renderItem={({ item, index }) => {
                    return (
                        <View key={index} style={{ marginTop: 15, marginHorizontal: 0,width:width-45 }}>
                            <Pressable
                            onPress={()=>{
                                item?.screen == "ReviewRatingsScreen" ? 
                                NavigationService.navigate(item.screen,{slugType:details.propertydetails.slug,host_id:details.host_id}) :
                                item.title == "Chat with Host" ? NavigationService.replace(item.screen,{booking_id:details.booking_id,propertyImage:BookingData?.propertydetails.coverimage,
                                    room_Id:BookingData?.room_id,hostData:{...BookingData?.propertydetails.host,"name":BookingData.host_name},slugType:details.propertydetails.slug,
                                    propertyName:BookingData?.propertydetails?.title,host_id:BookingData.host_id}) :
                                item.title == "Contact Host" ? Linking.openURL(`tel:${BookingData?.propertydetails?.host?.mobile}`) :
                                item.title == "Get direction" ? Linking.openURL(`https://maps.google.com/?q=${BookingData?.propertydetails?.address?.latitude},${BookingData?.propertydetails?.address?.longitude}`)
                                : null
                            }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                                <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center' }}>
                                    <View>
                                    {
                                        item.icon
                                    }
                                        </View>
                                    <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' ,marginLeft:15,marginTop:1}}>{item.title}</Text>

                                </View>
                                <Icon
                                    name="angle-right"
                                    type="FontAwesome"
                                    size={20}
                                    style={{ alignSelf: 'center', marginRight: 5 }}
                                />
                            </Pressable>
                            {index != allData.length -1 ?
                            <View style={{ height: 1.2, backgroundColor: '#DFDFDF', width: width - 40, marginTop: 20 }} />
                            :null}
                        </View>
                    )
                }}
            />
           </View>
           <View style={{backgroundColor:'#fff',marginTop:5,padding:25}}>
           <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 20, color: '#000', }}>
                    Reservation Details
                    </Text>
            <View style={{marginTop:10}}>
            <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 13, color: '#000', }}>
                    Booking Id
                    </Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 19, color: '#000',marginTop:Platform.OS === 'ios'? 4:2 }}>
                   {BookingData?.booking_id}
                    </Text>
                    <Pressable
                onPress={() => {
                  Toast.show('Copied');
                  Clipboard.setString(BookingData?.booking_id);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="copy" type="Ionicons" size={20} color="#BEBEBE" />
                
              </Pressable>
                </View>
            </View>
            <View
                style={{height:1.2, width:width-40,backgroundColor:'#DFDFDF',marginVertical:20,alignSelf:'center'}}
                />
                  
                  <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 13, color: '#000', }}>
                    Cancellation Policy
                    </Text>
                    <Text style={{ fontFamily: Theme.FontFamily.bold, fontSize: 13, color: '#000', marginTop:4}}>
                    Get a full refund if you cancel by 10th Oct, 2023 within 11:59 PM .
                    </Text>

                    <Text style={{ fontFamily: Theme.FontFamily.bold, fontSize: 13, color: '#000',textDecorationLine:'underline',marginTop:15 }}>
                    Know more
                    </Text>
           </View>
           <View style={{backgroundColor:'#fff',marginTop:5,padding:25}}>
           <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 20, color: '#000', }}>
                    Payment Info.
                    </Text>
                    <View style={{marginTop:10}}>
            <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 13, color: '#000', }}>
          Payment method
                    </Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={{ fontFamily: Theme.FontFamily.semiBold, fontSize: 18, color: '#000',marginTop:Platform.OS === 'ios'? 4:2 }}>
                Stripe
                    </Text>
                    
                </View>
            </View>
                    <View style={{marginTop:10}}>
            <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 13, color: '#000', }}>
            Tansaction Id 
                    </Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 19, color: '#000',marginTop:Platform.OS === 'ios'? 4:2 }}>
                {BookingData?.transaction_id}
                    </Text>
                    <Pressable
                onPress={() => {
                  Toast.show('Copied');
                  Clipboard.setString(BookingData?.transaction_id);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="copy" type="Ionicons" size={20} color="#BEBEBE" />
                
              </Pressable>
                </View>
            </View>
            {/* <View
                style={{height:1.2, width:width-40,backgroundColor:'#DFDFDF',marginVertical:20,alignSelf:'center'}}
                /> */}
                    <View style={{marginTop:10}}>
            <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 13, color: '#000', }}>
                    Total Cost
                    </Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 20, color: '#000',marginTop:Platform.OS === 'ios'? 4:2 }}>
                    {BookingData?.currency_symbol} {BookingData?.gross_amount} {BookingData?.currency_code}
                    </Text>
                 
                </View>
                <View
                style={{height:1.2, width:width-40,backgroundColor:'#DFDFDF',marginTop:15,alignSelf:'center'}}
                />
                 <View style={{ marginTop: 20, marginHorizontal: 0,width:width-40 }}>
                            <Pressable
                            
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                                <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center' }}>
                                    <View>
                                  <Icon name="text-document" type='Entypo' color="#000" size={22} />
                                        </View>
                                    <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' ,marginLeft:15,marginTop:1}}>
                                        Download Invoice</Text>

                                </View>
                                <Icon
                                    name="angle-right"
                                    type="FontAwesome"
                                    size={20}
                                    style={{ alignSelf: 'center', marginRight: 10 }}
                                />
                            </Pressable>
                           
                        </View>
            </View>
            </View>
            <View>
            <Pressable
            style={{
                height:60,width:width -40,borderRadius:5,borderColor:'#000',borderWidth:1,
                alignSelf:'center',marginVertical:15,marginTop:25,alignItems:'center',justifyContent:'center',flexDirection:'row'
            }}
            >
                <Icon
                                    name="edit"
                                    type="AntDesign"
                                    size={20}
                                    style={{ alignSelf: 'center', marginRight: 10 }}
                                /> 
            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' ,marginLeft:10}}>Modify Reservation</Text>

            </Pressable>
          
            <Pressable
            style={{
                height:60,width:width -40,borderRadius:5,backgroundColor:'#000',
                alignSelf:'center',marginVertical:0,alignItems:'center',justifyContent:'center'
            }}
            >
            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#fff' ,marginLeft:10}}>Cancel Booking</Text>

            </Pressable>
            </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default ReservationDetails

const styles = StyleSheet.create({
    text_style: {
        fontFamily: Theme.FontFamily.normal,
        width: '100%',
        fontSize: 14,
        color: '#000',
    },
})