import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { URL } from '@env';

const DetallePedido = ({ route }) => {
  const { pedidoId } = route.params;
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(`${URL}/pedidos/${pedidoId}`);
        setPedido(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPedido();
  }, [pedidoId]);

  if (!pedido) {
    return (
      <View style={styles.loading}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  const obtenerDetallesProducto = async (idProducto) => {
    try {
      // Eliminar espacios en blanco alrededor de idProducto
      const cleanIdProducto = idProducto.trim();
      const response = await axios.get(`${URL}/productos/read/${cleanIdProducto}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener detalles del producto ${idProducto}`, error);
      return {
        nombre: 'Producto no encontrado',
        imagen: null,
      };
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pedidoDetails}>
        <Text style={styles.title}>Detalles del Pedido</Text>
        <Text>ID Pedido: {pedido.idPedido}</Text>
        <Text>Fecha: {pedido.fecha}</Text>
        <Text>Ciudad: {pedido.ciudad}</Text>
        <Text>Dirección: {pedido.direccion}</Text>
        <Text>Total: {pedido.total}</Text>
      </View>
      <View style={styles.usuarioDetails}>
        <Text style={styles.title}>Detalles del Usuario</Text>
        <Text>Nombre: {`${pedido.usuario.primerNombre} ${pedido.usuario.segundoNombre} ${pedido.usuario.primerApellido} ${pedido.usuario.segundoApellido}`}</Text>
        <Text>Teléfono: {pedido.usuario.telefono}</Text>
        <Text>Email: {pedido.usuario.email}</Text>
      </View>
      <View style={styles.productos}>
        <Text style={styles.title}>Productos</Text>
        {pedido.detallespedido.map(async (detalle, index) => {
          const producto = await obtenerDetallesProducto(detalle.idProducto);
          return (
            <View key={index} style={styles.producto}>
              <Image source={{ uri: producto.imagen }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{producto.nombre}</Text>
                <Text>Cantidad: {detalle.cantidad}</Text>
                <Text>Total: {detalle.total}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pedidoDetails: {
    marginBottom: 16,
  },
  usuarioDetails: {
    marginBottom: 16,
  },
  productos: {
    marginBottom: 16,
  },
  producto: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetallePedido;
