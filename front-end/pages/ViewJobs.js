import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Layout, Modal, Text } from "@ui-kitten/components";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ViewJobDetail from "./ViewJobDetail";

const ViewJobs = ({ start, end }) => {
    const [jobData, setjobData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [modalData, setModalData] = useState();

    useEffect(() => {
        const getJobs = async () => {
            const token1 = await AsyncStorage.getItem("AccessToken");
            const name = await AsyncStorage.getItem("name")
            //console.log(token1)
            axios
                .get(BASE_URL + "/get_employee_id/" + name, {
                    headers: { token: token1 },
                })
                .then((res1) => {
                    console.log(res1.data)
                    const id = res1.data.employeeID

                    //console.log(token1)
                    axios
                        .get(BASE_URL + "/get_jobs/" + id.toString() + "/" + start + "/" + end, {
                            headers: { token: token1 },
                        })
                        .then((res2) => {
                            console.log(res2.data)
                            setjobData(res2.data)
                        })
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        }
        getJobs();
    }, [visible]);

    const TechRender = ({ item }) => {
        const handleEditPress = () => {
            setModalData(item);
            setVisible(true);
        };

        const Footer = () => {
            return <Button onPress={handleEditPress}>DETAILS</Button>;
        };

        return (
            <View style={styles.techContainer}>
                <Modal
                    visible={visible}
                    backdropStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                    <ViewJobDetail item={modalData} setVisible={setVisible}/>
                </Modal>

                <Card style={styles.card_template} footer={Footer}>
                    <Text style={styles.techName}>{item["name"]}</Text>
                    <Text style={{fontWeight: "bold"}}>DESCRIPTION:</Text>
                    <Text>{item["description"].split("\n",1)}</Text>
                    <Text style={{fontWeight: "bold"}}>END TIME: </Text>
                    <Text>{new Date(item["dateEnd"]).getMonth() + "-" +
                        new Date(item["dateEnd"]).getDate() + "-" + new Date(item["dateEnd"]).getFullYear()}</Text>
                </Card>
            </View>
        );
    };


    return (
        <Layout style={styles.page}>
            <Layout>
                <>
                    {jobData.map((item, i) => (
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
        color:"#ff8c00",
        fontWeight:"bold"
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
export default ViewJobs;