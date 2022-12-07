import React, { useState, useEffect, useContext } from 'react';
import { Pressable, Dimensions, StyleSheet, View, Text, Image, ScrollView, Share } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import image from '../assets/Images';
import { moderateScale, scale } from 'react-native-size-matters';

const CustomSidebarMenu = props => {
  const navigation = props.navigation;
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };



  const profFunct = async () => {
    await AsyncStorage.removeItem('User')
    navigation.dispatch(StackActions.replace('Login'))

  }
  return (
    <View style={styles.Drawerstyle}>

      <View
        style={{
          padding: 5,
          height: moderateScale(200),
          backgroundColor: '#b31d27',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row'
        }}>
        <View style={{
          width: '75%',
          height: moderateScale(185),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: scale(100)
        }}>
          <Image
            resizeMode="contain"
            style={{
              width: '90%',
              height: scale(60),
            }}
            source={image.logo}
          />
        </View>
      </View>
      <ScrollView>
        <Pressable
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={styles.Drawerscenestyle}>
          <Image
            source={image.homeIcon}
            style={{
              width: '25%',
              height: scale(38),
              marginRight: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', fontSize: scale(17.5), fontWeight: '600', letterSpacing: 1, }}>{'Home'}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Profile');
          }}
          style={styles.Drawerscenestyle}>
          <Image
            source={image.profile}
            style={{
              width: '25%',
              height: scale(38),
              marginRight: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', fontSize: scale(17.5), fontWeight: '600', letterSpacing: 1, }}>{'My Profile'}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Maps');
          }}
          style={styles.Drawerscenestyle}>
          <Image
            source={image.map}
            style={{
              width: '25%',
              height: scale(38),
              marginRight: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', fontSize: scale(17.5), fontWeight: '600', letterSpacing: 1, }}>{'Map View'}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => onShare()}
          style={styles.Drawerscenestyle}>
          <Image
            source={image.refer}
            style={{
              width: '25%',
              height: scale(34),
              marginRight: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', fontSize: scale(17.5), fontWeight: '600', letterSpacing: 1, }}>{'Refer Friend'}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('DonerList');
          }}
          style={styles.Drawerscenestyle}>
          <Image
            source={image.donate}
            style={{
              width: '25%',
              height: scale(40),
              marginRight: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', fontSize: scale(17.5), fontWeight: '600', letterSpacing: 1, }}>{'Donate History'}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('RequestList');
          }}
          style={styles.Drawerscenestyle}>
          <Image
            source={image.blood}
            style={{
              width: '25%',
              height: scale(38),
              marginRight: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', fontSize: scale(17.5), fontWeight: '600', letterSpacing: 1, }}>{'Requests'}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={styles.Drawerscenestyle}>
          <Image
            source={image.hospital}
            style={{
              width: '26%',
              height: scale(42),
              marginRight: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', fontSize: scale(17.5), fontWeight: '600', letterSpacing: 1, }}>{'Hospital Services'}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Notificationscreen');
          }}
          style={styles.Drawerscenestyle}>
          <Image
            source={image.Notification}
            style={{
              width: '25%',
              height: scale(38),
              marginRight: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', fontSize: scale(17.5), fontWeight: '600', letterSpacing: 1, }}>{'Notifications'}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => profFunct()}
          style={styles.Drawerscenestyle}>
          <Image
            source={image.logOut}
            style={{
              width: '25%',
              height: scale(31),
              marginRight: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', fontSize: scale(17.5), fontWeight: '600', letterSpacing: 1, }}>{'LogOut'}</Text>
          </View>
        </Pressable>

      </ScrollView>
    </View>
  );
};

export default CustomSidebarMenu;
const styles = StyleSheet.create({
  Drawerstyle: {
    flex: 1,
    backgroundColor: "#b31d27"
  },
  Drawerscenestyle: {
    width: '100%',
    height: moderateScale(70),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: "#b31d27"
  },

})