import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../screens/Cart';
import Header from '../components/Header';

const Stack = createNativeStackNavigator()

const CartStack = () => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                header: () => {
                    return <Header titulo="Carrito" />
                },
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_right'
            })}
        >
            <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
    )
}

export default CartStack

