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

// Dados mockados para lojas famosas (utilizando os mesmos dados da Home + mais lojas adicionais)
const famousStoresList = [
  { 
    id: 'fs1', 
    name: 'Hortifruti Antônio', 
    logo: require('../../assets/images/hortifruti-antonio.png'),
    banner: require('../../assets/images/banner-antonio.png'),
    rating: 4.7,
    distance: '1,5 km',
    deliveryTime: '25-35 min',
    deliveryFee: 'R$ 5,90',
    coupon: true,
    featured: true,
    verified: true
  },
  { 
    id: 'fs2', 
    name: 'Empório Hortifruti', 
    logo: require('../../assets/images/emporio-hortifruti.png'),
    banner: require('../../assets/images/banner-emporio.png'),
    rating: 4.9,
    distance: '2,8 km',
    deliveryTime: '35-45 min',
    deliveryFee: 'Grátis',
    coupon: true,
    featured: true,
    verified: true
  },
  { 
    id: 'fs3', 
    name: 'Império Hortifruti', 
    logo: require('../../assets/images/imperio-hortifruti.png'),
    banner: require('../../assets/images/banner-imperio.png'),
    rating: 4.6,
    distance: '3,2 km',
    deliveryTime: '30-45 min',
    deliveryFee: 'R$ 6,90',
    coupon: false,
    featured: true,
    verified: true
  },
  { 
    id: 'fs4', 
    name: 'Celeiro das Frutas', 
    logo: require('../../assets/images/celeiro-frutas.png'),
    banner: require('../../assets/images/banner-celeiro.png'),
    rating: 4.5,
    distance: '4,0 km',
    deliveryTime: '40-55 min',
    deliveryFee: 'R$ 7,90',
    coupon: false,
    featured: false,
    verified: true
  },
  { 
    id: 'fs5', 
    name: 'Hortifruti Mais Você', 
    logo: require('../../assets/images/hortifruti-voce.png'),
    banner: require('../../assets/images/banner-voce.png'),
    rating: 4.8,
    distance: '2,2 km',
    deliveryTime: '30-40 min',
    deliveryFee: 'Grátis',
    coupon: true,
    featured: false,
    verified: true
  },
  { 
    id: 'fs6', 
    name: 'Frutas do Campo', 
    logo: require('../../assets/images/frutas-campo.png'),
    banner: require('../../assets/images/banner-campo.png'),
    rating: 4.3,
    distance: '5,5 km',
    deliveryTime: '45-60 min',
    deliveryFee: 'R$ 8,90',
    coupon: false,
    featured: false,
    verified: false
  },
  { 
    id: 'fs7', 
    name: 'Verdura Fácil', 
    logo: require('../../assets/images/verdura-facil.png'),
    banner: require('../../assets/images/banner-verdura.png'),
    rating: 4.4,
    distance: '3,8 km',
    deliveryTime: '35-50 min',
    deliveryFee: 'R$ 6,50',
    coupon: true,
    featured: false,
    verified: false
  },
  { 
    id: 'fs8', 
    name: 'Frutas & Cia', 
    logo: require('../../assets/images/frutas-cia.png'),
    banner: require('../../assets/images/banner-cia.png'),
    rating: 4.7,
    distance: '2,7 km',
    deliveryTime: '30-45 min',
    deliveryFee: 'Grátis',
    coupon: true,
    featured: true,
    verified: true
  },
  { 
    id: 'fs9', 
    name: 'Hortifruti Mercado', 
    logo: require('../../assets/images/hortifruti-mercado.png'),
    banner: require('../../assets/images/banner-mercado.png'),
    rating: 4.5,
    distance: '4,3 km',
    deliveryTime: '40-60 min',
    deliveryFee: 'R$ 7,50',
    coupon: false,
    featured: false,
    verified: true
  },
  { 
    id: 'fs10', 
    name: 'Verdes & Cia', 
    logo: require('../../assets/images/verdes-cia.png'),
    banner: require('../../assets/images/banner-verdes.png'),
    rating: 4.6,
    distance: '3,1 km',
    deliveryTime: '35-50 min',
    deliveryFee: 'Grátis',
    coupon: true,
    featured: false,
    verified: true
  },
  { 
    id: 'fs11', 
    name: 'Rede Verde Hortifrutti', 
    logo: require('../../assets/images/rede-verde.png'),
    banner: require('../../assets/images/banner-rede.png'),
    rating: 4.8,
    distance: '2,4 km',
    deliveryTime: '30-40 min',
    deliveryFee: 'R$ 5,90',
    coupon: true,
    featured: true,
    verified: true
  },
];

