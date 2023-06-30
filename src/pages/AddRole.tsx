import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Dimensions, StyleSheet, Text, View, Alert,TextInput } from "react-native";
import { userService } from '../services/user.service';
import { roleService } from '../services/role.service';

export default function AddRolePage() {

    const navigation = useNavigation<any>();
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <Button title='Voltar' onPress={() => navigation.goBack()} />
        });
    }, []);

    function save() {

        if (!name || name.trim() === '') {
            Alert.alert('O Nome é obrigatório!');
            return;
        }
        if (!description || description.trim() === '') {
            Alert.alert('O descrição é obrigatório!');
            return;
        }

        roleService.create(name,description).then(data => {
            if (data) {
                navigation.navigate('UserRole');
            } else {
                Alert.alert(data.message);
            }
        }).catch(error => {
            console.error(error);
            navigation.navigate('Login');
        });

    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput style={styles.input} onChangeText={setName} />

            <Text style={styles.label}>Descrição:</Text>
            <TextInput style={styles.input} onChangeText={setDescription} />

            <View style={styles.button}>
                <Button title="Salvar" onPress={save} />
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