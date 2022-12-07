import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import StatusTopBar from '../Components/StatusTopBar';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from "@react-native-async-storage/async-storage";
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;
const { width, height } = Dimensions.get('window');
import { COLOR } from '../constants/colorConstants';
const slides = [
  {
    key: 1,
    title: 'Donate Blood',
    text: 'Donate Blood - Help Building Community',
    image: require('../assets/Images/slider1.png'),

    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Ralse Request',
    text: 'Building Nation',
    image: require('../assets/Images/slider2.png'),

    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Discover Products',
    text: 'Automated WorkFlows',
    image: require('../assets/Images/slider3.png'),

    backgroundColor: '#22bcb5',
  },
  {
    key: 4,
    title: 'Security and Privacy',
    text: 'Adherence to health and data',
    text1: 'Privacy standards',
    image: require('../assets/Images/slider4.png'),
    backgroundColor: '#22bcb5',
  },
];
const Slider = (props) => {
  const navigation = props.navigation;
  const [showRealApp, setShowRealApp] = useState(false);
 
  const renderItem = ({ item }) => {
    return (
       
      <View>
        <StatusTopBar />
        <ImageBackground source={item.image} style={styles.image}>
          <View style={styles.setmargin}>
            <View style={styles.imgTxt}>
              <Text style={styles.Txt}>{item.title}</Text>
              <Text
                style={[styles.Txt, { fontWeight: '400', fontSize: width * 0.05 }]}>
                {item.text}
              </Text>
              <Text
                style={[
                  styles.Txt,
                  { fontWeight: '400', fontSize: width * 0.05, marginTop: 0 },
                ]}>
                {item.text1}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };
  //  useEffect(() => {
  //   IdUser()
  // }, [UseId]);

  // const IdUser = async () => {
  //   const IdUser = await AsyncStorage.getItem('User')
  //   console.log('heelooo---UserId-----async---->', IdUser)
  //   setUseId(IdUser)
  // }
  const onDone =async() => {
    setShowRealApp(true);
    const IdUser = await AsyncStorage.getItem('User')
    if (IdUser == null){
      navigation.navigate("Login")
     }else{
      navigation.navigate('Home')
    }
  };
  const onSkip = () => {
    setShowRealApp(true);
    onDone()
  };
  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      onSkip={onSkip}
      showSkipButton={true}
      activeDotStyle={{ width: 15, backgroundColor: COLOR.DROPDOWNBG }}
      dotStyle={{ backgroundColor: COLOR.DROPDOWNBG }}
    />
  );
}

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height * 1,
    width: width * 1,
  },
  setmargin: {
    top: width * 1.18,
  },
  imgTxt: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Txt: {
    color: COLOR.WHITE,
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginTop: height * 0.025,
  },
});
export default Slider;