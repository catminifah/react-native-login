import { View,Text,TouchableOpacity,StyleSheet,Modal,Animated,Dimensions,TouchableWithoutFeedback,ScrollView,} from 'react-native';
import React, { useState, useRef } from 'react';
import SplashScreen from './SplashScreen';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import { useLanguage } from './LanguageContext';

const HomeScreen = ({ navigation }) => {
  const { language, setLanguage, texts } = useLanguage();

  const [isSplashVisible, setSplashVisible] = useState(true);

  const finishSplash = () => {
    setSplashVisible(false);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;

  const showModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').height * 0.1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const goToLogin = () => {
    hideModal();
    navigation.navigate('LoginScreen',{ language });
  };

  return (
    <View style={{ flex: 1 }}>
      {isSplashVisible ? (<SplashScreen onFinish={finishSplash} />) : (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ffffff' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
            <View style={{ marginStart: 20, marginBottom: 100 }}>
              {/*---------------------------Text Home----------------------------*/}
              <Text
                style={{
                  color: '#000000',
                  fontWeight: 'bold',
                  fontSize: 24,
                  marginBottom: 2,
                }}>
                ยินดีต้อนรับ
              </Text>
              <Text style={{ color: '#000000', fontSize: 20 }}>กรุณาเลือกภาษา</Text>
            </View>
            <View>

              {/*-------------------Button Language EN----------------------------*/}
              <TouchableOpacity
                style={styles.button}
                onPress={() => { setLanguage('en'); showModal(); }}>
                <Text style={styles.buttonText}>English</Text>
              </TouchableOpacity>

              {/*-------------------Button Language TH----------------------------*/}
              <TouchableOpacity
                style={styles.button}
                onPress={() => { setLanguage('th'); showModal(); }}>
                <Text style={styles.buttonText}>ไทย</Text>
              </TouchableOpacity>

            </View>
          </View>
          {/*-------------------View popup(Modal)----------------------------*/}
          <Modal transparent={true} visible={modalVisible} animationType="none">
            {/*-----------------------Button Back----------------------------*/}
            {modalVisible && (
              <TouchableOpacity style={styles.backButton} onPress={hideModal}>
                <Ionicons name="arrow-left" size={24} color="#000000" Regular />
              </TouchableOpacity>
            )}
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.overlay}>
                {/*-------------------------Animated View----------------------------*/}
                <Animated.View style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}>
                  <View>
                    <View style={styles.header}>

                      {/*-------------------------Title Icon----------------------------*/}
                      <Ionicons name="file-alt" size={30} color="#196f3d" style={{ marginLeft: 20 }} Regular />

                      {/*-------------------------Title Text----------------------------*/}
                      <Text style={[styles.modalText]}>{texts.title}</Text>
                      
                    </View>
                    <View style={styles.separator} />
                  </View>

                  {/*------------------------- ScrollView ----------------------------*/}
                  <ScrollView contentContainerStyle={styles.scrollView}>
                    {texts.description.map((item, index) => (
                      <Text key={index} style={styles.modalDescription}>
                        {item}
                      </Text>
                    ))}
                  </ScrollView>

                  <View style={styles.buttonContainer}>

                    {/*-----------------------Button cancel----------------------------*/}
                    <TouchableOpacity style={styles.declineButton} onPress={hideModal}>
                      <Text style={styles.declineButtonText}>{texts.cancel}</Text>
                    </TouchableOpacity>

                    {/*-----------------------Button agree----------------------------*/}
                    <TouchableOpacity style={styles.agreeButton} onPress={goToLogin}>
                      <Text style={styles.buttonText}>{texts.agree}</Text>
                    </TouchableOpacity>

                  </View>

                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      )}
    </View>
  );
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
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
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(245, 245, 245, 0.95)',
      justifyContent: 'flex-end',
    },
    modal: {
      backgroundColor: 'white',
      width: '100%',
      height: '85%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 20,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginBottom: 0,
    },
    modalText: {
      fontSize: 20,
      marginLeft: 20,
      fontWeight: 'bold',
      color:'#000000',
    },
    modalDescription: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'left',
    },
    scrollView: {
      paddingHorizontal: 20,
    },
    declineButton: {
      backgroundColor: 'white',
      borderColor: '#196f3d',
      borderWidth: 2,
      width: '43%',
      padding: 10,
      borderRadius: 10,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    declineButtonText: {
      color: '#196f3d',
    },
    agreeButton: {
      backgroundColor: '#196f3d',
      width: '43%',
      padding: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 100,
    },
    backButton: {
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 1,
      padding: 8,
      borderRadius: 5,
      elevation: 0,
    },
    separator: {
      height: 1,
      backgroundColor: '#C0C0C0',
      marginTop: 15,
      marginVertical: 0,
      width: '90%',
      alignSelf: 'center',
    },
  });
  
export default HomeScreen;
