import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  SafeAreaView,
  Alert,
  StatusBar,
  Modal,
  Pressable,
  FlatList,
} from "react-native";

import SelectList from "react-native-dropdown-select-list/index";

const DATA = {
  client: "NVIDIA",
  rows: [
    {
      item: "RTX 3080",
      total: 320,
      my_part: 30,
      labor: 150,
      tax: 30.5,
      sell: 699,
      shipping: 11,
      paid_by: "cash",
    },
  ],
  paid: 670,
  note: "",
};
const parseRowsToMultJSONArray = (dataRows) => {
  let returnArray = [];
  let id = 0;
  for (let keyName in dataRows) {
    let newObj = {};
    newObj.id = id;
    newObj.name = keyName;
    newObj.jobData = dataRows[keyName];
    returnArray.push(newObj);
    id++;
  }
  return returnArray;
};
let DATA_ROWS = parseRowsToMultJSONArray(DATA.rows[0]);

const getPreData = () => {
  //TODO: Call to the backend to get pre-existing data on a {Job}
};
const AddJobDetailModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = React.useState("");
  let detailType = [
    { key: "1", value: "Part" },
    { key: "2", value: "Other Detail" },
  ];
  return (
    <SafeAreaView style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.centeredView}>
          <SafeAreaView style={styles.modalView}>
            <Text style={styles.modalText}>New Detail</Text>
            <SelectList
              search={false}
              setSelected={setSelected}
              data={detailType}
              onsSelect={() => alert(selected)}
            />
            <Text style={styles.addJobDetailText}>Job Detail</Text>
            <TextInput style={styles.addJobDetailInput} />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Finish</Text>
            </Pressable>
          </SafeAreaView>
        </SafeAreaView>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Add New Detail</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const EditJob = () => {
  console.log(DATA_ROWS);

  const JobDetail = ({ item }) => {
    let detail = item.jobData;
    const onChangeDetail = (newDetail) => {
      detail = newDetail;
    };
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>{item.name}</Text>
        <TextInput
          style={styles.input}
          value={detail}
          onChangeText={onChangeDetail}
          placeholderTextColor={"#fff"}
        />
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.whole}>
      <SafeAreaView name="Text" style={styles.title}>
        <Text style={styles.bigText}>Edit Job</Text>
      </SafeAreaView>

      <Text style={styles.text}>Client: {DATA.client}</Text>

      <SafeAreaView name="Pre-Existing Data" style={styles.existing}>
        <FlatList
          data={DATA_ROWS}
          renderItem={JobDetail}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>

      <SafeAreaView name="Data to Add">
        <AddJobDetailModal />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  whole: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  existing: {
    borderRadius: 5,
    backgroundColor: "#172757",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 20,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: "#fff",
    color: "#fff",
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    color: "#fff",
  },
  bigText: {
    fontSize: 32,
    color: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    width: 300,
    height: 500,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "royalblue",
  },
  buttonClose: {
    backgroundColor: "royalblue",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  addJobDetailText: {
    paddingTop: 20,
  },
  addJobDetailInput: {
    paddingBottom: 20,
  },
});

export default EditJob;
