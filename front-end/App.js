import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CreateJob from "./pages/CreateJob.js";
import Login from "./pages/Login.js";
import EditJob from "./pages/EditJob";

/*
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

export default function App() {
  //Navigation is not in place, using this to test each different page manually
  return (
    // <View style={styles.container}>
    //   <Login/>
    //   <StatusBar style="auto" />

    // </View>

    <View style={styles.container}>
      <EditJob />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27445C",
    alignItems: "center",
    justifyContent: "center",
  },
});
