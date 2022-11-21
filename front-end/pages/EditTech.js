import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
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
import { showMessage } from "react-native-flash-message";

const EditTech = ({ item, setVisible }) => {
  const tech = item;
  let [techID, setTechID] = useState(tech["employeeID"]);
  let [techName, setTechName] = useState(tech["name"]);
  let [techEmail, setTechEmail] = useState(tech["email"]);
  let [techNewPass, setTechNewPass] = useState(null);
  const [isAdmin, setIsAdmin] = React.useState(tech["isAdmin"]);
  const prevCryptPass = tech["password"];

  const onDelete = async () => {
    axios
      .post(
        BASE_URL + "/delete_employee/" + techID.toString(),
        {},
        { headers: { token: await AsyncStorage.getItem("AccessToken") } }
      )
      .then((res) => {
        console.log(res);
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
      .catch((err) => console.log(err));
  };

  const onSave = async () => {
    let sendJSON;
    if (techNewPass) {
      sendJSON = {
        email: techEmail,
        employeeID: techID,
        isAdmin: isAdmin,
        password: techNewPass,
        name: techName,
      };
    } else {
      sendJSON = {
        email: techEmail,
        employeeID: techID,
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
      .catch((err) => console.log(err));
  };

  function onCheckedChange(isChecked) {
    setIsAdmin(isChecked);
  }

  return (
    <View style={styles.page}>
      <View style={{ flexDirection: "row" }}>
        <Text category={"h1"}>Edit Employee </Text>
        <Button
          accessoryRight={<Icon name={"close-outline"} />}
          appearance={"ghost"}
          style={{ width: "5%" }}
          onPress={() => setVisible(false)}
        ></Button>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Input
          style={{ width: "60%" }}
          disabled={true}
          onChangeText={(text) => setTechID(text)}
          defaultValue={tech["employeeID"]}
          keyboardType={"number-pad"}
          label={(evaProps) => <Text {...evaProps}>ID Number</Text>}
        />
        <View style={{ width: "5%" }}></View>
        <Toggle
          checked={isAdmin}
          onChange={onCheckedChange}
          style={{ marginTop: 15, width: "35%" }}
        >
          Admin
        </Toggle>
      </View>

      <Divider />

      <Input
        onChangeText={(text) => setTechName(text)}
        defaultValue={tech["name"]}
        label={(evaProps) => <Text {...evaProps}>Name</Text>}
      />
      <Input
        onChangeText={(text) => setTechEmail(text)}
        keyboardType={"email-address"}
        defaultValue={tech["email"]}
        label={(evaProps) => <Text {...evaProps}>Email</Text>}
      />
      <Input
        onChangeText={(text) => setTechNewPass(text)}
        label={(evaProps) => <Text {...evaProps}>New Password</Text>}
      />

      <Divider />
      <View style={styles.buttons}>
        <Button status={"success"} onPress={onSave}>
          Save
        </Button>

        <Divider />
      </View>
      <Button status={"danger"} onPress={onDelete} style={{ marginTop: 150 }}>
        Delete Employee
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    paddingBottom: 400,
    marginTop: "65%",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttons: {
    paddingTop: 20,
    justifyContent: "center",
    flexDirection: "row",
  },
  exitButton: {
    marginLeft: "30%",
  },
});

export default EditTech;
