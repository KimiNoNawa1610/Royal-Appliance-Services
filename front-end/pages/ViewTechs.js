import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Layout, Modal, Text } from "@ui-kitten/components";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditTech from "./EditTech";

const ViewTechs = () => {
  const [techData, setTechData] = useState([]);
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
  }, [visible]);

  const TechRender = ({ item }) => {
    const handleEditPress = () => {
      setModalData(item);
      setVisible(true);
    };

    const Footer = () => {
      return <Button onPress={handleEditPress}>EDIT</Button>;
    };

    return (
      <View style={styles.techContainer}>
        <Modal
          visible={visible}
          backdropStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        >
          <EditTech item={modalData} setVisible={setVisible} />
        </Modal>
        <Card style={styles.card_template} footer={Footer}>
          <Text style={styles.techName}>{item["name"]}</Text>
          <Text>Email: {item["email"]}</Text>
        </Card>
      </View>
    );
  };


  return (
    <Layout style={styles.page}>
      <Layout>
        <>
          {techData.map((item, i) => (
            <TechRender key={i} item={item}></TechRender>
          ))}
        </>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  techContainer: {
    flex: 1,
    marginBottom: 5,
  },
  techName: {
    fontSize: 20,
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
    paddingTop: 100,
    paddingHorizontal: 30,
  },
  card_template:{
    width: 350,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    marginBottom: 20
  },
});
export default ViewTechs;
