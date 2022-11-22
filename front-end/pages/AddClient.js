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

const AddClient = ({ onChangeVisible }) => {
  let [Name, setName] = useState("");
  let [Note, setNote] = useState("");
  let [Address, setAddress] = useState("");
  let [Phone, setPhone] = useState("");
  let [Email, setEmail] = useState("");

  const onSave = async () => {
    let sendJSON = {
      name: Name,
      address: Address,
      phone: Phone,
      notes: Note,
      email: Email,
    };
    axios
      .post(BASE_URL + "/add_client", sendJSON, {
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
            type: "success",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout style={styles.page}>
      <View style={{ flexDirection: "row" }}>
        <Text category={"h1"}>Add Client </Text>
        <Button
          size="large"
          accessoryRight={<Icon name={"close-outline"} />}
          appearance={"ghost"}
          style={{ width: "5%" }}
          onPress={() => onChangeVisible(false)}
        ></Button>
      </View>
      <Divider />
      <Input
        onChangeText={(text) => setName(text)}
        defaultValue={Name}
        label={(evaProps) => <Text {...evaProps}>Name</Text>}
      />
      <Input
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
        defaultValue={Phone}
        label={(evaProps) => <Text {...evaProps}>Phone</Text>}
      />
      <Input
        onChangeText={(text) => setEmail(text)}
        keyboardType={"email-address"}
        defaultValue={Email}
        label={(evaProps) => <Text {...evaProps}>Email</Text>}
      />
      <Input
        onChangeText={(text) => setAddress(text)}
        defaultValue={Address}
        label={(evaProps) => <Text {...evaProps}>Address</Text>}
      />
      <Input
        onChangeText={(text) => setNote(text)}
        defaultValue={Note}
        label={(evaProps) => <Text {...evaProps}>Note</Text>}
      />

      <Button status={"success"} onPress={onSave} style={{ marginTop: 20 }}>
        Save
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    marginTop: "90%",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    paddingBottom: 400,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AddClient;
