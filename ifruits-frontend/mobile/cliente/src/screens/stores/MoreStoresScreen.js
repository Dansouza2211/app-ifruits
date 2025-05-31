import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  FlatList, 
  TextInput,
  StatusBar,
  ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';
import BottomTabBar from '../../components/BottomTabBar';

// Dados mockados para lojas (utilizando os mesmos dados da Home + mais lojas adicionais)
const storesList = [
  { 
    id: 's1', 
    name: 'Hortifruti da Terra',
    logo: require('../../assets/images/hortifruti-terra.png'),
    rating: 4.6,
    distance: '3,7 km',
    deliveryTime: '45-60 min',
    deliveryFee: 'Grátis',
    coupon: true,
    featured: true
  },
  { 
    id: 's2', 
    name: 'Hortifruti Central', 
    logo: require('../../assets/images/hortifruti-central.png'),
    rating: 4.2,
    distance: '5,2 km',
    deliveryTime: '40-55 min',
    deliveryFee: 'R$ 8,90',
    coupon: false,
    featured: false
  },
  { 
    id: 's3', 
    name: "Hortifruti Express", 
    logo: require('../../assets/images/hortifruti-express.png'),
    rating: 4.9,
    distance: '1,5 km',
    deliveryTime: '20-30 min',
    deliveryFee: 'R$ 4,90',
    coupon: true,
    featured: true
  },
  { 
    id: 's4', 
    name: 'Sou Hortifruti', 
    logo: require('../../assets/images/sou-hortifruti.png'),
    rating: 4.5,
    distance: '3,3 km',
    deliveryTime: '35-45 min',
    deliveryFee: 'Grátis',
    coupon: true,
    featured: false
  },
  { 
    id: 's5', 
    name: 'Hortifruti Sabor', 
    logo: require('../../assets/images/hortifruti-sabor.png'),
    rating: 4.7,
    distance: '2,2 km',
    deliveryTime: '30-40 min',
    deliveryFee: 'R$ 5,90',
    coupon: false,
    featured: false
  },
  { 
    id: 's6', 
    name: 'Hortifruti Prime', 
    logo: require('../../assets/images/hortifruti-prime.png'),
    rating: 4.8,
    distance: '4,0 km',
    deliveryTime: '35-50 min',
    deliveryFee: 'R$ 7,50',
    coupon: true,
    featured: true
  },
  { 
    id: 's7', 
    name: 'Hortifruti Delivery Express', 
    logo: require('../../assets/images/hortifruti-delivery.png'),
    rating: 4.4,
    distance: '3,9 km',
    deliveryTime: '40-55 min',
    deliveryFee: 'Grátis',
    coupon: true,
    featured: false
  },
];

// Categorias de filtros
const filterCategories = [
  { id: 'f1', name: 'Ordenar', icon: 'sort' },
  { id: 'f2', name: 'Entrega grátis', icon: 'tag-outline' },
  { id: 'f3', name: 'Vale-refeição', icon: 'card-outline' },
  { id: 'f4', name: 'Distância', icon: 'map-marker-outline' },
  { id: 'f5', name: 'Entrega iFruits', icon: 'moped' },
];

// Componente para filtro
const FilterItem = ({ item, onPress, isActive }) => (
  <TouchableOpacity 
    className={`flex-row items-center px-3 py-2 mr-2 rounded-full ${isActive ? 'bg-green-100' : 'bg-gray-100'}`}
    onPress={onPress}
  >
    <Icon 
      name={item.icon} 
      size={16} 
      color={isActive ? '#41B54A' : '#666'} 
      className="mr-1" 
    />
    <Text className={`text-sm ${isActive ? 'text-green-600 font-medium' : 'text-gray-600'}`}>{item.name}</Text>
  </TouchableOpacity>
);

