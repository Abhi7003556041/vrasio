import { ActivityIndicator, Alert, Dimensions, FlatList, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import { useRoute } from '@react-navigation/native';
import Theme from '../../Constants/Theme';
import AppIntroSlider from 'react-native-app-intro-slider';
import NavigationService from '../../Services/Navigation';
import { Accordion, AppTextInput, CheckBox, Icon, RadioButton } from 'react-native-basic-elements';
import PlusIcon from '../../assets/icons/PlusIcon';
import LockIcon from '../../assets/icons/LockIcon';
import ReactNativeModal from 'react-native-modal';
import { CardField, useStripe, createToken, StripeProvider, initStripe } from '@stripe/stripe-react-native';
import CardPaymentComp from '../../Components/Payment/Cardpayment';
import { postApi } from '../../Services/Service';
import { useSelector } from 'react-redux';
import HelperFunctions from '../../Constants/HelperFunctions';
import moment from 'moment';
import FloatingLabelTextInput from '../../Components/EditTextComponent/FloatingLabelTextInput';
import Clipboard from '@react-native-clipboard/clipboard';
const { width, height } = Dimensions.get('window');

const PaymentPage = (props) => {
    const route = useRoute();
    const { details, checkin, checkout, guestNo, adult, child, infant, pet } = props.route.params

    // Access the customProp passed from the source screen
    const customProp = route.params?.showButton;
    const { login_status, userDetails, token } = useSelector(state => state.authData);
  const {dashboardDetails, currencyDetails,favouriteList } = useSelector(state => state.commonData);

    const [cardInfo, setCardinfo] = useState()
    const [checkCard, setCheckCard] = useState(false);
    const [SaveCard, setSaveCard] = useState('no');
    const [SaveCardDetails, setSaveCardDetails] = useState({});
    const [PriceBreak,setPriceBreak] = useState(details?.price)
    const [name, setname] = useState('')
    const [Phone, setPhone] = useState('')
    const [MyEmail, setMyEmail] = useState(userDetails.email)
    const [Email, setEmail] = useState('')



    const [open, setOpen] = useState(false)
    const [openP, setOpenP] = useState(false)

    const [paymentToken, setPaymentToken] = useState('')
    const [Loder, setLoader] = useState(false);
    const [cardList, setCardList] = useState([])
    const [check, setCheck] = useState('a')
    const [checkState, setCheckState] = useState(false)

    const [CardNo, setCardNo] = useState('')
    const publishableKey = "pk_test_51OlPRXClbxQi10jtB5I9QWPxe61oC6H4Yxg7ulmtWC85y0xxPb26Sa2NZQ0B6i8bDoph43f41LOtMDNZm0Ur8KHu00CzSHLtbj"
    const [ModalState, setModalState] = useState(false)
    const [CardModalState, setCardModalState] = useState(false)

    const [selected, setSelected] = useState(0);
    const dayCount = (new Date(checkout).getDate()- new Date(checkin).getDate())
    const [priceDetails, setPriceDetails] = useState([
        { itemname: `${details?.average_price} ✘ ${dayCount} nights`, price: `${Number(details?.average_price.split(',').join('')) * dayCount}` },
        { itemname: 'Cleaning Fees', price: `${details?.cleaning_fees.split(',').join('')}` },
        { itemname: 'Resort fee', price: `${details?.resort_fees.split(',').join('')}` },
        { itemname: 'Service fee', price: `${details?.guest_service_fee_amount.split(',').join('')}` },
        { itemname: 'Service Tax ', price: `${details?.total_tax_amount.split(',').join('')}` },

    ])
    const [PaymentDetails, setPaymentDetails] = useState([
        { title: 'Google Pay', Img: require("../../assets/images/googlepay.png") },
        { title: 'Credit or Debit card', Img: require("../../assets/images/card.png") },
        { title: 'PayPal', Img: require("../../assets/images/paypal.png") },
        { title: 'Apple Pay', Img: require("../../assets/images/applepay.png") },
        // { title: 'California Days', Img: require("../../assets/images/beach.png") },
    ])

    const getCardList = () => {
        setLoader(true)
        postApi("api/cardlist", "", token).then(response => {
            // console.log('cardlist', response)
            if (response?.status) {
                setCardList(response?.data)
                setLoader(false)

            } else {
                HelperFunctions.showToastMsg(response?.message)
                setLoader(false)

                setCardList([])
            }
        }).catch(error => {
            HelperFunctions.showToastMsg(error?.message)
            setLoader(false)


        }).finally(() => {
            setLoader(false)


        })

    }
    function formatWithCommas(n) { 
        return n.toString().replace(/\B(?=(\d{3})+\b)/g, ","); 
      }
    const bookDestination = (tok) => {
        if (cardInfo == null || cardInfo == undefined) {
            HelperFunctions.showToastMsg("Please fillup card details")
        }
        else if (name == null || name == undefined || name == "") {
            HelperFunctions.showToastMsg("Please provide card holders name")
        }
        else if (selected == 1 && Email == null ||selected == 1&&  Email == undefined ||selected == 1 && Email == "") {
            HelperFunctions.showToastMsg("Please provide email where should invoices be sent!!")
        }
        else if (openP && Phone == null ||openP && Phone == undefined ||openP && Phone == "") {
            HelperFunctions.showToastMsg("Please provide Phone number!!")
        }
        else {
            console.log('token', tok)
            setLoader(true)
            let data = {
                "propertySlug": details?.slug,
                "startdate": moment(checkin).format('YYYY-MM-DD'),
                "enddate": moment(checkout).format('YYYY-MM-DD'),
                "adult": adult,
                "children": child,
                "infants": infant,
                "pets": pet,
                // "card_id":4,
                "currency": currencyDetails.id,
                "token": tok,
                "save_card": SaveCard,
                "mobile":Phone,
                "email":Email
            }
            console.log('data>>>caerd', data)
            postApi("api/propertybooking", data, token).then(response => {
                console.log('response', response)
                if (response?.status) {
                    //   storeToLocalAndRedux(response)
                    setLoader(false)
                    setOpen(false)
                    //  setLoader2()
                    HelperFunctions.showToastMsg(response?.message)
                    NavigationService.navigate('BottomTabNavigation')
                } else {
                    setLoader(false)
                    //  setLoader2()
                    HelperFunctions.showToastMsg(response?.message)
                }
            }).catch(error => {
                setLoader(false)
                //  setLoader2()
                HelperFunctions.showToastMsg(error?.message ?? 'error occurred')


            }).finally(() => {
                setLoader(false)
                //  setLoader2()
            })

        }
    }
    const bookDestinationOld = (tok="") => {
         if (selected == 1 && Email == null ||selected == 1 && Email == undefined ||selected == 1 && Email == "") {
            HelperFunctions.showToastMsg("Please provide email where should invoices be sent!!")
            return
        }
        if (selected == 0 && MyEmail == null ||selected == 0 && MyEmail == undefined ||selected == 0 && MyEmail == "") {
            HelperFunctions.showToastMsg("Please provide email where should invoices be sent!!")
            return
        }
         if (openP && Phone == null ||openP && Phone == undefined ||openP && Phone == "") {
            HelperFunctions.showToastMsg("Please provide Phone number!!")
            return
        }
        setLoader(true)
        let data = {
            "propertySlug": details?.slug,
            "startdate": moment(checkin).format('YYYY-MM-DD'),
            "enddate": moment(checkout).format('YYYY-MM-DD'),
            "adult": adult,
            "children": child,
            "infants": infant,
            "pets": pet,
            "card_id": SaveCardDetails.id,
            "currency": currencyDetails.id,
            "token": tok,
            "save_card": SaveCard,
            "mobile":Phone,
            "email":Email
        }
        console.log('data', data)

        postApi("api/propertybooking", data, token).then(response => {
            console.log('response', response)
            if (response?.status) {
                //   storeToLocalAndRedux(response)
                setLoader(false)
                HelperFunctions.showToastMsg(response?.message)
                NavigationService.navigate('BottomTabNavigation')
            } else {
                setLoader(false)
                //  setLoader2()
                HelperFunctions.showToastMsg(response?.message)
            }
        }).catch(error => {
            setLoader(false)
            //  setLoader2()
            HelperFunctions.showToastMsg(error?.message ?? 'error occurred')


        }).finally(() => {
            setLoader(false)
            //  setLoader2()
        })

    }

    const removecard = (idddd) => {
        setLoader(true)
        let data = {
            "card_id": idddd
        }
        console.log('data', data)

        postApi("api/cardremove", data, token).then(response => {
            console.log('response', response)
            if (response?.status) {
                //   storeToLocalAndRedux(response)
                setLoader(false)
                HelperFunctions.showToastMsg(response?.message)
                getCardList()
            } else {
                setLoader(false)
                //  setLoader2()
                HelperFunctions.showToastMsg(response?.message)
            }
        }).catch(error => {
            setLoader(false)
            //  setLoader2()
            HelperFunctions.showToastMsg(error?.message ?? 'error occurred')


        }).finally(() => {
            setLoader(false)
            //  setLoader2()
        })

    }
    const paymentFunc = async () => {
        if (cardInfo) {
            setLoader(true)
            try {
                const resToken = await createToken({ ...cardInfo, type: 'Card' })
                console.log("restoken", resToken, { ...cardInfo, type: 'Card' })
                setLoader(false)
                bookDestination(resToken.token.id)
            } catch (error) {
                Alert.alert('Error raise during creating token')
                setLoader(false)
                console.log("restoken", { ...cardInfo, type: 'Card' })
            }
        } else {
            HelperFunctions.showToastMsg("Please complete card details")

        }
    }
    // useEffect(() => {
    //     initStripe({
    //       publishableKey: publishableKey,
    //       merchantIdentifier: 'merchant.identifier',
    //       urlScheme: 'your-url-scheme',
    //     });
    //   }, []);
    useEffect(() => {
        getCardList()
    }, [])
    return (
        <ScreenLayout
            headerStyle={{ backgroundColor: '#FFF' }}
            // showLoading={Loading}
            //   isScrollable={true}
            leftHeading={'Payment'}
            viewStyle={{ backgroundColor: '#F9F6F6' }}
            hideLeftIcon={customProp ? false : true}
            onLeftIconPress={() => NavigationService.back()}
        >
            {console.log('moment(checkin).form', selected  )}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}>

                <View style={{
                    height: height / 7.5, width: width,
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
                            <Text style={{ fontSize: 12, fontFamily: Theme.FontFamily.bold, color: '#000', marginLeft: 2 }}>{parseFloat(details?.average_rating).toFixed(1)}</Text>
                        </View>
                        <Text numberOfLines={1} style={{ fontSize: 19, fontFamily: Theme.FontFamily.normal, color: '#000' }}>{details?.title}</Text>
                        <Text numberOfLines={2} style={{ fontSize: 13, fontFamily: Theme.FontFamily.normal, color: '#000' }}>{details?.description}</Text>
                    </View>
                </View>
                <View style={{
                    // height:222,
                    backgroundColor: '#fff',
                    // alignItems: 'center',
                    padding: 25,
                    marginTop: 10,
                    justifyContent: 'center',

                    // alignItems: 'center',
                }}>
                   
                    <Text style={{ fontSize: 20, fontFamily: Theme.FontFamily.normal, color: '#000' }}>Price Details</Text>
                    <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000', marginTop: 5, marginBottom: 0 }}>Check your billing sumary</Text>
                  {PriceBreak?.length>0 ?
                    <Accordion
                        title="Show price breakdown"
                        titleStyle={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, }}
                        containerStyle={{
                            color: '#fff',
                            backgroundColor: '#fff',
                            paddingBottom: -10,
                            borderRadius: 10,
                            paddingHorizontal: 0,
                            borderBottomWidth:0.5,borderColor:'#DFDFDF',
                            // elevation: 1,
                            // shadowOffset:0,
                            // marginTop:-10,
                            marginHorizontal:-15,
                            // height:50,
                        }}
                        // leftIcon={{
                        //     name: 'account-circle',
                        //     type: 'MaterialCommunityIcon',
                        //     size: 25,
                        //     color: '#BEBEBE',
                        //     // marginVertical:10
                        //     // style:{borderRadius:30}
                        // }}
                        openIcon={{
                            name: 'upcircleo',
                            type: 'AntDesign',
                            size: 20,
                            color: '#BEBEBE',
                        }}
                        closeIcon={{
                            name: 'downcircleo',
                            type: 'AntDesign',
                            size: 20,
                            color: '#BEBEBE',
                        }}
                        shadow={false}>

                        <View
                            style={{
                                width: '100%',
                                // height: 230,
                                elevation:3,
                                ...Platform.select({
                                    ios: {
                                      shadowColor: 'black',
                                      shadowOffset: { width: 0, height: 0 },
                                      shadowOpacity: 0.1,
                                      shadowRadius: 5,
                                    },
                                    // android: {
                                    //   elevation: 1.5,
                                    //   backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    //   // paddingTop:10
                                    // },
                                  }),
                                backgroundColor: '#fff',

                                borderBottomRightRadius: 10,
                                borderBottomLeftRadius: 10,

                                borderColor: '#EBEBEB',
                                borderWidth: 0.5,paddingTop:15
                            }}>
                            <FlatList
                            data={PriceBreak}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item, index }) => {
                                return(
                                    <>
                                    <View style={{ paddingHorizontal: 20, paddingTop: 0,marginBottom:15 }}>
                                <View
                                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text
                                        style={{
                                            color: '#000',
                                            fontFamily: Theme.FontFamily.semiBold,
                                            fontSize: Theme.sizes.s14,
                                        }}>
                                        {moment(item?.date).format('MMM Do YYYY')}
                                    </Text>
                                    
                                        <Text
                                            style={{
                                                color: '#000',
                                                fontFamily: Theme.FontFamily.semiBold,
                                                fontSize: Theme.sizes.s14,textAlign:'right',
                                                marginLeft: 5,width:width/4.5
                                            }}>
                                           {details?.currency_symbol} {formatWithCommas(Number(item?.price).toFixed(2))}
                                        </Text>
                                  
                                </View>
                            
                            </View>
                            {/* {index !== PriceBreak.length - 1 &&
                            <View
                                style={{
                                    flex: 1,
                                    height: 1,
                                    backgroundColor: '#DFDFDF',
                                    marginVertical: 5,
                                }}
                            />} */}
                            </>
                                )
                            }}
                            />
                            
                            
                        </View>
                    </Accordion>
                    :null
}
                    <FlatList
                        data={priceDetails}
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ marginTop: 10 }}
                        renderItem={({ item, index }) => {
                            return (
                                <View key={index}>
                                    <View style={{
                                        // height:192,
                                        // backgroundColor: '#fff',
                                        // alignItems: 'center',
                                        // paddingHorizontal:25,
                                        marginTop: 10,
                                        justifyContent: 'space-between',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' }}>{item.itemname}</Text>
                                        <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' }}>
                                        {details?.currency_symbol} {formatWithCommas(Number(item.price).toFixed(2))}</Text>
                                    </View>
                                    {index == priceDetails.length  ? null :
                                        <View
                                            style={{ height: 1.3, width: '100%', backgroundColor: '#DFDFDF', marginVertical: 10 }}
                                        />
                                    }
                                </View>
                            )
                        }}
                    />
                    
                    <View style={{
                        // height:192,
                        backgroundColor: '#fff',
                        // alignItems: 'center',
                        // paddingHorizontal:25,
                        marginTop: 15,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Total ({details?.code})</Text>
                        <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' }}>{details?.currency_symbol}
                         {formatWithCommas(parseFloat(details?.gross_amount.split(',').join('')).toFixed(2))}</Text>
                    </View>
                </View>
                <View style={{
                    // height: 192,
                    backgroundColor: '#fff',
                    // alignItems: 'center',
                    paddingHorizontal: 25,
                    marginTop: 10,
                    justifyContent: 'center',
                    paddingVertical: 20
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
                            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Dates</Text>
                            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000' }}>
                                {moment(checkin).format("MMM D YYYY")} - {moment(checkout).format("MMM D YYYY")}</Text>
                        </View>
                        {/* <Text style={{fontSize:14,fontFamily:Theme.FontFamily.bold,color:'#000',textDecorationLine:'underline'}}>Modify</Text> */}


                    </View>
                    <View
                        style={{ height: 1.3, width: '100%', backgroundColor: '#DFDFDF', marginVertical: 20 }}
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
                            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Guest</Text>
                            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' }}>{guestNo} guest</Text>
                        </View>
                        {/* <Text style={{fontSize:14,fontFamily:Theme.FontFamily.bold,color:'#000',textDecorationLine:'underline'}}>Modify</Text> */}


                    </View>
                </View>
                <View style={{
                    // height:222,
                    backgroundColor: '#fff',
                    // alignItems: 'center',
                    padding: 25,
                    marginTop: 10,
                    justifyContent: 'center',

                    // alignItems: 'center',
                }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 20, fontFamily: Theme.FontFamily.normal, color: '#000' }}>Payment</Text>
                            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000', marginTop: 5, marginBottom: 0 }}>Select payment method.</Text>
                        </View>
                        <Pressable onPress={() => {
                            setOpen(!open)
                            // feepayment()
                        }} style={{ height: 46, width: 60, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#DFDFDF' }}>
                            <PlusIcon />
                        </Pressable>
                    </View>

                    <FlatList
                        data={cardList}
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ marginTop: open ? 0 : 15, paddingBottom: 10 }}
                        renderItem={({ item, index }) => {
                            return (
                                <View key={index}
                                    style={{
                                        height: 140,
                                        width: '100%',
                                        backgroundColor: check == index ? '#FFF3F3' : '#fff',
                                        borderWidth: 1, borderColor: '#DFDFDF',
                                        borderRadius: 10, marginTop: 10,
                                        flexDirection: 'row',
                                        // justifyContent:'space-between',
                                        padding: 20
                                    }}
                                >

                                    <View style={{ backgroundColor: check == index ? '#fff' : '#FFF3F3', padding: 5, height: 40, width: 70, borderRadius: 10 }}>
                                        <Image
                                            source={item.brand == "Visa" ? require('../../assets/images/visa.png') :
                                                item?.brand == "Mastercard" ? require('../../assets/images/mastercard.png') :
                                                    require('../../assets/images/debit_card.webp')
                                            }
                                            resizeMode='contain'
                                            style={{ height: 30, width: 60 }}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginLeft: 16 }}>
                                        <View >
                                            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Card ending with ...{item?.number}</Text>
                                            <Text style={{ fontSize: 13, fontFamily: Theme.FontFamily.bold, color: '#9AA1AB' }}>Expirey {item?.exp_month}/{item?.exp_year}</Text>
                                            <Text style={{ fontSize: 13, fontFamily: Theme.FontFamily.normal, color: '#000', marginTop: 40 }}>Set as default{"  "}
                                                {check == index ? <Text
                                                    onPress={() => {
                                                        removecard(item?.id)
                                                    }}
                                                    style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: Theme.colors.red, textDecorationLine: 'underline' }}>Delete</Text>
                                                    : null}
                                            </Text>

                                        </View>
                                        <Pressable
                                            onPress={() => {
                                                setCheck(index)
                                                setSaveCardDetails(item)
                                                setOpen(false)
                                                setSaveCard('no')
                                                setCheckCard(false)
                                            }}
                                            style={{
                                                height: 24, width: 24, borderRadius: 24,
                                                backgroundColor: check == index ? '#000' : '#fff',
                                                borderColor: '#EFE8E8',
                                                borderWidth: check == index ? 0 : 1.3,
                                                alignItems: 'center', justifyContent: 'center'
                                            }}>
                                            {check == index ?
                                                <Icon name="check" type='Feather' color="#fff" size={17} /> : null
                                            }

                                        </Pressable>

                                    </View>
                                </View>
                            )
                        }}
                    />
                    <Pressable
                        onPress={() => {
                            setOpen(!open)
                           
                            setCheck('a')
                            setSaveCardDetails({})
                        }}
                        style={{
                            // height:192,
                            backgroundColor: '#fff',
                            // alignItems: 'center',
                            // paddingHorizontal:25,
                            marginTop: 15, marginBottom: 10,
                            // justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Icon name="plus" type='Entypo' color="#E15454" size={16} />
                        <Text

                            style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#E15454', marginLeft: 5, marginBottom: 0 }}>
                            Add new card</Text>
                    </Pressable>
                    {open ?
                        <StripeProvider
                            publishableKey={publishableKey}
                            merchantIdentifier="merchant.identifier"
                        >
                            <FloatingLabelTextInput
                                label="Card Holders Name"
                                value={name}
                                onChangeText={setname}
                            />
                            <CardPaymentComp
                                // func={(val)=>setLoader(val)} 
                                getCard={(val) => setCardinfo(val)}
                            // func3={(val) => setPaymentToken(val)} 
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 20, marginLeft: 5 }}>
                                <CheckBox
                                    checked={checkCard}
                                    onChange={(val) => {
                                        if (val == true) {
                                            setSaveCard('yes')
                                        } else {
                                            setSaveCard('no')
                                        }
                                        setCheckCard(val)
                                    }}
                                    size={20}
                                />
                                <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: Theme.colors.secondary, marginLeft: 12 }}>
                                    Save this card for future payments</Text>
                            </View>
                        </StripeProvider>
                        : null
                    }
                </View>
                <View style={{
                    height: 250,
                    backgroundColor: '#fff',
                    // alignItems: 'center',
                    padding: 25,
                    marginTop: 10,
                    justifyContent: 'center',

                    // alignItems: 'center',
                }}>
                    <Text style={{ fontSize: 20, fontFamily: Theme.FontFamily.normal, color: '#000' }}>Contact Email</Text>
                    <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000', marginTop: 5, marginBottom: 0 }}>Where should invoices be sent?</Text>

                    <View style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                    }}>
                        <RadioButton
                            selected={selected == 0}
                            onChange={(val) => setSelected(0)}
                            activeColor={'#E15454'}
                            inactiveColor={'#EFE8E8'}
                            size={25}
                        />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000', marginTop: 0, marginBottom: 0 }}>Send to my email</Text>
                            <Text style={{ fontSize: 13, fontFamily: Theme.FontFamily.normal, color: '#9AA1AB', marginTop: 1, marginBottom: 0 }}>{MyEmail}</Text>

                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                    }}>
                        <RadioButton
                            selected={selected == 1}
                            onChange={(val) => setSelected(1)}
                            activeColor={'#E15454'}
                            inactiveColor={'#EFE8E8'}
                            size={25}
                        />
                        <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000', marginTop: 0, marginBottom: 0 }}>Send to an alternative email</Text>
                        {selected == 1 ?  
                        <FloatingLabelTextInput
                                label="Enter Email Id"
                                value={Email}
                                onChangeText={setEmail}
                            /> : 
                            <Text style={{ fontSize: 13, fontFamily: Theme.FontFamily.normal, color: '#9AA1AB', marginTop: 1, marginBottom: 0 }}>Where should invoices be sent?</Text>
                     }
                           
                            

                        </View>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  backgroundColor: '#fff', padding: 20, marginTop: 10 }}>
                    <View style={{ width: '70%' }}>
                        <Text style={{ fontSize: 20, fontFamily: Theme.FontFamily.normal, color: '#000' }}>Phone Number</Text>
                        
                     {openP ?  
                        <FloatingLabelTextInput
                                label="Enter Phone Number"
                                value={Phone}
                                onChangeText={setPhone}
                            /> : <Text style={{ fontSize: 13, fontFamily: Theme.FontFamily.normal, color: '#000', marginTop: 5, marginBottom: 0 }}>Add your phone number to get trip updates.</Text>
                     }
                    </View>
                    <Pressable 
                    onPress={() => setOpenP(!openP)}
                    style={{ height: 46, width: 60, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#DFDFDF' }}>
                        <PlusIcon />
                    </Pressable>
                </View>
                <View style={{ backgroundColor: '#fff', padding: 25, marginTop: 10 }}>
                    <View style={{ width: '95%' }}>
                        <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Cancellation Policy</Text>
                        <Text style={{ fontSize: 13, fontFamily: Theme.FontFamily.normal, color: '#000', marginTop: 5, marginBottom: 0 }}>
                            Free cancellation for 48 hours. Cancel before 21st Jan to get partial refund.</Text>
                    </View>

                </View>
                <View style={{ backgroundColor: '#fff', padding: 25, marginTop: 10 }}>
                    <View style={{ width: '95%' }}>
                        <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Rules & regulations</Text>
                        <Text style={{ fontSize: 13, fontFamily: Theme.FontFamily.normal, color: '#000', marginTop: 5, marginBottom: 0 }}>
                            We ask every guest to remember a few simple things that make a great guest.{'\n'}
                            - Follow the house rules.{'\n'}
                            - Treat your Host's home like your own.</Text>
                    </View>

                </View>
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
                        shadowOpacity: 0.4,
                        shadowRadius: 4,
                    },

                }),
            }}>
                <View style={{}}>
                    <Text style={{ fontSize: 20, fontFamily: Theme.FontFamily.bold, color: '#000' }}>$ {details?.average_price}
                        <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000' }}>/night</Text>
                    </Text>
                    <Text style={{
                        fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000', textDecorationLine: 'underline',
                        marginTop: 1
                    }}>{moment(checkin).format("MMMM Do")} - {moment(checkout).format("MMMM Do")}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        // setModalState(true)
                        if (open) {
                            paymentFunc()
                        }
                        else if (check != 'a') {
                            bookDestinationOld()
                        }
                        else {
                            HelperFunctions.showToastMsg('Please choose any payment method')
                        }
                    }}
                    style={{
                        backgroundColor: '#E15454',
                        height: 50,
                        paddingHorizontal: 15,
                        //  width:120,
                        borderRadius: 5, alignItems: 'center', justifyContent: 'center',
                        flexDirection: 'row'
                    }}>
                    <LockIcon />
                    <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#fff', marginLeft: 5 }}>Pay Now</Text>
                </TouchableOpacity>
            </View>
            <ReactNativeModal
                isVisible={ModalState}
                // backdropColor={'rgba(228, 14, 104, 1)'}
                backdropOpacity={0.6}
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
                        height: height / 2.8,
                        backgroundColor: '#fff',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        // overflow:'visible',
                        // alignItems: 'center',
                        padding: 25,
                        // paddingHorizontal:25
                        // justifyContent:'center',
                        // paddingHorizontal: 10,
                    }}>
                    <View style={{
                        // height:222,
                        backgroundColor: '#fff',
                        // alignItems: 'center'
                        // alignItems: 'center',
                    }}>
                        <Text style={{ fontSize: 20, fontFamily: Theme.FontFamily.normal, color: '#000' }}>Choose Payment Method</Text>
                        {/* <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000', marginTop: 5, marginBottom: 0 }}>Check your billing sumary</Text> */}


                        <FlatList
                            data={PaymentDetails}
                            keyExtractor={(item, index) => index}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ marginTop: 20, paddingBottom: 20 }}
                            renderItem={({ item, index }) => {
                                return (
                                    <View key={index}>
                                        <View style={{
                                            // height:192,
                                            backgroundColor: '#fff',
                                            // alignItems: 'center',
                                            // paddingHorizontal:25,
                                            marginTop: 2,
                                            // justifyContent: 'space-between',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            {/* <View style={{ backgroundColor:  '#fff', padding: 5, height: 35, width: 46, borderRadius: 10 }}> */}
                                            <Image
                                                source={item.Img}
                                                resizeMode='contain'
                                                style={{ height: 25, width: 36 }}
                                            />
                                            {/* </View> */}
                                            <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000', marginLeft: 10 }}>{item.title}</Text>
                                        </View>
                                        {index == PaymentDetails.length - 1 ? <View
                                            style={{ height: 0.01, width: '100%', backgroundColor: '#DFDFDF', marginVertical: 15 }}
                                        /> :
                                            <View
                                                style={{ height: 1.3, width: '100%', backgroundColor: '#DFDFDF', marginVertical: 15 }}
                                            />
                                        }
                                    </View>
                                )
                            }}
                        />

                    </View>
                </View>
            </ReactNativeModal>
            <ReactNativeModal
                isVisible={CardModalState}
                // backdropColor={'rgba(228, 14, 104, 1)'}
                backdropOpacity={0.6}
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
                    setCardModalState(false)
                }
                }
                onBackdropPress={() => {
                    //   setPlay(false)
                    setCardModalState(false)
                }}>
                <View
                    style={{
                        width: width,
                        height: height / 2.5,
                        backgroundColor: '#fff',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        // overflow:'visible',
                        // alignItems: 'center',
                        padding: 25,
                        // paddingHorizontal:25
                        // justifyContent:'center',
                        // paddingHorizontal: 10,
                    }}>
                    <View style={{
                        // height:222,
                        backgroundColor: '#fff',
                        // alignItems: 'center'
                        // alignItems: 'center',
                    }}>
                        <Text style={{ fontSize: 20, fontFamily: Theme.FontFamily.normal, color: '#000' }}>Add Card</Text>
                        {/* <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, color: '#000', marginTop: 5, marginBottom: 0 }}>Check your billing sumary</Text> */}

                        <AppTextInput
                            value={CardNo}
                            onChangeText={a => setCardNo(a)}
                            placeholder="Card number"
                            placeholderTextColor={'#747A82'}
                            inputStyle={{ fontSize: 14 }}
                            titleStyle={{
                                fontFamily: Theme.FontFamily.normal,
                                fontSize: Theme.sizes.s14,
                            }}
                            mainContainerStyle={
                                {
                                    //   marginHorizontal:20
                                }
                            }
                            // leftIcon={{
                            //     name: 'search',
                            //     type: 'Feather',
                            //     color: '#000',
                            //     size: 18,
                            // }}
                            inputContainerStyle={{
                                paddingHorizontal: 10,
                                height: 48,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#F9F6F6',
                                borderWidth: 0.5,
                                width: width - 50,
                                borderColor: '#DFDFDF',
                                // borderWidth: 0.7,
                                alignSelf: 'center',
                                marginTop: 15, borderRadius: 5
                            }}
                            style={styles.text_style}
                        />
                        <View style={{ flexDirection: 'row', }}>
                            <AppTextInput
                                value={CardNo}
                                onChangeText={a => setCardNo(a)}
                                placeholder="Expire date"
                                placeholderTextColor={'#747A82'}
                                inputStyle={{ fontSize: 14 }}
                                titleStyle={{
                                    fontFamily: Theme.FontFamily.normal,
                                    fontSize: Theme.sizes.s14,
                                }}
                                mainContainerStyle={
                                    {
                                        //   marginHorizontal:20
                                    }
                                }
                                // leftIcon={{
                                //     name: 'search',
                                //     type: 'Feather',
                                //     color: '#000',
                                //     size: 18,
                                // }}
                                inputContainerStyle={{
                                    paddingHorizontal: 10,
                                    height: 48,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#F9F6F6',
                                    borderWidth: 0.5,
                                    width: width / 2,
                                    borderColor: '#DFDFDF',
                                    // borderWidth: 0.7,
                                    alignSelf: 'center',
                                    marginTop: 15, borderRadius: 5
                                }}
                                style={styles.text_style}
                            />
                            <AppTextInput
                                value={CardNo}
                                onChangeText={a => setCardNo(a)}
                                placeholder="CVV"
                                placeholderTextColor={'#747A82'}
                                inputStyle={{ fontSize: 14 }}
                                titleStyle={{
                                    fontFamily: Theme.FontFamily.normal,
                                    fontSize: Theme.sizes.s14,
                                }}
                                mainContainerStyle={
                                    {
                                        //   marginHorizontal:20
                                    }
                                }
                                // leftIcon={{
                                //     name: 'search',
                                //     type: 'Feather',
                                //     color: '#000',
                                //     size: 18,
                                // }}
                                inputContainerStyle={{
                                    paddingHorizontal: 10,
                                    height: 48,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#F9F6F6',
                                    borderWidth: 0.5,
                                    width: width / 3,
                                    borderColor: '#DFDFDF',
                                    // borderWidth: 0.7,
                                    alignSelf: 'center',
                                    marginTop: 15, borderRadius: 5, marginLeft: 15
                                }}
                                style={styles.text_style}
                            />
                        </View>

                        <AppTextInput
                            value={CardNo}
                            onChangeText={a => setCardNo(a)}
                            placeholder="Cardholder name"
                            placeholderTextColor={'#747A82'}
                            inputStyle={{ fontSize: 14 }}
                            titleStyle={{
                                fontFamily: Theme.FontFamily.normal,
                                fontSize: Theme.sizes.s14,
                            }}
                            mainContainerStyle={
                                {
                                    //   marginHorizontal:20
                                }
                            }
                            // leftIcon={{
                            //     name: 'search',
                            //     type: 'Feather',
                            //     color: '#000',
                            //     size: 18,
                            // }}
                            inputContainerStyle={{
                                paddingHorizontal: 10,
                                height: 48,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#F9F6F6',
                                borderWidth: 0.5,
                                width: width - 50,
                                borderColor: '#DFDFDF',
                                // borderWidth: 0.7,
                                alignSelf: 'center',
                                marginTop: 15, borderRadius: 5
                            }}
                            style={styles.text_style}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20, marginLeft: 4, }}>
                            <Pressable style={{ height: 48, width: 110, borderRadius: 5, backgroundColor: '#fff', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#000' }}>Cancel</Text>

                            </Pressable>
                            <Pressable
                                onPress={() => setCardModalState(false)}
                                style={{ height: 48, width: 110, borderRadius: 5, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.bold, color: '#fff' }}>Add</Text>

                            </Pressable>
                        </View>
                    </View>
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

export default PaymentPage

const styles = StyleSheet.create({
    text_style: {
        fontFamily: Theme.FontFamily.normal,
        width: '100%',
        fontSize: 14,
        color: '#000',
    },
})