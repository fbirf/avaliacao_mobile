import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';

type Props = { user: any }

export default function ItemView(props: Props) {
    const { user } = props;

    const navigation = useNavigation<any>();

    return (
        <View style={styles.itemView} onTouchEnd={() => navigation.navigate('User') }>
            <Text>{user.id} - {user.name} - {user.username}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    itemView: {
        padding: 10,
        borderColor: 'gray',
        borderBottomWidth: 1,
        width: Dimensions.get('screen').width,
    },
});