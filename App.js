import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LanguageProvider } from './Page/LanguageContext';
import HomeScreen from './Page/HomeScreen';
import LoginScreen from './Page/LoginScreen';
import RegisterScreen from './Page/RegisterScreen';
import PhoneVerificationScreen from './Page/PhoneVerificationScreen';
import OtpVerificationScreen from './Page/OtpVerificationScreen';
import PinInputScreen from './Page/PinInputScreen';
import ConfirmPinScreen from './Page/ConfirmPinScreen';
import FingerprintScanScreen from './Page/FingerprintScanScreen';
import ForgotPasswordScreen from './Page/ForgotPasswordScreen';
import ResetSuccessScreen from './Page/ResetSuccessScreen';
import PinLoginScreen from './Page/PinLoginScreen';
import UserScreen from './Page/UserScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="PhoneVerificationScreen" component={PhoneVerificationScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="PinInputScreen" component={PinInputScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ConfirmPinScreen" component={ConfirmPinScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="FingerprintScanScreen" component={FingerprintScanScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ResetSuccessScreen" component={ResetSuccessScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="PinLoginScreen" component={PinLoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="UserScreen" component={UserScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
};

export default App;
