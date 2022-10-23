import React, { useState, Componenet } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  Text,
  View,
  VirtualizedList,
  Alert,
  StatusBar,
  Modal,
  Pressable,
} from "react-native";

import SelectList from "react-native-dropdown-select-list/index";


const DATA = [
  { detailTitle: "PH: PreExsiting_Detail_0" },
  { detailTitle: "PH: PreExsiting_Detail_1" },
  { detailTitle: "PH: PreExsiting_Detail_2" },
  { detailTitle: "PH: PreExsiting_Detail_0" },
  { detailTitle: "PH: PreExsiting_Detail_1" },
  { detailTitle: "PH: PreExsiting_Detail_2" },
  { detailTitle: "PH: PreExsiting_Detail_0" },

  { detailTitle: "PH: PreExsiting_Detail_3" },
];

const getPreData = () => {
  /* Reference
    Invoice =
    {
        id : {name : "value",
              value : "value"
        }
    }
        total
        my_part
        labor
        tax
        shipping
        net
        part_installed
        client_sell
        paid_by
    }
    */
  //TODO: Call to the backend to get pre-existing data on a {Job}
};

const getJobDetail = (data, index) => {
  return data[index];
};

const getJobDetailCount = (data) => {
  return data.length;
};

const JobDetail = ({ jobDetail }) => {
  const [detail, onChangeDetail] = React.useState(jobDetail["detailTitle"]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Job Detail</Text>
      <TextInput
        style={styles.input}
        value={detail}
        onChangeText={onChangeDetail}
        placeholderTextColor={"#fff"}
      />
    </View>
  );
};

const AddJobDetailModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = React.useState("");
  let detailType = [
    {key: '1', value: 'Part'},
    {key: '2', value: 'Other Detail'}
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
                search = {false}
                setSelected={setSelected}
                data={detailType}
                onsSelect={()=>alert(selected)}
            />
            <Text style={styles.addJobDetailText}>Job Detail</Text>
            <TextInput
                style={styles.addJobDetailInput}
            />

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
  return (
    <View>
      <View name="Text" style={styles.title}>
        <Text style={styles.bigText}>Edit Job</Text>
      </View>

      <View name="Pre-Existing Data" style={styles.existing}>
        <VirtualizedList
          data={DATA}
          initialNumToRender={4}
          renderItem={({ item }) => <JobDetail jobDetail={item} />}
          keyExtractor={(item) => item.key}
          getItem={getJobDetail}
          getItemCount={getJobDetailCount}
        />
      </View>

      <View name="Data to Add">
        <AddJobDetailModal />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  existing: {
    borderRadius: 5,
    backgroundColor: "#163352",
    padding: 15,
  },
  input: {
    height: 40,
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
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
  addJobDetailText:{
    paddingTop: 20,
  },
  addJobDetailInput:{
    paddingBottom: 20
  }

});

export default EditJob;
