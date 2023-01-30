import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
import Home1 from '../screens/Home';
import RequestList from '../screens/RequestList';
import DonerList from '../screens/DonerList';
import Profile from '../screens/Profile';
import image from '../assets/Images';

const Tab = createBottomTabNavigator()
const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: 'white',
                inactiveTintColor: 'black',
                scrollEnabled: false,
            }}
            screenOptions={{
                headerShown: false,
                tabBarActiveBackgroundColor: 'black',
                tabBarStyle: {
                    height: 70,
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    left: 20,
                    shadowColor: '#93121B',
                    shadowOffset: { width: 20, height: 6 },
                    shadowOpacity: 5,
                    elevation: 2,
                }
            }}>
            <Tab.Screen
                name="Home1"
                component={Home1}
                options={{
                    tabBarLabelStyle: {
                        height: 23,
                        fontSize: 12.6,
                        textAlign: 'center',
                        width: 90,
                        fontWeight: '700',
                        // color: isFocused ? 'red' : '#222'
                    },
                    headerShown: false,
                    title: 'Home',
                     tabBarIcon: ({ color }) => (
                        <Image
                            source={image.homeIcon}
                            resizeMode="contain"
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: '#85060F'
                                // tintColor: focused ? 'white' : 'gray'
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Donate"
                component={DonerList}
                options={{
                    tabBarLabelStyle: {
                        height: 23,
                        fontSize: 12.6,
                        textAlign: 'center',
                        width: 90,
                        fontWeight: '700',
                    },
                    headerShown: false,
                    title: 'Donate',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={image.donetBlood}
                            resizeMode="contain"
                            style={{
                                width: 34,
                                height: 34,
                                fontSize: 15,
                                fontWeight: 'bold',
                                tintColor: '#85060F'
                            }}
                        />
                    ),
                    // tabBarLabel: 'DonerList',
                }}
            />
            <Tab.Screen
                name="Request Blood"
                component={RequestList}
                options={{
                    tabBarLabelStyle: {
                        height: 23,
                        fontSize: 12.6,
                        fontWeight: '600',
                        textAlign: 'center',
                        width: 90,
                    },
                    headerShown: false,
                    title: 'Request',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={image.request}
                            resizeMode="contain"
                            style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                width: 34,
                                height: 34,
                                tintColor: '#85060F'
                            }}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}

                options={{
                    tabBarLabelStyle: {
                        height: 23,
                        fontSize: 12.6,
                        fontWeight: '600',
                        textAlign: 'center',
                        width: 90,
                    },
                    headerShown: false,
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={image.profile}
                            resizeMode="contain"
                            style={{
                                tintColor: '#85060F',
                                width: 35,
                                height: 35,
                            }}
                        />
                    ),
                }}
            />

        </Tab.Navigator >
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,

        elevation: 5
    }
})

export default Tabs;