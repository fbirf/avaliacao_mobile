import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, FlatList, StyleSheet, View, Text } from 'react-native';
import { userService } from '../services/user.service';

export default function HomePage() {

    const navigation = useNavigation<any>();

    const [users, setUsers] = React.useState<any[]>([]);

    function list(){
        userService.getList().then(data => {
            if (typeof data === 'string') {
                Alert.alert(data);
            } else {
                setUsers(data);
            }
        });
    }

    function deleteUser(id:number){
        userService.remove(id).then(data => {
            if (data) {
                Alert.alert("Excluido com sucesso!");
                list();
            }
        }).catch(error => {
            console.error(error);
            navigation.navigate('Login');
        });
    }

    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <Button title='Permissões' onPress={() => navigation.navigate('UserRole')} />,
            headerRight: () =><Button title='Novo' onPress={() => navigation.navigate('User')} />
        });
        list();
    }, [users]);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Text> {item.username} <Button title='Excluir' onPress={() => deleteUser(item.id)} /><Button title='Editar' onPress={() => navigation.navigate('User',{id:item.id})} /></Text>
                    </View>

                )}
            />
            <Button title='Sair' onPress={() => navigation.navigate('Login')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 40,
        width: 40,
    },
});
