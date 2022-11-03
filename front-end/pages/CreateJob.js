import React from 'react';
import {
    Button,
    StyleSheet,
    TextInput,
    View,
    Alert}
    from 'react-native';

const CreateJob = () => {

    // const [email, onChangeEmail] = React.useState(null);
    // const [password, onChangePassword] = React.useState(null);

    //syntax: textValue var and useState var?
    const [customerName, onChangeCustomerName] = React.useState(null);
    const [address, onChangeAddress] = React.useState(null);
    const [phoneNumber, onChangePhoneNumber] = React.useState(null);
    const [notes, onChangeNotes] = React.useState(null);
    const [type, onChangeType] = React.useState(null);
    const [problem, onChangeProblem] = React.useState(null);

    return (
        <View>
            <h1
            style = {{
                color:'black'      
            }}
            > 
            Create a New Job
            </h1>
            <TextInput
                style={styles.input}
                onChangeText={onChangeCustomerName}
                value={customerName}

                placeholder={"Customer Name"}
                placeholderTextColor={'#000'}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeAddress}
                value={address}

                placeholder={"Customer Address"}
                placeholderTextColor={'#000'}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePhoneNumber}
                value={phoneNumber}

                placeholder={"Customer Phone Number"}
                placeholderTextColor={'#000'}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeNotes}
                value={notes}

                placeholder={"Notes"}
                placeholderTextColor={'#000'}
            />
             <TextInput
                style={styles.input}
                onChangeText={onChangeType}
                value={type}

                placeholder={"Brand/Type of Appliance"}
                placeholderTextColor={'#000'}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeProblem}
                value={problem}

                placeholder={"Problem with Appliance"}
                placeholderTextColor={'#000'}
            />
            <Button
                title={"Create Job"}
                onPress = {() =>
                        console.log(customerName + " " 
                        + address + " " + phoneNumber + " " + notes
                        + type + " " + problem)}
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
    press:{
    elevation: 8,
    backgroundColor: "#393f4d",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    width: 200

    },
    text:{
        fontSize: 18,
        color: "#fff",
        alignSelf: "center",
        textTransform: "uppercase",
    },
    space:{
        margin:50,
    },
    icon:{
        width: 20,
        height: 20,
    }

  });

export default CreateJob;