import React, {useState, useEffect,useCallback,} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useLanguage} from './LanguageContext';
import ReactNativeBiometrics from 'react-native-biometrics';

const PinLoginScreen = ({route, navigation}) => {
  const {email, pin, isFingerprintEnabled, language} = route.params;
  const [inputPin, setInputPin] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const {texts} = useLanguage();

  {/*----------------------enter pin success next page --------------------*/}
  useEffect(() => {
    if (inputPin.length === 6) {
      const enteredPin = inputPin.join('');
      if (enteredPin === pin) {
        navigation.navigate('UserScreen', { email, language });
      } else {
        alert(texts.incorrectPin);
        /* reset pin */
        setInputPin([]);
      }
    }
  }, [inputPin, pin, navigation, texts, email, language]);

  useEffect(() => {
    if (isFingerprintEnabled) {
      showFingerprintAlert();
    }
  }, [isFingerprintEnabled, showFingerprintAlert]);

  {/*----------------------window Alert --------------------*/}
  const showFingerprintAlert = useCallback(() => {
    Alert.alert(
      'Touch ID for CGS Application',
      language === 'th' ? texts.textpinortouchid : texts.textpinortouchid,
      [
        {
          text: 'Enter Password',
          onPress: () => handleFingerprint(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancelled'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }, [handleFingerprint, language, texts.textpinortouchid]);

  {/*---------------------- Fingerprint --------------------*/}
  const handleFingerprint = useCallback(() => {
    const rnBiometrics = new ReactNativeBiometrics();
    rnBiometrics
      .simplePrompt({promptMessage: 'Scan your fingerprint to register'})
      .then(result => {
        const {success} = result;
        if (success) {
          navigation.navigate('UserScreen', {email, language});
        } else {
          alert(texts.incorrectPin);
        }
      })
      .catch(error => {
        console.error('Biometric authentication error:', error);
        alert(texts.error);
      });
  }, [email, language, navigation, texts]);

  {/*---------------------------check length pin < 6 ----------------------------*/}
  const handlePress = value => {
    if (inputPin.length < 6) {
      setInputPin([...inputPin, value]);
    }
  };

  {/*---------------------------delete pin----------------------------*/}
  const handleDelete = () => {
    if (inputPin.length > 0) {
      setInputPin(inputPin.slice(0, -1));
    }
  };

  {/*---------------------------button number----------------------------------*/}
  const renderButton = value => (
    <TouchableOpacity
        key={value}
        style={[styles.button, { backgroundColor: activeButton === value ? '#196f3d' : 'transparent' }]}
        onPressIn={() => setActiveButton(value)}
        onPressOut={() => setActiveButton(null)}
        onPress={() => handlePress(value)}
        activeOpacity={1}>
        <Text style={[styles.buttonText, { color: activeButton === value ? '#fff' : '#000' }]}>
            {value}
        </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/*---------------------------text title----------------------------*/}
      <Text style={styles.title}>
        {language === 'th' ? texts.enterPin : texts.enterPin}
      </Text>

      <View style={styles.pinDisplay}>
        {/*---------------------------pinCircle input----------------------------*/}
        {Array(6).fill('').map((_, index) => (
          <View
            key={index}
            style={[styles.pinCircle, {backgroundColor: inputPin[index] !== undefined ? '#196f3d' : 'transparent'}]}>
            <Text style={styles.pinText}>
              {inputPin[index] !== undefined ? inputPin[index] : ''}
            </Text>
          </View>
        ))}
      </View>

      {/*---------------------------button number----------------------------------*/}
      <View style={styles.buttonContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(renderButton)}

        {/*---------------------------button fingerprint----------------------------*/}
        <TouchableOpacity
          style={[styles.button, {backgroundColor: activeButton === 'fingerprint' ? '#196f3d' : 'transparent'}]}
          onPressIn={() => setActiveButton('fingerprint')}
          onPressOut={() => setActiveButton(null)}
          onPress={isFingerprintEnabled ? handleFingerprint : null}
          activeOpacity={1}>
            <Icons name="fingerprint" size={32} style={ {color: activeButton === 'fingerprint' ? '#fff' : '#196f3d'}} />
        </TouchableOpacity>


        {/*---------------------------button 0 ----------------------------------*/}
        <TouchableOpacity
          style={[styles.button, {backgroundColor: activeButton === 0 ? '#196f3d' : 'transparent'}]}
          onPressIn={() => setActiveButton(0)}
          onPressOut={() => setActiveButton(null)}
          onPress={() => handlePress(0)}
          activeOpacity={1}>
          <Text style={[styles.buttonText, {color: activeButton === 0 ? '#fff' : '#000'}]}>0</Text>
        </TouchableOpacity>

        {/*---------------------------button delete------------------------------*/}
        <TouchableOpacity style={styles.buttonnotshow} onPress={handleDelete}>
          <Icon name="backspace" size={32} color="#196f3d" />
        </TouchableOpacity>
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
  title: {
    fontSize: 17,
    marginBottom: 20,
    color: '#000000',
  },
  pinDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '50%',
    marginBottom: 50,
  },
  pinCircle: {
    width: 20,
    height: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinText: {
    fontSize: 24,
    color: 'transparent',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 60,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
  },
  buttonnotshow: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

export default PinLoginScreen;
