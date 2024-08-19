import { Alert, Dimensions, FlatList, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import { useRoute } from '@react-navigation/native';
import { AppTextInput } from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import DoubleTick from '../../assets/icons/DoubleTick';
import EditIcon from '../../assets/icons/EditIcon';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { setData } from '../../Services/LocalStorage';
import { resetAuthData } from '../../Store/Reducers/AuthReducer';
import HelperFunctions from '../../Constants/HelperFunctions';
import { postApi } from '../../Services/Service';
import { setCurrencyDetails, setLanguageDetails } from '../../Store/Reducers/CommonReducer';
const { width, height } = Dimensions.get('window');

const LanguageIndex = (props) => {
    const route = useRoute();
    // Access the customProp passed from the source screen
    const customProp = route.params?.showButton;
    const dispatch = useDispatch()
    const [Loading, changeLoading] = useState(false);

    const { login_status, userDetails, token } = useSelector(state => state.authData);
  const {dashboardDetails, currencyDetails,languageDetails } = useSelector(state => state.commonData);

    const [LanguageList, setLanguageList] = useState([]);
    const [index,setIndex] = useState()
    const getAllLanguage = () => {
      let data = {
        "type":"language"
      }
      changeLoading(true)
      console.log('masterdatalistdata>>', data)
      changeLoading(true)
      postApi("api/masterdatalist", data, token).then(response => {
        // console.log('getAllProperty>>>>>>>>>>', response)
        if (response?.status) {
          console.log('getAllCurrency>>fjkwhsdkfjhskjd>>>>>>>>', JSON.stringify(response.data))
          changeLoading(false)
          setLanguageList(response?.data)
         
          
        } else {
          setLanguageList([])
        }
      }).catch(error => {
        HelperFunctions.showToastMsg(error?.message)
        changeLoading(false)
  
      }).finally(() => {
        changeLoading(false)
  
      })
    }
    // const changeCurrency = (dat) => {
    //   let data = {
    //     "currency_id":dat?.id
    //   }
    //   changeLoading(true)
    //   console.log('change-currency>>', data)
    //   postApi("api/change-currency", data, token).then(response => {
    //     // console.log('getAllProperty>>>>>>>>>>', response)
    //     if (response?.status) {
    //       console.log('change-currency>>fjkwhsdkfjhskjd>>>>>>>>', JSON.stringify(response.data))
    //       changeLoading(false)
    //       selectCurrency(dat)
    //       HelperFunctions.showToastMsg('Selected successfully')
          
    //     } else {
          
    //     }
    //   }).catch(error => {
    //     HelperFunctions.showToastMsg(error?.message)
    //     changeLoading(false)
  
    //   }).finally(() => {
    //     changeLoading(false)
  
    //   })
    // }
  
    const selectLanguage = (data) => {


        setData('language', data)
        dispatch(setLanguageDetails(data))
        NavigationService.back()

    }
   useEffect(()=>{
    getAllLanguage()
   },[])
    return (
        <ScreenLayout
            headerStyle={{ backgroundColor: '#FFF' }}
            showLoading={Loading}
            //   isScrollable={true}
            leftHeading={'Language List'}
            viewStyle={{ backgroundColor: '#fff', paddingHorizontal: 5 }}
            hideLeftIcon={customProp ? false : true}
            onLeftIconPress={() => NavigationService.back()}
        >
          <View style={{flex:1,padding:20}}>
            <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
              {LanguageList.map((res,ind)=>{
                return(
                  <Pressable
                  onPress={()=>{
                    selectLanguage(res)
                    setIndex(ind)
                  }}
                  style={{height:50,width:(width-50)/2.2,borderColor:languageDetails.id == res.id ? Theme.colors.red : '#aaa',
                  borderWidth:languageDetails.id == res.id ? 1.5 : 1,borderRadius:5,alignItems:'center',justifyContent:'center',marginRight:5,marginBottom:20}}>
                    <Text style={{fontFamily:Theme.FontFamily.bold,color:"#000"}}>{res?.title} </Text>
                  </Pressable>
                )
              })}
            </View>
          </View>
         
        </ScreenLayout>
    )
}

export default LanguageIndex

const styles = StyleSheet.create({
    text_style: {
        fontFamily: Theme.FontFamily.normal,
        width: '100%',
        fontSize: 14,
        color: '#000',
    },
})