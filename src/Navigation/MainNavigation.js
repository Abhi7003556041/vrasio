import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SplashScreen } from '../Screens';


import HomePage from '../Screens/Home/HomePage';
import BottomTabNavigation from './BottomTabNavigation';
import FavouriteIndex from '../Screens/Favourites/FavouriteIndex';
import MessageIndex from '../Screens/Messages/MessageIndex';
import NotificationIndex from '../Screens/Notifications/NotificationIndex';
import FavouriteDetails from '../Screens/Favourites/FavouriteDetails';
import ConfirmDetails from '../Screens/Favourites/ConfirmDetails';
import PaymentPage from '../Screens/Favourites/PaymentPage';
import MenuIndex from '../Screens/Mennu/MenuIndex';
import MyReservation from '../Screens/Reservation/MyReservation';
import ReservationCard from '../Screens/Reservation/ReservationCard';
import ReservationDetails from '../Screens/Reservation/ReservationDetails';
import MyProfile from '../Screens/Profile/MyProfile';
import ChatPage from '../Screens/Messages/ChatPage';
import ForgotPass from '../Screens/Auth/ForgotPass';
import ResetPass from '../Screens/Auth/ResetPass';
import OtpInputPage from '../Screens/Auth/OtpInputPage';
import SignUp from '../Screens/Auth/SignUp';
import Login from '../Screens/Auth/Login';
import EditProfile from '../Screens/Profile/EditProfile';
import UpdatePassword from '../Screens/Profile/UpdatePassword';
import CurrencyIndex from '../Screens/Currency/CurrencyIndex';
import LanguageIndex from '../Screens/Languages/LanguageIndex';
import BecomeHost from '../Screens/Host/BecomeHost';
import ReviewRatingsScreen from '../Screens/Reservation/ReviewRatings';
import BecomeHostNew from '../Screens/Host/BecfomeHostNew';
import TransactionList from '../Screens/Favourites/TransactionList';
import TransactionDetails from '../Screens/Favourites/TransactionDetails';


const Stack = createNativeStackNavigator();

function MainNavigation() {
  return (
    <Stack.Navigator initialRouteName='BottomTabNavigation' screenOptions={{ animation: 'none' }}>
  <Stack.Screen 
  name="BottomTabNavigation" 
  options={{headerShown: false}}
  component={BottomTabNavigation} />


<Stack.Screen
  name="HomePage"
  options={{headerShown: false}}
  component={HomePage}
/>
<Stack.Screen
  name="FavouriteIndex"
  options={{headerShown: false}}
  component={FavouriteIndex}
/>
 
<Stack.Screen
  name="MessageIndex"
  options={{headerShown: false}}
  component={MessageIndex}
/>

<Stack.Screen
  name="NotificationIndex"
  options={{headerShown: false}}
  component={NotificationIndex}
/>
<Stack.Screen
  name="MenuIndex"
  options={{headerShown: false}}
  component={MenuIndex}
/>


<Stack.Screen
  name="FavouriteDetails"
  options={{headerShown: false}}
  component={FavouriteDetails}
/>
<Stack.Screen
  name="ConfirmDetails"
  options={{headerShown: false}}
  component={ConfirmDetails}
/>

<Stack.Screen
  name="PaymentPage"
  options={{headerShown: false}}
  component={PaymentPage}
/>
<Stack.Screen
  name="MyReservation"
  options={{headerShown: false}}
  component={MyReservation}
/>

<Stack.Screen
  name="ReservationCard"
  options={{headerShown: false}}
  component={ReservationCard}
/>
<Stack.Screen
  name="ReservationDetails"
  options={{headerShown: false}}
  component={ReservationDetails}
/>
<Stack.Screen
  name="MyProfile"
  options={{headerShown: false}}
  component={MyProfile}
/>
<Stack.Screen
  name="ChatPage"
  options={{headerShown: false}}
  component={ChatPage}
/>
<Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login} />
      <Stack.Screen
        name="SignUp"
        options={{ headerShown: false }}
        component={SignUp} />

      <Stack.Screen
        name="OtpInputPage"
        options={{ headerShown: false }}
        component={OtpInputPage} />
        <Stack.Screen
  name="ForgotPass"
  options={{headerShown: false}}
  component={ForgotPass}
/>
<Stack.Screen
  name="ResetPass"
  options={{headerShown: false}}
  component={ResetPass}
/>
<Stack.Screen
  name="EditProfile"
  options={{headerShown: false}}
  component={EditProfile}
/>
<Stack.Screen
  name="UpdatePassword"
  options={{headerShown: false}}
  component={UpdatePassword}
/>
<Stack.Screen
  name="CurrencyIndex"
  options={{headerShown: false}}
  component={CurrencyIndex}
/>
<Stack.Screen
  name="LanguageIndex"
  options={{headerShown: false}}
  component={LanguageIndex}
/>
<Stack.Screen
  name="BecomeHost"
  options={{headerShown: false}}
  component={BecomeHost}
/>
<Stack.Screen
  name="BecomeHostNew"
  options={{headerShown: false}}
  component={BecomeHostNew}
/>
<Stack.Screen
  name="ReviewRatingsScreen"
  options={{headerShown: false}}
  component={ReviewRatingsScreen}
/>
<Stack.Screen
  name="TransactionList"
  options={{headerShown: false}}
  component={TransactionList}
/>
<Stack.Screen
  name="TransactionDetails"
  options={{headerShown: false}}
  component={TransactionDetails}
/>
    </Stack.Navigator>
  );
}

export default MainNavigation;
