import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dados mockados para pedidos
const ordersData = [
  {
    id: 'o1',
    storeId: 's1',
    storeName: 'Hortifruti Santo Antônio',
    status: 'delivered',
    statusText: 'Entregue',
    date: '15/05/2023',
    time: '14:30',
    total: 'R$ 45,90',
    items: [
      { name: 'Maçã Fuji', quantity: 2, price: 'R$ 12,80' },
      { name: 'Banana Prata', quantity: 1, price: 'R$ 8,90' },
      { name: 'Alface Crespa', quantity: 1, price: 'R$ 3,50' }
    ]
  },
  {
    id: 'o2',
    storeId: 's3',
    storeName: 'Hortifruti Central',
    status: 'delivered',
    statusText: 'Entregue',
    date: '10/05/2023',
    time: '11:20',
    total: 'R$ 32,50',
    items: [
      { name: 'Tomate', quantity: 1, price: 'R$ 9,90' },
      { name: 'Cebola', quantity: 1, price: 'R$ 6,50' },
      { name: 'Batata', quantity: 1, price: 'R$ 7,90' }
    ]
  }
];

// Pedido ativo mockado (em andamento)
const activeOrder = {
  id: 'o3',
  orderNumber: '1462',
  storeId: 's2',
  storeName: 'Burger King - Águas Claras',
  status: 'ontheway',
  statusText: 'A caminho',
  date: 'Hoje',
  time: '15:45',
  total: 39.80,
  estimatedTime: '10-20 min',
  address: {
    street: 'St. Hab. Vicente Pires Chácara 225',
    number: '33',
    neighborhood: 'Taguatinga',
    city: 'Brasília',
    state: 'DF'
  },
  items: [
    { name: 'Whopper', quantity: 1, price: 'R$ 24,90' },
    { name: 'Batata média', quantity: 1, price: 'R$ 9,90' },
    { name: 'Refrigerante', quantity: 1, price: 'R$ 5,00' }
  ]
};

// Componente para mostrar um pedido
const OrderItem = ({ order }) => (
  <Animated.View 
    entering={FadeInUp.delay(200).duration(400)}
    className="bg-white rounded-lg overflow-hidden border border-gray-100 mb-4"
  >
    <View className="p-4 border-b border-gray-100">
      <View className="flex-row justify-between mb-2">
        <Text className="font-bold">{order.storeName}</Text>
        <View className="bg-green-100 px-2 py-0.5 rounded-full">
          <Text className="text-green-600 text-xs">{order.statusText}</Text>
        </View>
      </View>
      
      <View className="flex-row justify-between">
        <Text className="text-gray-500 text-sm">{order.date} • {order.time}</Text>
        <Text className="font-medium">{order.total}</Text>
      </View>
    </View>
    
    <View className="p-4">
      <Text className="font-medium mb-2">Itens do pedido:</Text>
      {order.items.map((item, index) => (
        <View key={index} className="flex-row justify-between mb-1">
          <Text className="text-gray-600">{item.quantity}x {item.name}</Text>
          <Text className="text-gray-600">{item.price}</Text>
        </View>
      ))}
    </View>
    
    <View className="flex-row border-t border-gray-100">
      <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
        <View className="mr-1">
          <Icon name="refresh" size={16} color="#41B54A" />
        </View>
        <Text className="text-green-600 font-medium">Repetir pedido</Text>
      </TouchableOpacity>
      
      <View className="w-px bg-gray-100" />
      
      <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
        <View className="mr-1">
          <Icon name="information-outline" size={16} color="#41B54A" />
        </View>
        <Text className="text-green-600 font-medium">Detalhes</Text>
      </TouchableOpacity>
    </View>
  </Animated.View>
);

