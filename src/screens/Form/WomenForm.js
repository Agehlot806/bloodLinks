import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { moderateScale, scale } from 'react-native-size-matters';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import COLORS from '../../styles/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerHeader from '../../Components/DrawerHeader';
import { useNavigation } from '@react-navigation/native';

const WomenForm = () => {

    const [checked1, setChecked1] = useState('no');
    const [checked2, setChecked2] = useState('no');
    const [checked4, setChecked4] = useState('no');
    const [checked5, setChecked5] = useState('');
    const [pickerMode, setPickerMode] = useState(null);
    const [date1, setdate] = useState('MM/DD/YY');

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
    const navigation = useNavigation()

    const firstFormApi = async () => {
        const IdUser = await AsyncStorage.getItem('User')
        const FormId = await AsyncStorage.getItem('FormId1')
        const jsonValue = await AsyncStorage.getItem('Gender')

        let url = `https://bloodlinks.in/donation_Appointment`   //API to render signup
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            body: JSON.stringify({
                has_pregnant: checked1,
                has_abortion: checked2,
                last_menstrual_period: date1,
                has_breast_feeden_last_12_month: checked4,
                has_child_less_one_year: checked5,
                user_id: IdUser,
                form_step: 'step_2',
                form_id: FormId,
                gender: jsonValue,


            }),
            headers: headers,
        })
            .then((Response) => Response.json())
            .then(async (Response) => {
                console.log('RESPONSE apiiii Women-------------->>>>', Response)
                console.log(' Form id-------------->>>>', Response.form_id)
                await AsyncStorage.setItem('WomenId1', Response.form_id)
                if (Response.status == true) {
                    alert('Second Form successfully submit !')
                    navigation.navigate('SecondForm')
                } else {
                    alert('Second Form fail !')
                }

            })
            .catch((error) => {
                console.error("ERROR FOUND catch" + error);
            })
    }
    const Test5 = (value) => {
        if (value == 'yes') {
            setChecked5('yes')

        } else {
            setChecked5('no')
        }
    }
    const Test4 = (value) => {
        if (value == 'yes') {
            setChecked4('yes')

        } else {
            setChecked4('no')
        }
    }
    const Test2 = (value) => {
        if (value == 'yes') {
            setChecked2('yes')

        } else {
            setChecked2('no')
        }
    }
    const Test1 = (value) => {
        if (value == 'yes') {
            setChecked1('yes')

        } else {
            setChecked1('no')
        }
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "column", }}>
            <DrawerHeader name={'Women Form'} image1={false} />
            <ScrollView>
                <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', height: 'auto', width: '100%', marginBottom: moderateScale(159) }}>
                        <Text style={{ fontSize: 20, }}>REQUEST FOR BLOOD DONATION</Text>
                        <View style={{ height: moderateScale(30), width: '95%', flexDirection: 'column' }}>
                            <Text style={{ fontSize: scale(16.5), color: COLORS.red }}>Physiological Status for Women:</Text>
                        </View>
                        <View style={{ height: moderateScale(90), width: '95%', flexDirection: 'column' }}>
                            <Text style={{ fontSize: scale(15), color: 'black' }}>1. Are You Pregnant Or Have You Been Pregnant Within Last Six Months:</Text>
                            <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                                <RadioButton
                                    value="yes"
                                    color={COLORS.red}
                                    status={checked1 === 'yes' ? 'checked' : 'unchecked'}
                                    onPress={() => Test1('yes')}
                                />
                                <Text style={{ fontSize: 15, }}>Yes</Text>

                                <RadioButton
                                    value="no"
                                    color={COLORS.red}
                                    status={checked1 === 'no' ? 'checked' : 'unchecked'}
                                    onPress={() => Test1('no')}
                                />
                                <Text style={{ fontSize: 15, }}>No</Text>
                            </View>
                        </View>
                        <View style={{ height: moderateScale(80), width: '95%', flexDirection: 'column' }}>
                            <Text style={{ fontSize: scale(15), color: 'black' }}>2. Abortion (6 Months)?:</Text>
                            <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                                <RadioButton
                                    value="yes"
                                    color={COLORS.red}
                                    status={checked2 === 'yes' ? 'checked' : 'unchecked'}
                                    onPress={() => Test2('yes')}
                                />
                                <Text style={{ fontSize: 15, }}>Yes</Text>

                                <RadioButton
                                    value="no"
                                    color={COLORS.red}
                                    status={checked2 === 'no' ? 'checked' : 'unchecked'}
                                    onPress={() => Test2('no')}
                                />
                                <Text style={{ fontSize: 15, }}>No</Text>

                            </View>
                        </View>
                        <View style={{ height: moderateScale(70), width: '95%', flexDirection: 'column' }}>
                            <Text style={{ fontSize: scale(15), color: 'black' }}>3. When Did You Have Last Menstrual Period</Text>
                            <View style={{ height: moderateScale(50), width: '55%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: scale(14.9), color: COLORS.grey }} onPress={showDatePicker}> {date1}</Text>
                            </View>
                            <DateTimePickerModal
                                isVisible={pickerMode !== null}
                                mode={pickerMode}
                                onConfirm={handleConfirm}
                                onCancel={hidePicker}
                                display="default"

                            />

                        </View>
                        <View style={{ height: moderateScale(80), width: '95%', flexDirection: 'column' }}>
                            <Text style={{ fontSize: scale(15), color: 'black' }}>4. Are You Breast Feeding (12 Months)?:</Text>
                            <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                                <RadioButton
                                    value="yes"
                                    color={COLORS.red}
                                    status={checked4 === 'yes' ? 'checked' : 'unchecked'}
                                    onPress={() => Test4('yes')}
                                />
                                <Text style={{ fontSize: 15, }}>Yes</Text>

                                <RadioButton
                                    value="no"
                                    color={COLORS.red}
                                    status={checked4 === 'no' ? 'checked' : 'unchecked'}
                                    onPress={() => Test4('no')}
                                />
                                <Text style={{ fontSize: 15, }}>No</Text>
                            </View>
                        </View>
                        <View style={{ height: moderateScale(100), width: '95%', flexDirection: 'column' }}>
                            <Text style={{ fontSize: scale(15), color: 'black' }}>5. Do You Have Child Less Than 1 Year Old?:</Text>
                            <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                                <RadioButton
                                    value="yes"
                                    color={COLORS.red}
                                    status={checked5 === 'yes' ? 'checked' : 'unchecked'}
                                    onPress={() => Test5('yes')}
                                />
                                <Text style={{ fontSize: 15, }}>Yes</Text>

                                <RadioButton
                                    value="no"
                                    color={COLORS.red}
                                    status={checked5 === 'no' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked5('no')}
                                />
                                <Text style={{ fontSize: 15, }}>No</Text>

                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: moderateScale(50), width: '100%', marginBottom: moderateScale(20), position: 'relative' }}>
                <View style={{ height: moderateScale(50), width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: moderateScale(50), width: '45%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#bb3039', borderRadius: moderateScale(10), marginRight: moderateScale(5), }}>
                        <Text style={{ fontSize: scale(16), textAlign: 'center', color: 'white' }}>
                            Back
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => firstFormApi()} style={{ height: moderateScale(50), width: '45%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#bb3039', borderRadius: moderateScale(10), marginLeft: moderateScale(5), }}>
                        <Text style={{ fontSize: scale(16), textAlign: 'center', color: 'white' }}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};



export default WomenForm;