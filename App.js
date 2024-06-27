import React from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './src/templates/home';
import Registro from './src/templates/registro';
import Catalogo from './src/templates/catalogo';
import Producto from './src/templates/producto';
import Carrito from './src/templates/carrito';
import Perfil from './src/templates/perfil';
import DireccionScreen from './src/templates/direccion';
import PasswordChange from './src/templates/password';
import DrawerComponent from './src/components/drawerComponent';
import { useFonts as useOxygen, Oxygen_400Regular } from '@expo-google-fonts/oxygen';
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import Pedidos from './src/templates/pedidos';
import DetallePedido from './src/templates/detallepedido';
import Logout from './src/templates/logout';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
      <Stack.Screen name="Catalogo" component={Catalogo} options={{ headerShown: false }} />
      <Stack.Screen name="Producto" component={Producto} />
      <Stack.Screen name="Carrito" component={Carrito} options={{ headerShown: false }} />
      <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
      <Stack.Screen name="Direccion" component={DireccionScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Cambio clave" component={PasswordChange} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useOxygen({
    Oxygen_400Regular,
  });
  const [fontsLoadedd] = useMontserrat({
    Montserrat_500Medium,
  });

  if (!fontsLoaded || !fontsLoadedd) {
    return null;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerComponent {...props} />}>
        <Drawer.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Drawer.Screen name="Catalogo" component={Catalogo} />
        <Drawer.Screen name="Registro" component={Registro} />
        <Drawer.Screen name="Stack" component={StackNavigator} />
        <Drawer.Screen name="Producto" component={Producto} />
        <Drawer.Screen name="Carrito" component={Carrito} />
        <Drawer.Screen name="Perfil" component={Perfil} />
        <Drawer.Screen name="Direccion" component={DireccionScreen} />
        <Drawer.Screen name="Cambio clave" component={PasswordChange} />
        <Drawer.Screen name="Pedidos" component={Pedidos} />
        <Drawer.Screen name="DetallePedido" component={DetallePedido} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
