import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { getJobs} from "../apiCaller.js";

const DATA = [
  {
    "id": "1",
    "title": "First Job",
    "address": "Sonoma, Irvine",
    "when": "Wed, Nov 09",
    "time": "5pm",
    "installation":"Microwave",
    "notes":"call before you come in"
  },
  {
    "id": "2",
    "title": "Second Job",
    "address": "Sonoma, Irvine",
    "when": "Wed, Nov 09",
    "time": "5pm",
    "installation":"Microwave",
    "notes":"call before you come in"
  },
  {
    "id": "3",
    "title": "Third Job",
    "address": "Sonoma, Irvine",
    "when": "Wed, Nov 09",
    "time": "5pm",
    "installation":"Microwave",
    "notes":"call before you come in"
    
  },
];


// const Item = ({ item, onPress, backgroundColor, textColor }) => (
//   <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
//     <Text style={[styles.title, textColor]}>{item.title}</Text>
//     <Text>Job ID#: {item.id}</Text>
//     <Text>Address: {item.address}</Text>
//     <Text>{item.when} @ {item.time} </Text>
//     <Text>{item.installation}</Text>
//     <Text>{item.notes}</Text>
//   </TouchableOpacity>
// );

const Item = ({ item, onPress, backgroundColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title]}>{item.title}</Text>
    <Text>Client ID#: {item.clientID}</Text>
    <Text>dateStart: {item.dateStart}</Text>
    <Text>dateEnd: {item.dateEnd}</Text>
    <Text>description: {item.description}</Text>
    <Text>isCompleted: {item.isCompleted}</Text>
    <Text>Job ID#: {item.jobID}</Text>
  </TouchableOpacity>
);

// const Display = ({navigation}) => {
//   const [selectedId, setSelectedId] = useState(null);
// //   const navigation = useNavigation();
//  // const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     getJobs()
//       .then((result) => {
//         setJobs(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const renderItem = ({ item }) => {
//     //bgColor: affects when pressed
//     const backgroundColor = item.id === selectedId ? "white" : "white";
//     const color = item.id === selectedId ? 'black' : 'black';

//     return (
//       <Item
//         item={item}
//         onPress={() => setSelectedId(item.id)}
//         backgroundColor={{ backgroundColor }}
//         textColor={{ color }}
//       />
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         extraData={selectedId}
//       ></FlatList>
//     </SafeAreaView>
//   );
// };

//The dynamic display
const Display = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
//   const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs()
      .then((result) => {
        setJobs(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderItem = ({ item }) => {
    //bgColor: affects when pressed
    const backgroundColor = item.jobID === selectedId ? "white" : "white";
    const color = item.jobID === selectedId ? 'black' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.jobID)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={(item) => item.jobID}
        extraData={selectedId}
      ></FlatList>
    </SafeAreaView>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Display;
