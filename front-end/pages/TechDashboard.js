import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { Button, Layout, Card, Text } from "@ui-kitten/components";
import ViewJobs from "./ViewJobs";

export default function TechDashBoard() {
  const [which,setWhich] = useState("Today");
  const [date1, setDate1] = useState();
  const [date2, setDate2] = useState();
  const [status, setStatus] = useState();
  const now = new Date();
  //const present = new Date();
   const present = new Date().toISOString().split('T')[0];
  //console.log(present);
  const date = new Date(now.getFullYear(), now.getMonth()+1, now.getDate()-1);

  // useEffect(() =>{
  //   try {
  //     if (which === "Past") {
  //       setDate1(present);
  //       console.log(date1);
  //       setDate2(present);
  //       console.log(date2);
  //       setStatus(true);
  //     } 
  //     if (which === "Today") {
  //       setDate1(present);
  //       setDate2(present);
  //       setStatus(false);
  //     } 
  //     if (which === "Future") {
  //       setDate1(present);
  //       setDate2(present);
  //       setStatus(false);
  //     } 
  //     if (which === "Completed") {
  //       setDate1(present);
  //       setDate2(present);
  //       setStatus(true);
  //     } 
  //   } catch (err) {
  //     console.log(err);
  //   }

  // }, [which]);

  //component that uses arguments as props
  // const ViewJobObject = ({ which}) => {
  //   if (which === "Past") {
  //     return(
  //       <ViewJobs start='2021-02-01' end='2023-12-01' iscompleted={false} selector={which}></ViewJobs>
  //     );
  //   } 
  //   if (which === "Today") {
  //     return(
  //       <ViewJobs start='2022-12-01' end='2022-12-11' iscompleted={false} selector={which}></ViewJobs>
  //     );
  //   } 
  //   if (which === "Future") {
  //     return(
  //       <ViewJobs start='2023-01-01' end='2023-12-01' iscompleted={false} selector={which}></ViewJobs>
  //     );
  //   } 
  //   if (which === "Completed") {
  //     <ViewJobs start='2021-12-01' end='2022-12-01' iscompleted={false} selector={which}></ViewJobs>
  //   } 
  // };

  const ViewJobObject = ({ which}) => {
    if (which === "Past") {
      return(
        <ViewJobs start='2021-02-01' end='2023-12-01' iscompleted={false} selector={which}></ViewJobs>
      );
    } 
    if (which === "Today") {
      return(
        <ViewJobs start='2022-12-01' end='2022-12-11' iscompleted={false} selector={which}></ViewJobs>
      );
    } 
    if (which === "Future") {
      return(
        <ViewJobs start='2023-01-01' end='2023-12-01' iscompleted={false} selector={which}></ViewJobs>
      );
    } 
    if (which === "Completed") {
      <ViewJobs start='2021-12-01' end='2022-12-01' iscompleted={false} selector={which}></ViewJobs>
    } 
  };

  return (
    <Layout style={styles.center} level="1">
      <Image style={styles.image} source={require("../assets/royal.png")} />

      <Layout style={styles.container} level="2">

        <Button style={styles.button} status="warning" onPress={()=>setWhich("Past")}>Past</Button>

        <Button  style={styles.button} status="primary" onPress={()=>setWhich("Today")}>Today</Button>

        <Button  style={styles.button} status="info" onPress={()=>setWhich("Future")}>Future</Button>

        <Button  style={styles.button} status="success"  onPress={()=>setWhich("Completed")}>Completed</Button>

      </Layout>

      <Layout level="3">
          {/* <ViewJobs start={date1} end={date2} iscompleted={false} selector={which}> </ViewJobs> */}
          {/* <ViewJobs start='2022-12-01' end='2022-12-01' iscompleted={false} selector={which}></ViewJobs> */}
          <ViewJobObject which={which}></ViewJobObject>
          
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

