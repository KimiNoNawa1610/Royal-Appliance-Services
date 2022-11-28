import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { Text, Divider, Datepicker,Modal } from "@ui-kitten/components";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataTable } from 'react-native-paper';
import InvoiceDetail from "./InvoiceDetail";
import { showMessage } from "react-native-flash-message";

const AdminViewInvoice = () => {
    const isFocused = useIsFocused();
    const [dateStart, onChangeDateStart] = useState(new Date());
    const [dateEnd, onChangeDateEnd] = useState(new Date());
    const [modalData, setModalData] = useState();
    const [invoiceData, setInvoiceData] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isFocused) {
            getInvoices();
        }
    }, [isFocused,dateStart,dateEnd]);

    const getInvoices = async () => {
        const token1 = await AsyncStorage.getItem("AccessToken");
        //console.log(token1)
        let start = `${dateStart.getFullYear()}-${dateStart.getMonth() + 1
            }-${dateStart.getDate()}`;
        let end = `${dateEnd.getFullYear()}-${dateEnd.getMonth() + 1
            }-${dateEnd.getDate()}`;
        axios
            .get(BASE_URL + "/get_invoices_info/"+start+"/"+end, {
                headers: { token: token1 },
            })
            .then((res1) => {
                //console.log(res1)
                setInvoiceData(res1.data)
            })
            .catch((err) => console.log(err));
    };

    const InvoiceRender = ({ item }) => {
        const handlePress = () => {
            setModalData(item);
            setVisible(true);
        };

        return (
            <View>
                <Modal
                    visible={visible}
                    backdropStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                    <InvoiceDetail item={modalData} setVisible={setVisible} />
                </Modal>

                <DataTable.Row onPress={handlePress}>
                    <DataTable.Cell>{`${new Date(item["created_date"]).getMonth()+1}-${new Date(item["created_date"]).getDate()+1}-${new Date(item["created_date"]).getFullYear()}`}</DataTable.Cell>
                    <DataTable.Cell>{item["invoiceID"]}</DataTable.Cell>
                    <DataTable.Cell>{item["customer"]}</DataTable.Cell>
                    <DataTable.Cell>{item["tech_name"]}</DataTable.Cell>
                    <DataTable.Cell>{item["serviced_item"]}</DataTable.Cell>
                </DataTable.Row>
                
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.centered}>
            <Text category={"h5"} style={{ marginTop: 30, margin: 10, marginBottom: 0 }}>Income Details</Text>
            <Divider style={{ marginBottom: 15, }} />


            {/* <Text>Client</Text> */}
            <View style={{ flexDirection: "row", zIndex: 2 }}>
            </View>
            <View style={{ width: "101%", zIndex: 1 }}>
                <Datepicker
                    label={(evaProps) => <Text {...evaProps}>From</Text>}
                    style={{
                        width: "95%",
                        borderRadius: 10,
                        // margin:12,
                        padding: 15,
                        borderColor: "grey",
                    }}
                    date={dateStart}
                    onSelect={(nextDate) => onChangeDateStart(nextDate)}
                />
                {/* <Text>End Date</Text> */}
                <Datepicker
                    label={(evaProps) => <Text {...evaProps}>To</Text>}
                    style={{
                        width: "95%",
                        borderRadius: 10,
                        padding: 15,
                        borderColor: "grey",

                    }}
                    date={dateEnd}
                    onSelect={(nextDate) => onChangeDateEnd(nextDate)}
                />
            </View>

            <Divider style={{ marginTop: 15 }} />

            <ScrollView>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >CREATED DATE</DataTable.Title>
                    <DataTable.Title >INV#</DataTable.Title>
                    <DataTable.Title >CUSTOMER</DataTable.Title>
                    <DataTable.Title >TECH NAME</DataTable.Title>
                    <DataTable.Title >SERVICE ITEM</DataTable.Title>
                </DataTable.Header>
                {invoiceData.map((item, i) => (
                    <InvoiceRender key={i} item={item}></InvoiceRender>
                ))}
            </DataTable>
            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: "100%",
        borderColor: "grey",
    },
    dropdown: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: "95%",
        borderColor: "grey",
        elevation: 999,
    },
    image: {
        width: 700,
        height: 50,
    },
    centered: {
        //flex: 1,
        // marginTop: "10%",
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "white",
    },
    view: {
        justifyContent: "center",
        alignItems: "center",

    }
});

export default AdminViewInvoice;
