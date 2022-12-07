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
      <View style={{ height: moderateScale(35), width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: moderateScale(10), }}>
        <Text style={{ fontSize: scale(18) }}>
          Step 4
        </Text>
      </View>
      <ScrollView>
        <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', height: 'auto', width: '100%', marginBottom: moderateScale(159) }}>
            <Text style={{ fontSize: 20, }}>REQUEST FOR BLOOD DONATION</Text>
            <View style={{ backgroundColor: 'white', height: moderateScale(300), width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: moderateScale(10), shadowColor: '#171717', shadowOffset: { width: -2, height: 12 }, shadowOpacity: 5, shadowRadius: moderateScale(10), elevation: 20, marginTop: moderateScale(30) }}>
              <Text style={{ fontSize: scale(18), color: 'black' }}>Thanks for filling up the form</Text>
              <View style={{ height: moderateScale(100), width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: scale(18), color: 'black' }}>Please click here to </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ScheduleAppointment')} style={{ backgroundColor: '#d3d1d1', height: moderateScale(60), width: '80%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: moderateScale(10) }}>
                <Text style={{ fontSize: scale(17), color: color.red }}>schedule appointment</Text>
              </TouchableOpacity>
            </View>



          </View>
        </View>
      </ScrollView>
    </View>
  );
};



export default Fourt;