import React from "react";
import 'react-native-gesture-handler';
import { StyleSheet } from "react-native";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import ViewTechs from "./pages/ViewTechs.js";
import TechDashBoard from "./pages/TechDashboard.js";
import CreateJob from "./pages/CreateJob.js";
import Login from "./pages/Login.js";
import {createDrawerNavigator} from "@react-navigation/drawer"



/* Return JSON string for reference
{
    "client": "NVIDIA",
    "rows":[
    {"item":"RTX 3080","total":320,"my_part":30,"labor":150,"tax":30.5,"sell":699,"shipping":11,"paid_by":"cash"},
    {"item":"RTX 3070","total":2368.25,"my_part":45,"labor":150,"tax":25.45,"sell":499,"shipping":11,"paid_by":"credit"}
    ],
    "paid":670,
    "note":""
}
 */
const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName = "TechDashBoard">
          <Drawer.Screen name="Login" component={Login}/>
          <Drawer.Screen name = "DashBoard" component = {TechDashBoard}/>
          <Drawer.Screen name = "My Employee" component = {ViewTechs}/>
          <Drawer.Screen name = "Create Job" component={CreateJob}/>
          <Drawer.Screen name = "Invoices" component={TechDashBoard}/>
        </Drawer.Navigator>
      </NavigationContainer>
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
