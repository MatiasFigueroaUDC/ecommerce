import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { colors } from '../globals/colors'
import { useNavigation } from '@react-navigation/native'
import { useLoginMutation } from '../services/auth'
import { setUser } from '../features/userSlice'
import { useDispatch } from 'react-redux'
import { loginSchema } from '../validations/loginSchema'
import { deleteSession, insertSession } from '../config/dbSqlite'

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [mgeError, setMgeError] = useState()
    const navigation = useNavigation()
    const [triggerLogin] = useLoginMutation()
    const dispatch = useDispatch()

    const onSubmit = async () => {
        try {
            loginSchema.validateSync({ email, password })
            const result = await triggerLogin({
                email: email,
                password: password
            })
            
            if (result.error) {
                const message_error = result.error.data.error.errors[0].message
                if(message_error === "INVALID_LOGIN_CREDENTIALS"){
                    setMgeError("Credenciales Invalidas.")
                }else{
                    setMgeError("Error al inciar sesion.")
                }
                console.log('Error en login:', result.error)
                return
            } else {
                setMgeError(null)
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
                    break
                case 'password':
                    setPasswordError(error.message)
                    setEmailError('')
                    break
            }
        }
    }

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title}>Ingresar</Text>
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
                <SubmitButton onPress={onSubmit} title="Iniciar Sesión" />
                <Text style={styles.textSmall}>¿No tenes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.textSignup}>Registrarme</Text>
                </Pressable>
            </View>
            {mgeError && 
                <View style={styles.containerMgeError}>
                    <Text style={styles.textError}>{mgeError}</Text>
                </View>
            }
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10
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
    },
    containerMgeError: {
        backgroundColor: "#ffd6d6",
        padding: 10,
        width: "80%",
        borderRadius: 10
    },
    textError: {
        fontFamily: "quicksand_medium",
        color: colors.textError
    }
})