import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { googleapi } from '../googleApi'

const MapPreview = ({ location }) => {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?
        center=${location.latitud},${location.longitud}
        &zoom=13
        &size=800x600
        &maptype=roadmap
        &markers=color:blue%7Clabel:S%7C${location.latitud},${location.longitud}
        &key=${googleapi}`

    return (
        <View style={styles.container}>
            <Image
                source={location.latitud && { uri: imagePreviewUrl }}
                style={styles.image}
            />
        </View>
    )
}

export default MapPreview

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
        backgroundColor: '#ccc',
        borderWidth: 2,
        borderColor: "#cfcfcf"
    }
})