import { StyleSheet, Text, View } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import { colors } from '../globals/colors';

const CardOrder = ({ order }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.fecha}>Creado: {order.createdAt}</Text>
                <View style={styles.containerInfo}>
                    <Text style={styles.total}>Total: ${order.total}</Text>
                    <Text style={styles.products}>Productos: {order.products.length}</Text>
                </View>
            </View>
        </View>
    )
}

export default CardOrder

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "white",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        justifyContent: "space-between",
        alignItems: "center"
    },
    content: {
        gap: 10
    },
    total: {
        fontFamily: "quicksand_bold",
        color: colors.price
    },
    fecha: {
        fontFamily: "quicksand_medium",
    },
    containerInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 350
    },
    products: {
        fontFamily: "quicksand_regular",
    }
})