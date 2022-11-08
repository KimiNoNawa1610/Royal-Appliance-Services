import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import { BASE_URL } from '../config';
import ViewTechs from './ViewTechs';
import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, TextInput, View, Text, Alert, SafeAreaView,
         Pressable,Image } from "react-native";

const Separator = () => (
  <View style={styles.separator} />
);

const AdminDashboard = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
    <View>
      
    </View>
    <Separator/>
    <View style={styles.container}>
      <View  style={styles.buttonContainer}>
        <Button title="View Techs" onPress={async ()=>{navigation.navigate("ViewTechs")}}/>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Create Job" onPress={async ()=>{ navigation.navigate("CreateJob")}}/>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Edit Job" onPress={async ()=>{ navigation.navigate("EditJob")}}/>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={async ()=>{AsyncStorage.removeItem("AccessToken"); navigation.navigate("Login")}}/>
      </View>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


export default AdminDashboard;

