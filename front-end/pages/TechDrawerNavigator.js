import React from "react";
import TechATM from "./TechATM";
import TechDashBoard from "./TechDashboard";

import Login from "./Login";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Drawer, DrawerItem, Icon, IndexPath } from "@ui-kitten/components";
import { SafeAreaView, StyleSheet, Image } from "react-native";
import InvoiceCreation from "./Invoice Creation";
const { Navigator, Screen } = createDrawerNavigator();

/**
 * The component portion fo the Drawer component
 * @param navigation
 * @param state
 * @returns {JSX.Element}
 * @constructor
 */
const DrawerContent = ({ navigation, state }) => {
  /**
   * A callback function handling whenever the user logs out.
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
          title="Dashboard"
          accessoryRight={<Icon name={"home-outline"} />}
        />
        <DrawerItem
          title="Net Income"
          accessoryRight={<Icon name={"clipboard-outline"} />}
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

/**
 * The navigation portion of the Technician Drawer where it takes in the Drawer components and maps out their navigation configs.
 * @returns {JSX.Element}
 * @constructor
 */
const TechDrawerNavigator = () => {
  return (
    <Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Screen name="Dashboard" component={TechDashBoard} />
      <Screen name="Net Income" component={TechATM} />
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

export default TechDrawerNavigator;
