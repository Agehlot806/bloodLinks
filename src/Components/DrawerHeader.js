import React, { useRef, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity,   } from 'react-native';
import {useNavigation } from '@react-navigation/native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import image from '../assets/Images';

const DrawerHeader = (props) => {
  const navigation =useNavigation()
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState("left");
  const { name, image1, } = props;

  return (
    <View style={{
      height: moderateScale(50),
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flexDirection: "column",
      backgroundColor: "#F5F5F5"
    }}>
      <View style={{
        height: moderateScale(43),
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: "row",
       }}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{
          height: moderateScale(40),
           width: "15%",
          alignItems: 'center',
          justifyContent: 'center',
         }}
        // onPress={() => navigation.goBack()}
        >
          <Image
            style={{
              height: 30, width: 30,
              marginLeft: 5
            }}
            source={image.back}
          />
        </TouchableOpacity>
        <View style={{
          height: moderateScale(40),
          paddingTop:moderateScale(8),
           width: '80%',
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Text style={{ textAlign: "center", color: "#000000", fontSize: scale(17), marginBottom: scale(8.5) }}>{name}</Text>
        </View>
        <View style={{
          height: moderateScale(44),
          padding: moderateScale(5),
          width: '13%',
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}>
          {image1 &&
            <TouchableOpacity style={{
              height: moderateScale(40), with: 100,
            }}
            >
              <Image
                style={{
                  height: 20, width: 20,
                  marginLeft: 5
                }}
                source={image.menu}
              />
            </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  );
}

export default DrawerHeader;
