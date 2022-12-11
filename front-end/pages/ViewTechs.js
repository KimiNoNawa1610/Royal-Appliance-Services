import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Modal,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
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

/**
 * A page that is used to a list of all the employees in the database.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ViewTechs = (props) => {
  const [techData, setTechData] = useState([]);
  const [addEmpVisible, setAddEmpVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState();

  const [refreshing, setRefreshing] = React.useState(false);

  /**
   * A wait function to wait two seconds.
   * @param timeout
   * @returns {Promise<unknown>}
   */
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  /**
   * A callback function that resets the refreshing state
   * @type {(function(): void)|*}
   */
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  /**
   * A React useEffect that is called whenever either add or edit modals are open or when the refreshing state is reset.
   */
  useEffect(() => {
    const getTechs = async () => {
      const response = await axios.get(BASE_URL + "/get_all_employees/", {
        headers: { token: await AsyncStorage.getItem("AccessToken") },
      });
      setTechData(response.data);
      console.log(techData);
    };
    getTechs();
  }, [visible, addEmpVisible, refreshing]);

  /**
   * A child component of the List component of a specific technician.
   * @param item
   * @returns {JSX.Element}
   * @constructor
   */
  const TechRender = ({ item }) => {
    const handleEditPress = () => {
      setModalData(item);
      setVisible(true);
    };
    /**
     * The footer component of the Card component
     * @returns {JSX.Element}
     * @constructor
     */
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

  /**
   * Callback function for when the "Add Technician" Button
   */
  const handleAddTech = () => {
    setAddEmpVisible(true);
  };

  return (
    <Layout>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={techData}
        renderItem={TechRender}
        keyExtractor={(item) => item.employeeID}
        ItemSeparatorComponent={Divider}
      ></FlatList>
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

      <Modal visible={visible} animationType="slide" transparent={true}>
        <EditTech item={modalData} setVisible={setVisible} />
      </Modal>

      <Modal visible={addEmpVisible} animationType="slide" transparent={true}>
        <AddTech
          setAddEmpVisible={setAddEmpVisible}
          addEmpVisible={addEmpVisible}
        />
      </Modal>
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
