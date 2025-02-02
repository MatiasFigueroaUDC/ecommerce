import { StyleSheet, Text, View } from 'react-native'

const ShadowCard = ({children, style}) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  )
}

export default ShadowCard

const styles = StyleSheet.create({
    container:{
        elevation:3
    }
})