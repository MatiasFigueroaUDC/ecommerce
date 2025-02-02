import { StyleSheet, Text, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import { colors } from '../globals/colors';

const TabBarIcon = ({text, icon, focused}) => {
  return (
    <View style={styles.container}>
      <Entypo 
        name={icon} 
        size={24} 
        color={focused ? colors.link : colors.secondary} 
      />
      <Text style={[
        styles.text,
        {color: focused ? colors.link : colors.secondary}
      ]}>
        {text}
      </Text>
    </View>
  )
}

export default TabBarIcon

const styles = StyleSheet.create({
    container:{
        width: 60,
        alignItems: "center",
    },
    text:{
      fontSize: 12
    }
})