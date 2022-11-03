import React from 'react';
import {
    Button,
    StyleSheet,
    TextInput,
    View,
    Alert}
    from 'react-native'; 
import { useNavigation } from "@react-navigation/native";

const EmployeeGenerator = () => {

    const navigation = useNavigation();
    //autogen email and password?
    const [employeeName, onChangeEmployeeName] = React.useState(null);
    const [employeePassword, onChangeEmployeePassword] = React.useState(null);

    return (
    <View style={styles.centered}>  
        <View>
            
            <h1
            style = {{
                color:'black'      
            }}
            > 
            Generate Employee Account
            </h1>
            
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmployeeName}
                value={employeeName}

                placeholder={"Employee Name"}
                placeholderTextColor={'#000'}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmployeePassword}
                value={employeePassword}

                placeholder={"Password"}
                placeholderTextColor={'#000'}
            />
            </View>
            <Button
                style={styles.btn}
                title={"Create Employee Account"}
                onPress = {() =>
                        navigation.navigate("Login")}
                        // console.log(employeeName + employeePassword)}
            />
            </View>  
        
         
    )
}

// const styles = StyleSheet.create({
//     input: {
//         height: 40,
//         margin: 10,
//         borderWidth: 1,
//         padding: 10,
//         borderColor: '#000',
//         color: '#000',
//     },
//     image: {
//         width: 300,
//         height: 50,
//     }
// }
// );

const styles = StyleSheet.create({
    input: {
      height: 50,
      margin: 10,
      borderWidth: 1,
      padding: 10,
      borderColor: "#000",
      color: "#000",
    },
    btn: {
      height: 50,
      //borderWidth: 1,
    },
    image: {
      width: 300,
      height: 50,
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }

  });

export default EmployeeGenerator;