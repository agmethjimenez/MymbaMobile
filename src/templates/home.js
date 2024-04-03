import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import InputTexto from "../components/input";
import Boton from "../components/button";
import { useNavigation } from "@react-navigation/native";
import { stylesHome } from "../styles/styleshome";
import { login } from "@env";
const Home = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = async () => {
    const key = login;
    const headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    const body = {
      email: email,
      password: password,
    };
    axios
      .post(
        `http://192.168.20.47/mymbarekove.shop/controller/login?token=${key}`,
        body,
        { headers }
      )
      .then(async (response) => {
        if (response.data.acceso) {
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(response.data.data)
          );
          console.log(response.data);
          Alert.alert("Inicio de sesión exitoso"); // Cambiado el mensaje de la alerta
          const userData = await AsyncStorage.getItem("userData");
          console.log(
            "Datos del usuario obtenidos de AsyncStorage:",
            JSON.parse(userData)
          );
        }else{
          console.log(response.data);
          Alert.alert("Inicio de sesión no exitoso",response.data.mensaje);
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error al iniciar sesión. Por favor, inténtalo de nuevo."); // Mensaje de error genérico
      });
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
            <TouchableOpacity
              onPress={() => navigation.navigate("RecuperarPassword")}
            >
              <Text>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Home;
