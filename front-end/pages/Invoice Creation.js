import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import {
  Button,
  Input,
  Layout,
  Text,
  IndexPath,
  Select,
  SelectItem,
  Divider,
  Datepicker,
} from "@ui-kitten/components";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InvoiceCreation = () => {
  const data = ["Visa", "Mastercard", "AMEX", "Discover"];

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const displayValue = data[selectedIndex.row];

  const [partsJSON, setPartsJSON] = React.useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const [date, setDate] = React.useState(new Date());

  const [sendJSON, setSendJSON] = React.useState({
    card_type: "Visa",
    date: `${date.toString()}}`,
  });
  //Example for parts JSON
  // [ {  quantity: 100, part_material, "Part /  Material", cost: 100.20 }, ..., { }  ]

  const handleSend = async () => {
    sendJSON["part_rows"] = partsJSON;
    sendJSON["date"] = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    sendJSON["signature"] = sendJSON["customer_name"]
    console.log(sendJSON);

    axios
      .post(BASE_URL + "/generate_invoice", sendJSON, {
        headers: { token: await AsyncStorage.getItem("AccessToken") },
      })
      .then((res) => {
        if (res.status === 200) {
          showMessage({
            message: res.data,
            backgroundColor: "green",
            type: "success",
          });
        } else {
          showMessage({
            message: res.data,
            backgroundColor: "red",
            type: "success",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const renderOption = (item, i) => <SelectItem key={i} title={item} />;

  const AllPartsAndMaterials = () => {
    return (
      <Layout>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Input
            style={{ width: "15%" }}
            keyboardType={"decimal-pad"}
            label={(evaProps) => <Text {...evaProps}>Quantity</Text>}
            onChangeText={(text) => (partsJSON[0]["quantity"] = text)}
          />
          <Input
            style={{ width: "65%" }}
            label={(evaProps) => <Text {...evaProps}>Parts / Materials</Text>}
            onChangeText={(text) => (partsJSON[0]["part_material"] = text)}
          />
          <Input
            style={{ width: "20%" }}
            keyboardType={"decimal-pad"}
            label={(evaProps) => <Text {...evaProps}>Cost</Text>}
            onChangeText={(text) => (partsJSON[0]["cost"] = text)}
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Input
            style={{ width: "15%" }}
            keyboardType={"decimal-pad"}
            label={(evaProps) => <Text {...evaProps}>Quantity</Text>}
            onChangeText={(text) => (partsJSON[1]["quantity"] = text)}
          />
          <Input
            style={{ width: "65%" }}
            label={(evaProps) => <Text {...evaProps}>Parts / Materials</Text>}
            onChangeText={(text) => (partsJSON[1]["part_material"] = text)}
          />
          <Input
            style={{ width: "20%" }}
            keyboardType={"decimal-pad"}
            label={(evaProps) => <Text {...evaProps}>Cost</Text>}
            onChangeText={(text) => (partsJSON[1]["cost"] = text)}
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Input
            style={{ width: "15%" }}
            keyboardType={"decimal-pad"}
            label={(evaProps) => <Text {...evaProps}>Quantity</Text>}
            onChangeText={(text) => (partsJSON[2]["quantity"] = text)}
          />
          <Input
            style={{ width: "65%" }}
            label={(evaProps) => <Text {...evaProps}>Parts / Materials</Text>}
            onChangeText={(text) => (partsJSON[2]["part_material"] = text)}
          />
          <Input
            style={{ width: "20%" }}
            keyboardType={"decimal-pad"}
            label={(evaProps) => <Text {...evaProps}>Cost</Text>}
            onChangeText={(text) => (partsJSON[2]["cost"] = text)}
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Input
            style={{ width: "15%" }}
            keyboardType={"decimal-pad"}
            label={(evaProps) => <Text {...evaProps}>Quantity</Text>}
            onChangeText={(text) => (partsJSON[3]["quantity"] = text)}
          />
          <Input
            style={{ width: "65%" }}
            label={(evaProps) => <Text {...evaProps}>Parts / Materials</Text>}
            onChangeText={(text) => (partsJSON[3]["part_material"] = text)}
          />
          <Input
            style={{ width: "20%" }}
            keyboardType={"decimal-pad"}
            label={(evaProps) => <Text {...evaProps}>Cost</Text>}
            onChangeText={(text) => (partsJSON[3]["cost"] = text)}
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Input
            style={{ width: "15%" }}
            keyboardType={"decimal-pad"}
            label={(evaProps) => <Text {...evaProps}>Quantity</Text>}
            onChangeText={(text) => (partsJSON[4]["quantity"] = text)}
          />
          <Input
            style={{ width: "65%" }}
            label={(evaProps) => <Text {...evaProps}>Parts / Materials</Text>}
            onChangeText={(text) => (partsJSON[4]["part_material"] = text)}
          />
          <Input
            style={{ width: "20%" }}
            keyboardType={"decimal-pad"}
            label={(evaProps) => <Text {...evaProps}>Cost</Text>}
            onChangeText={(text) => (partsJSON[4]["cost"] = text)}
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Input
            style={{ width: "15%" }}
            keyboardType={"decimal-pad"}
            label={(evaProps) => <Text {...evaProps}>Quantity</Text>}
            onChangeText={(text) => (partsJSON[5]["quantity"] = text)}
          />
          <Input
            style={{ width: "65%" }}
            label={(evaProps) => <Text {...evaProps}>Parts / Materials</Text>}
            onChangeText={(text) => (partsJSON[5]["part_material"] = text)}
          />
          <Input
            style={{ width: "20%" }}
            keyboardType={"decimal-pad"}
            label={(evaProps) => <Text {...evaProps}>Cost</Text>}
            onChangeText={(text) => (partsJSON[5]["cost"] = text)}
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Input
            style={{ width: "15%" }}
            keyboardType={"decimal-pad"}
            label={(evaProps) => <Text {...evaProps}>Quantity</Text>}
            onChangeText={(text) => (partsJSON[6]["quantity"] = text)}
          />
          <Input
            style={{ width: "65%" }}
            label={(evaProps) => <Text {...evaProps}>Parts / Materials</Text>}
            onChangeText={(text) => (partsJSON[6]["part_material"] = text)}
          />
          <Input
            style={{ width: "20%" }}
            keyboardType={"decimal-pad"}
            label={(evaProps) => <Text {...evaProps}>Cost</Text>}
            onChangeText={(text) => (partsJSON[6]["cost"] = text)}
          />
        </View>
      </Layout>
    );
  };

  return (
    <SafeAreaView>
      <Layout>
        <ScrollView style={{ marginHorizontal: 10 }}>
          <View name="Customer Information" style={{ marginTop: 30 }}>
            <Text category={"h5"}>Customer Information</Text>
            <Divider style={{ marginBottom: 15 }} />
            <Input
              onChangeText={(text) =>
                (sendJSON["invoice_number"] = parseInt(text))
              }
              keyboardType={"decimal-pad"}
              label={(evaProps) => <Text {...evaProps}>Invoice Number</Text>}
            />
            <Input
              onChangeText={(text) => (sendJSON["customer_name"] = text)}
              label={(evaProps) => <Text {...evaProps}>Customer Name</Text>}
            />
            <Datepicker
              label={(evaProps) => <Text {...evaProps}>Date</Text>}
              date={date}
              onSelect={(nextDate) => {
                setDate(nextDate);
                sendJSON["date"] = nextDate
              }}
            />
            <Input
              keyboardType={"phone-pad"}
              onChangeText={(text) => (sendJSON["phone"] = text)}
              label={(evaProps) => <Text {...evaProps}>Phone</Text>}
            />
            <Input
              label={(evaProps) => <Text {...evaProps}>Street</Text>}
              onChangeText={(text) => (sendJSON["street"] = text)}
            />
            <Input
              label={(evaProps) => <Text {...evaProps}>City</Text>}
              onChangeText={(text) => (sendJSON["city"] = text)}
            />
            <Divider />
          </View>

          <View
            name="Appliance Information"
            style={{ marginBottom: 50, marginTop: 50 }}
          >
            <Text category={"h5"}>Appliance Information</Text>
            <Divider style={{ marginBottom: 15 }} />
            <Input
              onChangeText={(text) => (sendJSON["labor_warranty"] = text)}
              label={(evaProps) => <Text {...evaProps}>Labor Warranty</Text>}
            />
            <Input
              onChangeText={(text) => (sendJSON["material_warranty"] = text)}
              label={(evaProps) => <Text {...evaProps}>Material Warranty</Text>}
            />
            <Input
              onChangeText={(text) => (sendJSON["item_to_be_serviced"] = text)}
              label={(evaProps) => (
                <Text {...evaProps}>Item To Be Serviced</Text>
              )}
            />
            <Input
              label={(evaProps) => <Text {...evaProps}>Make</Text>}
              onChangeText={(text) => (sendJSON["make"] = text)}
            />
            <Input
              label={(evaProps) => <Text {...evaProps}>Model No.</Text>}
              onChangeText={(text) => (sendJSON["model_no"] = text)}
            />
            <Input
              onChangeText={(text) => (sendJSON["serial_no"] = text)}
              label={(evaProps) => <Text {...evaProps}>Serial No.</Text>}
            />
          </View>

          <View name="Job Information" style={{ marginBottom: 50 }}>
            <Text category={"h5"}>Job Information</Text>
            <Divider style={{ marginBottom: 15 }} />
            <Input
              onChangeText={(text) => (sendJSON["customer_complaint"] = text)}
              label={(evaProps) => (
                <Text {...evaProps}>Customer Complaint</Text>
              )}
            />
            <Input
              onChangeText={(text) => (sendJSON["email_address"] = text)}
              keyboardType={"email-address"}
              label={(evaProps) => <Text {...evaProps}>Email Address</Text>}
            />
            <Input
              onChangeText={(text) => (sendJSON["work_order_number"] = text)}
              keyboardType={"decimal-pad"}
              label={(evaProps) => <Text {...evaProps}>Work Order Number</Text>}
            />
            <Input
              onChangeText={(text) => (sendJSON["authorization_number"] = text)}
              keyboardType={"decimal-pad"}
              label={(evaProps) => (
                <Text {...evaProps}>Authorization Number</Text>
              )}
            />
            <Input
              onChangeText={(text) => (sendJSON["job_estimate"] = text)}
              keyboardType={"decimal-pad"}
              label={(evaProps) => <Text {...evaProps}>Job Estimate</Text>}
            />
            <Input
              onChangeText={(text) => (sendJSON["tech_name"] = text)}
              label={(evaProps) => <Text {...evaProps}>Technician's Name</Text>}
            />
            <Input
              onChangeText={(text) => (sendJSON["serial_no"] = text)}
              label={(evaProps) => <Text {...evaProps}>Serial No.</Text>}
            />
            <Input
              onChangeText={(text) => (sendJSON["tech_report"] = text)}
              multiline={true}
              label={(evaProps) => (
                <Text {...evaProps}>Technician's Report</Text>
              )}
            />
          </View>

          <View name="Parts and Materials" style={{ marginBottom: 50 }}>
            <Text category={"h5"}>Parts and Materials</Text>

            <Divider style={{ marginBottom: 15 }} />
            <AllPartsAndMaterials />
          </View>

          <View name="Cost Information" style={{ marginBottom: 50 }}>
            <Text category={"h5"}>Cost Information</Text>
            <Divider style={{ marginBottom: 15 }} />
            <Input
              onChangeText={(text) => (sendJSON["material_costs"] = text)}
              keyboardType={"decimal-pad"}
              label={(evaProps) => <Text {...evaProps}>Material Costs</Text>}
            />
            <Input
              onChangeText={(text) => (sendJSON["tax"] = text)}
              keyboardType={"decimal-pad"}
              label={(evaProps) => <Text {...evaProps}>Tax</Text>}
            />
            <Input
              onChangeText={(text) => (sendJSON["service_call"] = text)}
              keyboardType={"decimal-pad"}
              label={(evaProps) => <Text {...evaProps}>Service Call</Text>}
            />
            <Input
              onChangeText={(text) => (sendJSON["labor"] = text)}
              keyboardType={"decimal-pad"}
              label={(evaProps) => <Text {...evaProps}>Labor</Text>}
            />
            <Input
              onChangeText={(text) => (sendJSON["deposit"] = text)}
              keyboardType={"decimal-pad"}
              label={(evaProps) => <Text {...evaProps}>Deposit</Text>}
            />
            <Input
              onChangeText={(text) => (sendJSON["pick_up_delivery"] = text)}
              keyboardType={"decimal-pad"}
              label={(evaProps) => (
                <Text {...evaProps}>Pick Up and Delivery</Text>
              )}
            />
            <Input
              onChangeText={(text) => (sendJSON["all_work_cod"] = text)}
              keyboardType={"decimal-pad"}
              label={(evaProps) => <Text {...evaProps}>All Work C.O.D</Text>}
            />
            <Input
              onChangeText={(text) => (sendJSON["balance_due"] = text)}
              keyboardType={"decimal-pad"}
              label={(evaProps) => <Text {...evaProps}>Balance Due</Text>}
            />
          </View>

          <View
            name="Billing Information"
            style={{ marginBottom: 50, paddingBottom: 150 }}
          >
            <Text category={"h5"}>Billing Information</Text>
            <Divider style={{ marginBottom: 15 }} />
            <Select
              placeholder=""
              value={displayValue}
              selectedIndex={selectedIndex}
              onSelect={(index) => {
                setSelectedIndex(index);
                sendJSON["card_type"] = data[index.row];
              }}
            >
              {data.map((item, i) => renderOption(item, i))}
            </Select>

            <Input
              onChangeText={(text) => (sendJSON["card_number"] = text)}
              label={(evaProps) => <Text {...evaProps}>Card Number</Text>}
              keyboardType={"numeric"}
            />
            <Input
              onChangeText={(text) => (sendJSON["exp_date"] = text)}
              keyboardType={"number-pad"}
              label={(evaProps) => <Text {...evaProps}>Expiration Date</Text>}
            />
            <Input
              onChangeText={(text) => (sendJSON["cvc"] = text)}
              keyboardType={"number-pad"}
              label={(evaProps) => <Text {...evaProps}>CVC</Text>}
            />
          </View>

          <Button style={{ flex: 1 }} status={"success"} onPress={handleSend}>
            Submit
          </Button>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

export default InvoiceCreation;
