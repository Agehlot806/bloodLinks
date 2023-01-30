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
import { moderateScale, scale } from 'react-native-size-matters';
import image from '../assets/Images';
const slides = [
  {
    key: 1,
    image: image.slider1,
    // backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    image: image.slider2,
    // backgroundColor: '#febe29',
  },
  {
    key: 3,
    image: image.slider3,
    // backgroundColor: '#22bcb5',
  },

];
const Slider = (props) => {
  const navigation = props.navigation;
  const [showRealApp, setShowRealApp] = useState(false);

  const renderItem = ({ item }) => {
    return (

      <View style={{ flex: 1, }}>
        <StatusTopBar />
        <ImageBackground source={item.image} style={styles.image} resizeMode={'cover'}>

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
  const onDone = async () => {
    setShowRealApp(true);
    const IdUser = await AsyncStorage.getItem('User')
    if (IdUser == null) {
      navigation.navigate("Login")
      // navigation.navigate('Home')
    } else {
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
      activeDotStyle={{ width: 15, backgroundColor: COLOR.BLACK }}
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setmargin: {
    top: width * 1.18,
  },
  imgTxt: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    height: scale(90),
    marginTop: moderateScale(6)
  },
  Txt: {
    color: COLOR.WHITE,
    fontSize: scale(16),
    fontWeight: 'bold',
    marginTop: height * 0.025, width: '100%'
  },
});
export default Slider;