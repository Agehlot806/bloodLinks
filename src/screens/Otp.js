import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLOR } from '../constants/colorConstants';
import { TextInput } from 'react-native-gesture-handler';
import DrawerHeader from '../Components/DrawerHeader';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, scale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
const Otp = ({ route }) => {
  const navigation = useNavigation();
  const [pin1, setpin1] = useState();
  const [pin2, setpin2] = useState();
  
  const inputRefOne = useRef();
  const LoginUserId = async (city) => {
    try {
      await AsyncStorage.setItem('User', city)
    } catch (e) {
      // saving error
    }
  }
  const OtpVerify = () => {
    setpin2(route.params.Number)
    let url = `https://bloodlinks.in/mynewfunction`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    let data = {
      cust_mobile: pin2,
      cust_otp: pin1,
     }
    console.log('custom Response Api', data)
    fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        cust_mobile: route.params.Number,
        cust_otp: pin1,

      }),
      headers: headers,
    })
      // deta
      .then((Response) => Response.json())
      .then((Response) => {
        console.log('RESPONSE apiiii otp verfiy ---------OTP----->>>>', Response)
        var city = (Response.data[0].user_id);
        LoginUserId(city)
        if (Response.status == true) {
          alert("User Login successfully !");
          navigation.navigate('Home')
        }
        else {
          alert("User Not Login !");
          console.log('RESPONSE Status-------------->>>>', Response.status)
        }
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })
  }
  const Resend = () => {
    let url = `https://bloodlinks.in/login`   //API to render signup
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        cust_mobile: route.params.Number,
      }),
      headers: headers,
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log('RESPONSE apiiii resend -------------->>>>', Response)
        alert('Resend Otp Sucesfull')
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })
  }
  return (
    <SafeAreaView style={styles.container}>
      <DrawerHeader name={'OTP Code'} image1={false} />
      <View style={{
        marginTop: 150,
        height: moderateScale(50),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: scale(20),
          letterSpacing: 0.3,
          width: '100%',
          textAlign: 'center'
        }}>One Time Password</Text>
      </View>
      <View style={styles.inputview}>
        <TextInput
          ref={inputRefOne}
          style={styles.input}
          placeholder="Type Otp"
          keyboardType="number-pad"
          value={pin1}
          autoFocus={true}
          autoCorrect={true}
          onChangeText={setpin1}
          maxLength={10}
          borderColor={'Grey'}
        />
        {/* <TextInput
          ref={inputRefOne}
          keyboardType={'numeric'}
          maxLength={1}
          style={styles.inputfeild}
          onChangeText={pin1 => {
            setpin1(pin1)
            if (pin1 != '') {
              inputRefTwo.current.focus();
            }
          }}
          value={pin1}
        ></TextInput> */}
        {/* <TextInput
          ref={inputRefTwo}
          keyboardType={'numeric'}
          maxLength={1}
          style={styles.inputfeild}
          onChangeText={pin2 => {
            setpin2(pin2)
            if (pin2 != '') {
              inputRefThree.current.focus();
            } else {
              inputRefOne.current.focus();
            }
          }}
          value={pin2}
        >

        </TextInput> */}
        {/* <TextInput
          ref={inputRefThree}
          keyboardType={'numeric'}
          maxLength={1}
          style={styles.inputfeild}
          onChangeText={pin3 => {
            setpin3(pin3)
            // this.setState({
            //   pin3: pin3,
            // });
            if (pin3 != '') {
              // this.refs.pin1ref.focus();
              inputRefFour.current.focus();
            } else {
              inputRefTwo.current.focus();

            }
          }}
          value={pin3}
        >
        </TextInput> */}
        {/* <TextInput
          ref={inputRefFour}

          keyboardType={'numeric'}
          maxLength={1}
          style={styles.inputfeild}
          onChangeText={pin4 => {
            setpin4(pin4)
            if (pin4 != '') {
              inputRefFour.current.focus();
            } else {
              inputRefThree.current.focus();
            }
          }}
          value={pin4}
        ></TextInput> */}
      </View>
      <View style={{ width: '90%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: scale(20), height: scale(110) }}>
        <TouchableOpacity
          onPress={() => OtpVerify()}>
          <Text style={styles.otpbtn}>Otp Verify</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Resend()}>
          <Text style={styles.otpbtn}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({


  container: {
    flex: 1,
    height: height * 1,
    backgroundColor: COLOR.WHITE,
  },
  inputfeild: {
    backgroundColor: '#85060F',
    // paddingHorizontal: width * 0.05,
    textAlign: 'center',
    borderRadius: 100 / 2,
    fontSize: width * 0.05,
    height: 50,
    width: 50,
    marginLeft: 12,
    marginTop: 5,
    marginBottom: 5,
  },

  inputview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(45),
    height: moderateScale(60)
  },
  otpbtn: {
    color: COLOR.WHITE,
    backgroundColor: '#85060F',
    textAlign: 'center',
    borderRadius: scale(10),
    fontWeight: '500',
    fontSize: scale(22),
    paddingHorizontal: scale(13),
    paddingVertical: (10),
    borderWidth: 2,
    borderColor: '#9B333B',
  },
  box: {
    width: 300,
    height: 55,
    marginVertical: 20,
    borderColor: 'red',
    borderWidth: 1,
  },

  borderStyleBase: {
    width: 30,
    height: 45
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

});
export default Otp;