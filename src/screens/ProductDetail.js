import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions, ScrollView } from 'react-native'
import Header from '../components/Header'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '../globals/colors'
import { useGetProductCartQuery, usePostCartMutation, useUpdateProductCartMutation } from '../services/cart';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const ProductDetail = ({ route }) => {
  const { product } = route.params
  const { width } = useWindowDimensions()
  const localId = useSelector(state => state.user.localId)
  const [triggerAddProduct] = usePostCartMutation()
  const [triggerUpdateProduct] = useUpdateProductCartMutation()
  const navigation = useNavigation()
  const {data:productCart} = useGetProductCartQuery({localId, productId:product.id}) //Para saber si el producto esta en el carrito.

  const titleStyles = {
    ...styles.title,
    fontSize: width > 500 ? 22 : 18
  }

  const descriptionStyles = {
    ...styles.description,
    fontSize: width > 500 ? 18 : 15
  }

  const ratingStyles = {
    ...styles.rating,
    fontSize: width > 500 ? 16 : 14
  }

  const priceStyles = {
    ...styles.price,
    fontSize: width > 500 ? 35 : 29
  }

  const handleAddProduct = async () => {
    if (productCart) {
      // Si el producto ya existe, actualizar cantidad
      const updatedProduct = {
        ...productCart,
        quantity: productCart.quantity + 1,
      }
      await triggerUpdateProduct({
        localId,
        cartProduct: updatedProduct
      })
    } else {
      // Si no existe, crear nuevo
      const cartProduct = { 
        ...product, 
        quantity: 1,
        total: product.price
      }
      await triggerAddProduct({ localId, cartProduct })
    }
    navigation.navigate("CartStack")
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
        />
        <View style={styles.containerInfo}>
          <Text style={titleStyles}>{product.title}</Text>
          <Text style={ratingStyles}><AntDesign name="star" size={14} color={colors.star} /> {product.rating}</Text>
          <Text style={priceStyles}>${product.price}</Text>
          <Text style={descriptionStyles} numberOfLines={3}>{product.description}</Text>
        </View>
        <Pressable style={styles.button} onPress={handleAddProduct}>
          <Text style={styles.buttonText}><FontAwesome name="shopping-cart" size={24} color="#ffffff" /> Agregar al carrito</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, 
  },
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: 10,
    marginBottom: 16
  },
  containerInfo: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10
  },
  title: {
    fontWeight: '600',
    textTransform: "uppercase",
    fontFamily: "quicksand_bold"
  },
  description: {
    fontFamily: "quicksand_regular",
    marginTop: 20
  },
  price: {
    fontWeight: '400',
    color: colors.price,
  },
  rating: {
    fontFamily: "quicksand_medium"
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.price,
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "quicksand_regular"
  }
})