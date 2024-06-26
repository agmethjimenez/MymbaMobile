import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import InputTexto from "../components/input"; // Asegúrate de importar correctamente el componente InputTexto
import { URL, API_KEY_GET, API_POST_USER } from "@env";

const Perfil = () => {
  const [identificacion, setIdentificacion] = useState('');
  const [datos, setDatos] = useState({
    id: '',
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    telefono: '',
    email: ''
  });

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    try {
      const id = JSON.parse(await AsyncStorage.getItem("id"));
      const response = await axios.get(`${URL}/usuarios/${id}`);
      const user = response.data;
      setIdentificacion(response.data.identificacion);
      setDatos({
        id: id,
        nombre1: user.primerNombre,
        nombre2: user.segundoNombre,
        apellido1: user.primerApellido,
        apellido2: user.segundoApellido,
        telefono: user.telefono,
        email: user.email
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (text, key) => {
    setDatos((prevDatos) => ({
      ...prevDatos,
      [key]: text
    }));
  };

  const enviarDatos = async () => {
    try {
      const response = await axios.put(`${URL}/usuarios/update`, datos);
      console.log(response.data);
      if (response.data.status) {
        Alert.alert("Datos actualizados");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {datos && (
            <View>
              <View style={styles.usericon}>
                <FontAwesomeIcon
                  icon={faUserCircle}
                  size={140}
                  style={{ color: "#594A3C" }}
                />
                <Text style={styles.textonormal2}>
                  {datos.nombre1} {datos.nombre2} {datos.apellido1} {datos.apellido2}
                </Text>
                <Text style={styles.textonormal}>{datos.email}</Text>
                <Text style={styles.textonormal}>{datos.telefono}</Text>
              </View>
              <View style={styles.containerform}>
                <View style={styles.containerdatos}>
                  <InputTexto
                    value={identificacion}
                    placeholder="Identificación"
                    onChangeText={(text) => handleInputChange(text, "id")}
                    label="Identificación"
                    editable={false}
                  />
                  <InputTexto
                    value={datos.nombre1}
                    placeholder="Primer nombre"
                    onChangeText={(text) => handleInputChange(text, "nombre1")}
                    label="Primer nombre"
                  />
                  <InputTexto
                    value={datos.nombre2}
                    placeholder="Segundo nombre"
                    onChangeText={(text) => handleInputChange(text, "nombre2")}
                    label="Segundo nombre"
                  />
                  <InputTexto
                    value={datos.apellido1}
                    placeholder="Primer apellido"
                    onChangeText={(text) => handleInputChange(text, "apellido1")}
                    label="Primer apellido"
                  />
                  <InputTexto
                    value={datos.apellido2}
                    placeholder="Segundo apellido"
                    onChangeText={(text) => handleInputChange(text, "apellido2")}
                    label="Segundo apellido"
                  />
                  <InputTexto
                    value={datos.telefono}
                    placeholder="Teléfono"
                    onChangeText={(text) => handleInputChange(text, "telefono")}
                    label="Teléfono"
                  />
                  <InputTexto
                    value={datos.email}
                    placeholder="Correo electrónico"
                    onChangeText={(text) => handleInputChange(text, "email")}
                    label="Correo electrónico"
                    editable={false}
                  />
                  <TouchableOpacity onPress={enviarDatos}>
                    <Text style={styles.button}>Guardar cambios</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  usericon: {
    backgroundColor: "#f6e2bb",
    display: "flex",
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "center",
    gap: 8,
  },
  containerdatos: {
    backgroundColor: "white",
    display: "flex",
    width: "90%",
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  containerform: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    marginBottom: 32
  },
  textonormal: {
    fontWeight: "400",
    fontSize: 17,
  },
  textonormal2: {
    fontWeight: "900",
    fontSize: 22,
  },
  button: {
    backgroundColor: "#1e90ff",
    color: "white",
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default Perfil;
