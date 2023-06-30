import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { roleService } from '../services/role.service';

export default function UserRolePage() {

    const navigation = useNavigation<any>();
    const [roles, setRoles] = React.useState<any[]>();

    roleService.getList().then(data => {
        if (typeof data === 'string') {
            Alert.alert(data);
        } else {
            setRoles(data);
        }
    });

    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <Button title='Voltar' onPress={() => navigation.goBack()} />,
            headerRight: () => <Button title='Adicionar' onPress={() => navigation.navigate('AddRole')} />
        });
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList
                data={roles}
                renderItem={({ item }) => (
                    <View >
                        <Text>{item.name}</Text>

                    </View>

                )}
            />
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
});
