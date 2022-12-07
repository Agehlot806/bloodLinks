// const BottomNav = () => {
//     return (
//       // <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
//         <Tab.Screen name="Search" component={Search} />
//         <Tab.Screen name="Profile" component={Profile} />

//       </Tab.Navigator>
//       // </NavigationContainer>  
//     );
//   };


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
        <Tab.Navigator >
            <Tab.Screen
                name="Home1"
                component={Home1}
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={image.homeIcon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: '#85060F'
                                // tintColor: focused ? 'white' : 'gray'
                            }}
                        />
                    ),
                    tabBarLabel: 'Home',
                }}
            />
            <Tab.Screen
                name="RequestList"
                component={RequestList}

                options={{
                    headerShown: false,
                    title: 'RequestList',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require("../assets/Images/donor.png")}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                // tintColor: focused ? 'white' : 'gray'
                            }}
                        />
                    ),
                    tabBarLabel: 'RequestList',
                }}
            />
            <Tab.Screen
                name="DonerList"
                component={DonerList}
                options={{
                    headerShown: false,
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require("../assets/icons/address.png")}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                // tintColor: focused ? 'white' : 'gray'
                            }}
                        />
                    ),
                    tabBarLabel: 'DonerList',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}

                options={{
                    headerShown: false,
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={image.profile}
                            resizeMode="contain"
                            style={{
                                tintColor: '#85060F',
                                width: 30,
                                height: 30,
                                // tintColor: focused ? 'white' : 'gray'
                            }}
                        />
                    ),
                    tabBarLabel: 'Profile',
                }}
            />

        </Tab.Navigator>
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