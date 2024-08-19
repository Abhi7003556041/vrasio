
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../Screens/Host/WelcomeScreen';
import PropertylistScreen from '../Screens/Host/PropertylistScreen';
import MessageIndexScreen from '../Screens/Host/MessageIndexScreen';
import MenuScreen from '../Screens/Host/MenuScreen';
import HostBottomTab from './HostBottomTab';
import MyProfile from '../Screens/Profile/MyProfile';
import PropertyReservation from '../Screens/Host/PropertyReservation';
import EditProfile from '../Screens/Profile/EditProfile';
import UpdatePassword from '../Screens/Profile/UpdatePassword';
import CurrencyIndex from '../Screens/Currency/CurrencyIndex';
import LanguageIndex from '../Screens/Languages/LanguageIndex';
import ChatPage from '../Screens/Messages/ChatPage';
import ReservationDetails from '../Screens/Reservation/ReservationDetails';
import PropertyAddStep1 from '../Screens/HostPropertyAdd/PropertyAddStep1';
import PropertyAddStep2 from '../Screens/HostPropertyAdd/PropertyAddStep2';
import PropertyAddStep3 from '../Screens/HostPropertyAdd/PropertyAddStep3';
import PropertyAddStep4 from '../Screens/HostPropertyAdd/PropertyAddStep4';
import PropertyAddStep5 from '../Screens/HostPropertyAdd/PropertyAddStep5';
import PropertyAddStep45 from '../Screens/HostPropertyAdd/PropertyAddStep4.5';






const Stack = createNativeStackNavigator();

function HostNavigation() {
  return (
    <Stack.Navigator initialRouteName='HostBottomTab' screenOptions={{ animation: 'none' }}>
      <Stack.Screen
        name="HostBottomTab"
        options={{ headerShown: false }}
        component={HostBottomTab} />
      <Stack.Screen
        name="Today"
        options={{ headerShown: false }}
        component={WelcomeScreen} />
      <Stack.Screen
        name="List"
        options={{ headerShown: false }}
        component={PropertylistScreen} />

      <Stack.Screen
        name="Chat"
        options={{ headerShown: false }}
        component={MessageIndexScreen} />
        <Stack.Screen
  name="Menu"
  options={{headerShown: false}}
  component={MenuScreen}
/>
<Stack.Screen
  name="MyProfile"
  options={{headerShown: false}}
  component={MyProfile}
/>
<Stack.Screen
  name="PropertyReservation"
  options={{headerShown: false}}
  component={PropertyReservation}
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
  name="ChatPage"
  options={{headerShown: false}}
  component={ChatPage}
/>
<Stack.Screen
  name="ReservationDetails"
  options={{headerShown: false}}
  component={ReservationDetails}
/>
<Stack.Screen
  name="PropertyAddStep1"
  options={{headerShown: false}}
  component={PropertyAddStep1}
/>
<Stack.Screen
  name="PropertyAddStep2"
  options={{headerShown: false}}
  component={PropertyAddStep2}
/>
<Stack.Screen
  name="PropertyAddStep3"
  options={{headerShown: false}}
  component={PropertyAddStep3}
/>
<Stack.Screen
  name="PropertyAddStep4"
  options={{headerShown: false}}
  component={PropertyAddStep4}
/>
<Stack.Screen
  name="PropertyAddStep45"
  options={{headerShown: false}}
  component={PropertyAddStep45}
/>
<Stack.Screen
  name="PropertyAddStep5"
  options={{headerShown: false}}
  component={PropertyAddStep5}
/>

    </Stack.Navigator>
  );
}

export default HostNavigation;
