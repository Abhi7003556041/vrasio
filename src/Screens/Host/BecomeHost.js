import { Dimensions, Image, PermissionsAndroid, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import NavigationService from '../../Services/Navigation';
import { useRoute } from '@react-navigation/native';
import { Icon, StatusBar } from 'react-native-basic-elements';
import { useSelector } from 'react-redux';
import HelperFunctions from '../../Constants/HelperFunctions';
import { postApi } from '../../Services/Service';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Theme from '../../Constants/Theme';
import MyDropDownComponent from '../../Components/MyDropDownComponent/MyDropDownComponent';
import FloatingLabelTextInput from '../../Components/EditTextComponent/FloatingLabelTextInput';
import { TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { PERMISSIONS } from 'react-native-permissions';

const { width, height } = Dimensions.get('window');

const BecomeHost = (props) => {
  const route = useRoute();
  const customProp = route.params?.showButton;
  const [Loading, changeLoading] = useState(false);
  const form = new FormData();

  const { login_status, userDetails, token } = useSelector(state => state.authData);
  const { dashboardDetails, currencyDetails } = useSelector(state => state.commonData);
  const [countryList, setCountryList] = useState([])
  const [loading, setLoading] = useState(false)
  const [suggestionsList, setSuggestionsList] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [countrySelect, setCountrySelect] = useState(false)
  const [ID, setID] = useState("");
  const [IDNumber, setIDNumber] = useState("");

  const [IdNew, setIdNew] = useState("");
  const [IdDropDown, setIdDropDown] = useState(false)
  const dropdownController = useRef(null)
  const [imagesdet, setimagesdet] = useState('')
  const [imagesdetBack, setimagesdetBack] = useState('')
  const [Loder, setLoader] = useState(false);


  const searchRef = useRef(null)
  function getOriginalname(data) {
    let arr = data.split("/");
    let lent = Number(arr.length - 1);
    return arr[lent];
  }
  const getPermissionIos = async () => {
    if (Platform.OS === 'ios') {
      requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MEDIA_LIBRARY]).then((statuses) => {
        console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
        console.log('MEDIA_LIBRARY', statuses[PERMISSIONS.IOS.MEDIA_LIBRARY]);
      });
    }
  };
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        // PermissionsAndroid.PERMISSIONS.MEDIA_LIBRARY,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }

  };
  const getSuggestions = useCallback(async q => {
    const filterToken = q.toLowerCase()
    console.log('getSuggestions', q[1])
    if (typeof q !== 'string' || q.length < 1 || q === '' || q == ' ') {
      setSuggestionsList(countryList)
      
    }
    else if (q.length > 0) {
      console.log('resdpospdosd', countryList)
      // const items =  countryList
      const suggestions = countryList
        .filter(item => item.name.toLowerCase().includes(filterToken))
        .map(item => ({
          id: item.id,
          name: item.name,
        }))
      setSuggestionsList(suggestions)
      // setUserLoader(false)
    }

  }, [countryList])
  const handleAddTag = (val) => {
    console.log('vallala',val)
    if (val.name.trim() !== '') {

      setSelectedItem(val)
      setCountrySelect(true);
      setSuggestionsList(null)
    }else{
      setSelectedItem(val)
      setCountrySelect(true);
      setSuggestionsList(null)
    }
  };
  const onClearPress = useCallback(() => {
    setSuggestionsList(null)
  }, [])

  const onOpenSuggestionsList = useCallback(isOpened => getAllCountry(), [])
  const getAllCountry = () => {
    let data = {
      "type": "country"
    }
    changeLoading(true)
    console.log('masterdatalistdata>>', data)
    changeLoading(true)
    postApi("api/masterdatalist", data, token).then(response => {
      // console.log('getAllProperty>>>>>>>>>>', response)
      if (response?.status) {
        // console.log('getAllCountry>>fjkwhsdkfjhskjd>>>>>>>>', JSON.stringify(response.data))
        changeLoading(false)
        setCountryList(response?.data)
        setSuggestionsList(response?.data)

      } else {
        HelperFunctions.showLongToastMsg(response?.message)
        setCountryList([])
      }
    }).catch(error => {
      HelperFunctions.showToastMsg(error?.message)
      changeLoading(false)

    }).finally(() => {
      changeLoading(false)

    })
  }
  const imageUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log('imaher', image)
      let get_originalname = getOriginalname(image.path);

     
      setimagesdet(image)
      // console.log('form',form)
      //  if(form!=null && image){
      //   UpdateProfileImage()
      //  }

    });
  }
  const imageUploadBackside = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log('imaher', image)
      let get_originalname = getOriginalname(image.path);

      
      setimagesdetBack(image)
      // console.log('form',form)
      //  if(form!=null && image){
      //   UpdateProfileImage()
      //  }

    });
  }
  const BecomeHost = () => {
    if (selectedItem?.id == null || selectedItem?.id == undefined || selectedItem?.id == "") {
      HelperFunctions.showToastMsg("Please select any country")
    }
    else if (ID == null || ID == undefined || ID == "") {
      HelperFunctions.showToastMsg("Please select any id proof")
    }
    else if (IDNumber == null || IDNumber == undefined || IDNumber == "" || IDNumber.length < 6) {
      HelperFunctions.showToastMsg("Please Provide valid identity number ")
    }
    else if (imagesdet == null || imagesdet == undefined || imagesdet == "") {
      HelperFunctions.showToastMsg("Please upload front side of identity proof")
    }
    else if (imagesdetBack == null || imagesdetBack == undefined || imagesdetBack == "") {
      HelperFunctions.showToastMsg("Please upload back side of identity proof")
    }
    else {
      
        let get_originalname1 = getOriginalname(imagesdet.path);

        // form.append('image_for', 'profile_image');
        form.append('front_image', {
          uri: imagesdet.path,
          type: imagesdet.mime,
          name: get_originalname1,
        });
      
        let get_originalname2 = getOriginalname(imagesdetBack.path);

        // form.append('image_for', 'profile_image');
        form.append('back_image', {
          uri: imagesdetBack.path,
          type: imagesdetBack.mime,
          name: get_originalname2,
        });
    
    
      form.append('country_id', selectedItem?.id)
      form.append('identity_type', ID)
      form.append('identity_number', IDNumber)
      console.log('formmr',JSON.stringify(form))
      setLoader(true)
      postApi("api/become-a-host", form, token, "multipart/form-data")
      .then(response => {
        // console.log('response>>>>>>',response)
        if (response?.status) {
          HelperFunctions.showLongToastMsg("Request Sent Successfully, Please wait for admin approval")
          NavigationService.back()

          setLoader(false)

        } else {
          HelperFunctions.showToastMsg(response?.message)
          setLoader(false)

        }
      }).catch(error => {
        HelperFunctions.showToastMsg(error?.message)
        console.log('erer',JSON.stringify(error))
        setLoader(false)
      })
    }
  }
  useEffect(() => {
    getAllCountry()
    // searchRef.current.focus()
  }, [])
  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: '#fff' }}
      showLoading={Loading || Loder}
      // isScrollable={true}
      // Home
      leftHeading={'Become Host'}
      viewStyle={{ backgroundColor: '#fff', }}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}
    >
      {console.log('sdsds', selectedItem?.id)}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
        <Pressable
          // onPress={() => searchRef.current.blur()}
          style={{}}>
          {!countrySelect ?
            <Pressable
              // onPress={() => dropdownController.current.toggle()}

              style={[
                { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
                Platform.select({ ios: { zIndex: 1 } }),
              ]}>
              {console.log('selelct', countrySelect)}
              <AutocompleteDropdown
                ref={searchRef}
                controller={controller => {
                  dropdownController.current = controller
                }}
                // initialValue={'1'}
                direction={Platform.select({ ios: 'down', android: 'down' })}
                dataSet={suggestionsList}
                onChangeText={getSuggestions}
                onSelectItem={item => {
                  item && handleAddTag(item)
                }}
                // initialValue={selectedItem}
                debounce={500}
                suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
                onClear={onClearPress}
                //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
                // onOpenSuggestionsList={onOpenSuggestionsList}
                loading={Loading}
                useFilter={false} // set false to prevent rerender twice
                textInputProps={{
                  placeholder: 'Select Country',
                  autoCorrect: false,
                  autoCapitalize: 'none',
                  style: {
                    borderRadius: 25,
                    backgroundColor: 'transparent',
                    color: '#000',
                    paddingLeft: 12,

                  },
                }}
                rightButtonsContainerStyle={{
                  right: 8,
                  height: 30,

                  alignSelf: 'center',
                }}
                inputContainerStyle={{
                  backgroundColor: 'transparent',
                  borderRadius: 5, borderWidth: 0.9, alignSelf: 'center',
                  borderColor: 'rgba(0, 0, 0, 0.4)', width: width - 40
                }}
                suggestionsListContainerStyle={{
                  backgroundColor: '#fff', elevation: 5, ...Platform.select({
                    ios: {
                      shadowColor: 'black',
                      shadowOffset: { width: 1, height: 1 },
                      shadowOpacity: 0.5,
                      shadowRadius: 4,
                    },

                  }),
                }}
                containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                renderItem={(item, text) => <Text style={{ color: '#000', padding: 15, fontWeight: '500' }}>
                  {item.name}</Text>}
                ChevronIconComponent={<Icon type='Feather' name="chevron-down" size={20} color="#000" />}
                ClearIconComponent={<Icon type='Feather' name="x-circle" size={18} color="#000" />}
                inputHeight={55}
                showChevron={true}
                closeOnBlur={true}
              //  showClear={false}
              />
            </Pressable>
            :
            <View style={{
              backgroundColor: 'transparent', height: 55, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row',
              borderRadius: 5, borderWidth: 0.9, alignSelf: 'center', paddingHorizontal: 10,
              borderColor: 'rgba(0, 0, 0, 0.4)', width: width - 40, marginTop: 10
            }}>
              <Text style={{ color: '#000', fontSize: 16, fontFamily: Theme.FontFamily.semiBold }}> {(selectedItem?.name)}</Text>
              <Icon type='Feather' name="x-circle" size={18} color="#000" onPress={() => {
                setCountrySelect(false)
                setSelectedItem(null)
              }} />
            </View>
          }
          <View style={{ marginHorizontal: 0, marginTop: 20 }}>
            <View
              style={{}}>

              <MyDropDownComponent
                onBlur={() => setIdDropDown(false)}
                onFocus={() => setIdDropDown(true)}
                itemTextStyle={{ color: '#000' }}
                selectedTextStyle={{ color: '#000' }}
                itemTestIDField="English"
                placeholder="Select Id"
                renderRightIcon={
                  IdDropDown
                    ? undefined
                    : () => (
                      <Icon
                        name="angle-right"
                        type="FontAwesome"
                        color={'#000'}
                        size={25}
                        style={{ alignSelf: 'center', marginRight: 5 }}
                      />
                    )
                }
                style={{ ...styles.category_view, backgroundColor: '#fff' }}
                data={[
                  { 'type': 'Driving license' },
                  { 'type': 'Passport' },
                  { 'type': 'Identity card' },
                  { 'type': 'Other' }
                ]}
                labelField="type"
                valueField="type"
                value={ID}
                onChange={e => {
                  console.log('rtrt', e)
                  setID(e)
                  setIdNew(e.type)
                }
                }
              />
            </View>
          </View>
          {IdNew ?
            <>
              <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                <FloatingLabelTextInput
                  label="Identity Number"
                  value={IDNumber}
                  onChangeText={setIDNumber}

                />
              </View>
              <Text style={{ marginHorizontal: 20, marginTop: 10, fontSize: 16, fontWeight: '500' }}>Front Side</Text>
              <View style={{
                alignItems: 'center', marginTop: 10, height: 220, width: width - 40, justifyContent: 'center',
                borderWidth: 0.8, borderColor: '#aaa', alignSelf: 'center', borderStyle: 'dashed', borderRadius: 10
              }}>

                <TouchableOpacity
                  onPress={imageUpload}
                >
                  <Image
                    source={imagesdet ? { uri: imagesdet.path } : require('../../assets/images/addimage.png')}
                    style={{
                      height: imagesdet ? 220 : 110,
                      width: imagesdet ? width - 40 : 110,
                      borderRadius: 10
                    }}
                    resizeMode='cover'
                  />
                </TouchableOpacity>
              </View>
              <Text style={{ marginHorizontal: 20, marginTop: 15, fontSize: 16, fontWeight: '500' }}>Back Side</Text>
              <View style={{
                alignItems: 'center', marginTop: 10, height: 220, width: width - 40, justifyContent: 'center',
                borderWidth: 0.8, borderColor: '#aaa', alignSelf: 'center', borderStyle: 'dashed', borderRadius: 10
              }}>

                <TouchableOpacity
                  onPress={imageUploadBackside}
                >
                  <Image
                    source={imagesdetBack ? { uri: imagesdetBack.path } : require('../../assets/images/addimage.png')}
                    style={{
                      height: imagesdetBack ? 220 : 110,
                      width: imagesdetBack ? width - 40 : 110,
                      borderRadius: 10
                    }}
                    resizeMode='cover'
                  />
                </TouchableOpacity>
              </View>
              <Pressable
                disabled={Loder}
                onPress={() => BecomeHost()}
                style={{
                  height: 60, width: width - 50, alignItems: 'center',
                  justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginTop: 30,
                  backgroundColor: Theme.colors.btnColor
                }}>
                <Text style={{ fontSize: 17, fontFamily: Theme.FontFamily.bold, color: '#fff' }}>Become Host</Text>

              </Pressable>
            </>
            : null
          }

        </Pressable>
      </ScrollView>
    </ScreenLayout>
  )
}

export default BecomeHost

const styles = StyleSheet.create({
  text_style: {
    fontFamily: Theme.FontFamily.normal,
    width: '100%',
    fontSize: 14,
    color: '#000',
  },
  category_view: {
    width: Dimensions.get('window').width - 40,
    borderRadius: 5,
    // marginHorizontal: 10,
    marginTop: 0,
    borderColor: '#aaa',
    borderWidth: 1,
    height: (55), paddingHorizontal: 15,
    // marginLeft:10
    alignSelf: 'center',
  },
})