import React, { useState } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import InputTexto from '../components/input'
import Navbar from '../components/navbar'
import Header from '../components/header'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker'
import PickerItem from '../components/select'
import Boton from '../components/button'

const DireccionScreen = () => {
    const navigation = useNavigation();
    const [tipoCalle, setTipoCalle] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [direccion, setDireccion] = useState('');

    const guardarDireccion = async () => {
        if (!ciudad || !direccion || !tipoCalle) {
            Alert.alert("Error", "Por favor completa todos los campos");
            return;
        }
        
        // Concatenar el tipo de calle con la dirección
        const direccionCompleta = `${tipoCalle} ${direccion}`;
        
        // Guardar la ciudad y la dirección en AsyncStorage
        try {
            await AsyncStorage.setItem("ciudad", ciudad);
            await AsyncStorage.setItem("direccion", direccionCompleta);
            Alert.alert("Éxito", "La dirección se ha guardado correctamente");
        } catch (error) {
            console.error("Error al guardar la dirección:", error);
            Alert.alert("Error", "Ocurrió un error al guardar la dirección");
        }
    };

    return (
        <>
            <View style={styles.main}>
                <View>
                    <Text style={styles.tittle}>Direccion de usuario</Text>
                </View>
                <View style={styles.form}>
                    <PickerItem
                        label="Selecciona el tipo de calle"
                        items={[
                            { label: 'Selecicone tipo de calle', value: 0 },
                            { label: 'Avenida', value: 'Avenida' },
                            { label: 'Avenida Carrera', value: 'Avenida Carrera' },
                            { label: 'Avenida Calle', value: 'Avenida Calle' },
                            { label: 'Carrera', value: 'Carrera' },
                            { label: 'Calle', value: 'Calle' },
                            { label: 'Diagonal', value: 'Diagonal' },
                            { label: 'Transversal', value: 'Transversal' },
                            { label: 'Via', value: 'Via' }
                        ]}
                        selectedValue={tipoCalle}
                        onValueChange={(itemValue) => setTipoCalle(itemValue)}
                    />
                    <PickerItem
                        label="Selecciona la ciudad"
                        items={[
                            { label: 'Selecicone la ciudad', value: 0 },
                            { label: 'Bogota', value: 'Bogota' },
                            { label: 'Medellin', value: 'Medellin' },
                            { label: 'Cali', value: 'Cali' },
                            { label: 'Barranquilla', value: 'Barranquilla' },
                            { label: 'Bello', value: 'Bello' },
                            { label: 'Buga', value: 'Buga' },
                            { label: 'Palmira', value: 'Palmira' },
                            { label: 'Envigado', value: 'Envigado' },
                            { label: 'Cartegena', value: 'Cartegena' },
                            { label: 'Cucuta', value: 'Cucuta' },
                            { label: 'Soacha', value: 'Soacha' },
                            { label: 'Manizales', value: 'Manizales' },
                            { label: 'Pereira', value: 'Pereira' }
                        ]}
                        selectedValue={ciudad}
                        onValueChange={(itemValue) => setCiudad(itemValue)}
                    />
                    <InputTexto
                        label={"Direccion"}
                        placeholder={"EJ: calle 22 #23-5"}
                        onChangeText={(text) => setDireccion(text)}
                    />
                    <Boton titulo={"Guardar direccion"} onPress={guardarDireccion} />
                </View>
            </View>

            <Navbar />
        </>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: .9,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    form: {
        width: '75%'
    },
    tittle: {
        fontWeight: 'bold',
        fontSize: 30
    }
})

export default DireccionScreen