// Categorias de filtros
const filterCategories = [
  { id: 'f1', name: 'Ordenar', icon: 'sort' },
  { id: 'f2', name: 'Entrega grátis', icon: 'tag-outline' },
  { id: 'f3', name: 'Cupons', icon: 'ticket-percent-outline' },
  { id: 'f4', name: 'Distância', icon: 'map-marker-outline' },
  { id: 'f5', name: 'Verificados', icon: 'check-decagram' },
];

// Componente para item de categoria
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

// Componente para item da lista de lojas
const StoreListItem = ({ item, onPress }) => (
  <TouchableOpacity 
    className="mb-4 mx-4 bg-white rounded-xl overflow-hidden shadow-sm"
    onPress={onPress}
  >
    {/* Banner da loja */}
    <View className="relative">
      <Image 
        source={item.banner} 
        className="w-full h-32" 
        resizeMode="cover" 
      />
      {/* Logo da loja sobreposto */}
      <View className="absolute -bottom-8 left-4 bg-white p-1 rounded-xl shadow-md">
        <Image 
          source={item.logo} 
          className="w-16 h-16 rounded-xl" 
          resizeMode="cover" 
        />
      </View>
      {/* Badge de verificado */}
      {item.verified && (
        <View className="absolute top-2 right-2 bg-white rounded-full p-1.5">
          <Icon name="check-decagram" size={18} color="#41B54A" />
        </View>
      )}
    </View>
    
    {/* Detalhes da loja */}
    <View className="p-4 pt-10">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="font-bold text-lg text-gray-800">{item.name}</Text>
          
          <View className="flex-row items-center mt-1">
            <Icon name="star" size={14} color="#FFD700" />
            <Text className="text-xs ml-1 mr-2 font-bold">{item.rating}</Text>
            <Text className="text-xs text-gray-500">Hortifruti • {item.distance}</Text>
          </View>
          
          <View className="flex-row items-center justify-between mt-2">
            <View className="flex-row items-center">
              <Icon name="clock-outline" size={12} color="#666" />
              <Text className="text-xs text-gray-500 ml-1">{item.deliveryTime}</Text>
            </View>
            
            <View className="flex-row items-center ml-4">
              <Icon name="truck-delivery-outline" size={12} color="#666" />
              <Text className="text-xs text-gray-500 ml-1">{item.deliveryFee}</Text>
            </View>
          </View>
        </View>
        
        {item.coupon && (
          <View className="bg-blue-100 p-2 rounded-lg ml-2">
            <Icon name="ticket-percent" size={20} color="#3B82F6" />
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
      placeholder="Buscar entre os famosos..."
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

export default function FamousStoresScreen({ navigation }) {
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
  const filteredStores = famousStoresList.filter(store => 
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
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header 
        title="Famosos no iFruits" 
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
      <View className="mb-4">
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
      
      {/* Destaques famosos */}
      {filteredStores.some(store => store.featured) && !isLoading && (
        <View className="mb-4">
          <Text className="px-4 mb-2 font-bold text-gray-800">Mais Populares</Text>
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
                  className="mr-3 w-56 bg-white rounded-xl shadow-sm overflow-hidden"
                  onPress={() => navigation.navigate('Store', { store })}
                >
                  <Image 
                    source={store.banner} 
                    className="w-full h-24" 
                    resizeMode="cover" 
                  />
                  <View className="p-3 flex-row">
                    <Image 
                      source={store.logo} 
                      className="w-12 h-12 rounded-lg mr-2" 
                      resizeMode="cover" 
                    />
                    <View className="flex-1">
                      <Text className="font-bold text-gray-800 mb-1" numberOfLines={1}>{store.name}</Text>
                      <View className="flex-row items-center">
                        <Icon name="star" size={12} color="#FFD700" />
                        <Text className="text-xs ml-1 mr-2 font-bold">{store.rating}</Text>
                        <Text className="text-xs text-gray-500">{store.distance}</Text>
                      </View>
                      {store.coupon && (
                        <View className="flex-row items-center mt-1">
                          <Icon name="ticket-percent-outline" size={10} color="#3B82F6" />
                          <Text className="text-xs text-blue-500 ml-1">Cupom disponível</Text>
                        </View>
                      )}
                    </View>
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