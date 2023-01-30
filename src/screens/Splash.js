import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import { Dimensions } from 'react-native';
import StatusTopBar from '../Components/StatusTopBar';
const { width, height } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import image from '../assets/Images';

const Splash = props => {
  const navigation = props.navigation;

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        // navigation.navigate("RequestAppointment")
        navigation.navigate("Slider")
      }, 1000)
    }, [])

  );
  return (
    <SafeAreaView>
      <StatusTopBar />
      <LinearGradient start={{ x: 1, y: 0.50 }} end={{ x: 0.9, y: 0.90 }} colors={['white', '#BB303A']} style={styles.image}>
        <View style={styles.container}>
          <View style={{
            height: scale(350),
            width: '100%', alignItems: 'center', justifyContent: 'flex-end',
            // backgroundColor: 'pink'
          }}>
            <Image
              resizeMode="contain"
              style={{
                width: '65%',
                height: scale(55),
              }}
              source={image.logo}
            />
          </View>
          <View style={{
            flex: 1,
            width: '85%', alignItems: 'center', justifyContent: 'flex-end',
            // backgroundColor: 'pink',
            paddingBottom: scale(35)
          }}>
            <Text style={{ color: 'white', fontSize: scale(13.8), fontWeight: '500', textAlign: 'center' }}>
              Copyright: Colossal Health Private Limited V 1.0.0
            </Text>

          </View>

        </View>
      </LinearGradient>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  image: {
    height: height * 1,
    width: width * 1,
  },
});

export default Splash;