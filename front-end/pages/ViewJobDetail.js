import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Input,
  Layout,
  Text,
  Divider,
  Toggle,
} from "@ui-kitten/components";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const ViewJobDetail = ({ item, setVisible }) => {
  const job = item;
  const [isFinished, setIsFinished] = useState(job["isCompleted"]);

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
    <Layout style={styles.page}>

      <Text category={"h1"}>Job Details</Text>
      <Divider />
      <Text style={styles.techName}>CLIENT: {job["name"]}</Text>
      <Text style={{ fontWeight: "bold" }}>DESCRIPTION:</Text>
      <Text>{job["description"]}</Text>
      <Text style={{ fontWeight: "bold" }}>ADDRESS:</Text>
      <Text>{job["address"]}</Text>
      <Divider />
      <Text style={{ fontWeight: "bold" }}>Start TIME: </Text>
      <Text>{new Date(job["dateStart"]).getMonth() + "-" +
        new Date(job["dateStart"]).getDate() + "-" + new Date(job["dateStart"]).getFullYear()}</Text>
      <Divider />
      <Text style={{ fontWeight: "bold" }}>END TIME: </Text>
      <Text>{new Date(job["dateEnd"]).getMonth() + "-" +
        new Date(job["dateEnd"]).getDate() + "-" + new Date(job["dateEnd"]).getFullYear()}</Text>

      <Toggle
        checked={isFinished}
        onChange={onCheckedChange}
        style={{ marginTop: 15 }}
      >
        Is Finish: {isFinished}
      </Toggle>
      <Divider />
      <Button status={"success"} onPress={onSave}>
        Save
      </Button>
      <Button onPress={() => setVisible(false)} appearance={"ghost"}>
        Back
      </Button>
    </Layout>
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

export default ViewJobDetail;

