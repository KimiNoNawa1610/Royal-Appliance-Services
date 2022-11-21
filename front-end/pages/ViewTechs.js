import React, { useEffect, useState } from "react";
import { StyleSheet, Modal, View } from "react-native";
import {
  Button,
  Card,
  Divider,
  Icon,
  Layout,
  List,
  ListItem,
  Text,
} from "@ui-kitten/components";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditTech from "./EditTech";
import AddTech from "./AddTech";

const ViewTechs = () => {
  const [techData, setTechData] = useState([]);
  const [addEmpVisible, setAddEmpVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState();

  useEffect(() => {
    const getTechs = async () => {
      const response = await axios.get(BASE_URL + "/get_all_employees/", {
        headers: { token: await AsyncStorage.getItem("AccessToken") },
      });
      setTechData(response.data);
      console.log(techData);
    };
    getTechs();
  }, [visible, addEmpVisible]);

  const TechRender = ({ item }) => {
    const handleEditPress = () => {
      setModalData(item);
      setVisible(true);
    };

    const Footer = () => {
      return (
        <Button
          onPress={handleEditPress}
          accessoryRight={<Icon name={"edit-outline"} />}
        >
          Edit
        </Button>
      );
    };

    return (
      <ListItem>
        <Layout style={styles.techContainer}>
          <Card footer={Footer}>
            <Text style={styles.techName}>{item["name"]}</Text>
            <Text>Email: {item["email"]}</Text>
          </Card>
        </Layout>
      </ListItem>
    );
  };

  const handleAddTech = () => {
    setAddEmpVisible(true);
  };

  return (
    <Layout style={styles.page}>
      <List
        data={techData}
        renderItem={TechRender}
        keyExtractor={(item) => item.employeeID}
        ItemSeparatorComponent={Divider}
      ></List>

      <Modal visible={visible} animationType="slide" transparent={true}>
        <EditTech item={modalData} setVisible={setVisible} />
      </Modal>

      <Modal visible={addEmpVisible} animationType="slide" transparent={true}>
        <AddTech
          setAddEmpVisible={setAddEmpVisible}
          addEmpVisible={addEmpVisible}
        />
      </Modal>
      <Button
        style={{ position: "absolute", right: 10, top: 5 }}
        status={"success"}
        onPress={handleAddTech}
        accessoryRight={<Icon name={"person-add-outline"} />}
      >
        {""}
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  techContainer: {
    width: "100%",
    marginBottom: 5,
  },
  techName: {
    fontSize: 30,
  },
  titleLayout: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 40,
  },
  page: {
    paddingHorizontal: 30,
  },
});
export default ViewTechs;
