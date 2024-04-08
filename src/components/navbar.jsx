import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { faHome, faHouseChimney, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.navbar}>
        <TouchableOpacity onPress={()=>{navigation.navigate("Catalogo")}} style={styles.navbarItem}>
        <FontAwesomeIcon icon={faHouseChimney} size={30} style={{color: '#ffffff'}}/>        
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate("Carrito")}} style={styles.navbarItem}>
            <FontAwesomeIcon icon={faShoppingCart} size={30} style={{color: "#ffffff",}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate("Perfil")}}  style={styles.navbarItem}>
            <FontAwesomeIcon icon={faUser} size={30} style={{color: "#ffffff",}} />            
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#594A3C',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60, 
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    navbarItem: {
        alignItems: 'center',
    },
    navbarText: {
        color: 'white',
        fontSize: 12,
        marginTop: 5, 
    },
});

export default Navbar;
