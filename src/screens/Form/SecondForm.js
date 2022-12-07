import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { moderateScale, scale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

import COLORS from '../../styles/color';
import color from '../../styles/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerHeader from '../../Components/DrawerHeader'

const SecondForm = () => {
  const navigation = useNavigation()
  const [checkedA, setCheckedA] = useState('no');
  const [checkedB, setCheckedB] = useState('no');
  const [checkedC, setCheckedC] = useState('yes');
  const [checkedD, setCheckedD] = useState('no');
  const [checkedA1, setCheckedA1] = useState('no');
  const [checkedB1, setCheckedB1] = useState('no');
  const [checkedC1, setCheckedC1] = useState('no');
  const [checkedD1, setCheckedD1] = useState('none');
  const [checked1, setChecked1] = useState('N/A');
  const [checked2, setChecked2] = useState('no');
  const [checked3, setChecked3] = useState('yes');
  const [checked4, setChecked4] = useState('no');
  const [checked5, setChecked5] = useState('yes');
  const [textString, settextString] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const SafeSex = (value) => {
    if (value == 'no') {
      setChecked1('no')
      setModalVisible(true)
      settextString('Practice safe sex')
     } else {
      setModalVisible(false)
      setChecked1('yes')
      setChecked2('no')
      setCheckedA('no')
      setCheckedB('no')
      setCheckedD('no')
      setCheckedA1('no')
      setCheckedB1('no')
      setCheckedC1('no')
      setCheckedD1('yes')
     }
  }
  const [isActive, setIsActive] = useState(true);
  const [TextHide, setTextHide] = useState(true);

  const NaviChangeColor = () => {
    if ('hello' == 'hello') {
      setIsActive(false);
      setTextHide(false)
      navigation.navigate('Home')
    }
  }
  const HivPositive = (value) => {
    if (value == 'yes') {
      setModalVisible(true)
      setChecked2('yes')
      settextString('HIV Positive')
    }
  }

  const SexualActivity4A = (value) => {
    if (value == 'yes') {
      setCheckedA('yes')
      setModalVisible(true)
      settextString('Sexual activity by paying money or vise versa')
    }
  }
  const SexPartners4B = (value) => {
    if (value == 'yes') {
      setCheckedB('yes')
      setModalVisible(true)
      settextString('Multiple sex partner')
    }
  }
  const BackgroundYou4D = (value) => {
    if (value == 'yes') {
      setCheckedD('yes')
      setModalVisible(true)
      settextString('Sex with stranger')
    }
  }
  const Transmitted5A = (value) => {
    if (value == 'yes') {
      setCheckedA1('yes')
      setModalVisible(true)
      settextString('Suffered from sexually Transmitted disease')
    }
  }
  const Prescribed5B = (value) => {
    if (value == 'yes') {
      setCheckedB1('yes')
      setModalVisible(true)
      settextString('injected yourself with drugs not prescribed by doctor')
    }
  }
  const YourSexPartner5C = (value) => {
    if (value == 'yes') {
      setCheckedC1('yes')
      setModalVisible(true)
      settextString('Thinks any of the above questions may be true for your sex partner')
    }
  }
  const Patient5D = (value) => {
    if (value == 'no') {
      setCheckedD1('no')
      setModalVisible(true)
      settextString('Considering blood is not safe for transfusion to patient')
     }
  }

  const Patientyes = (value) => {
    if (value == 'yes') {
      setCheckedD1('yes')
     } else {
      setCheckedD1('none')
     }
  }
  const firstFormApi = async () => {
    const IdUser = await AsyncStorage.getItem('User')
    const WomenId = await AsyncStorage.getItem('WomenId1')
    const jsonValue = await AsyncStorage.getItem('Gender')
    let url = `https://bloodlinks.in/donation_Appointment`   //API to 
    console.log('hello Women', WomenId)
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        has_safe_sex: checked1,
        has_hiv_positive: checked2,
        to_undergo_hiv_test: checked3,
        has_sex_with_money: checkedA,
        has_multiple_sex_partner: checkedB,
        has_sexual_assualt: checkedC,
        has_sex_with_stranger: checkedD,
        has_sexually_transmitted_disease: checkedA1,
        has_injected_drugs: checkedB1,
        has_thinking_above_questions_true: checkedC1,
        has_consider_self_safe_transfusion: checkedD1,
        user_id: IdUser,
        form_step: 'step_3',
        form_id: WomenId,
        gender: jsonValue,
      }),
      headers: headers,
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log('RESPONSE apiiii second-------------->>>>', Response)
        // console.log(' second Id-------------->>>>', WomenId)
        if (Response.status == true) {
          alert('Secand Form successfully submit !')
          navigation.navigate('ThirdForm')
        } else {
          alert('First Form fail !')
        }
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "column", }}>
      <DrawerHeader name={'Blood Donation'} image1={false} />
      <View style={{ height: moderateScale(35), width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: moderateScale(10), }}>
        <Text style={{ fontSize: scale(18) }}>
          Step 2
        </Text>
      </View>
      <ScrollView>
        <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', height: 'auto', width: '100%', marginBottom: moderateScale(159) }}>
            <Text style={{ fontSize: 20, }}>REQUEST FOR BLOOD DONATION</Text>

            <View style={{ height: moderateScale(80), width: '95%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(15), color: 'black' }}>1.  Do You Practice Safe Sex ?</Text>
              <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                <RadioButton
                  value="yes"
                  color={COLORS.red}
                  status={checked1 === 'yes' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked1('yes')}
                />
                <Text style={{ fontSize: 15, }}>Yes</Text>

                <RadioButton
                  value="no"
                  color={COLORS.red}
                  status={checked1 === 'no' ? 'checked' : 'unchecked'}
                  onPress={() => SafeSex('no')}
                />
                <Text style={{ fontSize: 15, }}>No</Text>

                <RadioButton
                  value="N/A"
                  color={COLORS.red}
                  status={checked1 === 'N/A' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked1('N/A')}
                />
                <Text style={{ fontSize: 15, }}>N/A</Text>


              </View>
            </View>
            <View style={{ height: moderateScale(100), width: '95%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(15), color: 'black' }}>2. Are You HIV Positive Or Do You Think You May Be HIV Positive?</Text>
              <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                <RadioButton
                  value="yes"
                  color={COLORS.red}
                  status={checked2 === 'yes' ? 'checked' : 'unchecked'}
                  onPress={() => HivPositive('yes')}
                />
                <Text style={{ fontSize: 15, }}>Yes</Text>

                <RadioButton
                  value="no"
                  color={COLORS.red}
                  status={checked2 === 'no' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked2('no')}
                />
                <Text style={{ fontSize: 15, }}>No</Text>

              </View>
            </View>
            <View style={{ height: moderateScale(100), width: '95%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(15), color: 'black' }}>3. Is Your Reason For Donating Blood To Undergo An HIV Test ?</Text>
              <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                <RadioButton
                  value="yes"
                  color={COLORS.red}
                  status={checked3 === 'yes' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked3('yes')}
                />
                <Text style={{ fontSize: 15, }}>Yes</Text>

                <RadioButton
                  value="no"
                  color={COLORS.red}
                  status={checked3 === 'no' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked3('no')}
                />
                <Text style={{ fontSize: 15, }}>No</Text>
                <RadioButton
                  value="none"
                  color={COLORS.red}
                  status={checked3 === 'none' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked3('none')}
                />
                <Text style={{ fontSize: 15, }}>NO OF THESE</Text>

              </View>
            </View>
            <View style={{ height: moderateScale(40), width: '95%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(15), color: 'black' }}>4. In The Past 6 Months:</Text>
            </View>
            <View style={{ height: moderateScale(100), width: '94%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(15), color: 'black' }}>A) Have You Had Sexual Activity By Paying Money Or Vise Versa ?</Text>
              <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                <RadioButton
                  value="yes"
                  color={COLORS.red}
                  status={checkedA === 'yes' ? 'checked' : 'unchecked'}
                  onPress={() => SexualActivity4A('yes')}
                />
                <Text style={{ fontSize: 15, }}>Yes</Text>

                <RadioButton
                  value="no"
                  color={COLORS.red}
                  status={checkedA === 'no' ? 'checked' : 'unchecked'}
                  onPress={() => setCheckedA('no')}
                />
                <Text style={{ fontSize: 15, }}>No</Text>

              </View>
            </View>
            <View style={{ height: moderateScale(90), width: '94%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(15), color: 'black' }}>B) Have You Had Multiple Sex Partners ?</Text>
              <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                <RadioButton
                  value="yes"
                  status={checkedB === 'yes' ? 'checked' : 'unchecked'}
                  onPress={() => SexPartners4B('yes')}
                />
                <Text style={{ fontSize: 15, }}>Yes</Text>

                <RadioButton
                  value="no"
                  color={COLORS.red}
                  status={checkedB === 'no' ? 'checked' : 'unchecked'}
                  onPress={() => setCheckedB('no')}
                />
                <Text style={{ fontSize: 15, }}>No</Text>

              </View>
            </View>
            <View style={{ height: moderateScale(90), width: '94%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(15), color: 'black' }}>C) Victim Of Sexual Assault ?</Text>
              <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                <RadioButton
                  value="yes"
                  color={COLORS.red}
                  status={checkedC === 'yes' ? 'checked' : 'unchecked'}
                  onPress={() => setCheckedC('yes')}
                />
                <Text style={{ fontSize: 15, }}>Yes</Text>

                <RadioButton
                  value="no"
                  color={COLORS.red}
                  status={checkedC === 'no' ? 'checked' : 'unchecked'}
                  onPress={() => setCheckedC('no')}
                />
                <Text style={{ fontSize: 15, }}>No</Text>

              </View>
            </View>
            <View style={{ height: moderateScale(100), width: '94%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(15), color: 'black' }}>D) Sex With Someone Whose Background You Do Not Know ?</Text>
              <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                <RadioButton
                  value="yes"
                  color={COLORS.red}
                  status={checkedD === 'yes' ? 'checked' : 'unchecked'}
                  onPress={() => BackgroundYou4D('yes')}
                />
                <Text style={{ fontSize: 15, }}>Yes</Text>

                <RadioButton
                  value="no"
                  color={COLORS.red}
                  status={checkedD === 'no' ? 'checked' : 'unchecked'}
                  onPress={() => setCheckedD('no')}
                />
                <Text style={{ fontSize: 15, }}>No</Text>

              </View>
            </View>
            <View style={{ height: moderateScale(40), width: '95%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(15), color: 'black' }}>5. In The Past 12 Months:</Text>
            </View>
            <View style={{ height: moderateScale(100), width: '94%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(15), color: 'black' }}>
                A) Have You Suffered From Sexually Transmitted Disease ?</Text>
              <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                <RadioButton
                  value="yes"
                  color={COLORS.red}
                  status={checkedA1 === 'yes' ? 'checked' : 'unchecked'}
                  onPress={() => Transmitted5A('yes')}
                />
                <Text style={{ fontSize: 15, }}>Yes</Text>

                <RadioButton
                  value="no"
                  color={COLORS.red}
                  status={checkedA1 === 'no' ? 'checked' : 'unchecked'}
                  onPress={() => setCheckedA1('no')}
                />
                <Text style={{ fontSize: 15, }}>No</Text>

              </View>
            </View>
            <View style={{ height: moderateScale(90), width: '94%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(15), color: 'black' }}>
                B) Have You Ever Injected Yourself With Drugs Not Prescribed By Doctor ?</Text>
              <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                <RadioButton
                  value="yes"
                  color={COLORS.red}
                  status={checkedB1 === 'yes' ? 'checked' : 'unchecked'}
                  onPress={() => Prescribed5B('yes')}
                />
                <Text style={{ fontSize: 15, }}>Yes</Text>

                <RadioButton
                  value="no"
                  color={COLORS.red}
                  status={checkedB1 === 'no' ? 'checked' : 'unchecked'}
                  onPress={() => setCheckedB1('no')}
                />
                <Text style={{ fontSize: 15, }}>No</Text>

              </View>
            </View>
            <View style={{ height: moderateScale(90), width: '94%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(15), color: 'black' }}>C) Do You Think Any Of The Above Questions May Be True For Your Sex Partner ?</Text>
              <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                <RadioButton
                  value="yes"
                  color={COLORS.red}
                  status={checkedC1 === 'yes' ? 'checked' : 'unchecked'}
                  onPress={() => YourSexPartner5C('yes')}
                />
                <Text style={{ fontSize: 15, }}>Yes</Text>

                <RadioButton
                  value="no"
                  color={COLORS.red}
                  status={checkedC1 === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => setCheckedC1('second')}
                />
                <Text style={{ fontSize: 15, }}>No</Text>

              </View>
            </View>
            <View style={{ height: moderateScale(100), width: '94%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(15), color: 'black' }}
              >D) Do You Consider Your Blood Safe For Transfusion To A Patient ?</Text>
              <View style={{ height: moderateScale(55), width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                <RadioButton
                  value="yes"
                  color={COLORS.red}
                  status={checkedD1 === 'yes' ? 'checked' : 'unchecked'}
                  onPress={() => Patientyes('yes')}
                />
                <Text style={{ fontSize: 15, }}>Yes</Text>
                <RadioButton
                  value="no"
                  color={COLORS.red}
                  status={checkedD1 === 'no' ? 'checked' : 'unchecked'}
                  onPress={() => Patient5D('no')}
                />
                <Text style={{ fontSize: 15, }}>No</Text>
                <RadioButton
                  value="none"
                  color={COLORS.red}
                  status={checkedD1 === 'none' ? 'checked' : 'unchecked'}
                  onPress={() => Patientyes('none')}
                />
                <Text style={{ fontSize: 15, }}>NONE OF THESE</Text>
              </View>
            </View>
            <View style={{ height: moderateScale(150), width: '94%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(16), color: 'black' }}>1) The test done on your donated Blood are follows :</Text>
              <Text style={{ fontSize: scale(13.5), color: 'black' }}>1) HBsAg</Text>
              <Text style={{ fontSize: scale(13.5), color: 'black' }}>2) Anti HIV</Text>
              <Text style={{ fontSize: scale(13.5), color: 'black' }}>3) Anti HCV</Text>
              <Text style={{ fontSize: scale(13.5), color: 'black' }}>4) Syphilis</Text>
              <Text style={{ fontSize: scale(13.5), color: 'black' }}>5) Malaria Parasite</Text>
            </View>
            <View style={{ height: moderateScale(270), width: '94%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(15), color: 'black' }}>2) These tests are also done free of cost at ICTC Centre. If you are looking to get the test done, please contact Department of Microbiology,SMS Medical College. Jaipur.</Text>
              <Text style={{ fontSize: scale(15), color: 'black' }}>3) All the test results are kept highly confidential.Danger :The window period • It refers to the time from when a person is first infected till the person tests positive.</Text>
              <Text style={{ fontSize: scale(15), color: 'black' }}>4) Danger: the window period,laboratory tests are negative but the person is still capable of infecting others. Help keep the blood supply as safe as possible by lookingHONESTLY at your lifestyle & answering the question truthfully.</Text>
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
                  <Text style={{ fontSize: scale(17), textAlign: 'center', color: '#660e0e', }}>{textString}</Text>
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
  );
};



export default SecondForm;