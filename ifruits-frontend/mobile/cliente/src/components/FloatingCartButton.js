import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';

export default function FloatingCartButton({ excludeScreens = [] }) {
  const navigation = useNavigation();
  const [currentScreen, setCurrentScreen] = useState('');
  const { cartItems, getTotalItems, getTotalPrice } = useCart();
  
  useEffect(() => {
    // Verificar a tela atual
    const unsubscribe = navigation.addListener('state', () => {
      try {
        const route = navigation.getCurrentRoute();
        setCurrentScreen(route?.name || '');
      } catch (error) {
        console.log('Erro ao obter rota atual:', error);
        setCurrentScreen('');
      }
    });
    
    // Verificar a tela inicial
    try {
      const route = navigation.getCurrentRoute();
      setCurrentScreen(route?.name || '');
    } catch (error) {
      console.log('Erro ao obter rota inicial:', error);
    }
    
    return unsubscribe;
  }, [navigation]);
  
  // Verificar se deve esconder o botão nesta tela
  if (excludeScreens.includes(currentScreen) || cartItems.length === 0) {
    return null;
  }
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  
  return (
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => navigation.navigate('Cart')}
      activeOpacity={0.9}
    >
      <View style={styles.buttonContent}>
        <View style={styles.iconWrapper}>
          <Icon name="cart" size={24} color="#FFFFFF" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItems}</Text>
          </View>
        </View>
        <Text style={styles.priceText}>Ver carrinho</Text>
        <Text style={styles.priceText}>
          {new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          }).format(totalPrice)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 90 : 80,
    alignSelf: 'center',
    backgroundColor: '#41B54A',
    borderRadius: 50,
    paddingHorizontal: 22,
    paddingVertical: 14,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 100,
    width: Platform.OS === 'ios' ? '90%' : '85%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  priceText: {
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 5,
    fontSize: Platform.OS === 'ios' ? 16 : 14,
  },
}); 