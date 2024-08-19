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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { width, height } = Dimensions.get('window');

const PropertyAddStep1 = (props) => {
  const propertySlug =props.route.params.propertySlug ?? ""
  const { login_status, userDetails, token } = useSelector(state => state.authData);
  const { dashboardDetails, currencyDetails, favouriteList } = useSelector(state => state.commonData);
  const [Loder, setLoader] = useState(false);
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [CleaningFees, setCleaningFees] = useState('');
  const [NumberOfGuest, setNumberOfGuest] = useState('');
  const [NumberOfPets, setNumberOfPets] = useState('');


  const [check, setCheck] = useState('')
  const getAllCountry = () => {
    let data = {
      "type": "all"
    }
   
    setLoader(true)
    postApi("api/masterdatalist", data, token).then(response => {
      // console.log('getAllProperty>>>>>>>>>>', response)
      if (response?.status) {
        console.log('getAllCountry>>fjkwhsdkfjhskjd>>>>>>>>', JSON.stringify(response.data))
        if (array1.length == 0) {
          array1.push(response?.data)
        }
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

  const getPropertyDetails = () => {
    let data = {
      propertySlug : propertySlug
    }
   
    setLoader(true)
    postApi("api/propertydetailsbyid", data, token).then(response => {
      // console.log('getAllProperty>>>>>>>>>>', response)
      if (response?.status) {
        console.log('getPropertyDetails>>fjkwhsdkfjhskjd>>>>>>>>', JSON.stringify(response?.data?.max_no_of_guest))
        setTitle(response?.data?.title)
        setDescription(response?.data?.description)
        setCleaningFees(response?.data?.cleaning_fees)
        setNumberOfGuest(response?.data?.max_no_of_guest==null ? 0 : response?.data?.max_no_of_guest)
        setNumberOfPets(response?.data?.max_pets==null ? 0 : response?.data?.max_pets)
        setCheck(response?.data?.offer == "Entire House" ? 1 : response?.data?.offer == "Room Only" ? 2 : 3)
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

  const AddBasicDetails = () => {
    if (Title == null || Title == undefined || Title == "") {
      HelperFunctions.showToastMsg("Please provide Property Title!!!")
      return
    }
    else if (Description == null || Description == undefined || Description == "") {
      HelperFunctions.showToastMsg("Please provide Property Description!!!")
      return
    }
    else if (CleaningFees == null || CleaningFees == undefined || CleaningFees == "") {
      HelperFunctions.showToastMsg("Please provide Cleaning Fees!!!")
    }
    else if (NumberOfGuest == null || NumberOfGuest == undefined || NumberOfGuest == "") {
      HelperFunctions.showToastMsg("Please provide Number of Guest!!!")
    }
    else if (NumberOfPets == null || NumberOfPets == undefined || NumberOfPets == "") {
      HelperFunctions.showToastMsg("Please provide Number of Pets!!!")
    }
    else if(check == null || check == undefined || check == "") {
      HelperFunctions.showToastMsg("Please Select any offer!!!")
    }
    else {
      let data = {
        "propertySlug": propertySlug ?? null,
        "title": Title,
        "description": Description,
        "offer": check == 1 ? "Entire Place" : check == 2 ? "Room Only" : "Shared Room",
        "cleaning_fees": CleaningFees,
        "resort_fees": 100,
        "max_pets": NumberOfPets,
        "no_of_guest" : NumberOfGuest
      }
      setLoader(true)
      postApi("api/addbasicdetails", data, token).then(response => {
        // console.log('getAllProperty>>>>>>>>>>', response)
        if (response?.status) {
          console.log('AddBasicDetails>>fjkwhsdkfjhskjd>>>>>>>>', JSON.stringify(response.data))
          NavigationService.navigate('PropertyAddStep2',{addResponse:response?.data})
        } else {
          HelperFunctions.showLongToastMsg(response?.message ?? "Something went wrong!!!")
          console.log('first',response?.message)
  
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
  useEffect(() => {

    getAllCountry()
    if(propertySlug != ""){
      getPropertyDetails()
    }
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
      {/* {console.log('first', JSON.stringify(array1[0]?.propertytype))} */}
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
       
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 45, borderBottomColor: '#C4C4C4', borderBottomWidth: 1.5 }}>
          <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.bold, fontSize: 20 }}>Basic Details</Text>
          <Text style={{ color: Theme.colors.btnColor, fontFamily: Theme.FontFamily.bold, fontSize: 16 }}>01
            <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.bold, fontSize: 16 }}> / 07</Text>
          </Text>
        </Pressable>
        <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.bold, fontSize: 20, marginTop: 15, marginBottom: 15 }}>Property Details</Text>
        <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:100}}>
        <TextInput
          style={{ ...styles.input, height: 50, paddingTop: Platform.OS === 'ios' ? 0 : 10 }}
          placeholder='Property Title *'
          placeholderTextColor={'#8D8D8D'}
          value={Title}
          onChangeText={setTitle}
        />

        <TextInput
          style={{ ...styles.input, paddingTop: 10 }}
          placeholder='Property Description *'
          placeholderTextColor={'#8D8D8D'}
          value={Description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={6}
          textAlignVertical='top'
          cursorColor={'#000'}
          underlineColorAndroid='transparent'
        />
        <TextInput
          style={{ ...styles.input, height: 50, paddingTop: Platform.OS === 'ios' ? 0 : 10 }}
          placeholder='Cleaning Fees *'
          placeholderTextColor={'#8D8D8D'}
          value={CleaningFees}
          keyboardType='number-pad'
          onChangeText={setCleaningFees}
        />
         <TextInput
          style={{ ...styles.input, height: 50, paddingTop: Platform.OS === 'ios' ? 0 : 10 }}
          placeholder='Number Of Guest *'
          placeholderTextColor={'#8D8D8D'}
          value={NumberOfGuest}
          keyboardType='number-pad'
          onChangeText={setNumberOfGuest}
        />
         <TextInput
          style={{ ...styles.input, height: 50, paddingTop: Platform.OS === 'ios' ? 0 : 10 }}
          placeholder='Max Number Of Pets *'
          placeholderTextColor={'#8D8D8D'}
          value={NumberOfPets}
          keyboardType='number-pad'
          onChangeText={setNumberOfPets}
        />
        <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.normal, fontSize: 17, marginTop: 5, marginBottom: 15 }}>Area you want to offer
          <Text style={{ color: 'red' }} > *</Text></Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          <Pressable style={{
            height: 88, width: width / 3.4, borderRadius: 10, borderStyle: check == 1 ? 'dashed' : 'solid',
            borderColor: check == 1 ? Theme.colors.btnColor : '#DFDFDF', borderWidth: 1.2, padding: 10,
            backgroundColor: check == 1 ? '#E154540F' : '#fff'
          }}>

            <Image
              source={require('../../assets/images/Entire.png')}
              style={{ height: 38, width: 38, resizeMode: 'contain' }}
            />
            <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.bold, fontSize: 14, marginTop: 10 }}>Entire Place</Text>

            <Pressable
              onPress={() => {
                setCheck(1)

              }}
              style={{
                height: 21, width: 21, borderRadius: 24,
                backgroundColor: check == 1 ? Theme.colors.btnColor : '#fff',
                borderColor: '#EFE8E8',
                borderWidth: check == 1 ? 0 : 1.3,
                alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 8, right: 8
              }}>
              {check == 1 ?
                <Icon name="check" type='Feather' color="#fff" size={17} /> : null
              }

            </Pressable>
          </Pressable>
          <Pressable style={{
            height: 88, width: width / 3.4, borderRadius: 10, borderStyle: check == 2 ? 'dashed' : 'solid',
            borderColor: check == 2 ? Theme.colors.btnColor : '#DFDFDF', borderWidth: 1.2, padding: 10,
            backgroundColor: check == 2 ? '#E154540F' : '#fff'
          }}>

            <Image
              source={require('../../assets/images/RoomOnly.png')}
              style={{ height: 38, width: 38, resizeMode: 'contain' }}
            />
            <Text style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.bold, fontSize: 14, marginTop: 10 }}>Room Only</Text>

            <Pressable
              onPress={() => {
                setCheck(2)

              }}
              style={{
                height: 21, width: 21, borderRadius: 24,
                backgroundColor: check == 2 ? Theme.colors.btnColor : '#fff',
                borderColor: '#EFE8E8',
                borderWidth: check == 2 ? 0 : 1.3,
                alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 8, right: 8
              }}>
              {check == 2 ?
                <Icon name="check" type='Feather' color="#fff" size={17} /> : null
              }

            </Pressable>
          </Pressable>
          <Pressable style={{
            height: 88, width: width / 3.4, borderRadius: 10, borderStyle: check == 3 ? 'dashed' : 'solid',
            borderColor: check == 3 ? Theme.colors.btnColor : '#DFDFDF', borderWidth: 1.2, padding: 10,
            backgroundColor: check == 3 ? '#E154540F' : '#fff'
          }}>

            <Image
              source={require('../../assets/images/SharedRoom.png')}
              style={{ height: 38, width: 38, resizeMode: 'contain' }}
            />
            <Text numberOfLines={1} style={{ color: Theme.colors.black, fontFamily: Theme.FontFamily.bold, fontSize: 14, marginTop: 10 }}>Shared Room</Text>

            <Pressable
              onPress={() => {
                setCheck(3)

              }}
              style={{
                height: 21, width: 21, borderRadius: 24,
                backgroundColor: check == 3 ? Theme.colors.btnColor : '#fff',
                borderColor: '#EFE8E8',
                borderWidth: check == 3 ? 0 : 1.3,
                alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 8, right: 8
              }}>
              {check == 3 ?
                <Icon name="check" type='Feather' color="#fff" size={17} /> : null
              }

            </Pressable>
          </Pressable>
        </View>
        </KeyboardAwareScrollView>
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
            AddBasicDetails()
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

export default PropertyAddStep1

const styles = StyleSheet.create({
  input: {
    width: '100%', height: 100,
    borderColor: '#DFDFDF',color:'#000',
    borderWidth: 1.3, marginBottom: 15,
    fontSize: 14, borderRadius: 8, paddingHorizontal: 15,
  },
})