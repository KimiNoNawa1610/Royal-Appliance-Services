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
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditTech = ({ route }) => {
  const tech = route.params.item;
  let [techID, setTechID] = useState(tech["employeeID"]);
  let [techName, setTechName] = useState(tech["name"]);
  let [techEmail, setTechEmail] = useState(tech["email"]);
  let [techNewPass, setTechNewPass] = useState(null);
  const [isAdmin, setIsAdmin] = React.useState(tech["isAdmin"]);
  const prevCryptPass = tech["password"];
  const navigation = useNavigation();

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
      .post(BASE_URL + "/add_employee/",{headers:{'token':await AsyncStorage.getItem("AccessToken")}} ,sendJSON)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  function onCheckedChange(isChecked) {
    setIsAdmin(isChecked);
  }

  return (
    <Layout style={styles.page}>
      <Text category={"h1"}>Edit Employee</Text>
      <Divider />
      <Input
        onChangeText={(text) => setTechID(text)}
        defaultValue={tech["employeeID"]}
        keyboardType={"number-pad"}
        label={(evaProps) => <Text {...evaProps}>ID Number</Text>}
      />
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
      <Button
        onPress={() => navigation.navigate("ViewTech")}
        appearance={"ghost"}
      >
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
});

export default EditTech;
