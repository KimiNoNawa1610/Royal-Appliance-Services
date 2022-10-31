import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import CreateJob from "./pages/CreateJob.js";
import Login from "./pages/Login.js";
import EditJob from "./pages/EditJob";
import ViewTechs from "./pages/ViewTechs";
import {ApplicationProvider, Layout} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import TechDashboard from "./pages/TechDashboard.js";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackNavigator from "./StackNavigator.js";

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



export default function App()
{
  return(
      <ApplicationProvider {...eva} theme={eva.dark}>
          <NavigationContainer>
            <StackNavigator/>
          </NavigationContainer>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },

});
