import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sumarCantidad, restarCantidad, eliminarProducto } from '../carritofunction';
import { faCartPlus,faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const CardCarrito = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        obtenerProductosEnCarrito();
    }, []);

    const obtenerProductosEnCarrito = async () => {
        try {
            const carrito = await AsyncStorage.getItem("carritoProductos");
            if (carrito) {
                const productosCarrito = JSON.parse(carrito);
                setProductos(productosCarrito);
                console.log(productosCarrito)
            }
        } catch (error) {
            console.error("Error al obtener productos del carrito:", error);
        }
    };

    const actualizarCantidad = async (index, operacion) => {
        try {
            if (operacion === 'sumar') {
                await sumarCantidad(index);
            } else if (operacion === 'restar') {
                await restarCantidad(index);
            } else if (operacion === 'eliminar') {
                await eliminarProducto(productos[index].id);
            }
            obtenerProductosEnCarrito(); // Actualizar la lista de productos después de cambiar la cantidad
        } catch (error) {
            console.error("Error al actualizar la cantidad del producto:", error);
        }
    };

    return (
        <View style={styles.container}>
            {productos.length > 0 ? (
                productos.map((producto, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <Image source={{ uri: producto.imagen }} style={styles.imagenProducto} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.nombreProducto}>{producto.nombre}</Text>
                            <Text>Precio: ${producto.precio}</Text>
                            <Text>Cantidad: {producto.cantidad}</Text>
                            <Text>Total: ${producto.total}</Text>
                        </View>
                        <View style={styles.botonesContainer}>
                            <TouchableOpacity onPress={() => actualizarCantidad(index, 'restar')} style={styles.boton}>
                                <Text style={styles.textoBoton}>-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => actualizarCantidad(index, 'sumar')} style={styles.boton}>
                                <Text style={styles.textoBoton}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => actualizarCantidad(index, 'eliminar')} style={styles.boton2}>
                                <FontAwesomeIcon icon={faTrashAlt} color='white' />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            ) : (
                <View style={styles.noProductosContainer}>
                    <Text style={styles.noProductosText}>No hay productos</Text>
                    <FontAwesomeIcon icon={faCartPlus} size={50}/>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingVertical: 10
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 25,
        paddingTop:5,
        paddingBottom: 9,
        paddingHorizontal: 12,
    },
    imagenProducto: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    botonesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    boton: {
        backgroundColor: 'black',
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    boton2: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    textoBoton: {
        color: 'white',
        fontWeight: 'bold',
    },
    nombreProducto: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    noProductosContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    
});

export default CardCarrito;