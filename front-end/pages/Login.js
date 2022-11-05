import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Divider, Input } from "@ui-kitten/components";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import { BASE_URL } from "../config";
import { TOKEN_KEY } from "../config";
import axios from "axios";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Spinner } from '@ui-kitten/components';


const Login = () => {
  //const emailRef = React.useRef();
  //const passwordRef = React.useRef();
  //const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  //emailRef.current.value
  /*
  async () => {
    const response = await axios.post(
      BASE_URL+"/authentication/",{"email":email,"password":password}
    )
    console.log(response)
  }
*/
  return (
    <View style={styles.centered}>
      <Image style={styles.image} source={require("../assets/royal.png")} />
      <Divider />
      <Input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry={seePassword}
        onChangeText={text => setPassword(text)}
      />
      <Button
        onPress={async () => {
          axios.post(BASE_URL + "/authentication/", { "email": email, "password": password })
            .then(res => {
              console.log(res.data)
              
              if (res.data != false) {
                AsyncStorage.setItem('AccessToken', res.data.token);
                console.log(res.data.isAdmin)
                if (res.data.isAdmin) {
                  console.log("Admin")
                  navigation.replace("AdminDashboard")
                }
                else {
                  console.log("Employee")
                  navigation.replace("TechDashboard")
                }
                showMessage({
                  message: "Login Successful",
                  backgroundColor:"green",
                  type: "success",
                });
              }
              else{
                showMessage({
                  message: "Incorrect email or password! Please try again ",
                  backgroundColor:"red",
                  type: "error",
                });
              }
            })
        }}
        style={{ marginTop: 12, alignItems: "center" }}
      >
        Login
      </Button>
      
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
    borderColor: "grey",
  },
  image: {
    width: 300,
    height: 50,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
