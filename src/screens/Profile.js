import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { COLOR } from '../constants/colorConstants';
import StatusTopBar from '../Components/StatusTopBar';
const { width, height } = Dimensions.get('window');
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, StackActions } from '@react-navigation/native';
import { moderateScale, scale } from 'react-native-size-matters';
import DrawerHeader from '../Components/DrawerHeader';
import image from '../assets/Images';
const Profile = props => {
  const navigation = props.navigation;
  const [name, setname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [Age, setAge] = useState('');
  const [blood_group, setblood_group] = useState('');
  const [address, setaddress] = useState('');
  const [Gender, setGender] = useState('');
  const [saveaImage, setSaveaImage] = useState();
  const [Data, setData] = useState([]);

  useEffect(() => {
    ProfileDta()
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      ProfileDta()
    }, [])
  );

  useEffect(() => {
    console.log('hellooo profile', Data)
    setname(Data.first_name)
    setLastname(Data.last_name)
    setemail(Data.email)
    setphone(Data.ph_no)
    setAge(Data.age)
    setGender(Data.gender)
    setblood_group(Data.master_type_key_value)
    setaddress(Data.address)
  }, [Data]);

  const ProfileDta = async () => {
    const IdUser = await AsyncStorage.getItem('User')
    const pic = await AsyncStorage.getItem('Photo');
    setSaveaImage(pic)
    let url = `https://bloodlinks.in/myprofile_data`   //API to 
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        user_id: IdUser,
      }),
      headers: headers,
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log('RESPONSE apiiii Profile-------------->>>>', Response)
        setData(Response[0])
        setSaveaImage(pic);
      })
      .catch((error) => {
        alert("Network Server Error");
        console.error("ERROR FOUND" + error);
       })
  }

  const profFunct = async () => {
    await AsyncStorage.removeItem('User')
    await AsyncStorage.removeItem('Photo')
    navigation.dispatch(StackActions.replace('Login'))
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusTopBar />
      <DrawerHeader name={'My Profile'} image1={true} />
      <View style={styles.profile}>
        <View style={{ height: moderateScale(125), width: '100%', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column', }}>
          <View style={{ height: moderateScale(110), width: '30%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 100, flexDirection: 'row' }}>
            <Image
              style={{ height: moderateScale(105), width: '95%', borderRadius: 100 }}
              resizeMode='cover'
              source={{ uri: saveaImage }}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileEdit')} style={{ height: scale(35.5), width: '10%', backgroundColor: 'white', bottom: scale(35), left: scale(35), borderRadius: scale(20), alignItems: 'center', padding: scale(1) }}>
            <Image
              style={{ height: 45, width: 45, bottom: 2.6, }}
              source={require('../assets/icons/edit1.png')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.profileName}>{name} {Lastname}</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1, width: '100%', }}>
        <View style={styles.profileDeatils}>
          <View style={styles.imgCon}>
            <Image
              style={styles.icon}
              source={require('../assets/icons/email.png')}
            />
          </View>
          <Text style={styles.profileDeatilsTitle}>{email}</Text>
        </View>
        <View style={styles.profileDeatils}>
          <View style={styles.imgCon}>
            <Image
              style={styles.icon}
              source={require('../assets/icons/phone.png')}
            />

          </View>
          <Text style={styles.profileDeatilsTitle}>{phone}</Text>
        </View>
        <View style={styles.profileDeatils}>
          <View style={styles.imgCon}>
            <Image
              style={styles.icon}
              source={require('../assets/icons/age.png')}
            />

          </View>
          <Text style={styles.profileDeatilsTitle}>{Age}</Text>
        </View>
        <View style={styles.profileDeatils}>
          <View style={styles.imgCon}>
            <Image
              style={[styles.icon, { height: height * 0.05, width: width * 0.09, }]}
              source={require('../assets/icons/lavatory.png')}
            />
          </View>
          <Text style={styles.profileDeatilsTitle}>{Gender}</Text>
        </View>
        <View style={styles.profileDeatils}>
          <View style={styles.imgCon}>
            <Image
              style={styles.icon}
              source={require('../assets/icons/bloodDrop.png')}
            />
          </View>
          <Text style={styles.profileDeatilsTitle}>{blood_group}</Text>
        </View>
        <View style={styles.profileDeatils}>
          <View style={styles.imgCon}>
            <Image
              style={styles.icon}
              source={require('../assets/icons/location1.png')}
            />

          </View>
          <Text style={styles.profileDeatilsTitle}>{address}</Text>
        </View>
        <TouchableOpacity onPress={() => profFunct()} style={[styles.profileDeatils, { marginBottom: scale(80) }]}>
          <View style={styles.imgCon}>
            <Image
              style={styles.icon}
              source={image.logOut}
            />

          </View>
          <Text style={styles.profileDeatilsTitle}>LogOut</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.WHITE,
  },
  profile: {
    height: moderateScale(200),
    backgroundColor: 'black',
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowColor: 'lightgrey',
    shadowOpacity: 0.7,
    shadowRadius: 8,
    marginBottom: moderateScale(25),
    paddingTop: moderateScale(18)
  },
  profileName: {
    color: 'white',
    fontSize: scale(19),
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
    width: scale(230),
  },
  profileDeatils: {
    marginBottom: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#eae8e8',
    width: '90%',
    marginLeft: 20,
    height: moderateScale(70),
    elevation: 6,
    color: "black",
    flexDirection: 'row',
  },

  profileDeatilsTitle: {
    fontSize: scale(14),
    color: 'black',
    paddingRight: width * 0.13,
    width: '71%',
    fontWeight: '500',
  },
  profileDeatil: {
    fontSize: width * 0.05,
    color: 'grey',
  },
  imgCon: {
    flexDirection: 'row',
    width: '22%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  icon: {
    height: height * 0.04,
    width: width * 0.08,
    marginRight: width * 0.05,
    tintColor: '#b31d27'
  },
});
export default Profile;
