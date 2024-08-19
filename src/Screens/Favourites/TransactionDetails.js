import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import NavigationService from '../../Services/Navigation'
import Theme from '../../Constants/Theme';
import { useSelector } from 'react-redux';
import HelperFunctions from '../../Constants/HelperFunctions';
import { postApi } from '../../Services/Service';
const { width, height } = Dimensions.get('window');

const TransactionDetails = (props) => {
  const [TransactionDeatils, setTransactionDeatils] = useState([])
  const [Loder, setLoader] = useState(false);
  const { login_status, userDetails, token } = useSelector(state => state.authData);
  const {dashboardDetails, currencyDetails,favouriteList } = useSelector(state => state.commonData);
  const fetchTransactionDeatils = () => {
    let data={
      "bookingid":props.route.params?.Id
    }
    setLoader(true)
    postApi("api/guest-transaction-details", data, token).then(response => {
      // console.log('getPagewisePlan>>>>>>>>>>',response)
      if (response?.status) {
        console.log('guest-transaction-details;n>>>>>>>>>>', JSON.stringify(response.data))
        // HelperFunctions.showToastMsg(response?.message)
        setTransactionDeatils(response.data)
        
      } else {
        HelperFunctions.showToastMsg(response?.message)
      } 
      setLoader(false);
    }).catch(error => {
      setLoader(false);
      HelperFunctions.showToastMsg(error?.message)

    }).finally(() => {
      setLoader(false);
    })
  }

  useEffect(() => {
    fetchTransactionDeatils()
  }, [])
  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: '#FFF' }}
      showLoading={Loder}
      //   isScrollable={true}
      leftHeading={'Transaction Details'}
      viewStyle={{ backgroundColor: '#F9F6F6' }}
      onLeftIconPress={() => NavigationService.back()}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10,paddingBottom:30  }}>
           {/* <View style={{ overflow: 'hidden' }}>
     <View
       style={{
        flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10,backgroundColor:'#fff', paddingTop:15,
         borderStyle: 'dashed',
         borderTopWidth: 1,
         borderColor: '#aaa',
        //  margin: -2,
         marginTop: 10,
       }}>
        <Text style={{ color: Theme.colors.secondary, fontSize: 14, fontFamily: Theme.FontFamily.bold }}>Booking ID</Text>
      <Text style={{ color: Theme.colors.black, fontSize: 14, fontFamily: Theme.FontFamily.semiBold }}>{TransactionDeatils?.booking_id}</Text>
     </View>
   </View> */}
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10,backgroundColor:'#fff', paddingTop:15,
      borderBottomColor:'gray',}}>
      <Text style={{ color: Theme.colors.secondary, fontSize: 14, fontFamily: Theme.FontFamily.bold }}>Booking ID</Text>
      <Text style={{ color: Theme.colors.black, fontSize: 14, fontFamily: Theme.FontFamily.semiBold, }}>{TransactionDeatils?.booking_id}</Text>
        
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10,backgroundColor:'#fff'}}>
      <Text style={{ color: Theme.colors.secondary, fontSize: 14, fontFamily: Theme.FontFamily.bold }}>Transaction ID</Text>
      <Text style={{ color: Theme.colors.black, fontSize: 14, fontFamily: Theme.FontFamily.semiBold }}>{TransactionDeatils?.transaction_id}</Text>
        
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10,backgroundColor:'#fff'}}>
      <Text style={{ color: Theme.colors.secondary, fontSize: 14, fontFamily: Theme.FontFamily.bold }}>Property Name</Text>
      <Text style={{ color: Theme.colors.black, fontSize: 14, fontFamily: Theme.FontFamily.semiBold }}>{TransactionDeatils?.propertydetails?.title}</Text>
        
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10,backgroundColor:'#fff'}}>
      <Text style={{ color: Theme.colors.secondary, fontSize: 14, fontFamily: Theme.FontFamily.bold }}>Total Amount</Text>
      <Text style={{ color: Theme.colors.black, fontSize: 14, fontFamily: Theme.FontFamily.semiBold }}>{TransactionDeatils?.currency_symbol ?? null}{TransactionDeatils?.total_price ?Number(TransactionDeatils?.total_price).toFixed(2) : null}</Text>
        
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10,backgroundColor:'#fff'}}>
      <Text style={{ color: Theme.colors.secondary, fontSize: 14, fontFamily: Theme.FontFamily.bold }}>Total Tax Amount</Text>
      <Text style={{ color: Theme.colors.black, fontSize: 14, fontFamily: Theme.FontFamily.semiBold }}>{TransactionDeatils?.total_tax}</Text>
        
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10,backgroundColor:'#fff'}}>
      <Text style={{ color: Theme.colors.secondary, fontSize: 14, fontFamily: Theme.FontFamily.bold }}>Created At</Text>
      <Text style={{ color: Theme.colors.black, fontSize: 14, fontFamily: Theme.FontFamily.semiBold }}>{TransactionDeatils?.created_at ? new Date(TransactionDeatils?.created_at).toDateString() : null}</Text>
        
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10,backgroundColor:'#fff',paddingBottom:15}}>
      <Text style={{ color: Theme.colors.secondary, fontSize: 14, fontFamily: Theme.FontFamily.bold }}>Status</Text>
      <Text style={{ color: Theme.colors.black, fontSize: 14, fontFamily: Theme.FontFamily.semiBold }}>{TransactionDeatils?.payment_status}</Text>
        
      </View>
      </ScrollView>
    </ScreenLayout>
  )
}

export default TransactionDetails

const styles = StyleSheet.create({})