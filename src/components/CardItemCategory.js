import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../globals/colors'
import { useNavigation } from '@react-navigation/native'

const CardItemCategory = ({ item }) => {
    const navigation = useNavigation()

    return (
        <Pressable style={styles.container} onPress={() =>{
            navigation.navigate("ProductsByCategory", { item })
        }}>
            <Text style={styles.text}>{item}</Text>
        </Pressable>
    )
}

export default CardItemCategory

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.crema,
        marginVertical: 5,
        marginHorizontal: 15,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    text: {
        color: colors.brown,
        textTransform: "uppercase",
        width: 300,
        fontFamily: "quicksand_bold"
    }
})