// Componente para pedido ativo
const ActiveOrderCard = ({ order, onTrack }) => (
  <Animated.View 
    entering={FadeInUp.delay(100).duration(400)}
    className="bg-white rounded-lg overflow-hidden border border-[#41B54A] mb-4 shadow-sm"
  >
    <View className="bg-[#41B54A] p-3">
      <Text className="text-white font-bold">Pedido em andamento</Text>
    </View>
    
    <View className="p-4 border-b border-gray-100">
      <View className="flex-row justify-between mb-2">
        <Text className="font-bold">{order.storeName}</Text>
        <Text className="text-[#41B54A] font-medium">#{order.orderNumber}</Text>
      </View>
      
      <View className="flex-row justify-between">
        <Text className="text-gray-500 text-sm">{order.date} • {order.time}</Text>
        <Text className="font-medium">R$ {order.total.toFixed(2).replace('.', ',')}</Text>
      </View>
      
      <View className="mt-3 bg-green-50 p-2 rounded-md flex-row items-center">
        <Icon name="clock-outline" size={16} color="#41B54A" />
        <Text className="text-[#41B54A] ml-2">Entrega estimada: {order.estimatedTime}</Text>
      </View>
    </View>
    
    <TouchableOpacity 
      className="p-3 flex-row items-center justify-center bg-[#41B54A]"
      onPress={onTrack}
    >
      <Icon name="map-marker" size={20} color="white" />
      <Text className="text-white font-bold ml-2">ACOMPANHAR PEDIDO</Text>
    </TouchableOpacity>
  </Animated.View>
);

// Componente para estado vazio
const EmptyOrders = () => (
  <View className="flex-1 items-center justify-center p-8">
    <Icon name="clipboard-outline" size={60} color="#E0E0E0" />
    <Text className="text-gray-400 text-base text-center mt-4">
      Você ainda não realizou nenhum pedido
    </Text>
    <TouchableOpacity className="mt-4 bg-primary py-2 px-4 rounded-full">
      <Text className="text-white font-medium">Explorar lojas</Text>
    </TouchableOpacity>
  </View>
);

const OrdersScreen = () => {
  const navigation = useNavigation();
  const [hasActiveOrder, setHasActiveOrder] = useState(true);
  const [activeOrderData, setActiveOrderData] = useState(activeOrder);
  
  // Verificar se há um pedido ativo salvo
  const checkActiveOrder = async () => {
    try {
      const savedOrder = await AsyncStorage.getItem('activeOrder');
      console.log('Verificando pedido ativo:', savedOrder);
      
      if (savedOrder) {
        const orderData = JSON.parse(savedOrder);
        console.log('Pedido ativo encontrado:', orderData);
        
        // Atualizar o estado com os dados do pedido
        setActiveOrderData({
          ...activeOrder,
          orderNumber: orderData.orderNumber,
          storeName: orderData.restaurantName,
          total: orderData.total,
          address: orderData.address,
          estimatedTime: orderData.deliveryTime || '10-20 min'
        });
        
        setHasActiveOrder(true);
        
        // Navegar para a tela de rastreamento automaticamente
        navigation.navigate('OrderTracking', {
          orderNumber: orderData.orderNumber,
          restaurantName: orderData.restaurantName,
          total: orderData.total,
          address: orderData.address
        });
        
        // Limpar o pedido ativo após navegar
        await AsyncStorage.removeItem('activeOrder');
      }
    } catch (error) {
      console.error('Erro ao verificar pedido ativo:', error);
    }
  };
  
  // Efeito para verificar mudanças no status do pedido ativo
  useEffect(() => {
    // Adicionar um listener para quando a tela receber foco
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('OrdersScreen recebeu foco');
      // Verificar se há um pedido ativo salvo
      checkActiveOrder();
    });
    
    return unsubscribe;
  }, [navigation]);
  
  // Navegar para a tela de rastreamento para testar
  const goToOrderTracking = () => {
    // Navegar para a tela de rastreamento que está na OrdersStack
    navigation.navigate('OrderTracking', {
      orderNumber: activeOrderData.orderNumber,
      restaurantName: activeOrderData.storeName,
      total: activeOrderData.total,
      address: activeOrderData.address
    });
  };
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Cabeçalho */}
      <View className="p-4 bg-white border-b border-gray-100">
        <Text className="text-2xl font-bold">Pedidos</Text>
      </View>
      
      <ScrollView className="flex-1 p-4">
        {/* Pedido ativo */}
        {hasActiveOrder && (
          <ActiveOrderCard order={activeOrderData} onTrack={goToOrderTracking} />
        )}
        
        {/* Histórico de pedidos */}
        <View className="mb-3 mt-2">
          <Text className="text-lg font-bold text-gray-800">Histórico</Text>
        </View>
        
        {/* Lista de pedidos mockados */}
        {ordersData.map(order => (
          <OrderItem key={order.id} order={order} />
        ))}
        
        {/* Botão de teste para tela de rastreamento */}
        <TouchableOpacity
          onPress={goToOrderTracking}
          className="bg-[#41B54A] py-3 px-4 my-4 rounded-lg"
        >
          <Text className="text-white font-bold text-center">
            Testar Tela de Rastreamento
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersScreen; 