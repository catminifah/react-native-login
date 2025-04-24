import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useLanguage } from './LanguageContext';

const UserScreen = ({ route, navigation }) => {
  const { email, language } = route.params;
  const { texts } = useLanguage();

  {/*----------------------Logout --------------------*/}
  const handleLogout = () => {
    Alert.alert(
      texts.logoutConfirmation,
      texts.logoutPrompt,
      [
        {
          text: texts.cancel,
          style: 'cancel',
        },
        {
          text: texts.confirm,
          onPress: () => {navigation.navigate('LoginScreen',{language});
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {/*---------------------------text email----------------------------*/}
      <Text style={styles.emailText}>
        {texts.welcome}{email}!
      </Text>

      {/*---------------------------button Logout---------------------------*/}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>{texts.logout}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emailText: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
    color:'#000000',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default UserScreen;
