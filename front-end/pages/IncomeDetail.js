import React from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Text, Divider } from "@ui-kitten/components";

const IncomeDetail = ({ item, setVisible }) => {
  return (
    <Layout style={styles.page}>
      <Text category={"h1"}>Income Details</Text>
      <Divider />
      <Text style={{ fontWeight: "bold" }}>INVOICE#:</Text>
      <Text>{item["invoiceID"]}</Text>
      <Divider />

      <Text style={{ fontWeight: "bold" }}>CREATE DATE: </Text>
      <Text>{`${new Date(item["datecreated"]).getMonth() + 1}-${
        new Date(item["datecreated"]).getDate() + 1
      }-${new Date(item["datecreated"]).getFullYear()}`}</Text>
      <Divider />

      <Text style={{ fontWeight: "bold" }}>TOTAL: </Text>
      <Text>${item["total"]}</Text>

      <Text style={{ fontWeight: "bold" }}>MY PART: </Text>
      <Text>${item["my_part"]}</Text>

      <Text style={{ fontWeight: "bold" }}>MY PART: </Text>
      <Text>${item["my_part"]}</Text>

      <Text style={{ fontWeight: "bold" }}>LABOR: </Text>
      <Text>${item["labor"]}</Text>

      <Text style={{ fontWeight: "bold" }}>TAX: </Text>
      <Text>${item["tax"]}</Text>

      <Text style={{ fontWeight: "bold" }}>SHIPPING: </Text>
      <Text>${item["shipping"]}</Text>

      <Text style={{ fontWeight: "bold" }}>PART INSTALLED: </Text>
      <Text>{item["part_installed"]}</Text>

      <Text style={{ fontWeight: "bold" }}>ClLIENT SELL: </Text>
      <Text>${item["client_sell"]}</Text>

      <Text style={{ fontWeight: "bold" }}>PAID BY: </Text>
      <Text>{item["paid_by"]}</Text>

      <Divider />
      <Button onPress={() => setVisible(false)} appearance={"ghost"}>
        Back
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    marginTop: "50%",
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
});

export default IncomeDetail;
