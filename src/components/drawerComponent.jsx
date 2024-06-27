import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DrawerComponent = () => {
  const navigation = useNavigation();

  const goToScreen = (screenName) => () => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={goToScreen('Catalogo')}>
        <Text style={styles.text}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={goToScreen('Perfil')}>
        <Text style={styles.text}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={goToScreen('Pedidos')}>
        <Text style={styles.text}>Pedidos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={goToScreen('Cambio clave')}>
        <Text style={styles.text}>Cambio de clave</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item2} onPress={goToScreen('Logout')}>

        <Text style={styles.text}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  item: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  item2: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#fd6e8a',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default DrawerComponent;

