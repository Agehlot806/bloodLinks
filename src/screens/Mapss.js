import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Platform,
    TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Circle } from "react-native-maps";
import { scale, moderateScale } from 'react-native-size-matters';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Geolocation from 'react-native-geolocation-service';
import image from '../assets/Images';
import { PhoneCall } from '../Components/PhoneCall';
import { onShare } from '../Components/ShareCom';
import { ComponentMap } from '../Components/MapsComp';
import { check, PERMISSIONS, RESULTS, request, openSettings } from 'react-native-permissions';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const ViewMap = () => {
    const [currentLongitude, setCurrentLongitude] = useState(null);
    const [currentLatitude, setCurrentLatitude] = useState(null);
    const [hospitalboollist, sethospitalboollist] = useState([]);
    const [LatLong, setLatLong] = useState([]);
    const [marginBottom, setmarginBottom] = useState(1);
    const services_list = () => {
        hospitalboollist,
            LatLong
        console.log('state api data lat and long list----->>>>>', currentLongitude, currentLatitude)

    }
    const _map = React.useRef(null);
    useEffect(() => {
        getOneTimeLocation();
        getLocationApi();
    }, []);
    useEffect(() => {
        getOneTimeLocation();
        console.log('state api data lat and long list----->>>>>', LatLong)
    }, [LatLong]);

    const [state, setState] = React.useState({
        latitude: 22.7479685,
        longitude: 75.8901339,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
    });
    const getLocationApi = () => {
        fetch('https://bloodlinks.in/hospital_list')
            .then((response) => response.json())
            .then((response) => {
                console.log('response api data hosptel list----->>>>>', response)
                sethospitalboollist(response)
                var states = Object.keys(response).length;
                console.log('length api data states----->>>>>', states)
                let latLng = [];
                for (var i = 0; i < states; i++) {
                    latLng.push({
                        lat: Number(response[i].latitude),
                        lng: Number(response[i].longitude)
                    })
                }
                setLatLong(latLng)
                console.log(' api data lat----->>>>>', latLng)
                // console.log(' api data long----->>>>>', log)
            })
            .catch((error) => {
                console.error('catch api error', error);
            });
        services_list()
    }

    const handlePermission = async () => {
        const resPerm = await checkPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (!resPerm) {
            const resReqt = await requestPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if (resReqt) {
                getOneTimeLocation();
            } else {
                openSettings().catch(() => console.warn('cannot open settings'));
            }
        } else {
            getOneTimeLocation();
        }
    }

    const checkPermission = async (permissionsName) => {
        const res = await check(permissionsName);
        return res === 'granted' ? true : false
    }

    const requestPermission = async (permissionsName) => {
        const res = await request(permissionsName);
        return res === 'granted' ? true : false
    }

    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {

                //getting the Longitude from the location json
                const currentLongitude = parseFloat(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude = parseFloat(position.coords.latitude);
                console.log('current location lat', currentLatitude)
                console.log('current location long', currentLongitude)

                setCurrentLongitude(currentLongitude);
                setCurrentLatitude(currentLatitude);
                setState({
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                    latitudeDelta: 0.04864195044303443,
                    longitudeDelta: 0.040142817690068,
                })
            },
            (error) => {
                handlePermission();
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };


    const LatLongOpen = (item) => {
        var latitude = (item.latitude)
        var longitude = (item.longitude)
        ComponentMap(latitude, longitude)
    }
    const ShareComponent = (item) => {
        onShare(item)
    }

    const renderItem = ({ item }) => (

        <View style={styles.card}  >
            <View style={styles.textContent}>
                <View style={{ height: scale(100), width: scale(70), alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={image.bloodDrop}
                        style={styles.cardImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={{ height: scale(50), }}>
                    <Text numberOfLines={1} style={styles.cardtitle}>{item.name}</Text>
                    <Text numberOfLines={1} style={styles.cardDescription}>{item.address_1}</Text>
                </View>
            </View>
            <View style={{ height: scale(50), alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <View
                    style={{
                        width: "12%",
                        height: "65%",
                        borderRadius: scale(40),
                        backgroundColor: 'white',
                        borderWidth: 2,
                        borderColor: '#DAE5F3',
                        marginRight: scale(10),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <TouchableOpacity onPress={() => LatLongOpen(item)}>
                        <Image
                            source={image.google}
                            style={{
                                width: scale(20),
                                height: scale(20),
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => ShareComponent(item)} style={{ height: scale(35), width: scale(45), alignItems: 'center', justifyContent: 'center', }}>
                    <Image
                        source={image.share}
                        style={{
                            width: scale(50),
                            height: scale(50),
                        }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ height: scale(35), width: scale(45), alignItems: 'center', justifyContent: 'center', }} onPress={() => PhoneCall()}>
                    <Image
                        source={image.phone}
                        style={{
                            width: scale(30),
                            height: scale(30),
                        }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
    function CustomMarker() {
        return (
            <View style={styles.markerWrap}>
                <Image
                    source={image.Maps}
                    style={styles.cardImage}
                    resizeMode="contain"
                />
            </View>
        );
    }
    function CustomMarker1() {
        return (
            <View style={styles.markerWrap1}>
                <Image
                    source={image.current}
                    style={styles.cardImag1}
                    resizeMode="contain"
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                paddingAdjustmentBehavior="automatic"
                initialRegion={state}
                region={state}
                style={[styles.container, { marginBottom: marginBottom }]}
                provider={PROVIDER_GOOGLE}
                MyLocationEnabled={true}
                showsTraffic={true}
                showsMyLocationButton={true}
                onMapReady={() => setmarginBottom(0)}>
                {LatLong.map((item, index) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: item.lat,
                                longitude: item.lng,
                            }}
                        >
                            <CustomMarker />
                        </ Marker>

                    );
                })}
                <Marker coordinate={state}>
                    <CustomMarker1 />
                </Marker>

            </MapView>
            <SwiperFlatList
                style={styles.scrollView}
                autoplayDelay={3}
                index={2}
                data={hospitalboollist}
                renderItem={renderItem}
            />


        </View>
    );
};

export default ViewMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        left: SPACING_FOR_CARD_INSET,
        right: SPACING_FOR_CARD_INSET,
        position: "absolute",
        bottom: 20,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {

        width: scale(45),
        height: scale(45),
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardImag1: {
        width: scale(70),
        height: scale(70),
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContent: {
        flex: 3,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    cardtitle: {
        fontSize: scale(15),
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: scale(16),
        color: "#444",
    },
    markerWrap: {
        width: scale(70),
        height: scale(50),
        alignItems: 'center',
        justifyContent: 'center'
    },
    markerWrap1: {
        width: scale(80),
        height: scale(80),
        alignItems: 'center',
        justifyContent: 'center'
    },

    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});