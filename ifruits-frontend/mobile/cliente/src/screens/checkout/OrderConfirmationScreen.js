import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  StyleSheet,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderConfirmationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { 
    total, 
    restaurantName, 
    orderNumber,
    deliveryTime,
    address
  } = route.params;
  
  // Animação de fade-in
  const fadeAnim = new Animated.Value(0);
  
  useEffect(() => {
    // Animação de fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
    
    // O carrinho já foi limpo na tela anterior (ReviewOrderScreen)
    
    // Navegar automaticamente para a tela de rastreamento após 3 segundos
    const timer = setTimeout(() => {
      // Resetar navegação para a tela principal
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }]
      });
      
      // Após 500ms, navegar para a aba de pedidos (OrdersTab)
      setTimeout(() => {
        // Salvar temporariamente informações do pedido para recuperar depois
        AsyncStorage.setItem('activeOrder', JSON.stringify({
          orderNumber,
          restaurantName,
          total,
          address,
          deliveryTime
        }));
      }, 500);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Função para navegar para a tela inicial
  const goToHome = () => {
    // Já esvaziamos o carrinho no useEffect, não precisamos fazer de novo
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }]
    });
  };
  
  // Função para ir para a tela de rastreamento imediatamente
  const goToTracking = () => {
    // Já esvaziamos o carrinho no useEffect, não precisamos fazer de novo
    
    // Resetar navegação para a tela principal
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }]
    });
    
    // Salvar temporariamente informações do pedido para recuperar depois
    AsyncStorage.setItem('activeOrder', JSON.stringify({
      orderNumber,
      restaurantName,
      total,
      address,
      deliveryTime
    }));
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['right', 'top', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <Animated.View 
        className="flex-1 items-center justify-center p-6"
        style={{ opacity: fadeAnim }}
      >
        {/* Ícone de sucesso */}
        <View className="w-24 h-24 mb-6 items-center justify-center bg-[#41B54A] rounded-full">
          <Icon name="check" size={50} color="#fff" />
        </View>
        
        <Text className="text-2xl font-bold text-center mb-2">
          Pedido realizado com sucesso!
        </Text>
        
        <Text className="text-base text-gray-600 text-center mb-6">
          Seu pedido foi enviado para {restaurantName}
        </Text>
        
        <View className="bg-gray-50 w-full rounded-lg p-4 mb-6">
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600">Número do pedido:</Text>
            <Text className="font-bold">#{orderNumber}</Text>
          </View>
          
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600">Valor total:</Text>
            <Text className="font-bold">R$ {total.toFixed(2).replace('.', ',')}</Text>
          </View>
          
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Tempo estimado:</Text>
            <Text className="font-bold">{deliveryTime}</Text>
          </View>
        </View>
        
        <Text className="text-base text-gray-500 text-center mb-3">
          Seu pedido está sendo preparado.
          Acompanhe na aba "Pedidos"!
        </Text>
        
        <View className="flex-row justify-center">
          <View className="w-3 h-3 rounded-full bg-gray-300 mx-1 animate-pulse" />
          <View className="w-3 h-3 rounded-full bg-gray-300 mx-1 animate-pulse" />
          <View className="w-3 h-3 rounded-full bg-gray-300 mx-1 animate-pulse" />
        </View>
        
        {/* Botão alternativo para ir para rastreamento */}
        <TouchableOpacity
          className="mt-6 p-3"
          onPress={goToTracking}
        >
          <Text className="text-[#41B54A] font-bold underline">
            Ir para a tela de acompanhamento agora
          </Text>
        </TouchableOpacity>
      </Animated.View>
      
      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity
          className="bg-white border border-[#41B54A] rounded-lg p-4 items-center justify-center"
          onPress={goToHome}
        >
          <Text className="text-[#41B54A] font-bold text-lg">
            Voltar para a tela inicial
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderConfirmationScreen; 