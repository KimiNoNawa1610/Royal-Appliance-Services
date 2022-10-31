import React from "react";
import {View, Text} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TechDashboard from "./pages/TechDashboard.js";
import ViewTechs from "./pages/ViewTechs.js";
import Login from "./pages/Login.js";
import AdminDashboard from "./pages/AdminDashboard.js";

const Stack = createNativeStackNavigator();

const StackNavigator = () =>{
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Group>
                <Stack.Screen name = "Login" component={Login}/>
                <Stack.Screen name = "TechDashboard" component={TechDashboard}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackNavigator;