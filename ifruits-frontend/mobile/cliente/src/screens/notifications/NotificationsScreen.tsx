import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Dados de exemplo para notificações
const notificationsData = [
  {
    id: 1,
    title: 'Indique e ganhe!',
    message: 'Convide um amigo e ganhe recompensas!',
    icon: 'gift-outline',
    time: '2 min atrás',
    read: false,
  },
  {
    id: 2,
    title: 'Pedido cancelado',
    message: 'O pedido #129876 foi cancelado.',
    icon: 'package-variant-closed',
    time: '30 min atrás',
    read: false,
  },
  {
    id: 3,
    title: 'HortiFruti Maçã Verde',
    message: 'Estou na portaria aguardando.',
    icon: 'truck-delivery-outline',
    time: '1 hora atrás',
    read: true,
  },
];

export default function NotificationsScreen({ navigation }) {
  console.log('Renderizando tela de notificações');
  
  // Função para voltar
  const handleGoBack = () => {
    console.log('Voltando da tela de notificações');
    navigation.goBack();
  };
  
  const renderNotification = ({ item }) => (
    <TouchableOpacity 
      className={`flex-row px-4 py-3 items-center border-b border-gray-100 ${!item.read ? 'bg-green-50' : ''}`}
    >
      <View className="w-10 h-10 rounded-full bg-primary items-center justify-center mr-3">
        <Icon name={item.icon} size={20} color="#FFF" />
      </View>
      <View className="flex-1">
        <Text className={`${!item.read ? 'font-bold' : 'font-medium'} text-gray-800`}>{item.title}</Text>
        <Text className="text-gray-500 text-sm">{item.message}</Text>
      </View>
      <Text className="text-gray-400 text-xs">{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity 
          onPress={handleGoBack}
          className="mr-3"
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-800">Notificações</Text>
        <View className="ml-2 bg-primary px-2 py-0.5 rounded-full">
          <Text className="text-white text-xs">2</Text>
        </View>
      </View>
      
      <FlatList
        data={notificationsData}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
} 