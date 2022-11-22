import React from "react";
import AddTech from "./AddTech";
import ViewTechs from "./ViewTechs";
import CreateJob from "./CreateJob";
import AdminDashboard from "./AdminDashboard";
import AddClient from "./AddClient";
import Login from "./Login";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Drawer, DrawerItem, Icon, IndexPath } from "@ui-kitten/components";
import { SafeAreaView, StyleSheet, Image } from "react-native";
import InvoiceCreation from "./Invoice Creation";
const { Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => {
  const handleLogOut = () => {
    AsyncStorage.removeItem("AccessToken").then(navigation.navigate("Login"));
  };

  return (
    <SafeAreaView>
      <Drawer
        ListHeaderComponent={
          <SafeAreaView>
            <Image
              style={{
                height: 40,
                width: "95%",
                marginBottom: 5,
                marginHorizontal: 5,
              }}
              source={require("../assets/royal.png")}
            />
          </SafeAreaView>
        }
        stickyHeaderIndices={[0]}
        selectedIndex={new IndexPath(state.index)}
        onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
      >
        <DrawerItem
          title="Dashboard"
          accessoryRight={<Icon name={"home-outline"} />}
        />
        <DrawerItem
          title="My Employees"
          accessoryRight={<Icon name={"people-outline"} />}
        />
        <DrawerItem
          title="Create Job"
          accessoryRight={<Icon name={"briefcase-outline"} />}
        />
        <DrawerItem
          title="Invoice Creation"
          accessoryRight={<Icon name={"clipboard-outline"} />}
        />
        <DrawerItem
          title="Logout"
          onPress={handleLogOut}
          accessoryRight={<Icon name={"log-out-outline"} />}
        />
      </Drawer>
    </SafeAreaView>
  );
};

const AdminDrawerNavigator = () => {
  return (
    <Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Screen name="Dashboard" component={AdminDashboard} />
      <Screen name="My Employees" component={ViewTechs} />
      <Screen name="Create Job" component={CreateJob} />
      <Screen name="Invoice Creation" component={InvoiceCreation} />
      <Screen name="Logout" component={Login} />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  topPadding: {},
  image: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
});

export default AdminDrawerNavigator;
