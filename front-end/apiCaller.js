import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./config";


export const getJobs = async() => {
    const token1 = await AsyncStorage.getItem("AccessToken");
    try {
      //query a join table at endpoint and then retrieve that data
      const res = await axios.get(BASE_URL + "/get_jobs/1/2022-11-04/2022-11-06/", {
        headers: { token: token1 },
      });
      console.log(res)
      return res.data;
    } catch (err) {
      return err;
    }
  };
