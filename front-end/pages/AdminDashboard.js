import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import { BASE_URL } from '../config';
import ViewTechs from './ViewTechs';
import { useNavigation } from "@react-navigation/native";
import {Button,StyleSheet,TextInput,View,Text,Alert,Pressable,Image} from "react-native";


const AdminDashboard = () => {
    const navigation = useNavigation();
      
    return (
        <View style={styles.press}>
            <Pressable onPress={() => navigation.navigate("ViewTech")}>
              <Text style={styles.text}>Employees List</Text>
            </Pressable>
          </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: "#fff",
      color: "#fff",
    },
    image: {
      width: 300,
      height: 50,
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    press: {
      elevation: 8,
      backgroundColor: "#393f4d",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      margin: 10,
      width: 200,
    },
    text: {
      fontSize: 18,
      color: "#fff",
      alignSelf: "center",
      textTransform: "uppercase",
    },
    space: {
      margin: 50,
    },
    icon: {
      width: 20,
      height: 20,
    },
  });
  

export default AdminDashboard;
