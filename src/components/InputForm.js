import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { colors } from '../globals/colors'


const InputForm = ({ label, value, onChangeText, isSecure, error }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <TextInput 
                value={value} 
                onChangeText={onChangeText}
                style={styles.input} 
                secureTextEntry={isSecure} 
            />
            {error ? <View><Text style={styles.error}>{error}</Text></View> : null}
        </View>
    )
}

export default InputForm

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    text: {
        fontFamily: "quicksand_regular",
        color: "gray"
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.black,
        borderRadius: 10,
        fontFamily: "quicksand_medium",
        fontSize: 13
    },
    error:{
        color: colors.textError,
        paddingLeft: 5
    }
})