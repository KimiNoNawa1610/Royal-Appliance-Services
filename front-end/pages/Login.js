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

    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    return (
        <View>
            <Image
                style={styles.image}
                source={require("../assets/royal.png")}
            />

            <TextInput
                style={styles.input}
                onChangeEmail={onChangeEmail}
                value={email}
                keyboardType={"email-address"}
                placeholder={"Email"}
                placeholderTextColor={'#fff'}

            />
            <TextInput
                style={styles.input}
                onChangePassword={onChangePassword}
                value={password}
                placeholder={"Password"}
                placeholderTextColor={'#fff'}
            />
            <Button
                title={"Login"}
                onPress = {() => Alert.alert("PLACEHOLDER: Button Pressed")}
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
        },
        image: {
            width: 300,
            height: 50,
        }
    }
);

export default Login;