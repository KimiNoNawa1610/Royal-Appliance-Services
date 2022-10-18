import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CreateJob from './pages/CreateJob.js';
import Login from "./pages/Login.js"


export default function App() {
  //Navigation is not in place, using this to test each different page manually
  return (
    // <View style={styles.container}>
    //   <Login/>
    //   <StatusBar style="auto" />

    // </View>

    <View style={styles.container}>
      <CreateJob/>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
