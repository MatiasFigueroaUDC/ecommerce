import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';
import Orders from '../screens/Orders';

const Stack = createNativeStackNavigator()

const OrdersStack = () => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                header: () => {
                    return <Header titulo="Ordenes" />
                },
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_right'
            })}
        >
            <Stack.Screen name='Orders' component={Orders} />
        </Stack.Navigator>
    )
}

export default OrdersStack

