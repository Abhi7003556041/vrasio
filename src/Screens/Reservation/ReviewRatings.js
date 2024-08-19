import { Dimensions, Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import { useRoute } from '@react-navigation/native';
import NavigationService from '../../Services/Navigation';
import Theme from '../../Constants/Theme';
import { useSelector } from 'react-redux';
import StarRating from 'react-native-star-rating-widget';
import { AppTextInput } from 'react-native-basic-elements';
import HelperFunctions from '../../Constants/HelperFunctions';
import { postApi } from '../../Services/Service';
const { width, height } = Dimensions.get('window');

const ReviewRatingsScreen = (props) => {
  const route = useRoute();
  const customProp = route.params?.showButton;
  const host_id = props.route.params.host_id
  const slugType = props.route.params.slugType
  const { login_status, userDetails, token, host_status } = useSelector(state => state.authData);
  const [Loder, setLoader] = useState(false)
  const [rating, setRating] = useState("");
  const [ratinghost, setRatinghost] = useState("");
  const [propertyReview, setPropertyReview] = useState("")
  const [HostReview, setHostReview] = useState("")
  const SubmitReview = () => {
    if ( rating == null ||  rating == undefined ||  rating == "") {
      HelperFunctions.showToastMsg("Please give rating")
    }
    else if (propertyReview == null || propertyReview == undefined || propertyReview == "") {
      HelperFunctions.showToastMsg("Please give review on property")
    }
    else if (ratinghost == null || ratinghost == undefined || ratinghost == "") {
      HelperFunctions.showToastMsg("Please give host rating")
    }
    else if (HostReview == null || HostReview == undefined || HostReview == "") {
      HelperFunctions.showToastMsg("Please give review on host")
    } 
    else {
     let data = {
      "propertySlug": slugType,
      "rating":rating,"review":propertyReview
     }
     let dataHost = {
      "host_id":host_id,
      "rating":ratinghost,"review":HostReview
     }
     console.log('dfdfdfdf',data,dataHost)
      setLoader(true)
      
      postApi("api/propertyRating", data, token).then(response => {
        // console.log('response',response)
        if (response?.status) {
          // HelperFunctions.showToastMsg("Request Sent Successfully, Please wait for admin approval")
          // NavigationService.back()
          postApi("api/hostRating", dataHost, token).then(response => {
            // console.log('response',response)
            if (response?.status) {
              HelperFunctions.showToastMsg("Review given successfully")
              NavigationService.back()
              setLoader(false)
    
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
  }
  useEffect(() => {

  }, [])
  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: '#fff' }}
      showLoading={Loder}
      isScrollable={true}
      // Home
      leftHeading={'Write a Review'}
      viewStyle={{ backgroundColor: '#fff', }}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}
    >
      <View style={{ paddingHorizontal: 20 }}>
        {/* <Text style={{ color: Theme.colors.black, fontSize: 22, fontFamily: Theme.FontFamily.bold, textDecorationLine: 'underline', marginVertical: 5, textAlign: 'center' }}>Welcome, {userDetails?.first_name}!</Text> */}

    <View>
        <StarRating
          rating={rating}
          onChange={setRating}
          enableHalfStar
          enableSwiping
          starSize={45}
          style={{ alignSelf: 'center', marginVertical: 15, marginTop: 20 }}
        />
        <Text style={{ fontSize: 16, fontFamily: Theme.FontFamily.bold, marginTop: 5 }}>Review Property</Text>
        <AppTextInput
          value={propertyReview}
          onChangeText={a => setPropertyReview(a)}
          placeholder="Write a review"
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
         multiline
         textAlignVertical='top'
         keyboardType='default'
         numberOfLines={10}
          inputContainerStyle={{
            paddingHorizontal: 10,
            paddingTop:5,
            height: 100,
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#F9F6F6',
            borderWidth: 0.9,
            width: width - 40,
            borderColor: '#DFDFDF',
            // borderWidth: 0.7,
            alignSelf: 'center',
            marginTop: 15, borderRadius: 5
          }}
          style={styles.text_style}
        />
</View>
<View>
        <StarRating
          rating={ratinghost}
          onChange={setRatinghost}
          enableHalfStar
          enableSwiping
          starSize={45}
          style={{ alignSelf: 'center', marginVertical: 15, marginTop: 40 }}
        />
        <Text style={{ fontSize: 16, fontFamily: Theme.FontFamily.bold, marginTop: 5 }}>Review Host</Text>
        <AppTextInput
          value={HostReview}
          onChangeText={a => setHostReview(a)}
          placeholder="Write a review"
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
         multiline
         numberOfLines={10}
          inputContainerStyle={{
            paddingHorizontal: 10,
            paddingTop:5,
            height: 100,
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#F9F6F6',
            borderWidth: 0.9,
            width: width - 40,
            borderColor: '#DFDFDF',
            // borderWidth: 0.7,
            alignSelf: 'center',
            marginTop: 15, borderRadius: 5
          }}
          style={styles.text_style}
        />
        </View>
        <Pressable
          disabled={Loder}
          onPress={() => SubmitReview()}
          style={{
            height: 60, width: width - 40, alignItems: 'center',
            justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginTop: 40,
            backgroundColor: Theme.colors.primary
          }}>
          <Text style={{ fontSize: 17, fontFamily: Theme.FontFamily.bold, color: '#fff' }}>Submit</Text>

        </Pressable>

        {/* <Text style={{ fontSize: 14, fontFamily: Theme.FontFamily.normal, marginTop: 5 }}>Guests can reserve your place 24 hours after you publish – here’s how to prepare.</Text> */}
        {/* <Text onPress={()=>Linking.openURL("https://www.p82v1.updateapplications.com/vrasio/frontend/hosting/overview")}>WelcomeScreen</Text> */}


      </View>
    </ScreenLayout>
  )
}

export default ReviewRatingsScreen

const styles = StyleSheet.create({
  text_style: {
    fontFamily: Theme.FontFamily.normal,
    width: '100%',
    fontSize: 14,
    color: '#000',
  },
})