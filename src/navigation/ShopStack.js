//npm install @react-navigation/native-stack
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header'
import Home from '../screens/Home';
import ProductsByCategory from '../screens/ProductsByCategory';
import ProductDetail from '../screens/ProductDetail';

const Stack = createNativeStackNavigator()

const ShopStack = () => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                header: () => {
                    return <Header titulo={
                        route.name === "Home" ? "Inicio" :
                            route.name === "ProductsByCategory" ? route.params.item :
                                "Detalles"
                    }
                       
                    />
                },
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_right'
            })}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ProductsByCategory" component={ProductsByCategory} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
    )
}

export default ShopStack
