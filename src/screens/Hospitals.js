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
  ActivityIndicator, StyleSheet, Pressable
} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import image from '../assets/Images';
import DrawerHeader from '../Components/DrawerHeader';
import StatusTopBar from '../Components/StatusTopBar';
import { Dropdown } from 'react-native-element-dropdown';
import { PhoneCall } from '../Components/PhoneCall';
import { onShare } from '../Components/ShareCom';
import { ComponentMap } from '../Components/MapsComp';
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
  const LatLongOpen = (item) => {
    var latitude = (item.latitude)
    var longitude = (item.longitude)
    ComponentMap(latitude, longitude)
  }
  const ShareComponent = (item) => {
    var name = 'Hospitals Name'
    var address = 'Hospitals Address'
    onShare(item, name, address)
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}  >
      <View style={styles.textContent}>
        <View style={{ width: scale(70), alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={image.bloodDrop}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>
        <View style={{ width: '73%', padding: scale(5),}}>
          <Text numberOfLines={1} style={styles.cardtitle}>{item.name}</Text>
          <Text numberOfLines={2} style={styles.cardDescription}>{item.address_1}</Text>
        </View>
        
      </View>
      <View style={{ height: scale(40), alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', }}>

        <TouchableOpacity onPress={() => LatLongOpen(item)} style={{ height: scale(35), width: scale(45), alignItems: 'center', justifyContent: 'center', }}>
          <Image
            source={image.google}
            style={{
              tintColor: '#93121B',
              width: scale(24),
              height: scale(24),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => ShareComponent(item)} style={{ height: scale(35), width: scale(45), alignItems: 'center', justifyContent: 'center', }}>
          <Image
            source={image.share}
            style={{
              tintColor: '#93121B',
              width: scale(24),
              height: scale(24),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ height: scale(35), width: scale(45), alignItems: 'center', justifyContent: 'center', }} onPress={() => PhoneCall()}>
          <Image
            source={image.phone}
            style={{
              tintColor: '#93121B',
              width: scale(24),
              height: scale(24),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <StatusTopBar />
      <DrawerHeader name={'Hospital Lists'} />
      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: moderateScale(20), marginBottom: moderateScale(80), }}>
          <View style={{ flexDirection: 'column', height: moderateScale(100), width: '90%', }}>
            <View style={{ flex: 1, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', }}>

              <Dropdown
                style={[styles.input, isFocus1 && { borderColor: '#85060F' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemContainerStyle={{ borderColor: 'gray', borderWidth: 1.5, }}
                containerStyle={{ borderColor: 'gray', borderWidth: 1, }}
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
              <TouchableOpacity onPress={() => setIsLoading(true)} style={{ height: moderateScale(40), width: '45%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#93121B', borderRadius: moderateScale(2), marginRight: moderateScale(5), }}>
                <Text style={{ fontSize: scale(16), textAlign: 'center', color: 'white' }}>
                  Reset
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Filter()} style={{ height: moderateScale(40), width: '45%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', borderRadius: moderateScale(2), marginLeft: moderateScale(5), }}>
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
    width: '82%',
    marginLeft: 16,
  },
  input: {
    height: height * 0.07,
    width: scale(154),
    borderWidth: scale(1.40),
    padding: width * 0.03,
    borderRadius: 5,
    letterSpacing: 1,
    fontSize: scale(16.5),
    fontWeight: '400',
    color: 'black',
    marginBottom: scale(15)
  },
  card: {
    backgroundColor: "#FFF",
    elevation: 2,
    borderWidth: 0.8,
    borderColor: 'grey',
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
    // marginHorizontal:moderateScale(25),
    shadowColor: '#93121B',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: moderateScale(170),
    width: scale(295),
    overflow: "hidden",
  },
  textContent: {
    height: moderateScale(120),
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
   },
  cardImage: {
    width: scale(45),
    height: scale(45),
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardtitle: {
    fontSize: scale(15),
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: scale(16),
    color: "#444",
  },
});


