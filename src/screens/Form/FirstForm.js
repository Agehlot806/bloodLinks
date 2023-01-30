import React, { useState, useContext, useEffect } from 'react';
import { TouchableOpacity, View, Text, Modal, StyleSheet, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { moderateScale, scale } from 'react-native-size-matters';
import { MultiSelect } from 'react-native-element-dropdown';
import color from '../../styles/color';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import DrawerHeader from '../../Components/DrawerHeader';

const FirstForm1 = ({ }) => {
    const [checked, setChecked] = useState('other_day');
    const [checked1, setChecked1] = useState('yes');
    const [checked2, setChecked2] = useState('yes');
    const [checked3, setChecked3] = useState('yes');
    const [checked4, setChecked4] = useState('yes');
    const [checked5, setChecked5] = useState('yes');
    const [checked6, setChecked6] = useState('yes');
    const [checked7, setChecked7] = useState('yes');
    const [checked8, setChecked8] = useState('yes');

    const [checkedA, setCheckedA] = useState();
    const [checkedB, setCheckedB] = useState();
    const [checkedC, setCheckedC] = useState();
    // const [checked1, setChecked1] = React.useState(false);
    const [shouldShow, setShouldShow] = useState();
    const [OtherDay, setOtherDay] = useState(true);
    const [isFocus3, setIsFocus3] = useState(false);

    // PICKER STATE  
    const [value1, setValue1] = useState([]);
    const [items1, setItems1] = React.useState([
        { label: 'COMMON COLD', value: '66' },
        { label: 'FEVER', value: '67' },
        { label: 'SINUSITIS', value: '68' },
    ]);


    const [value2, setValue2] = useState([]);
    const [items2, setItems2] = React.useState([
        { label: 'ANTIBIOTIC', value: '1' },
        { label: 'ALCOHOL', value: '2' },
        { label: 'ASPRIN', value: '3' },
        { label: 'STEROID', value: '4' },
        { label: 'ANY OTHER', value: '5' },

    ]);


    const [value3, setValue3] = useState([]);
    const [items3, setItems3] = React.useState([
        { label: 'TYPHOID', value: '1' },
        { label: 'CHOLERA', value: '2' },
        { label: 'TETANUS', value: '3' },
    ]);

    const [value4, setValue4] = useState([]);
    const [items4, setItems4] = React.useState([
        { label: 'TYPHOID', value: '41' },
        { label: 'CHOLERA', value: '42' },
        { label: 'TETANUS', value: '43' },
    ]);

    const [value5, setValue5] = useState([]);
    const [items5, setItems5] = React.useState([
        { label: 'MALARIA', value: '46' },
        { label: 'DENTAL EXTRACTION', value: '47' },
        { label: 'MINOR SURGERY', value: '48' },
    ]);

    const [value6, setValue6] = useState([]);
    const [items6, setItems6] = React.useState([
        { label: 'ANEMIA', value: '37' },
        { label: 'DENGUE', value: '38' },
        { label: 'BLOOD TRANSFUSION', value: '39' },
        { label: 'TATTOOING', value: '40' },

    ]);


    const [value7, setValue7] = useState([]);
    const [items7, setItems7] = React.useState([
        { label: 'JAUNDICE', value: '55' },
        { label: 'TYPHOID', value: '56' },
        { label: 'VACCINATION', value: '57' },
        { label: 'BODY PIERCING', value: '58' },

    ]);


    const [value8, setValue8] = useState([]);
    const [items8, setItems8] = React.useState([
        { label: 'HEART DISEASE', value: 'HEART DISEASE' },
        { label: 'LEPROSY', value: 'LEPROSY' },
        { label: 'POLYCYTHEMIA', value: 'POLYCYTHEMIA' },
        { label: 'EPILEPSY', value: 'EPILEPSY' },
        { label: 'KALA-AZAR', value: 'KALA-AZAR' },
        { label: 'STOMACH UNFCER', value: 'STOMACH UNFCER' },
    ]);

    useEffect(() => {
        Test()
        Test2('yes')
        Test3('yes')
        Test5('yes')
        Test6('yes')
        Test7('yes')
        setChecked8('no')
        setdropdounHide8(false)

    }, []);

    useFocusEffect(
        React.useCallback(() => {
            setTimeout(() => {
                IdUser()
                FirstFormId()
            }, 10)
        }, [])
    );



    const IdUser = async () => {
        const IdUser = await AsyncStorage.getItem('User')
        // setId(IdUser)
        console.log('heelooo------------>', IdUser)
    }
    const FirstFormId = async (FormId, gander) => {

        try {
            await AsyncStorage.setItem('FormId1', FormId)
            await AsyncStorage.setItem('Gender', gander)

        } catch (e) {
            // saving error
        }

    }






    const Test = (value) => {
        if (value == 'today') {
            setChecked('today')
            // alert('hello')
            setShouldShow(true)
            setOtherDay(true)
        } else {
            // alert('hello guys')
            setChecked('other_day')
            setShouldShow(true)
            setOtherDay(false)
        }
    }
    const [dropdounHide1, setdropdounHide1] = useState(true);
    const [dropdounHide2, setdropdounHide2] = useState(true);
    const [dropdounHide3, setdropdounHide3] = useState(true);
    const [dropdounHide4, setdropdounHide4] = useState(true);
    const [dropdounHide5, setdropdounHide5] = useState(true);
    const [dropdounHide6, setdropdounHide6] = useState(true);
    const [dropdounHide7, setdropdounHide7] = useState(true);
    const [dropdounHide8, setdropdounHide8] = useState(true);

    const Test1 = (value) => {
        if (value == 'yes') {
            setChecked1('yes')
            setdropdounHide1(true)

        } else {
            setChecked1('no')
            setdropdounHide1(false)
        }
    }
    const Test2 = (value) => {
        if (value == 'yes') {
            setChecked2('yes')
            setdropdounHide2(true)
        } else {
            setChecked2('no')
            setdropdounHide2(false)
        }
    }
    const Test3 = (value) => {
        if (value == 'yes') {
            setChecked3('yes')
            setdropdounHide3(true)
        } else {
            setChecked3('no')
            setdropdounHide3(false)
        }
    }
    const Test4 = (value) => {
        if (value == 'yes') {
            setChecked4('yes')
            setdropdounHide4(true)
        } else {
            setChecked4('no')
            setdropdounHide4(false)
        }
    }
    const Test5 = (value) => {
        if (value == 'yes') {
            setChecked5('yes')
            setdropdounHide5(true)
        } else {
            setChecked5('no')
            setdropdounHide5(false)
        }
    }
    const Test6 = (value) => {
        if (value == 'yes') {
            setChecked6('yes')
            setdropdounHide6(true)
        } else {
            setChecked6('no')
            setdropdounHide6(false)
        }
    }
    const Test7 = (value) => {
        if (value == 'yes') {
            setChecked7('yes')
            setdropdounHide7(true)
        } else {
            setChecked7('no')
            setdropdounHide7(false)
        }
    }
    const Test8 = (value) => {
        if (value == 'yes') {
            // setModalVisible(true)
            setChecked8('yes')
            setdropdounHide8(true)


        } else {
            setChecked8('no')
            setdropdounHide8(false)
        }
    }
    const SafeSex = (value) => {
        if (value == 'yes') {
            setChecked8('yes')
            setModalVisible(true)
        } else {
            setdropdounHide8(false)
            setModalVisible(false)
            setChecked8('no')
        }
    }
    const SafeSex1 = (value) => {
        if (value == value) {
            setModalVisible(true)
            console.log('select item', value8)
        }
    }
    const [isActive, setIsActive] = useState(true);
    const [TextHide, setTextHide] = useState(true);

    const NaviChangeColor = () => {
        if ('hello' == 'hello') {
            setIsActive(false);
            setTextHide(false)
            // Timer()
        }
    }

    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);

    const firstFormApi = async () => {
        const IdUser = await AsyncStorage.getItem('User')
        let url = `https://bloodlinks.in/donation_Appointment`
        // dts=${checked}&well_feeling=${checkedA}&
        // fed_in_last_4_hrs=${checkedB}&well_slept_last_night=${checkedC}
        // &has_general_differs=${checked1}&general_differs=${value1}
        // &has_taken_medicines=${checked2}&medicines_taken=${value2}
        // &has_vaccinated=${checked3}&vaccinated_with=${value3}
        // &has_last_2_week_differs=${checked4}&weeked_differs=${value4}
        // &has_last_3_month_differs=${checked5}&three_months_differs=${value5}
        // &has_recent_difers=${checked6}&six_months_differs=${value6}
        // &has_last_12_month_differs=${checked7}&twelve_months_diffres=${value7}
        // &has_perm_differ=${checked8}&permanent_differs=${value8}
        // &user_id=${IdUser}&form_step=${'step_1'}

        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        let data = {
            dts: checked,
            well_feeling: checkedA,
            fed_in_last_4_hrs: checkedB,
            well_slept_last_night: checkedC,
            // 1 point
            has_general_differs: checked1,
            general_differs: value1,
            // 2 point
            has_taken_medicines: checked2,
            medicines_taken: value2,
            // 3 point 
            has_vaccinated: checked3,
            vaccinated_with: value3,
            // 4 point 
            has_last_2_week_differs: checked4,
            weeked_differs: value4,
            // 5 point 
            has_last_3_month_differs: checked5,
            three_months_differs: value5,
            // 6 point 
            has_recent_difers: checked6,
            six_months_differs: value6,
            // 7 point 
            has_last_12_month_differs: checked7,
            twelve_months_diffres: value7,
            // 8 point 
            has_perm_differ: checked8,
            permanent_differs: value8,
            user_id: IdUser,
            form_step: 'step_1',
        }

        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            body: JSON.stringify(data),
            headers: headers,
        })
            .then((Response) => Response.json())
            .then(async (Response) => {
                console.log('RESPONSE apiiii Formm first-------------->>>>', Response);
                // <Steper Resp={Response} />
                console.log('RESPONSE form_id-------------->>>>', Response.gender);
                await AsyncStorage.setItem('FormId1', Response.form_id)
                if (Response.status == true) {
                    alert('First Form successfully submit !')
                    var gander = (Response.gender);
                    FirstFormId(gander)
                    if (Response.gender == 'male') {
                        navigation.navigate('SecondForm')
                    } else {
                        navigation.navigate('WomenForm')
                    }
                } else {
                    alert('First Form fail !')
                }

            })

            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }
    // var district = Object.keys(value1).length;
    // console.log('length item selected ----->>>>>', value1)


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "column", position: 'relative', }}>
            <DrawerHeader name={'Blood Donation'} image1={false} />
            <View style={{ height: moderateScale(35), width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: moderateScale(10),backgroundColor:'black' }}>
                <Text style={{ fontSize: scale(18),color:'white' }}>
                    Step 1
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20,fontWeight:'200',top:scale(5),color:'black' }}>Criteria For Blood Donation</Text>
                    <View style={{ height: moderateScale(80), width: '100%', flexDirection: 'column',margin:scale(7) }}>
                        <Text style={{ fontSize: scale(15), color: 'black' }}>1. When you Donate The Blood</Text>
                        <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                            <RadioButton style={{ height: 0, width: 20 }}
                                value="today"
                                color={color.red}
                                status={checked === 'today' ? 'checked' : 'unchecked'}
                                onPress={() => Test('today')}
                            />
                            <Text style={{ fontSize: 15, }}>TODAY</Text>

                            <RadioButton
                                value="other_day"
                                color={color.red}
                                status={checked === 'other_day' ? 'checked' : 'unchecked'}
                                onPress={() => Test('other_day')}
                            />
                            <Text style={{ fontSize: 15, }}>SOME OTHER DAY</Text>

                        </View>
                    </View>
                    {shouldShow ?
                        (

                            <View style={{ alignItems: 'center', height: 'auto', width: '100%', marginBottom: moderateScale(159) }}>

                                {OtherDay ? (
                                    <>
                                        <View style={{ height: moderateScale(80), width: '100%', flexDirection: 'column' }}>
                                            <Text style={{ fontSize: scale(15), color: 'black' }}>A) Are you Feeling Well Today To Donate Blood</Text>
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
                                        <View style={{ height: moderateScale(80), width: '100%', flexDirection: 'column' }}>
                                            <Text style={{ fontSize: scale(15), color: 'black' }}>B)Did You Have Anything To Eat In Last 4 Hours?</Text>
                                            <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
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
                                        </View>
                                        <View style={{ height: moderateScale(80), width: '100%', flexDirection: 'column' }}>
                                            <Text style={{ fontSize: scale(15), color: 'black' }}>C)Did You Sleep Well Last Night?</Text>
                                            <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                                                <RadioButton
                                                    value="yes"
                                                    color={color.red}
                                                    status={checkedC === 'yes' ? 'checked' : 'unchecked'}
                                                    onPress={() => setCheckedC('yes')}
                                                />
                                                <Text style={{ fontSize: 15, }}>Yes</Text>

                                                <RadioButton
                                                    value="no"
                                                    color={color.red}
                                                    status={checkedC === 'no' ? 'checked' : 'unchecked'}
                                                    onPress={() => setCheckedC('no')}
                                                />
                                                <Text style={{ fontSize: 15, }}>No</Text>

                                            </View>
                                        </View>
                                    </>
                                ) : (null)}
                                <View style={{ width: '95%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: scale(20) }}>
                                    <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: scale(10) }}>
                                        <Text style={{ fontSize: scale(15), color: 'black' }}>1. Are You Suffering From :</Text>
                                        <View style={{ height: moderateScale(40), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 30 }}>
                                            <RadioButton
                                                value="yes"
                                                color={color.red}
                                                status={checked1 === 'yes' ? 'checked' : 'unchecked'}
                                                onPress={() => Test1('yes')}
                                            />
                                            <Text style={{ fontSize: 15, }}>Yes</Text>
                                            <RadioButton
                                                value="no"
                                                color={color.red}
                                                status={checked1 === 'no' ? 'checked' : 'unchecked'}
                                                onPress={() => Test1('no')}
                                            />
                                            <Text style={{ fontSize: 15, }}>No</Text>
                                        </View>
                                    </View>
                                    {dropdounHide1 ? (
                                        <View style={{ flexDirection: "column", width: "100%", }}>
                                            <MultiSelect
                                                style={[styles.dropdown, isFocus3 && { borderColor: '#85060F' }]}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                search
                                                keyboardAvoiding={true}
                                                dropdownPosition="BOTTOM"
                                                data={items1}
                                                maxHeight={200}
                                                labelField="label"
                                                valueField="value"
                                                placeholder="Select an item"
                                                searchPlaceholder="Search..."
                                                value={value1}
                                                containerStyle={{ borderColor: "red", position: 'relative', }}
                                                onChange={item => {
                                                    console.log('heeellle multi', item)
                                                    setValue1(item);
                                                }}
                                            />
                                        </View>
                                    ) : null}


                                </View>
                                <View style={{ width: '95%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: scale(20), }}>
                                    <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: scale(10) }}>
                                        <Text style={{ fontSize: scale(15), color: 'black' }}>2.  Have You Taking Or Have Taken Medicine In Last 72 Hours Any Of The Following:</Text>
                                        <View style={{ height: moderateScale(40), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 30 }}>
                                            <RadioButton
                                                value="yes"
                                                color={color.red}
                                                status={checked2 === 'yes' ? 'checked' : 'unchecked'}
                                                onPress={() => Test2('yes')}
                                            />
                                            <Text style={{ fontSize: 15, }}>Yes</Text>

                                            <RadioButton
                                                value="no"
                                                color={color.red}
                                                status={checked2 === 'no' ? 'checked' : 'unchecked'}
                                                onPress={() => Test2('no')}
                                            />
                                            <Text style={{ fontSize: 15, }}>No</Text>
                                        </View>
                                    </View>
                                    {dropdounHide2 ? (
                                        <View style={{ flexDirection: "column", width: "100%", }}>
                                            <MultiSelect
                                                style={[styles.dropdown, isFocus3 && { borderColor: '#85060F' }]}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                search
                                                keyboardAvoiding={true}
                                                data={items2}
                                                dropdownPosition="BOTTOM"
                                                maxHeight={200}
                                                labelField="label"
                                                valueField="value"
                                                placeholder="Select an item"
                                                searchPlaceholder="Search..."
                                                value={value2}
                                                containerStyle={{ borderColor: "red", position: 'relative', }}
                                                onChange={item => {
                                                    console.log('heeellle multi 2', item)
                                                    setValue2(item);
                                                }}

                                            />
                                        </View>
                                    ) : null}

                                </View>
                                <View style={{ width: '95%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: scale(20), }}>
                                    <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: scale(10) }}>
                                        <Text style={{ fontSize: scale(15), color: 'black' }}>3. In The Last 2 Weeks Have You Been Vaccinated/Immunized For Any Of The Following</Text>
                                        <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40, }}>
                                            <RadioButton
                                                value="yes"
                                                color={color.red}
                                                status={checked3 === 'yes' ? 'checked' : 'unchecked'}
                                                onPress={() => Test3('yes')}
                                            />
                                            <Text style={{ fontSize: 15, }}>Yes</Text>

                                            <RadioButton
                                                value="no"
                                                color={color.red}
                                                status={checked3 === 'no' ? 'checked' : 'unchecked'}
                                                onPress={() => Test3('no')}
                                            />
                                            <Text style={{ fontSize: 15, }}>No</Text>

                                        </View>
                                    </View>
                                    {dropdounHide3 ? (
                                        <View style={{ zIndex: 3, flexDirection: "column", width: "100%", }}>
                                            <MultiSelect
                                                style={[styles.dropdown, isFocus3 && { borderColor: '#85060F' }]}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                search
                                                keyboardAvoiding={true}
                                                dropdownPosition="BOTTOM"
                                                data={items3}
                                                maxHeight={200}
                                                labelField="label"
                                                valueField="value"
                                                placeholder="Select an item"
                                                searchPlaceholder="Search..."
                                                value={value3}
                                                containerStyle={{ borderColor: "red", position: 'relative', }}
                                                onChange={item => {
                                                    console.log('heeellle multi 3', item)
                                                    setValue3(item);
                                                }}

                                            />
                                        </View>
                                    ) : null}

                                </View>
                                <View style={{ width: '95%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: scale(20), }}>
                                    <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: scale(10) }}>
                                        <Text style={{ fontSize: scale(15), color: 'black' }}>4. In The Last 2 Weeks Did You Suffer From Any Of The Following Diseases</Text>
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40, }}>
                                            <RadioButton
                                                value="yes"
                                                color={color.red}
                                                status={checked4 === 'yes' ? 'checked' : 'unchecked'}
                                                onPress={() => Test4('yes')}
                                            />
                                            <Text style={{ fontSize: 15, }}>Yes</Text>

                                            <RadioButton
                                                value="no"
                                                color={color.red}
                                                status={checked4 === 'no' ? 'checked' : 'unchecked'}
                                                onPress={() => Test4('no')}
                                            />
                                            <Text style={{ fontSize: 15, }}>No</Text>

                                        </View>
                                    </View>

                                    {dropdounHide4 ? (
                                        <View style={{ zIndex: 4, flexDirection: "column", width: "100%", }}>
                                            <MultiSelect
                                                style={[styles.dropdown, isFocus3 && { borderColor: '#85060F' }]}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                search
                                                keyboardAvoiding={true}
                                                dropdownPosition="BOTTOM"
                                                data={items4}
                                                maxHeight={200}
                                                labelField="label"
                                                valueField="value"
                                                placeholder="Select an item"
                                                searchPlaceholder="Search..."
                                                value={value4}
                                                containerStyle={{ borderColor: "red", position: 'relative', }}
                                                onChange={item => {
                                                    console.log('heeellle multi 3', item)
                                                    setValue4(item);
                                                }}

                                            />
                                        </View>
                                    ) : null}


                                </View>
                                <View style={{ width: '95%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: scale(20), }}>
                                    <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'flex-start', FpaddingBottom: scale(10) }}>
                                        <Text style={{ fontSize: scale(15), color: 'black' }}>5. In The Last 3 Months Have You Had Any Of The Following :</Text>
                                        <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40, }}>
                                            <RadioButton
                                                value="yes"
                                                color={color.red}
                                                status={checked5 === 'yes' ? 'checked' : 'unchecked'}
                                                onPress={() => Test5('yes')}
                                            />
                                            <Text style={{ fontSize: 15, }}>Yes</Text>

                                            <RadioButton
                                                value="no"
                                                color={color.red}
                                                status={checked5 === 'no' ? 'checked' : 'unchecked'}
                                                onPress={() => Test5('no')}
                                            />
                                            <Text style={{ fontSize: 15, }}>No</Text>

                                        </View>
                                    </View>

                                    {dropdounHide5 ? (
                                        <View style={{ zIndex: 5, flexDirection: "column", width: "100%", }}>
                                            <MultiSelect
                                                style={[styles.dropdown, isFocus3 && { borderColor: '#85060F' }]}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                search
                                                keyboardAvoiding={true}
                                                dropdownPosition="BOTTOM"
                                                data={items5}
                                                maxHeight={200}
                                                labelField="label"
                                                valueField="value"
                                                placeholder="Select an item"
                                                searchPlaceholder="Search..."
                                                value={value5}
                                                containerStyle={{ borderColor: "red", position: 'relative', }}
                                                onChange={item => {
                                                    console.log('heeellle multi 3', item)
                                                    setValue5(item);
                                                }}

                                            />
                                        </View>
                                    ) : null}

                                </View>
                                <View style={{ width: '95%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: scale(20), }}>
                                    <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: scale(10) }}>
                                        <Text style={{ fontSize: scale(15), color: 'black' }}>6. In The Last 6 Months Have You Had Any Of The Following :</Text>
                                        <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40, }}>
                                            <RadioButton
                                                value="yes"
                                                color={color.red}
                                                status={checked6 === 'yes' ? 'checked' : 'unchecked'}
                                                onPress={() => Test6('yes')}
                                            />
                                            <Text style={{ fontSize: 15, }}>Yes</Text>

                                            <RadioButton
                                                value="no"
                                                color={color.red}
                                                status={checked6 === 'no' ? 'checked' : 'unchecked'}
                                                onPress={() => Test6('no')}
                                            />
                                            <Text style={{ fontSize: 15, }}>No</Text>

                                        </View>
                                    </View>

                                    {dropdounHide6 ? (
                                        <View style={{ zIndex: 5, flexDirection: "column", width: "100%", }}>
                                            <MultiSelect
                                                style={[styles.dropdown, isFocus3 && { borderColor: '#85060F' }]}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                search
                                                keyboardAvoiding={true}
                                                dropdownPosition="BOTTOM"
                                                data={items6}
                                                maxHeight={200}
                                                labelField="label"
                                                valueField="value"
                                                placeholder="Select an item"
                                                searchPlaceholder="Search..."
                                                value={value6}
                                                containerStyle={{ borderColor: "red", position: 'relative', }}
                                                onChange={item => {
                                                    console.log('heeellle multi 3', item)
                                                    setValue6(item);
                                                }}
                                            />
                                        </View>
                                    ) : null}

                                </View>
                                <View style={{ width: '95%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: scale(20), }}>
                                    <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: scale(10) }}>
                                        <Text style={{ fontSize: scale(15), color: 'black' }}>7. In The Last 12 Months Have You Had Any Of The Following :</Text>
                                        <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40, }}>
                                            <RadioButton
                                                value="yes"
                                                color={color.red}
                                                status={checked7 === 'yes' ? 'checked' : 'unchecked'}
                                                onPress={() => Test7('yes')}
                                            />
                                            <Text style={{ fontSize: 15, }}>Yes</Text>

                                            <RadioButton
                                                value="no"
                                                color={color.red}
                                                status={checked7 === 'no' ? 'checked' : 'unchecked'}
                                                onPress={() => Test7('no')}
                                            />
                                            <Text style={{ fontSize: 15, }}>No</Text>

                                        </View>
                                    </View>
                                    {dropdounHide7 ? (
                                        <View style={{ zIndex: 5, flexDirection: "column", width: "100%", }}>
                                            <MultiSelect
                                                style={[styles.dropdown, isFocus3 && { borderColor: '#85060F' }]}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                search
                                                keyboardAvoiding={true}
                                                dropdownPosition="BOTTOM"
                                                data={items7}
                                                maxHeight={200}
                                                labelField="label"
                                                valueField="value"
                                                placeholder="Select an item"
                                                searchPlaceholder="Search..."
                                                value={value7}
                                                containerStyle={{ borderColor: "red", position: 'relative', }}
                                                onChange={item => {
                                                    console.log('heeellle multi 3', item)
                                                    setValue7(item);
                                                }}
                                            />
                                        </View>
                                    ) : null}

                                </View>
                                <View style={{ width: '95%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: scale(20), }}>
                                    <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: scale(10) }}>
                                        <Text style={{ fontSize: scale(15), color: 'black' }}>8. Have You Ever Had Any Of The Following (Permanent Defer) :</Text>
                                        <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40, }}>
                                            <RadioButton
                                                value="yes"
                                                color={color.red}
                                                status={checked8 === 'yes' ? 'checked' : 'unchecked'}
                                                onPress={() => Test8('yes')}
                                            />
                                            <Text style={{ fontSize: 15, }}>Yes</Text>

                                            <RadioButton
                                                value="no"
                                                color={color.red}
                                                status={checked8 === 'no' ? 'checked' : 'unchecked'}
                                                onPress={() => Test8('no')}
                                            />
                                            <Text style={{ fontSize: 15, }}>No</Text>

                                        </View>
                                    </View>
                                    {dropdounHide8 ? (
                                        <View style={{ zIndex: 5, flexDirection: "column", width: "100%", }}>
                                            <MultiSelect
                                                style={[styles.dropdown, isFocus3 && { borderColor: '#85060F' }]}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                search
                                                keyboardAvoiding={true}
                                                dropdownPosition="BOTTOM"
                                                data={items8}
                                                maxHeight={200}
                                                labelField="label"
                                                valueField="value"
                                                placeholder="Select an item"
                                                searchPlaceholder="Search..."
                                                value={value8}
                                                containerStyle={{ borderColor: "red", position: 'relative', }}
                                                onChange={item => {
                                                    console.log('heeellle multi 8', item)
                                                    SafeSex1(item)
                                                    setValue8([])
                                                }}

                                            />
                                        </View>
                                    ) : null}

                                </View>

                            </View>
                        ) : null
                    }
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
            <Modal animationType="fade" transparent={true} visible={modalVisible}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            height: 290,
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
                        <View style={{ height: moderateScale(40), width: '100%', flexDirection: 'row', borderBottomWidth: 0.3, }}>
                            <View style={{ height: moderateScale(40), width: '70%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: scale(19), color: 'black', fontWeight: '350', color: '#808080' }}>Permanent Defer</Text>
                            </View>

                        </View>
                        <View style={{
                            justifyContent: 'flex-start',
                            flexDirection: 'column',
                            flexDirection: 'row',
                            width: '94%',
                            height: moderateScale(160),
                            backgroundColor: isActive ? '#f7d9db' : '#bee2c5',
                            padding: 15,
                            borderRadius: 10,
                            marginTop: moderateScale(10),
                            marginBottom: moderateScale(10),

                        }}>{TextHide ? (
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
                                    <Text style={{ fontSize: scale(17), textAlign: 'center', color: '#994145', }}>Sorry you are not eligible to donate</Text>
                                </View>
                                <View style={{
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    width: '100%',
                                    height: moderateScale(25),
                                }}>
                                    <Text style={{ fontSize: scale(16), textAlign: 'center', color: '#994145', }}>blood for the following reason:</Text>
                                </View>
                                <View style={{
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    width: '100%',

                                }}>
                                    <Text style={{ fontSize: scale(17), textAlign: 'center', color: '#660e0e', }}>{value8}</Text>
                                </View>
                                <View style={{
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    width: '100%',
                                    height: moderateScale(40),
                                }}>
                                    <Text style={{ fontSize: scale(16), color: '#994145', }}>You can refer someone else to donate blood.</Text>
                                </View>


                            </View>

                        ) : (
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
                                    <Text style={{ fontSize: scale(17), textAlign: 'center', color: '#196827', }}>Sorry you are not eligible to donate</Text>
                                </View>
                                <View style={{
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    width: '100%',
                                    height: moderateScale(25),
                                }}>
                                    <Text style={{ fontSize: scale(16), textAlign: 'center', color: '#196827', }}>blood for but data has been </Text>
                                </View>
                                <View style={{
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    width: '100%',

                                }}>
                                    <Text style={{ fontSize: scale(17), textAlign: 'center', color: '#196827', }}>collected.</Text>
                                </View>
                                <View style={{
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    width: '100%',
                                    height: moderateScale(40),
                                }}>
                                    <Text style={{ fontSize: scale(16), color: '#196827', }}>You can refer someone else to donate blood.</Text>
                                </View>


                            </View>
                        )
                            }

                        </View>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            width: '100%',
                            height: moderateScale(40),
                        }}>
                            <TouchableOpacity onPress={() => SafeSex('none')} style={{ height: moderateScale(40), width: '40%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: color.red, borderRadius: moderateScale(6), marginRight: moderateScale(15) }}>
                                <Text style={{ fontSize: scale(16), textAlign: 'center', color: 'white' }}>
                                    Modify
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => NaviChangeColor()} style={{ height: moderateScale(40), width: '40%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: color.red, borderRadius: moderateScale(6), }}>
                                <Text style={{ fontSize: scale(16), textAlign: 'center', color: 'white' }}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>

    )
}
export default FirstForm1;
const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        backgroundColor: 'white',
        borderWidth: scale(1),
        padding: scale(15),
        borderRadius: 5,
        letterSpacing: 1,
        fontSize: scale(15),
        fontWeight: '400',
        color: 'black',
    },
    selectedTextStyle: {
        fontSize: 12,
        color: 'black',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
    },
});
