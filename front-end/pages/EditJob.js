import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { BASE_URL } from "../config";
import {
  Button,
  Card,
  Layout,
  Text,
  Modal,
  Input,
  Divider,
  Select,
} from "@ui-kitten/components";
import axios from "axios";

/* Sample Return Data
{
    "client_sell": 1198.0,
    "id": 195623,
    "labor": 300.0,
    "my_part": 75.0,
    "net": 2557.3,
    "paid_by": "cash, credit",
    "part_installed": "RTX 3080, RTX 3070",
    "shipping": 22.0,
    "tax": 55.95,
    "total": 2688.25
}
 */

const EditJob = () => {
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const getInvoice = async () => {
      const response = await axios.get(
        BASE_URL+"/get_invoice/195623"
      );
      setData(response.data);
      console.log(response);
    };
    getInvoice();
  },[]);

  return (
    <Layout>
      <Text>Edit Job</Text>
      <Divider />
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        
        <Card>
          <Text>Check Check</Text>
        </Card>
        <Button onPress={() => setVisible(false)}>Done</Button>
      </Modal>

      <Button onPress={() => setVisible(true)}>Add New Row</Button>
      <Button status={"success"}>Save</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  whole: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default EditJob;
