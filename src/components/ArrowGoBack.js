import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../globals/colors';
import { useNavigation } from '@react-navigation/native';

const ArrowGoBack = () => {
    const navigation = useNavigation()

    return (
        <Pressable style={styles.btnGoBack} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
        </Pressable>
    )
}

export default ArrowGoBack

const styles = StyleSheet.create({
    btnGoBack: {
        position: "absolute",
        left: 15
    }
})