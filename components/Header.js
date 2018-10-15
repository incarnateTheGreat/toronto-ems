import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class Header extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Toronto EMS Reports</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#064e80',
        padding: 10
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 26
    }
})