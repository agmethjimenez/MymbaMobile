import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar, TextInput } from 'react-native';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const marginTop = StatusBar.currentHeight || 25;

  const handleSearch = () => {
    navigation.navigate('Catalogo', { name: searchText });
  };

  return (
    <View style={[styles.header]}>
      <TextInput
        placeholder='  ¿Qué buscas?'
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.menuButton}>
        <FontAwesomeIcon icon={faSearch} size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuButton: {
    padding: 5,
  },
  input: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 8,
    paddingHorizontal: 100,
    borderRadius: 20,
    flex: 1, // Make sure the input takes as much space as possible
    marginRight: 10, // Add some space between the input and the search icon
  },
});

export default Header;
