import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, CheckBox, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { moderateScale, scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import color from '../../styles/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerHeader from '../../Components/DrawerHeader';

const Fourt = () => {
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const navigation = useNavigation()



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "column", }}>
      <DrawerHeader name={'Blood Donation'} image1={false} />
      <View style={{ height: moderateScale(35), width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: moderateScale(10), backgroundColor: 'black' }}>
        <Text style={{ fontSize: scale(18), color: 'white' }}>
          Step 4
        </Text>
      </View>
      <ScrollView>
        <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center',width: '100%', marginBottom: moderateScale(159) }}>
            <Text style={{ fontSize: 20, fontWeight: '200', top: scale(5), color: 'black' }}>REQUEST FOR BLOOD DONATION</Text>
            <View style={{ backgroundColor: 'white', height: moderateScale(300), width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: moderateScale(10), shadowColor: '#171717', shadowOffset: { width: -2, height: 12 }, shadowOpacity: 5, shadowRadius: moderateScale(10), elevation: 20, marginTop: moderateScale(80),paddingHorizontal:25 }}>
              <Text style={{ fontSize: scale(18), color: 'black' }}>Thanks for filling up the form</Text>
              <View style={{ height: moderateScale(100), width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: scale(18), color: 'black' }}>Please click here to </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ScheduleAppointment')} style={{ backgroundColor: 'black', height: moderateScale(60), width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',  }}>
                <Text style={{ fontSize: scale(17), color:'white' }}>schedule appointment</Text>
              </TouchableOpacity>
            </View>



          </View>
        </View>
      </ScrollView>
    </View>
  );
};



export default Fourt;