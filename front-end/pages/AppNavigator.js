import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AdminDrawerNavigator from "./AdminDrawerNavigator";
import TechDrawerNavigator from "./TechDrawerNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import Login from "./Login";
const { Navigator, Screen } = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        { <Screen
          name="Login"
          component={Login}
          options={{ gestureEnabled: false }}
        />}
        <Screen
          name={"AdminDrawer"}
          component={AdminDrawerNavigator}
          options={{ gestureEnabled: false }}
        />
        <Screen
          name={"TechDrawer"}
          component={TechDrawerNavigator}
          options={{ gestureEnabled: false }}
        />
      </Navigator>
    </NavigationContainer>
  );
};
