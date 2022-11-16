import { NavigationContainer } from "@react-navigation/native";
import AdminDrawerNavigator from "./AdminDrawerNavigator";
import TechDrawerNavigator from "./TechDrawerNavigator";
import { createStackNavigator } from "@react-navigation/stack";
const { Navigator, Screen } = createStackNavigator();
import React from "react";
import Login from "./Login";
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown:false}}>
        <Screen name={"Login"} component={Login}></Screen>
        <Screen name={"AdminDrawer"} component={AdminDrawerNavigator} />
        <Screen name={"TechDrawer"} component={TechDrawerNavigator} />
      </Navigator>
    </NavigationContainer>
  );
};
