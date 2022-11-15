import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";

const DATA = [
  {
    id: "1",
    title: "First Job",
    address: "Sonoma, Irvine",
    when: "Wed, Nov 09",
    time: "5pm",
    installation:"Microwave",
    notes:"call before you come in"
  },
  {
    id: "2",
    title: "Second Job",
    address: "Sonoma, Irvine",
    when: "Wed, Nov 09",
    time: "5pm",
    installation:"Microwave",
    notes:"call before you come in"
  },
  {
    id: "3",
    title: "Third Job",
    address: "Sonoma, Irvine",
    when: "Wed, Nov 09",
    time: "5pm",
    installation:"Microwave",
    notes:"call before you come in"
    
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
    <Text>Job ID#: {item.id}</Text>
    <Text>Address: {item.address}</Text>
    <Text>{item.when} @ {item.time} </Text>
    <Text>{item.installation}</Text>
    <Text>{item.notes}</Text>
  </TouchableOpacity>
);

const Display = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
//   const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "white" : "white";
    const color = item.id === selectedId ? 'black' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
