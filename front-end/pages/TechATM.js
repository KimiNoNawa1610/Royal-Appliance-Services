import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, ScrollView, LogBox } from "react-native";
import { Button, Layout, Modal } from "@ui-kitten/components";
import { DataTable } from 'react-native-paper';
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IncomeDetail from "./IncomeDetail";
//import { getJobs} from "./apiCaller.js";


export default TechATM = () => {
  //const navigation = useNavigation();

  const optionsPerPage = [5, 10, 15];
  const [incomeData, setIncomeData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [modalData, setModalData] = useState();

  useEffect(() => {
    setPage(0);
    getIncomes();
  }, [itemsPerPage, visible]);

  const getIncomes = async () => {
    const token1 = await AsyncStorage.getItem("AccessToken");
    const name = await AsyncStorage.getItem("name")
    axios
      .get(BASE_URL + "/get_employee_id/" + name, {
        headers: { token: token1 },
      })
      .then((res1) => {
        const id = res1.data.employeeID

        axios
          .get(BASE_URL + "/get_tech_income_sheet/" + id.toString() + "/" + `${new Date().getFullYear()}-${new Date().getMonth() + 1 - 1}-${new Date().getDate()}` + "/" + `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() - 1}`, {
            headers: { token: token1 },
          })
          .then((res2) => {
            //console.log(res2.data)
            setIncomeData(res2.data)
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  const IncomeRender = ({ item }) => {
    const handlePress = () => {
      setModalData(item);
      setVisible(true);
    };

    return (
      <View>
      <Modal
        visible={visible}
        backdropStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <IncomeDetail item={modalData} setVisible={setVisible} />
      </Modal>

      <DataTable.Row onPress={handlePress}>
              <DataTable.Cell>{new Date(item["datecreated"]).getMonth() + "-" +
                new Date(item["datecreated"]).getDate() + "-" + new Date(item["datecreated"]).getFullYear()}</DataTable.Cell>
              <DataTable.Cell>{item["invoiceID"]}</DataTable.Cell>
              <DataTable.Cell>{item["net"]}</DataTable.Cell>
      </DataTable.Row>
      </View>
    );
  };


  return (
    <Layout style={styles.center} level="1">
      <ScrollView style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title >DATE</DataTable.Title>
            <DataTable.Title >INV#</DataTable.Title>
            <DataTable.Title >NET</DataTable.Title>
          </DataTable.Header>
          {incomeData.map((item, i) => (
            <IncomeRender key={i} item={item}></IncomeRender>
          ))}
          <DataTable.Pagination
            page={page}
            numberOfPages={3}
            onPageChange={(page) => setPage(page)}
            label="1-2 of 6"
            optionsPerPage={optionsPerPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            showFastPagination
            optionsLabel={'Rows per page'}
          />
        </DataTable>

      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
});
