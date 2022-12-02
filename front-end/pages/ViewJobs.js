import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Card, Layout, Modal, Text } from "@ui-kitten/components";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ViewJobDetail from "./ViewJobDetail";

const ViewJobs = ({ start, end, iscompleted, selector}) => {
    const [jobData, setjobData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [modalData, setModalData] = useState();
    const finish = { true: "Completed", false: "Incompleted" }
    //let count = 0

    useEffect(() => {
        const getJobs = async () => {
            console.log(start)
            console.log(end)
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

                    console.log(iscompleted)
                    axios
                        .get(BASE_URL + "/get_jobs/" + id.toString() + "/" + start + "/" + end + "/" + iscompleted.toString(), {
                            headers: { token: token1 },
                        })
                        .then((res2) => {
                            console.log(res2.data)
                            console.log(res2.data.length)
                            setjobData(res2.data)
                        })
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        }
        // const getPastJobs = async () => {
        //     // console.log(start)
        //     // console.log(end)
        //     const token1 = await AsyncStorage.getItem("AccessToken");
        //     const name = await AsyncStorage.getItem("name")
        //     //console.log(token1)
        //     axios
        //         .get(BASE_URL + "/get_employee_id/" + name, {
        //             headers: { token: token1 },
        //         })
        //         .then((res1) => {
        //             console.log(res1.data)
        //             const id = res1.data.employeeID
    
        //             axios
        //                 .get(BASE_URL + "/get_past_jobs/" + id.toString() + "/" + end + "/" + iscompleted.toString(), {
        //                     headers: { token: token1 },
        //                 })
        //                 .then((res2) => {
        //                     console.log(res2.data)
        //                     console.log(res2.data.length)
        //                     setjobData(res2.data)
        //                 })
        //                 .catch((err) => console.log(err));
        //         })
        //         .catch((err) => console.log(err));
        // }
    
        // const getTodayJobs = async () => {
        //     // console.log(start)
        //     // console.log(end)
        //     const token1 = await AsyncStorage.getItem("AccessToken");
        //     const name = await AsyncStorage.getItem("name")
        //     //console.log(token1)
        //     axios
        //         .get(BASE_URL + "/get_employee_id/" + name, {
        //             headers: { token: token1 },
        //         })
        //         .then((res1) => {
        //             console.log(res1.data)
        //             const id = res1.data.employeeID
    
        //             axios
        //                 .get(BASE_URL + "/get_present_jobs/" + id.toString() + "/" + start + "/" + end + "/" + iscompleted.toString(), {
        //                     headers: { token: token1 },
        //                 })
        //                 .then((res2) => {
        //                     console.log(res2.data)
        //                     console.log(res2.data.length)
        //                     setjobData(res2.data)
        //                 })
        //                 .catch((err) => console.log(err));
        //         })
        //         .catch((err) => console.log(err));
        // }
    
        // const getFutureJobs = async () => {
        //     // console.log(start)
        //     // console.log(end)
        //     const token1 = await AsyncStorage.getItem("AccessToken");
        //     const name = await AsyncStorage.getItem("name")
        //     //console.log(token1)
        //     axios
        //         .get(BASE_URL + "/get_employee_id/" + name, {
        //             headers: { token: token1 },
        //         })
        //         .then((res1) => {
        //             console.log(res1.data)
        //             const id = res1.data.employeeID
    
        //             axios
        //                 .get(BASE_URL + "/get_future_jobs/" + id.toString() + "/" + start + "/" + iscompleted.toString(), {
        //                     headers: { token: token1 },
        //                 })
        //                 .then((res2) => {
        //                     console.log(res2.data)
        //                     console.log(res2.data.length)
        //                     setjobData(res2.data)
        //                 })
        //                 .catch((err) => console.log(err));
        //         })
        //         .catch((err) => console.log(err));
        // }
        getJobs();
        // if(selector === "Past"){getPastJobs();}
        // if(selector === "Today"){getTodayJobs();}
        // if(selector === "Future"){getFutureJobs();}
    }, [visible]);

    // useEffect(() =>{
    // try {
    //   if (selector === "Past") {
    //     //setDate1(new Date().getFullYear()-new Date().getMonth()+1-1-new Date().getDate());
    //     <ViewJobs start={`${new Date().getFullYear()}-${new Date().getMonth()+1-1}-${new Date().getDate()}`} 
    //     end={`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()-1}`} iscompleted={"None"}/>

    //     setDate1(`${new Date().getFullYear()}-${new Date().getMonth()+1-1}-${new Date().getDate()}`)
    //     console.log(date1);
    //     setDate2(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()-1}`);
    //     console.log(date2);
    //     setStatus("None");
    //   } 
      
    // } catch (err) {
    //   console.log(err);
    // }

    // }, [selector]);

    const JobRender = ({ item }) => {
        const handleEditPress = () => {
            setModalData(item);
            setVisible(true);
        };

        const Footer = () => {
            return <Button onPress={handleEditPress}>DETAILS</Button>;
        };

        return (
            <ScrollView style={styles.container}>
            <View style={styles.techContainer}>

                <Modal
                    visible={visible}
                    backdropStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                    <ViewJobDetail item={modalData} setVisible={setVisible} />
                </Modal>
                <Card style={styles.card_template} footer={Footer}>
                    <View style={styles.header}><Text style={styles.techName}>{item["name"]}</Text><Text style={item["isCompleted"] ? styles.finish_condition : styles.unfinish_condition}>{finish[item["isCompleted"]]}</Text></View>
                    <Text style={{ fontWeight: "bold" }}>DESCRIPTION:</Text>
                    <Text>{item["description"].split("\n", 1)}</Text>
                    <Text style={{ fontWeight: "bold" }}>END TIME: </Text>
                    <Text>{`${new Date(item["dateEnd"]).getMonth()+1}-${new Date(item["dateEnd"]).getDate()+1}-${new Date(item["dateEnd"]).getFullYear()}`}</Text>
                </Card>

            </View>
            </ScrollView>
        );
    };

    return (
        <Layout style={styles.page}>
            <>
                {jobData.map((item, i) => (
                    <JobRender key={i} item={item}></JobRender>
                ))}
            </>
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
        paddingHorizontal: 30,
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