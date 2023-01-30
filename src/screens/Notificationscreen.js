import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import { COLOR } from '../constants/colorConstants';
import { moderateScale, scale } from 'react-native-size-matters';
import DrawerHeader from '../Components/DrawerHeader';
const { width, height } = Dimensions.get('window');
const Notificationscreen = ({ route }) => {
  console.log('value pass param', route.params.paramKey)
  return (
    <ScrollView style={styles.container}>
      <DrawerHeader name={'Notification'} />
      <View style={{
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: "100%",
        marginTop: moderateScale(8),
        height: moderateScale(60),
        flexDirection: 'row',
      }}>
        <View
          style={styles.headerBtn}>
          <Text style={{ color: 'black', fontSize: scale(14), fontWeight: '500', width: scale(300), }}>Welcome to BloodLinks {route.params.paramKey} </Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLOR.FONT1,
  },

  headerBtn: {
    height: moderateScale(50),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: scale(20),
    width: "97%",
  },
});
export default Notificationscreen;
