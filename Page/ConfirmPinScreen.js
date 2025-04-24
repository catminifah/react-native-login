import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useLanguage} from './LanguageContext';

const ConfirmPinScreen = ({route, navigation}) => {
  const {pin, email, password, language} = route.params;
  const [cfpin, setcfPin] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const {texts} = useLanguage();

  {/*--------------------check length pin=6 time 5s go next page ---------------*/}
  useEffect(() => {
    if (cfpin.length === 6) {
      if (cfpin.join('') === pin) {
        const timer = setTimeout(() => {
          navigation.navigate('FingerprintScanScreen', { pin, email, password, language });
        }, 5000);
        
        return () => clearTimeout(timer);
      } else {
        Alert.alert('Error', 'PIN does not match.');
      }
    }
  }, [pin, email, password, language, navigation, cfpin]);

  {/*---------------------------check length pin >6 ----------------------------*/}
  const handlePress = value => {
    if (cfpin.length < 6) {
      setcfPin([...cfpin, value]);
    }
  };

  {/*------------------------------delete pin-----------------------------------*/}
  const handleDelete = () => {
    if (cfpin.length > 0) {
      setcfPin(cfpin.slice(0, -1));
    }
  };

  {/*---------------------------button number 1-9----------------------------------*/}
  const renderButton = value => (
    <TouchableOpacity
      key={value}
      style={[styles.button,{backgroundColor: activeButton === value ? '#196f3d' : 'transparent'},]}
      onPressIn={() => setActiveButton(value)}
      onPressOut={() => setActiveButton(null)}
      onPress={() => handlePress(value)}
      activeOpacity={1}>
      <Text
        style={[styles.buttonText,{color: activeButton === value ? '#fff' : '#000'},]}>
        {value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/*---------------------------text title----------------------------*/}
      <Text style={styles.title}>
        {language === 'th' ? texts.confirmpin : texts.confirmpin}
      </Text>

      <View style={styles.pinDisplay}>
        {/*---------------------------pinCircle input----------------------------*/}
        {Array(6).fill('').map((_, index) => (
            <View
              key={index}
              style={[styles.pinCircle,{backgroundColor:cfpin[index] !== undefined ? '#196f3d' : 'transparent',},]}>
              <Text style={styles.pinText}>
                {cfpin[index] !== undefined ? cfpin[index] : ''}
              </Text>
            </View>
          ))}
      </View>

      {/*---------------------------button number----------------------------------*/}
      <View style={styles.buttonContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(renderButton)}

        {/*---------------------------not have button----------------------------*/}
        <TouchableOpacity style={styles.buttonnotshow}></TouchableOpacity>

        {/*---------------------------button 0 ----------------------------------*/}
        <TouchableOpacity
          style={[styles.button,{backgroundColor: activeButton === 0 ? '#196f3d' : 'transparent'},]}
          onPressIn={() => setActiveButton(0)}
          onPressOut={() => setActiveButton(null)}
          onPress={() => handlePress(0)}
          activeOpacity={1}>
          <Text style={[styles.buttonText,{color: activeButton === 0 ? '#fff' : '#000'},]}>0</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
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

export default ConfirmPinScreen;
