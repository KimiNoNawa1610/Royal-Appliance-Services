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
                color:'white'      
            }}
            > 
            Create a New Job
            </h1>
            <TextInput
                style={styles.input}
                onChangeText={onChangeCustomerName}
                value={customerName}

                placeholder={"Customer Name"}
                placeholderTextColor={'#fff'}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeAddress}
                value={address}

                placeholder={"Customer Address"}
                placeholderTextColor={'#fff'}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePhoneNumber}
                value={phoneNumber}

                placeholder={"Customer Phone Number"}
                placeholderTextColor={'#fff'}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeNotes}
                value={notes}

                placeholder={"Notes"}
                placeholderTextColor={'#fff'}
            />
             <TextInput
                style={styles.input}
                onChangeText={onChangeType}
                value={type}

                placeholder={"Brand/Type of Appliance"}
                placeholderTextColor={'#fff'}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeProblem}
                value={problem}

                placeholder={"Problem with Appliance"}
                placeholderTextColor={'#fff'}
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

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderColor: '#fff',
        color: '#fff',
    },
    image: {
        width: 300,
        height: 50,
    }
}
);

export default CreateJob;