import React, { useState, useCallback, useEffect } from 'react';
import {
    SafeAreaView, View, FlatList, StyleSheet, Text, TextInput,
    StatusBar, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity,
} from 'react-native';
import { moderateScale, moderateVerticalScale, s, scale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { RadioButton, Checkbox } from 'react-native-paper';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import DrawerHeader from '../Components/DrawerHeader';
import color from '../styles/color';
import ModalDropdown from 'react-native-modal-dropdown';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const RequestBlood = () => {
    // first screen
    const [Patient, setPatient] = useState('');
    const [Age, setAge] = useState('')
    const [Registration, setRegistration] = useState('');
    const [Ward, setWard] = useState('');
    const [Bed, setBed] = useState('');
    const [Father, setFather] = useState('');
    const [Hospital, setHospital] = useState('');
    const [PhoneHos, setPhoneHos] = useState('');
    const [Consultant, setConsultant] = useState('')
    const [PhoneConsul, setPhoneConsul] = useState('');;
    const [open1, setopen1] = useState(false);
    const [value1, setValue1] = useState([]);
    const [items1, setItems1] = React.useState([]);
    // State second
    const [Clinical, setClinical] = useState('');
    const [Diagnosis, setDiagnosis] = useState('');
    const [HbGm, setHbGm] = useState('');
    const [Platelet, setPlatelet] = useState('');
    const [Reasons, setReasons] = useState('');
    const [InCase, setInCase] = useState('');
    const [checkedA, setCheckedA] = useState('');
    const [open2, setopen2] = useState(false);
    const [value2, setValue2] = useState([]);
    const [items2, setItems2] = React.useState([]);



    // state third
    const [checkedB, setCheckedB] = useState('yes');
    const [checkedB2, setCheckedB2] = useState('yes');
    const [checkedB3, setCheckedB3] = useState('yes');
    const [checkedB4, setCheckedB4] = useState('yes');
    const [checkedB5, setCheckedB5] = useState('yes');
    const [checkedB6, setCheckedB6] = useState('yes');


    const [isSelected, setSelection] = useState(false);
    const [isSelected2, setSelection2] = useState(false);
    const [isSelected3, setSelection3] = useState(false);
    const [isSelected4, setSelection4] = useState(false);
    const [isSelected5, setSelection5] = useState(false);
    const [isSelected6, setisSelected6] = useState(false);
    const [Input1, setInput1] = useState('');
    const [Input2, setInput2] = useState('');
    const [Input3, setInput3] = useState('');
    const [Input4, setInput4] = useState('');
    const [Input5, setInput5] = useState('');
    const [Input6, setInput6] = useState('');
    //  State fourth
    const [Check1, setCheck1] = useState('no');
    const [Check2, setCheck2] = useState('no');
    const [Check3, setCheck3] = useState('no');
    const [Check4, setCheck4] = useState('no');
    const [Check5, setCheck5] = useState('no');
    const [Check6, setCheck6] = useState('no');
    const [Check7, setCheck7] = useState('no');
    const [Check8, setCheck8] = useState('no');
    const [Check9, setCheck9] = useState('no');
    const [Check10, setCheck10] = useState('no');
    const [Check11, setCheck11] = useState('no');
    const [pickerMode, setPickerMode] = useState(null);
    const [pickerMode1, setPickerMode1] = useState(null);
    const [date1, setdate] = useState('MM/DD/YY');
    const [time, settime] = useState('HH/MM');



    useEffect(() => {
        console.log('date---------->>>stor', date1)
        time
    }, [date1]);
    const showDatePicker1 = () => {
        setPickerMode1("time");
    };

    const hidePicker1 = () => {
        setPickerMode1(null);
    };

    const handleConfirm1 = (time) => {
        hidePicker1();
        settime(moment(time).format('LT'))
    };
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

    const LoginUserId = async (city) => {

        try {
            await AsyncStorage.setItem('RequestId', city)
        } catch (e) {
            // saving error
        }

    }
    const handleCity = async () => {
        const IdUser = await AsyncStorage.getItem('User')
        let url = `https://bloodlinks.in/bloodrequest_form`   //API to render signup
        // let url = `http://hirectjob.in/hirectjob_api/user_register.php`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        console.log('heelooo------------>', IdUser)
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            body: JSON.stringify({
                p_name: Patient,
                age: Age,
                gender: value1,
                registration: Registration,
                ward: Ward,
                bed: Bed,
                f_name: Father,
                hospital: Hospital,
                phone: PhoneHos,
                consultant: Consultant,
                consultant_phone: PhoneConsul,
                // second
                clinical_history: Clinical,
                diagnosis: Diagnosis,
                hb: HbGm,
                platelet: Platelet,
                reasons: Reasons,
                history_previous: checkedA,
                blood_group: value2,
                female: InCase,
                // Third
                whole_blood_unit: Input1,
                whole_blood_test: checkedB,
                Cryo_Poor_Plasma_unit: Input2,
                Cryo_Poor_Plasma_test: checkedB2,
                Cryoprecipitate_unit: Input3,
                Cryoprecipitate_test: checkedB3,
                Fresh_Frozen_Plasma_unit: Input4,
                Fresh_Frozen_Plasma_test: checkedB4,
                Red_blood_cell_unit: Input5,
                Red_blood_cell_test: checkedB5,
                Platelet_rich_concentrate_unit: Input6,
                Platelet_rich_concentrate_test: checkedB6,
                // fourth
                required_date: date1,
                required_time: time,
                stat: Check1,
                urgent: Check2,
                routine: Check3,
                reserved: Check4,
                patient: Check5,
                identity: Check6,
                medical: Check7,
                completely: Check8,
                sample: Check9,
                match: Check10,
                sample_tube: Check11,
                user_id: IdUser,


            }),
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                console.log('RESPONSE Request Form-------------->>>>', Response)
                if (Response.status == true) {
                    navigation.navigate('RequestAppointment')
                    console.log('RESPONSE Request FormId-------------->>>>', Response.form_id)
                    var city = (Response.form_id);
                    LoginUserId(city)
                    alert("Request Appointment Book successfully !")
                } else {
                    navigation.navigate('RequestBlood')
                }

            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }

    const onNextStep = () => {
        if (Patient == '') {
            alert("Please Fill All Option The First Form !")
            // nextBtnDisabled()
        } else {
            alert("First Form successfully submit !")
        }
        // alert('hello first')
    };
    const onNextStep2 = () => {
        if (HbGm == '') {
            alert("Please Fill The Second Form All Option")
            // nextBtnDisabled()
        } else {
            alert("Second Form successfully submit !")
        }
    };
    const onNextStep3 = () => {
        if (Input1 == '') {
            alert("Please Fill The Third Form All Option")
            // nextBtnDisabled()
        } else {
            alert("Third Form successfully submit !")
        }
    };
    const onNextStep4 = () => {
        if (date1 == 'MM/DD/YY') {
            alert("Please Fill The All Options and Submit")

        } else if (time == 'HH/MM') {
            alert("Please Fill The All Options and Submit")
        } else {
            handleCity()
        }
    };
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: "white" }}>
            <DrawerHeader name={'Request for Blood'} image1={false} />
            <ProgressSteps>
                <ProgressStep
                    label="First Step"
                    onNext={onNextStep}
                    nextBtnDisabled={false}
                >
                    <View style={{
                        alignItems: 'center', width: '100%',
                        justifyContent: 'center', flexDirection: 'row'
                    }}>
                        <Text style={{
                            color: 'black',
                            textTransform: 'lowercase',
                            fontWeight: '400',
                            fontSize: scale(15),
                            letterSpacing: 1,
                        }}>Patient Information </Text>
                    </View>
                    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                marginLeft: scale(35),
                                justifyContent: "center",
                                marginTop: scale(12),
                                borderRadius: scale(10), borderWidth: 0.8,
                                borderColor: "grey",
                                margin: scale(8)

                            }}>
                                <TextInput
                                    style={styles.input}
                                    value={Patient}
                                    onChangeText={setPatient}
                                    placeholder='Patient Name'
                                    placeholderTextColor={"black"}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                marginLeft: scale(35),
                                justifyContent: "space-between",
                                marginTop: scale(12),
                                marginBottom: scale(5),
                                flexDirection: 'row',
                                alignItems: 'center',

                            }}>
                                <ModalDropdown
                                    style={{ justifyContent: 'center', width: '80%', height: moderateScale(50), justifyContent: 'center', borderRadius: moderateScale(10), borderColor: '#ccc', borderWidth: 1, justifyContent: 'center' }}
                                    onSelect={(index, value) => setAge(value)}
                                    options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"]}
                                    defaultValue={'Select Age'}
                                    dropdownTextStyle={{ backgroundColor: '#fff', fontSize: 16, color: 'black', width: 200, alignItems: 'center' }}/*Style here*/
                                    textStyle={{ fontSize: 16, color: 'grey', alignSelf: 'flex-start', marginLeft: 10 }}
                                    dropdownStyle={{ width: 150, alignItems: 'flex-start', justifyContent: 'center' }}>
                                </ModalDropdown>
                            </View>
                        </KeyboardAvoidingView>
                        <View style={{
                            height: scale(50),
                            flexDirection: "row", width: "100%", marginTop: scale(12),
                        }}>

                            <View style={{
                                zIndex: 1,
                                width: "80%",
                                marginLeft: scale(35),
                                justifyContent: "center",
                                marginTop: scale(12),
                                borderRadius: scale(10),
                                borderColor: "grey",
                            }}>
                                <DropDownPicker
                                    dropDownDirection="BOTTOM"
                                    open={open1}
                                    // onOpen={Close2}
                                    // 
                                    value={value1}
                                    items={[
                                        { label: 'Male', value: 'Male' },
                                        { label: 'Female', value: 'Female' },
                                    ]}
                                    setOpen={setopen1}
                                    setValue={setValue1}
                                    setItems={setItems1}
                                    placeholder="Gender"
                                    zIndex={3000}
                                    zIndexInverse={1000}
                                    containerStyle={{
                                        borderColor: "blue", position: 'relative', bottom: scale(3), height: scale(50), borderRadius: scale(10),
                                        borderColor: "grey",
                                    }}
                                />
                            </View>
                        </View>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                marginLeft: scale(35),
                                justifyContent: "center",
                                marginTop: scale(12),
                                borderRadius: scale(10), borderWidth: 0.8,
                                borderColor: "grey",
                                margin: scale(8)

                            }}>
                                <TextInput
                                    style={styles.input}
                                    value={Registration}
                                    onChangeText={setRegistration}
                                    placeholder='Registration No.'
                                    placeholderTextColor={"black"}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                marginLeft: scale(35),
                                justifyContent: "center",
                                marginTop: scale(12),
                                borderRadius: scale(10), borderWidth: 0.8,
                                borderColor: "grey",
                                margin: scale(8)

                            }}>
                                <TextInput
                                    style={styles.input}
                                    value={Ward}
                                    onChangeText={setWard}
                                    placeholder='Ward '
                                    placeholderTextColor={"black"}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                marginLeft: scale(35),
                                justifyContent: "center",
                                marginTop: scale(12),
                                borderRadius: scale(10), borderWidth: 0.8,
                                borderColor: "grey",
                                margin: scale(8)

                            }}>
                                <TextInput
                                    style={styles.input}
                                    value={Bed}
                                    onChangeText={setBed}
                                    placeholder='Bed '
                                    placeholderTextColor={"black"}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                marginLeft: scale(35),
                                justifyContent: "center",
                                marginTop: scale(12),
                                borderRadius: scale(10), borderWidth: 0.8,
                                borderColor: "grey",
                                margin: scale(8)

                            }}>
                                <TextInput
                                    style={styles.input}
                                    value={Father}
                                    onChangeText={setFather}
                                    placeholder='Father Name'
                                    placeholderTextColor={"black"}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                marginLeft: scale(35),
                                justifyContent: "center",
                                marginTop: scale(12),
                                borderRadius: scale(10), borderWidth: 0.8,
                                borderColor: "grey",
                                margin: scale(8)

                            }}>
                                <TextInput
                                    style={styles.input}
                                    value={Hospital}
                                    onChangeText={setHospital}
                                    placeholder='Name of Hospital'
                                    placeholderTextColor={"black"}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                marginLeft: scale(35),
                                justifyContent: "center",
                                marginTop: scale(12),
                                borderRadius: scale(10), borderWidth: 0.8,
                                borderColor: "grey",
                                margin: scale(8)

                            }}>
                                <TextInput
                                    style={styles.input}
                                    value={PhoneHos}
                                    onChangeText={setPhoneHos}
                                    placeholder="Phone No."
                                    placeholderTextColor={"black"}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                marginLeft: scale(35),
                                justifyContent: "center",
                                marginTop: scale(12),
                                borderRadius: scale(10), borderWidth: 0.8,
                                borderColor: "grey",
                                margin: scale(8)

                            }}>
                                <TextInput
                                    style={styles.input}
                                    value={Consultant}
                                    onChangeText={setConsultant}
                                    placeholder="Name of Consultant "
                                    placeholderTextColor={"black"}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                marginLeft: scale(35),
                                margin: scale(8),
                                marginTop: scale(12),
                                justifyContent: "center",
                                borderRadius: scale(10), borderWidth: 0.8,
                                borderColor: "grey",


                            }}>
                                <TextInput
                                    style={styles.input}
                                    value={PhoneConsul}
                                    onChangeText={setPhoneConsul}
                                    placeholder="Phone No. "
                                    placeholderTextColor={"black"}
                                />
                            </View>
                        </KeyboardAvoidingView>

                    </ScrollView>
                </ProgressStep>
                <ProgressStep
                    label="Second Step"
                    onNext={onNextStep2}
                >
                    <View style={{
                        alignItems: 'center', width: '100%',
                        justifyContent: 'center', flexDirection: 'row'
                    }}>
                        <Text style={{
                            color: 'black',
                            textTransform: 'lowercase',
                            fontWeight: '400',
                            fontSize: scale(15),
                            letterSpacing: 1,
                        }}> Clinical information </Text>
                    </View>
                    <ScrollView style={{ flex: 1, backgroundColor: "white", marginBottom: 20, }}>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                justifyContent: "center",
                                marginLeft: scale(35),
                                margin: scale(8),
                                marginTop: scale(12),
                                borderRadius: scale(10), borderWidth: 0.8,
                                borderColor: "grey",

                            }}>
                                <TextInput
                                    style={styles.input}
                                    value={Clinical}
                                    onChangeText={setClinical}
                                    placeholder='Clinical History'
                                    placeholderTextColor={"black"}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                justifyContent: "center",
                                marginLeft: scale(35),
                                margin: scale(8),
                                marginTop: scale(12),
                                borderRadius: scale(10), borderWidth: 0.8,
                                borderColor: "grey",
                            }}>
                                <TextInput
                                    style={styles.input}
                                    value={Diagnosis}
                                    onChangeText={setDiagnosis}
                                    placeholder='Diagnosis '
                                    placeholderTextColor={"black"}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                justifyContent: "center",
                                marginLeft: scale(35),
                                margin: scale(8),
                                marginTop: scale(12),
                                borderRadius: scale(10), borderWidth: 0.8,
                                borderColor: "grey",
                            }}>
                                <TextInput
                                    style={styles.input}
                                    value={HbGm}
                                    onChangeText={setHbGm}
                                    placeholder='Hb gm%  '
                                    placeholderTextColor={"black"}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                justifyContent: "center",
                                marginLeft: scale(35),
                                margin: scale(8),
                                marginTop: scale(12),
                                borderRadius: scale(10), borderWidth: 0.8,
                                borderColor: "grey",
                            }}>
                                <TextInput
                                    style={styles.input}
                                    value={Platelet}
                                    onChangeText={setPlatelet}
                                    placeholder='Platelet Count * '
                                    placeholderTextColor={"black"}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                marginLeft: scale(35),
                                margin: scale(8),
                                marginTop: scale(12),
                                justifyContent: "center",
                                borderRadius: scale(10), borderWidth: 0.8,
                                borderColor: "grey",
                            }}>
                                <TextInput
                                    style={styles.input}
                                    value={Reasons}
                                    onChangeText={setReasons}
                                    placeholder='Resons for transation  '
                                    placeholderTextColor={"black"}
                                />
                            </View>
                        </KeyboardAvoidingView>



                        <KeyboardAvoidingView>
                            <View style={{
                                height: moderateScale(80), width: '100%', flexDirection: 'column', marginTop: scale(12),
                                marginLeft: scale(35),
                            }}>
                                <Text style={{ fontSize: scale(15), color: 'black' }}>History of Previous Transfusion</Text>
                                <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                                    <RadioButton
                                        value="yes"
                                        color={color.red}
                                        status={checkedA === 'yes' ? 'checked' : 'unchecked'}
                                        onPress={() => setCheckedA('yes')}
                                    />
                                    <Text style={{ fontSize: 15, }}>Yes</Text>

                                    <RadioButton
                                        value="no"
                                        color={color.red}
                                        status={checkedA === 'no' ? 'checked' : 'unchecked'}
                                        onPress={() => setCheckedA('no')}
                                    />
                                    <Text style={{ fontSize: 15, }}>No</Text>

                                </View>
                            </View>
                        </KeyboardAvoidingView>

                        <View style={{
                            height: scale(50), flexDirection: "row", width: "100%", marginTop: scale(12),
                        }}>

                            <View style={{
                                zIndex: 5,
                                width: "79%",
                                marginLeft: scale(33),
                                justifyContent: "center",
                                marginTop: scale(12),
                                borderRadius: scale(10),
                                borderColor: "grey",
                            }}>
                                <DropDownPicker
                                    dropDownDirection="BOTTOM"
                                    value={value2}
                                    open={open2}
                                    setOpen={setopen2}
                                    setValue={setValue2}
                                    setItems={setItems2}
                                    searchable={true}
                                    maxHeight={100}
                                    searchPlaceholder="Search Blood Group..."
                                    placeholder="--Blood Group--"
                                    // onOpen={Close8}
                                    items={[
                                        { label: 'A+', value: '1' },
                                        { label: 'A-', value: '2' },
                                        { label: 'AB+', value: '3' },
                                        { label: 'AB-', value: '4' },
                                        { label: 'B+', value: '5' },
                                        { label: 'B-', value: '6' },
                                        { label: 'O+', value: '7' },
                                        { label: 'O-', value: '8' },
                                    ]}
                                    // onChangeValue={(item) => {
                                    //   changeBlood(item)
                                    //   console.log('item--',items)
                                    // }}
                                    zIndex={1000}
                                    zIndexInverse={2000}
                                    containerStyle={{

                                        borderColor: "blue", position: 'relative', bottom: scale(3), height: scale(50), borderRadius: scale(10),

                                    }}
                                />
                            </View>
                        </View>


                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                marginLeft: scale(29),
                                justifyContent: "center",
                                marginTop: scale(15),
                                borderRadius: scale(10), borderWidth: 0.8,
                                borderColor: "grey",
                                marginBottom: 70,

                            }}>
                                <TextInput
                                    style={styles.input}
                                    value={InCase}
                                    onChangeText={setInCase}
                                    placeholder='In case of Female(History of obstetric)'
                                    placeholderTextColor={"black"}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </ProgressStep>
                <ProgressStep
                    label="Third Step"
                    onNext={onNextStep3}
                >
                    <View style={{
                        alignItems: 'center', width: '100%',
                        justifyContent: 'center', flexDirection: 'row'
                    }}>
                        <Text style={{
                            color: 'black',
                            textTransform: 'lowercase',
                            fontWeight: '400',
                            fontSize: scale(15),
                            letterSpacing: 1,
                        }}>Blood component Requested</Text>
                    </View>
                    <ScrollView style={{ flex: 1, backgroundColor: "white", marginBottom: 20, }}>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                flexDirection: 'column',
                                width: moderateScale(350),
                                height: moderateScale(180),
                                backgroundColor: 'white',
                                shadowColor: 'grey',
                                borderWidth: 0.8,
                                borderColor: 'grey',
                                borderRadius: moderateScale(10),
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                elevation: 3,
                                marginTop: moderateScale(10),
                                marginBottom: moderateScale(10),
                                marginHorizontal: 10,
                            }}>
                            <View style={{ height: 30, width: '100%', marginLeft: scale(15), alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text style={{
                                    color: 'black',
                                    textTransform: 'lowercase',
                                    fontWeight: '400',
                                    fontSize: scale(15),
                                    letterSpacing: 1,
                                }}>Components Name</Text>
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '80%', }}>
                                    <Text style={{
                                        color: 'black',
                                        textTransform: 'lowercase',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                        letterSpacing: 1,
                                    }}>Whole Bloode</Text>
                                </View>
                                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center', height: 30, }}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        status={isSelected ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setSelection(!isSelected);
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '60%', }}>
                                    <Text style={{
                                        color: 'black',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                    }}>No.of Units Requested</Text>
                                </View>
                                {isSelected ? (
                                    <View style={{ width: '40%', backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 10, }}>

                                        <TextInput
                                            placeholderTextColor="#6B6B6B"
                                            keyboardType="phone-pad"
                                            onChangeText={setInput1}
                                            maxLength={1}
                                            value={Input1}
                                        />

                                    </View>
                                ) : null}
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '60%', }}>
                                    <Text style={{
                                        color: 'black',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                    }}>NAT Tested Product</Text>
                                </View>
                                {isSelected ? (
                                    <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center', height: 30, flexDirection: 'row' }}>


                                        <RadioButton
                                            value="yes"
                                            color={color.red}
                                            status={checkedB === 'yes' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckedB('yes')}
                                        />
                                        <Text style={{ fontSize: 15, }}>Yes</Text>

                                        <RadioButton
                                            value="no"
                                            color={color.red}
                                            status={checkedB === 'no' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckedB('no')}
                                        />
                                        <Text style={{ fontSize: 15, }}>No</Text>

                                    </View>
                                ) : null}
                            </View>
                        </View>
                        {/* 2 */}
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                flexDirection: 'column',
                                width: moderateScale(350),
                                height: moderateScale(180),
                                backgroundColor: 'white',
                                shadowColor: 'grey',
                                borderWidth: 0.8,
                                borderColor: 'grey',
                                borderRadius: moderateScale(10),
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                elevation: 3,
                                marginTop: moderateScale(10),
                                marginBottom: moderateScale(10),
                                marginHorizontal: 10,
                            }}>
                            <View style={{ height: 30, width: '100%', marginLeft: scale(15), alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text style={{
                                    color: 'black',
                                    textTransform: 'lowercase',
                                    fontWeight: '400',
                                    fontSize: scale(15),
                                    letterSpacing: 1,
                                }}>Components Name</Text>
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '80%', }}>
                                    <Text style={{
                                        color: 'black',
                                        textTransform: 'lowercase',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                        letterSpacing: 1,
                                    }}>Cryo Poor Plasma</Text>
                                </View>
                                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center', height: 30, }}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        status={isSelected2 ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setSelection2(!isSelected2);
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '60%', }}>
                                    <Text style={{
                                        color: 'black',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                    }}>No.of Units Requested</Text>
                                </View>
                                {isSelected2 ? (
                                    <View style={{ width: '40%', backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 10, }}>

                                        <TextInput
                                            placeholderTextColor="#6B6B6B"
                                            keyboardType="phone-pad"
                                            onChangeText={setInput2}
                                            maxLength={1}
                                            value={Input2}
                                        />

                                    </View>
                                ) : null}
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '60%', }}>
                                    <Text style={{
                                        color: 'black',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                    }}>NAT Tested Product</Text>
                                </View>
                                {isSelected2 ? (
                                    <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center', height: 30, flexDirection: 'row' }}>


                                        <RadioButton
                                            value="yes"
                                            color={color.red}
                                            status={checkedB2 === 'yes' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckedB2('yes')}
                                        />
                                        <Text style={{ fontSize: 15, }}>Yes</Text>

                                        <RadioButton
                                            value="no"
                                            color={color.red}
                                            status={checkedB2 === 'no' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckedB2('no')}
                                        />
                                        <Text style={{ fontSize: 15, }}>No</Text>

                                    </View>
                                ) : null}
                            </View>
                        </View>
                        {/* 3 */}
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                flexDirection: 'column',
                                width: moderateScale(350),
                                height: moderateScale(180),
                                backgroundColor: 'white',
                                shadowColor: 'grey',
                                borderWidth: 0.8,
                                borderColor: 'grey',
                                borderRadius: moderateScale(10),
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                elevation: 3,
                                marginTop: moderateScale(10),
                                marginBottom: moderateScale(10),
                                marginHorizontal: 10,
                            }}>
                            <View style={{ height: 30, width: '100%', marginLeft: scale(15), alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text style={{
                                    color: 'black',
                                    textTransform: 'lowercase',
                                    fontWeight: '400',
                                    fontSize: scale(15),
                                    letterSpacing: 1,
                                }}>Components Name</Text>
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '80%', }}>
                                    <Text style={{
                                        color: 'black',
                                        textTransform: 'lowercase',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                        letterSpacing: 1,
                                    }}>Cryoprecipitate</Text>
                                </View>
                                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center', height: 30, }}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        status={isSelected3 ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setSelection3(!isSelected3);
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '60%', }}>
                                    <Text style={{
                                        color: 'black',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                    }}>No.of Units Requested</Text>
                                </View>
                                {isSelected3 ? (
                                    <View style={{ width: '40%', backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 10, }}>

                                        <TextInput
                                            placeholderTextColor="#6B6B6B"
                                            keyboardType="phone-pad"
                                            onChangeText={setInput3}
                                            value={Input3}
                                            maxLength={1}

                                        />

                                    </View>
                                ) : null}
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '60%', }}>
                                    <Text style={{
                                        color: 'black',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                    }}>NAT Tested Product</Text>
                                </View>
                                {isSelected3 ? (
                                    <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center', height: 30, flexDirection: 'row' }}>


                                        <RadioButton
                                            value="yes"
                                            color={color.red}
                                            status={checkedB3 === 'yes' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckedB3('yes')}
                                        />
                                        <Text style={{ fontSize: 15, }}>Yes</Text>

                                        <RadioButton
                                            value="no"
                                            color={color.red}
                                            status={checkedB3 === 'no' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckedB3('no')}
                                        />
                                        <Text style={{ fontSize: 15, }}>No</Text>

                                    </View>
                                ) : null}
                            </View>
                        </View>

                        {/* 4 */}
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                flexDirection: 'column',
                                width: moderateScale(350),
                                height: moderateScale(180),
                                backgroundColor: 'white',
                                shadowColor: 'grey',
                                borderWidth: 0.8,
                                borderColor: 'grey',
                                borderRadius: moderateScale(10),
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                elevation: 3,
                                marginTop: moderateScale(10),
                                marginBottom: moderateScale(10),
                                marginHorizontal: 10,
                            }}>
                            <View style={{ height: 30, width: '100%', marginLeft: scale(15), alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text style={{
                                    color: 'black',
                                    textTransform: 'lowercase',
                                    fontWeight: '400',
                                    fontSize: scale(15),
                                    letterSpacing: 1,
                                }}>Components Name</Text>
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '80%', }}>
                                    <Text style={{
                                        color: 'black',
                                        textTransform: 'lowercase',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                        letterSpacing: 1,
                                    }}>Fresh Frozen Plasma</Text>
                                </View>
                                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center', height: 30, }}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        status={isSelected4 ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setSelection4(!isSelected4);
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '60%', }}>
                                    <Text style={{
                                        color: 'black',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                    }}>No.of Units Requested</Text>
                                </View>
                                {isSelected4 ? (
                                    <View style={{ width: '40%', backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 10, }}>

                                        <TextInput
                                            placeholderTextColor="#6B6B6B"
                                            keyboardType="phone-pad"
                                            onChangeText={setInput4}
                                            value={Input4}
                                            maxLength={1}

                                        />

                                    </View>
                                ) : null}
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '60%', }}>
                                    <Text style={{
                                        color: 'black',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                    }}>NAT Tested Product</Text>
                                </View>
                                {isSelected4 ? (
                                    <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center', height: 30, flexDirection: 'row' }}>


                                        <RadioButton
                                            value="yes"
                                            color={color.red}
                                            status={checkedB4 === 'yes' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckedB4('yes')}
                                        />
                                        <Text style={{ fontSize: 15, }}>Yes</Text>

                                        <RadioButton
                                            value="no"
                                            color={color.red}
                                            status={checkedB4 === 'no' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckedB4('no')}
                                        />
                                        <Text style={{ fontSize: 15, }}>No</Text>

                                    </View>
                                ) : null}
                            </View>
                        </View>

                        {/* 5 */}
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                flexDirection: 'column',
                                width: moderateScale(350),
                                height: moderateScale(180),
                                backgroundColor: 'white',
                                shadowColor: 'grey',
                                borderWidth: 0.8,
                                borderColor: 'grey',
                                borderRadius: moderateScale(10),
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                elevation: 3,
                                marginTop: moderateScale(10),
                                marginBottom: moderateScale(10),
                                marginHorizontal: 10,
                            }}>
                            <View style={{ height: 30, width: '100%', marginLeft: scale(15), alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text style={{
                                    color: 'black',
                                    textTransform: 'lowercase',
                                    fontWeight: '400',
                                    fontSize: scale(15),
                                    letterSpacing: 1,
                                }}>Components Name</Text>
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '80%', }}>
                                    <Text style={{
                                        color: 'black',
                                        textTransform: 'lowercase',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                        letterSpacing: 1,
                                    }}>Red blood cell</Text>
                                </View>
                                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center', height: 30, }}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        status={isSelected5 ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setSelection5(!isSelected5);
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '60%', }}>
                                    <Text style={{
                                        color: 'black',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                    }}>No.of Units Requested</Text>
                                </View>
                                {isSelected5 ? (
                                    <View style={{ width: '40%', backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 10, }}>

                                        <TextInput
                                            placeholderTextColor="#6B6B6B"
                                            keyboardType="phone-pad"
                                            onChangeText={setInput5}
                                            value={Input5}
                                            maxLength={1}

                                        />

                                    </View>
                                ) : null}
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '60%', }}>
                                    <Text style={{
                                        color: 'black',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                    }}>NAT Tested Product</Text>
                                </View>
                                {isSelected5 ? (
                                    <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center', height: 30, flexDirection: 'row' }}>


                                        <RadioButton
                                            value="yes"
                                            color={color.red}
                                            status={checkedB5 === 'yes' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckedB5('yes')}
                                        />
                                        <Text style={{ fontSize: 15, }}>Yes</Text>

                                        <RadioButton
                                            value="no"
                                            color={color.red}
                                            status={checkedB5 === 'no' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckedB5('no')}
                                        />
                                        <Text style={{ fontSize: 15, }}>No</Text>

                                    </View>
                                ) : null}
                            </View>
                        </View>
                        {/* 6 */}

                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                flexDirection: 'column',
                                width: moderateScale(350),
                                height: moderateScale(180),
                                backgroundColor: 'white',
                                shadowColor: 'grey',
                                borderWidth: 0.8,
                                borderColor: 'grey',
                                borderRadius: moderateScale(10),
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                elevation: 3,
                                marginTop: moderateScale(10),
                                marginBottom: moderateScale(10),
                                marginHorizontal: 10,
                            }}>
                            <View style={{ height: 30, width: '100%', marginLeft: scale(15), alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text style={{
                                    color: 'black',
                                    textTransform: 'lowercase',
                                    fontWeight: '400',
                                    fontSize: scale(15),
                                    letterSpacing: 1,
                                }}>Components Name</Text>
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '80%', }}>
                                    <Text style={{
                                        color: 'black',
                                        textTransform: 'lowercase',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                        letterSpacing: 1,
                                    }}>Platelet rich concentrate</Text>
                                </View>
                                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center', height: 30, }}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        status={isSelected6 ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setisSelected6(!isSelected6);
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '60%', }}>
                                    <Text style={{
                                        color: 'black',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                    }}>No.of Units Requested</Text>
                                </View>
                                {isSelected6 ? (
                                    <View style={{ width: '40%', backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 10, }}>

                                        <TextInput
                                            placeholderTextColor="#6B6B6B"
                                            keyboardType="phone-pad"
                                            onChangeText={setInput6}
                                            value={Input6}
                                            maxLength={1}
                                        />

                                    </View>
                                ) : null}
                            </View>
                            <View style={{ height: 50, width: '90%', marginLeft: scale(10), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                <View style={{ width: '60%', }}>
                                    <Text style={{
                                        color: 'black',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                    }}>NAT Tested Product</Text>
                                </View>
                                {isSelected6 ? (
                                    <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center', height: 30, flexDirection: 'row' }}>


                                        <RadioButton
                                            value="yes"
                                            color={color.red}
                                            status={checkedB6 === 'yes' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckedB6('yes')}
                                        />
                                        <Text style={{ fontSize: 15, }}>Yes</Text>

                                        <RadioButton
                                            value="no"
                                            color={color.red}
                                            status={checkedB6 === 'no' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckedB6('no')}
                                        />
                                        <Text style={{ fontSize: 15, }}>No</Text>

                                    </View>
                                ) : null}
                            </View>
                        </View>

                    </ScrollView>
                </ProgressStep>
                <ProgressStep label="Fourth Step"
                    onSubmit={onNextStep4}
                >
                    <View style={{
                        alignItems: 'center', width: '100%',
                        justifyContent: 'center', flexDirection: 'row'
                    }}>
                        <Text style={{
                            color: 'black',
                            fontWeight: '400',
                            fontSize: scale(15),
                        }}>Product Requirement</Text>
                    </View>
                    <ScrollView style={{ flex: 1, backgroundColor: "white", marginBottom: 20, }}>

                        <View style={{
                            height: scale(20),
                            width: "100%",
                            justifyContent: "flex-start",
                            paddingLeft: scale(30),
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                color: 'black',
                                fontWeight: '400',
                                fontSize: scale(14),
                            }}>Required Date</Text>
                        </View>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                justifyContent: "flex-start",
                                alignItems: 'center',
                                marginLeft: scale(35),
                                marginTop: scale(12),
                                borderRadius: scale(10), borderWidth: 1,
                                borderColor: "grey",
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    height: scale(40),
                                    width: "70%",
                                    justifyContent: "flex-start",
                                    paddingLeft: scale(10),
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <Text style={{
                                        color: 'grey',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                    }}>{date1}</Text>
                                </View>
                                <DateTimePickerModal
                                    isVisible={pickerMode !== null}
                                    mode={pickerMode}
                                    onConfirm={handleConfirm}
                                    onCancel={hidePicker}
                                    display="default"

                                />
                                <View style={{
                                    height: scale(40),
                                    width: "30%",
                                    justifyContent: "center",
                                    paddingLeft: scale(10),
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <TouchableOpacity onPress={showDatePicker}>
                                        <Image
                                            resizeMode='contain'
                                            style={{ height: scale(45), width: scale(40) }}
                                            source={require('../assets/icons/Calender.png')}
                                        />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </KeyboardAvoidingView>
                        <View style={{
                            height: scale(20),
                            marginTop: 5,
                            width: "100%",
                            justifyContent: "flex-start",
                            paddingLeft: scale(30),
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                color: 'black',
                                fontWeight: '400',
                                fontSize: scale(14),
                            }}>Required Time</Text>
                        </View>
                        <KeyboardAvoidingView>
                            <View style={{
                                height: scale(48),
                                width: "80%",
                                justifyContent: "flex-start",
                                alignItems: 'center',
                                marginLeft: scale(35),
                                marginTop: scale(12),
                                borderRadius: scale(10), borderWidth: 1,
                                borderColor: "grey",
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    height: scale(40),
                                    width: "70%",
                                    justifyContent: "flex-start",
                                    paddingLeft: scale(10),
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <Text style={{
                                        color: 'grey',
                                        fontWeight: '400',
                                        fontSize: scale(15),
                                    }}>{time}</Text>
                                </View>
                                <DateTimePickerModal
                                    isVisible={pickerMode1 !== null}
                                    mode={pickerMode1}
                                    onConfirm={handleConfirm1}
                                    onCancel={hidePicker1}
                                    display="default"
                                />
                                <View style={{
                                    height: scale(40),
                                    width: "30%",
                                    justifyContent: "center",
                                    paddingLeft: scale(10),
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <TouchableOpacity onPress={showDatePicker1}>
                                        <Image
                                            resizeMode='contain'
                                            style={{ height: scale(70), width: scale(60) }}
                                            source={require('../assets/icons/Time.png')}
                                        />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </KeyboardAvoidingView>
                        <View style={{ height: moderateScale(40), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 20, }}>
                            <Checkbox
                                style={styles.checkbox}
                                status={Check1 ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheck1('yes');
                                }}
                            />
                            <Text style={{ fontSize: 15, }}>STAT(Within 15 mins)</Text>

                            <Checkbox
                                style={styles.checkbox}
                                status={Check2 ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheck2('yes');
                                }}
                            />
                            <Text style={{ fontSize: 15, }}>Urgent(one hours)</Text>

                        </View>
                        <View style={{ height: moderateScale(40), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 20, }}>
                            <Checkbox
                                style={styles.checkbox}
                                status={Check3 ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheck3('yes');
                                }}
                            />
                            <Text style={{ fontSize: 15, }}>Routine</Text>

                            <Checkbox
                                style={styles.checkbox}
                                status={Check4 ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheck4('yes');
                                }}
                            />
                            <Text style={{ fontSize: 15, }}>Reserved</Text>

                        </View>
                        <View style={{
                            height: scale(45),
                            marginTop: 5,
                            width: "100%",
                            justifyContent: "flex-start",
                            paddingLeft: scale(30),
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                color: 'black',
                                fontWeight: '300',
                                fontSize: scale(16),
                            }}>  To be Completed by Person Drawing Blood Specimen</Text>
                        </View>
                        <View style={{ height: moderateScale(50), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 20, }}>
                            <Checkbox
                                style={styles.checkbox}
                                status={Check5 ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheck5('yes');
                                }}
                            />
                            <View style={{ height: moderateScale(50), width: '100%', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, }}>Patient(if concious)confirms to his and </Text>
                                <Text style={{ fontSize: 15, }}>father's name</Text>
                            </View>
                        </View>
                        <View style={{ height: moderateScale(50), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 20, }}>
                            <Checkbox
                                style={styles.checkbox}
                                status={Check6 ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheck6('yes');
                                }}
                            />
                            <View style={{ height: moderateScale(50), width: '100%', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, }}>If unconscious Relative(s)/Staff confirm</Text>
                                <Text style={{ fontSize: 15, }}>the identity</Text>
                            </View>
                        </View>
                        <View style={{ height: moderateScale(60), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 20, }}>
                            <Checkbox
                                style={styles.checkbox}
                                status={Check7 ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheck7('yes');
                                }}
                            />
                            <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, }}>The Identity, Reg. No. checks with the medical</Text>
                                <Text style={{ fontSize: 15, }}>medical records and same is written </Text>
                                <Text style={{ fontSize: 15, }}>on the requisitionform</Text>

                            </View>
                        </View>
                        <View style={{ height: moderateScale(60), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 20, }}>
                            <Checkbox
                                style={styles.checkbox}
                                status={Check8 ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheck8('yes');
                                }}
                            />
                            <View style={{ height: moderateScale(50), width: '100%', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, }}>Requisition form is property and</Text>
                                <Text style={{ fontSize: 15, }}>completely filled </Text>
                            </View>
                        </View>
                        <View style={{ height: moderateScale(60), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 20, }}>
                            <Checkbox
                                style={styles.checkbox}
                                status={Check9 ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheck9('yes');
                                }}
                            />
                            <View style={{ height: moderateScale(50), width: '100%', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, }}>Sample tube cames the patient's </Text>
                                <Text style={{ fontSize: 15, }}>name, reg No ward </Text>
                            </View>
                        </View>

                        <View style={{ height: moderateScale(50), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 20, }}>
                            <Checkbox
                                style={styles.checkbox}
                                status={Check10 ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheck10('yes');
                                }}
                            />
                            <View style={{ height: moderateScale(50), width: '100%', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, }}>These match with the medical records</Text>
                            </View>
                        </View>
                        <View style={{ height: moderateScale(50), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 20, }}>
                            <Checkbox
                                style={styles.checkbox}
                                status={Check11 ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheck11('yes');
                                }}
                            />
                            <View style={{ height: moderateScale(50), width: '100%', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, }}>Phlebotomist has signed the sample tube</Text>
                            </View>
                        </View>
                    </ScrollView>
                </ProgressStep>

            </ProgressSteps>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        height: 55,
        marginVertical: 5,
        borderWidth: 1.5,
        borderColor: 'gray',
        borderRadius: 9,
        fontSize: 15,
        fontWeight: '400',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'gray',
        shadowborder: 1,
        paddingLeft: scale(15), fontSize: scale(15),
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        elevation: 2,
        color: 'black'
    },
});
export default RequestBlood;

