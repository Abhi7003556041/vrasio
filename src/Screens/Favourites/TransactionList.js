import { Dimensions, FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import NavigationService from '../../Services/Navigation'
import Theme from '../../Constants/Theme';
import { useSelector } from 'react-redux';
import HelperFunctions from '../../Constants/HelperFunctions';
import { postApi } from '../../Services/Service';
import NodataFound from '../../Components/NoData/NodataFound';
const { width, height } = Dimensions.get('window');

const TransactionList = (props) => {
  const [transactionlist, setTransactionList] = useState([])
  const [refreshing, setrefreshing] = useState(false);

  const [Loder, setLoader] = useState(false);
  const { login_status, userDetails, token } = useSelector(state => state.authData);
  const {dashboardDetails, currencyDetails,favouriteList } = useSelector(state => state.commonData);
  const fetchTransactionList = () => {
    setLoader(true)
    postApi("api/guest-transaction-list", "", token).then(response => {
      // console.log('getPagewisePlan>>>>>>>>>>',response)
      if (response?.status) {
        console.log('guest-transaction-list;n>>>>>>>>>>', JSON.stringify(response.data.data))
        // HelperFunctions.showToastMsg(response?.message)
        setTransactionList(response.data.data)
        
      } else {
        HelperFunctions.showToastMsg(response?.message)
      } 
      setLoader(false);
      setrefreshing(false);
    }).catch(error => {
      setLoader(false);
      setrefreshing(false);

      HelperFunctions.showToastMsg(error?.message)

    }).finally(() => {
      setLoader(false);
      setrefreshing(false);

    })
  }

  const handleRefresh = () => {
    setrefreshing(true);
    
    fetchTransactionList()
 
   
  };

  useEffect(() => {
    fetchTransactionList()
  }, [])
  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: '#FFF' }}
      showLoading={Loder}
      //   isScrollable={true}
      leftHeading={'Transaction List'}
      viewStyle={{ backgroundColor: '#F9F6F6' }}
      onLeftIconPress={() => NavigationService.back()}
    >
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}> */}
      <View style={{flex:1}}>
        {transactionlist.length>0 ?
        <FlatList
          data={transactionlist}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                // setPage(1)
                handleRefresh();
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 10, paddingBottom: 20 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <Pressable
              onPress={()=>NavigationService.navigate('TransactionDetails',{Id:item?.id})}
                style={{
                  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', marginBottom: 10, borderRadius: 5,
                  padding: 10, borderBottomWidth: 1, borderColor: '#E5E5E5', width: width - 20, alignSelf: 'center',
                  elevation: 3,
                  // borderColor: 'black',
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,

                }}
              >
                <View>
                  <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, fontFamily: Theme.FontFamily.bold,width:width/2.5 }}>{item?.propertydetails?.title}</Text>
                  <Text style={{ color: Theme.colors.secondary, fontSize: 13.5, fontFamily: Theme.FontFamily.bold,marginTop:5 }}>{item?.booking_id}</Text>
                </View>
                <View>
                  <Text style={{ color: 'green', fontSize: 14, fontFamily: Theme.FontFamily.bold, textAlign: 'right' }}>{item?.currency_symbol ?? null} {item?.total_price}</Text>
                  <Text style={{ color: '#aaa', fontSize: 14, fontFamily: Theme.FontFamily.bold, textAlign: 'right',marginTop:5 }}>{new Date(item.created_at).toDateString()}</Text>
                </View>
              </Pressable>
            )
          }}
        /> : <NodataFound/>
}
      </View>
      {/* </ScrollView> */}
    </ScreenLayout>
  )
}

export default TransactionList

const styles = StyleSheet.create({})