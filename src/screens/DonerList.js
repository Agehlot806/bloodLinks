import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR } from '../constants/colorConstants';
import { Avatar } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import DrawerHeader from '../Components/DrawerHeader';
import { useFocusEffect } from '@react-navigation/native';
import { TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');
const DonerList = props => {
  const navigation = props.navigation;
  const [requestlist, setrequestlist] = useState([]);
  const [UseId, setUseId] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerMode, setPickerMode] = useState(null);
  const [date1, setdate] = useState('MM/DD/YY');
  const [isLoading, setIsLoading] = useState(true);
  const [Reason, setReason] = useState('');
  const [request_id, setrequest_id] = useState('');
  const [request_Date, setrequest_Date] = useState('');


  useEffect(() => {
    setTimeout(() => {
      IdUser1()
      ApiDonor()
      request_id
      request_Date
      date1
      console.log('date----------->>>', date1);
      console.log('heelooo---useEffect 2-----Change date---->', UseId)
    }, 2000)
  }, []);
  useEffect(() => {
    IdUser1()
  }, [UseId]);

  useEffect(() => {
    date1
    console.log('heelooo---useEffect-----request_id---->', request_id)
  }, [request_id]);




  const IdUser1 = async () => {
    const IdUser = await AsyncStorage.getItem('User')
    setUseId(IdUser)
  }
  const showDatePicker = () => {
    setPickerMode("date");
  };

  const hidePicker = () => {
    setPickerMode(null);
  };

  const handleConfirm = (date) => {
    hidePicker();
    setdate(moment(date).format('L'))
  };
  const ModalAppoinmete = (item) => {
    setrequest_Date(item.id)
    setModalVisible(true)
  }

  const ApiDonor = async () => {
    const IdUse1 = await AsyncStorage.getItem('User')
    let url = `https://bloodlinks.in/myappointmentlist?user_id=${IdUse1}`   //API to 
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        user_id: IdUse1,
      }),
      headers: headers,
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log('RESPONSE apiiii my appointment list-------------->>>>', Response)
        setIsLoading(false);
        setrequestlist(Response)
        setrequest_id(Response[0].id)
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })
  }
  const Confirm = () => {
    ApiModal()
    setModalVisible(!modalVisible)
    setIsLoading(true);
  }
  const ApiModal = () => {

    let url = `https://bloodlinks.in/Re_scheduleappointment`   //API to 
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        rescheduale_date: date1,
        reasion: Reason,
        user_id: UseId,
        form_request_id: request_Date,

      }),
      headers: headers,
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log('RESPONSE apiiii book appointment-------------->>>>', Response)
        if (Response.reasion == Response.reasion) {
          alert("Re-Schedule Appointment successfully !");
          ApiDonor()
          setIsLoading(false);
        } else {
          alert("Re-Schedule Appointment Not successfully !");
        }
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
        alert("Server Error !");
      })
  }
  const listEmptyComponent = () => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: scale(14), textAlign: 'center', color: 'black', paddingLeft: 3, fontWeight: '400' }}>List is Empty</Text>
      </View>)
  }

  const renderItem = ({ item }) => (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: moderateScale(350),
        height: moderateScale(180),
        backgroundColor: 'white',
        shadowColor: 'grey',
        borderWidth: scale(2),
        borderColor: '#93121B',
        borderRadius: moderateScale(10),
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 3,
        marginBottom: moderateScale(10),
      }}>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: '97%',
          height: moderateScale(170),
 
        }}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          width: '65%',
        }}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            height: moderateScale(35),
           }}>
            <Text style={{ fontSize: scale(16), textAlign: 'left', color: 'black', fontWeight: '400', width: '100%', }}>Organization Name :-</Text>
          </View>
          <View style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            width: '100%',
          }}>
            <Text style={{ fontSize: scale(15), paddingLeft: 3, }}>{item.name}</Text>
          </View>
          <View style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            height: moderateScale(35),
           }}>
            <Text style={{ fontSize: scale(16), textAlign: 'left', color: 'black', fontWeight: '400', width: '100%', }}>Requested Date :-</Text>
          </View>

          <View style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '100%',
          }}>
            <Text style={{ fontSize: scale(15), paddingLeft: 3, }}>{item.requested_schedule_date}</Text>
          </View>
          <View style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            height: moderateScale(35),
           }}>
            <Text style={{ fontSize: scale(16), textAlign: 'left', color: 'black', fontWeight: '400', width: '100%', }}>Request Id :-</Text>
          </View>

          <View style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '100%',
          }}>
            <Text style={{ fontSize: scale(15), paddingLeft: 3, }}>{item.id}</Text>
          </View>

        </View>
        <TouchableOpacity onPress={() => ModalAppoinmete(item)} style={{ height: moderateScale(50), width: '30%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#93121B', borderRadius: moderateScale(6), marginRight: moderateScale(5), marginLeft: moderateScale(4), }}>
          <Text style={{ fontSize: scale(14.3), textAlign: 'center', color: 'white' }}>
            Re-Schedule
          </Text>
        </TouchableOpacity>

      </View>
      {/* modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <View
            style={{
              backgroundColor: 'white',
              height: 310,
              width: '90%',
              borderRadius: 25,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <View style={{ height: moderateScale(40), width: '100%', flexDirection: 'row', }}>
              <View style={{ height: moderateScale(40), width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: scale(17), color: 'black', fontWeight: '400' }}>Re~Schedule Appointment</Text>
              </View>
              <View style={{ height: moderateScale(40), width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                <Text onPress={() => setModalVisible(!modalVisible)} style={{ fontSize: scale(24), color: 'black' }}>X</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'column',
                flexDirection: 'row',
                width: '94%',
                height: moderateScale(190),

              }}>
              <View style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                width: '100%',
                height: moderateScale(170),
              }}>


                <View style={{
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  width: '100%',
                  height: moderateScale(45),
                }}>
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    width: '61%',
                    height: moderateScale(45),

                  }}>
                    <Text style={{ fontSize: scale(17), textAlign: 'center', color: 'black', paddingLeft: 3, }}>Appointment Date :-</Text>
                  </View>
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    width: '39%',
                    height: moderateScale(45),

                  }}>
                    <Text style={{ fontSize: scale(16), color: 'grey', paddingLeft: 10 }} onPress={showDatePicker}> {date1}</Text>
                  </View>
                  <DateTimePickerModal
                    isVisible={pickerMode !== null}
                    mode={pickerMode}
                    onConfirm={handleConfirm}
                    onCancel={hidePicker}
                    display="default"

                  />
                </View>
                <View style={{
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  width: '100%',
                  height: moderateScale(30),

                }}>
                  <Text style={{ fontSize: scale(17), textAlign: 'center', color: 'black', paddingLeft: 3, }}>Add Reason For Re-Scheduling :-</Text>
                </View>
                <View style={{
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  width: '100%',
                  height: moderateScale(100),
                  // backgroundColor:'red'
                }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Type the Reason"
                    placeholderTextColor="#6B6B6B"
                    // keyboardType="phone-pad"
                    onChangeText={setReason}
                    value={Reason}
                  />
                </View>

              </View>
            </View>
            <TouchableOpacity onPress={() => Confirm()} style={{ height: moderateScale(40), width: '50%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.PRIMARY, borderRadius: moderateScale(6), }}>
              <Text style={{ fontSize: scale(16), textAlign: 'center', color: 'white' }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <DrawerHeader name={'Doner List'} image1={false} />
      <View style={{ flex: 1, flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: moderateScale(10) }}>
        {isLoading ? (<ActivityIndicator />) : (
          <FlatList
            data={requestlist}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={() => listEmptyComponent()}

          />
        )}

      </View>
    </View>
  );
};
export default DonerList;
const styles = StyleSheet.create({
  heardingArrow: {
    marginVertical: 0.03,
  },
  heardingArrowImg: {
    height: height * 0.04,
    width: width * 0.08,
    marginRight: width * 0.06,
  },
  dtaa: {
    height: height * 0.2,
    marginHorizontal: 18,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },
  hearding: {
    alignItems: 'center',
    height: height * 0.09,
    // paddingHorizontal: width * 0.09,
    // flexDirection: 'row',
    // alignSelf:'center',
    justifyContent: 'center',

    // justifyContent: 'space-between',
    backgroundColor: COLOR.WHITE,
    // position: 'relative',
    // zIndex: 1000,
  },

  homeHeader: {
    height: height * 0.1,
    backgroundColor: COLOR.PRIMARY,
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.02,
    // margin:height * 0.3,
    // borderWidth: 0.3,
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    // margin: 10,
  },
  homeSearchHeader: {
    flexDirection: 'row',
    marginBottom: height * 0.03,
    alignItems: 'center',
  },
  headerBtn: {
    paddingHorizontal: width * 0.05,
    // paddingVertical: height * 0.01,
    height: height * 0.04,
    borderRadius: 30,
    backgroundColor: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: height * 0.09,
    width: width * 0.8,
    // marginVertical: 8,
    borderWidth: 0.01,
    padding: width * 0.03,
    borderRadius: 10,
    fontSize: width * 0.04,
    // paddingLeft:0.07,
    //   textAlign: 'center',
    fontWeight: '400',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 2,
    color: 'black'
  },
  location: {
    height: height * 0.018,
    width: width * 0.037,
    alignSelf: 'center',
  },
  seeDonor: {
    backgroundColor: COLOR.PRIMARY,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: height * 0.08,
    // marginVertical: height * 0.003,
    // marginHorizontal: height * 0.008,
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.03,
    // borderRadius: 100 / 20,
  },
  heardingTxt: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
  heardingArrow: {
    height: height * 0.04,
    width: width * 0.12,
  },
  heardingArrowImg: {
    height: height * 0.05,
    width: width * 0.1,
    alignSelf: 'flex-end',
    marginRight: 13 / 2,
    marginTop: -3,
  },
  heardingSearch: {
    height: height * 0.025,
    width: width * 0.043,
  },
  heardingMenuImg: {
    height: 37,
    width: 37,
    marginLeft: 17 / 2,
  },
  headerContent: {
    flexDirection: 'row',
    width: width * 0.7,
    marginHorizontal: width * 0.01,
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.013,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR.WHITE,
    borderRadius: width * 0.02,
    marginLeft: 11,
  },
  body: {
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    justifyContent: 'space-between',
    backgroundColor: COLOR.WHITE,
    marginVertical: height * 0.01,
  },
  bodyContent: {
    flexDirection: 'row',
    height: height * 0.2,
  },
  bodyContentImage: {
    width: width * 0.3,
    height: height * 0.2,
    justifyContent: 'center',
    paddingHorizontal: width * 0.03,
  },
  bodyTextContainer: {
    width: width * 0.4,
    height: height * 0.2,
    justifyContent: 'center',
  },
  bodyText: {
    fontSize: 16,
    color: 'black',
  },
  bodyBtnText: {
    fontSize: 16,
    color: COLOR.SPLASH,
  },
  askForHelpBody: {
    width: width * 0.4,
    height: height * 0.05,
    borderWidth: 0.5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  circle: {
    width: width * 0.35,
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: width * 0.05,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: width * 0.8,
    height: height * 0.4,
    // justifyContent:'center',
    // alignItems:'center',
    backgroundColor: '#fff',
    // opacity:0.4,
    borderRadius: 20,
    padding: 30,
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  gndrIcon: { height: height * 0.1, width: width * 0.18 },
  headerFiltter: {
    height: height * 0.03,
    width: width * 0.06,
    // justifyContent: 'center',
    marginVertical: -10,
    alignSelf: 'center',
    margin: 5,
    // position: 'absolute',
  },
  filter: {
    top: 15,
    borderWidth: 1,
    borderColor: COLOR.PRIMARY,
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.025,
    position: 'absolute',
    // justifyContent:'center',
    // alignSelf:'center',
    right: 0,
    backgroundColor: COLOR.WHITE,
    elevation: 5,
  },
  filterTxt: {
    borderBottomColor: COLOR.PRIMARY,
    borderBottomWidth: 1,
    paddingVertical: height * 0.003,
    paddingHorizontal: width * 0.035,
    color: COLOR.PRIMARY,
    fontWeight: '500',
  },
  SubHearding: {
    marginVertical: width * 0.03,
  },
  SubHeardingTxt: {
    fontSize: width * 0.05,
    fontWeight: '700',
  },
  accordianHead: {
    backgroundColor: COLOR.DROPDOWNBG,
    padding: width * 0.05,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.02,
  },
  accordianHeadTxt: {
    fontSize: width * 0.045,
  },
  selectBg: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  selectBgs: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectBgTxt: {
    fontSize: 19,
    borderWidth: 1.2,
    padding: width * 0.022,
    height: height * 0.065,
    width: width * 0.123,
    textAlign: 'center',
    borderRadius: 50,
    borderColor: COLOR.WHITE,
    color: COLOR.WHITE,
    margin: width * 0.015,
    backgroundColor: COLOR.BUTTON,
  },
  afteSelectBgTxt: {
    backgroundColor: COLOR.BUTTON,
    color: COLOR.WHITE,
    borderWidth: 0,
  },
  btns: {
    // flexDirection: 'row',
    // justifyContent: 'space-evenly',
  },
  butttons: {},
  loginbtn: {
    color: COLOR.WHITE,
    backgroundColor: '#85060F',
    paddingVertical: height * 0.02,
    // width: width * 0.75,
    textAlign: 'center',
    borderRadius: 50,
    fontWeight: '500',
    fontSize: width * 0.055,
    // elevation:10,
    // borderWidth: 2,
    borderColor: '#9B333B',
    marginTop: height * 0.05,
  },
  dropdown: {
    backgroundColor: COLOR.DROPDOWNBG,
    // borderRadius:40,
    elevation: 5,
    marginLeft: width * 0.02,
    width: width * 0.88,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  dropdownTxt: {
    fontSize: width * 0.06,
  },
});
