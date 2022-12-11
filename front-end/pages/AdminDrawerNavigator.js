import React from "react";
import ViewTechs from "./ViewTechs";
import CreateJob from "./CreateJob";
import AdminDashboard from "./AdminDashboard";
import Login from "./Login";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Drawer, DrawerItem, Icon, IndexPath } from "@ui-kitten/components";
import { SafeAreaView, StyleSheet, Image } from "react-native";
import InvoiceCreation from "./Invoice Creation";
import AdminViewTechIncome from "./AdminViewTechIncome";
import AdminViewInvoice from "./AdminViewInvoice";
import TechDashBoard from "./TechDashboard";
import TechATM from "./TechATM";
const { Navigator, Screen } = createDrawerNavigator();

/**
 * The Admin experience for this application is contained within this drawer. It allows for navigation between the different pages an admin would need.
 * @param navigation
 * @param state
 * @returns {JSX.Element}
 * @constructor
 */
const DrawerContent = ({ navigation, state }) => {
  /**
   * Callback function for when the user would logout from their session.
   */
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
          title="Calendar"
          accessoryRight={<Icon name={"home-outline"} />}
        />
        <DrawerItem
          title="My Jobs"
          accessoryRight={<Icon name={"briefcase-outline"} />}
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
          title="Income Sheets"
          accessoryRight={<Icon name={"clipboard-outline"} />}
        />
        <DrawerItem
          title="Invoice Creation"
          accessoryRight={<Icon name={"edit-outline"} />}
        />
        <DrawerItem
          title="Invoices"
          accessoryRight={<Icon name={"folder-outline"} />}
        />

        <DrawerItem
          title="Net Income"
          accessoryRight={<Icon name={"file-outline"} />}
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

/**
 * The actual navigation portion of the drawer. It takes in the DrawerContent and maps it to the navigations listed. It must be a 1:1 config or else navigation will be unoptimized.
 * @returns {JSX.Element}
 * @constructor
 */
const AdminDrawerNavigator = () => {
  return (
    <Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Screen name="Calendar" component={AdminDashboard} />
      <Screen name="Jobs" component={TechDashBoard} />
      <Screen name="My Employees" component={ViewTechs} />
      <Screen name="Create Job" component={CreateJob} />
      <Screen name="Income Sheets" component={AdminViewTechIncome} />
      <Screen name="Invoice Creation" component={InvoiceCreation} />
      <Screen name="Invoices" component={AdminViewInvoice} />
      <Screen name="Net Income" component={TechATM} />
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
