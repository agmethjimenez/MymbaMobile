import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//import { URL } from '@env';
const URL = "https://mymba-rekove-shop-backend-production.up.railway.app/api";

const PedidoItem = ({ pedido }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.pedidoContainer}
      onPress={() => navigation.navigate('DetallePedido', { pedidoId: pedido.id })}
    >
      <Text style={styles.pedidoText}>Pedido #{pedido.id}</Text>
      <Text style={styles.pedidoText}>Fecha: {pedido.fecha}</Text>
      <Text style={styles.pedidoText}>Dirección: {pedido.direccion}</Text>
      <Text style={styles.pedidoText}>Ciudad: {pedido.ciudad}</Text>
      <Text style={styles.pedidoText}>Estado: {pedido.estado}</Text>
    </TouchableOpacity>
  );
};

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const id = JSON.parse(await AsyncStorage.getItem("id"));
        const response = await axios.get(`${URL}/usuario/pedido/${id}`);
        const pedidosData = response.data.map(data => ({
          id: data.idPedido,
          fecha: data.fecha,
          direccion: data.direccion,
          ciudad: data.ciudad,
          estado: data.estado.estado,
        }));
        setPedidos(pedidosData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        renderItem={({ item }) => <PedidoItem pedido={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2e4bb',
    padding: 10,
  },
  pedidoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    //shadowColor: '#000',
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.3,
    //shadowRadius: 5,
    //elevation: 5,
  },
  pedidoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default Pedidos;
