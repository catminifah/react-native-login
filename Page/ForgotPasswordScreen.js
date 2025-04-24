import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { useLanguage } from './LanguageContext';
import auth from '@react-native-firebase/auth';

const ForgotPasswordScreen = ({ route, navigation }) => {
  const { language } = route.params;
  const { texts } = useLanguage();
  const [emailOrPhone, setEmailOrPhone] = useState('');

  {/*---------------------send email and reset pass-----------------------------*/}
  const handleSendReset = async () => {
    if(emailOrPhone.length>0){
        try {
          await auth().sendPasswordResetEmail(emailOrPhone);
          navigation.navigate('ResetSuccessScreen', {language});
        } catch (error) {
          Alert.alert(
            language === 'th' ? texts.emailnotfound : texts.emailnotfound,
            language === 'th' ? texts.enteremail : texts.enteremail,
          );
        }
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.topcontainer}>
        {/*----------------------------text top-----------------------------*/}
        <Text style={styles.texttop}>{language === 'th' ? texts.forgotPassword : texts.forgotPassword}</Text>
        {/*---------------------------text title----------------------------*/}
        <Text style={styles.texttitle}>{language === 'th' ? texts.enterregister : texts.enterregister}</Text>
      </View>

      {/*-------------------------TextInput email---------------------------*/}
      <TextInput
        style={styles.textinput}
        placeholder={language === 'th' ? texts.emailornumber : texts.emailornumber}
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        keyboardType="email-address"
        placeholderTextColor="#999"
      />

      {/*--------------------- button send email --------------------------*/}
      <TouchableOpacity style={styles.button} onPress={handleSendReset}>
        <Text style={styles.buttonText}>
          {language === 'th' ? texts.send : texts.send}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topcontainer: {
    marginTop: 30,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  texttop: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
  texttitle: {
    fontSize: 16,
    color: '#999',
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#555',
  },
  textinput: {
    height: 40,
    width: Dimensions.get('window').width - 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    color: '#000',
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
    color: '#fff',
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;
