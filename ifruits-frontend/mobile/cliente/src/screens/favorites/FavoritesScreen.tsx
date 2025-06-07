import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';

// Componente para loja favorita
const FavoriteStoreCard = ({ store, onPress, onRemove }) => {
  return (
    <TouchableOpacity 
      className="bg-white rounded-xl mb-4 overflow-hidden shadow-sm"
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View className="p-4">
        <View className="flex-row items-center">
          <Image 
            source={{ uri: store.logo }} 
            className="w-16 h-16 rounded-lg"
            resizeMode="cover"
          />
          <View className="ml-3 flex-1">
            <Text className="font-bold text-gray-800 text-base">{store.name}</Text>
            
            <View className="flex-row items-center mt-1">
              <Icon name="star" size={16} color="#FFD700" />
              <Text className="ml-1 text-gray-600 text-sm">{store.rating} • {store.category}</Text>
            </View>
            
            <View className="flex-row items-center mt-1">
              <Icon name="map-marker" size={14} color="#999" />
              <Text className="ml-1 text-gray-500 text-xs">{store.distance}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            onPress={() => onRemove(store.id)}
            className="p-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="heart" size={24} color="#FF5757" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Componente para barra de pesquisa
const SearchBar = ({ value, onChangeText }) => {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2 mb-6">
      <Icon name="magnify" size={20} color="#666" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar em favoritos"
        className="flex-1 ml-2 text-gray-700"
      />
      {value !== '' && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Icon name="close-circle" size={18} color="#999" />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Componente para estado vazio
const EmptyState = () => (
  <View className="items-center justify-center py-8">
    <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-4">
      <Icon name="heart-outline" size={32} color="#CCC" />
    </View>
    <Text className="text-gray-400 font-medium text-center">
      Você ainda não tem favoritos
    </Text>
    <Text className="text-gray-400 text-sm text-center mt-1">
      Salve seus locais favoritos para acessá-los rapidamente
    </Text>
  </View>
);

export default function FavoritesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dados de exemplo de lojas favoritas
  const [favoriteStores, setFavoriteStores] = useState([
    {
      id: 1,
      name: 'Hortifruti Santo Antônio',
      logo: 'https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
      rating: 4.8,
      category: 'Frutas e Legumes',
      distance: '2,7 km'
    },
    {
      id: 2,
      name: 'Empório Hortifruti',
      logo: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
      rating: 4.5,
      category: 'Mercearia',
      distance: '3,2 km'
    },
    {
      id: 3,
      name: 'HortiFruti Central',
      logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
      rating: 4.7,
      category: 'Mercado',
      distance: '1,8 km'
    },
  ]);

  // Filtra favoritos com base na pesquisa
  const filteredFavorites = favoriteStores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Remove um favorito
  const handleRemoveFavorite = (id) => {
    setFavoriteStores(prev => prev.filter(store => store.id !== id));
  };

  // Navegação de volta
  const handleGoBack = () => {
    console.log('Voltando da tela de favoritos');
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header 
        title="Favoritos" 
        showBack={true}
        onBackPress={handleGoBack}
        showMenu={true}
      />
      
      <ScrollView className="flex-1 px-4 pt-4">
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-1">Meus locais favoritos</Text>
          <Text className="text-gray-500">
            Acesse rapidamente os estabelecimentos que você mais gosta
          </Text>
        </View>
        
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map(store => (
            <FavoriteStoreCard
              key={store.id}
              store={store}
              onPress={() => {}}
              onRemove={handleRemoveFavorite}
            />
          ))
        ) : (
          <EmptyState />
        )}
        
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
} 