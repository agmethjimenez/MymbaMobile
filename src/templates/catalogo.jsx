import React from 'react'
import { ScrollView, Text } from 'react-native'
import Card from '../components/card'
import Navbar from '../components/navbar'
import Header from '../components/header'
const Catalogo = () => {
  return (
    <>
    <Header/>
    <ScrollView>
    <Card/>
    </ScrollView>
    <Navbar/>
    </>
  )
}
export default Catalogo