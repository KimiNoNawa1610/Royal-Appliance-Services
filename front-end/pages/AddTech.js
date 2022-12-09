import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import {
  Button,
  Input,
  Layout,
  Text,
  Divider,
  Toggle,
  Icon,
} from "@ui-kitten/components";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddTech = ({ setAddEmpVisible }) => {
  const [techName, setTechName] = useState("");
  const [techEmail, setTechEmail] = useState("");
  const [techNewPass, setTechNewPass] = useState("");
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
        if (res.status === 200) {
          showMessage({
            message: res.data,
            backgroundColor: "green",
            type: "success",
          });
        } else {
          showMessage({
            message: res.data,
            backgroundColor: "red",
            type: "error",
          });
        }
      })
      .then(setAddEmpVisible(false))
      .catch((err) => console.log(err));
  };

  function onCheckedChange(isChecked) {
    setIsAdmin(isChecked);
  }

  const onExit = () => {
    setAddEmpVisible(false);
  };

  return (
    <View style={styles.main}>
      <View style={styles.page}>
        <View style={{ flexDirection: "row" }}>
          <Text category={"h1"}>Add Employee </Text>
          <Button
            size="large"
            accessoryRight={<Icon name={"close-outline"} />}
            appearance={"ghost"}
            style={{ width: "5%" }}
            onPress={() => setAddEmpVisible(false)}
          ></Button>
        </View>
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
          Admin Status
        </Toggle>
      </View>

      <Button style={styles.buttons} status={"success"} onPress={onSave}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    marginTop: 20,
    justifyContent: "center",
    flexDirection: "row",
  },
  exitButton: {
    marginLeft: "30%",
  },
  main: {
    backgroundColor: "white",
    marginTop: "25%",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 100,
    elevation: 5,
  },
});

export default AddTech;
