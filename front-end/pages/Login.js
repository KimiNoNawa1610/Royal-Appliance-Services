import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Pressable,
  Text,
} from "react-native";

const Login = () => {
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  return (
    <View>
      <Image style={styles.image} source={require("../assets/royal.png")} />

      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        keyboardType={"email-address"}
        placeholder={"Email"}
        placeholderTextColor={"#fff"}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={true}
        placeholder={"Password"}
        placeholderTextColor={"#fff"}
      />
      <View style={{ alignItems: "center" }}>
        <Pressable
          style={styles.button}
          onPress={() => console.log(email + " " + password)}
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
  },
  image: {
    width: 300,
    height: 50,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "royalblue",
    elevation: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
});

export default Login;
