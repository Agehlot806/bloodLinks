import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, CheckBox,TouchableOpacity} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { moderateScale, scale } from 'react-native-size-matters';
import DrawerHeader from '../../Components/DrawerHeader';
import color from '../../styles/color';

const Third = (Props) => {
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const firstFormApi = async () => {
    const IdUser = await AsyncStorage.getItem('User')
    const FormId = await AsyncStorage.getItem('WomenId1')
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
        user_id: IdUser,
        form_step: 'step_4',
        form_id: FormId,
        gender: jsonValue,


      }),
      headers: headers,
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log('RESPONSE apiiii second-------------->>>>', Response)
        // console.log(' second Id-------------->>>>', WomenId)
        if (Response.status == true) {
          alert('Third Form successfully submit !')
          Props.navigation.navigate('FourtForm')
        } else {
          alert('First Form fail !')
        }
      })
      .catch((error) => {
        console.error("ERROR FOUND catch" + error);
      })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "column", }}>
      <DrawerHeader name={'Blood Donation'} image1={false} />
      <View style={{ height: moderateScale(35), width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: moderateScale(10), }}>
        <Text style={{ fontSize: scale(18) }}>
          Step 3
        </Text>
      </View>
      <ScrollView>
        <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', height: 'auto', width: '100%', marginBottom: moderateScale(159) }}>
            <Text style={{ fontSize: 20, }}>REQUEST FOR BLOOD DONATION</Text>
            <View style={{ height: moderateScale(30), width: '95%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(16.5), color: color.red }}>Informed Consent:</Text>
            </View>
            <View style={{ height: moderateScale(40), width: '95%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(18), color: 'black' }}>INFORMED CONSENT:</Text>
            </View>
            <View style={{ height: moderateScale(420), width: '94%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(15), color: color.grey, marginBottom: moderateScale(2) }}>1) I have read and understood the intormati on in the donor form and education material.</Text>
              <Text style={{ fontSize: scale(15), color: color.grey, marginBottom: moderateScale(2) }}>2)I confirm, that to my knowledge. I have answered all the questions accurately and truth fully and do not consider myself to be a person involved in any of thedescribed activities that could please me at the risk of spreading HIV or Hepatitis.</Text>
              <Text style={{ fontSize: scale(15), color: color.grey, marginBottom: moderateScale(2) }}>3)I understand that any willful misrepresentation of the facts could endanger the patients receiving my blood.</Text>
              <Text style={{ fontSize: scale(15), color: color.grey, marginBottom: moderateScale(2) }}>4)I am aware that my blood will be screened for HIV. Hepatitis B. Hepatitis C. Malaria & Syphilis in addition to any other screening tests required to ensureblood safety</Text>
              <Text style={{ fontSize: scale(15), color: color.grey, marginBottom: moderateScale(2) }}>5)I understand that screening test are not diagnostics and may yield false pas :live resoults.klt,awlsNooulnderstand further confirmatory test would be required incase of oostve results and that for any positive results</Text>
            </View>
            <View style={{ height: moderateScale(60), width: '95%', flexDirection: 'column', margin: moderateScale(2), justifyContent: 'flex-start' }}>
              <View style={{ height: moderateScale(30), width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: moderateScale(30), width: '50%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Text style={{ fontSize: scale(15), color: color.grey, }}>I MaY </Text>
                </View>
                <View style={{ height: moderateScale(30), width: '50%', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                  />
                </View>
              </View>
              <View style={{ height: moderateScale(30), width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: moderateScale(30), width: '50%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Text style={{ fontSize: scale(15), color: color.grey, }}>be contacted</Text>
                </View>
                <View style={{ height: moderateScale(30), width: '50%', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Checkbox
                    status={checked1 ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked1(!checked1);
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ height: moderateScale(650), width: '94%', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(15), color: color.grey, marginBottom: moderateScale(2) }}>6)I understand that my blood will be utlized in accordance with regulatory guide'mesinclud,ng NBTC and drug and cosmetic act and regulations pertaining toit or its future replacements</Text>
              <Text style={{ fontSize: scale(15), color: color.grey, marginBottom: moderateScale(2) }}>7)I understand the blood donation procedure and possible risk (vaso-vagal re act on. hematoma. etc.) involved as explained.</Text>
              <Text style={{ fontSize: scale(15), color: color.grey, marginBottom: moderateScale(2) }}>8)I confirm that I am over the age of 18 years</Text>
              <Text style={{ fontSize: scale(15), color: color.grey, marginBottom: moderateScale(2) }}>9)I understand that blood donation is totally voluntary act and no inducement or remunerat on in cash or hind has been offered to me.</Text>
              <Text style={{ fontSize: scale(15), color: color.grey, marginBottom: moderateScale(2) }}>10)I prohibit any personal details (except demographic details) provided by me or about my donation to be disclosed to any individual or agency except askedby government.</Text>
              <Text style={{ fontSize: scale(15), color: color.grey, marginBottom: moderateScale(2) }}>11)I hereby declare that I am donating blood voluntarily without any pressure lone cchesionthreatlalse misconception from the Blood Bank.</Text>
              <Text style={{ fontSize: scale(15), color: color.grey, marginBottom: moderateScale(2) }}>12)I hereby volume-et to donate my Blood Blood components which may be used for pat,ent'scientific researchlfractionation (surplus plasma).</Text>
              <Text style={{ fontSize: scale(15), color: color.grey, marginBottom: moderateScale(2) }}>13)My donatea blood / components may be utilized beyond this Blood Bank</Text>
              <Text style={{ fontSize: scale(15), color: color.grey, marginBottom: moderateScale(2) }}>14)You would liked to be informed about any abnormal test results (HIV, HBsAg, HCV, Syphilis, Malaria parasite) at the address furnished by you</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: moderateScale(50), width: '100%', marginBottom: moderateScale(20), position: 'relative' }}>
        <View style={{ height: moderateScale(50), width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
          <TouchableOpacity onPress={() => Props.navigation.goBack()} style={{ height: moderateScale(50), width: '45%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#bb3039', borderRadius: moderateScale(10), marginRight: moderateScale(5), }}>
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



export default Third;