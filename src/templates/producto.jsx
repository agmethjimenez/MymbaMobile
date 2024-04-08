import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios'; // Importa axios
import { URL, KEY_PRODUCTS } from '@env';

const Producto = ({ route }) => {
    const { productId } = route.params;
    const [producto, setProducto] = useState(null); 

    useEffect(() => {
        const ObtenerProducto = async () => {
            try {
                const response = await axios.get(`http://${URL}/mymbarekove.shop/controller/producto.php/${productId}`,{
                    headers:{
                        'token': `Bearer ${KEY_PRODUCTS}`
                    }
                })
                setProducto(response.data[0]); 
            } catch (error) {
                console.error(error);
            }
        };

        ObtenerProducto();
    }, [productId]); 

    return (
        <View >
            {producto && ( // Renderiza la información del producto solo si producto está definido
            <ScrollView>
                <View style={styles.main}>
                    <View style={styles.imgcontainer}>
                    <Image style={styles.img} source={{ uri: producto.imagen }} />
                    </View>
                    <View style={styles.information}>
                    <Text style={styles.tittle}>{producto.nombre}</Text>
                    <Text style={styles.text}>{producto.descripcionP}</Text>
                    <Text style={styles.text}>Contenido: {producto.contenido}</Text>
                    <Text style={styles.text}>Precio: ${producto.precio}</Text>
                    <Text style={styles.text}>En stock: {producto.cantidadDisponible}</Text>
                    </View>
                </View>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    main:{
        flexDirection:'column'
    },
    imgcontainer:{
        width:'100%',
        justifyContent:'center',
        alignItems: 'center'
    },
    img:{
        height: 400,
        width: '100%',
    },
    information:{
        display:'flex',
        paddingLeft: 10,
        backgroundColor: "white",
        alignItems: 'flex-start',
        width: '100%',
        gap: 30,
    },
    tittle:{
        fontWeight: 'bold',
        fontSize: 35,
    },
    text:{
        fontSize: 18,
    }
})

export default Producto;
