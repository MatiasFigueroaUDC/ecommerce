import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import SubmitButton from '../components/SubmitButton'
import { useNavigation } from '@react-navigation/native'
import { useGetUserQuery } from '../services/user'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../components/LoadingSpinner'
import { colors } from '../globals/colors'
// clase 16/01 - Device Features: SQLite MIN 00:57:34
const MyProfile = () => {
    const navigation = useNavigation()
    const localId = useSelector(state => state.user.localId)
    const { data: user, isLoading } = useGetUserQuery(localId)

    if (isLoading) return <LoadingSpinner />

    return (
        <View style={styles.container}>
            <View style={styles.containerProfileImage}>
                <Image
                    source={user?.image ? { uri: user.image } : require('../../assets/profile_default.png')}
                    resizeMode='cover'
                    style={styles.image}

                />
                <SubmitButton title="Agregar foto de perfil" onPress={() => navigation.navigate("ImageSelector")} />
            </View>
            <View style={styles.containerInfo}>
                <Text style={styles.address}>Dirección</Text>
                <Text style={styles.address}>{user?.address}</Text>
                <SubmitButton title="Agregar localizacion" onPress={() => navigation.navigate("LocationSelector")} />
            </View>
        </View>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 20
    },
    containerProfileImage:{
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: "white",
        width: "90%"
    },
    containerInfo: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: "white",
        width: "90%",
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: "white"
    },
    address: {
        fontFamily: "quicksand_medium",
        textAlign: "center"
    }
})