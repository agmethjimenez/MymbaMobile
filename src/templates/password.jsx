import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputTexto from '../components/input';
import Boton from '../components/button';
import axios from 'axios';
import { Alert, View, Text } from 'react-native';
import { stylesclave } from '../styles/stylescambiclave';
import { useNavigation } from '@react-navigation/native';

const URL = "https://mymba-rekove-shop-backend-production.up.railway.app/api";

const PasswordChange = () => {
  const navigation = useNavigation();
  const [claveActual, setClaveActual] = useState('');
  const [claveNueva, setClaveNueva] = useState('');
  const [claveNueva2, setClaveNueva2] = useState('');

  const cambioClave = async () => {
    if (!claveActual || !claveNueva || !claveNueva2) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    if (claveNueva !== claveNueva2) {
      Alert.alert("Error", "Las nuevas claves no coinciden");
      return;
    }

    if (claveActual === claveNueva) {
      Alert.alert("Error", "La nueva clave no puede ser igual a la actual");
      return;
    }

    try {
      const id = JSON.parse(await AsyncStorage.getItem("id"));
      let body = {
        "id": id,
        "claveactual": claveActual,
        "clavenueva": claveNueva,
        "clavenueva2": claveNueva2,
      };
      console.log(body);
      const response = await axios.post(`https://mymba-rekove-shop-backend-production.up.railway.app/api/credencial/cambioclave`, body);

      if (response.data.status) {
        Alert.alert("Éxito", "La clave ha sido cambiada correctamente");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", response.data.mensaje || "La clave no ha sido cambiada");
      }
    } catch (error) {
      console.error("Error cambiando la clave:", error);
      Alert.alert("Error", "Hubo un problema al cambiar la clave");
    }
  };

  return (
    <View style={stylesclave.body}>
      <View style={stylesclave.container}>
        <Text style={stylesclave.titulo}>Cambio de clave</Text>
        <InputTexto label="Clave actual" secureTextEntry={true} onChangeText={setClaveActual} placeholder="Ingrese su clave actual." />
        <InputTexto label="Clave nueva" secureTextEntry={true} onChangeText={setClaveNueva} placeholder="Ingrese la clave nueva" />
        <InputTexto label="Repetir clave nueva" secureTextEntry={true} onChangeText={setClaveNueva2} placeholder="Repita la clave nueva" />
        <Boton onPress={cambioClave} titulo={"Cambiar clave"} />
      </View>
    </View>
  );
};

export default PasswordChange;
