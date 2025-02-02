import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';
import Login from '../screens/Login';

import Signup from '../screens/Signup';

const Stack = createNativeStackNavigator()

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_right'
            })}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    )
}

export default AuthStack
