import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Dimensions, TextInput, StyleSheet, Text, View, Alert } from "react-native";

import { authService } from '../services/auth.service';

export default function LoginPage() {

    const navigation = useNavigation<any>();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    function signIn() {

        authService.login(username, password).then(logged => {
            if (logged) {
                navigation.navigate('Home');
            } else {
                Alert.alert('Login/senha inválido(a)!');
            }
        });
    }

    return (
        <View style={styles.container}>        
            <Text style={styles.label}>Login:</Text>
            <TextInput style={styles.input} onChangeText={setUsername} />
            
            <Text style={styles.label}>Senha:</Text>
            <TextInput style={styles.input} onChangeText={setPassword} secureTextEntry />

            <View style={styles.button}>
                <Button title="Entrar" onPress={signIn} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 5,
        width: Dimensions.get('screen').width - 40,
    },
    input: {
        padding: 5,
        height: 40,
        fontSize: 22,
        borderWidth: 1,
        borderRadius: 4,
        width: Dimensions.get('screen').width - 40,
    },
    button: {
        marginTop: 40,
        width: Dimensions.get('screen').width - 40,
    },
});