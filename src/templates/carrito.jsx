import React from 'react'
import { View,Text, ScrollView, StyleSheet } from 'react-native'
import CardCarrito from '../components/cardcarrito'
import Navbar from '../components/navbar'
import Header from '../components/header'
import Optioncart from '../components/optioncart'
const Carrito = () => {
  return (
    <>
    
    <Header/>
    <ScrollView style={style.body}>
    <Text style={style.tittle}>Carrito de Compras</Text>
    <CardCarrito/>
    <Optioncart/>
    </ScrollView>
    <Navbar/>
    </>
  )
}
const style = StyleSheet.create({
    body:{
        backgroundColor: '#f2e4bb'
    },
    tittle:{
        fontWeight: 'bold',
        fontSize: 25,
    }
})
export default Carrito