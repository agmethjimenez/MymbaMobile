import React from "react";
import { StyleSheet } from "react-native";

export const stylesclave = StyleSheet.create({
    body:{
        backgroundColor:'#f2e4bb',
        flex:1,
        width:'100%',
        alignItems:'center',
        fontFamily: 'Montserrat_500Medium',
    },
    container: {
        gap: 7,
        bottom: 0,
        padding: 20,
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
});