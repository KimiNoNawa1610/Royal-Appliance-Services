import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, ScrollView, Modal} from "react-native";
import { Button, Layout, Icon, Text, List, ListItem, Divider, Calendar as Calendar2} from "@ui-kitten/components";
import AdminViewJobs from "../components/AdminViewJobs";
import axios from "axios";
//import { ScrollView } from "react-native-gesture-handler";



const Separator = () => (
  <View style={styles.separator} />
);

const AdminDashboard = () => {
  const navigation = useNavigation();
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [ selectedDate, setSelectedDate ] = React.useState(date);
  const componentRef = React.createRef();
  const [visible, setJobVisible] = useState(false);
  const [workDays, setWorkDays] = useState([]);
  

  useEffect(() => {
    const getAllJobs = async () => {
      const token1 = await AsyncStorage.getItem("AccessToken");
      axios
          .get(BASE_URL + "/get_all_jobs_withoutdate", {
            headers: { token: token1 },
          })
          .then((res) => {
              let dayList = []
              for (let i = 0; i < res.data.length; i++){
                    let obj = res.data[i];
                    let value = obj["dateStart"];
                    dayList.push(new Date(value).toISOString().split('T')[0]);
                  }
                  dayList = dayList.sort(function(a, b) { return (a).localeCompare(b); });
                  setWorkDays((prev) => dayList)
                  console.log("START " +workDays)
          })
          .catch((err) => console.log(err));
      }
      getAllJobs();
      }, []);  
  
    const DayCell = ({ date }, style) => {

        if((workDays.find( workDay =>  date.toISOString().split('T')[0] === workDay) !== undefined)){
                return(
                    <View
                        style={[styles.dayContainer, style.container]}>
                        <View style={{backgroundColor: "rgba(194,194,194,0.33)", borderRadius: 10, borderWidth: 1, padding: 5, minWidth: 24}}>
                            <Text style={[style.text,styles.textDay]}>{`${date.getDate()}`}</Text>
                        </View>
                    </View>
                );
        } else {
            return(
                <View style={[styles.dayContainer, style.container]}>
                     <Text style={[style.text]}>{`${date.getDate()}`}</Text>
                </View>);
        }




        // if(workDays.length !== 0){
        //   for (let workDay of workDays){
        //     if(date.toISOString().split('T')[0] === workDay){
        //       return(
        //         <View
        //           style={[styles.dayContainer, style.container]}>
        //             <View style={{backgroundColor: "rgba(194,194,194,0.33)", borderRadius: 10, borderWidth: 1, padding: 5,}}>
        //                 <Text style={[style.text,styles.textDay]}>{`${date.getDate()}`}</Text>
        //             </View>
        //         </View>
        //       );
        //     }
        //   }
        // }
        // return(
        // <View
        //   style={[styles.dayContainer, style.container]}>
        //   <Text style={[style.text]}>{`${date.getDate()}`}</Text>
        // </View>);
    }
  
  const scrollToSelected = () => {
       setJobVisible(true);
      //navigation.navigate("ViewJobs")
  };

  const scrollToToday = () => {
    if (componentRef.current) {
      componentRef.current.scrollToToday();
    }
  };

  const handleAddJob = () => {
    navigation.navigate("Create Job")
  };

  return (
    <Layout 
      status="success" 
      style={styles.container} 
      level='1'
      >
      
      <Button status="success" style={styles.topButton1} onPress={scrollToToday}>Scroll to Today</Button>
      <Button status="success" style={styles.topButton2} onPress={scrollToSelected}>View Selected Date</Button>

      <View style={styles.calendarContainer}>
      <Separator/>  
        <Text
          category='h6'
          style={styles.text}>
          Selected date: {selectedDate.toLocaleDateString()}
        </Text>

        <Calendar2
          status="success"
          ref={componentRef}
          date={selectedDate}
          onSelect={nextDate => setSelectedDate((prev) => nextDate)}
          renderDay={DayCell}
          />
        <Separator/>  
        <Button
          style={{
            top: 5,
            marginLeft: "auto",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.4,
            shadowRadius: 25,
            elevation: 5,
          }}
          size="large"
          status={"success"}
          onPress={handleAddJob}
          accessoryRight={<Icon name={"briefcase-outline"} />}
        />
      </View>

      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        centered
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
    justifyContent: "center",
    flex: 1,
  },
  calendarContainer: {
    margin: 2,
  },
  separator: {
    marginVertical: 4,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
      padding: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  textDay: {
      alignItems: 'center',
      color: '#000000',
  },
});

export default AdminDashboard;
