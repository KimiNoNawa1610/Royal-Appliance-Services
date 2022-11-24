import React, { useState } from "react";
import { StyleSheet, Linking, Platform } from "react-native";
import {
  Button,
  Input,
  Layout,
  Text,
  Divider,
  Toggle,
  Icon,
  Card,
} from "@ui-kitten/components";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const ViewJobDetail = ({ item, setVisible }) => {
  const job = item;
  const [isFinished, setIsFinished] = useState(job["isCompleted"]);
  
  const oMap = async (address) => {
    const destination = encodeURIComponent(address);  
    const provider = Platform.OS === 'ios' ? 'apple' : 'google'
    const link = `http://maps.${provider}.com/?daddr=${destination}`;

    try {
        const supported = await Linking.canOpenURL(link);

        if (supported) Linking.openURL(link);
    } catch (error) {
        console.log(error);
    }
}


  const onSave = async () => {
    axios
      .post(BASE_URL + "/job_is_finished/"+job["jobID"].toString()+"/"+isFinished.toString(), {}, {
        headers: { token: await AsyncStorage.getItem("AccessToken") },
      })
      .then((res) => {
        
        if (res.status == 200) {
          showMessage({
            message: res.data,
            backgroundColor: "green",
            type: "success",
          })
        }

        else {
          showMessage({
            message: res.data,
            backgroundColor: "red",
            type: "error",
          })
        }
        ;
      })
      .catch((err) => console.log(err));
  };

  function onCheckedChange(isChecked) {
    setIsFinished(isChecked);
  }

  return (
  
    <Card style={styles.page}>
      <Text category={"h1"}>Job Details</Text>
      <Divider />
      <Text style={{ fontWeight: "bold",paddingTop: 10, paddingBottom:5 }}>CLIENT:</Text>
      <Text>{job["name"]}</Text>
      <Text style={{ fontWeight: "bold",paddingTop:10, paddingBottom:5 }}>DESCRIPTION:</Text>
      <Text>{job["description"]}</Text>
      <Divider style={{margin:5}}/>
      <Text style={{ fontWeight: "bold",paddingTop: 10, paddingBottom:5 }}>ADDRESS:</Text>
      <Layout style={{flexDirection:"row"}}>

      <Text style={{color:"blue",margin:10, marginLeft:-2}}>{job["address"]}</Text>
      <Button style={{height:10, width:10}} onPress={()=>oMap(job["address"])} accessoryLeft = {<Icon name={"map-outline"} />}></Button>
      </Layout>
      <Divider style={{margin:5}}/>
      <Text style={{ fontWeight: "bold", paddingTop:10 }}>START TIME: <Text>{new Date(job["dateStart"]).getMonth()+1 + "-" +
        new Date(job["dateStart"]).getDate() + "-" + new Date(job["dateStart"]).getFullYear()}</Text> </Text>
      {/* <Text>{new Date(job["dateStart"]).getMonth() + "-" +
        new Date(job["dateStart"]).getDate() + "-" + new Date(job["dateStart"]).getFullYear()}</Text> */}
      <Text style={{ fontWeight: "bold", paddingTop:10 }}>END TIME: <Text>{new Date(job["dateEnd"]).getMonth()+1 + "-" +
        new Date(job["dateEnd"]).getDate() + "-" + new Date(job["dateEnd"]).getFullYear()}</Text></Text>
      {/* <Text>{new Date(job["dateEnd"]).getMonth() + "-" +
        new Date(job["dateEnd"]).getDate() + "-" + new Date(job["dateEnd"]).getFullYear()}</Text> */}
    <Layout style={styles.buttons}> 
    <Toggle
        checked={isFinished}
        onChange={onCheckedChange}
        style={{ marginTop: 20}}
      >
      DONE {isFinished}
      </Toggle>
      <Divider />
      <Button style={{marginTop: 10}}status={"success"} onPress={onSave}>
        Save
      </Button>
      <Button onPress={() => setVisible(false)} appearance={"ghost"}>
        Back
      </Button>
    </Layout>
  
    </Card>
  );
};

const styles = StyleSheet.create({
  page: {
    // justifyContent: "left",
    // alignItems: "left",
    paddingTop: 10,
    paddingHorizontal: 40,
  },
  techName: {
    fontSize: 20,
    color:"#ff8c00",
    fontWeight:"bold",
    paddingBottom:5 
},
buttons:{
  justifyContent: "center",
    alignItems: "center",
}
});

export default ViewJobDetail;

