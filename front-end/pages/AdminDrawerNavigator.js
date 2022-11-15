import Login from "./Login";
import AdminDashBoard from "./AdminDashboard";
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
    <DrawerItem title="My Employees" />
    <DrawerItem title="Create Job" />
    <DrawerItem title="Invoices" />
  </Drawer>
);

const AdminDrawerNavigator = () => {
  return (
    <Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Screen name="DashBoard" component={AdminDashBoard} />
      <Screen name="My Employees" component={ViewTechs} />
      <Screen name="Create Job" component={CreateJob} />
      <Screen name="Invoices" component={AdminDashBoard} />
    </Navigator>
  );
};

export default AdminDrawerNavigator;
