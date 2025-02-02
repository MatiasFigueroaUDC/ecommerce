import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../globals/colors'
import { useNavigation } from '@react-navigation/native';

const CardProduct = ({ product }) => {
    const { title, price, stock, rating, description, thumbnail } = product
    const { width } = useWindowDimensions()
    const navigation = useNavigation()

    const titleStyles = {
        ...styles.title,
        fontSize: width > 500 ? 18 : 14
    }

    const descriptionStyles = {
        ...styles.description,
        fontSize: width > 500 ? 16 : 13
    }
    
    const ratingStyles = {
        ...styles.rating,
        fontSize: width > 500 ? 16 : 14
    }

    const priceStyles = {
        ...styles.price,
        fontSize: width > 500 ? 29 : 24
    }

    return (
        <Pressable 
            style={({ pressed }) => [
                styles.container,
                { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => navigation.navigate("ProductDetail", {product})}
            android_ripple={{ color: '#d8d8d8' }}
        >
            <View style={styles.containerImage}>
                <Image style={styles.image} source={{ uri: thumbnail }} />
            </View>
            <View style={styles.containerText}>
                <Text style={titleStyles} numberOfLines={1}>{title}</Text>
                <Text style={descriptionStyles} numberOfLines={3}>{description}</Text>
                <Text style={ratingStyles} numberOfLines={1}>
                    <AntDesign name="star" size={14} color={colors.star} />{rating}
                </Text>
                <Text style={priceStyles}>${price}</Text>
            </View>
        </Pressable>
    )
}

export default CardProduct

const styles = StyleSheet.create({
    containerImage:{
        borderRightWidth: 1,
        borderRightColor: "#d8d8d8"
    },  
    image: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        minWidth: 150,
        minHeight: 150,
        width: "20vw",
        height: "20vw"
    },
    container: {
        flexDirection: "row",
        backgroundColor: "white",
        margin: 10,
        borderRadius: 10,
        padding: 0,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#d8d8d8",
        elevation: 8,
    },
    containerText: {
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        justifyContent: "space-evenly",
    },
    title: {
        fontWeight: '600',
        textTransform: "uppercase",
        fontFamily: "quicksand_bold"
    },
    description: {
        fontFamily: "quicksand_regular"
    },
    price: {
        fontWeight: '400',
        color: colors.price,
        backgroundColor: "#ffffff",
    },
    rating:{
        fontFamily: "quicksand_medium"
    }
})