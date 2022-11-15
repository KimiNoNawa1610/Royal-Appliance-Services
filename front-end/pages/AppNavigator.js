import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import { createStackNavigator } from "@react-navigation/stack";
const { Navigator, Screen } = createStackNavigator();
import React from "react";
import EditTech from "./EditTech";
import ViewTechs from "./ViewTechs";
import Login from "./Login";
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator headerShown="true">
        <Screen name={"Login"} component={Login}></Screen>
        <Screen name={"Drawer"} component={DrawerNavigator} />
        <Screen name={"EditTech"} component={EditTech} />
      </Navigator>
    </NavigationContainer>
  );
};
