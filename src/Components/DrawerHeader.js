import React, { useRef, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import image from '../assets/Images';

const DrawerHeader = (props) => {
  const navigation = useNavigation()
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
      backgroundColor: "#b31d27"
    }}>
      <View style={{
        height: moderateScale(43),
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: "row",
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{
          height: moderateScale(40),
          width: "15%",
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Image resizeMode='contain'
            style={{
              height: scale(32), width: scale(32), tintColor: '#F5F5F5'
            }}
            source={image.back}
          />
        </TouchableOpacity>
        <View style={{
          height: moderateScale(40),
          width: '80%',
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Text style={{ color: "#F5F5F5", fontSize: scale(16), fontWeight: '600', letterSpacing: 0.9, width: scale(150) }}>{name}</Text>
        </View>

      </View>
    </View>
  );
}

export default DrawerHeader;
