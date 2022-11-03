import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import {
  Button,
  Card,
  Input,
  Layout,
  Text,
  Divider,
  Toggle,
} from "@ui-kitten/components";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const EditTech = ({ route }) => {
  const tech = route.params.item;
  const techID = React.useRef(tech["employeeID"]);
  const techName = React.useRef(tech["name"]);
  const techEmail = React.useRef(tech["email"]);
  const techPass = React.useRef(tech["password"]);
  const [isAdmin, setIsAdmin] = React.useState(tech["isAdmin"]);
  const navigation = useNavigation();

  function onSave() {
    const sendJSON = {
      email: techEmail.current,
      employeeID: techID.current,
      isAdmin: isAdmin,
      password: techPass.current,
      name: techName.current,
    };
    console.log(sendJSON);
  }

  function onCheckedChange(isChecked) {
    setIsAdmin(isChecked);
  }

  return (
    <Layout style={styles.page}>
      <Text category={"h1"}>Edit Employee</Text>
      <Divider />
      <Input
        ref={techID}
        defaultValue={techID.current}
        keyboardType={"number-pad"}
        label={(evaProps) => <Text {...evaProps}>ID Number</Text>}
      />
      <Input
        ref={techName}
        defaultValue={techName.current}
        label={(evaProps) => <Text {...evaProps}>Name</Text>}
      />
      <Input
        keyboardType={"email-address"}
        defaultValue={techEmail.current}
        label={(evaProps) => <Text {...evaProps}>Email</Text>}
      />
      <Input
        defaultValue={techPass.current}
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
