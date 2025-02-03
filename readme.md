# Aplicación E-COMMERCE con React Native
Aplicación móvil de e-commerce desarrollada con React Native y Expo, que incluye autenticación, carrito de compras, gestión de perfil y más.

## 📱Funcionalidades y Características
- **Autenticación**
  - Registro de usuarios con Firebase
  - Inicio de sesión 
  - Persistencia de sesión con SQLite

- **Gestión de Perfil**
  - Foto de perfil (cámara/galería)
  - Ubicación del usuario
  - Datos personales

- **Carrito de Compras**
  - Agregar/eliminar productos
  - Gestión de cantidades
  - Sincronización con Firebase

- **Productos**
  - Listado de productos
  - Detalles de producto
  - Categorías
  - Búsqueda

## 📱 Pantallas

### Stack de Autenticación
- **Login**
    - Autentificación de usuarios
- **Signup**
    - Registro de usuario

### Stack Principal 
- **Shop**
  - Listado de productos por categorías
  - Filtrado por categorías con barra de busqueda
  - Detalles de productos

- **Cart**
  - Visualización del carrito
  - Eliminación de productos
  - Proceso de compra

- **Orders**
  - Historial de órdenes

### Stack de Perfil
- **MyProfile**
  - Información del usuario
  - Foto de perfil
  - Ubicación guardada

- **ImageSelector**
  - Captura de fotos con cámara
  - Selección desde galería
  - Previsualización de imagen

- **LocationSelector**
  - Mapa
  - Selección de ubicación
  - Geocodificación inversa

## 📝 Codigo del Tab Navigator
- **El siguiente codigo muestra la estructura de navegación**
  ``` javascript
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
  ```

## 🛠️ Tecnologías
- **React Native**
  - Framework para desarrollo de aplicaciones móviles nativas
  - Permite desarrollar para iOS y Android con un único código base
  - Utiliza componentes nativos para mejor rendimiento

- **Expo**
  - Plataforma y conjunto de herramientas para React Native
  - Facilita el desarrollo con APIs preconfiguradas
  - Permite probar la app sin necesidad de configurar entornos nativos

- **Redux Toolkit & RTK Query**
  - Gestión del estado global de la aplicación
  - Manejo eficiente de caché y datos del servidor
  - Simplifica las llamadas a API y la sincronización de datos

- **Firebase Realtime Database**
  - Base de datos en tiempo real para almacenamiento en la nube
  - Autenticación de usuarios
  - Sincronización automática entre dispositivos

- **SQLite**
  - Base de datos local en el dispositivo
  - Almacenamiento persistente de datos de sesión
  - Funciona sin conexión a internet

- **Expo Image Picker**
  - Acceso a la cámara del dispositivo
  - Selección de imágenes desde la galería
  - Gestión de permisos del sistema

- **Expo Location**
  - Obtención de coordenadas GPS
  - Geocodificación de direcciones
  - Gestión de permisos de ubicación

## 🖥️ Instalación
1. Clonar el repositorio : `git clone https://github.com/MatiasFigueroaUDC/ecommerce.git`
2. Instalar dependencias : `npm install`
3. Iniciar la aplicación: `npm start`

## 👤 Autor Matías Gabriel Figueroa
- GitHub: [@MatiasFigueroaUDC](https://github.com/MatiasFigueroaUDC)
- Email: matiigfigueroa@gmail.com   



