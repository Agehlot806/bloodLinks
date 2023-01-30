9181094
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useWindowDimensions, Alert } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import IntroRoute from '../navigation/StackNavigator';
// import StackNavgator from "../StackNavigator";
import CustomSidebarMenu from "../screens/CustomSidebarMenu";
import Tabs from '../navigation/BottomNav';

const Drawer1 = createDrawerNavigator();

function Drawer(props) {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;
  return (
    <Drawer1.Navigator
      drawerType={dimensions.width >= 768 ? "front" : "front"}
      drawerStyle={isLargeScreen ? { width: '70%' } : { width: '70%' }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <Drawer1.Screen
        name="Home"
        options={{ drawerLabel: "First page for new user", headerShown: false }}
        component={Tabs}
      />
    </Drawer1.Navigator>
  );
}
export default Drawer;