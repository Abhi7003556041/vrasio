import { ActivityIndicator, Dimensions, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';

import MapToggleIcon from '../../assets/icons/MapToggleIcon';
import { Icon } from 'react-native-basic-elements';
import RelocateIcon from '../../assets/icons/RelocateIcon';
import Theme from '../../Constants/Theme';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
const { width, height } = Dimensions.get('window');

const MapModCardView = (props) => {
  const [Loder, setLoader] = useState(true);
  const [tracksView, setTracksView] = useState(true);

  const [region, setRegion] = useState({
    latitude: 30.788 ,
    longitude: 70.1214545 ,
    latitudeDelta: 10.922,
    longitudeDelta: 10.421,
  })
  const [region1, setRegion1] = useState({
    latitude: props?.latt,
    longitude: props?.longg,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  async function sendLocation() {
    Geolocation.getCurrentPosition(info => {
      // console.log('info', info)
      setRegion({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 5.0922,
        longitudeDelta: 5.0421,
      });
    });
  }
  useEffect(() => { //add
    if(Platform.OS === 'android'){
      setTimeout(()=>{
        setTracksView(false);
      },100)
    }
  },[])
  useEffect(() => {
    // Geocoder.init("AIzaSyC-ki3ImgxYzo8K2OCH9yDthHWIWV1yfj4")
    // sendLocation();
    setTimeout(()=>{
      setLoader(false)
    },2000)
    setRegion({...region,latitude:parseFloat(props?.latt),longitude:parseFloat(props?.longg)})
    

  
    console.log('lattlong',(props?.latt),(props?.longg))


  }, []);
//   if (Loder) {
//     return (
//         <View style={{flex: 1, width: width - 50, height: 200, borderRadius: 10, overflow: 'hidden', marginTop: 20,
//          backgroundColor: 'rgba(0,0,0,0.4)' }}>
//         <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
//           <View style={{
//             justifyContent: 'center', flexDirection: 'column', alignItems: 'center', backgroundColor: '#131313', width: 40, height: 40, alignSelf: 'center', borderRadius: 10,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 0 },
//             shadowOpacity: 0.2,
//             shadowRadius: 6,
//             elevation: 6,
//             backgroundColor: "white",
//             // borderRadius:70

//           }}>
// 											<ActivityIndicator size={'small'} color={'#00AD70'}/>

//             {/* <Lottie style={{width:90,aspectRatio:1 }} source={require('../../assets/icons/loading.json')} autoPlay loop /> */}
//             {/* <LottieView style={{ width: 90, aspectRatio: 1 }} source={require('../../assets/icons/new_loading.json')} autoPlay loop /> */}
//           </View>
//         </View>
//       </View>
//     )
// }
  return (
    <View style={{ flex: 1, width: width - 50, height:width>700? 300: 200, borderRadius: 10, overflow: 'hidden', marginTop: 20 }}>
      {/* <BottomSheet> */}
      <MapView
        scrollEnabled={false}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          // zIndex: 99
        }} 
        // initialRegion={region}
        region={region} >
{console.log('regsudhs',region)}
        <Marker

          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
          // image={require('../../assets/images/Marker.png')}
          style={{ height: 40, width: 40 }}
          tracksViewChanges={tracksView} 
        >

          {/* <View style={{
            // height:100,width:100,backgroundColor:'rgba(255,166,200,0.5)',alignItems:'center',justifyContent:'center',borderRadius:100
          }}>

            <Image resizeMode='contain' style={{
              width: 40,
              height: 40,

            }} source={require('../../assets/images/Marker.png')} />

          </View> */}


        </Marker>

      </MapView>
      {Loder ? <View style={{flex: 1, width: width - 50, height: 200, borderRadius: 10,  marginTop: 0,
         backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
          <View style={{
            justifyContent: 'center', flexDirection: 'column', alignItems: 'center', backgroundColor: '#131313', width: 40, height: 40, alignSelf: 'center', borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 6,
            backgroundColor: "white",
            // borderRadius:70

          }}>
											<ActivityIndicator size={'small'} color={'#00AD70'}/>

            {/* <Lottie style={{width:90,aspectRatio:1 }} source={require('../../assets/icons/loading.json')} autoPlay loop /> */}
            {/* <LottieView style={{ width: 90, aspectRatio: 1 }} source={require('../../assets/icons/new_loading.json')} autoPlay loop /> */}
          </View>
        </View>
      </View> : null}
      {/* <View style={{height:100,width:100,backgroundColor:'black',position:'absolute',top:10,left:100,zIndex:9}}></View> */}
    </View>
  )
}

export default MapModCardView

const styles = StyleSheet.create({})

{/* <View
style={{ height: 100, width: 100, borderRadius: 100, backgroundColor: 'rgba(255,166,200,0.5)', zIndex: -1, position: 'absolute', right: -0, top: 25 }}

/>
<View
style={{ height: 35, width: 250, borderRadius: 5, backgroundColor: '#fff', zIndex: 999, position: 'absolute', right: -110, top: -50, paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}

>
<Text style={{ fontFamily: Theme.FontFamily.normal, fontSize: 9 }}>Exact location will be provided after booking only</Text>
</View> */}