import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import StatusTopBar from '../Components/StatusTopBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLOR } from '../constants/colorConstants';
const { width, height } = Dimensions.get('window');
import LottieView from 'lottie-react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { moderateScale, scale } from 'react-native-size-matters';
// import NetInfo from "@react-native-community/netinfo";
import { Snackbar } from 'react-native-paper';
const Login = () => {
  const navigation = useNavigation();
  const [Id, setId] = useState(null);
  const [Phonenumber, setPhonenumber] = useState('');
  const [Grey, setGrey] = useState('#000000');
  const [phoneError, setphoneError] = useState('');
  const [ajaxRequesting, setAjaxRequesting] = useState(false);
   
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const loginPage = () => {
    if (Phonenumber == '') {
      setphoneError('#85060F')
    } else {
      LoginFunction();
      // navigation.navigate('Otp')
    }
  }

  // const checkConnected = () => {
  //   return NetInfo.fetch().then((state) => {
  //     if (state.isConnected == true) {
  //       console.log("Is connected?", true);
  //     } else {
  //       alert('Please Internet Check and Network connectivity Problem.')
  //     }
  //     return state.isConnected;
  //   });
  // }



  const LoginFunction = () => {
    let url = `https://bloodlinks.in/login?cust_mobile=${Phonenumber}`   //API to render signup

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    // console.log("---------------Data", data);
    fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        cust_mobile: Phonenumber,
      }),
      headers: headers,
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log('RESPONSE apiiii-------------->>>>', Response)
        if (Response.status == true) {
          alert("Otp Send successfully");
          console.log('RESPONSE Status-------------->>>>', Response.status)
          navigation.navigate('Otp', {
            Number: Phonenumber,
          })
        }
        else {
          alert("Phone Number is Not Found");
          navigation.navigate('SignUp')
          console.log('RESPONSE Status-------------->>>>', Response.status)
        }

      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })
  }


  let animation = React.createRef();
  useEffect(() => {
    animation?.current?.play();
    // checkConnected()
  }, [ajaxRequesting]);
  return (
    <ScrollView>
      <StatusTopBar />
      <SafeAreaView style={styles.container}>
        <View style={{ justifyContent: 'flex-end' }}>
          <ImageBackground
            style={styles.loginbg}
            source={require('../assets/Images/loginBG.png')}>
            <Animatable.View
              animation="bounceInDown"
              style={styles.loginTopimg}>
              <Image
                style={styles.loginTopimgs}
                source={require('../assets/Images/loginTopImage.png')}
              />
            </Animatable.View>
            <View style={styles.loginBtmimg}>
              <Image
                style={styles.loginbtmimgs}
                source={require('../assets/Images/loginBtmImage.png')}
              />
              <KeyboardAwareScrollView style={styles.forms}>
                <Animatable.View animation="zoomIn" style={styles.loginTitle}>
                  <Text style={{
                    color: 'black',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: scale(16),
                    letterSpacing: 1,
                    textAlign: "center"
                  }}>We will send your OTP on your</Text>
                  <Text style={{
                    color: 'black',
                    // textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: scale(15),
                    letterSpacing: 1,
                    textAlign: "center",
                    // top: scale(8)
                  }}>Moblie Number</Text>
                </Animatable.View>
                <Animatable.View animation="slideInDown">
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardType="number-pad"
                    value={Phonenumber}
                    onChangeText={setPhonenumber}
                    maxLength={10}
                    borderColor={Phonenumber ? Grey : phoneError}
                  />
                </Animatable.View>
                <View style={styles.btns}>
                  <TouchableOpacity onPress={() => loginPage()}>
                    <Animatable.View
                      animation="slideInLeft"
                      style={styles.butttons}>
                      <View style={{ height: moderateScale(100), width: 150, top: scale(45) }}>
                        <Text
                          style={[styles.loginbtn, { backgroundColor: '#BF3741' }]}>
                          GET OTP
                        </Text>
                      </View>
                    </Animatable.View>
                  </TouchableOpacity>
                  {
                    ajaxRequesting
                      ? <LottieView
                        ref={animation}
                        loop={true}
                        style={{
                          width: 150,
                          height: 150,
                          position: 'absolute',
                          top: -107,
                          left: 47,
                          // loop: true,
                          autoplay: true,
                        }}
                        source={require('../assets/icons/loader.json')}
                      />
                      : null
                  }
                </View>
              </KeyboardAwareScrollView>
            </View>
          </ImageBackground>
          {/* <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar()}
            action={{
              label: 'Check',
              onPress: () => {
                // Do something
              },
            }}>
            Please Internet Check and Network connectivity Problem.
          </Snackbar> */}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height * 1,
  },
  loginbg: {
    // justifyContent:'center',
    height: height * 0.6,
  },
  loginTopimg: {
    justifyContent: 'center',
    // height: height * 0.5,
    width: width * 0.4,
    paddingHorizontal: width * 0.1,
  },
  loginTopimgs: {
    height: height * 0.45,
    width: width * 0.8,
  },
  loginBtmimg: {
    // height: height * 0.15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  loginbtmimgs: {
    bottom: 40,
    height: height * 0.7,
    width: width * 1,
  },
  forms: {
    marginTop: height * 0.05,
    position: 'absolute',
    width: scale(330)
  },
  loginTitle: {
    width: '100%',
    height: moderateScale(70), justifyContent: "center",
  },
  input: {
    height: height * 0.07,
    width: width * 0.8,
    borderWidth: scale(1.70),
    padding: width * 0.03,
    borderRadius: 5,
    letterSpacing: 1,
    fontSize: scale(16.5),
    fontWeight: '400',
    color: 'black',
    marginTop: scale(10),
    marginBottom: scale(15),
    marginHorizontal: scale(25)
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  loginbtn: {
    color: COLOR.WHITE,
    backgroundColor: '#85060F',
    paddingVertical: height * 0.013,
    width: width * 0.35,
    textAlign: 'center',
    borderRadius: 35,
    fontWeight: '500',
    fontSize: width * 0.039,
    // elevation:10,
    borderWidth: 2,
    borderColor: '#9B333B',
  },
  googlebtns: {
    height: 55,
    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: COLOR.GRAY,
  },
  gbtns: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gbtn: {
    fontSize: scale(17), width: '100%',
    textAlign: 'center',
    fontWeight: '400',
    width: '100%',
    bottom: width * 0.02,
    color: 'black',
  },
  gimgs: {
    // height: 10,
    // width: 10,
    marginHorizontal: width * 0.08,
    top: width * 0.04,
    alignSelf: 'flex-start',
  },
  gimg: {
    height: height * 0.025,
    width: width * 0.045,
    // paddingTop:10,
  },
  forgotPass: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 5,
  },
  forgotPassTxt: {
    textDecorationLine: 'underline',
    fontWeight: '500',
    height: moderateScale(20),
    fontSize: scale(13),
    textAlign: 'right',
    color: 'black',
  },
});
export default Login;