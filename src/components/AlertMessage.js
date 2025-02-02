import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../globals/colors'

const AlertMessage = ({message}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>
    </View>
  )
}

export default AlertMessage

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text:{
        fontFamily: "quicksand_regular",
        color: colors.brown
    }

})