import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AdminDrawerNavigator from "./AdminDrawerNavigator";
import TechDrawerNavigator from "./TechDrawerNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import Login from "./Login";
const { Navigator, Screen } = createStackNavigator();

/**
 * A React-Native component that acts as our central navigation page.
 * It defaults to the Login page and then redirects to either the Admin or Technician Drawer based on credentials.
 * @returns {JSX.Element}
 * @constructor
 */
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        {
          <Screen
            name="Login"
            component={Login}
            options={{ gestureEnabled: false }}
          />
        }
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
