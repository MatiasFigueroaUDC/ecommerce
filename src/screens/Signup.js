import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../globals/colors'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { useNavigation } from '@react-navigation/native'
import { useSignupMutation } from '../services/auth'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/userSlice'
import { signupSchema } from '../validations/signupSchema'
import { deleteSession, insertSession } from '../config/dbSqlite'


const Signup = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [confirmPasswordError, setConfirmPasswordError] = useState()
    const navigation = useNavigation()
    const [triggerSignup] = useSignupMutation()
    const dispatch = useDispatch()

    const onSubmit = async () => {

        try {
            //Validar datos de entrada con Yup 
            signupSchema.validateSync({ email, password, confirmPassword })

            //Si pasa aca limpio los errores porque ninguno tiene
            //TODO: Validar que el usuario no exista
            setPasswordError('')
            setConfirmPasswordError('')
            setEmailError('')

            const result = await triggerSignup({
                email: email,
                password: password
            })

            if (result.error) {
                return
            } else {
                const user = {
                    email: result.data.email,
                    idToken: result.data.idToken,
                    localId: result.data.localId
                }
                dispatch(setUser(user))
                await deleteSession()
                await insertSession(user.localId, user.email, user.idToken)
            }
        } catch (error) {
            switch (error.path) {
                case 'email':
                    setEmailError(error.message)
                    setPasswordError('')
                    setConfirmPasswordError('')
                    break
                case 'password':
                    setPasswordError(error.message)
                    setEmailError('')
                    setConfirmPasswordError('')
                    break
                case 'confirmPassword':
                    setConfirmPasswordError(error.message)
                    setPasswordError('')
                    setEmailError('')
                    break
                default:
                    break
            }
            console.log('Error en try/catch:', error)
        }

    }

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title}>Registrarme</Text>
                <InputForm
                    label="Email"
                    value={email}
                    onChangeText={(t) => setEmail(t)}
                    error={emailError}
                />
                <InputForm
                    label="Password"
                    value={password}
                    onChangeText={(t) => setPassword(t)}
                    isSecure={true}
                    error={passwordError}
                />
                <InputForm
                    label="Confirmar Password"
                    value={confirmPassword}
                    onChangeText={(t) => setConfirmPassword(t)}
                    isSecure={true}
                    error={confirmPasswordError}
                />
                <SubmitButton onPress={onSubmit} title="Crear Cuenta" />
                <Text style={styles.textSmall}>¿Ya tenes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.textSignup}>Iniciar Sesión</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        backgroundColor: "yellow",
        width: "80%",
        padding: 30,
        backgroundColor: "white",
        gap: 18,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontFamily: "quicksand_bold"
    },
    textSmall: {
        fontSize: 12,
        fontFamily: "quicksand_regular"
    },
    textSignup: {
        color: colors.link
    }
})