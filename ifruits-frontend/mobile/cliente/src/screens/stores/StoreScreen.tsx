import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  StatusBar,
  TextInput,
  FlatList,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../../contexts/CartContext';

const { width } = Dimensions.get('window');

// Dados mockados para categorias
const categories = [
  { id: 'cat1', name: 'Destaques', active: true },
  { id: 'cat2', name: 'Frutas', active: false },
  { id: 'cat3', name: 'Legumes', active: false },
  { id: 'cat4', name: 'Verduras', active: false },
  { id: 'cat5', name: 'Orgânicos', active: false },
  { id: 'cat6', name: 'Kits', active: false },
  { id: 'cat7', name: 'Promoções', active: false },
];

// Dados mockados para produtos
const products = [
  {
    id: 'p1',
    name: 'Maçã Gala',
    description: 'Maçã fresca da estação - Valor referente a unidade',
    price: 2.99,
    image: require('../../assets/images/produtos/maca.png'),
    weight: '1 unidade (aprox. 150g)',
    category: 'cat2',
    featured: true
  },
  {
    id: 'p2',
    name: 'Banana Prata',
    description: 'Banana prata fresca - Valor referente ao kg',
    price: 5.90,
    image: require('../../assets/images/produtos/banana.png'),
    weight: '1kg (aprox. 10 unidades)',
    category: 'cat2',
    featured: true
  },
  {
    id: 'p3',
    name: 'Tomate Italiano',
    description: 'Tomate para molho - Valor referente ao kg',
    price: 7.50,
    image: require('../../assets/images/produtos/tomate.png'),
    weight: '1kg (aprox. 6 unidades)',
    category: 'cat3',
    featured: true
  },
  {
    id: 'p4',
    name: 'Alface Crespa',
    description: 'Alface crespa orgânica - Unidade',
    price: 3.50,
    image: require('../../assets/images/produtos/alface.png'),
    weight: '1 unidade (aprox. 300g)',
    category: 'cat4',
    featured: false
  },
  {
    id: 'p5',
    name: 'Cebola',
    description: 'Cebola branca - Valor referente ao kg',
    price: 4.99,
    image: require('../../assets/images/produtos/cebola.png'),
    weight: '1kg (aprox. 8 unidades)',
    category: 'cat3',
    featured: false
  },
  {
    id: 'p6',
    name: 'Kit Salada',
    description: 'Alface, tomate, cebola, pepino e cenoura',
    price: 19.90,
    image: require('../../assets/images/produtos/kit_salada.png'),
    weight: '1 kit (aprox. 1.2kg)',
    category: 'cat6',
    featured: true
  },
  {
    id: 'p7',
    name: 'Uva sem Semente',
    description: 'Uva verde sem semente - Valor referente ao kg',
    price: 12.90,
    image: require('../../assets/images/produtos/uva.png'),
    weight: '1kg (aprox. 3 cachos)',
    category: 'cat2',
    featured: true
  },
];

