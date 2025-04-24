import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import {useLanguage} from './LanguageContext';
import Ionicons from 'react-native-vector-icons/FontAwesome5';

const PhoneVerificationScreen = ({route, navigation}) => {
  const {language, email, password} = route.params;
  const [phoneNumber, setPhoneNumber] = useState('');
  const {texts} = useLanguage();

  {/*---------------------- format PhoneNumber th +66 ----------------------------*/}
  const formatPhoneNumber = input => {
    const cleaned = input.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('0')) {
      return '+66' + cleaned.slice(1);
    }
    return cleaned;
  };

  const sendOtp = async () => {
    if (phoneNumber == '' || phoneNumber.length != 10) {
      Alert.alert('Error',language === 'th' ? texts.enterphone : texts.enterphone,);
      return;
    } else {
        const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
        if (phoneNumber === '' || phoneNumber.length !== 10) {
          Alert.alert('Error',language === 'th' ? texts.enterphone : texts.enterphone,);
          return;
        } else {
          try {
            /*---------------------- randdom number otp ----------------------------*/
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
            Alert.alert('OTP Sent', 'Please check your phone for the OTP');
            navigation.navigate('OtpVerificationScreen', {email,password,generatedOtp,phoneNumber,language});
          } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to send OTP');
          }
        }
    }
  };

  return (
    <View style={styles.container}>
      {/*---------------------------icon title----------------------------*/}
      <Ionicons
        name="mobile-alt"
        size={80}
        color="#196f3d"
        Regular
        marginBottom={40}
      />
      {/*---------------------------text title----------------------------*/}
      <View style={styles.viewtitle}>
        <Text style={styles.texttitle}>
          {language === 'th' ? texts.textsendotp : texts.textsendotp}
        </Text>
      </View>

      {/*-----------------Text input PhoneNumber----------------------------*/}
      <TextInput
        style={styles.textinput}
        placeholder={language === 'th' ? texts.phonenumber : texts.phonenumber}
        placeholderTextColor="#999"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      {/*-----------------button Send OTP----------------------------*/}
      <TouchableOpacity style={styles.button} onPress={sendOtp}>
        <Text style={styles.buttonText}>
          {language === 'th' ? texts.requestotp : texts.requestotp}
        </Text>
      </TouchableOpacity>
      {/*---------------------------text not have account----------------------------*/}
      <View style={styles.callphoneview}>
        <Text style={styles.callphonetext}>
          {language === 'th' ? texts.callphone : texts.callphone}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput: {
    height: 40,
    width: Dimensions.get('window').width - 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    color: '#000000',
  },
  button: {
    backgroundColor: '#196f3d',
    padding: 15,
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 10,
    width: Dimensions.get('window').width - 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  viewtitle: {
    marginTop: 20,
    marginBottom: 10,
  },
  texttitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  callphoneview: {
    marginTop: 13,
    marginBottom: 10,
  },
  callphonetext: {
    fontSize: 11,
    color: '#999',
  },
});

export default PhoneVerificationScreen;
