import React from "react";
import AddTech from "./AddTech";
import ViewTechs from "./ViewTechs";
import CreateJob from "./CreateJob";
import AdminDashboard from "./AdminDashboard"
import AddClient from "./AddClient";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Drawer, DrawerItem, IndexPath } from "@ui-kitten/components";

const { Navigator, Screen } = createDrawerNavigator();
const DrawerContent = ({ navigation, state }) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
  >
    <DrawerItem title="Dashboard" />
    <DrawerItem title="My Employees" />
    <DrawerItem title="Create Job" />
    <DrawerItem title="Add Employee" />
    <DrawerItem title="Add Client" />
    <DrawerItem title="Logout" onPress={() => {AsyncStorage.removeItem("AccessToken"); navigation.navigate("Login")}} />
  </Drawer>
);

const AdminDrawerNavigator = () => {
  return (
    <Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Screen name="DashBoard" component={AdminDashboard} />
      <Screen name="My Employees" component={ViewTechs} />
      <Screen name="Create Job" component={CreateJob} />
      <Screen name="Add Employee" component={AddTech} />
      <Screen name="Add Client" component={AddClient} />
    </Navigator>
  );
};

export default AdminDrawerNavigator;
