import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageAccessFramework } from 'expo-file-system';
import {
  Button,
} from "@ui-kitten/components";
import { showMessage } from "react-native-flash-message";


const InvoiceDetail = ({ item, setVisible }) => {

  const [source, setSource] = useState("");

  useEffect(() => { getInvoice(); }, []);

  const getInvoice = async () => {
    const token1 = await AsyncStorage.getItem("AccessToken");
    //console.log(token1)
    axios
      .get(BASE_URL + "/get_invoice/" + item["invoiceID"].toString() + "/base64", {
        headers: { token: token1 }
      })
      .then(async (res1) => {
        //console.log(res1.data)
        setSource(res1.data)
      })
      .catch((err) => console.log(err));
  };

  const DeleteInvoice = async () => {
    const token1 = await AsyncStorage.getItem("AccessToken");
    //console.log(token1)
    axios
      .post(BASE_URL + "/delete_invoice/" + item["invoiceID"].toString(), {}, {
        headers: { token: token1 }
      })
      .then(async (res1) => {
        //console.log(res1.data)
        if (res1.status == 200) {
          showMessage({
            message: res1.data,
            backgroundColor: "green",
            type: "success",
          });
        } else {
          showMessage({
            message: res1.data,
            backgroundColor: "red",
            type: "error",
          });
        }

      })
      .catch((err) => console.log(err));
  };

  //need to edit
  const savePDF = async () => {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }

    try {
      await StorageAccessFramework.createFileAsync(permissions.directoryUri,  item["invoiceID"].toString()+".pdf", 'application/pdf')
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, source, { encoding: FileSystem.EncodingType.Base64 });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <View>
      <Button onPress={() => setVisible(false)} appearance={"ghost"}>
        Back
      </Button>
      <Button status='danger' onPress={() => DeleteInvoice()}>
        Delete
      </Button>
      <Button onPress={() => savePDF()}>
        Save To Device
      </Button>
    </View>
  )

}

export default InvoiceDetail