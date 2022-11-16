import TechDashBoard from "./TechDashboard";
import Display from "./Display";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
const { Navigator, Screen } = createDrawerNavigator();
import { Drawer, DrawerItem, IndexPath } from "@ui-kitten/components";

const DrawerContent = ({ navigation, state }) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
  >
    <DrawerItem title="Dashboard" />
    <DrawerItem title="Display" />
    <DrawerItem title="Logout" onPress={() => {AsyncStorage.removeItem("AccessToken"); navigation.navigate("Login")}} />
  </Drawer>
);

const TechDrawerNavigator = () => {
  return (
    <Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Screen name="DashBoard" component={TechDashBoard} />
      <Screen name="Display" component={Display} />

    </Navigator>
  );
};

export default TechDrawerNavigator;
