import { StyleSheet, View, FlatList } from 'react-native'
import CardOrder from '../components/CardOrder'
import { useGetOrdersQuery } from '../services/orders'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../components/LoadingSpinner'
import AlertMessage from '../components/AlertMessage'

const Orders = () => {
  const localId = useSelector(state => state.user.localId)
  const {data:orders, isLoading} = useGetOrdersQuery({localId})

  if (isLoading) return <LoadingSpinner />

  if (!orders) {
    return <AlertMessage message="No hay ninguna orden." />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({item}) => <CardOrder order={item}/>}
      />
    </View>
  )
}

export default Orders

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
})