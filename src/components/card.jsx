import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
//import { URL } from '@env';
import { agregarAlCarrito } from "../carritofunction";
const URL = "https://mymba-rekove-shop-backend-production.up.railway.app/api";
const Card = ({ name }) => {
  const navigation = useNavigation();
  const [productos, setProductos] = useState([]);

  const obtenerProductos = async () => {
    try {
      let url = `${URL}/productos/read`;
      if (name) {
        url += `?nm=${name}`;
      }
      const response = await axios.get(url);
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, [name]);

  return (
    <View style={styles.container}>
      {productos.map((item, index) => (
        <View style={styles.cardContainer} key={index}>
          <TouchableOpacity onPress={() => navigation.navigate("Producto", { productId: item.idProducto })}>
            <View style={styles.card}>
              <Image source={{ uri: item.imagen }} style={styles.imagenProducto} />
              <Text style={styles.nombreProducto}>{item.nombre}</Text>
              <Text style={styles.precioProducto}>Precio: ${item.precio}</Text>
              <TouchableOpacity style={styles.boton} onPress={() => agregarAlCarrito(item.nombre, item.precio, item.idProducto, 1, item.imagen, item.cantidadDisponible)}>
                <Text style={styles.textoBoton}>Comprar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7c6b2',
    gap: 10,
    marginBottom: 40,
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    display: 'flex',
    marginTop: 0,
    borderColor: '#ccc',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 365,
    backgroundColor: '#594A3C',
  },
  imagenProducto: {
    flex: 1,
    height: 300,
    width: 250,
    objectFit: 'fill',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: 0,
  },
  nombreProducto: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  precioProducto: {
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
  },
  boton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 15,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Card;
