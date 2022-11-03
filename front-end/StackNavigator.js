import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TechDashboard from "./pages/TechDashboard.js";
import ViewTechs from "./pages/ViewTechs.js";
import Login from "./pages/Login.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import EditTech from "./pages/EditTech";
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="ViewTech" component={ViewTechs} />
        <Stack.Screen name="TechDashboard" component={TechDashboard} />
        <Stack.Screen name="EditTech" component={EditTech} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
