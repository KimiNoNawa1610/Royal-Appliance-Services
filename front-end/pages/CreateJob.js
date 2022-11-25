import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, View, SafeAreaView } from "react-native";
import { Button, Input, Datepicker, Icon, Text, Divider } from "@ui-kitten/components";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { showMessage } from "react-native-flash-message";
import AddClient from "./AddClient";

const CreateJob = () => {
  const isFocused = useIsFocused();
  // const [email, onChangeEmail] = React.useState(null);
  // const [password, onChangePassword] = React.useState(null);

  //syntax: textValue var and useState var?
  const [notes, onChangeNotes] = useState("");
  const [type, onChangeType] = useState("");
  const [problem, onChangeProblem] = useState("");
  const [dateStart, onChangeDateStart] = useState(new Date());
  const [dateEnd, onChangeDateEnd] = useState(new Date());
  const [visible, onChangeVisible] = useState(false);

  //dropdown
  let state1 = { clients: [] };
  let state2 = { techs: [] };

  const [client, setclient] = useState(null);
  const [aopen, asetOpen] = useState(false);
  const [bopen, bsetOpen] = useState(false);

  const [tech, setTech] = useState(null);

  useEffect(() => {
    if (isFocused) {
      getCE();
    }
  }, [isFocused]);

  const getCE = async () => {
    const token1 = await AsyncStorage.getItem("AccessToken");
    //console.log(token1)
    axios
      .get(BASE_URL + "/get_all_employees/", {
        headers: { token: token1 },
      })
      .then((res1) => {
        //console.log(res1)
        for (let i = 0; i < res1.data.length; i++) {
          //console.log(res1.data[i].name, res1.data[i].employeeID)
          state2.techs.push({
            label: res1.data[i].name,
            value: res1.data[i].employeeID,
          });
        }

        //console.log(token1)
        axios
          .get(BASE_URL + "/get_all_clients/", {
            headers: { token: token1 },
          })
          .then((res2) => {
            //console.log(res2)
            for (let i = 0; i < res2.data.length; i++) {
              //console.log(res2.data[i].name, res2.data[i].clientID)
              state1.clients.push({
                label: res2.data[i].name,
                value: res2.data[i].clientID,
              });
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const [aitems, asetItems] = useState(state1.clients);
  const [bitems, bsetItems] = useState(state2.techs);

  return (
    <SafeAreaView style={styles.centered}>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <AddClient onChangeVisible={onChangeVisible} />
      </Modal>

      <Text category={"h5"} style={{ marginTop: 30, margin: 10, marginBottom: 0 }}>Job Details</Text>
      <Divider style={{ marginBottom: 15, }} />


      {/* <Text>Client</Text> */}
      <View style={{ flexDirection: "row", zIndex: 2 }}>
        <View style={{ width: "90%" }}>
          <DropDownPicker
            style={styles.dropdown}
            open={aopen}
            value={client}
            items={aitems}
            setOpen={asetOpen}
            setValue={setclient}
            setItems={asetItems}
            placeholder={"Select a Client"}
            searchable={true}
          />
        </View>

        <Button
          status="success"
          style={{
            width: "8%",
            height: "50%",
            marginTop: 15,
          }}
          onPress={() => onChangeVisible(true)}
          accessoryRight={<Icon name={"plus-outline"} />}
        />
        <View style={{ width: "2%" }} />
      </View>
      <View style={{ width: "101%", zIndex: 1 }}>
        <DropDownPicker
          style={styles.dropdown}
          open={bopen}
          value={tech}
          items={bitems}
          setOpen={bsetOpen}
          setValue={setTech}
          setItems={bsetItems}
          placeholder={"Select Employee"}
          searchable={true}
        />
      </View>

      <Divider style={{ marginTop: 15 }} />
      <View style={{ justifyContent: "center", alignItems: "center", }}>

        <Input
          label={(evaProps) => <Text {...evaProps}>Note</Text>}
          style={styles.input}
          onChangeText={onChangeNotes}
          value={notes}
          placeholder={""}
          placeholderTextColor={"black"}
        />
        <Input
          label={(evaProps) => <Text {...evaProps}>Brand/Type of Appliance</Text>}
          style={styles.input}
          onChangeText={onChangeType}
          value={type}
          placeholder={""}
          placeholderTextColor={"black"}
        />
        {/* <Text>Problem</Text> */}
        <Input
          label={(evaProps) => <Text {...evaProps}>Problem</Text>}
          style={styles.input}
          onChangeText={onChangeProblem}
          value={problem}
          placeholder={""}
          placeholderTextColor={"black"}
        />
      </View>

      <Divider style={{ marginTop: 30 }} />

      <View style={{ justifyContent: "center", alignItems: "center", }}>
        <Datepicker
          label={(evaProps) => <Text {...evaProps}>Start Date</Text>}
          style={{
            width: "103%",
            borderRadius: 10,
            // margin:12,
            padding: 15,
            borderColor: "grey",
          }}
          date={dateStart}
          onSelect={(nextDate) => onChangeDateStart(nextDate)}
        />
        {/* <Text>End Date</Text> */}
        <Datepicker
          label={(evaProps) => <Text {...evaProps}>End Date</Text>}
          style={{
            width: "103%",
            borderRadius: 10,
            margin: -25,
            padding: 15,
            borderColor: "grey",

          }}
          date={dateEnd}
          onSelect={(nextDate) => onChangeDateEnd(nextDate)}
        />
        <Button
          title={"Assign New Job"}
          status="success"
          style={{ marginTop: 20, alignItems: "center" }}
          onPress={async () => {
            let des =
              "Note: " +
              notes +
              "\nBrand/Type: " +
              type +
              "\nProblem: " +
              problem;
            let start = `${dateStart.getFullYear()}-${dateStart.getMonth() + 1
              }-${dateStart.getDate()}`;
            let end = `${dateEnd.getFullYear()}-${dateEnd.getMonth() + 1
              }-${dateEnd.getDate()}`;
            //console.log(tech, client, start, end)
            axios
              .post(
                BASE_URL + "/assign_job/" + client + "/" + tech,
                { dateStart: start, dateEnd: end, description: des },
                {
                  headers: { token: await AsyncStorage.getItem("AccessToken") },
                }
              )
              .then((res) => {
                //console.log(res)
                if (res.status == 200) {
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
          }}
        >
          Assign New Job
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "100%",
    borderColor: "grey",
  },
  dropdown: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "95%",
    borderColor: "grey",
    elevation: 999,
  },
  image: {
    width: 700,
    height: 50,
  },
  centered: {
    //flex: 1,
    // marginTop: "10%",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
  },
  view: {
    justifyContent: "center",
    alignItems: "center",

  }
});

export default CreateJob;
