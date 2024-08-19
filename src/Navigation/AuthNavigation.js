import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Auth/Login';
import SignUp from '../Screens/Auth/SignUp';
import OtpInputPage from '../Screens/Auth/OtpInputPage';
import ForgotPass from '../Screens/Auth/ForgotPass';
import ResetPass from '../Screens/Auth/ResetPass';





const Stack = createNativeStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ animation: 'none' }}>
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
    </Stack.Navigator>
  );
}

export default AuthNavigation;
