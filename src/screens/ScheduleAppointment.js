import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Modal
} from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import DropDownPicker from "react-native-dropdown-picker";
import { DataTable } from 'react-native-paper';
import { COLOR } from '../constants/colorConstants';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import DrawerHeader from "../Components/DrawerHeader";
import color from "../constants/colorConstants";
import { useEffect } from "react";
const Appointment = () => {
    const [day, setday] = useState();
    const [Month, setMonth] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [pickerMode, setPickerMode] = useState(null);
    const [date1, setdate] = useState('MM/DD/YY');
    const [Data, setData] = useState([]);
    const [Item, setItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


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
    const [NameAddress, setNameAddress] = useState();
    const [Address, setAddress] = useState();
    const [bank_id, setbank_id] = useState();
    const [UseId, setUseId] = useState();


    useEffect(() => {
        fetch('https://bloodlinks.in/city_pincode_list')
            .then((response) => response.json())
            .then((response) => {
                setData(response)
                console.log('response api data ----->>>>>', response)
                setIsLoading(false);

            })
            .catch((error) => {
                console.error('catch api error', error);
            });
    }, []);
    useEffect(() => {
        console.log('hospetal name---->>>', NameAddress)
        IdUser()
        NameAddress
        Address
        bank_id
        UseId
        Data
    }, [Data]);

    useEffect(() => {
        setTimeout(() => {
            console.log('useFoucas Effect loading ----->>>>>')
            setIsLoading(false);
            NameAddress
            Address
            bank_id
            UseId
        }, 2000)
    }, [isLoading]);

    const ApiModal = async () => {
        const FormId = await AsyncStorage.getItem('WomenId1')

        let url = `https://bloodlinks.in/bookappointment`   //API to 

        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            body: JSON.stringify({
                blood_bank_id: bank_id,
                appointment_date: date1,
                form_id: FormId,
                user_id: UseId,

            }),
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                console.log('RESPONSE apiiii book appointment-------------->>>>', Response)
                if (Response.status == true) {
                    alert("Appointment Book successfully !");
                    navigation.navigate('Home')
                } else {
                    alert("Not Book Appointment !");
                }
            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
                alert("Server Error !");
            })
    }


    const IdUser = async () => {
        const IdUser = await AsyncStorage.getItem('User')
        setUseId(IdUser)
        console.log('heelooo---UserId--------->', Data)

    }

    const navigation = useNavigation()
    const ModalAppoinmete = (item) => {
        setModalVisible(true)
        setNameAddress(item.name)
        setAddress(item.address_1)
        setbank_id(item.blood_bank_id)
        console.log('helloooooo', NameAddress)
    }
    const Confirm = () => {
        ApiModal()
        setModalVisible(!modalVisible)
    }

    const renderItem = ({ item, index }) => (

        <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: moderateScale(350),
                height: moderateScale(230),
                backgroundColor: 'white',
                shadowColor: 'grey',
                borderWidth: scale(2),
                borderColor: '#93121B',
                borderRadius: moderateScale(10),
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                elevation: 3,
                marginBottom: moderateScale(10),
                backgroundColor: '#E8E8E8',
            }}>

            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: '95%',
                    height: moderateScale(200),
                    backgroundColor: 'white'
                }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '77%',
                }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        height: moderateScale(35),
                    }}>
                        <Text style={{ fontSize: scale(16), textAlign: 'left', color: '#93121B', fontWeight: '300', width: scale(210) }}>Organization Name :-</Text>
                    </View>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                    }}>
                        <Text style={{ fontSize: scale(15), paddingLeft: scale(15), width: '100%', }}>{item.name}</Text>
                    </View>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        height: moderateScale(35),
                    }}>
                        <Text style={{  fontSize: scale(16), textAlign: 'left', color: '#93121B', fontWeight: '300', width: scale(210) }}>Organization Address :-</Text>
                    </View>
                    <View style={{
                       alignItems: 'flex-start',
                       justifyContent: 'center',
                       flexDirection: 'column',
                       width: '100%',
                    }}>
                        <Text style={{ fontSize: scale(15), paddingLeft: scale(15), width: '100%', }}>{item.address_1}</Text>
                    </View>

                </View>
                <TouchableOpacity onPress={() => ModalAppoinmete(item)} style={{ height: moderateScale(55), width: '20%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#278838', borderRadius: moderateScale(6), marginRight: moderateScale(5), marginLeft: moderateScale(4), }}>
                    <Text style={{ fontSize: scale(16), textAlign: 'center', color: 'white' }}>
                        Book
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
                                <Text style={{ fontSize: scale(17), color: 'black', fontWeight: '400' }}>Scheduling Details</Text>
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
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    width: '100%',
                                    height: moderateScale(30),
                                }}>
                                    <Text style={{ fontSize: scale(17), textAlign: 'center', color: 'black', paddingLeft: 3, }}>Organization Name :-</Text>
                                </View>
                                <View style={{
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    width: '100%',
                                    height: moderateScale(25),
                                }}>
                                    <Text style={{ fontSize: scale(16), textAlign: 'center', paddingLeft: 3, }}>{NameAddress}</Text>
                                </View>
                                <View style={{
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    width: '100%',
                                    height: moderateScale(30),

                                }}>
                                    <Text style={{ fontSize: scale(17), textAlign: 'center', color: 'black', paddingLeft: 3, }}>Organization Address :-</Text>
                                </View>
                                <View style={{
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    width: '100%',
                                    height: moderateScale(40),
                                }}>
                                    <Text style={{ fontSize: scale(16), textAlign: 'center', paddingLeft: 3, }}>{Address}</Text>
                                </View>
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
        <View style={{ flex: 1, alignItems: 'center', flexDirection: "column", }}>
            <DrawerHeader name={'Appointment'} image1={false} />
            <ScrollView style={{ flex: 1, }}>

                <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center', }}>
                    <Text style={{ fontSize: 20, }}>Schedule Appointment</Text>

                    <View style={{ flexDirection: 'column', height: moderateScale(100), width: '90%', }}>
                        <View style={{ flex: 1, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', }}>
                            <ModalDropdown
                                style={{ justifyContent: 'center', width: '45%', height: moderateScale(50), justifyContent: 'center', borderRadius: moderateScale(10), borderColor: '#ccc', borderWidth: 1, justifyContent: 'center' }}
                                onSelect={(index, value) => setday(value)}
                                options={Data.map((item) => (
                                    item.address_1
                                ))}
                                defaultValue={'Select City'}
                                dropdownTextStyle={{ backgroundColor: '#fff', fontSize: 16, color: 'black' }}/*Style here*/
                                textStyle={{ fontSize: 16, color: 'grey', alignSelf: 'flex-start', marginLeft: 10 }}
                                dropdownStyle={{
                                    backgroundColor: COLOR.DROPDOWNBG,
                                    elevation: 5,
                                    width: moderateScale(130),

                                }}
                            >
                            </ModalDropdown>


                            <ModalDropdown
                                style={{ justifyContent: 'center', width: '45%', height: moderateScale(50), justifyContent: 'center', borderRadius: moderateScale(10), borderColor: '#ccc', borderWidth: 1, justifyContent: 'center' }}
                                onSelect={(index, value) => setMonth(value)}
                                options={Data.map((item) => (
                                    item.pincode
                                ))}
                                defaultValue={'Select Pincode'}
                                dropdownTextStyle={{ backgroundColor: '#fff', fontSize: 16, color: 'black', }}/*Style here*/
                                textStyle={{ fontSize: 16, color: 'grey', alignSelf: 'flex-start', marginLeft: 10 }}
                                dropdownStyle={{
                                    backgroundColor: COLOR.DROPDOWNBG,
                                    elevation: 5,
                                    width: moderateScale(130),
                                }}
                            >
                            </ModalDropdown>

                        </View>

                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: moderateScale(50), width: '100%', marginTop: moderateScale(5), }}>
                        <View style={{ height: moderateScale(50), width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <TouchableOpacity onPress={() => setIsLoading(true)} style={{ height: moderateScale(40), width: '45%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#278838', borderRadius: moderateScale(10), marginRight: moderateScale(5), }}>
                                <Text style={{ fontSize: scale(16), textAlign: 'center', color: 'white' }}>
                                    Reset
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('AppointmentReset')} style={{ height: moderateScale(40), width: '45%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#278838', borderRadius: moderateScale(10), marginLeft: moderateScale(5), }}>
                                <Text style={{ fontSize: scale(16), textAlign: 'center', color: 'white' }}>
                                    Filter
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ flex: 1,  width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: moderateScale(10),marginHorizontal:scale(15) }}>
                        {isLoading ? (<ActivityIndicator />) : (
                            <FlatList
                                data={Data}
                                renderItem={renderItem}
                                keyExtractor={(_, index) => index.toString()}
                            />
                        )}


                    </View>

                    {/* </View> */}

                </View>
            </ScrollView>
        </View>
    )
}
export default Appointment;

