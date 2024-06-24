import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import InputTexto from '../components/input'
import Boton from '../components/button'
import axios from 'axios';
import { Alert, View } from 'react-native'
import { stylesclave } from '../styles/stylescambiclave';
const PasswordChange = () => {
    const [claveActual, setClaveActual] = useState('')
    const [claveNueva, setClaveNueva] = useState('')
    const [claveNueva2, setClaveNueva2] = useState('')

    const cambioClave = () => {
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

        // Aquí puedes agregar el código para cambiar la clave
        Alert.alert("Éxito", "La clave ha sido cambiada correctamente");
    };
    return (
        <View style={stylesclave.body}>
            <View style={stylesclave.container}>
                <InputTexto label="Clave actual" secureTextEntry={true} onChangeText={setClaveActual} placeholder="Ingrese su clave actual." />
                <InputTexto label="Clave nueva" secureTextEntry={true} onChangeText={setClaveNueva} placeholder="Ingrese la clave nueva" />
                <InputTexto label="Clave nueva" secureTextEntry={true} onChangeText={setClaveNueva2} placeholder="Repita la clave nueva" />
                <Boton onPress={cambioClave} titulo={"Cambiar clave"} />
            </View>
        </View>

    )
}

export default PasswordChange