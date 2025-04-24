import React, {useState, useEffect} from 'react';
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
//import auth from '@react-native-firebase/auth';

const OtpVerificationScreen = ({route, navigation}) => {
  const {email, password, confirmation, phoneNumber, language} = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [originalOtp, setOriginalOtp] = useState('');
  const [counter, setCounter] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const {texts} = useLanguage();

  {/*---------------------------randdom new otp----------------------------*/}
  const generateRandomOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  {/*---------------------------time 5s open otp----------------------------*/}
  useEffect(() => {
    const timer = setTimeout(() => {
      const generatedOtp = generateRandomOtp();
      setOriginalOtp(generatedOtp);
      setOtp(generatedOtp.split(''));
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  {/*---------------------------time 60 clear otp new again----------------------------*/}
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [counter]);

  {/*---------------------------otp new again----------------------------*/}
  const confirmOtp = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp !== originalOtp) {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
      return;
    }else{
      {/*---------------------------next page set pin----------------------------*/}
      navigation.navigate('PinInputScreen', {email, password, language});
        /*try {
          await auth().createUserWithEmailAndPassword(email, password);
          Alert.alert(
            'Success',
            'Registration and phone verification successful',
          );
          navigation.navigate('PinInputScreen',{ email,password,language });
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Registration failed. Please try again.');
        }*/
    }

  };

  {/*---------------------------send otp and reset time----------------------------*/}
  const resendOtp = async () => {
    try {
      const generatedOtp = generateRandomOtp();
      setOriginalOtp(generatedOtp);
      setOtp(generatedOtp.split(''));
      Alert.alert('OTP Sent', 'Please check your phone for the new OTP');
      setCounter(60);
      setCanResend(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to resend OTP');
    }
  };

  {/*---------------------------set text to number----------------------------*/}
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, '');
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = index + 1;
      const nextInputRef = `otp-input-${nextInput}`;
      if (nextInputRef) {
      }
    }
  };

  {/*---------------------------check length otp----------------------------*/}
  const isOtpComplete = otp.every(digit => digit.length > 0);

  return (
    <View style={styles.container}>

      <View style={styles.topcontainer}>
        {/*---------------------------text top-----------------------------*/}
        <Text style={styles.texttop}>{language === 'th' ? texts.verifyidentity : texts.verifyidentity}</Text>
        {/*---------------------------text title----------------------------*/}
        <Text style={styles.texttitle}>{language === 'th' ? texts.enterotp : texts.enterotp}</Text>
        <Text style={styles.texttitle}>{phoneNumber}</Text>
      </View>

      <View style={styles.otpContainer}>
        {/*---------------------------Input otp----------------------------*/}
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.textinput}
            value={digit}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={value => handleOtpChange(index, value)}
          />
        ))}
      </View>

      {/*---------------------------text title----------------------------*/}
      <Text style={styles.texttitle}>{language === 'th' ? texts.getnewotptext : texts.getnewotptext}</Text>

      {/*---------------------------button resend otp----------------------------*/}
      <TouchableOpacity onPress={resendOtp} disabled={!canResend}>
        <Text style={[styles.resendText, { color: canResend ? '#196f3d' : '#ccc' }]}>
            {language === 'th' ? texts.resendotp : texts.resendotp} ({counter})
        </Text>
      </TouchableOpacity>

      {/*---------------------------button confirm otp----------------------------*/}
      <TouchableOpacity
        style={[styles.button,{backgroundColor: isOtpComplete ? '#196f3d' : '#ccc'},]}
        onPress={isOtpComplete ? confirmOtp : null}
        disabled={!isOtpComplete}>
        <Text style={styles.buttonText}>{language === 'th' ? texts.confirmotp : texts.confirmotp}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  topcontainer: {
    marginTop: 30,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20,
  },
  textinput: {
    height: 50,
    color: 'black',
    borderColor: '#ccc',
    borderBottomWidth: 2,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    width: '14%',
    textAlign: 'center',
    fontSize: 24,
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
  countdownText: {
    marginTop: 15,
    fontSize: 16,
    color: '#555',
  },
  texttop: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  texttitle: {
    fontSize: 13,
    color: '#999',
  },
  resendText: {
    marginTop:20,
    marginBottom:20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OtpVerificationScreen;
