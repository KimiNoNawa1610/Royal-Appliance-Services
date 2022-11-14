import { NavigationContainer } from "@react-navigation/native";
import AdminDrawerNavigator from "./AdminDrawerNavigator";
import TechDrawerNavigator from "./TechDrawerNavigator";
import { createStackNavigator } from "@react-navigation/stack";
const { Navigator, Screen } = createStackNavigator();
import CreateInvoice from "./CreateInvoice";
import React from "react";
import Login from "./Login";
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator headerShown="true">
        <Screen name={"Create Invoice"} component={CreateInvoice}></Screen>
        <Screen name={"Login"} component={Login}></Screen>
        <Screen name={"AdminDrawer"} component={AdminDrawerNavigator} />
        <Screen name={"TechDrawer"} component={TechDrawerNavigator} />
      </Navigator>
    </NavigationContainer>
  );
};
