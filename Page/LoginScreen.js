import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput, Dimensions } from 'react-native';
import { useLanguage } from './LanguageContext';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const LoginScreen = ( { route, navigation } ) => {
  const { texts } = useLanguage();
  const { language } = route.params;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  {/*-----------------get email pass in AsyncStorage----------------------------*/}
  useEffect(() => {
    const loadCredentials = async () => {
      const savedUsername = await AsyncStorage.getItem('username');
      const savedPassword = await AsyncStorage.getItem('password');
      const savedRememberMe = await AsyncStorage.getItem('rememberMe');

      if (savedRememberMe === 'true') {
        setUsername(savedUsername || '');
        setPassword(savedPassword || '');
        setRememberMe(true);
      }
    };

    loadCredentials();
  }, []);

  {/*-----------------save email pass in AsyncStorage----------------------------*/}
  const handleLogin = async () => {
    try {
      {/*------------------------login firebase--------------------------------*/}
      await auth().signInWithEmailAndPassword(username, password);
      
      {/*---------------------login save email pass--------------------------*/}
      if (rememberMe) {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('rememberMe', 'true');
      } else {
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.setItem('rememberMe', 'false');
      }

      {/*---------------------get data firestore--------------------------*/}
      const userId = auth().currentUser.uid;
      const userDoc = await firestore().collection('users').doc(userId).get();
      const userData = userDoc.data();
  
      navigation.navigate('PinLoginScreen', { 
        email: username,
        pin: userData.pin,
        isFingerprintEnabled: userData.isFingerprintEnabled,
        language,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
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
      {/*---------------------------Box Check----------------------------*/}
      <View style={styles.optionsContainer}>
        <View style={styles.rememberMeContainer}>
          <CheckBox
            title={language === 'th' ? texts.savelogin : texts.savelogin}
            checked={rememberMe}
            onPress={() => setRememberMe(!rememberMe)}
            containerStyle={{
              backgroundColor: 'transparent',
              borderWidth: 0,
            }}
            textStyle={{
              color: '#999',
              fontWeight: 'normal',
              fontSize: 13,
            }}
          />
        </View>

        {/*---------------------------forgot Password----------------------------*/}
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen', { language })}>
          <Text style={styles.forgotPasswordText}>{language === 'th' ? texts.forgotPassword : texts.forgotPassword}</Text>
        </TouchableOpacity>
      </View>

      {/*---------------------------button login----------------------------*/}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        >
        <Text style={styles.buttonText}>{language === 'th' ? texts.login : texts.login}</Text>
      </TouchableOpacity>

      {/*---------------------------text not have account----------------------------*/}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>{language === 'th' ? texts.notaccount : texts.notaccount}</Text>
      </View>

      {/*---------------------------button new account----------------------------*/}
      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate('RegisterScreen',{ language })}
        >
        <Text style={styles.buttonText2}>{language === 'th' ? texts.newaccount : texts.newaccount}</Text>
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
  button2: {
    borderColor: '#196f3d',
    borderWidth: 1,
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
    color:'#000000'
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttonText2: {
    color: '#196f3d',
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 5,
    fontSize: 16,
    marginEnd:10,
  },
  forgotPasswordText: {
    fontSize: 13,
    color: '#999',
    marginRight:20,
  },
  signupContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  signupText: {
    fontSize: 13,
    color: '#999',
  },
  signupButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
