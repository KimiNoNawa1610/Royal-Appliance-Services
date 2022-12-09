import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Button, Input, Text, Divider, Layout } from "@ui-kitten/components";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddIncomeSheet = ({ onAddVisible }) => {
  let [Total, setTotal] = useState(0);
  let [my_part, setMyPart] = useState(0);
  let [inv, setInv] = useState(0);
  let [Labor, setLabor] = useState(0);
  let [Tax, setTax] = useState(0);
  let [Shipping, setShipping] = useState(0);
  let [Client_sell, setClientSell] = useState(0);
  let [Net, setNet] = useState(0);
  let [Installed_part, setInstalledPart] = useState("");
  let [Paid_by, setPaidBy] = useState("");

  const onSave = async () => {
    let sendJSON = {
      total: Total,
      my_part: my_part,
      labor: Labor,
      tax: Tax,
      shipping: Shipping,
      net: Net,
      part_installed: Installed_part,
      client_sell: Client_sell,
      paid_by: Paid_by,
      datecreated: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
    };
    const token1 = await AsyncStorage.getItem("AccessToken");
    const name = await AsyncStorage.getItem("name");
    axios
      .get(BASE_URL + "/get_employee_id/" + name, {
        headers: { token: token1 },
      })
      .then((res1) => {
        const id = res1.data.employeeID;

        axios
          .post(
            BASE_URL +
              "/generate_tech_income_sheet/" +
              id.toString() +
              "/" +
              inv.toString(),
            sendJSON,
            {
              headers: { token: token1 },
            }
          )
          .then((res2) => {
            if (res2.status === 200) {
              showMessage({
                message: res2.data,
                backgroundColor: "green",
                type: "success",
              });
            } else {
              showMessage({
                message: res2.data,
                backgroundColor: "red",
                type: "error",
              });
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout style={styles.page}>
      <Text category={"h1"}>Add Income Sheet</Text>
      <Divider />
      <Input
        onChangeText={(text) => setInv(text)}
        defaultValue={inv}
        label={(evaProps) => <Text {...evaProps}>Invoice Number</Text>}
      />
      <Input
        onChangeText={(text) => setInstalledPart(text)}
        defaultValue={Installed_part}
        label={(evaProps) => <Text {...evaProps}>Installed Part(s)</Text>}
      />
      <View style={{ flexDirection: "row", flex: 1 }}>
        <Input
          style={{ width: "50%" }}
          onChangeText={(text) => setTotal(text)}
          defaultValue={Total}
          label={(evaProps) => <Text {...evaProps}>Total</Text>}
        />

        <Input
          style={{ width: "50%" }}
          onChangeText={(text) => setMyPart(text)}
          defaultValue={my_part}
          label={(evaProps) => <Text {...evaProps}>My Part</Text>}
        />
      </View>

      <View style={{ flexDirection: "row", flex: 1 }}>
        <Input
          style={{ width: "50%" }}
          onChangeText={(text) => setLabor(text)}
          defaultValue={Labor}
          label={(evaProps) => <Text {...evaProps}>Labor</Text>}
        />

        <Input
          style={{ width: "50%" }}
          onChangeText={(text) => setTax(text)}
          defaultValue={Tax}
          label={(evaProps) => <Text {...evaProps}>Tax</Text>}
        />
      </View>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <Input
          style={{ width: "50%" }}
          onChangeText={(text) => setShipping(text)}
          defaultValue={Shipping}
          label={(evaProps) => <Text {...evaProps}>Shipping</Text>}
        />

        <Input
          style={{ width: "50%" }}
          onChangeText={(text) => setClientSell(text)}
          defaultValue={Client_sell}
          label={(evaProps) => <Text {...evaProps}>Client Sell</Text>}
        />
      </View>

      <View style={{ flexDirection: "row", flex: 1 }}>
        <Input
          style={{ width: "50%" }}
          onChangeText={(text) => setNet(text)}
          defaultValue={Net}
          label={(evaProps) => <Text {...evaProps}>Net</Text>}
        />

        <Input
          style={{ width: "50%" }}
          onChangeText={(text) => setPaidBy(text)}
          defaultValue={Paid_by}
          label={(evaProps) => <Text {...evaProps}>Paid By</Text>}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <Button status={"success"} onPress={onSave} style={{ marginTop: 20 }}>
          Save
        </Button>
        <Button
          status={"primary"}
          onPress={() => {
            onAddVisible(false);
          }}
          style={{ marginTop: 20, marginLeft: 10 }}
        >
          Back
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  page: {
    marginTop: "-50%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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

export default AddIncomeSheet;
