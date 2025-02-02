import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../globals/colors'

const SubmitButton = ({title, onPress}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 10,
        borderRadius: 7
    },
    text:{
        fontFamily: "quicksand_medium",
        color: "white",
        textAlign: "center"
    }
})