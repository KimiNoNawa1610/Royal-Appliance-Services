
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import { BASE_URL } from '../config';
import ViewTechs from './ViewTechs';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TextInput, View, Alert, SafeAreaView, Pressable,Image} from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Button, Layout, Card, Text, Calendar as Calendar2 } from "@ui-kitten/components";

const now = new Date();
const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//const date = new Date();

const Separator = () => (
  <View style={styles.separator} />
);

const DayCell = ({date}, style) => (
    <View
      style={[styles.dayContainer, style.container]}>
      <Text style={[style.text, "color=red"]}>{`${date.getDate()}*`}</Text>
    </View>
  
);

const AdminDashboard = () => {
  const navigation = useNavigation();
  //const [date, setDate] = React.useState(null);
  const [ selectedDate, setSelectedDate ] = React.useState(date);
  const componentRef = React.createRef();

  const scrollToSelected = () => {
    if (componentRef.current) {
        componentRef.current.scrollToDate(selectedDate);
    }
    /* */
  };

  const scrollToToday = () => {
    if (componentRef.current) {
      componentRef.current.scrollToToday();
    }
  };

  return (
    <Layout style={styles.container} level='1'>

      <Button style={styles.topButton1} onPress={scrollToToday}>Scroll to Today</Button>
      {/* this opens a modal that shows info */}
      <Button style={styles.topButton2} onPress={scrollToSelected}>View Selected Date</Button>

      <View style={styles.calendarContainer}>
        <Text
          category='h6'
          style={styles.text}>
          Selected date: {selectedDate.toLocaleDateString()}
        </Text>

        <Calendar2
          ref={componentRef}
          date={selectedDate}
          onSelect={nextDate => setSelectedDate(nextDate)}
          // date={date}
          // onSelect={nextDate => setDate(nextDate)}
          renderDay={DayCell} 
          />
        <Separator/>  
      </View>
        
      <Layout style={styles.buttonContainer} level='2'>
        <Button style={styles.button} status="primary" onPress={async ()=>{navigation.navigate("EmployeeGenerator")}}>
          Create Employee Account</Button>
      
        <Button style={styles.button} status="primary" onPress={async ()=>{navigation.navigate("ViewTechs")}}>
          View Techs</Button>

        {/* this navigates to adminalljobs */}
        <Button style={styles.button} status="primary" onPress={async ()=>{navigation.navigate("ViewTechs")}}>
          View All Jobs</Button>  
      
        <Button style={styles.button} status="primary" onPress={async ()=>{ navigation.navigate("CreateJob")}}>
          Create Job</Button>
      
        <Button style={styles.button} status="primary" onPress={async ()=>{ navigation.navigate("EditJob")}}>
          Edit Job</Button>

        <Button style={styles.button} status="primary" onPress={async ()=>{AsyncStorage.removeItem("AccessToken"); navigation.navigate("Login")}}>
        Logout</Button>   
      </Layout>
    </Layout>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    //alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  calendarContainer: {
    margin: 2,
    //alignItems: "center",
  },
  separator: {
    marginVertical: 4,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    marginVertical: 4,
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: 'column',
  },
  button: {
    marginVertical: 2,
  },
  topButton1: {
    marginVertical: 4,
    // marginRight:4,
  },
  topButton2: {
    marginVertical: 4,
    marginLeft:4,
  },
  value: {
    fontSize: 12,
    fontWeight: '400',
    color: 'red',
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  text: {
    // color: 'red',
  },
});


export default AdminDashboard;
