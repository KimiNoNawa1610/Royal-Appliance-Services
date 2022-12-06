import React, { useEffect, useState } from "react";
import { StyleSheet, View,  SafeAreaView, StatusBar, ScrollView, Modal } from "react-native";
import { Button, Card, Layout, Text, Divider,
    Icon,
    List,
    ListItem } from "@ui-kitten/components";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminViewJobDetail from "./AdminViewJobDetail";
//import { FlatList, ScrollView } from "react-native-gesture-handler";

const AdminViewJobs = ({ start, end, setJobVisible }) => {
    const [jobData, setjobData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [modalData, setModalData] = useState();
    const finish = { true: "Completed", false: "Incompleted" };

    //only retreives all jobs on selected day
    useEffect(() => {
      const getJobs = async () => {
          const token1 = await AsyncStorage.getItem("AccessToken");
          axios
              .get(BASE_URL + "/get_all_jobs/" + start + "/" + end, {
                headers: { token: token1 },
              })
              .then((res1) => {
                  console.log(res1.data)
                  setjobData(res1.data)
              })
              .catch((err) => console.log(err));
      }
      getJobs();
  }, [visible]);

    const JobRender = ({ item }) => {
        const handleEditPress = () => {
            setModalData(item);
            setVisible(true);
        };

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
          <Modal animationType="fade" transparent={true} visible={visible} backgroundColor= 'rgba(255, 255, 255, 0.9)'>
            <AdminViewJobDetail item={modalData} setVisible={setVisible} />
          </Modal>
          <>
            {jobData.map((item, i) => (
              <JobRender key={i} item={item}></JobRender>
            ))}
          </>
        </ScrollView>
        <Button  
            onPress={() => setJobVisible(false)} appearance={"ghost"}>
            Back
        </Button>
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
        justifyContent: 'space-between'
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
    },
    card_template: {
        width: 350,
        boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
        marginBottom: 20,
    },
    container: {
        flex: 1,
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
});
export default AdminViewJobs;