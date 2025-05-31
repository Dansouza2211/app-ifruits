import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';

// Componente para cartão de fidelidade
const LoyaltyCard = ({ store, points, goal, logo, onPress }) => {
  const progress = (points / goal) * 100;
  
  return (
    <TouchableOpacity 
      className="bg-white rounded-xl mb-4 overflow-hidden shadow-sm"
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View className="p-4">
        <View className="flex-row items-center">
          <Image 
            source={{ uri: logo }} 
            className="w-12 h-12 rounded-full"
            resizeMode="cover"
          />
          <View className="ml-3 flex-1">
            <Text className="font-bold text-gray-800 text-lg">{store}</Text>
            <Text className="text-gray-500">
              {points} de {goal} pontos
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color="#999" />
        </View>
        
        {/* Progress Bar */}
        <View className="h-3 bg-gray-100 rounded-full mt-4">
          <View 
            className="h-3 bg-green-500 rounded-full" 
            style={{ width: `${progress}%` }} 
          />
        </View>
        
        {/* Reward Info */}
        <View className="mt-3 flex-row items-center justify-between">
          <Text className="text-gray-500 text-sm">
            Faltam <Text className="font-bold text-primary">{goal - points}</Text> pontos
          </Text>
          <Text className="text-primary font-medium">1 compra = 1 ponto</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Componente para cartão de convite
const InviteCard = ({ onPress }) => (
  <TouchableOpacity 
    className="bg-white rounded-xl overflow-hidden shadow-sm mb-6"
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View className="p-4">
      <View className="flex-row items-center">
        <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center">
          <Icon name="account-multiple-plus" size={24} color="#41B54A" />
        </View>
        <View className="ml-3 flex-1">
          <Text className="font-bold text-gray-800 text-lg">Convide amigos</Text>
          <Text className="text-gray-500">
            Ganhe R$ 10,00 por cada indicação
          </Text>
        </View>
        <Icon name="chevron-right" size={24} color="#999" />
      </View>
    </View>
  </TouchableOpacity>
);

// Componente para cartão vazio
const EmptyLoyaltyCard = () => (
  <View className="bg-white rounded-xl overflow-hidden shadow-sm p-6 items-center justify-center mb-4">
    <Icon name="star-outline" size={50} color="#E0E0E0" />
    <Text className="text-gray-400 font-medium mt-3 text-center">
      Você ainda não possui fidelidades
    </Text>
    <Text className="text-gray-400 text-sm mt-1 text-center">
      Faça pedidos em lojas que oferecem programas de fidelidade
    </Text>
  </View>
);

export default function LoyaltyScreen({ navigation }) {
  // Dados de exemplo
  const loyaltyCards = [
    {
      id: 1,
      store: 'Hortifruti Santo Antônio',
      points: 8,
      goal: 10,
      logo: 'https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
    },
    {
      id: 2,
      store: 'Empório Hortifruti',
      points: 3,
      goal: 15,
      logo: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
    },
  ];

  // Navegação de volta
  const handleGoBack = () => {
    console.log('Voltando da tela de fidelidade');
    navigation.goBack();
  };
  
  // Navegação para a tela de convite
  const handleNavigateToInvite = () => {
    navigation.navigate('Invite');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header 
        title="Fidelidade" 
        showBack={true}
        onBackPress={handleGoBack}
        showMenu={true}
      />
      
      <ScrollView className="flex-1 px-4 pt-4">
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-1">Minhas fidelidades</Text>
          <Text className="text-gray-500">
            Acumule pontos e ganhe benefícios nas suas lojas favoritas
          </Text>
        </View>
        
        <InviteCard onPress={handleNavigateToInvite} />
        
        {loyaltyCards.length > 0 ? (
          loyaltyCards.map(card => (
            <LoyaltyCard
              key={card.id}
              store={card.store}
              points={card.points}
              goal={card.goal}
              logo={card.logo}
              onPress={() => {}}
            />
          ))
        ) : (
          <EmptyLoyaltyCard />
        )}
        
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
} 