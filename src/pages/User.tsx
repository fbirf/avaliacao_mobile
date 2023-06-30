import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Button, Dimensions, TextInput, StyleSheet, Text, View, Alert, Switch, FlatList } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { userService } from '../services/user.service';
import { roleService } from '../services/role.service';

export default function UserPage() {

    const navigation = useNavigation<any>();

    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPass, setConfirmPass] = React.useState('');
    const [idUser, setIdUser] = React.useState(0);
    const [roles, setRoles] = React.useState<any[]>();
    const [userRoles, setUserRoles] = React.useState<any[]>();
    const route = useRoute();
    let selectRoles: string[] = [];

    function addRole(role: string) {
        if (selectRoles.includes(role)) {
            return;
        }
        selectRoles.push(role);
    }

    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <Button title='Voltar' onPress={() => navigation.navigate('Home')} />
        });

        if (route.params) {
            const { id }: any = route.params
            setIdUser(id);
        }

        roleService.getList().then(data => {
            if (typeof data === 'string') {
                Alert.alert(data);
            } else {
                setRoles(data);
            }
        });

        if (idUser > 0) {
            userService.getById(idUser).then((user) => {
                if (user) {
                    setName(user.name);
                    setUsername(user.username);
                    setUserRoles(user.roles);
                }
            }).catch(error => {
                console.error(error);
                navigation.navigate('Home');
            });
        }
    }, [idUser]);

    function save() {

        if (!name || name.trim() === '') {
            Alert.alert('O Nome é obrigatório!');
            return;
        }
        if (!username || username.trim() === '') {
            Alert.alert('O Login é obrigatório!');
            return;
        }
        if (!password || password.trim() === '') {
            Alert.alert('A Senha é obrigatório!');
            return;
        }
        if (password !== confirmPass) {
            Alert.alert('A Senha não confere!');
            return;
        }

        if (idUser > 0) {
            userService.update(idUser, name, username, password, selectRoles).then(data => {
                Alert.alert(selectRoles.length + "")
                if (data.id) {
                    navigation.navigate('Home');
                } else {
                    Alert.alert(data.message);
                }
            }).catch(error => {
                console.error(error);
                navigation.navigate('Login');
            });
        } else {
            userService.create(name, username, password, selectRoles).then(data => {
                if (data.id) {
                    navigation.navigate('Home');
                } else {
                    Alert.alert(data.message);
                }
            }).catch(error => {
                console.error(error);
                navigation.navigate('Login');
            });
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput style={styles.input} onChangeText={setName} value={name} />

            <Text style={styles.label}>Login:</Text>
            <TextInput style={styles.input} onChangeText={setUsername} value={username} />

            <Text style={styles.label}>Senha:</Text>
            <TextInput style={styles.input} onChangeText={setPassword} secureTextEntry />

            <Text style={styles.label}>Confirmar Senha:</Text>
            <TextInput style={styles.input} onChangeText={setConfirmPass} secureTextEntry />
            <Text style={styles.label}>Permissões:</Text>

            <FlatList
                data={roles}
                renderItem={({ item }) => (
                    <View key={item.id} >
                        <BouncyCheckbox
                            text={item.description}
                            isChecked={userRoles?.includes(item.name)}
                            onPress={() => { addRole(item.name) }}
                        />
                    </View>
                )}
            />

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