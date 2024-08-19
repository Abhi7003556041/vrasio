import { ActivityIndicator, Dimensions, FlatList, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Children, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import { useRoute } from '@react-navigation/native';
import Theme from '../../Constants/Theme';
import AppIntroSlider from 'react-native-app-intro-slider';
import NavigationService from '../../Services/Navigation';
import { Icon } from 'react-native-basic-elements';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import ReactNativeModal from 'react-native-modal';
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment'
import HelperFunctions from '../../Constants/HelperFunctions';
import { postApi } from '../../Services/Service';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get('window');

const ConfirmDetails = (props) => {
  const route = useRoute();
  const { details } = props.route.params
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [adult, setAdult] = useState(1)
  const [Child, setChild] = useState(0)
  const [Loder, setLoader] = useState(false);
  const {dashboardDetails, currencyDetails,favouriteList } = useSelector(state => state.commonData);
  const [hotelDetails,setHotelDetails] = useState({})
  const [Infants, setInfants] = useState(0)
  const [Pets, setPets] = useState(0)

  const [selected, setSelected] = useState(new Date());
  var nextDay = new Date();
  nextDay.setDate(new Date().getDate() + 1);
  const [checkout, setCheckout] = useState(null)
  const [selectedDate, setSelectedDate] = useState("");
  const [ModalState, setModalState] = useState(false)
  const minDate = new Date(); // Today
  // const maxDate = new Date(2017, 6, 3);
  const startDate = selected ? selected.toString() : "";
  const endDate = checkout ? checkout.toString() : "";
  const [SliderData, setSliderData] = useState([
    { title: 'California Days', Img: require("../../assets/images/pexels.png") },
    { title: 'California Days', Img: require("../../assets/images/beach.png") },
    { title: 'Australia Wildwilfe', Img: require("../../assets/images/wildlife.png") },
    { title: 'Australia Wildwilfe', Img: require("../../assets/images/nature.png") },
    { title: 'California Days', Img: require("../../assets/images/beach.png") },


  ])
  const [check, setCheck] = useState(0)
  const [open, setOpen] = useState(false)
  const [available, setavailable] = useState(false)

  const handelClick = () => {
    setOpen(false);
  };
  const onDateChange = (date, type) => {
    const newDate = JSON.stringify(date)
    const newDate1 = newDate.substring(1, newDate.length - 1)
    const dates = newDate1.split("T")
    const date1 = dates[0].split("-")
    const day = date1[2]
    const month = date1[1]
    const year = date1[0]
    console.log(type)
    if (type === "END_DATE") {
      if (day == undefined) {
        setCheckout()
        // console.log('ddayad',day)
      }
      else if(selected == newDate1){
        HelperFunctions.showToastMsg("Checkin &  Checkout date should not be same")
      }
      else {
        setCheckout(newDate1)
        setTimeout(() => {
          setOpen(false)
          checkAvailability(newDate1)
        }, 500)
      }

    } else {
      setSelected(newDate1)
      setCheckout(null)

    }
  }
  const getHotelDetails = (checkOOt) => {
    setLoader(true)
    let data = {
      
      "currency_id": currencyDetails.id,
      "propertyslug": details?.slug,
      "startdate": moment(selected).format('YYYY-MM-DD'),
      "enddate": moment(checkOOt).format('YYYY-MM-DD'),
      "adult": adult,
      "children": Child,
      "infants": Infants,
      "pets": Pets
    }
    postApi("api/propertydetails", data, "").then(response => {
      console.log('response1233>>>>>>', JSON.stringify(response))
      if (response?.status) {
        //   storeToLocalAndRedux(response)
        setHotelDetails(response?.data)
       
        setavailable(true)
      } else {
        HelperFunctions.showToastMsg(response?.message)
        setLoader(false)


      }
    }).catch(error => {
      HelperFunctions.showToastMsg(error?.message)
      setLoader(false)


    }).finally(() => {
      setLoader(false)


    })

  }
  const checkAvailability = (checkOOt = checkout) => {
    if (selected == null || selected == undefined) {
      HelperFunctions.showToastMsg("Please choose checkin date")
    }
    else if (checkOOt == null || checkOOt == undefined) {
      HelperFunctions.showToastMsg("Please choose checkout  date")
    }
    else if (adult + Child + Infants == 0) {
      HelperFunctions.showToastMsg("Please provide number of guest")
    }
    else {
      setLoader(true)

      let data = {
        // "propertyid":details?.propertyid,
        "propertySlug": details?.slug,
        "startdate": moment(selected).format('YYYY-MM-DD'),
        "enddate": moment(checkOOt).format('YYYY-MM-DD'),
      }
      console.log('dararrarar', data)
      postApi("api/check-availability", data, "").then(response => {
        console.log('responseavailability', response)
        if (response?.status) {
          //   storeToLocalAndRedux(response)
          setLoader(false)
          HelperFunctions.showToastMsg(response?.message)
          getHotelDetails(checkOOt)
        } else {
          setLoader(false)
          HelperFunctions.showToastMsg(response?.message ?? 'Not available')
        setavailable(false)

        }
      }).catch(error => {
        setLoader(false)
        HelperFunctions.showToastMsg(error?.message ?? 'error occurred')
        setavailable(false)


      }).finally(() => {
        setLoader(false)
        
      })

    }
  }

  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: '#FFF' }}
      // showLoading={Loading}
      //   isScrollable={true}
      leftHeading={'Confirm Details'}
      viewStyle={{ backgroundColor: '#F9F6F6' }}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}
    >
      {/* {console.log('ihdfs hjfsz',moment(selected).format('YYYY/MM/DD'))} */}
      <ScrollView
        showsVerticalScrollIndicator={false}

        contentContainerStyle={{ paddingBottom: 100 }}>
        <Pressable >
          <View style={{
            height: height / 8, width: width,
            backgroundColor: '#fff',
            // alignItems: 'center',
            paddingHorizontal: 25,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Image
              source={{ uri: details?.coverimagemain }}
              style={{
                height: height / 9,
                width: width / 3,
                borderRadius: 10
              }}
            />
            <View style={{ marginLeft: 15, width: width / 1.9 }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="star" type='AntDesign' color="#000" size={16} />
                <Text style={{ fontSize: 12, fontFamily: Theme.FontFamily.bold, color: '#000', marginLeft: 2 }}>{Number(details?.average_rating).toFixed(1)}</Text>
              </View>
              <Text numberOfLines={1} style={{ fontSize: 19, fontFamily: Theme.FontFamily.normal, color: '#000' }}>{details?.title}</Text>
              <Text numberOfLines={2} style={{ fontSize: 13, fontFamily: Theme.FontFamily.normal, color: '#000' }}>{details?.description}</Text>
            </View>
          </View>
          <View style={{
            height: 192,
            backgroundColor: '#fff',
            // alignItems: 'center',
            paddingHorizontal: 25,
            marginTop: 10,
            justifyContent: 'center',

            // alignItems: 'center',
          }}>
            <View style={{
              // height:192,
              backgroundColor: '#fff',
              // alignItems: 'center',
              // paddingHorizontal:25,
              marginTop: 0,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View>
                <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000' }}>Dates</Text>
                <Text style={{ fontSize: 15, fontFamily: Theme.FontFamily.normal, color: '#000' }}>
                  {moment(selected).format("MMM D YYYY")} - {checkout == null ? "Checkout Date" : moment(checkout).format("MMM D YYYY")}</Text>
              </View>
              <Text onPress={() => setOpen(!open)} style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000', textDecorationLine: 'underline' }}>Modify</Text>


            </View>

            <View
              style={{ height: 1.5, width: '100%', backgroundColor: '#DFDFDF', marginVertical: 20 }}
            />
            <View style={{
              // height:192,
              backgroundColor: '#fff',
              // alignItems: 'center',
              // paddingHorizontal:25,
              marginTop: 0,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View>
                <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000' }}>Guest</Text>
                <Text style={{ fontSize: 19, fontFamily: Theme.FontFamily.normal, color: '#000' }}>{adult + Child + Infants + Pets} guest</Text>
              </View>
              <Text onPress={() => setModalState(true)} style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000', textDecorationLine: 'underline' }}>Modify</Text>


            </View>
          </View>
          <View style={{
            height: 254,
            backgroundColor: '#fff',
            // alignItems: 'center',
            paddingHorizontal: 25,
            marginTop: 10,
            justifyContent: 'center'
          }}>
            <Text style={{ fontSize: 19, fontFamily: Theme.FontFamily.normal, color: '#000' }}>Pay Comfortably</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
              <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Pay in full</Text>
              <Pressable
                onPress={() => setCheck(0)}
                style={{
                  height: 24, width: 24, borderRadius: 24,
                  backgroundColor: check == 0 ? '#000' : "#fff",
                  borderWidth: 1.5, borderColor: check == 0 ? '#000' : '#DFDFDF',
                  alignItems: 'center', justifyContent: 'center'
                }}>
                {check == 0 ?
                  <Icon name="check" type='Feather' color="#fff" size={17} /> : null
                }

              </Pressable>
            </View>
            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000', }}>Pay the total (${details?.average_price}) and you're all set to check-in hustle-free.</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
              <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Pay part now, part later</Text>
              <Pressable
                onPress={() => setCheck(1)}
                style={{
                  height: 24, width: 24, borderRadius: 24,
                  backgroundColor: check == 1 ? '#000' : "#fff",
                  borderWidth: 1.5, borderColor: check == 1 ? '#000' : '#DFDFDF',
                  alignItems: 'center', justifyContent: 'center'
                }}>
                {check == 1 ?
                  <Icon name="check" type='Feather' color="#fff" size={17} /> : null
                }
              </Pressable>
            </View>
            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000', }}>Pay the total (${details?.average_price}) and you're all set to check-in hustle-free.</Text>
          </View>
        </Pressable>
      </ScrollView>
      <View style={{
        height: 100,
        backgroundColor: '#fff',
        // alignItems: 'center',
        paddingHorizontal: 25,
        marginTop: 10,
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

        }),
      }}>
        <View style={{}}>
          <Text style={{ fontSize: 19, fontFamily: Theme.FontFamily.bold, color: '#000' }}>$ {details?.average_price}
            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000' }}>/night</Text>
          </Text>
          <Text onPress={() => setOpen(!open)} style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000', textDecorationLine: 'underline', marginTop: 1 }}>
            {moment(selected).format("MMMM Do")} - {checkout == null ? 'Checkout Date' : moment(checkout).format("MMMM Do")}</Text>
        </View>
        <Pressable
        disabled={!available}
          onPress={() =>
            NavigationService.navigate('PaymentPage', {
              details: hotelDetails, checkin: selected, checkout: checkout, guestNo: adult + Child + Infants + Pets
              , adult: adult, child: Child, infant: Infants, pet: Pets
            })
          }
          style={{
            backgroundColor:available ? '#E15454' : '#7D7D7D',
            height: 50,
            paddingHorizontal: 10,
            //  width:120,
            borderRadius: 5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
          }}>
          <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#fff', marginRight: 5 }}>Proceed to pay</Text>
          {Loder ?
            <ActivityIndicator size={'small'} color={'#fff'} /> : null
          }
        </Pressable>
      </View>
      {/* {console.log('selectyed>>>>>',selected)} */}
      {open ?
        <Pressable onPress={() => setOpen(false)} style={styles.centerdView}>
          <View style={styles.modalView}>

            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              minDate={minDate}
              // maxDate={maxDate}
              todayBackgroundColor="blue"
              selectedDayColor="#7300e6"
              selectedDayTextColor="#FFFFFF"
              previousTitle="  ᐊ"
              nextTitle="ᐅ  "

              disabledDatesTextStyle={{
                fontFamily: "Cochin",
                color: "grey",
              }}
              textStyle={{
                fontFamily: "Cochin",
                color: "#fff",
              }}
              onDateChange={onDateChange}
            />
          </View>
        </Pressable>
        : null
      }
      <ReactNativeModal
        isVisible={ModalState}
        // backdropColor={'rgba(228, 14, 104, 1)'}
        backdropOpacity={0.4}
        style={{
          margin: 0,
          padding: 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        // animationIn={'zoomInDown'}
        // animationOut={'zoomOut'}
        onBackButtonPress={() => {
          //   setPlay(false)
          setModalState(false)
        }
        }
        onBackdropPress={() => {
          //   setPlay(false)
          setModalState(false)
        }}>
        <View
          style={{
            width: width,
            height: height / 2.6,
            backgroundColor: '#fff',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            // overflow:'visible',
            // alignItems: 'center',
            // justifyContent:'center',
            paddingHorizontal: 45,
            paddingTop: 35

          }}>
          {/* <Text style={{ fontSize: 20, fontFamily: Theme.FontFamily.normal, color: '#000' }}>Choose Payment Method</Text> */}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ backgroundColor: '#fff', paddingBottom: 20, }}>
            <View style={{
              // height:222,
              backgroundColor: '#fff',
            }}>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between', alignItems: 'center'
                // justifyContent:'center'
              }}>
                <View>
                  <Text style={{ fontSize: 18, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Adults</Text>
                  <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: 'grey' }}>Age 18+</Text>

                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center', paddingHorizontal: 5
                }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (adult != 0) {
                        setAdult(adult - 1)
                      }
                    }}
                    style={{
                      height: 40, width: 40, borderRadius: 40, backgroundColor: '#ECECEC', elevation: 6,
                      alignItems: 'center', justifyContent: 'center',
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
                    <Icon name='minus' type='AntDesign' size={23} />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#000', marginHorizontal: 20, width: 20, textAlign: 'center' }}>
                    {adult}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setAdult(adult + 1)

                    }}
                    style={{
                      height: 40, width: 40, borderRadius: 40, backgroundColor: '#ECECEC', elevation: 6,
                      alignItems: 'center', justifyContent: 'center',
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
                    <Icon name='plus' type='AntDesign' size={20} />

                  </TouchableOpacity>
                </View>

              </View>



            </View>
            <View style={{
              // height:222,
              backgroundColor: '#fff', marginTop: 20
            }}>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between', alignItems: 'center'
                // justifyContent:'center'
              }}>
                <View>
                  <Text style={{ fontSize: 18, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Childern</Text>
                  <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: 'grey' }}>Age 2-17</Text>

                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center', paddingHorizontal: 5
                }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (Child != 0) {
                        setChild(Child - 1)
                      }
                    }}
                    style={{
                      height: 40, width: 40, borderRadius: 40, backgroundColor: '#ECECEC', elevation: 6,
                      alignItems: 'center', justifyContent: 'center',
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
                    <Icon name='minus' type='AntDesign' size={23} />
                  </TouchableOpacity>
                  <Text style={{
                    fontSize: 16, fontWeight: '600', color: '#000',
                    marginHorizontal: 20, width: 20, textAlign: 'center'
                  }}>{Child}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setChild(Child + 1)
                    }}
                    style={{
                      height: 40, width: 40, borderRadius: 40, backgroundColor: '#ECECEC', elevation: 6,
                      alignItems: 'center', justifyContent: 'center',
                      ...Platform.select({
                        ios: {
                          shadowColor: 'black',
                          shadowOffset: { width: 2, height: 2 },
                          shadowOpacity: 0.4,
                          shadowRadius: 4,
                        },
                        android: {
                          // elevation: 3,
                        },
                      }),
                    }}>
                    <Icon name='plus' type='AntDesign' size={20} />

                  </TouchableOpacity>
                </View>

              </View>



            </View>
            <View style={{
              // height:222,
              backgroundColor: '#fff', marginTop: 20
            }}>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between', alignItems: 'center'
                // justifyContent:'center'
              }}>
                <View>
                  <Text style={{ fontSize: 18, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Infants</Text>
                  <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: 'grey' }}>Under 2</Text>

                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center', paddingHorizontal: 5
                }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (Infants != 0) {
                        setInfants(Infants - 1)
                      }
                    }}
                    style={{
                      height: 40, width: 40, borderRadius: 40, backgroundColor: '#ECECEC', elevation: 6,
                      alignItems: 'center', justifyContent: 'center',
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
                    <Icon name='minus' type='AntDesign' size={23} />
                  </TouchableOpacity>
                  <Text style={{
                    fontSize: 16, fontWeight: '600', color: '#000',
                    marginHorizontal: 20, width: 20, textAlign: 'center'
                  }}>{Infants}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setInfants(Infants + 1)
                    }}
                    style={{
                      height: 40, width: 40, borderRadius: 40, backgroundColor: '#ECECEC', elevation: 6,
                      alignItems: 'center', justifyContent: 'center',
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
                    <Icon name='plus' type='AntDesign' size={20} />

                  </TouchableOpacity>
                </View>

              </View>



            </View>
            <View style={{
              // height:222,
              backgroundColor: '#fff', marginTop: 20
            }}>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between', alignItems: 'center'
                // justifyContent:'center'
              }}>
                <View>
                  <Text style={{ fontSize: 18, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Pets</Text>
                  <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: 'grey' }}>Any</Text>

                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center', padding: 5
                }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (Pets != 0) {
                        setPets(Pets - 1)
                      }
                    }}
                    style={{
                      height: 40, width: 40, borderRadius: 40, backgroundColor: '#ECECEC', elevation: 6,
                      alignItems: 'center', justifyContent: 'center',
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
                    <Icon name='minus' type='AntDesign' size={23} />
                  </TouchableOpacity>
                  <Text style={{
                    fontSize: 16, fontWeight: '600', color: '#000',
                    marginHorizontal: 20, width: 20, textAlign: 'center'
                  }}>{Pets}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setPets(Pets + 1)
                    }}
                    style={{
                      height: 40, width: 40, borderRadius: 40, backgroundColor: '#ECECEC', elevation: 6,
                      alignItems: 'center', justifyContent: 'center',
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
                    <Icon name='plus' type='AntDesign' size={20} />

                  </TouchableOpacity>
                </View>

              </View>



            </View>
            {/* <Pressable
            onPress={()=>setModalState(false)}
            style={{
              width:160,height:40,backgroundColor:Theme.colors.lightRed,borderRadius:5,
              alignItems:'center',justifyContent:'center',alignSelf:'center',marginTop:25
            }}
            >
              <Text style={{fontSize:14,color:'#fff',fontWeight:'600'}}>Confirm</Text>
            </Pressable> */}
          </ScrollView>
        </View>
      </ReactNativeModal>
      {Loder ?
        <View style={{ position: 'absolute', height: '100%', width: '100%', bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
            <View style={{
              justifyContent: 'center', flexDirection: 'column', alignItems: 'center', backgroundColor: '#131313', width: 70, height: 70, alignSelf: 'center', borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 6,
              elevation: 6,
              backgroundColor: "white",
              // borderRadius:70

            }}>
              <ActivityIndicator size={'large'} color={'#00AD70'} />

              {/* <Lottie style={{width:90,aspectRatio:1 }} source={require('../../assets/icons/loading.json')} autoPlay loop /> */}
              {/* <LottieView style={{ width: 90, aspectRatio: 1 }} source={require('../../assets/icons/new_loading.json')} autoPlay loop /> */}
            </View>
          </View>
        </View> : null
      }
    </ScreenLayout>
  )
}

export default ConfirmDetails

const styles = StyleSheet.create({
  centerdView: {

    alignItems: 'center', justifyContent: 'center',
    position: 'absolute',
    right: 0, left: 0,
    // top:230,
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: '100%',
  },
  modalView: {
    elevation: 10,
    marginHorizontal: 15,
    backgroundColor: '#000',
    borderRadius: 5,
    width: '95%',
    // height:'100%',
    padding: 10,
    alignItems: 'center',
    shadowColor: 'gray',
    textShadowOffset: {

      width: 2,
      height: 2
    }
  }
})

{/* <Calendar
            //    showWeekNumbers={true}
               selectRange={true}
            //    hideExtraDays
               minDate={`${new Date(new Date().toDateString())}`}
            //    enableSwipeMonths
               
               onTouchPrev={(e)=>console.log('>>>>>>>',e)}    // Callback for prev touch event
                onTouchNext={(e)=>console.log('>>>>>>>',e)}    // Callback for next touch event
                onSwipePrev={(e)=>console.log('>>>>>>>',e)}    // Callback for back swipe event
                onSwipeNext={(e)=>console.log('>>>>>>>',e)}
            //    state='today'
                onDayLongPress={day=> {
                    console.log('day',day)
                    // setSelected(day.dateString)
                }}
               onDayPress={day => {
                 console.log('selected day', day);
                 selected != "" ?

                 setSelectedDate(day.dateString)
                 :
                 
                    setSelected(day.dateString)

                
                //  handelClick(false);
               }}
               markedDates={{
                [selected]: {startingDay:true, selected: true,  color: 'blue'},
                [selectedDate] : {endingDay : true, selected: true,color: 'blue'}
              }}
               theme={{calendarBackground:'#000',dayTextColor:'#fff',monthTextColor:'#fff',textDisabledColor: 'grey'}}
               style={{
                 width: width-60,
                 backgroundColor:'#000',
                 borderRadius:10
                 // height:350
               }}
             /> */}