import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet,  View} from "react-native";
import { Button, Layout, Icon, Text, Calendar as Calendar2, Modal } from "@ui-kitten/components";
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
  const [blur, setBlur] = useState(false);

  //Retrieve all jobs to mark on the calendar WIP
  useEffect(() => {
    const getAllJobs = async () => {
      const token1 = await AsyncStorage.getItem("AccessToken");
      axios
          .get(BASE_URL + "/get_all_jobs_withoutdate", {
            headers: { token: token1 },
          })
          .then((res) => {
              let dayList = []
              for (var i = 0; i < res.data.length; i++){
                    var obj = res.data[i];
                    var value = obj["dateStart"];
                    dayList.push(new Date(value).toISOString().split('T')[0]);
                  }
                  dayList = dayList.sort(function(a, b) { return (a).localeCompare(b); });
                  setWorkDays(dayList)
                  console.log("START " +workDays)
          })
          .catch((err) => console.log(err));
      }
      getAllJobs();
      }, []);  
  
    const DayCell = ({ date }, style) => {
      let dynamic = workDays.map((x) => x);
        if(dynamic.length != 0){
          for (var i = 0; i < dynamic.length; i++){
            if(date.toISOString().split('T')[0] === dynamic[i]){
              dynamic.shift(dynamic.indexOf(i), 1);
              return(
                <View
                  style={[styles.dayContainer, style.container]}>
                  <Text style={[style.text,styles.textDay]}>{`${date.getDate()}`}</Text>
                </View>
              );
            }
          }
        }
        return( 
        <View
          style={[styles.dayContainer, style.container]}>
          <Text style={[style.text]}>{`${date.getDate()}`}</Text>
        </View>);
    }
  
  const scrollToSelected = () => {
      setJobVisible(true);
  };

  const scrollToToday = () => {
    if (componentRef.current) {
      componentRef.current.scrollToToday();
    }
  };

  const handleAddJob = () => {
    //setAddJobVisible(true);
    navigation.navigate("Create Job")
  };

  return (
    <Layout 
      status="success" 
      style={styles.container} 
      level='1'
      >
      <Button status="success" style={styles.topButton1} onPress={scrollToToday}>Scroll to Today</Button>
      {/* this opens a modal that shows info */}
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
          onSelect={nextDate => setSelectedDate(nextDate)}
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
        backdropStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
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
