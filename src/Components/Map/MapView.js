import { Alert, Dimensions, FlatList, Image, PermissionsAndroid, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import MapToggleIcon from '../../assets/icons/MapToggleIcon';
import { Icon } from 'react-native-basic-elements';
import RelocateIcon from '../../assets/icons/RelocateIcon';
import { moderateScale } from '../../Constants/PixelRatio';
import Geocoder from 'react-native-geocoding';
// import GetLocation from 'react-native-get-location';
import MapCardComp from './MapCardComp';
import { ActivityIndicator } from 'react-native';
import {check, PERMISSIONS, request, requestMultiple, RESULTS} from 'react-native-permissions';

import Theme from '../../Constants/Theme';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');

const MapModView = (props) => {
  const [selectedHotel,setSelectedHotel] = useState({})
  const [selected,setSelected] = useState(false)
  const [inde,setInde] = useState()
  const [tracksView, setTracksView] = useState(true);
  const [region, setRegion] = useState({
    
  })
  const [region1, setRegion1] = useState({
    latitude: 30.78825,
    longitude: 70.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const getPermissionIos = async () => {
    if(Platform.OS === 'ios') {
        requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MEDIA_LIBRARY]).then((statuses) => {
            // console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
            // console.log('MEDIA_LIBRARY', statuses[PERMISSIONS.IOS.MEDIA_LIBRARY]);
          });
    }
};
  const requestLocationPermission = async () => {
    if (Platform.OS == 'ios') {
      request(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(result => {
          if (result == RESULTS.GRANTED) {
            sendLocation();
          }
          else{
            sendLocation();
          }
        })
        .catch(error => {
          console.warn(err);
        });
    } 
  };
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Example App',
            'message': 'Example App access to your location '
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location")
          // alert("You can use the location");
          sendLocation()
        } else {
          console.log("location permission denied")
          Alert.alert("Location permission denied");
        }
      } catch (err) {
        console.warn(err)
      }
    }
  
};
  async function sendLocation() {
    Geolocation.getCurrentPosition(info =>{
      console.log('info', info)
      setRegion({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    });
  }

  const changeLoc = useCallback((val) => {
    setRegion({ ...region, latitude: val.latitude, longitude: val.longitude, latitudeDelta: val.latitudeDelta, longitudeDelta: val.longitudeDelta })
    // setRegion1({ ...region, latitude: val.latitude, longitude: val.longitude, latitudeDelta: val.latitudeDelta, longitudeDelta: val.longitudeDelta })
  }, [region])
  // const changeLoc = () => {
  //   Geolocation.watchPosition(position => {
  //     console.log('position',position)
  //   })
  // }
  useEffect(() => {
    // Platform.OS === 'ios' ? sendLocation() : getPermission()
    Platform.OS === 'ios' ? requestLocationPermission() : getPermission()

    // requestLocationPermission()
    // getPermissionIos()

  }, []);
  useEffect(() => { //add
    if(Platform.OS === 'android'){
      setTimeout(()=>{
        setTracksView(false);
      },100)
    }
  },[])
  return (
    <View style={{ flex: 1, width: '100%' }}>
     {/* {console.log('regiio',region)} */}
      {region?.latitude && region?.longitude ? 
      <MapView
        // focusable={true}
        mapType= {Platform.OS === "ios"
        ? "standard" 
        : 'standard'
         }
        onRegionChangeComplete={(e) => {
          // console.log('ere',e)
          // changeLoc(e)

        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 35,
          right: 0,
          // zIndex:99
        }}
        provider={MapView.PROVIDER_GOOGLE}

        initialRegion={region}

        region={region} >
        <Marker
          focusable={true}
          draggable={false}
          tappable
          onDragEnd={(e) => {
            // console.log('object',e.nativeEvent.coordinate)
            // setRegion({...region,latitude:e.nativeEvent.coordinate.latitude,longitude:e.nativeEvent.coordinate.longitude})
          }}
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
          // image={require('../../assets/images/Marker.png')}
          style={{ height: 30, width: 30,zIndex:-9 }}
        >
           {/* <Image resizeMode='contain' style={{
                  width: 30,
                  height: 30,

                }} source={require('../../assets/images/Marker.png')} /> */}
        </Marker>  
       
          {/* <FlatList
      data={props?.allHotel ?? []}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      /> */}
          {props?.allHotel?.map((res, ind) => {
            return (
              <Marker
                focusable={false}
                draggable={false}
                tappable
                // onTouchStart={()=>console.log('eeee')}
                onPress={()=>{
                  setSelected(true)
                  console.log('eyriu9y')
                  setSelectedHotel(res)
                  setInde(ind)
                }}
                tracksViewChanges={tracksView} 
                onDragEnd={(e) => {
                  console.log('object',e.nativeEvent.coordinate)
                  // setRegion({...region,latitude:e.nativeEvent.coordinate.latitude,longitude:e.nativeEvent.coordinate.longitude})
                }}
                coordinate={{ latitude: parseFloat(res?.latitude), longitude: parseFloat(res?.longitude) }}
                // image={require('../../assets/images/Marker.png')}
                style={{ height: 60, width: 120 ,}}
              >
               
                <Pressable
                onPress={()=>{
                  // setSelected(true)
                  // console.log('eyriu9y')
                  // setSelectedHotel(res)
                }}
                style={{
                  height:40,width:80,backgroundColor:inde == ind ? Theme.colors.secondary : '#fff',padding:5,borderRadius:10,
                 alignItems:'center',justifyContent:'center',
                  elevation:15,
                  // borderColor: 'black',
                  ...Platform.select({
                    ios: {
                      shadowColor: 'black',
                      shadowOffset: { width: 2, height: 2 },
                      shadowOpacity: 0.5,
                      shadowRadius: 4,
                    },
                    
                  }),
                }}>
                  <Text onPress={()=>{
                }} style={{fontSize:10,fontFamily:Theme.FontFamily.bold,color:inde == ind ? "#fff" : '#000'}}>{res?.currency_symbol} {res?.average_price}</Text>
                </Pressable>
              </Marker>
            )
          })}
     


      </MapView>
        :
        <ActivityIndicator size={'large'} color={'#000'} style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }} />

      }
      {/* <TouchableOpacity
        onPress={() => {
          // setRegion({...region,latitude:37.78825,longitude:-122.4324})
          sendLocation()


        }}
        style={{
          height: 48, width: 48, borderRadius: 48, backgroundColor: '#000', position: 'absolute', top: Platform.OS === 'ios' ? 20 : 40, right: 20, alignItems: 'center', justifyContent: 'center'
        }}>
        <RelocateIcon />
      </TouchableOpacity> */}
      <Pressable
        onPress={() => {
          props.inputRef.current.togglePanel()
          props.func()
        }}
        style={{
          height: 48, width: 48, borderRadius: 48, backgroundColor: '#fff', position: 'absolute', top: Platform.OS === 'ios' ? 20 : 40, left: 20, alignItems: 'center', justifyContent: 'center'
        }}>
        <Icon name="close" type='AntDesign' color="#000" size={25} />

      </Pressable>
      {selected ?
      <MapCardComp func={()=>{
        setSelected(false)
        setInde("")
        setSelectedHotel({})
      }} hotel={selectedHotel}/> : null}
      {/* </BottomSheet> */}
    </View>
  )
}

export default MapModView

const styles = StyleSheet.create({})


// const requestLocationPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Cool Photo App Camera Permission',
//         message:
//           'Cool Photo App needs access to your location ' +
//           'so you can take awesome locations.',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can use the Location');
//     } else {
//       console.log('Location permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };