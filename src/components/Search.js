import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../globals/colors';
import { useState } from 'react';

const Search = ({ onChangeKeyword }) => {
    const [textInput, setTextInput] = useState("")
    const [error, setError] = useState("")

    const search = () => {
        const regex = /[+\-*/%@#&]/
        if (regex.test(textInput)) {
            return setError("Caracter no valido.")
        }
        setError("")
        onChangeKeyword(textInput)
    }

    const removeSearch = () => {
        onChangeKeyword("")
        setTextInput("")
        setError("")
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={textInput}
                        onChangeText={(text) => setTextInput(text)}
                        placeholder='Buscar'
                        placeholderTextColor={colors.brown}
                    />
                    <View style={styles.buttonsContainer}>
                        <Pressable style={styles.button} onPress={search}>
                            <EvilIcons name="search" size={30} color={colors.black} />
                        </Pressable>
                        <Pressable style={styles.button} onPress={removeSearch}>
                            <AntDesign name="close" size={30} color={colors.black} />
                        </Pressable>
                    </View>
                </View>
                <Text style={styles.error}>{error ? error : ""}</Text>
            </View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    searchContainer: {
        gap: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: colors.crema,
        borderRadius: 4,
        paddingHorizontal: 10,
        height: 40,
    },
    button: {
        padding: 5,
    },
    error: {
        color: colors.textError,
        fontWeight: '500',
        marginLeft: 10
    }
})