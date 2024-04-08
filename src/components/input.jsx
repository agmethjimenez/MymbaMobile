import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const InputTexto = ({ label, placeholder, secureTextEntry, onChangeText, onSubmitEditing, value, editable }) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        value={value}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: 20,
  },
  etiqueta: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 17,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    padding: 10,
  },
});

export default InputTexto;