import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
//import { getJobs} from "../apiCaller.js";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from 'react-native-dropdown-picker';
import { showMessage } from "react-native-flash-message";
import axios from "axios";

//The dynamic display
const Display = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [jobs, setJobs] = useState("");
 
  let fields = {jobs: []}
  useEffect(() => { getJobs(); }, []);

  const getJobs = async() => {
    const token1 = await AsyncStorage.getItem("AccessToken");
    axios.get(BASE_URL + "/get_all_jobs_withoutdate", {
      headers: {token: token1}})
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          //console.log(res1.data[i].name, res1.data[i].employeeID)
          fields.jobs.push({ jobID: res.data[i].jobID, clientID: res.data[i].clientID,
            description: res.data[i].description, isCompleted: res.data[i].isCompleted, 
            dateStart: res.data[i].dateStart, dateEnd: res.data[i].dateEnd})
        }
        console.log(fields.jobs)
      }) 
      .catch((err) => console.log(err));
  }

  const [jobItems, setJobItems] = useState(fields.jobs);
  console.log("jobItems: ", jobItems);

  //Define and Format the Item element here
  const Item = ({ item, onPress, backgroundColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title]}>{item.title}</Text>
      <Text>Client ID#: {item.clientID}</Text>
      <Text>dateStart: {item.dateStart}</Text>
      <Text>dateEnd: {item.dateEnd}</Text>
      <Text>description: {item.description}</Text>
      <Text>isCompleted: {item.isCompleted}</Text>
      <Text>Job ID#: {item.jobID}</Text>
    </TouchableOpacity>
  );
  //assign attributes to Item element once data passes in
  const renderItem = ({ item }) => {
    //bgColor: affects when pressed
    const backgroundColor = item.jobID === selectedId ? "white" : "white";
    const color = item.jobID === selectedId ? 'black' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.jobID)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={jobItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.jobID}
        extraData={selectedId}
      ></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Display;
