import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./pages/Login.js"
import EditJob from "./pages/EditJob";


export default function App() {
  //Navigation is not in place, using this to test each different page manually
  return (
    <View style={styles.container}>
      <EditJob/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27445C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
