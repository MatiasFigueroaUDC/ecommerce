import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import Search from '../components/Search'
import CardProduct from '../components/CardProduct'
import { useGetProductsQuery } from '../services/shop'
import LoadingSpinner from '../components/LoadingSpinner'

const ProductsByCategory = ({ route }) => {
  const { item: category } = route.params
  const { data: productsFilteredByCategory,isSuccess,isError,error,isLoading } = useGetProductsQuery(category)
  const [keyword, setKeyword] = useState("")
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (isSuccess) {
      setProducts(Object.values(productsFilteredByCategory))
    }
  }, [isSuccess, productsFilteredByCategory])

  useEffect(() => {
    if (isSuccess) {
      setProducts(Object.values(productsFilteredByCategory).filter(product => product.title.includes(keyword)))
    }
  }, [keyword, isSuccess])

  if(isLoading) return <LoadingSpinner/>

  return (
    <View style={styles.container}>
      <Search onChangeKeyword={(t) => setKeyword(t)} />
      <View style={styles.listContainer}>
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (<CardProduct product={item} />)}
        />
      </View>
    </View>
  )
}

export default ProductsByCategory

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  }
})