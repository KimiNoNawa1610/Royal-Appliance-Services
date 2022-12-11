import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Modal } from "react-native";
import { Text } from "@ui-kitten/components";
import { DataTable } from "react-native-paper";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IncomeDetail from "./IncomeDetail";

export default function AdminTechIncomeSheets({ employeeID }) {
  const [incomeData, setIncomeData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState();
  let total_net = 0;
  const [totalnet, setTotalNet] = useState(0);

  /**
   * A React useEffect that gets the incomes of technicians depending on if the modal view has changed or when the employee selection has changed.
   */
  useEffect(() => {
    getIncomes();
  }, [visible, employeeID]);

  /**
   * The fetch function getting the income of a specific employee by their identification number.
   * @returns {Promise<void>}
   */
  const getIncomes = async () => {
    const token1 = await AsyncStorage.getItem("AccessToken");
    axios
      .get(
        BASE_URL +
          "/get_tech_income_sheet/" +
          employeeID.toString() +
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
  };

  /**
   * A custom component taking in a prop of a technician and rendering out their total income.
   * @param item
   * @returns {JSX.Element}
   * @constructor
   */
  const IncomeRender = ({ item }) => {
    /**
     * A callback function for when the user clicks on a specific invoice detail. The modal with the details is shown.
     */
    const handlePress = () => {
      setModalData((prev) => item);
      setVisible(true);
    };

    return (
      <View>
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
      <Modal visible={visible} animationType="slide" transparent={true}>
        <IncomeDetail item={modalData} setVisible={setVisible} />
      </Modal>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
});
