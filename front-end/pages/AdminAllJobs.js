import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Layout, Card, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

export default function AdminAllJobs({ navigation }) {
  //const navigation = useNavigation();

  return (
    <Layout style={styles.center} level="1">
      <Image style={styles.image} source={require("../assets/royal.png")} />

      <Layout style={styles.container} level="2">
        <Button status="primary">Today</Button>
        <Button status="success">Tomorrow</Button>

        <Button status="info">Future</Button>

        <Button status="warning">
          <Text>Completed</Text>
        </Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    height: 30,
    width: 80,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    justifyContent: "center",
    backgroundColor: "#3366FF",
  },
  image: {
    width: 300,
    height: 50,
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
});