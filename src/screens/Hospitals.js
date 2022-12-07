import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator, StyleSheet,Pressable
} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { COLOR } from '../constants/colorConstants';
import DrawerHeader from '../Components/DrawerHeader';
import StatusTopBar from '../Components/StatusTopBar';
import { Dropdown } from 'react-native-element-dropdown';

const { width, height } = Dimensions.get('window');

const Hospital = props => {
  const navigation = props.navigation;
  const [hospitalboollist, sethospitalboollist] = useState([]);
  const [CityList, setCityList] = useState([]);
  const [PinList, setPinList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);

  const [City, setCity] = useState(null);
  const [Pincode, setPincode] = useState(null);

  useEffect(() => {
    fetch('https://bloodlinks.in/hospital_list')
      .then((response) => response.json())
      .then((response) => {
        console.log('response api data hosptel list----->>>>>', response)
        sethospitalboollist(response)
        setIsLoading(false);


      })
      .catch((error) => {
        console.error('catch api error', error);
      });
    services_list()
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      fetch('https://bloodlinks.in/hospitalcity_pincode_list')
        .then((response) => response.json())
        .then((response) => {
          console.log('Api response hospital pin code api ----->>>>>', response)
          sethospitalboollist(response)
          var states = Object.keys(response).length;
          console.log('length api data states----->>>>>', states)
          let CityArray = [];
          let PinCode = [];
          for (var i = 0; i < states; i++) {
            CityArray.push({
              value: response[i].city_name,
              label: response[i].city_name,
            })
            PinCode.push({
              value: response[i].pincode,
              label: response[i].pincode,
            })
          }
          setCityList(CityArray);
          setPinList(PinCode);
        })
        .catch((error) => {
          console.error('catch api error', error);
        });
    }, 2000)
  }, [isLoading]);
  const Filter = () => {
    let url = `https://bloodlinks.in/searchhospital_list?filter_city=${City}&filter_pin=${Pincode}`   //API to 
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    let data = {
      filter_city: City,
      filter_pin: Pincode,
    }
    console.log('filter custom data', data)
    fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        filter_city: City,
        filter_pin: Pincode,
      }),
      headers: headers,
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log('RESPONSE apiiii Filter hospital -------------->>>>', Response)
        sethospitalboollist(Response)
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
        alert("Server Error !");
      })
  }
  const services_list = () => {
    hospitalboollist
  }
  const listEmptyComponent = () => {
    return (
      <View style={{ height: height * .3, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'black' }}>List is Empty</Text>
      </View>
    )
  }
  const ValueNavi = (item) => {
    console.log('hospital param get value',item)
    navigation.navigate('HospitalMap', {
      LatNav: item.latitude,
      LongNav: item.longitude,
    })
  }
  const renderItem = ({ item }) => (
    <Pressable onPress={()=>ValueNavi(item)}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: moderateScale(350),
        height: moderateScale(200),
        backgroundColor: 'white',
        shadowColor: 'grey',
        borderWidth: 0.8,
        borderColor: 'grey',
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
          height: moderateScale(180),
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
            <Text style={{ fontSize: scale(16), textAlign: 'left', color: '#93121B', fontWeight: '300', width: scale(210) }}>Labs Name :-</Text>
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
            <Text style={{ fontSize: scale(16), textAlign: 'left', color: '#93121B', fontWeight: '300', width: scale(210) }}>Labs Address :-</Text>
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
        <View style={{ height: moderateScale(85), width: '20%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#adadad', borderRadius: moderateScale(6), marginRight: moderateScale(5), marginLeft: moderateScale(4), }}>
          <Image
            style={{ height: 80, width: 80 }}
            source={require('../assets/icons/bloodDrop.png')}
          />
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView>
      <StatusTopBar />
      <DrawerHeader name={'Hospital Lists'} />
      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: moderateScale(20), marginBottom: moderateScale(80), }}>
          <View style={{ flexDirection: 'column', height: moderateScale(100), width: '90%', }}>
            <View style={{ flex: 1, flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', }}>

              <Dropdown
                style={[styles.input, isFocus1 && { borderColor: '#85060F' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemContainerStyle={{ borderColor: 'gray', borderWidth: 1.5, }}
                containerStyle={{ borderColor: 'gray', borderWidth: 1, }}
                activeColor='#FDDDE0'
                dropdownPosition='bottom'
                data={CityList}
                search
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder={'Select City'}
                searchPlaceholder="Search..."
                value={City}
                onFocus={() => setIsFocus1(true)}
                onBlur={() => setIsFocus1(false)}

                onChange={item => {
                  setCity(item.value);
                  console.log('map data on change City', item)
                  setIsFocus2(false);
                }}

              />
              <Dropdown
                style={[styles.input, isFocus2 && { borderColor: '#85060F' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemContainerStyle={{ borderColor: 'gray', borderWidth: 1.5, }}
                containerStyle={{ borderColor: 'gray', borderWidth: 1, }}
                activeColor='#FDDDE0'
                dropdownPosition='bottom'
                data={PinList}
                search
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder={'Select PinCode'}
                searchPlaceholder="Search..."
                value={Pincode}
                onFocus={() => setIsFocus2(true)}
                onBlur={() => setIsFocus2(false)}
                onChange={item => {
                  setPincode(item.value);
                  console.log('map data on change pin', item)
                  setIsFocus2(false);
                }}

              />



            </View>

          </View>
          <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: moderateScale(50), width: '100%', marginTop: moderateScale(5), marginBottom: moderateScale(15) }}>
            <View style={{ height: moderateScale(50), width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
              <TouchableOpacity onPress={() => setIsLoading(true)} style={{ height: moderateScale(40), width: '45%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#278838', borderRadius: moderateScale(10), marginRight: moderateScale(5), }}>
                <Text style={{ fontSize: scale(16), textAlign: 'center', color: 'white' }}>
                  Reset
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Filter()} style={{ height: moderateScale(40), width: '45%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#278838', borderRadius: moderateScale(10), marginLeft: moderateScale(5), }}>
                <Text style={{ fontSize: scale(16), textAlign: 'center', color: 'white' }}>
                  Filter
                </Text>
              </TouchableOpacity>
            </View>

          </View>
          {isLoading ? (<ActivityIndicator />) : (
            <FlatList
              data={hospitalboollist}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              ListEmptyComponent={() => listEmptyComponent()}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default Hospital;
const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },

  inputSearchStyle: {
    height: 45,
    fontSize: 18,
    width: '90%',
    marginLeft: 16,
  },
  input: {
    height: height * 0.07,
    width: width * 0.8,
    borderWidth: scale(1.40),
    padding: width * 0.03,
    borderRadius: 5,
    letterSpacing: 1,
    fontSize: scale(16.5),
    fontWeight: '400',
    color: 'black',
    marginBottom: scale(15)
  },
});


