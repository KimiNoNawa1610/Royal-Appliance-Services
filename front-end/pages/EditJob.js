import React from "react";
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

const AddJobDetailModal = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  let detailType = [
    { key: "1", value: "Part" },
    { key: "2", value: "Other Detail" },
  ];
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>New Detail</Text>
            <SelectList
              search={false}
              setSelected={setSelected}
              data={detailType}
              onSelect={() => alert(selected)}
              boxStyles={{ borderRadius: 0 }}
              dropdownStyles={{ flex: 1 }}
            />
            <Text style={styles.addJobDetailText}>Job Detail</Text>
            <View>
              <TextInput multiline style={styles.addJobDetailInput} />
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Finish</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Add New Detail</Text>
      </Pressable>
    </View>
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
      <View style={styles.container}>
        <Text style={styles.text}>{item.name}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeDetail}
          defaultValue={detail}
          placeholderTextColor={"#fff"}
        />
      </View>
    );
  };

  return (
    <View style={styles.whole}>
      <View style={styles.title}>
        <Text style={styles.bigText}>Edit Job</Text>
        <Text style={styles.text}>Client: {DATA.client}</Text>
      </View>

      <View style={styles.existing}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA_ROWS}
          renderItem={JobDetail}
          keyExtractor={(item) => item.id}
        />
      </View>
      <AddJobDetailModal />
      <Pressable style={[styles.button, styles.saveButton]}>
        <Text style={styles.textStyle}>Save</Text>
      </Pressable>
    </View>
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
    width: 300,
  },
  existing: {
    borderRadius: 5,
    backgroundColor: "#172757",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 500,
    width: 400,
    paddingTop: 50,
    paddingBottom: 50,
  },
  input: {
    height: "30%",
    width: "90%",
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#fff",
    color: "#fff",
    padding: 3,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 10,
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    maxHeight: "80%",
  },
  modalView: {
    marginTop: 200,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    width: 400,
    height: 600,
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
    elevation: 2,
    padding: 10,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "royalblue",
  },
  buttonClose: {
    backgroundColor: "royalblue",
  },
  saveButton: {
    backgroundColor: "green",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    marginTop: 15,
    textAlign: "center",
  },
  addJobDetailText: {
    marginTop: 10,
  },

  addJobDetailInput: {
    borderWidth: 2,
    borderColor: "gray",
    width: 250,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditJob;
