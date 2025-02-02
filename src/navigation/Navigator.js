import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
//npm install @react-navigation/native
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import AuthStack from './AuthStack';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSession, init } from '../config/dbSqlite';
import { deleteUser, setUser } from '../features/userSlice';
//PROBAR QUE EL LOGIN Y REGISTER FUNCIONEN BIEN - MIRAR lA SEGUNDA MITAD DE LA CLASE 16/01 donde hace unas cosas con el login y navigator

const Navigator = () => {
    const idToken = useSelector(state => state.user.idToken)
    const dispatch = useDispatch()
    useEffect(() => {
        (async () =>{
            //const sessionUser = await fetchSession()
            //dispatch(setUser(sessionUser))
            await init()
            dispatch(deleteUser())
            const sessionUser = await fetchSession()
            if (sessionUser) {
                dispatch(setUser(sessionUser))
            }
        })()
    }, [])


    return (
        <NavigationContainer>
            {idToken ? <TabNavigator/> : <AuthStack/>}
        </NavigationContainer>
    )
}

export default Navigator

const styles = StyleSheet.create({
 
})