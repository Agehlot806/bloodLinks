import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
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

const HOME = () => {
  const navigation = useNavigation();
  const [hospitalboollist, sethospitalboollist] = useState([]);
  const [ajaxRequesting, setAjaxRequesting] = useState(true);
  const data = [
    {
      pic: image.Page1,
    },
    {
      pic: image.Page2,
    },
    {
      pic: image.Page3,
    },
    {
      pic: image.Page4,
    },
    {
      pic: image.Page5,
    },
  ];
  const data1 = [

    {
      pic: image.Page2,
    },
    {
      pic: image.Page1,
    },
    {
      pic: image.Page4,
    },
    {
      pic: image.Page3,
    },
    {
      pic: image.Page5,
    },
  ];
  const [name, setname] = useState();
  const [Lastname, setLastname] = useState();
  const IdFunct = async () => {
    const IdUser = await AsyncStorage.getItem('User')
    console.log('hospital list', IdUser)
  }
  useEffect(() => {
    IdFunct()
    Gender()
  }, []);

  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          width: moderateScale(350),
          height: moderateScale(180),
          marginHorizontal: scale(16),
          backgroundColor: 'white',
          shadowColor: 'grey',
          borderWidth: scale(2),
          borderColor: '#93121B',
          borderRadius: moderateScale(10),
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          elevation: 3,
          marginTop: moderateScale(10),
        }}>
        <Image
          style={{ height: scale(160), width: '97%' }}
          resizeMode={'contain'}
          source={item.pic}
        />

      </View>
    );
  }
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
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
        console.log('RESPONSE apiiii Profile-------------->>>>', Response)
        console.log('RESPONSE apiiii Profile name-------------->>>>', Response[0].first_name)
        console.log('RESPONSE apiiii Profile last-------------->>>>', Response[0].last_name)

        setname(Response[0].first_name)
        setLastname(Response[0].last_name)
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
        // alert("Server Error !");
      })
  }
  const Gender = async () => {
    const IdUser = await AsyncStorage.getItem('User')
    console.log('userId ------------>>>async', IdUser)
  }


  let animation = React.createRef();
  useEffect(() => {
    animation?.current?.play();
  }, [ajaxRequesting]);
  return (

    <View style={styles.container}>
      <StatusTopBar />
      <View style={styles.homeHeader}>
        <View style={styles.homeSearchHeader}>
          <TouchableOpacity style={styles.heardingMenu} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} >
            <Image
              style={styles.heardingMenuImg}
              source={image.menu}
            />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View>
              <Image
                style={{ height: scale(30), width: scale(30), tintColor: 'white' }}
                source={image.profile}
              />
            </View>
            <View style={{ height: scale(40), width: scale(210), alignItems: 'flex-start', justifyContent: 'center', paddingLeft: scale(7) }}>
              <Text style={{ color: 'white', fontSize: scale(15), fontWeight: '700', letterSpacing: scale(0.15), }}>Welcome {name} {Lastname}</Text>
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
      <ScrollView>
        <SwiperFlatList
          autoplay
          autoplayDelay={3}
          autoplayLoop
          index={2}
          data={data}
          renderItem={_renderItem}
        />

        {/* {
            ajaxRequesting
              ? <LottieView
                ref={animation}
                loop={true}
                style={{
                  width: 150,
                  height: 150,
                  position: 'absolute',
                  top: 170,
                  left: 60,
                  // loop: true,
                  autoplay: true,
                }}
                source={require('../assets/icons/loader.json')}
              />
              : null
          } */}

        <View style={{ height: moderateScale(170), flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: moderateScale(7),margin: scale(4) }}>
          <TouchableOpacity onPress={() => navigation.navigate('BloodBank')} style={{
            height: moderateScale(150),
            width: '30%',
            borderWidth: 2,
            borderColor: "#E8E8E8",
            borderRadius: 8,
            backgroundColor: "#FFFFFF",
            margin: scale(5)
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
              height: moderateScale(20),
              width: 60,
              justifyContent: "center",
              alignItems: "center", marginLeft: moderateScale(20),
              top: scale(5),
            }}>
              <Text style={{ color: "#000000", fontSize: scale(14), textAlign: "center", top: scale(8), fontWeight: "600", width: scale(90) }}>Find Blood</Text>
              <Text style={{ color: "#000000", fontSize: scale(14), textAlign: "center", top: scale(10), fontWeight: "600", marginLeft: 3 }}>Banks </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Hospitals')}
            style={{
              height: moderateScale(150),
              width: '30%',
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
              height: moderateScale(20),
              width: 60,
              justifyContent: "center",
              alignItems: "center", marginLeft: moderateScale(20),
              top: scale(5),
            }}>
              <Text style={{ color: "#000000", fontSize: scale(14), textAlign: "center", top: scale(8), fontWeight: "600", width: scale(90) }}>Find </Text>
              <Text style={{ color: "#000000", fontSize: scale(14), textAlign: "center", top: scale(10), fontWeight: "600", width: scale(90), marginLeft: 3 }}>Hospitals</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Labs')} style={{
            height: moderateScale(150),
            height: moderateScale(150),
            width: '30%',
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
              height: moderateScale(20),
              width: 60,
              justifyContent: "center",
              alignItems: "center", marginLeft: moderateScale(20),
              top: scale(5),
            }}>
              <Text style={{ color: "#000000", fontSize: scale(14), textAlign: "center", top: scale(8), fontWeight: "600", width: scale(90), marginLeft: scale(7) }}>Find Labs</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', paddingHorizontal: 30 }}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation.navigate('FirstForm')}>
            <Text style={{ color: 'white', fontSize: scale(17.5), fontWeight: '600', textAlign: 'center' }}>DONATE BLOOD</Text>

          </TouchableOpacity>

        </View>

        <View style={{ justifyContent: 'center', paddingHorizontal: 30, marginTop: 10 }}>
          <TouchableOpacity
            style={[styles.headerBtn, { backgroundColor: 'black' }]}
            onPress={() => navigation.navigate('RequestBlood')}>
            <Text style={{ color: 'white', fontSize: scale(17.5), fontWeight: '600', textAlign: 'center' }}>REQUEST BLOOD</Text>
          </TouchableOpacity>

        </View>
        <SwiperFlatList
          autoplay
          autoplayDelay={3}
          autoplayLoop
          index={2}
          data={data1}
          renderItem={_renderItem}
        />
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({

  hearding: {
    alignItems: 'center',
    height: height * 0.06,
    justifyContent: 'center',
    // justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: COLOR.WHITE,
    // position: 'relative',
    // zIndex: 1000,
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
  },
  headerBtn: {
    height: moderateScale(50),
    backgroundColor: '#b31d27',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: { flex: 1, backgroundColor: 'white' },
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
    alignItems: 'center', justifyContent: 'center'
  },
  heardingArrowImg: {
    height: scale(28),
    width: scale(27),
    alignItems: 'center',
    justifyContent: 'center'

  },
  heardingSearch: {
    height: height * 0.025,
    width: width * 0.043,
  },
  heardingMenuImg: {
    height: scale(31),
    width: scale(32),
    marginLeft: scale(2),
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