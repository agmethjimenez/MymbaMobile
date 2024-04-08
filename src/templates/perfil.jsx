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
    const [datos, setDatos] = useState({
      identificacion: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      telefono: '',
      email: ''
    });
  
    useEffect(() => {
      obtenerDatos();
    }, []);
  
    const obtenerDatos = async () => {
      try {
        const userData = JSON.parse(await AsyncStorage.getItem("userData"));
        const userId = userData.id;
  
        const response = await axios.get(
          `http://${URL}/mymbarekove.shop/controller/users.php/${userId}`,
          {
            headers: {
              token: API_KEY_GET,
            },
          }
        );
        const user = response.data[0]; // Obtén el primer objeto del array de datos
        setDatos({
          identificacion: user.identificacion,
          primerNombre: user.primerNombre,
          segundoNombre: user.segundoNombre,
          primerApellido: user.primerApellido,
          segundoApellido: user.segundoApellido,
          telefono: user.telefono,
          email: user.email
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleInputChange = (text, key) => {
      setDatos({
        ...datos,
        [key]: text
      });
    };
  
    const enviarDatos = async () => {
      try {
        const userData = JSON.parse(await AsyncStorage.getItem("userData"));
        const userId = userData.id;
  
        const response = await axios.put(
          `http://${URL}/mymbarekove.shop/controller/users`,
          datos, 
          {
            headers: {
              token: `Bearer ${API_POST_USER}`,
            },
          }
        );
        console.log(response.data); 
        if(response.data.exito){
            Alert.alert("Datos actualizados");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <>
        <Header />
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
                  <Text style={styles.textonormal}>
                    ID: {datos.identificacion}
                  </Text>
                  <Text style={styles.textonormal2}>
                    {" "}
                    {datos.primerNombre} {datos.segundoNombre}{" "}
                    {datos.primerApellido} {datos.segundoApellido}
                  </Text>
                  <Text style={styles.textonormal}> {datos.email}</Text>
                  <Text style={styles.textonormal}> {datos.telefono}</Text>
                </View>
                <View style={styles.containerform}>
                  <View style={styles.containerdatos}>
                    <InputTexto
                      value={datos.identificacion}
                      placeholder="Identificación"
                      onChangeText={(text) =>
                        handleInputChange(text, "identificacion")
                      }
                      label="Identificación"
                      editable={false}
                    />
                    <InputTexto
                      value={datos.primerNombre}
                      placeholder="Primer nombre"
                      onChangeText={(text) =>
                        handleInputChange(text, "primerNombre")
                      }
                      label="Primer nombre"
                    />
                    <InputTexto
                      value={datos.segundoNombre}
                      placeholder="Segundo nombre"
                      onChangeText={(text) =>
                        handleInputChange(text, "segundoNombre")
                      }
                      label="Segundo nombre"
                    />
                    <InputTexto
                      value={datos.primerApellido}
                      placeholder="Primer apellido"
                      onChangeText={(text) =>
                        handleInputChange(text, "primerApellido")
                      }
                      label="Primer apellido"
                    />
                    <InputTexto
                      value={datos.segundoApellido}
                      placeholder="Segundo apellido"
                      onChangeText={(text) =>
                        handleInputChange(text, "segundoApellido")
                      }
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
  containerform:{
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
