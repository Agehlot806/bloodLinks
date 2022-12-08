import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Splash from '../screens/Splash';
import Slider from '../screens/Slider';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Hospitals from '../screens/Hospitals';
import BloodBank from '../screens/BloodBank';
import Profile from '../screens/Profile';
import BottomNav from '../navigation/BottomNav';
import Otp from '../screens/Otp';
import OtpSinup from '../screens/OtpSinup';
import DonerList from '../screens/DonerList';
import RequestList from '../screens/RequestList';
import Maps from '../screens/Mapss';

import Notificationscreen from '../screens/Notificationscreen';
import ScheduleAppointment from '../screens/ScheduleAppointment';
import AppointmentReset from '../screens/AppointmentReset';
import RequestBlood from '../screens/RequestBlood';
import FirstForm from '../screens/Form/FirstForm';
import SecondForm from '../screens/Form/SecondForm';
import ThirdForm from '../screens/Form/ThirdForm';
import FourtForm from '../screens/Form/FourtForm';
import WomenForm from '../screens/Form/WomenForm';
import RequestAppointment from '../screens/RequestAppointment';
import RequestAppReset from '../screens/RequestAppointmentReset';
import ProfileEdit from '../screens/ProfileEdit';
import Labs from '../screens/Labs';
import BloodMap from '../screens/BloodMap';
import HospitalMap from '../screens/HospitalMap';
import LabMap from '../screens/LabMap';






const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

// const Drawer = createDrawerNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Slider"
        component={Slider}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Home"
        component={BottomNav}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="Hospitals"
        component={Hospitals}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BloodMap"
        component={BloodMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HospitalMap"
        component={HospitalMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LabMap"
        component={LabMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Labs"
        component={Labs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BloodBank"
        component={BloodBank}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Maps"
        component={Maps}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="ScheduleAppointment"
        component={ScheduleAppointment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppointmentReset"
        component={AppointmentReset}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RequestBlood"
        component={RequestBlood}
        options={{ headerShown: false }}
      />

      {/* <Stack.Screen
          name="BottomNav"
          component={BottomNav}
          options={{headerShown: false}}
        /> */}
      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtpSinup"
        component={OtpSinup}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Notificationscreen"
        component={Notificationscreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DonerList"
        component={DonerList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RequestList"
        component={RequestList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FirstForm"
        component={FirstForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SecondForm"
        component={SecondForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ThirdForm"
        component={ThirdForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FourtForm"
        component={FourtForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WomenForm"
        component={WomenForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RequestAppointment"
        component={RequestAppointment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RequestAppReset"
        component={RequestAppReset}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
          name="Home"
          component={Home} 
          options={{headerShown: false}}
        /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
