import { StyleSheet, FlatList, View, Text } from 'react-native'
import CardItemCategory from './CardItemCategory'
import { useGetCategoriesQuery } from '../services/shop'
import LoadingSpinner from './LoadingSpinner'


const Categories = () => {
    const {data:categories, isError, error, isSuccess, isLoading} = useGetCategoriesQuery()
    
    if(isLoading) return <LoadingSpinner/>
    if(isError) return <View><Text>ERROR!!</Text></View>

    return (
        <FlatList
            data={categories}
            keyExtractor={item => item}
            renderItem={({ item }) => <CardItemCategory item={item} />}
            contentContainerStyle={styles.containerCard}
        />
    )
}

export default Categories

const styles = StyleSheet.create({
    containerCard:{
        paddingBottom: 150
    }
})