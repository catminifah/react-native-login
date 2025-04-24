import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput, Dimensions ,Alert} from 'react-native';
import { useLanguage } from './LanguageContext';

const RegisterScreen = ( { route, navigation } ) => {
  const { texts } = useLanguage();
  const { language } = route.params;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    {/*---------------------------check pass----------------------------*/}
    if(username == "" || password == "" || confirmPassword == "" || password.length < 6 || confirmPassword.length < 6){
      Alert.alert('Error', language === 'th' ? texts.textfillinputtext : texts.textfillinputtext);
      return;
    }else if (password !== confirmPassword) {
      Alert.alert('Error', language === 'th' ? texts.passwordmismatch : texts.passwordmismatch);
      return;
    }else{
      {/*---------------------------next page phone----------------------------*/}
      navigation.navigate('PhoneVerificationScreen', { language, email: username , password});
    }
  };

  return (
    <View style={styles.container}>
      {/*---------------------------text title----------------------------*/}
      <View style={styles.viewtitle}>
        <Text style={styles.texttitle}>{language === 'th' ? texts.userregistration : texts.userregistration}</Text>
      </View>
      {/*-----------------Text input user ID----------------------------*/}
      <TextInput
        style={styles.textinput}
        placeholder={language === 'th' ? texts.idnameuser : texts.idnameuser}
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />
      {/*-----------------Text input Password----------------------------*/}
      <TextInput
        style={styles.textinput}
        placeholder={language === 'th' ? texts.passworduser : texts.passworduser}
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/*-----------------Text confirm Password----------------------------*/}
      <TextInput
        style={styles.textinput}
        placeholder={language === 'th' ? texts.confirmpassworduser : texts.confirmpassworduser}
        placeholderTextColor="#999"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/*---------------------------button Register----------------------------*/}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>{language === 'th' ? texts.register : texts.register}</Text>
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
  button: {
    backgroundColor: '#196f3d',
    padding: 15,
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 10,
    width: Dimensions.get('window').width - 40,
    borderRadius: 10,
  },
  textinput: {
    height: 40,
    width: Dimensions.get('window').width - 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    color:'#000000',
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
    fontSize: 25,
    fontWeight:'bold',
    color: '#000',
    marginBottom: 60,
  },
  signupContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  signupText: {
    fontSize: 13,
    color: '#999',
  },
});

export default RegisterScreen;
