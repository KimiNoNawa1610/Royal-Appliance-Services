import React from 'react';
import {
    Button,
    StyleSheet,
    TextInput,
    View,
    Alert, Image
}
from 'react-native';


const Login = () => {

    const [email, onChangeEmail] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);

    return (
        <View>
            <Image
                style={styles.image}
                source={require("../assets/royal.png")}
            />

            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}

                keyboardType={"email-address"}
                placeholder={"Email"}
                placeholderTextColor={'#fff'}

            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}

                placeholder={"Password"}
                placeholderTextColor={'#fff'}
            />
            <Button
                title={"Login"}
                onPress = {() =>
                        console.log(email + " " + password)}
            />
        </View>
    )

}

const styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 12,
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

export default Login;