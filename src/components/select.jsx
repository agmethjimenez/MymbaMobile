import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
const PickerItem = ({ label, items, selectedValue, onValueChange }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}
          style={styles.picker}
        >
          {items.map((item, index) => (
            <Picker.Item label={item.label} value={item.value} key={index} />
          ))}
        </Picker>
      </View>
    );
  };
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 17,
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
  },
});

export default PickerItem;
