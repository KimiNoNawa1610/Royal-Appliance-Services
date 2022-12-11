import React, { useState, useEffect } from "react";
import { StyleSheet, Image, ScrollView, WebView } from "react-native";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Layout, Text, Divider } from "@ui-kitten/components";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import { showMessage } from "react-native-flash-message";

/**
 * A custom React component that renders a certain amount invoice details based on the item JSON
 * @param item
 * @param setVisible
 * @returns {JSX.Element}
 * @constructor
 */
const InvoiceDetail = ({ item, setVisible }) => {
  const [imageSource, Setsource] = useState("");

  /**
   * A React useEffect that is called whenever the modal is visible or not.
   */
  useEffect(() => {
    getInvoice();
  }, [setVisible]);

  /**
   * An Axios function that deletes a specific invoice
   * @returns {Promise<void>}
   * @constructor
   */
  const DeleteInvoice = async () => {
    const token1 = await AsyncStorage.getItem("AccessToken");
    //console.log(token1)

    axios
      .post(
        BASE_URL + "/delete_invoice/" + item["invoiceID"].toString(),
        {},
        {
          headers: { token: token1 },
        }
      )
      .then(async (res1) => {
        if (res1.status === 200) {
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
      });
  };

  /**
   * An Axios function that receives a specific invoice
   * @returns {Promise<void>}
   */
  const getInvoice = async () => {
    const token1 = await AsyncStorage.getItem("AccessToken");
    //console.log(token1)

    axios
      .get(
        BASE_URL + "/get_invoice/" + item["invoiceID"].toString() + "/base64",
        {
          headers: { token: token1, responseType: "arraybuffer" },
        }
      )
      .then(async (res1) => {
        //console.log(res1.data)
        Setsource(res1.data);
      });
  };

  /**
   * A callback function that handles the saving of an invoice image to the machine's local storage.
   * @returns {Promise<void>}
   */
  const saveImage = async () => {
    try {
      // Request device storage access permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const filename =
          FileSystem.documentDirectory +
          "invoice_" +
          item["invoiceID"] +
          ".jpg";
        await FileSystem.writeAsStringAsync(filename, imageSource, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);

        showMessage({
          message: "Invoice Is Saved",
          backgroundColor: "green",
          type: "success",
        });
      }
    } catch (error) {
      showMessage({
        message: error,
        backgroundColor: "red",
        type: "error",
      });
    }
  };

  return (
    <Layout style={styles.page}>
      <ScrollView>
        <Image
          source={{
            uri: `data:image/jpeg;base64,${imageSource}`,
          }}
          style={{ resizeMode: "contain", width: 400, height: 500 }}
        />

        <Button status="success" onPress={() => saveImage()}>
          Save
        </Button>

        <Button status="danger" onPress={() => DeleteInvoice()}>
          Delete
        </Button>

        <Button onPress={() => setVisible(false)} appearance={"ghost"}>
          Back
        </Button>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "white",
    marginTop: "10%",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 100,
    elevation: 5,
  },
  zoomableView: {
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default InvoiceDetail;
