import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
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

const AddTech = () => {
  let [techName, setTechName] = useState("");
  let [techEmail, setTechEmail] = useState("");
  let [techNewPass, setTechNewPass] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const prevCryptPass = "";

  const onSave = async () => {
    let sendJSON;
    if (techNewPass) {
      sendJSON = {
        email: techEmail,
        isAdmin: isAdmin,
        password: techNewPass,
        name: techName,
      };
    } else {
      sendJSON = {
        email: techEmail,
        isAdmin: isAdmin,
        password: prevCryptPass,
        name: techName,
      };
    }
    console.log(sendJSON);

    axios
      .post(BASE_URL + "/add_employee/", sendJSON, {
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
    setIsAdmin(isChecked);
  }

  return (
    <Layout style={styles.page}>
      <Text category={"h1"}>Add Employee</Text>
      <Divider />
      <Input
        onChangeText={(text) => setTechName(text)}
        defaultValue={techName}
        label={(evaProps) => <Text {...evaProps}>Name</Text>}
      />
      <Input
        onChangeText={(text) => setTechEmail(text)}
        keyboardType={"email-address"}
        defaultValue={techEmail}
        label={(evaProps) => <Text {...evaProps}>Email</Text>}
      />
      <Input
        onChangeText={(text) => setTechNewPass(text)}
        defaultValue={techNewPass}
        label={(evaProps) => <Text {...evaProps}>Password</Text>}
      />
      <Toggle
        checked={isAdmin}
        onChange={onCheckedChange}
        style={{ marginTop: 15 }}
      >
        Is Admin: {isAdmin}
      </Toggle>
      <Divider />
      <Button status={"success"} onPress={onSave}>
        Save
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
});

export default AddTech;
