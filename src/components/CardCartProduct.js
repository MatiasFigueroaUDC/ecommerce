import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '../globals/colors';
import { useDeleteCartProductMutation } from '../services/cart';
import { useSelector } from 'react-redux';

const CardCartProduct = ({ product }) => {
    const { title, description, price, quantity } = product
    const localId = useSelector(state => state.user.localId)
    const [triggerDeleteItem] = useDeleteCartProductMutation()
    const deleteItemCart = () => {
        triggerDeleteItem({ localId, productId: product.id })
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description} numberOfLines={2}>{description}</Text>
                <View style={styles.containerText}>
                    <Text style={styles.price}>${price} c/u</Text>
                    <Text style={styles.cantidad}>Cantidad: {quantity}</Text>
                </View>
                {quantity > 1 && (
                    <Text style={styles.totalPrice}>Total: ${price * quantity}</Text>
                )}
            </View>
            <Pressable style={styles.button} onPress={deleteItemCart}>
                <FontAwesome name="trash-o" size={24} color={colors.textError} />
            </Pressable>
        </View>
    )
}

export default CardCartProduct

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        margin: 10,
        borderRadius: 10,
        padding: 10,
        gap: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    content: {
        width: "80%",
        gap: 10
    },
    containerText: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#ffd0d0",
        width: 35,
        height: 35,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontFamily: "quicksand_bold",
        fontSize: 16
    },
    description: {
        fontFamily: "quicksand_medium",
    },
    price: {
        fontFamily: "quicksand_bold",
        color: colors.price,
        fontSize: 16
    },
    totalPrice: {
        fontFamily: "quicksand_regular",
        color: colors.secondary,
        fontSize: 14,
        fontStyle: 'italic'
    },
    cantidad: {
        fontFamily: "quicksand_medium"
    }
})