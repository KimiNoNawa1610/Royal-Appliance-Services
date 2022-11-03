import React from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text,
  Alert,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function DashBoard() {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.centered}>
        <Image style={styles.image} source={require("../assets/royal.png")} />
        <View style={styles.space}>
          <View style={styles.press}>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.text}>
                {" "}
                <Image
                  style={styles.icon}
                  source={require("../assets/calendar.png")}
                />
                Calendar{" "}
              </Text>
            </Pressable>
          </View>

          <View style={styles.press}>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.text}>Jobs</Text>
            </Pressable>
          </View>

          <View style={styles.press}>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.text}>Invoices</Text>
            </Pressable>
          </View>

          <View style={styles.press}>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.text}>Paycheck</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  press: {
    elevation: 8,
    backgroundColor: "#393f4d",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    width: 200,
  },
  text: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  space: {
    margin: 50,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
