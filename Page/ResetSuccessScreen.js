import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useLanguage } from './LanguageContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ResetSuccessScreen = ({ route, navigation }) => {
  const { language } = route.params;
  const { texts } = useLanguage();

  return (
    <View style={styles.container}>
      {/*----------------------------icon top-----------------------------*/}
      <View style={styles.circle}>
        <Icon name="check" size={100} color="#196f3d" />
      </View>
      {/*---------------------------text title----------------------------*/}
      <Text style={styles.successText}>
        {language === 'th' ?  texts.success : texts.success}
      </Text>
      <Text style={styles.infoText}>
        {language === 'th' ? texts.resetsuccess : texts.resetsuccess}
      </Text>
      {/*--------------------- button next login --------------------------*/}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen', { language })}>
        <Text style={styles.buttonText}>
          {language === 'th' ? texts.ok : texts.ok}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 120,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#196f3d',
    borderWidth: 3,
    marginBottom: 90,
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
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

export default ResetSuccessScreen;
