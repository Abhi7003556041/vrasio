import { View, Text, StyleSheet, Pressable, Dimensions, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import NavigationService from '../../Services/Navigation';
import { Icon } from 'react-native-basic-elements';
import { Image } from 'react-native';
import Theme from '../../Constants/Theme';
import { useRoute } from '@react-navigation/native';
import SmallLogo from '../../assets/icons/SmallLogo';
const { width, height } = Dimensions.get('window');

const NotificationIndex = (props) => {
    const [loadingState, setloadingState] = useState(false);
    const route = useRoute();
    // Access the customProp passed from the source screen
    const customProp = route.params?.showButton;
    const [allData, setAllData] = useState([
        {
            'title': 'Lorem ipsum dolor sit consetetur sadipscing elitr, sed diam nonumy eirmod. sdsd',
            'date': 'Just Now',
            'time': '19:45',
            'image': require('../../assets/images/Rectangle3x.png'),
            'details': 'My mission is my happiness',
            'hostedby': 'Hosted by: Kevin Hart',
            'live': true
        },
        {
            'title': 'Tempor invidunt ut labore et dolore magna',
            'date': '4 Oct, 2023',
            'time': '19:32',
            'image': require('../../assets/images/Rectangle23x.png'),
            'details': 'Gold Minds with Kevin Hart',
            'hostedby': 'Hosted by: Kevin Hart'
        },
        {
            'title': 'Tempor invidunt ut labore et dolore magna',
            'date': '4 Oct, 2023',
            'time': '19:32',
            'image': require('../../assets/images/Rectangle23x.png'),
            'details': 'Gold Minds with Kevin Hart',
            'hostedby': 'Hosted by: Kevin Hart'
        },
       
        
    ])
    const [oldData, setOldData] = useState([
        {
            'title': 'Lorem ipsum dolor sit consetetur sadipscing elitr, sed diam nonumy eirmod.',
            'date': 'Just Now',
            'time': '19:45',
            'image': require('../../assets/images/Rectangle3x.png'),
            'details': 'My mission is my happiness',
            'hostedby': 'Hosted by: Kevin Hart',
            'live': true
        },
        {
            'title': 'Tempor invidunt ut labore et dolore magna',
            'date': '4 Oct, 2023',
            'time': '19:32',
            'image': require('../../assets/images/Rectangle23x.png'),
            'details': 'Gold Minds with Kevin Hart',
            'hostedby': 'Hosted by: Kevin Hart'
        },
        {
            'title': 'Tempor invidunt ut labore et dolore magna',
            'date': '4 Oct, 2023',
            'time': '14:45',
            'image': require('../../assets/images/Rectangle184.png'),
            'details': 'My mission is my happiness',
            'hostedby': 'Hosted by: Kevin Hart',
            'price': '- $ 120'
        },
        {
            'title': 'Tempor invidunt ut labore et dolore magna',
            'date': '4 Oct, 2023',
            'time': '14:45',
            'image': require('../../assets/images/Rectangle184.png'),
            'details': 'My mission is my happiness',
            'hostedby': 'Hosted by: Kevin Hart',
            'price': '- $ 120'
        },
        {
            'title': 'Tempor invidunt ut labore et dolore magna',
            'date': '4 Oct, 2023',
            'time': '14:45',
            'image': require('../../assets/images/Rectangle184.png'),
            'details': 'My mission is my happiness',
            'hostedby': 'Hosted by: Kevin Hart',
            'price': '- $ 120'
        },
     
    ])
    return (
        <ScreenLayout
        isScrollable={true}
            // showLeftIcon={true}
            showLoading={loadingState}
            // onLeftIconPress={() => {
            //     NavigationService.back()
            //     // scrollToIndex(0)
            // }}
            Home
            hideLeftIcon={customProp ? false : true}
          
            headerStyle={{ backgroundColor: '#356BB5' }}

            viewStyle={{ flex:1 }}
        // HeaderTitleValue="Support"
        >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:0}}>

            <View style={styles.container}>
                <Text style={{
                    color: '#000',
                    fontSize: 14,
                    fontFamily: Theme.FontFamily.normal,
                    marginTop:15,
                    marginBottom:5,
                    marginLeft:20
                    // marginBottom:5,
                }}>TODAY</Text>
                <View>
                <FlatList
                data={allData}
                showsVerticalScrollIndicator={false}
                //  ListFooterComponent={<View style={{height:1,backgroundColor:'#000',width:width-40}}/>}
                contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 0,paddingBottom:15 }}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ marginTop: 10, marginHorizontal: 0,width:width ,
                            flexDirection: 'row',
                            // height:100,
                            backgroundColor:'#FFF3F3',
                            paddingHorizontal:20,
                            paddingVertical:20,
                            alignItems: 'center',

                        }}>
                         <View style={{
                                height: 40,
                                width: 40,
                                borderRadius: 46,
                                alignItems: 'center',
                                justifyContent: 'center',
                               backgroundColor:'#E15454'
                                // borderWidth: res.live ? 1.5 : 0
                            }}>
                                <SmallLogo Color={'#fff'}/>
                            </View>
                            <View style={{marginHorizontal:15 ,width:'86%'}}>
                                    <Text 
                                    numberOfLines={2}
                                    style={{
                                        color: '#000',
                                        fontSize: 13,
                                        fontFamily: Theme.FontFamily.bold,
                                        // width:width-100
                                        // maxWidth:'%'
                                    }}>{item.title}</Text>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={{
                                        color: "#747A82",
                                        fontSize: 13,
                                        fontFamily: Theme.FontFamily.normal,
                                        marginTop: 5
                                    }}>{item.date}</Text>
                                       <Text style={{
                                        color: "#747A82",
                                        fontSize: 13,
                                        fontFamily: Theme.FontFamily.normal,
                                        marginTop: 5,
                                        marginRight:5
                                    }}>{item.time}</Text>
                                    </View>
                                </View>
                                
                        </View>
                    )
                }}
            />
            </View>
                {/* {allData.map((res, ind) => {
                    return (
                        <View key={ind} style={{
                            flexDirection: 'row',
                            height:100,
                            backgroundColor:'#FFF3F3',
                            alignItems: 'center',
                            // justifyContent:'center',
                            // justifyContent:'space-around',
                            marginTop: 10,
                            // paddingHorizontal:20,
                            // width:width
                        }}>
                            
                              
                            </View>
                    
                    )
                })} */}
                   <Text style={{
                    color: '#000',
                    fontSize: 14,
                    fontFamily: Theme.FontFamily.normal,
                    marginBottom:15,
                    marginLeft:20
                    // marginBottom:5,
                }}>EARLIER</Text>
                <View>
                <FlatList
                data={oldData}
                showsVerticalScrollIndicator={false}
                //  ListFooterComponent={<View style={{height:1,backgroundColor:'#000',width:width-40}}/>}
                contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 0 ,paddingBottom:10}}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ marginTop: 0, marginHorizontal: 0,width:width ,
                            flexDirection: 'row',
                            // height:100,
                            // backgroundColor:'#FFF3F3',
                            paddingHorizontal:20,
                            paddingVertical:20,
                            alignItems: 'center',
                            borderTopWidth:1,
                            borderColor:'#DFDFDF',

                        }}>
                         <View style={{
                                height: 40,
                                width: 40,
                                borderRadius: 46,
                                alignItems: 'center',
                                justifyContent: 'center',
                               backgroundColor:'#FFF3F3'
                                // borderWidth: res.live ? 1.5 : 0
                            }}>
                                <SmallLogo Color={'#E15454'}/>
                            </View>
                            <View style={{marginHorizontal:15 ,width:'86%'}}>
                                    <Text style={{
                                        color: '#000',
                                        fontSize: 13,
                                        fontFamily: Theme.FontFamily.bold,
                                        width:width-80
                                        // maxWidth:'%'
                                    }}>{item.title}</Text>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={{
                                        color: "#747A82",
                                        fontSize: 13,
                                        fontFamily: Theme.FontFamily.normal,
                                        marginTop: 5
                                    }}>{item.date}</Text>
                                       <Text style={{
                                        color: "#747A82",
                                        fontSize: 13,
                                        fontFamily: Theme.FontFamily.normal,
                                        marginTop: 5,
                                        marginRight:5
                                    }}>{item.time}</Text>
                                    </View>
                                </View>
                                
                        </View>
                    )
                }}
            />
            </View>
            </View>
</ScrollView>
        </ScreenLayout>
    )
}

export default NotificationIndex
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 10
        // paddingHorizontal: 15
        // backgroundColor:'#131313'
    }
})