import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import { BASE_URL } from '../config';
import ViewTechs from './ViewTechs';
import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, TextInput, View, Text, Alert, SafeAreaView,
         Pressable,Image } from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


const Separator = () => (
  <View style={styles.separator} />
);

const AdminDashboard = () => {
  const navigation = useNavigation();
  const [date, setDate] = React.useState(new Date());

  return (
    // <SafeAreaView>
    <SafeAreaView style ={styles.pageContainer}>
      {/* All components are within the calendar container */}

      <View style ={styles.componentContainer}>
        <View style ={styles.TopHalf}>
          <View style={styles.topHalfLeft}>
            <CalendarList
              style ={styles.calendarCustom}
              pastScrollRange={5}
              futureScrollRange={5}
              scrollEnabled={true}
              showScrollIndicator={true}
              /*//You can pass functions like this
              dayComponent={({date, state}) => {
                return (
                  <View>
                    <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>{date.day}</Text>
                  </View>
                );
              }}*/
              >
            </CalendarList>
          </View>  
          <View style={styles.topHalfRight}>
            <Agenda/>
          </View>
        </View>

        <Separator/>

        <View style={styles.buttonSetContainer}>
          <View  style={styles.buttonContainer}>
            <Button title="Create Employee Account" onPress={async ()=>{navigation.navigate("EmployeeGenerator")}}/>
          </View>
          <View  style={styles.buttonContainer}>
            <Button title="View Techs" onPress={async ()=>{navigation.navigate("ViewTechs")}}/>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Create Job" onPress={async ()=>{ navigation.navigate("CreateJob")}}/>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Edit Job" onPress={async ()=>{ navigation.navigate("EditJob")}}/>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Logout" onPress={async ()=>{AsyncStorage.removeItem("AccessToken"); navigation.navigate("Login")}}/>
          </View>
        </View>
      </View>  
    </SafeAreaView>
  )
}

//const calenderStyles = 
const styles = StyleSheet.create({
  pageContainer: {
    //display: 'flex',
    flexDirection: 'row',
    flex: 1,
    //padding:50,
  },
  componentContainer: {
    flex: 1,
    padding: 50,
    flexWrap: 'wrap',
  },
  TopHalf: {
    //display: 'flex',
    flex: 1,
    flexDirection: "row",
  },
  topHalfLeft: {
    flex: 0.75,
  },
  topHalfRight: {
    flex: 0.25,
  },
  /*Note for Olena:
      This calendar has its own library methods.
      Some regular ones might not work. See doc here:
      https://github.com/wix/react-native-calendars
  */
  calendarCustom: {
    borderColor: 'gray',
    //calendarWidth: 100,
    //calendarWidth:100,
    //flexShrink: 0.5,
    //expandShrinkCalendar: 1,
    overflow:'hidden',
    //flex: 0,

    //calander ignores container.

  },
  separator: {
    marginVertical: 15,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
    //flex: 1,
  },
  buttonSetContainer: {
    flex: .10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //display: 'flex',
    //width: 'parent',
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 30,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  // centered: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});


export default AdminDashboard;

