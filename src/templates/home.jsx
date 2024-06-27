import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Text, View, Image, TouchableOpacity, Alert, Linking } from "react-native";
import InputTexto from "../components/input";
import Boton from "../components/button";
import { useNavigation } from "@react-navigation/native";
import { stylesHome } from "../styles/styleshome";
import { login, URL } from "@env";
const Home = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = async () => {
    const key = login;
    const body = {
      email: email,
      password: password,
    };
    axios.post(`${URL}/login`,body)
      .then(async (response) => {
        if (response.data.status && response.data.tipo == "user") {
          await AsyncStorage.setItem("id",JSON.stringify(response.data.id));
          await AsyncStorage.setItem("token",JSON.stringify(response.data.token));
          console.log(response.data);
          const userData = await AsyncStorage.getItem("id");
          console.log(
            "Datos del usuario obtenidos de AsyncStorage:",
            JSON.parse(userData)
          );
          navigation.navigate("Catalogo")
        } else {
          console.log(response.data);
          Alert.alert("Inicio de sesión no exitoso", response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error al iniciar sesión. Por favor, inténtalo de nuevo."); 
      });
  };

  const handlePress = () => {
    Linking.openURL(`https://mymbarekoveshop.000webhostapp.com/catalogo/passwordback/solicitar.php`);
  };

  return (
    <>
      <View style={stylesHome.body}>
        <Image
          style={stylesHome.logo}
          source={require("../../assets/Logo veterinaria animado azul rosado.png")}
        />

        <View style={stylesHome.container}>
          <View style={stylesHome.divtitulo}>
            <Text style={stylesHome.tituloprincipal}>Bienvenido</Text>
          </View>
          <InputTexto
            placeholder={"Ingresa tu email"}
            label={"Email"}
            onChangeText={setEmail}
            value={email}
          />
          <InputTexto
            secureTextEntry={true}
            placeholder={"Ingresa tu password"}
            label={"Contraseña"}
            onChangeText={setPassword}
            value={password}
          />
          <Boton onPress={Login} titulo={"Ingresar"} />
          <View style={stylesHome.divoptions}>
            <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
              <Text>¿No te has registrado?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress}>
              
              <Text>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Home;
