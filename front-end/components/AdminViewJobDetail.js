import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Input,
  Layout,
  Text,
  Divider,
  Toggle,
  Card,
} from "@ui-kitten/components";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const AdminViewJobDetail = ({ item, setVisible }) => {
  console.log(item)
  const job = item;
  const [isFinished, setIsFinished] = useState(job["isCompleted"]);

  const onSave = async () => {
    axios
      .post(BASE_URL + "/job_is_finished/"+job["jobID"].toString(), {}, {
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
      <Text style={{ fontWeight: "bold",paddingTop: 10, paddingBottom:5 }} >CLIENT: {job["name"]}</Text>
      <Text style={{ fontWeight: "bold",paddingTop:10, paddingBottom:5 }}>DESCRIPTION:</Text>
      <Text>{job["description"]}</Text>
      <Text style={{ fontWeight: "bold",paddingTop:10, paddingBottom:5 }}>ADDRESS:</Text>
      <Text>{job["address"]}</Text>
      <Divider />
      <Text style={{ fontWeight: "bold", paddingTop:10 }}>Start TIME: </Text>
      <Text>{`${new Date(item["dateStart"]).getMonth()+1}-${new Date(item["dateStart"]).getDate()+1}-${new Date(item["dateStart"]).getFullYear()}`}</Text>
      <Divider />
      <Text style={{ fontWeight: "bold", paddingTop:10 }} >END TIME: </Text>
      <Text>{`${new Date(item["dateEnd"]).getMonth()+1}-${new Date(item["dateEnd"]).getDate()+1}-${new Date(item["dateEnd"]).getFullYear()}`}</Text>

      <Toggle
        checked={isFinished}
        onChange={onCheckedChange}
        style={{ marginTop: 20, marginBottom: 10 }}
      >
        Done {isFinished}
      </Toggle>
      <Divider />
      <Button status={"success"} onPress={onSave}>
        Save
      </Button>
      <Button onPress={() => setVisible(false)} appearance={"ghost"}>
        Back
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: 30,
  },
  techName: {
    fontSize: 20,
    color:"#ff8c00",
    fontWeight:"bold"
},
});

export default AdminViewJobDetail;

