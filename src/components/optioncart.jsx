import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { faCartPlus,faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/native";

const Optioncart = ({Vaciar}) => {
    const [productos, setProductos] = useState([]);
    const [actualizarPantalla, setActualizarPantalla] = useState(false); 

    const navigation = useNavigation();

    useEffect(() => {
        obtenerProductosEnCarrito();
    }, [actualizarPantalla]); 

    const obtenerProductosEnCarrito = async () => {
        try {
            const carrito = await AsyncStorage.getItem("carritoProductos");
            if (carrito) {
                const productosCarrito = JSON.parse(carrito);
                setProductos(productosCarrito);
            }
        } catch (error) {
            console.error("Error al obtener productos del carrito:", error);
        }
    };

    const vaciarCarrito = async () => {
        try {
            await AsyncStorage.removeItem("carritoProductos");
            setProductos([]);
            setActualizarPantalla(true); // Actualizar la pantalla al vaciar el carrito
            Alert.alert("Carrito vaciado", "Se ha vaciado el carrito correctamente");
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
        }
    };

    const totalCarrito = productos.reduce((total, producto) => total + producto.total, 0);

    return (
        <>
        <View style={styles.main}>
            <Text style={styles.totalText}>Total: ${totalCarrito}</Text>

        <View style={styles.con1}>
        <TouchableOpacity style={styles.butonapgo} onPress={()=>{ navigation.navigate("Direccion") }}>
            <Text style={styles.butonpagotext}>Ir al pago</Text>        
        </TouchableOpacity>
            <TouchableOpacity style={styles.buton} onPress={vaciarCarrito}>
                <Text style={styles.butonpagotext} >Vaciar</Text>
                <FontAwesomeIcon icon={faTrashAlt} size={20} />
            </TouchableOpacity>
            </View>
        </View>
        
        </>
    );
};

const styles = StyleSheet.create({
    main:{
        width:'100%',
        display:'flex',
        marginBottom: 70,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    totalText: {
        marginBottom: 10,
        fontSize: 18,
    },
    con1:{
        flexDirection: 'row'

    },
    buton:{
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 20,
        display:'flex',
        flexDirection:'row'
    },
    butonapgo:{
        backgroundColor: "#77C3E0",
        paddingVertical: 10,
        borderRadius:20,
        borderColor:'#fff',
        paddingHorizontal: 20

    },
    butonpagotext:{
        fontWeight:'bold',

    }
});

export default Optioncart;
