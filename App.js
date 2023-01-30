/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
 import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  LogBox.ignoreAllLogs(true)
  useEffect(() => {
    Name()
  }, []);
  const Name = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Gender')
    } catch (e) {
      // read error
    }
  }
  return (
    //   <NavigationContainer>
    //  <RequestBlood/>
    //   </NavigationContainer>
    <StackNavigator />
  );
};
export default App;
