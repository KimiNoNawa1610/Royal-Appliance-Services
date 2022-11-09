import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Layout, Text } from "@ui-kitten/components";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewTechs = ({navigation}) => {
  const [techData, setTechData] = useState([]);
  //const navigation = useNavigation();

  useEffect(() => {
    const getTechs = async () => {
      const response = await axios.get(
        BASE_URL+"/get_all_employees/",{headers:{'token':await AsyncStorage.getItem("AccessToken")}}
      );
      setTechData(response.data);
      console.log(techData)
    };
    getTechs();
  }, []);

  const TechRender = ({ item }) => {
    const Footer = () => {
      return (
        <Button onPress={() => navigation.navigate("EditTech", { item })}>
          Edit
        </Button>
      );
    };

    return (
      <View style={styles.techContainer}>
        <Card footer={Footer}>
          <Text style={styles.techName}>{item["name"]}</Text>
          <Text>Email: {item["email"]}</Text>
        </Card>
      </View>
    );
  };

  return (
    <Layout style={styles.page}>
      <Text category={"h1"} style={styles.titleLayout}>
        Current Employees
      </Text>
      <Layout>
        <>
          {techData.map((item, i) => (
            <TechRender key={i} item={item}></TechRender>
          ))}
        </>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  techContainer: {
    flex: 1,
    marginBottom: 5,
  },
  techName: {
    fontSize: 30,
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
});
export default ViewTechs;