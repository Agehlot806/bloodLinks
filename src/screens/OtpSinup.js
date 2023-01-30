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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { moderateScale, scale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
const OtpSinup = ({ route }) => {
    const navigation = useNavigation();
    const [pin1, setpin1] = useState();
    const inputRefOne = useRef();



    const Testt = async () => {
        const IDD = await AsyncStorage.getItem('User')
        const IDD1 = await AsyncStorage.getItem('User1')
        console.log('heeloe test', IDD1)
        console.log('heeloe id save testt', IDD)
    }
    useEffect(() => {
        Testt
    }, []);


    const LoginUserId = async (city) => {
        const IDDD = JSON.stringify(city)
        console.log('hello user id sinup save check useEffect', IDDD)
        try {
            await AsyncStorage.setItem('User', IDDD)
            await AsyncStorage.setItem('User1', IDDD)
        } catch (e) {
            // saving error
        }
    }


    const OtpVerify = () => {
        let url = `https://bloodlinks.in/verificationsignup`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        let data = {
            cust_mobile: route.params.num,
            cust_otp: pin1,
            // data: route.params.deta,
        }
        console.log('custom Response Api singup deta', data)
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            body: JSON.stringify({
                cust_otp: pin1,
                user: route.params.deta
            }),
            headers: headers,
        })
            // deta
            .then((Response) => Response.json())
            .then((Response) => {
                console.log('RESPONSE apiiii otp verfiy sinup---------OTP----->>>>', Response)
                var city = (Response.user_id);
                console.log('RESPONSE    city ---------OTP----->>>>', city)
                LoginUserId(city)
                if (Response.status == true) {
                    alert("User Sinup successfully !");
                    navigation.navigate('Home', {
                        user: JSON.stringify(Response.user_id)
                    })
                }
                else {
                    alert("User Not Sinup !");
                    console.log('RESPONSE Status-------------->>>>', Response.status)
                }
            })
            .catch((error) => {
                alert("Network Server Error");
                console.error("ERROR FOUND" + error);
            })
    }
    const Resend = () => {
        let url = `https://bloodlinks.in/login`   //API to render login
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            body: JSON.stringify({
                cust_mobile: route.params.num,
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
export default OtpSinup;