import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubmitButton from '../components/SubmitButton'
import MapPreview from '../components/MapPreview'
//npm i expo-location
import * as Location from 'expo-location'
import { googleapi } from '../googleApi'
import { useSelector } from 'react-redux'
import { usePatchLocationMutation } from '../services/user'
import { useNavigation } from '@react-navigation/native'

const LocationSelector = () => {
    const [address, setAddress] = useState("")
    const [location, setLocation] = useState({ latitud: 0, longitud: 0 })
    const localId = useSelector(state => state.user.localId)
    const [triggerPatchLocation] = usePatchLocationMutation()
    const navigation = useNavigation()


    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                console.log('Permiso denegado')
                return
            }
            const requestLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
            setLocation({ latitud: requestLocation.coords.latitude, longitud: requestLocation.coords.longitude })
            
        })()
    }, [])

    useEffect(() => {
        (async () => {
            if(location.latitud !== 0 && location.longitud !== 0){
                const urlReverseGeocoding = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitud},${location.longitud}&key=${googleapi}`    
                const response = await fetch(urlReverseGeocoding)
                const data = await response.json()
                setAddress(data.results[0].formatted_address)
            }
        })()
    }, [location])

    const handleLocation = () => {
        triggerPatchLocation({
            localId,
            location,
            address
        })
        navigation.navigate('MyProfile')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.address}>{address}</Text>
            <MapPreview location={location} />
            <SubmitButton title="Confirmar Ubicacion" onPress={handleLocation} />
        </View>
    )
}

export default LocationSelector

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 20,
        padding: 20,
        gap: 10,
        backgroundColor: "white",
        borderRadius: 10,
    },
    address: {
        fontFamily: "quicksand_medium"
    }
})