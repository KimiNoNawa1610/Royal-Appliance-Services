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
    <DrawerItem title="Login" />
    <DrawerItem title="Dashboard" />
    <DrawerItem title="My Employees" />
    <DrawerItem title="Create Job" />
    <DrawerItem title="Invoices" />
  </Drawer>
);

const DrawerNavigator = () => {
  return (
    <Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Screen name="Login" component={Login} />
      <Screen name="DashBoard" component={TechDashBoard} />
      <Screen name="My Employees" component={ViewTechs} />
      <Screen name="Create Job" component={CreateJob} />
      <Screen name="Invoices" component={TechDashBoard} />
    </Navigator>
  );
};

export default DrawerNavigator;
