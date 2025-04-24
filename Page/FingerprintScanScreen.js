import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useLanguage } from './LanguageContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FingerprintScanScreen = ({ route, navigation }) => {
  const { pin, email, password, language } = route.params;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { texts } = useLanguage();

  const handleFingerprintRegistration = async () => {
    const rnBiometrics = new ReactNativeBiometrics();

    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Scan your fingerprint to register',
      });

      {/*---------------------------register email/pass in firebase----------------------------*/}
      if (success) {
        setIsAuthenticated(true);
        Alert.alert('Authentication Successful', 'Fingerprint has been recognized.');

        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const userId = userCredential.user.uid;

        await saveDataToFirestore(userId, true);
      }
    } catch (error) {
      console.log('Fingerprint Authentication failed:', error);
      Alert.alert('Authentication Failed', 'Please try again.');
    }
  };

  {/*---------------------------save in Firestore----------------------------*/}
  const saveDataToFirestore = async (userId, isFingerprintEnabled) => {
    try {
      await firestore().collection('users').doc(userId).set({
        email: email,
        pin: pin,
        isFingerprintEnabled: isFingerprintEnabled,
      });

      Alert.alert('Success', 'Registration and data saving successful.');
      navigation.navigate('LoginScreen', { language });
    } catch (error) {
      console.log('Error saving data:', error);
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  {/*---------------------------skip and register----------------------------*/}
  const handleSkipFingerprint = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      await saveDataToFirestore(userId, false);
    } catch (error) {
      console.log('Error creating user:', error);
      Alert.alert('Error', 'Failed to create user.');
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.topcontainer}>
        {/*---------------------------text top-----------------------------*/}
        <Text style={styles.texttop}>Touch ID</Text>
        {/*---------------------------text title----------------------------*/}
        <Text style={styles.texttitle}>{language === 'th' ? texts.setupfingerprintlogin : texts.setupfingerprintlogin}</Text>
        <Text style={styles.texttitle}>{language === 'th' ? texts.forquickeraccess : texts.forquickeraccess}</Text>
      </View>

      {/*---------------------------icon fingerprint----------------------------*/}
      <View style={styles.iconContainer}>
        <Icon name="fingerprint" size={100} color="#196f3d" />
      </View>

      {/*---------------------------button fingerprint----------------------------*/}
      <TouchableOpacity
        style={styles.button}
        onPress={handleFingerprintRegistration}>
        <Text style={styles.buttonText}>
          {language === 'th' ? texts.setfingerprint : texts.setfingerprint}
        </Text>
      </TouchableOpacity>

      {/*---------------------------button skip----------------------------*/}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={handleSkipFingerprint}>
        <Text style={styles.skipButtonText}>
          {language === 'th' ? texts.skip : texts.skip}
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
    backgroundColor: '#F5F5F5',
  },
  topcontainer: {
    marginTop: 30,
    position: 'absolute',
    top: 20,
    left: 20,
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
  iconContainer: {
    marginBottom: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#D3D3D3',
    padding: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  successText: {
    fontSize: 18,
    color: '#28A745',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
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
  skipButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'transparent',
  },
  skipButtonText: {
    color: '#196f3d',
    fontSize: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default FingerprintScanScreen;
