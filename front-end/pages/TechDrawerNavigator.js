import Login from "./Login";
import TechDashBoard from "./TechDashboard";
import ViewTechs from "./ViewTechs";
import CreateJob from "./CreateJob";
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
    <DrawerItem title="Create Invoices" />
  </Drawer>
);

const TechDrawerNavigator = () => {
  return (
    <Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Screen name="DashBoard" component={TechDashBoard} />
      <Screen name="Invoices" component={TechDashBoard} />
    </Navigator>
  );
};

export default TechDrawerNavigator;