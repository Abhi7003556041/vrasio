import { CardField, createToken, useStripe,useConfirmPayment } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Pressable, Text, TouchableOpacity, View } from 'react-native';
import Theme from '../../Constants/Theme';
import HelperFunctions from '../../Constants/HelperFunctions';
import { postApi } from '../../Services/Service';
import { useSelector } from 'react-redux';
import { CheckBox } from 'react-native-basic-elements';
import FloatingLabelTextInput from '../EditTextComponent/FloatingLabelTextInput';

const { width, height } = Dimensions.get('window');

function CardPaymentComp(props) {
  // const { confirmPayment } = useStripe();
  const {confirmPayment, loading} = useConfirmPayment();
  // const [cardInfo, props.getCard] = useState()
  // const [name,setname] = useState('')
  const [foucus,setFocus] = useState(false)
  const { login_status, userDetails,token  } = useSelector(state => state.authData);
 
  // const [Loder, setLoader] = useState(false);
  const AddCard = (tok) => {
    if (cardInfo == null || cardInfo == undefined ) {
         HelperFunctions.showToastMsg("Please fillup card details")
     }
     else if (name == null || name == undefined || name == "") {
      HelperFunctions.showToastMsg("Please provide card holders name")
  }
     else {
        //  setLoader(true)
        console.log('token',tok)
        props.func(true)
         let data = {      
          "token":tok
         }
         postApi("api/cardadd", data, token).then(response => {
             console.log('response',response)
             if (response?.status) {
                 //   storeToLocalAndRedux(response)
                 props.func(false)
                //  props.func2()
                 HelperFunctions.showToastMsg(response?.message)

             } else {
                 props.func(false)
                //  props.func2()
                 HelperFunctions.showToastMsg(response?.message)              
             }
         }).catch(error => {
             props.func(false)
            //  props.func2()
             HelperFunctions.showToastMsg(error?.message)
            

         }).finally(() => {
             props.func(false)
            //  props.func2()
         })

     }
 }
  const paymentFunc = async() => {
        if(cardInfo){
          props.func(true)
          try {
            const resToken = await createToken({...cardInfo, type:'Card'})
            console.log("restoken",resToken,loading)
            // HelperFunctions.showToastMsg("Token generated")
            // AddCard(resToken.token.id)
          } catch (error) {
            Alert.alert('Error raise during creating token')
          }
        }else{
          HelperFunctions.showToastMsg("Please complete details")

        }
  }
  useEffect(() => {
    // console.log('confirmPayment',confirmPayment)
  }, [])
  return (
    <>
    
      {/* <Pressable
       style={{
        marginTop: 10,
        borderColor:foucus ? "#000" : '#aaa',
        borderWidth:foucus ? 1.3 : 1,borderRadius:10,
        width:width-50,
      }}
      > */}
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
          textColor:'#aaa',
        }}
        cardStyle={{
          backgroundColor: '#000000',textColor:'#FFFFFF',
          borderRadius:5,
          borderWidth:2,borderColor:'#000000'
        }}
        style={{             
          width: '100%',
          height: 50,
          marginTop: 10,
          textColor:'#000',backgroundColor:'#FFFFFF',
          borderColor:foucus ? "#000" : '#aaa',borderWidth:foucus ? 1.3 : 1,borderRadius:5
        }}
        onCardChange={(cardDetails) => {
          console.log('cardDetails', cardDetails);
          props.getCard(cardDetails)
        }}
        onBlur={(val)=>{
          // console.log('focusField', val);
          setFocus(false)
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
          setFocus(true)
        }}
      />
      {/* </Pressable> */}
     
      {/* <TouchableOpacity
      onPress={()=>paymentFunc()}
      disabled={!cardInfo}
      style={{
        width: width - 100, height: 50, marginBottom: 20,
        backgroundColor:cardInfo ? Theme.colors.lightRed : Theme.colors.grey, borderRadius: 10,
        alignItems: 'center', justifyContent: 'center', alignSelf: 'center'
      }}>
        <Text style={{ fontSize: 16, fontFamily: Theme.FontFamily.bold, color: '#fff' }}>Add Card</Text>
      </TouchableOpacity> */}
    
    </>
  );
}
export default  React.memo(CardPaymentComp)