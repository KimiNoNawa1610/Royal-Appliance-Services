import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TechDashboard from "./pages/TechDashboard.js";
import ViewTechs from "./pages/ViewTechs.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import EditTech from "./pages/EditTech";
import Login from "./pages/Login.js";
import CreateJob from "./pages/CreateJob.js";
import EditJob from "./pages/EditJob.js";
import EmployeeGenerator from "./pages/EmployeeGenerator.js";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ViewTechs" component={ViewTechs} />
        <Stack.Screen name="TechDashboard" component={TechDashboard} />
        <Stack.Screen name="CreateJob" component={CreateJob} />
        <Stack.Screen name="EditJob" component={EditJob} />
        <Stack.Screen name="EditTech" component={EditTech} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        {/* <Stack.Screen name = "EmployeeGenerator" component={EmployeeGenerator}/> */}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