// Componente para renderizar cada loja na lista
const StoreListItem = ({ item, onPress }) => (
  <TouchableOpacity 
    className="flex-row p-3 border-b border-gray-100"
    onPress={onPress}
  >
    <View className="w-16 h-16 rounded-xl mr-3 overflow-hidden bg-gray-100">
      <Image
        source={item.logo}
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
    <View className="flex-1">
      <View className="flex-row items-center justify-between">
        <Text className="font-bold text-gray-800">{item.name}</Text>
        {item.featured && (
          <View className="bg-yellow-100 rounded-full px-2 py-0.5">
            <Text className="text-yellow-700 text-xs font-medium">Destaque</Text>
          </View>
        )}
      </View>
      
      <View className="flex-row items-center mt-1">
        <Icon name="star" size={14} color="#FFD700" />
        <Text className="text-xs ml-1 mr-2 font-bold">{item.rating}</Text>
        <Text className="text-xs text-gray-500">Hortifruti • {item.distance}</Text>
      </View>
      
      <View className="flex-row items-center justify-between mt-2">
        <Text className="text-xs text-gray-500">{item.deliveryTime} • {item.deliveryFee}</Text>
        {item.coupon && (
          <View className="bg-blue-100 rounded-full px-2 py-1 flex-row items-center">
            <Icon name="ticket-percent-outline" size={12} color="#3B82F6" />
            <Text className="text-xs text-blue-600 ml-1">Cupom</Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

// Componente para barra de busca
const SearchBar = ({ value, onChangeText }) => (
  <View className="mx-4 my-3 flex-row items-center bg-gray-100 rounded-full px-4 py-2">
    <Icon name="magnify" size={20} color="#999" />
    <TextInput
      className="flex-1 ml-2 text-gray-800"
      placeholder="Buscar lojas..."
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
    />
    {value.length > 0 && (
      <TouchableOpacity onPress={() => onChangeText('')}>
        <Icon name="close-circle" size={20} color="#999" />
      </TouchableOpacity>
    )}
  </View>
);

export default function MoreStoresScreen({ navigation, route }) {
  const { title = "Últimas lojas" } = route.params || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Função para alternar filtros
  const toggleFilter = (filterId) => {
    if (activeFilters.includes(filterId)) {
      setActiveFilters(activeFilters.filter(id => id !== filterId));
    } else {
      setActiveFilters([...activeFilters, filterId]);
    }
  };
  
  // Filtrar lojas com base na busca
  const filteredStores = storesList.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Simulação de carregamento ao aplicar filtros
  const applyFilters = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header 
        title={title} 
        showBack={true}
        onBackPress={() => navigation.goBack()} 
        showMenu={true}
      />
      
      {/* Barra de busca */}
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      {/* Categorias de filtros */}
      <View className="mb-2">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        >
          {filterCategories.map(filter => (
            <FilterItem 
              key={filter.id} 
              item={filter} 
              isActive={activeFilters.includes(filter.id)}
              onPress={() => {
                toggleFilter(filter.id);
                applyFilters();
              }}
            />
          ))}
        </ScrollView>
      </View>
      
      {/* Lojas destaques */}
      {filteredStores.some(store => store.featured) && (
        <View className="mb-4">
          <Text className="px-4 mb-2 font-bold text-gray-800">Destaques</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
          >
            {filteredStores
              .filter(store => store.featured)
              .map(store => (
                <TouchableOpacity 
                  key={store.id}
                  className="mr-3 w-40 bg-white rounded-xl shadow-sm overflow-hidden"
                  onPress={() => navigation.navigate('Store', { store })}
                >
                  <View className="w-full h-24 bg-gray-200">
                    <Image
                      source={store.logo}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                    {store.coupon && (
                      <View className="absolute top-2 right-2 bg-blue-500 rounded-full px-2 py-0.5">
                        <Text className="text-white text-xs font-bold">CUPOM</Text>
                      </View>
                    )}
                  </View>
                  <View className="p-2">
                    <Text className="font-bold text-gray-800 mb-1" numberOfLines={1}>{store.name}</Text>
                    <View className="flex-row items-center">
                      <Icon name="star" size={12} color="#FFD700" />
                      <Text className="text-xs ml-1 mr-2 font-bold">{store.rating}</Text>
                      <Text className="text-xs text-gray-500">{store.distance}</Text>
                    </View>
                    <Text className="text-xs text-gray-500 mt-1">{store.deliveryTime}</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      )}
      
      {/* Lista de lojas */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#41B54A" />
          <Text className="mt-2 text-gray-500">Carregando lojas...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredStores}
          renderItem={({ item }) => (
            <StoreListItem 
              item={item} 
              onPress={() => navigation.navigate('Store', { store: item })}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center p-8">
              <Icon name="store-search-outline" size={60} color="#ddd" />
              <Text className="mt-4 text-gray-500 text-center">
                Nenhuma loja encontrada com os filtros selecionados.
              </Text>
            </View>
          }
        />
      )}
      
      {/* Bottom Tab Bar */}
      <BottomTabBar navigation={navigation} currentRoute="Home" />
    </SafeAreaView>
  );
} 