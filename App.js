import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/templates/home';
import Registro from './src/templates/registro';
import { useFonts as useOxygen, Oxygen_400Regular } from '@expo-google-fonts/oxygen';
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import Catalogo from './src/templates/catalogo';
import Producto from './src/templates/producto';
import Carrito from './src/templates/carrito';
import Perfil from './src/templates/perfil';
import DireccionScreen from './src/templates/direccion';
import PasswordChange from './src/templates/password';
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useOxygen({
    Oxygen_400Regular,
  });
  const [fontsLoadedd] = useMontserrat({
    Montserrat_500Medium,
  });
  

  if (!fontsLoaded) {
    return null; 
  }
  if(!fontsLoadedd){
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="Registro" component={Registro} options={{headerShown:false}} />
        <Stack.Screen name="Catalogo" component={Catalogo} options={{headerShown:false}}/>
        <Stack.Screen name="Producto" component={Producto} />
        <Stack.Screen name="Carrito" component={Carrito} options={{headerShown:false}}/>
        <Stack.Screen name="Perfil" component={Perfil} options={{headerShown:false}}/>
        <Stack.Screen name="Direccion" component={DireccionScreen} options={{headerShown:true}}/>
        <Stack.Screen name="Cambio clave" component={PasswordChange} options={{headerShown:true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
