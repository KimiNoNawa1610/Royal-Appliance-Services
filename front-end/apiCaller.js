import axios from "axios";

export const getJobs = async(supportCredentials) => {
    try {
      //query a join table at endpoint and then retrieve that data
      const res = await axios.get("/get_jobs/1/2022-11-04/2022-11-06", supportCredentials, {timeout: 10000});
      console.log(res)
      return res.data;
    } catch (err) {
      return err;
    }
  };

  
// export const loginCall = async (userCredential, dispatch) => {
//     dispatch({ type: "LOGIN_START" });
//     try {
//       const res = await axios.post("/auth/login", userCredential);
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE", payload: err });
//       alert("Invalid email and/or password. Try again.");
//     }
//   };