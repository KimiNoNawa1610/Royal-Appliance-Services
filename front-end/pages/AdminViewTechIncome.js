import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { Text, Divider } from "@ui-kitten/components";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { showMessage } from "react-native-flash-message";
import AdminTechIncomeSheets from "./AdminTechIncomeSheets";

/**
 * THe page to view a tech's specific income
 * @returns {JSX.Element}
 * @constructor
 */
const AdminViewTechIncome = () => {
  const isFocused = useIsFocused();
  //dropdown
  let state2 = { techs: [] };
  const [tech, setTech] = useState(null);
  const [bopen, bsetOpen] = useState(false);
  let [id, setID] = useState(null);

  /**
   * A React useEffect that is called everytime the screen is in or out of focus.
   */
  useEffect(() => {
    if (isFocused) {
      getTechs();
    }
  }, [isFocused]);

  /**
   * A fetch function that gets all employees from the database.
   * @returns {Promise<void>}
   */
  const getTechs = async () => {
    const token1 = await AsyncStorage.getItem("AccessToken");
    //console.log(token1)
    axios
      .get(BASE_URL + "/get_all_employees/", {
        headers: { token: token1 },
      })
      .then((res1) => {
        //console.log(res1)
        for (let i = 0; i < res1.data.length; i++) {
          //console.log(res1.data[i].name, res1.data[i].employeeID)
          state2.techs.push({
            label: res1.data[i].name,
            value: res1.data[i].employeeID,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const [bitems, bsetItems] = useState(state2.techs);

  return (
    <SafeAreaView style={styles.centered}>
      <Text
        category={"h5"}
        style={{ marginTop: 30, margin: 10, marginBottom: 0 }}
      >
        Income Details
      </Text>
      <Divider style={{ marginBottom: 15 }} />

      {/* <Text>Client</Text> */}
      <View style={{ flexDirection: "row", zIndex: 2 }}></View>
      <View style={{ width: "101%", zIndex: 1 }}>
        <DropDownPicker
          style={styles.dropdown}
          open={bopen}
          value={tech}
          items={bitems}
          setOpen={bsetOpen}
          setValue={setTech}
          setItems={bsetItems}
          placeholder={"Select Employee"}
          searchable={true}
        />
      </View>

      <Divider style={{ marginTop: 15 }} />

      <ScrollView>
        {tech != null && <AdminTechIncomeSheets employeeID={tech} />}
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
  },
});

export default AdminViewTechIncome;
