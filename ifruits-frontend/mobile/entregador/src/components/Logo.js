import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

// Importando as logos do sistema
const logoVerde = require('../../assets/images/logo_verde.png');
const logoBranca = require('../../assets/images/logo_branca.png');

const Logo = ({ size = 'medium', showText = true, white = false }) => {
  const logoSize = {
    small: 60,
    medium: 100,
    large: 160,
    extraLarge: 200
  };

  const textSize = {
    small: 18,
    medium: 24,
    large: 36,
    extraLarge: 48
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.logoContainer, 
        { width: logoSize[size], height: logoSize[size] },
        white ? styles.whiteBackground : styles.transparentBackground
      ]}>
        <Image 
          source={white ? logoVerde : logoBranca} 
          style={{ 
            width: logoSize[size] * 0.8, 
            height: logoSize[size] * 0.8,
            resizeMode: 'contain'
          }} 
        />
      </View>
      
      {showText && (
        <Text style={[
          styles.logoText, 
          { fontSize: textSize[size] },
          white ? styles.darkText : styles.whiteText
        ]}>
          <Text style={white ? styles.logoTextGreen : styles.logoTextWhite}>i</Text>
          <Text style={white ? styles.logoTextBlack : styles.logoTextWhite}>Fruits</Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  whiteBackground: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  logoText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoTextGreen: {
    color: '#41B54A',
  },
  logoTextBlack: {
    color: '#1F2937',
  },
  logoTextWhite: {
    color: '#FFFFFF',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  darkText: {
    color: '#1F2937',
  }
});

export default Logo; 