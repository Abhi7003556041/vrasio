import { Dimensions, FlatList, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
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
import ImageCropPicker from 'react-native-image-crop-picker';
const { width, height } = Dimensions.get('window');

const PropertyAddStep3 = (props) => {
  const form = new FormData();
  const { login_status, userDetails, token } = useSelector(state => state.authData);
  const { dashboardDetails, currencyDetails, favouriteList } = useSelector(state => state.commonData);
  const { addResponse } = props.route.params
  const [Loder, setLoader] = useState(false);
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [check, setCheck] = useState('')
  const [PropertyType, setPropertyType] = useState(array1[0]?.propertytype ? array1[0]?.propertytype : [])
  const [RoomImage, setRoomImage] = useState([])
  const [RoomData, setRoomData] = useState([]);
  function getOriginalname(data) {
    let arr = data.split("/");
    let lent = Number(arr.length - 1);
    return arr[lent];
  }
  const AddRoomDetails = () => {

    let data = {
      "rooms": RoomData.map((res) => {
        return {
          room_id: res.id,
          value: res.value,

        }
      }),
      "propertySlug": addResponse?.slug,
      "roomsImages": [],
      "roomsImagesPreview": [
        {
          "images": null
        },
        {
          "images": null
        },
        {
          "images": null
        },
        {
          "images": null
        },
        {
          "images": null
        },
        {
          "images": null
        },
        {
          "images": null
        },
        {
          "images": null
        }
      ]
    }
    console.log('datatta', data)
    setLoader(true)
    postApi("api/addrooms", data, token).then(response => {
      // console.log('getAllProperty>>>>>>>>>>', response)
      if (response?.status) {
        console.log('addrooms>>fjkwhsdkfjhskjd>>>>>>>>', response)
        HelperFunctions.showToastMsg(response?.message ?? "Successfully Saved")

        NavigationService.navigate('PropertyAddStep4', { addResponse: response?.data })
      } else {
        HelperFunctions.showLongToastMsg(response?.message ?? "Failed")

      }
      setLoader(false)
    }).catch(error => {
      HelperFunctions.showToastMsg(error?.message ?? "errooro")
      setLoader(false)

    }).finally(() => {
      setLoader(false)

    })

  }

  const getPropertyDetails = () => {
    let data = {
      propertySlug: addResponse?.slug
    }

    setLoader(true)
    postApi("api/propertydetailsbyid", data, token).then(response => {
      console.log('12124545>>>>>>>>', response?.data)
      if (response?.status) {
        console.log('getPropertyDetails>>87878>>>>>>>>', (response?.data?.propertytype?.id))
        response?.data?.roomtypes ? setRoomData(response?.data?.roomtypes) : setRoomData(array1[0]?.rooms?.map((item) =>
          ({ id: item?.id, title: item?.title, description: item?.description, logo: item?.logowithpath, value: 1, photos: [] })))

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


  const addRoomPhoto = (romid) => {

    if (RoomImage.length != 0) {
      RoomImage.forEach((element, index) => {

        form.append(`images[${index}]`, element)
      })
    }
    form.append('room_id', romid)
    form.append('propertySlug', addResponse?.slug)
    setLoader(true)
    postApi("api/addroomphoto", form, token, 'multipart/form-data').then(response => {
      console.log('addRoomPhotoaddRoomPhoto', response)
      console.log('datattta', JSON.stringify(form))
      if (response?.status) {
        HelperFunctions.showToastMsg("Successfully Uploaded")
      } else {
        HelperFunctions.showToastMsg(response?.error ?? 'Failed')
      }
      setRoomImage([])
      setLoader(false)
    }).catch(error => {
      HelperFunctions.showToastMsg(error?.message)
      setLoader(false)
    }).finally(() => {
      setLoader(false)
    })


  }
  const imageUpload = (idd) => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      maxFiles: 5,
      compressImageMaxHeight: 400,
      compressImageMaxWidth: 400,
      compressImageQuality: 0.8,
    }).then(imageer => {
      console.log('imaher>>>>>', imageer)
      // let get_originalname = getOriginalname(imageer.path);
      // let tempArray = []
      imageer.forEach((item) => {
        let img = {
          uri: item.path,
          type: item.mime,
          name: getOriginalname(item.path),
        }
        console.log("imagpath==========" + JSON.stringify(img))
        // form.append('images', img);
        RoomImage.push(img)
        setRoomImage([...RoomImage])
        // console.log('savedimageuri====='+item.path);

        // console.log("imagpath==========" + image)
      })
      setRoomData(RoomData.map((res) => {
        if (res.id == idd) {
          return {
            ...res,
            photos: [...res.photos, ...imageer.map((re, ind) => {
              return { thumbimage: re.path, id: ind + 1, mainimage: re.path }
            })],
          }
        } else {
          return res
        }
      }))
      console.log('form', form);

      if (imageer.length > 0) {
        addRoomPhoto(idd)
      }

    });
  }

  useEffect(() => {
    if (addResponse?.slug) {

      getPropertyDetails()
    }
    // console.log('hadsiahsdads', RoomData.map((res) => {
    //   return {
    //     room_id: res.id,
    //     value: res.value
    //   }
    // }))
  }, [])
  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: '#FFF' }}
      showLoading={Loder}
      //   isScrollable={true}
      leftHeading={'Create / Manage Property'}
      viewStyle={{ backgroundColor: '#FFF' }}
      onLeftIconPress={() => NavigationService.back()}
    >
      {/* {console.log('first12121>>12323>>', RoomData)} */}
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 45, borderBottomColor: '#C4C4C4', borderBottomWidth: 1.5 }}>
          <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.bold, fontSize: 20 }}>Room</Text>
          <Text style={{ color: Theme.colors.btnColor, fontFamily: Theme.FontFamily.bold, fontSize: 16 }}>03
            <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.bold, fontSize: 16 }}> / 07</Text>
          </Text>
        </Pressable>
        <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.bold, fontSize: 20, marginTop: 20, marginBottom: 15 }}>Tell us the areas guests can use</Text>
        <FlatList
          data={RoomData}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View style={{
                height: 170, padding: 15,
                borderColor: '#DFDFDF',
                borderWidth: 1.2,
                borderRadius: 10,
                marginBottom: 15
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={{ uri: item?.logo }}
                      resizeMode='contain'
                      style={{
                        height: 50, width: 50
                      }}
                    />
                    <Text style={{ marginLeft: 14, fontSize: 16, fontFamily: Theme.FontFamily.bold,color: '#000' }}>{item?.title}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable
                      onPress={() => {
                        if (Number(item?.value) > 1) {
                          setRoomData(RoomData.map((res) => {
                            if (res.id == item?.id) {
                              return {
                                ...res,
                                value: Number(res.value) - 1
                              }
                            } else {
                              return res
                            }
                          }))
                        }
                      }}
                      style={{
                        height: 30, width: 30, borderRadius: 30, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1.2, borderColor: '#AEAEAE'
                      }}>
                      <Icon name='minus' type='Entypo' size={17} />
                    </Pressable>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#000', marginHorizontal: 10, textAlign: 'center' }}>
                      {Number(item?.value) > 9 ? null : 0}{item?.value}</Text>
                    <Pressable
                      onPress={() => {
                        setRoomData(RoomData.map((res) => {
                          if (res.id == item?.id) {
                            return {
                              ...res,
                              value: Number(res.value) + 1
                            }
                          } else {
                            return res
                          }
                        }))
                      }}
                      style={{
                        height: 30, width: 30, borderRadius: 30, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#AEAEAE'
                      }}>
                      <Icon name='plus' type='Entypo' size={17} color={'#fff'} />
                    </Pressable>
                  </View>
                </View>
                <View
                  style={{ width: '100%', height: 1.2, backgroundColor: '#DFDFDF', marginVertical: 15 }}
                />
                <View>
                  <FlatList
                    data={item?.photos}
                    horizontal
                    scrollEnabled={true}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 1.5, paddingRight: 55 }}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={{
                          height: 53.5, width: 53.5, marginRight: 10, borderRadius: 6, borderWidth: 1, borderColor: '#777777', padding: 2, alignItems: 'center', justifyContent: 'center'
                        }}>
                          <Image
                            source={{ uri: item.thumbimage }}
                            resizeMode='cover'
                            style={{
                              height: 48, width: 49, borderRadius: 6
                            }}
                          />
                        </View>
                      )
                    }}
                  />
                </View>
                <Pressable
                  onPress={() => imageUpload(item.id)}
                  style={{
                    height: 56, width: 56, backgroundColor: '#000', borderWidth: 1, borderColor: '#C4C4C4',
                    alignItems: 'center', justifyContent: 'center', borderRadius: 5, position: 'absolute', right: 14, bottom: 15, zIndex: 9999
                  }}>
                  {/* {console.log('ididid', item?.id)} */}
                  <Icon
                    name='plus'
                    type='Entypo'
                    size={28}
                    color={'#fff'}
                  />
                </Pressable>
              </View>
            )
          }}
        />

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
            <Text onPress={() => NavigationService.back()} style={{ fontSize: 16, fontFamily: Theme.FontFamily.bold, color: 'grey', textDecorationLine: 'underline' }}>Back</Text>
            {/* <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000',  marginTop: 1 }}>
            {moment(selected).format("MMMM Do")} - {checkout == null ? 'Checkout Date' : moment(checkout).format("MMMM Do")}</Text> */}
          </View>
          <Pressable onPress={() => {
            AddRoomDetails()
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

export default PropertyAddStep3

const styles = StyleSheet.create({
  input: {
    width: '100%', height: 100,
    borderColor: '#DFDFDF',
    borderWidth: 1.3, marginBottom: 15,
    fontSize: 14, borderRadius: 8, paddingHorizontal: 15,
  },
})