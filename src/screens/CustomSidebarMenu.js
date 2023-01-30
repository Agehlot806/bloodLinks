import React, { useState, useEffect, useContext } from 'react';
import { Pressable, Dimensions, StyleSheet, View, Text, Image, ScrollView, Share, Linking } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import image from '../assets/Images';
import { moderateScale, scale } from 'react-native-size-matters';

const CustomSidebarMenu = props => {
  const navigation = props.navigation;
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'https://play.google.com/store/apps/details?id=com.bloodlinks&hl=en',
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
          width: '65%',
          height: moderateScale(160),
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={styles.Drawerscenestyle}>
          <Image
            source={image.homeIcon}
            style={{
              width: '23%',
              height: scale(32),
              marginRight: scale(15),
              marginLeft: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', width: scale(140), fontSize: scale(14), fontWeight: '500', textAlign: 'left' }}>{'Home'}</Text>
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
              width: '23%',
              height: scale(33),
              marginRight: scale(15),
              marginLeft: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', width: scale(140), fontSize: scale(14), fontWeight: '500', textAlign: 'left' }}>{'My Profile'}</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => onShare()}
          style={styles.Drawerscenestyle}>
          <Image
            source={image.refer}
            style={{
              width: '23%',
              height: scale(27),
              marginRight: scale(15),
              marginLeft: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', width: scale(140), fontSize: scale(14), fontWeight: '500', textAlign: 'left' }}>{'Refer Friend'}</Text>
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
              width: '23%',
              height: scale(30),
              marginRight: scale(15),
              marginLeft: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', width: scale(140), fontSize: scale(14), fontWeight: '500', textAlign: 'left' }}>{'Donate History'}</Text>
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
              width: '22%',
              height: scale(29),
              marginRight: scale(15),
              marginLeft: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', width: scale(140), fontSize: scale(14), fontWeight: '500', textAlign: 'left' }}>{'Requests'}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Hospitals');
          }}
          style={styles.Drawerscenestyle}>
          <Image
            source={image.hospital}
            style={{
              width: '23%',
              height: scale(29),
              marginRight: scale(15),
              marginLeft: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', width: scale(140), fontSize: scale(14), fontWeight: '500', textAlign: 'left' }}>{'Hospital Services'}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            Linking.openURL('https://www.bloodlinks.in/about')
          }}
          style={styles.Drawerscenestyle}>
          <Image
            source={image.about}
            style={{
              width: '23%',
              height: scale(29),
              marginRight: scale(15),
              marginLeft: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', width: scale(140), fontSize: scale(14), fontWeight: '500', textAlign: 'left' }}>{'About Us'}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => profFunct()}
          style={styles.Drawerscenestyle}>
          <Image
            source={image.logOut}
            style={{
              width: '23%',
              height: scale(27),
              marginRight: scale(15),
              marginLeft: scale(10),
              tintColor: 'white'
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: 'white', width: scale(140), fontSize: scale(14), fontWeight: '500', textAlign: 'left' }}>{'LogOut'}</Text>
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
    height: moderateScale(70),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: "#b31d27"
  },

})