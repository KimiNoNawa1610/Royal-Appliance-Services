import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Card,
  Divider,
  Icon,
  Layout,
  List,
  ListItem,
  Modal,
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
      <Modal
        visible={visible}
        backdropStyle={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
      >
        <EditTech item={modalData} setVisible={setVisible} />
      </Modal>

      <Modal
        visible={addEmpVisible}
        backdropStyle={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
      >
        <AddTech
          setAddEmpVisible={setAddEmpVisible}
          addEmpVisible={addEmpVisible}
        />
      </Modal>

      <Button
        onPress={handleAddTech}
        accessoryRight={<Icon name={"person-add-outline"} />}
      >
        Add Technician
      </Button>
      <List
        data={techData}
        renderItem={TechRender}
        keyExtractor={(item) => item.employeeID}
        ItemSeparatorComponent={Divider}
      ></List>
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
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "5%",
    paddingHorizontal: 30,
  },
});
export default ViewTechs;
