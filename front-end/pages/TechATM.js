import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Icon, Modal, Text } from "@ui-kitten/components";
import { DataTable } from "react-native-paper";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IncomeDetail from "./IncomeDetail";
import AddIncomeSheet from "./AddIncomeSheet";

/**
 * A React Native page for the Technician income render screen.
 * @returns {JSX.Element}
 * @constructor
 */
export default function TechATM() {
  const [incomeData, setIncomeData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState();
  const [addvisible, onAddVisible] = useState(false);
  let total_net = 0;
  const [totalnet, setTotalNet] = useState(0);

  /**
   * A React useEffect that is called whenever either of the two modals are in view
   */
  useEffect(() => {
    getIncomes();
  }, [visible, addvisible]);

  /**
   * An Axios function to grab the income of a specific Employee.
   * @returns {Promise<void>}
   */
  const getIncomes = async () => {
    const token1 = await AsyncStorage.getItem("AccessToken");
    const name = await AsyncStorage.getItem("name");
    axios
      .get(BASE_URL + "/get_employee_id/" + name, {
        headers: { token: token1 },
      })
      .then((res1) => {
        const id = res1.data.employeeID;

        axios
          .get(
            BASE_URL +
              "/get_tech_income_sheet/" +
              id.toString() +
              "/" +
              `${new Date().getFullYear()}-${
                new Date().getMonth() + 1 - 1
              }-${new Date().getDate()}` +
              "/" +
              `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()}`,
            {
              headers: { token: token1 },
            }
          )
          .then((res2) => {
            //console.log(res2.data)
            setIncomeData(res2.data);
            for (let i = 0; i < res2.data.length; i++) {
              total_net = total_net + res2.data[i].net;
              console.log(i, res2.data[i].net);
            }
            setTotalNet(total_net);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  /**
   * A React component that will render the specific income of a technician.
   * @param item
   * @returns {JSX.Element}
   * @constructor
   */
  const IncomeRender = ({ item }) => {
    const handlePress = () => {
      setModalData(item);
      setVisible(true);
    };

    return (
      <View>
        <Modal
          visible={visible}
          backdropStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        >
          <IncomeDetail item={modalData} setVisible={setVisible} />
        </Modal>

        <DataTable.Row onPress={handlePress}>
          <DataTable.Cell>{`${new Date(item["datecreated"]).getMonth() + 1}-${
            new Date(item["datecreated"]).getDate() + 1
          }-${new Date(item["datecreated"]).getFullYear()}`}</DataTable.Cell>
          <DataTable.Cell>{item["invoiceID"]}</DataTable.Cell>
          <DataTable.Cell>${item["net"]}</DataTable.Cell>
        </DataTable.Row>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.loginButtonSection}>
        <Button
          status="success"
          style={{
            width: "100%",
            height: "50%",
          }}
          onPress={() => onAddVisible(true)}
          accessoryRight={<Icon name={"plus-outline"} />}
        />
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>DATE</DataTable.Title>
          <DataTable.Title>INV#</DataTable.Title>
          <DataTable.Title>NET</DataTable.Title>
        </DataTable.Header>
        {incomeData.map((item, i) => (
          <IncomeRender key={i} item={item}></IncomeRender>
        ))}
      </DataTable>
      <Text
        category={"h5"}
        style={{ marginTop: 30, margin: 10, marginBottom: 0 }}
      >
        Net Total: ${totalnet}
      </Text>
      <Modal visible={addvisible} animationType="slide" transparent={true}>
        <AddIncomeSheet onAddVisible={onAddVisible} />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  loginButtonSection: {
    width: "100%",
    height: "10%",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
