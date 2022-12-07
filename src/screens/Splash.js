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
import { useFocusEffect } from '@react-navigation/native';

const Splash = props => {
  const navigation = props.navigation;

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        // navigation.navigate("Maps")
        navigation.navigate("Slider")
      }, 1000)
    }, [])

  );
  return (
    <SafeAreaView>
      <StatusTopBar />
      <View style={styles.container}>
        <Image
          source={require('../assets/Images/splash.png')}
          style={styles.image}
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: height * 1,
    width: width * 1,
  },
});

export default Splash;