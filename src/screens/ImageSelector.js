//npx expo install expo-image-picker
import { Image, StyleSheet, Text, View } from 'react-native'
import SubmitButton from '../components/SubmitButton'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { usePatchImageProfileMutation } from '../services/user'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const ImageSelector = () => {
    const [image, setImage] = useState("")
    const [triggerAddImageProfile] = usePatchImageProfileMutation()
    const localId = useSelector(state => state.user.localId)
    const navigation = useNavigation()

    const pickImage = async (method) => {
        const config = {
            aspect: [1, 1],
            quality: 0.2,
            base64: true,
            allowsEditing: true
        }
        if (method === 'camera') {
            const { granted } = await ImagePicker.requestCameraPermissionsAsync()
            if (granted) {
                const result = await ImagePicker.launchCameraAsync(config)
                if (!result.cancelled) {
                    setImage("data:image/jpg;base64," + result.assets[0].base64) //Este formato es neceserio para subir la imagen cuando esta en base64
                }
            } else return
        } else {
            const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (granted) {
                const result = await ImagePicker.launchImageLibraryAsync(config)
                if (!result.cancelled) {
                    setImage("data:image/jpg;base64," + result.assets[0].base64) //Este formato es neceserio para subir la imagen cuando esta en base64
                }
            } else return
        }
    }

    const confirmImage = async () => {
        try {
            const result = await triggerAddImageProfile({
                localId,
                image
            }).unwrap()
            navigation.navigate('MyProfile')
        } catch (error) {
            console.log('Error al guardar la imagen:', error)
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={image ? { uri: image } : require('../../assets/profile_default.png')}
                resizeMode='cover'
                style={styles.image}
            />
            <SubmitButton title="Tomar Foto" onPress={() => pickImage("camera")} />
            <SubmitButton title="Seleccionar desde Galeria" onPress={() => pickImage()} />
            {image && <SubmitButton title="Confirmar imagen" onPress={confirmImage} />}
        </View>
    )
}

export default ImageSelector

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
})