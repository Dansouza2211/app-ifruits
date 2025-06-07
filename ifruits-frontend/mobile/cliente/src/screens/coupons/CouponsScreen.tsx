import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp } from 'react-native-reanimated';

// Dados mockados
const activeCoupons = [
  {
    id: 'c1',
    value: 'R$10',
    description: 'para compras em mercado',
    explanation: 'Válido para compras acima de R$50 em qualquer hortifruti',
    expiration: '20/06/2023'
  },
  {
    id: 'c2',
    value: 'R$30',
    description: 'para compras em mercado',
    explanation: 'Válido para compras acima de R$150 em qualquer hortifruti',
    expiration: '30/06/2023'
  }
];

const usedCoupons = [
  {
    id: 'c3',
    value: 'R$5',
    description: 'para compras em mercado',
    explanation: 'Válido para compras acima de R$25 em qualquer hortifruti',
    expiration: '10/05/2023'
  }
];

// Componente para cupom
const CouponItem = ({ item, isUsed }) => (
  <Animated.View 
    entering={FadeInUp.delay(200).duration(400)}
    className="bg-white rounded-xl shadow-sm mb-4 border border-gray-100 p-4"
  >
    <View className="flex-row items-center pb-3 border-b border-gray-100 mb-3">
      <View className="mr-2">
        <Icon name="ticket-percent-outline" size={20} color={isUsed ? "#ccc" : "#41B54A"} />
      </View>
      <Text className={`font-medium ${isUsed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
        {item.value} {item.description}
      </Text>
    </View>
    
    <Text className="text-gray-500 text-sm mb-3">{item.explanation}</Text>
    
    <View className="flex-row justify-between items-center">
      <Text className="text-xs text-gray-400">Válido até: {item.expiration}</Text>
      
      {!isUsed && (
        <TouchableOpacity className="border border-green-500 rounded-md px-3 py-1.5">
          <Text className="text-green-600 text-sm font-medium">Ver Mercados</Text>
        </TouchableOpacity>
      )}
    </View>
  </Animated.View>
);

// Componentes para estados vazios
const EmptyCoupons = ({ activeTab }) => (
  <View className="flex-1 items-center justify-center p-8">
    <Icon name="ticket-outline" size={60} color="#E0E0E0" />
    <Text className="text-gray-400 text-base text-center mt-4">
      {activeTab === 'active' 
        ? 'Nenhum cupom disponível no momento' 
        : 'Você ainda não utilizou nenhum cupom'}
    </Text>
    
    {activeTab === 'active' && (
      <TouchableOpacity className="mt-4 bg-green-500 py-2 px-4 rounded-full">
        <Text className="text-white font-medium">Explorar hortifrútis</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default function CouponsScreen({ navigation }) {
  console.log('Renderizando tela de cupons');
  const [activeTab, setActiveTab] = useState('active'); // 'active' ou 'used'
  
  // Função para voltar
  const handleGoBack = () => {
    console.log('Voltando da tela de cupons');
    navigation.goBack();
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity 
          onPress={handleGoBack}
          className="mr-3"
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-800">Cupons</Text>
      </View>
      
      {/* Tabs */}
      <View className="flex-row border-b border-gray-100">
        <TouchableOpacity 
          className={`flex-1 py-4 items-center ${activeTab === 'active' ? 'border-b-2 border-green-500' : ''}`}
          onPress={() => setActiveTab('active')}
        >
          <Text className={`${activeTab === 'active' ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
            Cupons Ativos
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className={`flex-1 py-4 items-center ${activeTab === 'used' ? 'border-b-2 border-green-500' : ''}`}
          onPress={() => setActiveTab('used')}
        >
          <Text className={`${activeTab === 'used' ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
            Cupons Usados
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Conteúdo */}
      <FlatList
        data={activeTab === 'active' ? activeCoupons : usedCoupons}
        renderItem={({ item }) => <CouponItem item={item} isUsed={activeTab === 'used'} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        ListEmptyComponent={<EmptyCoupons activeTab={activeTab} />}
      />
    </SafeAreaView>
  );
} 