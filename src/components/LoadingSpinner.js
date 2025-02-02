import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../globals/colors'

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={90} color={colors.soft}/>
    </View>
  )
}

export default LoadingSpinner

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})