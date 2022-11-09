import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,Text,
    Alert}
    from 'react-native';
import { Button } from "@ui-kitten/components";

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
        <View style = {styles.centered}>
            <Text style = {{
                color:'black', fontSize:20, padding: 15     
            }}>   Create a New Job</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeCustomerName}
                value={customerName}

                placeholder={"Customer Name"}
                placeholderTextColor={'black'}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeAddress}
                value={address}

                placeholder={"Customer Address"}
                placeholderTextColor={'black'}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePhoneNumber}
                value={phoneNumber}

                placeholder={"Customer Phone Number"}
                placeholderTextColor={'black'}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeNotes}
                value={notes}

                placeholder={"Notes"}
                placeholderTextColor={'black'}
            />
             <TextInput
                style={styles.input}
                onChangeText={onChangeType}
                value={type}

                placeholder={"Brand/Type of Appliance"}
                placeholderTextColor={'black'}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeProblem}
                value={problem}

                placeholder={"Problem with Appliance"}
                placeholderTextColor={'black'}
            />
            <Button
                title={"Assign New Job"}
                style={{ marginTop: 12, alignItems: "center" }}
                onPress = {() =>
                        console.log(customerName + " " 
                        + address + " " + phoneNumber + " " + notes
                        + type + " " + problem)}
            >
 Assign New Job </Button>
    </View>
    )
}

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
        //flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
}
);

export default CreateJob;