import { Dimensions, FlatList, Image, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import NavigationService from '../../Services/Navigation';
import { useSelector } from 'react-redux';
import Theme from '../../Constants/Theme';
import FloatingLabelTextInput from '../../Components/EditTextComponent/FloatingLabelTextInput';
import { Icon } from 'react-native-basic-elements';
import array1 from '../../Components/ContextApi/GlobalComp';
import { postApi } from '../../Services/Service';
import HelperFunctions from '../../Constants/HelperFunctions';
const { width, height } = Dimensions.get('window');

const PropertyAddStep45 = (props) => {
  const { login_status, userDetails, token } = useSelector(state => state.authData);
  const { dashboardDetails, currencyDetails, favouriteList } = useSelector(state => state.commonData);
  const {addResponse} = props.route.params
  const [Loder, setLoader] = useState(false);
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [check, setCheck] = useState('')
  const [Scenicviews,setScenicviews] = useState( array1[0]?.sceneview ? array1[0]?.sceneview :[] )
  const [sceneviewIndex, setsceneviewIndex] = useState([])
  const [scenicview, setScenicview] = useState([]);
  const AddAmenities = () => {
    if (scenicview.length==0) {
      HelperFunctions.showToastMsg("Please Choose Scenicviews!!!")
      return
    }
    else {
      let data = {
        "propertySlug": addResponse?.slug,
        "scenicviews": scenicview.map((res) => {
          return { "scenic_id": res?.id }
        })
      }
      setLoader(true)
      postApi("api/addscenicviews", data, token).then(response => {
        console.log('addscenicviews>>>>>>>>>>', data)
        if (response?.status) {
          console.log('addscenicviews>>fjkwhsdkfjhskjd>>>>>>>>', JSON.stringify(response.data))
          HelperFunctions.showToastMsg(response?.message ?? "Saved Successfully")

          NavigationService.navigate('PropertyAddStep5',{addResponse:response?.data})
        } else {
          HelperFunctions.showLongToastMsg(response?.message ?? "failed")
          console.log('addscenicviews>>fjkwhsdkfjhskjd>>>>>>>>', JSON.stringify(response.data))
  
        }
        setLoader(false)
      }).catch(error => {
        HelperFunctions.showToastMsg("error?.message")
        setLoader(false)
  
      }).finally(() => {
        setLoader(false)
  
      })
    }
  }

  const getPropertyDetails = () => {
    let data = {
      propertySlug : addResponse?.slug
    }
   
    setLoader(true)
    postApi("api/propertydetailsbyid", data, token).then(response => {
      // console.log('12124545>>>>>>>>', response?.data?.propertytype)
      if (response?.status) {
        // console.log('getPropertyDetails>>87878>>>>>>>>',(response?.data))
       setScenicview(response?.data?.scenicview)
      //  setsceneviewIndex([response?.data?.propertytype])
      } else {
        HelperFunctions.showLongToastMsg(response?.message)

      }
      setLoader(false)
    }).catch(error => {
      HelperFunctions.showToastMsg(error?.message)
      setLoader(false)

    }).finally(() => {
      setLoader(false)

    })
  }

  useEffect(()=>{
    if(addResponse?.slug){

      getPropertyDetails()
    }
  },[])
  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: '#FFF' }}
      showLoading={Loder}
      //   isScrollable={true}
      leftHeading={'Create / Manage Property'}
      viewStyle={{ backgroundColor: '#FFF' }}
      onLeftIconPress={() => NavigationService.back()}
    >
            {/* {console.log('first12121>>>>>>>', JSON.stringify(array1))} */}
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 45, borderBottomColor: '#C4C4C4', borderBottomWidth: 1.5 }}>
          <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.bold, fontSize: 20 }}>Scenicviews</Text>
          <Text style={{ color: Theme.colors.btnColor, fontFamily: Theme.FontFamily.bold, fontSize: 16 }}>05
            <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.bold, fontSize: 16 }}> / 07</Text>
          </Text>
        </Pressable>
        <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.bold, fontSize: 20, marginTop: 20, marginBottom: 15 }}>Choose Scenicviews</Text>
        <View>
          <FlatList
            data={Scenicviews}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:200,}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                
                <Pressable
                onPress={() => {
                  // getAllHotel(selected,[res?.id],1)
                  if (scenicview.find((it) => it.id == item.id)) {
                    setScenicview(scenicview.filter((it) => it.id != item.id))
                    setsceneviewIndex(sceneviewIndex.filter((it) => it != item.id))
                  } else {
                    setScenicview(s => [...s, item])
                    setsceneviewIndex(s => [...s, item.id.toString()])
                  }
                  
                  
                  
                  // setFilterModal(false)
                }}
                style={{
                  height: 90, width:width/3.5,borderStyle: scenicview.find((it) => it.id == item.id) ? 'dashed' : 'solid',marginBottom:10,
                  borderRadius: 10, borderWidth: scenicview.find((it) => it.id == item.id) ? 1.5 : 1,
                  borderColor: scenicview.find((it) => it.id == item.id) ? Theme.colors.red : '#DFDFDF',
                  alignItems: 'center', justifyContent: 'center',  paddingHorizontal: 10,marginHorizontal:4,
                  backgroundColor: scenicview.find((it) => it.id == item.id) ? '#E154540F' : '#fff'
                }}>
                <Image
                  source={{ uri: item?.logowithpath }}
                  style={{ height: 30, width: 45, borderRadius: 5 }}
                  resizeMode='contain'
                />
                <Text numberOfLines={2} style={{ fontSize: 13.5, fontFamily: Theme.FontFamily.semiBold, marginTop: 0, color: '#000', marginTop: 10, textAlign: 'center' }}>
                  {item?.title}</Text>
                  <Pressable
            onPress={() => {
              // getAllHotel(selected,[res?.id],1)
              if (scenicview.find((it) => it.id == item.id)) {
                setScenicview(scenicview.filter((it) => it.id != item.id))
                setsceneviewIndex(sceneviewIndex.filter((it) => it != item.id))
              } else {
                setScenicview(s => [...s, item])
                setsceneviewIndex(s => [...s, item.id.toString()])
              }
            }}
              style={{
                height: 19, width: 19, borderRadius: 24,
                backgroundColor: scenicview.find((it) => it.id == item.id) ? Theme.colors.btnColor : '#fff',
                borderColor: '#EFE8E8',
                borderWidth: scenicview.find((it) => it.id == item.id) ? 0 : 1.3,
                alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 5, right: 5
              }}>
              {scenicview.find((it) => it.id == item.id) ?
                <Icon name="check" type='Feather' color="#fff" size={12} /> : null
              }

            </Pressable>
              </Pressable>
              )
            }}
          />
        </View>
        
        <View style={{
        height: 80,
        backgroundColor: '#fff',
        // alignItems: 'center',
        paddingHorizontal: 25,
        marginTop: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        width: width,
        elevation: 15,
        ...Platform.select({
          ios: {
            shadowColor: 'black',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          },
          android: {
            // elevation: 3,
          },
        }),
      }}>
        <View style={{}}>
          <Text onPress={() => NavigationService.back()}  style={{ fontSize: 16, fontFamily: Theme.FontFamily.bold, color: 'grey',textDecorationLine:'underline' }}>Back</Text>
          {/* <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000',  marginTop: 1 }}>
            {moment(selected).format("MMMM Do")} - {checkout == null ? 'Checkout Date' : moment(checkout).format("MMMM Do")}</Text> */}
        </View>
        <Pressable onPress={() => {
         AddAmenities()
        }} style={{
          backgroundColor: '#E15454',
          height: 45,
          width: 100,
          borderRadius: 5, alignItems: 'center', justifyContent: 'center'
        }}>
          <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#fff' }}>Next</Text>
        </Pressable>
      </View>
      </View>
    </ScreenLayout>
  )
}

export default PropertyAddStep45

const styles = StyleSheet.create({
  input: {
    width: '100%', height: 100,
    borderColor: '#DFDFDF',
    borderWidth: 1.3, marginBottom: 15,
    fontSize: 14, borderRadius: 8, paddingHorizontal: 15,
  },
})