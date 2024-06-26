import React, { useState } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import InputTexto from "../components/input";
import axios from "axios";
import Boton from "../components/button";
import PickerItem from "../components/select";
import { useNavigation } from "@react-navigation/native";
import { stylesHome } from "../styles/stylesregistro";
import { API_POST_USER, URL } from '@env';

const Registro = () => {
    const navigation = useNavigation();
    const [tipoid, setTipoid] = useState(null);
    const [identificacion, setIdentificacion] = useState('');
    const [nombre1, setNombre1] = useState('');
    const [nombre2, setNombre2] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');

    const Registrarse = async () => {
        // Validar el tipo de identificación
        if (isNaN(tipoid) || tipoid === null) {
            Alert.alert("Por favor selecciona un tipo de identificación");
            return;
        }
    
        // Configurar el cuerpo de la solicitud
        /*$user = Usuario::InsertUser([
            'identificacion' => $request->identificacion,
            'tipoId' => $request->tipoId,
            'primerNombre' => $request->primerNombre,
            'segundoNombre' => $request->segundoNombre,
            'primerApellido' => $request->primerApellido,
            'segundoApellido' => $request->segundoApellido,
            'email' => $request->email,
            'telefono' => $request->telefono,
            'password' => $request->password,
        ]) */
        const body = {
            "identificacion":identificacion,
            "tipoId":tipoid,
            "primerNombre":nombre1,
            "segundoNombre": nombre2,
            "primerApellido":apellido1,
            "segundoApellido":apellido2,
            "telefono":telefono,
            "email":email,
            "password":password
        };
    
        try {
            // Realizar la solicitud POST con el token de autorización en el encabezado
            const response = await axios.post(
                `${URL}/usuario`,
                body,
            );
    
            if (response.data.status) {
                console.log("Registrado");
                Alert.alert("Exito","Registrado exitosamente puedes iniciar sesion");
                navigation.navigate("Inicio");
            } else {
                Alert.alert("Error","Error al registrarse como usuario");
            }
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <ScrollView>
            <View style={stylesHome.body}>
                <Image
                    style={stylesHome.logo}
                    source={require("../../assets/Logo veterinaria animado azul rosado.png")}
                />

                <View style={stylesHome.container}>
                    <View style={stylesHome.divtitulo}>
                        <Text style={stylesHome.tituloprincipal}>Bienvenido</Text>
                    </View>
                    <PickerItem
                        label="Selecciona una opción"
                        items={[
                            {label: 'Selecicone tipoid', value:0},
                            { label: 'Cedula de Ciudadania', value: 1 },
                            { label: 'Cedula de Extranjeria', value: 2 },
                            { label: 'PEP', value: 3 },
                            { label: 'PASAPORTE', value: 4 }
                        ]}
                        selectedValue={tipoid}
                        onValueChange={(itemValue) => setTipoid(itemValue)}
                    />
                    <InputTexto
                        placeholder={"Ingresa tu identificacion"}
                        label={"Identificacion"}
                        onChangeText={setIdentificacion}
                        value={identificacion}
                    />
                    <InputTexto
                        placeholder={"Ingresa tu Primer Nombre"}
                        label={"Primer nombre"}
                        onChangeText={setNombre1}
                        value={nombre1}
                    />
                    <InputTexto
                        placeholder={"Ingresa tu Segundo Nombre"}
                        label={"Segundo nombre"}
                        onChangeText={setNombre2}
                        value={nombre2}
                    />
                    <InputTexto
                        placeholder={"Ingresa tu Primer Apellido"}
                        label={"Primer apellido"}
                        onChangeText={setApellido1}
                        value={apellido1}
                    />
                    <InputTexto
                        placeholder={"Ingresa tu Segundo Apellido"}
                        label={"Segundo apellido"}
                        onChangeText={setApellido2}
                        value={apellido2}
                    />
                    <InputTexto
                        placeholder={"Ingresa tu email"}
                        label={"Email"}
                        onChangeText={setEmail}
                        value={email}
                    />
                    <InputTexto
                        placeholder={"Ingresa tu telefono"}
                        label={"Telefono"}
                        onChangeText={setTelefono}
                        value={telefono}
                    />
                    <InputTexto
                        secureTextEntry={true}
                        placeholder={"Ingresa tu password"}
                        label={"Contraseña"}
                        onChangeText={setPassword}
                        value={password}
                    />
                    <Boton onPress={Registrarse} titulo={"Registrarse"} />
                    <View style={stylesHome.divoptions}>
                        <TouchableOpacity onPress={() => navigation.navigate("Inicio")}>
                            <Text>¿Ya te registraste?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default Registro;
