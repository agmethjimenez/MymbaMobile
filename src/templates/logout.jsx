import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { logout } from '../authfunctions';

const Logout = () => {
  useEffect(() => {
    logout();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Saliendo...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Logout;
