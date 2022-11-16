import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList,StyleSheet, TextInput, View, StatusBar,TouchableOpacity } from "react-native";
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from 'react-native-dropdown-picker';
import { showMessage } from "react-native-flash-message";
import axios from "axios";

const Separator = () => (
    <View style={styles.separator} />
  );

  const Header = () => (
    <View>
      <Text category='h6'>Maldives</Text>
      <Text category='s1'>By Wikipedia</Text>
    </View>
  );
  
  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size='small'
        status='basic'>
        CANCEL
      </Button>
      <Button
        style={styles.footerControl}
        size='small'>
        ACCEPT
      </Button>
    </View>
  );
export default function JobPost() {

    const [job, setJob] = useState([
        {
            "clientID": 2,
            "name": "Jenna",
            "dateEnd": "Tue, 15 Nov 2022 00:00:00 GMT",
            "dateStart": "Tue, 15 Nov 2022 00:00:00 GMT",
            "description": "GE Profile - 30\" Smart Built-In Single Electric Convection Wall Oven",
            "employeeID": 3,
            "address": "14056 Bradbury Road",
            "jobID": 14
        }
    ]);

    const Item = ({item}) => (
        // <View style={styles.item}>
        //   <Text style={styles.title}>Job ID#: {item.jobID}</Text>  
        //   {/* <Image style={styles.image} source={require("../assets/royal.png")} /> */}
        //   <Text>Client ID#: {item.clientID}</Text>
        //   <Text>Date Start: {item.dateStart}</Text>
        //   <Text>Date End: {item.dateEnd}</Text>
        //   <Text>description: {item.description}</Text>
          
        // </View>
        <TouchableOpacity>
       <View style={styles.item}>
      {/* <Layout style={styles.topContainer} level='1'>
      </Layout> */}
      <View style={styles.topContainer}>
      <Card>
        <Text style={[styles.title]}>ASSIGNED</Text>
        </Card>
      <Card>
      <Text style={[styles.title]}>Job ID: {item.jobID}</Text> 
      </Card>
      </View>
         <View style={{marginTop: 4}}>
           <Text style={{fontWeight:'bold',fontSize:16}}>{item.name}</Text>
           <Text>{item.address}</Text>
           <View style={{marginTop: 8}}>
            <Text>WHEN:</Text>
            <Text style={{fontWeight:'bold',fontSize:20}}>{item.dateStart}</Text>
            <Text>DESCRIPTION: {item.description}</Text>
           </View> 
         </View>
      </View> 
      </TouchableOpacity>
      );


  const renderItem = ({item}) => {
    //<Text  style={styles.item}>{item.job}</Text>
    return (
        <Item item={item}></Item>
      );
    }


    return(
        // {/* data prop take the data to present */}
        //  {/* renderItem is a function that returns a jsx */}
         // the item inside its params are individual in the struct
        <View style={styles.container}>
            <FlatList 
                data={job}
                renderItem={renderItem}
                keyExtractor={(item) => item.jobID}
                >
            </FlatList>
        </View>
    
    );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 20,
      backgroundColor: '##f3f2f3',
      //borderColor: 'black',
      //borderWidth: 'thick',
    },
    item: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white',
      borderColor: 'black',
      borderRadius: 10,
      //fontSize: 20,
      //flexWrap: 'wrap'
    },
    title: {
        fontSize: 22,
    },
    separator: {
        marginVertical: 4,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      },
      card: {
        flex: 1,
        margin: 2,
      },
      footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      footerControl: {
        marginHorizontal: 2,
      },
  });