// Componente para exibir o cabeçalho da loja
const StoreHeader = ({ store, scrollY }) => {
  const navigation = useNavigation();
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150, 200],
    outputRange: [0, 0.8, 1],
    extrapolate: 'clamp',
  });
  
  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 150, 200],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });
  
  return (
    <>
      <Animated.View 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          backgroundColor: '#fff',
          zIndex: 1000,
          opacity: headerOpacity,
          paddingTop: 10,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Animated.View 
          style={{
            flex: 1,
            opacity: titleOpacity,
            alignItems: 'center',
          }}
        >
          <Text numberOfLines={1} className="text-lg font-bold ml-4">{store.name}</Text>
        </Animated.View>
        <View className="flex-row">
          <TouchableOpacity className="mr-4">
            <Icon name="magnify" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="heart-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      <View className="w-full h-48">
        <Image
          source={store.banner}
          className="w-full h-full"
          resizeMode="cover"
        />
        <TouchableOpacity 
          className="absolute top-10 left-4 bg-white rounded-full p-2"
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <View className="absolute top-10 right-4 flex-row">
          <TouchableOpacity className="bg-white rounded-full p-2 mr-2">
            <Icon name="magnify" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-white rounded-full p-2">
            <Icon name="heart-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

// Componente para exibir as informações da loja
const StoreInfo = ({ store }) => (
  <View className="bg-white px-4 pt-3 pb-4">
    <View className="flex-row items-center mb-2">
      <Image
        source={store.logo}
        className="w-16 h-16 rounded-lg mr-3"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-xl font-bold text-gray-800">{store.name}</Text>
        <Text className="text-gray-500">{store.type}</Text>
      </View>
    </View>
    
    <View className="flex-row items-center mt-2">
      <View className="flex-row items-center mr-3">
        <Icon name="star" size={16} color="#FFD700" />
        <Text className="ml-1 font-medium">{store.rating}</Text>
      </View>
      <View className="h-4 w-[1px] bg-gray-300 mr-3" />
      <Text className="text-gray-500 mr-3">{store.distance}</Text>
      <View className="h-4 w-[1px] bg-gray-300 mr-3" />
      <Text className="text-gray-500">{store.time}</Text>
    </View>
    
    <View className="mt-3 p-3 bg-green-50 rounded-lg">
      <View className="flex-row items-center">
        <Icon name="ticket-percent-outline" size={18} color="#41B54A" />
        <Text className="ml-2 text-green-700 font-medium">
          {store.deliveryFee === 'Entrega grátis' ? 'Entrega grátis' : `Entrega: ${store.deliveryFee}`}
        </Text>
      </View>
    </View>
  </View>
);

// Componente para exibir uma categoria
const CategoryItem = ({ item, onPress }) => (
  <TouchableOpacity 
    className={`px-4 py-3 ${item.active ? 'border-b-2 border-green-500' : ''}`}
    onPress={() => onPress(item.id)}
  >
    <Text 
      className={`${item.active ? 'text-green-500 font-medium' : 'text-gray-500'}`}
    >
      {item.name}
    </Text>
  </TouchableOpacity>
);

// Componente para exibir um produto
const ProductItem = ({ item, onPress, onAddToCart }) => (
  <TouchableOpacity 
    className="flex-row mb-4 bg-white p-3 rounded-lg shadow-sm"
    onPress={() => onPress(item)}
  >
    <View className="flex-1 mr-3">
      <Text className="text-base font-bold text-gray-800 mb-1">{item.name}</Text>
      <Text className="text-xs text-gray-500 mb-2" numberOfLines={2}>{item.description}</Text>
      <Text className="text-xs text-gray-400 mb-1">{item.weight}</Text>
      <Text className="text-base font-bold text-green-600">R$ {item.price.toFixed(2).replace('.', ',')}</Text>
    </View>
    <View className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
      <Image
        source={item.image}
        className="w-full h-full"
        resizeMode="cover"
      />
      <TouchableOpacity 
        className="absolute bottom-0 right-0 bg-green-500 rounded-tl-lg p-1"
        onPress={(e) => {
          e.stopPropagation();
          onAddToCart(item);
        }}
      >
        <Icon name="plus" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

// Componente para exibir uma seção de produtos
const ProductSection = ({ title, items, onProductPress, onAddToCart }) => (
  <View className="mb-6">
    <Text className="text-lg font-bold px-4 mb-3">{title}</Text>
    <View className="px-4">
      {items.map((item) => (
        <ProductItem 
          key={item.id} 
          item={item} 
          onPress={onProductPress}
          onAddToCart={onAddToCart} 
        />
      ))}
    </View>
  </View>
);

export default function StoreScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeCategory, setActiveCategory] = useState('cat1');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  
  // Obter dados da loja a partir dos parâmetros da rota
  const store = route.params?.store || {
    id: 'sl2',
    name: 'Hortifruti Santo Antônio',
    logo: require('../../assets/images/hortifruti-antonio.png'),
    banner: require('../../assets/images/banner-antonio.png'),
    rating: '4.6',
    type: 'Hortifruti',
    distance: '1,2 km',
    time: '40 - 50 min',
    deliveryFee: 'Entrega grátis',
    favorite: true
  };
  
  // Função para mudar a categoria ativa
  const handleCategoryPress = (categoryId) => {
    setActiveCategory(categoryId);
  };
  
  // Função para lidar com o clique em um produto
  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', { product, store });
  };
  
  // Função para adicionar um item ao carrinho
  const handleAddToCart = (product) => {
    addToCart(product, store);
  };
  
  // Filtrar produtos por categoria ativa
  const filteredProducts = activeCategory === 'cat1'
    ? products.filter(p => p.featured)
    : products.filter(p => p.category === activeCategory);
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <StoreHeader store={store} scrollY={scrollY} />
      
      <Animated.ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View>
          <StoreInfo store={store} />
          
          {/* Barra de pesquisa */}
          <View className="px-4 py-3 bg-white mt-1">
            <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
              <Icon name="magnify" size={20} color="#999" />
              <TextInput
                className="flex-1 ml-2 text-base"
                placeholder={`Buscar em ${store.name}`}
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
          
          {/* Categorias */}
          <View className="bg-white mt-2">
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={{ paddingHorizontal: 10 }}
            >
              {categories.map(category => (
                <CategoryItem 
                  key={category.id} 
                  item={{...category, active: category.id === activeCategory}}
                  onPress={handleCategoryPress}
                />
              ))}
            </ScrollView>
          </View>
          
          {/* Lista de produtos */}
          <View className="mt-2">
            {activeCategory === 'cat1' ? (
              <>
                <ProductSection 
                  title="Destaques" 
                  items={filteredProducts} 
                  onProductPress={handleProductPress}
                  onAddToCart={handleAddToCart}
                />
              </>
            ) : (
              <>
                <ProductSection 
                  title={categories.find(c => c.id === activeCategory)?.name || 'Produtos'} 
                  items={filteredProducts} 
                  onProductPress={handleProductPress}
                  onAddToCart={handleAddToCart}
                />
              </>
            )}
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
} 