import React from 'react';
import { StyleSheet } from 'react-native';

 export const stylesHome = StyleSheet.create({
    body:{
      backgroundColor:'#f2e4bb',
      flex:1,
      width:'100%',
      alignItems:'center',
      fontFamily: 'Montserrat_500Medium',
  },
  container: {
      gap: 7,
      position: 'absolute',
      bottom: 0,
      padding: 20,
      fontFamily: 'Montserrat_500Medium',
      backgroundColor: 'white',
      width: '100%',
      borderTopLeftRadius:30,
      borderTopRightRadius: 30,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      display:'flex',
      justifyContent:'center',
    },
    divtitulo:{
      width: '100%',
      justifyContent:'center',
      alignItems: 'center'
    },
  tituloprincipal:{
      fontWeight:'bold',
      fontSize:40,
      fontFamily: 'Montserrat_500Medium'
  },
  logo: {
      position: 'absolute',
      width: 250, 
      height: 250, 
      marginBottom: 60, 
    },
    divoptions:{
      width:'100%',
      justifyContent:'center',
      alignItems:'center'
    }
  });

