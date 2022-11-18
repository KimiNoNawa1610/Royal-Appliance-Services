import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import { BASE_URL } from '../config';
import ViewTechs from './ViewTechs';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TextInput, View, Alert, SafeAreaView, Pressable,Image} from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Button, Layout, Card, Text, Calendar as Calendar2, Modal } from "@ui-kitten/components";
import AdminViewJobs from "../components/AdminViewJobs";
import axios from "axios";


const Separator = () => (
  <View style={styles.separator} />
);

const AdminDashboard = () => {
  const navigation = useNavigation();
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  //const [date, setDate] = React.useState(null);
  const [ selectedDate, setSelectedDate ] = React.useState(date);
  const componentRef = React.createRef();
  const [visible, setJobVisible] = useState(false);
  const [workDays, setWorkDays] = useState([]);
  //let dynamic = workDays.map((x) => x);

  //Retrieve all jobs to mark on the calendar WIP
  useEffect(() => {
    const getAllJobs = async () => {
      const token1 = await AsyncStorage.getItem("AccessToken");
      axios
          .get(BASE_URL + "/get_all_jobs_withoutdate", {
            headers: { token: token1 },
          })
          .then((res) => {
              //console.log(res.data)
              //setWorkDays(res.data) 
              //console.log(workDays[0])
              let dayList = []
              for (var i = 0; i < res.data.length; i++){
                    //console.log("index: " + i);
                    //split into objects
                    var obj = res.data[i];
                    //console.log(obj["dateStart"]);
                    var value = obj["dateStart"];
                    // dayList.push(new Date(value).getFullYear() + "-" + new Date(value).getMonth() + "-" + new Date(value).getDate());
                    //console.log(value + "end")
                    dayList.push(new Date(value).toISOString().split('T')[0]);
                    //console.log(dayList)
                  }
                  dayList = dayList.sort(function(a, b) { return (a).localeCompare(b); });
                  //console.log("LIST " + dayList)
                  setWorkDays(dayList)
                  console.log("START " +workDays)
                  //workDays.shift();
                  //console.log("START " +workDays)
                  //console.log(value)
          })
          .catch((err) => console.log(err));
      }
      getAllJobs();
        //console.log(selectedDate);
      }, []);
    
  // const DayCell = ({ date }, style) => {
  //   if(workDays.length > 0){
  //     if(date.toISOString().split('T')[0] === workDays[0]){
  //       workDays.shift();
  //     return(
  //       <View
  //         style={[styles.dayContainer, style.container]}>
  //         <Text style={[style.text,styles.textDay]}>{`${date.getDate()}`}</Text>
  //       </View>
  //     );
  //     }
  //   else {
  //     return(
  //     <View
  //         style={[styles.dayContainer, style.container]}>
  //         <Text style={[style.text]}>{`${date.getDate()}`}</Text>
  //       </View>);
  //   }  
  //   }
  // }
  // const DayCell = ({ date }, style) => {
  //   let dynamic = workDays.map((x) => x);
    
  //     if(dynamic.length > 0){
  //       for (var i = 0; i < dynamic.length; i++){
  //         if(date.toISOString().split('T')[0] === dynamic[i]){
  //           dynamic.shift(dynamic.indexOf(i), 1);
  //           console.log(dynamic[i]);
  //           console.log(date.toISOString().split('T')[0] );
  //         return(
  //           <View
  //             style={[styles.dayContainer, style.container]}>
  //             <Text style={[style.text,styles.textDay]}>{`${date.getDate()}`}</Text>
  //           </View>
  //         );
  //         }
  //         else {
  //           return(
  //             <View
  //                 style={[styles.dayContainer, style.container]}>
  //                 <Text style={[style.text]}>{`${date.getDate()}`}</Text>
  //               </View>);
  //         }
  //       }
  //     }
  //     else {
  //       return(
  //       <View
  //           style={[styles.dayContainer, style.container]}>
  //           <Text style={[style.text]}>{`${date.getDate()}`}</Text>
  //         </View>);
  //     }  
      
  // }
  const DayCell = ({ date }, style) => {
    let dynamic = workDays.map((x) => x);
      if(dynamic.length != 0){
        for (var i = 0; i < dynamic.length; i++){
          if(date.toISOString().split('T')[0] === dynamic[i]){
            dynamic.shift(dynamic.indexOf(i), 1);
            //console.log(dynamic[i]);
            //console.log(date.toISOString().split('T')[0] );
            return(
              <View
                style={[styles.dayContainer, style.container]}>
                <Text style={[style.text,styles.textDay]}>{`${date.getDate()}`}</Text>
              </View>
            );
          }
          if(date.toISOString().split('T')[0] > dynamic[i]  ){
            dynamic.shift(dynamic.indexOf(i), 1);
            console.log(dynamic[i]);
            //console.log(date.toISOString().split('T')[0] );
          // return(
          //   <View
          //     style={[styles.dayContainer, style.container]}>
          //     <Text style={[style.text]}>{`${date.getDate()}`}</Text>
          //   </View>
          // );
          }
          else {
            return(
              <View
                  style={[styles.dayContainer, style.container]}>
                  <Text style={[style.text]}>{`${date.getDate()}`}</Text>
                </View>);
          }
        }
        return(
          <View
              style={[styles.dayContainer, style.container]}>
              <Text style={[style.text]}>{`${date.getDate()}`}</Text>
            </View>);
      }
      else {
        return(
        <View
            style={[styles.dayContainer, style.container]}>
            <Text style={[style.text]}>{`${date.getDate()}`}</Text>
          </View>);
      }  
      
  }
    // for(let i = 0; workDays.length; i++){
    //   console.log("infinite");
    //   if(workDays[i] === date.toISOString().split('T')[0]){
    //     <View
    //       style={[styles.dayContainer, style.container]}>
    //       <Text style={[style.text,styles.textDay]}>{`${date.getDate()}`}</Text>
    //     </View>
    //   }

  //   <View
  //   style={[styles.dayContainer, style.container]}>
  //   <Text style={[style.text]}>{`${date.getDate()}`}</Text>
  // </View>
    
    // }
  

  const scrollToSelected = () => {
      setJobVisible(true);
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
      <Separator/>  
        <Text
          category='h6'
          style={styles.text}>
          Selected date: {selectedDate.toLocaleDateString()}
        </Text>

        <Calendar2
          ref={componentRef}
          // date={selectedDate}
          // onSelect={nextDate => setSelectedDate(nextDate)}
          // renderDay={DayCell} 
          date={selectedDate}
          onSelect={nextDate => setSelectedDate(nextDate)}
          renderDay={DayCell}
          />
        <Separator/>  
      </View>
      <Modal
        visible={visible}
        >
          <AdminViewJobs start={selectedDate.toISOString().split('T')[0]} end={selectedDate.toISOString().split('T')[0]} setJobVisible={setJobVisible}/>
      </Modal>
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
  textDay: {
    color: '#00F9E4',
  },
});

export default AdminDashboard;
