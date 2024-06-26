import React from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar, TextInput } from 'react-native';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Header = () => {
  const marginTop = StatusBar.currentHeight || 25;

  return (
    <View style={[styles.header]}>
      {/*<TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <FontAwesomeIcon icon={faBars} size={24} color='black' />
      </TouchableOpacity>*/}
      <TextInput placeholder='  ¿Que buscas?' style={styles.input} />
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
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 20,
  },
});

export default Header;
