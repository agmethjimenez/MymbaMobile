import React from 'react';
import { ScrollView, Text } from 'react-native';
import Card from '../components/card';
import Navbar from '../components/navbar';
import Header from '../components/header';
import { useRoute } from '@react-navigation/native';

const Catalogo = () => {
  const route = useRoute();
  const { name } = route.params || {}; // Receives the `name` parameter

  return (
    <>
      <Header />
      <ScrollView>
        <Card name={name} />
      </ScrollView>
      <Navbar />
    </>
  );
}

export default Catalogo;
