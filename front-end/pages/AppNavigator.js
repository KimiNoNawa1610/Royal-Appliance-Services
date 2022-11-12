import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import { createStackNavigator } from "@react-navigation/stack";
const { Navigator, Screen } = createStackNavigator();
import React from "react";
import EditTech from "./EditTech";
import ViewTechs from "./ViewTechs";
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name={"Drawer"} component={DrawerNavigator} />
        <Screen name={"EditTech"} component={EditTech} />
      </Navigator>
    </NavigationContainer>
  );
};
