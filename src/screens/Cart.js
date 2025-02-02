import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import cart from '../data/cart.json'
import CardCartProduct from '../components/CardCartProduct'
import { colors } from '../globals/colors'
import { usePostOrderMutation } from '../services/orders'
import { useSelector } from 'react-redux'
import { useDeleteCartMutation, useGetCartQuery } from '../services/cart'
import { useEffect, useState } from 'react'
import AlertMessage from '../components/AlertMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { useNavigation } from '@react-navigation/native'

const Cart = () => {
  const [triggerPost] = usePostOrderMutation()
  const [triggerDeleteCart] = useDeleteCartMutation()
  const localId = useSelector(state => state.user.localId)
  const { data: cart, isLoading } = useGetCartQuery({ localId })
  const [total, setTotal] = useState(0)
  const navigation = useNavigation()

  useEffect(() => {
    if (cart) {
      const totalAcumulated = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
      setTotal(totalAcumulated)
    }
  }, [cart])

  const confirmCart = () => {
    const dateCreated = new Date().toLocaleDateString()
    const order = {
      products: cart,
      createdAt:dateCreated,
      total: total,
    }
    triggerPost({order, localId})
    triggerDeleteCart({localId})
    navigation.navigate("OrdersStack")
  }

  if (isLoading) return <LoadingSpinner />

  if (!cart) {
    return <AlertMessage message="No hay ningún producto en el carrito." />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CardCartProduct product={item} />}
      />
      <View style={styles.containerTotal}>
        <Text style={styles.text}>Total: ${total}</Text>
        <Pressable style={styles.button} onPress={confirmCart}>
          <Text style={styles.textButton}>Finalizar Compra</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingBottom:80
  },
  containerTotal: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: colors.crema,
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: colors.price,
    fontSize: 18,
    fontFamily: "quicksand_bold"
  },
  button: {
    backgroundColor: colors.price,
    padding: 10,
    borderRadius: 5
  },
  textButton: {
    color: colors.white,
    fontFamily: "quicksand_medium"
  },
})