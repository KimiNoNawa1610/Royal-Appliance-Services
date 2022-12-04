import React, { useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { Button, Layout, Card, Text } from "@ui-kitten/components";
import ViewJobs from "./ViewJobs";
//import { getJobs} from "./apiCaller.js";

export default function TechDashBoard() {
  //const navigation = useNavigation();
  const[active,setActive] = useState("Today")
  const months = [1,2,3,4,5,6,7,8,9,10,11,12]

  return (
    <Layout style={styles.center} level="1">
      <Image style={styles.image} source={require("../assets/royal.png")} />

      <Layout style={styles.container} level="2">

        <Button style={styles.button} status="warning" onPress={()=>setActive("Past")}>Past</Button>

        <Button  style={styles.button} status="primary" onPress={()=>setActive("Today")}>Today</Button>

        <Button  style={styles.button} status="info" onPress={()=>setActive("Future")}>Future</Button>

        <Button  style={styles.button} status="success"  onPress={()=>setActive("Completed")}>Completed</Button>

      </Layout>

      <Layout level="3">
          {active === "Today" && <ViewJobs start={`${new Date().getFullYear()}-${months[new Date().getMonth()]}-${new Date().getDate()}`} end={`${new Date().getFullYear()}-${months[new Date().getMonth()]}-${new Date().getDate()+1}`} iscompleted={false}/>}
          {active === "Past" && <ViewJobs start={`${new Date().getFullYear()}-${months[new Date().getMonth()] > 2 ? months[new Date().getMonth()]-1 : 12}-${new Date().getDate()}`} end={`${new Date().getFullYear()}-${months[new Date().getMonth()]}-${new Date().getDate()-1}`} iscompleted={"None"}/>}
          {active === "Future" && <ViewJobs start={`${new Date().getFullYear()}-${months[new Date().getMonth()]}-${new Date().getDate()+1}`} end={`${new Date().getFullYear()}-${months[new Date().getMonth()] < 12 ? months[new Date().getMonth()] + 1 : 1}-${new Date().getDate()}`} iscompleted={false}/>}
          {active === "Completed" && <ViewJobs start={`${new Date().getFullYear()}-${months[new Date().getMonth()] > 2 ? months[new Date().getMonth()] - 1 : 12}-${new Date().getDate()}`} end={`${new Date().getFullYear()}-${months[new Date().getMonth()]}-${new Date().getDate()}`} iscompleted={true}/>}
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
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    margin: 2,
    // height: 30,
    // width: 80,
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

/*
 const [shouldShow, setShouldShow] = useState(true);
onPress={() => setShouldShow(!shouldShow)}
 <Layout style={styles.container} level='2'> 
  <Button style={styles.button} status='primary' onPress={() => setShouldShow(!shouldShow)}>
      Today
    </Button> {Here we will return the view when state is true 
        and will return false if state is false}
        {shouldShow ?
          (
           //code hre
          ) : null}
          */
