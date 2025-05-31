import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

// Dados mockados para categorias
const categories = [
  { id: 'c1', name: 'Frutas', icon: 'fruit-cherries' },
  { id: 'c2', name: 'Legumes', icon: 'carrot' },
  { id: 'c3', name: 'Verduras', icon: 'leaf' },
  { id: 'c4', name: 'Temperos', icon: 'shaker-outline' },
  { id: 'c5', name: 'Orgânicos', icon: 'sprout' },
  { id: 'c6', name: 'Kits', icon: 'basket-outline' },
];

// Dados mockados para lojas
const stores = [
  { 
    id: 's1',
    name: 'Hortifruti Santo Antônio',
    logo: 'H',
    rating: 4.7,
    reviewCount: 258,
    distance: '1.2 km',
    deliveryFee: 'Grátis',
    deliveryTime: '20-30 min',
    featured: true
  },
  {
    id: 's2',
    name: 'Empório Verde',
    logo: 'E',
    rating: 4.5,
    reviewCount: 120,
    distance: '2.4 km',
    deliveryFee: 'R$ 5,90',
    deliveryTime: '25-40 min',
    featured: false
  },
  {
    id: 's3',
    name: 'Hortifruti Central',
    logo: 'H',
    rating: 4.9,
    reviewCount: 345,
    distance: '3.1 km',
    deliveryFee: 'R$ 3,90',
    deliveryTime: '30-45 min',
    featured: true
  }
];

// Componente para categoria
const CategoryItem = ({ item, onPress, isSelected }) => (
  <TouchableOpacity 
    onPress={onPress}
    className={`items-center mr-4 ${isSelected ? 'opacity-100' : 'opacity-60'}`}
  >
    <View className={`w-16 h-16 rounded-full ${isSelected ? 'bg-primary' : 'bg-gray-100'} items-center justify-center mb-1`}>
      <Icon name={item.icon} size={24} color={isSelected ? '#fff' : '#41B54A'} />
    </View>
    <Text className={`text-xs ${isSelected ? 'text-primary font-medium' : 'text-gray-700'}`}>{item.name}</Text>
  </TouchableOpacity>
);

// Componente para loja
const StoreItem = ({ item, navigation }) => (
  <Animated.View 
    entering={FadeInUp.delay(200).duration(400)}
    className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden border border-gray-100"
  >
    <TouchableOpacity 
      className="p-4"
      onPress={() => navigation.navigate('StoreDetail', { storeId: item.id })}
    >
      <View className="flex-row">
        <View className="w-12 h-12 rounded-full bg-primary items-center justify-center mr-3">
          <Text className="text-white font-bold text-lg">{item.logo}</Text>
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-gray-800 text-base">{item.name}</Text>
          <View className="flex-row items-center mt-1">
            <Icon name="star" size={16} color="#FFB800" />
            <Text className="text-gray-600 text-sm ml-1">{item.rating}</Text>
            <Text className="text-gray-400 text-xs ml-1">({item.reviewCount})</Text>
            <View className="w-1 h-1 bg-gray-300 rounded-full mx-2" />
            <Text className="text-gray-400 text-xs">{item.distance}</Text>
          </View>
        </View>
        {item.featured && (
          <View className="bg-green-100 px-2 py-1 rounded-full h-6 self-start">
            <Text className="text-primary text-xs font-medium">Destaque</Text>
          </View>
        )}
      </View>
      
      <View className="flex-row mt-3 bg-gray-50 p-2 rounded-lg">
        <View className="flex-1 flex-row items-center">
          <Icon name="bike-fast" size={16} color="#666" />
          <Text className="text-gray-500 text-xs ml-1">{item.deliveryFee}</Text>
        </View>
        <View className="w-0.5 h-4 bg-gray-200 mx-2 self-center" />
        <View className="flex-1 flex-row items-center">
          <Icon name="clock-outline" size={16} color="#666" />
          <Text className="text-gray-500 text-xs ml-1">{item.deliveryTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  </Animated.View>
);

// Tela principal de busca
export default function SearchScreen({ navigation }) {
  console.log('Renderizando tela de busca');
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Renderiza lista de categorias
  const renderCategories = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="mb-4"
    >
      {categories.map(category => (
        <CategoryItem 
          key={category.id}
          item={category}
          onPress={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
          isSelected={category.id === selectedCategory}
        />
      ))}
    </ScrollView>
  );
  
  // Renderiza lista de lojas
  const renderStores = () => (
    <View>
      <Text className="text-lg font-semibold text-gray-800 mb-3">Hortifrútis próximos</Text>
      {stores.map(store => (
        <StoreItem key={store.id} item={store} navigation={navigation} />
      ))}
    </View>
  );
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header com barra de busca */}
      <Animated.View 
        entering={FadeInDown.duration(400)}
        className="px-4 py-4 bg-white"
      >
        <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2.5">
          <Icon name="magnify" size={20} color="#666" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Buscar hortifruti, produto ou endereço"
            className="flex-1 ml-2 text-gray-700"
          />
          {searchText !== '' && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Icon name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
      
      {/* Conteúdo */}
      <ScrollView className="flex-1 px-4">
        {/* Seção de categorias */}
        <View className="my-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Categorias</Text>
          {renderCategories()}
        </View>
        
        {/* Seção de lojas */}
        {renderStores()}
        
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
} 