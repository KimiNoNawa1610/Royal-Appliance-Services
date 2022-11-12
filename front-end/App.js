import React from "react";
import "react-native-gesture-handler";
import { ApplicationProvider } from "@ui-kitten/components";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import * as eva from "@eva-design/eva";
import FlashMessage from "react-native-flash-message";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewTechs from "./pages/ViewTechs.js";
import TechDashBoard from "./pages/TechDashboard.js";
import CreateJob from "./pages/CreateJob.js";
import Login from "./pages/Login.js";
import EditTech from "./pages/EditTech";
import DrawerNavigator from "./pages/DrawerNavigator";
import { AppNavigator } from "./pages/AppNavigator";

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppNavigator></AppNavigator>
      <FlashMessage position="top" />
    </ApplicationProvider>
  );
}
/*const Stack = createNativeStackNavigator();

function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <View style={styles.centered}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name=" " component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
    </ApplicationProvider>
    );
}
*/
