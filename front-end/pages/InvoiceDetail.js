import React, { useState, useEffect } from "react";
import { StyleSheet, Image, ScrollView, WebView} from "react-native";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  Layout,
  Text,
  Divider,
} from "@ui-kitten/components";


const InvoiceDetail = ({ item, setVisible }) => {

  const [imageSource, Setsource] = useState("");

  useEffect(() => { getInvoices(); }, []);

  const getInvoices = async () => {
    const token1 = await AsyncStorage.getItem("AccessToken");
    //console.log(token1)
    axios
      .get(BASE_URL + "/get_invoice/" + item["invoiceID"].toString() + "/base64", {
        headers: { token: token1 }
      })
      .then(async (res1) => {
        //console.log(res1.data)
        Setsource(res1.data)
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout style={styles.page}>
      <ScrollView>

        <Image
          source={{
            uri: `data:image/jpeg;base64,${imageSource}`,
          }}
          style={{ resizeMode: "cover", width: 460, height: 700 }}
        />

        <Button onPress={() => setVisible(false)} appearance={"ghost"}>
          Back
        </Button>
      </ScrollView>

    </Layout>
  )

}

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  zoomableView: {
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default InvoiceDetail