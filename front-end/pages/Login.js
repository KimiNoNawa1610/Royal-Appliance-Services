import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Divider, Input } from "@ui-kitten/components";

const Login = () => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const navigation = useNavigation();

  //emailRef.current.value

  return (
    <View style={styles.centered}>
      <Image style={styles.image} source={require("../assets/royal.png")} />
      <Divider />
      <Input
        style={styles.input}
        ref={emailRef}
        keyboardType={"email-address"}
        placeholder={"Email"}
        placeholderTextColor={"grey"}
      />
      <Input
        style={styles.input}
        ref={passwordRef}
        secureTextEntry={true}
        placeholder={"Password"}
        placeholderTextColor={"grey"}
      />
      <Button
        onPress={() => navigation.navigate(`TechDashboard`)}
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
