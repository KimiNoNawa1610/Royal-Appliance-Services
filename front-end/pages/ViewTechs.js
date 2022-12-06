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

const ViewTechs = (props) => {
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
  }, [visible, addEmpVisible, props.navigation]);

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
        <Card footer={Footer} style={styles.techContainer}>
          <Text style={styles.techName}>{item["name"]}</Text>
          <Text>Email: {item["email"]}</Text>
        </Card>
      </ListItem>
    );
  };

  const handleAddTech = () => {
    setAddEmpVisible(true);
  };

  return (
    <Layout>
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
        style={{
          position: "absolute",
          right: 10,
          top: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.4,
          shadowRadius: 25,
          elevation: 5,
        }}
        size="large"
        status={"success"}
        onPress={handleAddTech}
        accessoryRight={<Icon name={"person-add-outline"} />}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  techContainer: {
    width: "90%",
    marginBottom: 5,
    marginHorizontal: "5%",
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
});
export default ViewTechs;
