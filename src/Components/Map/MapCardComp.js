import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import RedHeartIcon from '../../assets/icons/RedHeartIcon';
import NavigationService from '../../Services/Navigation';

const { width, height } = Dimensions.get('window');

const MapCardComp = ({ hotel, func }) => {
  return (
    <Pressable
      onPress={() => NavigationService.navigate('FavouriteDetails', { slug: hotel?.slug })}

      style={{
        position: 'absolute',
        bottom: height / 8.5,
        alignSelf: 'center',
        width: width - 40,
        overflow: 'hidden',
        borderRadius: 5,
        elevation: 5,

        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        // paddingHorizontal:20
      }}>
      {/* {console.log('hotel', hotel)} */}
      <View style={{
        height: height/7,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // paddingHorizontal:25,
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent:'space-between',
      }}>
        <Image
          source={{ uri: hotel?.coverimage }}
          resizeMode='cover'
          style={{
            height: height/7,
            width: width/3,
            // borderRadius:10
          }}
        />
        <View style={{ marginLeft:width > 1000 ? 40 : 15, width: width / 2, }}>
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            <Icon name="star" type='AntDesign' color="#000" size={16} />
            <Text style={{ fontSize: 12, fontFamily: Theme.FontFamily.bold, color: '#000', marginLeft: 5 }}>4.6</Text>
          </View>
          <Text numberOfLines={1} style={{ fontSize: 18, fontFamily: Theme.FontFamily.normal, color: '#000' }}>{hotel?.title}</Text>
          <Text numberOfLines={1} style={{ fontSize: 13, fontFamily: Theme.FontFamily.normal, color: '#747A82' }}>{hotel?.description}</Text>
          <Text style={{ color: '#000', fontSize: 14, fontFamily: Theme.FontFamily.bold, marginTop: 5 }}>{hotel?.currency_symbol} {hotel.average_price}/night</Text>

        </View>
      </View>
      <Pressable style={{ position: 'absolute', top: 6, right: 7 }}>
        <RedHeartIcon />
      </Pressable>
      <Pressable
        onPress={() => func()}
        style={{
          position: 'absolute', top: 6, left: 7, alignItems: 'center', justifyContent: 'center',
          height: 23, width: 23, borderRadius: 17, backgroundColor: 'rgba(0,0,0,0.4)'
        }}>
        <Icon name="close" type='AntDesign' color="#fff" size={17} />

      </Pressable>
    </Pressable>
  )
}

export default MapCardComp

const styles = StyleSheet.create({})