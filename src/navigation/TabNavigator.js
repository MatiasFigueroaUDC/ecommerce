import { StyleSheet } from 'react-native'
import React from 'react'
//npm install @react-navigation/bottom-tabs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStack from './ShopStack';
import CartStack from './CartStack';
import OrdersStack from './OrdersStack';
import TabBarIcon from '../components/TabBarIcon';
import MyProfileStack from './MyProfileStack';


const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
                tabBarLabelPosition: "beside-icon"
            }}
        >
            <Tab.Screen
                name="ShopStack"
                component={ShopStack}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon text="Tienda" icon="shop" focused={focused} />
                }}
            />
            <Tab.Screen
                name="CartStack"
                component={CartStack}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon text="Carrito" icon="shopping-cart" focused={focused} />
                }}
            />
            <Tab.Screen
                name="OrdersStack"
                component={OrdersStack}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon text="Ordenes" icon="list" focused={focused} />
                }}
            />
            <Tab.Screen
                name="MyProfileStack"
                component={MyProfileStack}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon text="Mi Perfil" icon="user" focused={focused} />
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBar: {
        height: 60,
        padding: 10
    }
})