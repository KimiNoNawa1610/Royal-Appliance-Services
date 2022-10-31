import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Pressable,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const navigation = useNavigation();

  return (
    <View style={styles.centered}>
      <Image style={styles.image} source={require("../assets/royal.png")} />

      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        keyboardType={"email-address"}
        placeholder={"Email"}
        placeholderTextColor={"grey"}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={true}
        placeholder={"Password"}
        placeholderTextColor={"grey"}
      />
      <View style={{ alignItems: "center" }}>
        <Pressable
          style={styles.button}
          //onPress={() => console.log(email + " " + password)}
          onPress = {()=>navigation.navigate("TechDashboard")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#fff",
    color: "#fff",
    borderColor:"#d3d3d3"
  },
  image: {
    width: 300,
    height: 50,
  },
  button: {
    width: 60,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#393f4d",
    elevation: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:  "#ffbf00",
  },
});

export default Login;
