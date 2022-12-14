import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Modal } from "react-native";
import { Button, Card, Layout, Text } from "@ui-kitten/components";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ViewJobDetail from "./ViewJobDetail";
import { DrawerContentScrollView } from "@react-navigation/drawer";

/**
 * A component representing the scrollable portion in the TechDashoard
 * @param start
 * @param end
 * @param iscompleted
 * @param refreshing
 * @returns {JSX.Element}
 * @constructor
 */
const ViewJobs = ({ start, end, iscompleted, refreshing }) => {
  const [jobData, setjobData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState();
  const finish = { true: "Completed", false: "Incompleted" };
  let count = 0;

  /**
   * A React useEffect that is called whenever the modal is in view or when the page is refreshing.
   */
  useEffect(() => {
    /**
     * An Axios function grabbing the details of a specific employee.
     * @returns {Promise<void>}
     */
    const getJobs = async () => {
      console.log(start);
      console.log(end);
      const token1 = await AsyncStorage.getItem("AccessToken");
      const name = await AsyncStorage.getItem("name");
      //console.log(token1)
      axios
        .get(BASE_URL + "/get_employee_id/" + name, {
          headers: { token: token1 },
        })
        .then((res1) => {
          console.log(res1.data);
          const id = res1.data.employeeID;

          //console.log(token1)
          axios
            .get(
              BASE_URL +
                "/get_jobs/" +
                id.toString() +
                "/" +
                start +
                "/" +
                end +
                "/" +
                iscompleted.toString(),
              {
                headers: { token: token1 },
              }
            )
            .then((res2) => {
              console.log(res2.data);
              console.log(res2.data.length);
              setjobData(res2.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    };
    getJobs();
  }, [visible, refreshing]);

  /**
   * A child component of the List component that renders the details of one job.
   * @param item
   * @returns {JSX.Element}
   * @constructor
   */
  const JobRender = ({ item }) => {
    const handleEditPress = () => {
      setModalData(item);
      setVisible(true);
    };

    /**
     * The footer for the card portion -- It holds a button to see the details.
     * @returns {JSX.Element}
     * @constructor
     */
    const Footer = () => {
      return <Button onPress={handleEditPress}>DETAILS</Button>;
    };

    return (
      <View style={styles.container}>
        <View style={styles.techContainer}>
          <Card style={styles.card_template} footer={Footer}>
            <View style={styles.header}>
              <Text style={styles.techName}>{item["name"]}</Text>
              <Text
                style={
                  item["isCompleted"]
                    ? styles.finish_condition
                    : styles.unfinish_condition
                }
              >
                {finish[item["isCompleted"]]}
              </Text>
            </View>
            <Text style={{ fontWeight: "bold" }}>DESCRIPTION:</Text>
            <Text>{item["description"].split("\n", 1)}</Text>
            <Text style={{ fontWeight: "bold" }}>END TIME: </Text>
            <Text>{`${new Date(item["dateEnd"]).getMonth() + 1}-${
              new Date(item["dateEnd"]).getDate() + 1
            }-${new Date(item["dateEnd"]).getFullYear()}`}</Text>
          </Card>
        </View>
      </View>
    );
  };

  return (
    <Layout style={styles.page}>
      <ScrollView>
        <Modal animationType="slide" transparent={true} visible={visible}>
          <ViewJobDetail item={modalData} setVisible={setVisible} />
        </Modal>
        <>
          {jobData.map((item, i) => (
            <JobRender key={i} item={item}></JobRender>
          ))}
        </>
      </ScrollView>
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
    color: "#ff8c00",
    fontWeight: "bold",
  },
  finish_condition: {
    fontSize: 20,
    color: "#00ee8d",
    fontWeight: "bold",
  },
  unfinish_condition: {
    fontSize: 20,
    color: "#ff726f",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    paddingHorizontal: 30,
    paddingBottom: 150,
  },
  card_template: {
    width: 350,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    marginBottom: 20,
  },
  container: {
    flex: 1,
  },
});
export default ViewJobs;
