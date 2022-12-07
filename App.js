/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import MyDrawer from './src/navigation/Drawer';
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
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
    <MyDrawer />
  );
};
export default App;

 