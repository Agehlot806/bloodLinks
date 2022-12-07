import React, { useState, useEffect, useRef } from 'react';
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
  Alart
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatusTopBar from '../Components/StatusTopBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLOR } from '../constants/colorConstants';
const { width, height } = Dimensions.get('window');
import { DANGER } from '../assets/Constant/Constant';
import { RadioButton } from 'react-native-paper';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { Dropdown } from 'react-native-element-dropdown';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const SignUp = props => {
  const navigation = props.navigation;
  const [name, setname] = useState('');
  const [nameError, setnameError] = useState('');
  const [lastName, setlastName] = useState('');
  const [lastError, setlastError] = useState('');
  const [fName, setfName] = useState('');
  const [fNameError, setfNameError] = useState('');
  const [email, setemail] = useState('');
  const [emailError, setemailError] = useState('');
  const [phone, setphone] = useState('');
  const [phoneError, setphoneError] = useState('');
  const [gander, setgander] = useState('');
   const [address, setaddress] = useState('');
  const [addressError, setaddressError] = useState('');
  const [state, setstate] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);
  const [district, setdistrict] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);
  const [Grey, setGrey] = useState('#000000');
  const [password, setpassword] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [isFocus3, setIsFocus3] = useState(false);
  const [blood, setblood] = useState();
  const [age, setage] = useState('');
  const [statesData, setstatesData] = useState([]);
  const [districtsData, setdistrictsData] = useState([]);

  const [pickerMode, setPickerMode] = useState(null);
  const [Dob, setDob] = useState('please Select of Date of Birth');

  const showDatePicker = () => {
    setPickerMode("date");
  };

  const hidePicker = () => {
    setPickerMode(null);
  };

  const handleConfirm = (date) => {
    hidePicker();
    setDob(moment(date).format('L'))
  };
  useEffect(() => {
    console.log('agee---->>>', age)
  }, [age]);
  const data = [
    { label: 'A+', value: '1' },
    { label: 'A-', value: '2' },
    { label: 'AB+', value: '3' },
    { label: 'AB-', value: '4' },
    { label: 'B+', value: '5' },
    { label: 'B-', value: '6' },
    { label: 'O+', value: '7' },
    { label: 'O-', value: '8' },
  ];



  useEffect(() => {
    fetch('https://bloodlinks.in/get_states')
      .then((response) => response.json())
      .then((response) => {
        // setdataStates(response)
        var states = Object.keys(response).length;
        let statesArray = [];
        for (var i = 0; i < states; i++) {
          statesArray.push({
            value: response[i].state_id,
            label: response[i].state_name,
          })
        }
        setstatesData(statesArray);
      })
      .catch((error) => {
        console.error('catch api error', error);
      });
  }, []);

  const handleDistrict = (stateId) => {

    let url = `https://bloodlinks.in/District?state_id=${stateId}`   //API to render signup
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        state_id: stateId,
      }),
      headers: headers,
    })
      .then((Response) => Response.json())
      .then((Response) => {
        var district = Object.keys(Response).length;
        let districtArray = [];
        for (var i = 0; i < district; i++) {
          districtArray.push({
            value: Response[i].district_id,
            label: Response[i].district_name,
          })
        }
        setdistrictsData(districtArray);
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })
  }

  var dob = new Date(Dob);
  var month_diff = Date.now() - dob.getTime();
  var age_dt = new Date(month_diff);
  var year = age_dt.getUTCFullYear()
  var age1 = Math.abs(year - 1970);

  const profFunct = async () => {
    await AsyncStorage.removeItem('User')
  }
  const Submit = () => {
    if (name == "") {
      setnameError('#85060F')
    } else if (lastName == "") {
      setlastError('#85060F')
    } else if (fName == "") {
      setfNameError('#85060F')
    } else if (email == "") {
      setemailError('#85060F')
    } else if (phone == "") {
      setphoneError('#85060F')
    } else if (gander == "") {
      alert("Please Select Gender");
    } else if (address == "") {
      setaddressError('#85060F')
    } else if (age1 > 18 && age1 < 50) {
      Registered()
      profFunct()
    } else {
      alert("Enter Age Greater then 18 & Age Less then 50");
    }
  };

  const Registered = () => {
    let url = `https://bloodlinks.in/signup?cust_first_name=${name}
    &cust_mid_name="gurjar"&cust_last_name="raghav"&
    cust_fname=${fName}&cust_marital="Married"&
    cust_ph=${phone}&cust_gender=${gander}&
    cust_blood_group=${blood}&cust_states='1'&cust_districts='18'
    &cust_cities='6581'&cust_address=${address}&cust_pincode='456321'&
    cust_username=${'null'}&cust_password=${'null'}&
    cust_conf_password=${password}&dob=${Dob}`

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    let data = {
      cust_first_name: name, cust_mid_name: "gurjar",
      cust_last_name: lastName, cust_fname: fName, cust_marital: 'Married',
      cust_ph: phone, cust_gender: gander, cust_blood_group: blood,
      cust_states: 1, cust_districts: 18, cust_cities: 6581,
      cust_address: address, cust_pincode: '456321', cust_username: 'null',
      cust_password: 'null', cust_conf_password: 'null',
      cust_email: email, age: age1, dob: Dob
    }
    // console.log("---------------Data", data);
    fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify(data),
      headers: headers,
    })
      .then((Response) => Response.json())
      .then((Response) => {
        //  const loggedIn = AsyncStorage.setItem('loggedIn', JSON.stringify(true))
        console.log('RESPONSE apiiii regisitation-------------->>>>', Response)
        setage(Response.age)
        if (Response.status == true) {
          alert("user Signup successfully");
          navigation.navigate('OtpSinup', {
            // name:name,
            deta: data,
            // mid_name:"gurjar",
            // lastName:lastName,
            // fName:fName,
            // marital:'Married',
            // Number:phone,
            // gender:gander,
            // blood:blood,
            // states:1,
            // districts:18,
            // cities:6581,
            // address:address,
            // incode:'456321',
            // email:email
          })
        } else {
          alert("this username is already exists");
        }

      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })
  }

  return (

    < View style={styles.container}>
      <StatusTopBar />
      <View>
        <ScrollView >
          <ImageBackground
            style={styles.loginbg}
            source={require('../assets/Images/loginBG.png')}>
            <View style={styles.loginTopimg}>
              <View style={styles.loginTopimgbg}>
                <Image
                  style={styles.loginTopimgs}
                  source={require('../assets/Images/loginTopImage.png')}
                />
              </View>
            </View>

            <ImageBackground
              style={styles.loginbtmimgs}
              source={require('../assets/Images/loginBtmImage.png')}
            >


              <KeyboardAwareScrollView style={styles.forms}>
                <View style={[styles.loginTitle, { marginTop: moderateScale(50) }]}>
                  <Text style={styles.loginTitle}>welcome to bloodlinks</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: moderateScale(20) }}>
                  <View>
                    <TextInput
                      style={styles.input}
                      placeholder="Name"
                      placeholderTextColor="#6B6B6B"
                      // keyboardType="email-address"
                      inlineImageLeft="../assets/icons/name.png"
                      onChangeText={setname}
                      value={name}
                      borderColor={name ? Grey : nameError}
                    />
                  </View>

                  <View>
                    <TextInput
                      style={styles.input}
                      placeholder="Last Name"
                      placeholderTextColor="#6B6B6B"
                      keyboardType="email-address"
                      value={lastName}
                      onChangeText={setlastName}
                      borderColor={lastName ? Grey : lastError}
                    />
                  </View>
                  <View>
                    <TextInput
                      style={styles.input}
                      placeholder="Father Name"
                      placeholderTextColor="#6B6B6B"
                      keyboardType="email-address"
                      value={fName}
                      onChangeText={setfName}
                      borderColor={fName ? Grey : fNameError}
                    />
                  </View>
                  <View>
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="#6B6B6B"
                      keyboardType="email-address"
                      onChangeText={setemail}
                      value={email}
                      borderColor={email ? Grey : emailError}
                    />
                  </View>

                  <TextInput
                    style={styles.input}
                    keyboardType={'numeric'}
                    maxLength={10}
                    placeholder="Phone"
                    placeholderTextColor="#6B6B6B"
                    onChangeText={setphone}
                    value={phone}
                    borderColor={phone ? Grey : phoneError}
                  />
                  <View>
                    <View style={{
                      height: height * 0.07,
                      width: width * 0.8,
                      borderWidth: scale(1.40),
                      padding: width * 0.03,
                      borderRadius: 5,
                      //  borderColor={Dob ? 'Grey' : DobError},
                      marginBottom: scale(15)
                    }} >
                      <Text style={{ color: 'grey', letterSpacing: 1, fontSize: scale(15), fontWeight: '400', marginBottom: scale(2) }} onPress={showDatePicker}>{Dob}</Text>
                    </View>
                    <DateTimePickerModal
                      isVisible={pickerMode !== null}
                      mode={pickerMode}
                      onConfirm={handleConfirm}
                      onCancel={hidePicker}
                      display="default"
                    />
                  </View>

                  <View style={styles.profileDeatils}>
                    <RadioButton
                      value="male"
                      color={DANGER}
                      status={gander === 'male' ? 'checked' : 'unchecked'}
                      onPress={() => setgander('male')}
                    />
                    <Text style={{ fontSize: 15, }}>MALE</Text>

                    <RadioButton
                      value="female"
                      color={DANGER}
                      status={gander === 'female' ? 'checked' : 'unchecked'}
                      onPress={() => setgander('female')}
                    />
                    <Text style={{ fontSize: 15, }}>FEMALE</Text>
                  </View>

                  <TextInput
                    style={styles.input}
                    placeholder="Address"
                    placeholderTextColor="#6B6B6B"
                    onChangeText={setaddress}
                    value={address}
                    borderColor={address ? Grey : addressError}
                  />

                  <View style={{ flex: 1, width: '100%', justifyContent: 'center', marginLeft: scale(20) }}>
                    <Dropdown
                      style={[styles.input, isFocus3 && { borderColor: '#85060F' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemContainerStyle={{ borderColor: 'gray', borderWidth: 1.5, }}
                      containerStyle={{ borderColor: 'gray', borderWidth: 1, }}
                      activeColor='#FDDDE0'
                      dropdownPosition='bottom'
                      data={data}
                      search
                      maxHeight={250}
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Blood Group'}
                      searchPlaceholder="Search..."
                      value={blood}
                      onFocus={() => setIsFocus3(true)}
                      onBlur={() => setIsFocus3(false)}
                      onChange={item => {
                        setblood(item.value);
                        setIsFocus3(false);
                      }}

                    />
                    <Dropdown
                      style={[styles.input, isFocus1 && { borderColor: '#85060F' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemContainerStyle={{ borderColor: 'gray', borderWidth: 1.5, }}
                      containerStyle={{ borderColor: 'gray', borderWidth: 1, }}
                      activeColor='#FDDDE0'
                      dropdownPosition='bottom'
                      data={statesData}
                      search
                      maxHeight={250}
                      labelField="label"
                      valueField="value"
                      placeholder={'Select States'}
                      searchPlaceholder="Search..."
                      value={state}
                      onFocus={() => setIsFocus1(true)}
                      onBlur={() => setIsFocus1(false)}
                      onChange={item => {
                        setstate(item.value);
                        handleDistrict(item.value)
                        setIsFocus1(false);
                      }} />
                    <Dropdown
                      style={[styles.input, isFocus2 && { borderColor: '#85060F' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemContainerStyle={{ borderColor: 'gray', borderWidth: 1.5, }}
                      containerStyle={{ borderColor: 'gray', borderWidth: 1, }}
                      activeColor='#FDDDE0'
                      dropdownPosition='bottom'
                      data={districtsData}
                      search
                      maxHeight={250}
                      labelField="label"
                      valueField="value"
                      placeholder={'Select City'}
                      searchPlaceholder="Search..."
                      value={district}
                      onFocus={() => setIsFocus2(true)}
                      onBlur={() => setIsFocus2(false)}
                      onChange={item => {
                        setdistrict(item.value);
                        setIsFocus2(false);
                      }}

                    />

                  </View>



                  <TouchableOpacity onPress={() => Submit()}>
                    <View style={styles.butttons}>
                      <Text style={styles.loginbtn}>Signup</Text>
                    </View>
                  </TouchableOpacity>

                  <View style={{ flexDirection: 'row', width: '100%', height: moderateScale(50), alignItems: 'center', justifyContent: 'center', }}>
                    <Text
                      style={{ fontSize: scale(14), fontWeight: '400', color: 'grey' }}>
                      Allready have an account
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Login')}>
                      <Text
                        style={{
                          textDecorationLine: 'underline',
                          fontSize: scale(13),
                          fontWeight: '600',
                          marginLeft: 5,
                          color: 'black',
                        }}>
                        Login
                      </Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </KeyboardAwareScrollView>
            </ImageBackground>
          </ImageBackground>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginbg: {
    justifyContent: 'center',
    marginBottom: moderateScale(10)
  },
  loginTopimg: {
    justifyContent: 'center',
    height: moderateScale(170),
    width: width * 0.4,
    paddingHorizontal: width * 0.1,
    marginTop: height * 0.07,
    marginBottom: height * 0.01,
  },
  loginTopimgbg: { height: height * 0.40, width: width * 0.8 },
  loginTopimgs: {
    height: height * 0.39,
    width: width * 0.8,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: width * 0.05,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: width * 0.8,
    height: height * 0.4,
    // justifyContent:'center',
    // alignItems:'center',
    backgroundColor: '#fff',
    // opacity:0.4,
    borderRadius: 20,
    padding: 30,
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  profileDeatils: {
    marginBottom: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eae8e8',
    width: '90%',
    height: moderateScale(50),
    elevation: 6,
    color: "black",
    flexDirection: 'row',
  },


  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },

  inputSearchStyle: {
    height: 45,
    fontSize: 18,
    width: '90%',
    marginLeft: 16,
  },
  loginBtmimg: {
    height: height * 1.1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  loginbtmimgs: {
    //   paddingBottom: 70,
    height: height * 1.3,
    width: width * 1,
    justifyContent: 'center', alignItems: 'center',
    // backgroundColor:'pink'
  },
  loginbtmimgss: {
    //   paddingBottom: 70,
    height: height * 0.7,
    width: width * 1,
    justifyContent: 'center', alignItems: 'center',
  },
  forms: {
    position: 'absolute',
    flex: 1,
    // height: height*5

  },
  loginTitle: {
    width: '100%',
    marginBottom: moderateScale(5),
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: scale(22),
    letterSpacing: 1,
    height: moderateScale(30),
    flexDirection: 'column',
    color: 'black',
  },
  input: {
    height: height * 0.07,
    width: width * 0.8,
    borderWidth: scale(1.40),
    padding: width * 0.03,
    borderRadius: 5,
    letterSpacing: 1,
    fontSize: scale(16.5),
    fontWeight: '400',
    color: 'black',
    marginBottom: scale(15)
  },
  loginbtn: {
    color: COLOR.WHITE,
    backgroundColor: '#85060F',
    paddingVertical: height * 0.012,
    width: width * 0.75,
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: '500',
    fontSize: width * 0.039,
    // elevation:10,
    borderWidth: 2,
    borderColor: '#9B333B',
    marginTop: 10,
  },
});
export default SignUp;