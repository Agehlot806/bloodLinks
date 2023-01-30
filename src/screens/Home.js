import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity, BackHandler, Alert
} from 'react-native';
import StatusTopBar from '../Components/StatusTopBar';
import { useNavigation, DrawerActions, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import PropTypes from 'prop-types';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import image from '../assets/Images';
import { COLOR } from '../constants/colorConstants';
const { width, height } = Dimensions.get('window');

const HOME = ({ route }) => {
  const navigation = useNavigation();
  const data = [
    { pic: image.Page1 },
    { pic: image.Page2 },
    { pic: image.Page3 },
  ];
  const data1 = [
    { pic: image.Page3 },
    { pic: image.Page2 },
    { pic: image.Page1 },
  ];
  const LoginUserId = async () => {
    console.log('hello user id home param', route.params.user)
    const item = (route.params.user);
    try {
      await AsyncStorage.setItem('User', item)
    } catch (e) {
      // console.log("SetItem error idd", e)
    }
  }
  const [name, setname] = useState();
  const [Lastname, setLastname] = useState();
  const IdFunct = async () => {
    const IdUser = await AsyncStorage.getItem('User')
    const IdUse = await AsyncStorage.getItem('User1')
    console.log('user iddddd helloo check', IdUser)
    console.log('user1 iddddd helloo check', IdUse)
    if (IdUser == null) {
      LoginUserId()
    } else {
      console.log('user helooo check else', IdUser)
      console.log('user1 helooo check else', IdUse)
    }
  }
  const Gender = async () => {
    const IdUser = await AsyncStorage.getItem('User')
    const IdUse = await AsyncStorage.getItem('User1')
    console.log('userId ------------>>>async', IdUser)
    console.log('userId1 ------------>>>async', IdUse)
  }
  useEffect(() => {
    IdFunct()
    Gender()
    const backAction = () => {
      Alert.alert("BloodLink Application", "Are you sure you want to exit ?", [
        {
          text: "NO",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);


  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: scale(330),
          height: moderateScale(179),
          marginHorizontal: scale(10),
          backgroundColor: 'white',
          shadowColor: 'grey',
          borderWidth: scale(2),
          borderColor: '#93121B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          elevation: 3,
          marginTop: moderateScale(12),
        }}>
        <Image
          style={{ height: scale(164), width: '100%' }}
          resizeMode={'contain'}
          source={item.pic}
        />
      </View>
    );
  }
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        IdFunct()
        Gender()
        ProfileDta()
      }, 10)
    }, [])
  );
  const ProfileDta = async () => {
    const IdUser = await AsyncStorage.getItem('User')
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
        console.log('RESPONSE apiiii Profile name-------------->>>>', Response[0].first_name)
        console.log('RESPONSE apiiii Profile last-------------->>>>', Response[0].last_name)
        setname(Response[0].first_name)
        setLastname(Response[0].last_name)
      })
      .catch((error) => {
        alert("Network Server Error");
        console.error("ERROR FOUND" + error);
      })
  }

  const HeaderHome = () => {
    return (
      <View style={styles.homeHeader}>
        <View style={styles.homeSearchHeader}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image
              style={styles.heardingMenuImg}
              source={image.menu}
            />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View>
              <Image
                style={{ height: scale(26), width: scale(26), tintColor: 'white' }}
                source={image.profile}
              />
            </View>
            <View style={{ height: scale(40), width: scale(210), alignItems: 'flex-start', justifyContent: 'center', paddingLeft: scale(7), }}>
              <Text style={{ color: 'white', fontSize: scale(13), fontWeight: '600', width: scale(210), }}>Welcome {name}{''}{Lastname}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.heardingArrow}
            onPress={() => navigation.navigate('Notificationscreen', {
              paramKey: name,
            })}>
            <Image
              style={styles.heardingArrowImg}
              source={image.Notification}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <StatusTopBar />
      <HeaderHome />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: scale(180), alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <SwiperFlatList
            autoplay
            autoplayDelay={3}
            autoplayLoop
            index={2}
            data={data}
            renderItem={_renderItem}
          />
        </View>
        <View style={{ height: moderateScale(170), flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: moderateScale(7), backgroundColor: '#f4f4f4', marginHorizontal: scale(2) }}>
          <TouchableOpacity onPress={() => navigation.navigate('BloodBank')} style={{
            height: moderateScale(145),
            width: '31%',
            borderWidth: 2,
            borderColor: "#E8E8E8",
            borderRadius: 8,
            backgroundColor: "#FFFFFF",
            margin: scale(7)
          }}>
            <View style={{
              height: moderateScale(80),
              width: '100%',
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Image
                style={{ height: scale(55), width: scale(55) }}
                source={require('../assets/icons/FindBlood.png')}
              />
            </View>
            <View style={{
              height: moderateScale(40),
              width: scale(105),
              justifyContent: "center",
              alignItems: "center",
              top: scale(5),
            }}>
              <Text style={{ color: "#000000", fontSize: scale(10.5), textAlign: "center", fontWeight: "600", width: scale(90) }}>Find Blood Banks</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Hospitals')}
            style={{
              height: moderateScale(145),
              width: '31%',
              borderWidth: 2,
              borderColor: "#E8E8E8",
              borderRadius: 8,
              backgroundColor: "#FFFFFF",
            }}>
            <View style={{
              height: moderateScale(80),
              width: '100%',
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Image
                style={{ height: scale(55), width: scale(55) }}
                source={require('../assets/icons/hospital.png')}
              />
            </View>

            <View style={{
              height: moderateScale(40),
              width: scale(105),
              justifyContent: "center",
              alignItems: "center",
              top: scale(5),
            }}>
              <Text style={{ color: "#000000", fontSize: scale(10.5), textAlign: "center", fontWeight: "600", width: scale(90) }}>Find Hospitals</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Labs')} style={{
            height: moderateScale(145),
            width: '31%',
            borderWidth: 2,
            borderColor: "#E8E8E8",
            borderRadius: 8,
            backgroundColor: "#FFFFFF",
            margin: scale(7),
          }}>
            <View style={{
              height: moderateScale(80),
              width: '100%',
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Image
                style={{ height: scale(55), width: scale(55) }}
                source={require('../assets/icons/contribute.png')}
              />
            </View>
            <View style={{
              height: moderateScale(40),
              width: scale(105),
              justifyContent: "center",
              alignItems: "center",
              top: scale(5),
            }}>
              <Text style={{ color: "#000000", fontSize: scale(10.5), textAlign: "center", fontWeight: "600", width: scale(90) }}>Find Labs</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation.navigate('FirstForm')}>
            <Text style={{ color: 'white', fontSize: scale(15), fontWeight: '600', textAlign: 'center', width: '100%' }}>DONATE BLOOD</Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(10), width: '100%' }}>
          <TouchableOpacity
            style={[styles.headerBtn, { backgroundColor: 'black' }]}
            onPress={() => navigation.navigate('RequestBlood')}>
            <Text style={{ color: 'white', fontSize: scale(15), fontWeight: '600', textAlign: 'center', width: '100%' }}>REQUEST BLOOD</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: scale(260), alignItems: 'center', justifyContent: 'center', width: '100%', marginLeft: scale(3) }}>
          <SwiperFlatList
            autoplay
            autoplayDelay={3}
            autoplayLoop
            index={2}
            data={data1}
            renderItem={_renderItem}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  hearding: {
    alignItems: 'center',
    height: height * 0.06,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: COLOR.WHITE,
  },

  homeHeader: {
    height: height * 0.1,
    backgroundColor: COLOR.PRIMARY,
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.02,
  },
  homeSearchHeader: {
    flexDirection: 'row',
    marginBottom: height * 0.03,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerBtn: {
    height: moderateScale(50),
    backgroundColor: '#b31d27',
    justifyContent: 'center',
    width: '90%',
    alignItems: 'center',
  },
  container: { flex: 1, backgroundColor: 'white', },
  child: { width, justifyContent: 'center' },
  text: { fontSize: width * 0.5, textAlign: 'center' },
  seeDonor: {
    backgroundColor: COLOR.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: height * 0.05,
    paddingVertical: height * 0.03,
    width: "100%",
  },
  heardingArrow: {
    height: scale(30),
    width: width * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heardingArrowImg: {
    height: scale(23),
    width: scale(23),
    alignItems: 'center',
    justifyContent: 'center'
  },
  heardingSearch: {
    height: height * 0.025,
    width: width * 0.043,
  },
  heardingMenuImg: {
    height: scale(23),
    width: scale(25),
    marginLeft: scale(8),
  },
  headerContent: {
    flexDirection: 'row',
    width: '75%',
    alignItems: 'center',
    borderRadius: width * 0.02,
    marginLeft: 10,
  },
});
export default HOME;
