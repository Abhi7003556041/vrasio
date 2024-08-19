import { Dimensions, FlatList, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import { useRoute } from '@react-navigation/native';
import { AppTextInput } from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ReservationComp from './ReservationComp';
import PastReservationComp from './PastReservationComp';
import CancelledReservationComp from './CancelledReservationComp';
const { width, height } = Dimensions.get('window');

const PropertyReservation = (props) => {
    const route = useRoute();
    // Access the customProp passed from the source screen
    const Tab = createMaterialTopTabNavigator();

    const customProp = route.params?.showButton;
    const [email, setEmail] = useState('');
    const [tabData, setTabData] = useState([
        { title: 'Upcoming', },
        { title: 'Completed', },
        { title: 'Cancelled ', },
        // {title:'Amazing Pools',Img:require("../../assets/images/pool.png")},

    ])
    const [upcomingData,setUpcomingData] = useState([
        {
            name:'Barn in Palisade'
        }
    ])
    return (
        <ScreenLayout
            headerStyle={{ backgroundColor: '#FFF' }}
            // showLoading={Loading}
            //   isScrollable={true}
            leftHeading={'My Reservations'}
            viewStyle={{ backgroundColor: '#fff', }}
            hideLeftIcon={customProp ? false : true}
            onLeftIconPress={() => NavigationService.back()}
        >
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: Theme.colors.white,
                        elevation:6,
                        ...Platform.select({
                            ios: {
                              shadowColor: 'black',
                              shadowOffset: { width: 2, height: 2 },
                              shadowOpacity: 0.5,
                              shadowRadius: 4,
                            },
                            
                          }),
                        // alignSelf:'center'
                        // paddingHorizontal:10
                    },
                    tabBarActiveTintColor: Theme.colors.black,
                    tabBarInactiveTintColor:Theme.colors.black,
                    tabBarLabelStyle: {
                        fontFamily: Theme.FontFamily.bold,
                        fontSize: 14,
                        textTransform: 'capitalize',
                        
                        // width:10
                    },
                    // tabBarScrollEnabled: true,
                    tabBarIndicatorStyle: {
                        backgroundColor: Theme.colors.black,
                        width:(width-40)/3.5,alignSelf: 'center',marginHorizontal:15
                        // paddingHorizontal:10
                    },
                    // tabBarGap: 2,
                    // tabBarAndroidRipple: { borderless: false },
                    tabBarItemStyle: {
                        // maxHeight:'40%'
                        // marginHorizontal:10

                    },
                    // tabBarItemStyle: { width: 120 },
                    // swipeEnabled: false,
                }}
                // sceneContainerStyle={{paddingHorizontal:10}}
                style={
                    {
                        // alignItems:'center'
                    }
                }>
                <Tab.Screen name="Upcoming" component={ReservationComp} 
                    // initialParams={{dataa:upcomingData}}
                
                />
                <Tab.Screen name="Completed" component={PastReservationComp} />
                <Tab.Screen name="Cancelled" component={CancelledReservationComp} />


            </Tab.Navigator>
        </ScreenLayout>
    )
}

export default PropertyReservation

const styles = StyleSheet.create({
    text_style: {
        fontFamily: Theme.FontFamily.normal,
        width: '100%',
        fontSize: 14,
        color: '#000',
    },
})