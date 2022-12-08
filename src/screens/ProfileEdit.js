import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { COLOR } from '../constants/colorConstants';
import StatusTopBar from '../Components/StatusTopBar';
import { DANGER } from '../assets/Constant/Constant';
import { RadioButton } from 'react-native-paper';
const { width, height } = Dimensions.get('window');
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, StackActions } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { moderateScale, scale } from 'react-native-size-matters';
import DrawerHeader from '../Components/DrawerHeader';
const ProfileEdit = props => {
    const navigation = props.navigation;
    const [name, setname] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [Age, setAge] = useState('');
    const [Gender, setGender] = useState('male');
    const [blood_group, setblood_group] = useState('');
    const [address, setaddress] = useState('');
    const [Data, setData] = useState([]);
    const [saveaImage, setSaveaImage] = useState();
    const [Photos, setPhotos] = useState();



    useEffect(() => {
        ProfileDta()
    }, []);

    useEffect(() => {
        setname(Data.first_name)
        setlastName(Data.last_name)
        setemail(Data.email)
        setphone(Data.ph_no)
        setAge(Data.age)
        setblood_group(Data.master_type_key_value)
        setaddress(Data.address)
    }, [Data]);

    useEffect(() => {
        setTimeout(() => {
            displayData();
        }, 100);
    });

    const displayData = async () => {
        const pic = await AsyncStorage.getItem('Photo');
        setSaveaImage(pic);
    };

    const ProfileDta = async () => {
        const IdUser = await AsyncStorage.getItem('User')

        let url = `https://bloodlinks.in/myprofile_data`   //API to 
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
            }),
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                console.log('RESPONSE apiiii Profile-------------->>>>', Response[0])
                setData(Response[0])
            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
                // alert("Server Error !");
            })
    }
    const ImageChange = () => {
        ImagePicker.openPicker({
            cropping: true,
            useFrontCamera: true,
        }).then(image => {
            setPhotos(image.path);
            AsyncStorage.setItem('Photo', image.path);
            console.log('hello', image.path);
        });
    };



    const ProfileEdit1 = async () => {
        const IdUser = await AsyncStorage.getItem('User')

        let url = `https://bloodlinks.in/myprofile_edit`   //API to 
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
                first_name: name,
                mid_name: '',
                last_name: lastName,
                gender: Gender,
                email: email,
                phone_number: phone,
                age: Age,
                address: address,
                password: 'null',
                blood_group: blood_group,
            }),
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                console.log('RESPONSE apiiii Profile Edit api-------------->>>>', Response)
                if (Response.status == true) {
                    alert("You are Edit successfully");
                    navigation.navigate('Home')
                } else {
                    alert("You are Edit Not successfully");
                }
            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
                // alert("Server Error !");
            })
        setname(Data.first_name)
        setlastName(Data.last_name)
        setemail(Data.email)
        setphone(Data.ph_no)
        setAge(Data.age)
        setGender(Data.gender)
        setblood_group(Data.master_type_key_value)
        setaddress(Data.address)
    }



    return (
        <SafeAreaView style={styles.container}>
            <StatusTopBar />
            <DrawerHeader name={'Edit Profile'} image1={false} />
            <ScrollView style={{ flex: 1, width: '100%' }}>

                <View style={styles.profile}>
                    <View style={{ height: moderateScale(150), width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: moderateScale(20) }}>

                        <View style={{ height: moderateScale(175), width: '59%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EF486A', borderRadius: 100, flexDirection: 'row' }}>
                            <Image
                                style={{ height: height * 0.23, width: '95%', borderRadius: 90 }}
                                resizeMode='cover'
                                source={{ uri: saveaImage }}
                            />

                        </View>

                        <TouchableOpacity onPress={() => ImageChange()} style={{ height: scale(36), width: '14%', backgroundColor: '#128C7E', bottom: scale(40), left: scale(50), borderRadius: scale(20), alignItems: 'center', padding: scale(1) }}>
                            <Image
                                style={{ height: 30, width: 30, top: scale(3) }}
                                source={require('../assets/icons/camera.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.profileDeatils}>
                    <View style={styles.imgCon}>
                        <Image
                            style={styles.icon}
                            source={require('../assets/icons/male1.png')}
                        />

                    </View>
                    <TextInput
                        style={{
                            height: scale(45),
                            borderColor: "black",
                            fontSize: scale(15.5),
                            color: "black",
                            width: "80%"
                        }}
                        placeholder={"name"}
                        value={name}
                        onChangeText={setname}
                        placeholderTextColor={"black"}
                    />
                </View>
                <View style={styles.profileDeatils}>
                    <View style={styles.imgCon}>
                        <Image
                            style={styles.icon}
                            source={require('../assets/icons/id-card.png')}
                        />

                    </View>
                    <TextInput
                        style={{
                            height: scale(45),
                            borderColor: "black",
                            fontSize: scale(15.5),
                            color: "black",
                            width: "80%"
                        }}
                        placeholder={"Last Name"}
                        value={lastName}
                        onChangeText={setlastName}
                        placeholderTextColor={"black"}
                    />
                </View>
                <View style={styles.profileDeatils}>
                    <View style={styles.imgCon}>
                        <Image
                            style={styles.icon}
                            source={require('../assets/icons/email.png')}
                        />

                    </View>
                    <TextInput
                        style={{
                            height: scale(45),
                            borderColor: "black",
                            fontSize: scale(15.5),
                            color: "black",
                            width: "80%"
                        }}
                        placeholder={"Email"}
                        value={email}
                        onChangeText={setemail}
                        placeholderTextColor={"black"}
                    />
                </View>
                <View style={styles.profileDeatils}>
                    <View style={styles.imgCon}>
                        <Image
                            style={styles.icon}
                            source={require('../assets/icons/phone.png')}
                        />

                    </View>
                    <TextInput
                        style={{
                            height: scale(45),
                            borderColor: "black",
                            fontSize: scale(15.5),
                            color: "black",
                            width: "80%"
                        }}
                        placeholder={"Phone"}
                        value={phone}
                        onChangeText={setphone}
                        placeholderTextColor={"black"}
                    />
                </View>
                <View style={styles.profileDeatils}>
                    <View style={styles.imgCon}>
                        <Image
                            style={styles.icon}
                            source={require('../assets/icons/age.png')}
                        />

                    </View>
                    <TextInput
                        style={{
                            height: scale(45),
                            borderColor: "black",
                            fontSize: scale(15.5),
                            color: "black",
                            width: "80%"
                        }}
                        placeholder={"Age"}
                        value={Age}
                        onChangeText={setAge}
                        placeholderTextColor={"black"}
                    />
                </View>
                <View style={styles.profileDeatils}>
                    <View style={styles.imgCon}>
                        <Image
                            style={[styles.icon, { height: height * 0.05, width: width * 0.09, }]}
                            source={require('../assets/icons/lavatory.png')}
                        />

                    </View>

                    <RadioButton
                        value="male"
                        color={DANGER}
                        status={Gender === 'male' ? 'checked' : 'unchecked'}
                        onPress={() => setGender('male')}
                    />
                    <Text style={{ fontSize: 15, }}>MALE</Text>

                    <RadioButton
                        value="female"
                        color={DANGER}
                        status={Gender === 'female' ? 'checked' : 'unchecked'}
                        onPress={() => setGender('female')}
                    />
                    <Text style={{ fontSize: 15, }}>FEMALE</Text>

                </View>
                <View style={styles.profileDeatils}>
                    <View style={styles.imgCon}>
                        <Image
                            style={styles.icon}
                            source={require('../assets/icons/bloodDrop.png')}
                        />

                    </View>
                    <TextInput
                        style={{
                            height: scale(45),
                            borderColor: "black",
                            fontSize: scale(15.5),
                            color: "black",
                            width: "80%"
                        }}
                        placeholder={"Blood Group"}
                        value={blood_group}
                        onChangeText={setblood_group}
                        placeholderTextColor={"black"}
                    />
                </View>
                <View style={styles.profileDeatils}>
                    <View style={styles.imgCon}>
                        <Image
                            style={styles.icon}
                            source={require('../assets/icons/location1.png')}
                        />

                    </View>
                    <TextInput
                        style={{
                            height: scale(45),
                            borderColor: "black",
                            fontSize: scale(15.5),
                            color: "black",
                            width: "70%"
                        }}
                        placeholder={"Address"}
                        value={address}
                        onChangeText={setaddress}
                        placeholderTextColor={"black"}
                    />
                </View>



                <TouchableOpacity onPress={() => ProfileEdit1()} style={{
                    marginBottom: moderateScale(15),
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    backgroundColor: '#85060F',
                    width: '70%',
                    marginLeft: scale(50),
                    height: moderateScale(60),
                    elevation: 6,
                    flexDirection: 'row',
                    borderRadius: moderateScale(15)
                }}>
                    <View style={{
                        width: '25%',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}>
                        <Image
                            style={[styles.icon, { tintColor: 'white' }]}
                            source={require('../assets/icons/refresh.png')}
                        />

                    </View>
                    <Text style={{
                        fontSize:scale(17.5),
                        color: 'white',
                        paddingLeft: scale(15),
                        textAlign: 'center'
                    }}>Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.WHITE,
    },
    profile: {
        backgroundColor: 'rgba(254,230,230,255)',
        alignItems: 'center',
        borderRadius: 100 / 10,
        paddingVertical: height * 0.025,
        width: '80%',
        elevation: 2,
        shadowColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        top: 25,
        marginBottom: moderateScale(40),
        paddingTop: moderateScale(30),
        marginHorizontal: 40,
    },
    profileName: {
        color: '#EF486A',
        fontSize: width * 0.065,
        fontWeight: 'bold',
        paddingTop: height * 0.02,
        textTransform: 'capitalize',
    },
    profileDeatils: {
        // backgroundColor: COLOR.WHITE,
        marginBottom: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#eae8e8',
        width: '90%',
        marginLeft: 20,
        height: moderateScale(70),
        elevation: 6,
        color: "black",
        flexDirection: 'row',
    },

    profileDeatilsTitle: {
        fontSize: width * 0.05,
        color: 'black',
        paddingRight: width * 0.13,
    },
    profileDeatil: {
        fontSize: width * 0.05,
        color: 'grey',
    },
    imgCon: {
        flexDirection: 'row',
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        height: height * 0.04,
        width: width * 0.08,
        marginRight: width * 0.05,
        tintColor: '#b31d27'
    },
});
export default ProfileEdit;
