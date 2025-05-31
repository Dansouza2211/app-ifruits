import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  FlatList,
  Animated,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FadeInDown, FadeInUp } from 'react-native-reanimated';

// Constantes para dimensões
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING = 10;

// Dados mockados para categorias
const categories = [
  { id: 'cat1', name: 'Mercado', active: true },
  { id: 'cat2', name: 'Hortifrutis', active: false },
  { id: 'cat3', name: 'Frutas', active: false },
  { id: 'cat4', name: 'Legumes', active: false },
  { id: 'cat5', name: 'Verduras', active: false },
];

// Dados mockados para banners
const banners = [
  { 
    id: 'b1', 
    image: require('../../assets/images/banner1.png'),
    title: 'BRASIL',
    subtitle: 'FRUTAS'
  },
  { 
    id: 'b2', 
    image: require('../../assets/images/banner2.png'),
    title: 'FRESCAS',
    subtitle: 'VERDURAS'
  },
  { 
    id: 'b3', 
    image: require('../../assets/images/banner3.png'),
    title: 'ORGÂNICOS',
    subtitle: 'PRODUTOS'
  },
];

// Dados mockados para destaques
const highlights = [
  { id: 'h1', title: 'Frutas da Estação', icon: '🍌' },
  { id: 'h2', title: 'Mercado', icon: '🛒' },
  { id: 'h3', title: 'Frutas Exóticas', icon: '🥝' },
  { id: 'h4', title: 'Promoções', icon: '🛍️' },
];

// Dados mockados para lojas
const stores = [
  { 
    id: 's1', 
    name: 'Hortifruti da Terra',
    logo: require('../../assets/images/hortifruti-terra.png')
  },
  { 
    id: 's2', 
    name: 'Hortifruti Central', 
    logo: require('../../assets/images/hortifruti-central.png')
  },
  { 
    id: 's3', 
    name: "Hortifruti Express", 
    logo: require('../../assets/images/hortifruti-express.png')
  },
  { 
    id: 's4', 
    name: 'Sou Hortifruti', 
    logo: require('../../assets/images/sou-hortifruti.png')
  },
  { 
    id: 's5', 
    name: 'Hortifruti Sabor', 
    logo: require('../../assets/images/hortifruti-sabor.png')
  },
  { 
    id: 's6', 
    name: 'Hortifruti Prime', 
    logo: require('../../assets/images/hortifruti-prime.png')
  },
  { 
    id: 's7', 
    name: 'Hortifruti Delivery Express', 
    logo: require('../../assets/images/hortifruti-delivery.png')
  },
];

// Dados mockados para lojas famosas
const famousStores = [
  { 
    id: 'fs1', 
    name: 'Hortifruti Antônio', 
    logo: require('../../assets/images/hortifruti-antonio.png')
  },
  { 
    id: 'fs2', 
    name: 'Empório Hortifruti', 
    logo: require('../../assets/images/emporio-hortifruti.png')
  },
  { 
    id: 'fs3', 
    name: 'Império Hortifruti', 
    logo: require('../../assets/images/imperio-hortifruti.png')
  },
  { 
    id: 'fs4', 
    name: 'Celeiro das Frutas', 
    logo: require('../../assets/images/celeiro-frutas.png')
  },
  { 
    id: 'fs5', 
    name: 'Hortifruti Mais Você', 
    logo: require('../../assets/images/hortifruti-voce.png')
  },
  { 
    id: 'fs6', 
    name: 'Frutas do Campo', 
    logo: require('../../assets/images/frutas-campo.png')
  },
  { 
    id: 'fs7', 
    name: 'Verdura Fácil', 
    logo: require('../../assets/images/verdura-facil.png')
  },
];

// Dados mockados para lojas
const storeList = [
  { 
    id: 'sl1', 
    name: 'HortiFruti', 
    logo: require('../../assets/images/hortifruti-terra.png'),
    rating: '4.8',
    type: 'Mercado',
    distance: '2,5 km',
    time: '30 - 50 min',
    deliveryFee: 'R$ 6,00',
    favorite: false
  },
  { 
    id: 'sl2', 
    name: 'Hortifruti Santo Antônio', 
    logo: require('../../assets/images/hortifruti-antonio.png'),
    rating: '4.6',
    type: 'Hortifruti',
    distance: '1,2 km',
    time: '40 - 50 min',
    deliveryFee: 'Entrega grátis',
    favorite: true
  },
  { 
    id: 'sl3', 
    name: 'Novo Hortifruti', 
    logo: require('../../assets/images/imperio-hortifruti.png'),
    rating: '3.9',
    type: 'Hortifruti',
    distance: '1,2 km',
    time: '40 - 50 min',
    deliveryFee: 'R$ 7,00',
    favorite: false
  },
  { 
    id: 'sl4', 
    name: 'Hortifruti Bom Preço', 
    logo: require('../../assets/images/emporio-hortifruti.png'),
    rating: '4.6',
    type: 'Hortifruti',
    distance: '5 km',
    time: '40 - 50 min',
    deliveryFee: 'Entrega grátis',
    favorite: true
  },
  { 
    id: 'sl5', 
    name: 'Ultrabox', 
    logo: require('../../assets/images/hortifruti-voce.png'),
    rating: '4.8',
    type: 'Mercado',
    distance: '1,9 km',
    time: '40 - 50 min',
    deliveryFee: 'R$ 7,00',
    favorite: false
  },
];

// Componente para o cabeçalho com local
const LocationHeader = () => (
  <View className="flex-row items-center justify-between px-4 py-4 bg-white shadow-sm">
    <View className="flex-row items-center">
      <Text className="text-green-500 font-semibold mr-1 text-base">QS 07, Lote 01, Taguatinga Sul</Text>
      <Icon name="chevron-down" size={18} color="#41B54A" />
    </View>
    <TouchableOpacity>
      <View className="w-10 h-10 bg-green-50 rounded-full items-center justify-center">
        <Icon name="menu" size={24} color="#41B54A" />
      </View>
    </TouchableOpacity>
  </View>
);

// Componente para categoria
const CategoryItem = ({ item, onPress }) => (
  <TouchableOpacity 
    className={`px-4 py-3 ${item.active ? 'border-b-2 border-green-500' : ''}`}
    onPress={onPress}
  >
    <Text 
      className={`${item.active ? 'text-green-500 font-medium' : 'text-gray-500'}`}
    >
      {item.name}
    </Text>
    {item.name === 'Mercado' && (
      <View className="absolute -top-1 -right-1">
        <View className="bg-green-500 rounded-full px-2 py-0.5">
          <Text className="text-white text-xs font-bold">NOVO!</Text>
        </View>
      </View>
    )}
  </TouchableOpacity>
);

// Componente para banner com animação
const AnimatedBanner = ({ banners }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View className="mb-4">
      <Animated.FlatList 
        data={banners}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });
          
          return (
            <Animated.View 
              style={{ 
                width, 
                transform: [{ scale }],
                paddingHorizontal: 15
              }}
            >
              <View style={{ overflow: 'hidden', borderRadius: 12, shadowOpacity: 0.1, shadowRadius: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }}}>
                <Image
                  source={item.image}
                  style={{ width: '100%', height: 192, borderRadius: 12 }}
                  resizeMode="cover"
                />
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: 'rgba(0,0,0,0.3)', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
                  <View style={{ backgroundColor: '#F59E0B', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 9999, alignSelf: 'flex-start', marginBottom: 8 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
                  </View>
                  <View style={{ backgroundColor: '#F59E0B', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 9999, alignSelf: 'flex-end' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{item.subtitle}</Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          );
        }}
        keyExtractor={item => item.id}
      />
      
      {/* Indicadores de página */}
      <View className="flex-row justify-center mt-2">
        {banners.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
          });
          
          return (
            <Animated.View
              key={`indicator-${i}`}
              style={{ 
                width: 8, 
                height: 8, 
                borderRadius: 4, 
                backgroundColor: '#41B54A', 
                marginHorizontal: 4,
                opacity, 
                transform: [{ scale }] 
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

// Componente para destaque
const HighlightItem = ({ item }) => (
  <TouchableOpacity className="items-center mr-4">
    <View className="w-16 h-16 bg-green-100 rounded-2xl items-center justify-center mb-2 shadow-sm">
      <Text className="text-2xl">{item.icon}</Text>
    </View>
    <Text className="text-xs font-medium text-center">{item.title}</Text>
  </TouchableOpacity>
);

// Componente para loja
const StoreItem = ({ item, navigation }) => (
  <TouchableOpacity 
    className="items-center mx-3 mb-2"
    onPress={() => {
      // Buscar dados completos da loja no array storeList
      const fullStoreData = storeList.find(store => store.id === item.id) || {
        id: item.id,
        name: item.name,
        logo: item.logo,
        banner: require('../../assets/images/banner-antonio.png'), // Banner padrão
        rating: '4.5',
        type: 'Hortifruti',
        distance: '2,0 km',
        time: '30-45 min',
        deliveryFee: 'Entrega grátis',
        favorite: false
      };
      
      navigation.navigate('Store', { store: fullStoreData });
    }}
  >
    <View className="mb-2 shadow-sm">
      <Image
        source={item.logo}
        className="w-16 h-16 rounded-full"
        resizeMode="cover"
      />
    </View>
    <Text className="text-xs text-center font-medium w-20" numberOfLines={1} ellipsizeMode="tail">
      {item.name}
    </Text>
  </TouchableOpacity>
);

// Componente para promoção rápida
const PromoBanner = () => (
  <TouchableOpacity className="mx-4 my-3 bg-green-100 rounded-xl p-4 flex-row items-center shadow-sm">
    <View className="mr-4 bg-green-200 p-3 rounded-full">
      <Icon name="leaf" size={24} color="#41B54A" />
    </View>
    <View className="flex-1">
      <Text className="text-base font-semibold text-green-800">Frutas e Verduras</Text>
      <Text className="text-xs text-green-700">Entrega expressa em até 15 minutos</Text>
    </View>
    <View>
      <Icon name="chevron-right" size={20} color="#41B54A" />
    </View>
  </TouchableOpacity>
);

// Componente para loja na lista
const StoreListItem = ({ item, navigation }) => (
  <TouchableOpacity 
    className="mx-4 my-2 p-3 bg-white rounded-xl shadow-sm"
    onPress={() => navigation.navigate('Store', { store: item })}
  >
    <View className="flex-row">
      <View className="w-16 h-16 rounded-xl mr-3 overflow-hidden">
        <Image
          source={item.logo}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-bold text-gray-800">{item.name}</Text>
          <TouchableOpacity className="p-1">
            <Icon 
              name={item.favorite ? "heart" : "heart-outline"} 
              size={22} 
              color={item.favorite ? "#41B54A" : "#999"} 
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center mt-1">
          <Icon name="star" size={14} color="#FFD700" />
          <Text className="text-xs ml-1 mr-2 font-bold">{item.rating}</Text>
          <Text className="text-xs text-gray-500">{item.type} • {item.distance}</Text>
        </View>
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-xs text-gray-500">{item.time} • {item.deliveryFee}</Text>
          {item.deliveryFee === 'Entrega grátis' && (
            <View className="bg-blue-100 rounded-full px-2 py-1">
              <View>
                <Icon name="ticket-percent-outline" size={12} color="#3B82F6" />
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

// Componente para seção
const Section = ({ title, children, showSeeMore = false, onSeeMorePress }) => (
  <View className="mb-6">
    <View className="flex-row justify-between items-center px-4 mb-3">
      <Text className="font-bold text-lg text-gray-800">{title}</Text>
      {showSeeMore && (
        <TouchableOpacity onPress={onSeeMorePress}>
          <Text className="text-green-500 text-sm font-medium">Ver mais</Text>
        </TouchableOpacity>
      )}
    </View>
    {children}
  </View>
);

// Componente para filtros
const FilterOptions = ({ deliveryFilter, setDeliveryFilter, pickupFilter, setPickupFilter }) => (
  <View className="py-3 border-t border-b border-gray-100 mb-3 bg-white">
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15 }}
    >
      <TouchableOpacity 
        className={`mr-3 px-4 py-2 rounded-full flex-row items-center shadow-sm ${deliveryFilter ? 'bg-green-100' : 'bg-gray-100'}`}
        onPress={() => setDeliveryFilter(!deliveryFilter)}
      >
        <View className="mr-1">
          <Icon name={deliveryFilter ? "check-circle" : "circle-outline"} size={16} color={deliveryFilter ? "#41B54A" : "#666"} />
        </View>
        <Text className={`${deliveryFilter ? 'text-green-600 font-medium' : 'text-gray-600'}`}>Entrega grátis</Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="mr-3 px-4 py-2 rounded-full bg-gray-100 flex-row items-center shadow-sm">
        <Text className="text-gray-600 mr-1 font-medium">Ordenar</Text>
        <Icon name="chevron-down" size={16} color="#666" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        className={`mr-3 px-4 py-2 rounded-full flex-row items-center shadow-sm ${pickupFilter ? 'bg-green-100' : 'bg-gray-100'}`}
        onPress={() => setPickupFilter(!pickupFilter)}
      >
        <View className="mr-1">
          <Icon name={pickupFilter ? "check-circle" : "circle-outline"} size={16} color={pickupFilter ? "#41B54A" : "#666"} />
        </View>
        <Text className={`${pickupFilter ? 'text-green-600 font-medium' : 'text-gray-600'}`}>P/ retirada</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
);

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [deliveryFilter, setDeliveryFilter] = useState(true);
  const [orderByFilter, setOrderByFilter] = useState('');
  const [pickupFilter, setPickupFilter] = useState(false);
  const [activeCategory, setActiveCategory] = useState('cat1');
  
  // Função para alterar categoria ativa
  const handleCategoryPress = (categoryId) => {
    setActiveCategory(categoryId);
  };
  
  // Navegação para tela de mais lojas
  const handleNavigateToMoreStores = () => {
    navigation.navigate('MoreStores', { title: 'Últimas lojas' });
  };
  
  // Navegação para tela de lojas famosas
  const handleNavigateToFamousStores = () => {
    navigation.navigate('FamousStores');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top', 'right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Cabeçalho com localização */}
      <LocationHeader />
      
      {/* Categorias */}
      <View className="bg-white">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="border-b border-gray-200"
          contentContainerStyle={{ paddingHorizontal: 5 }}
        >
          {categories.map(category => (
            <CategoryItem 
              key={category.id} 
              item={{...category, active: category.id === activeCategory}}
              onPress={() => handleCategoryPress(category.id)}
            />
          ))}
        </ScrollView>
      </View>
      
      {/* Opções de filtro */}
      <FilterOptions 
        deliveryFilter={deliveryFilter}
        setDeliveryFilter={setDeliveryFilter}
        pickupFilter={pickupFilter}
        setPickupFilter={setPickupFilter}
      />
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Destaques */}
        <View className="py-4 mb-2 bg-white">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {highlights.map(item => (
              <HighlightItem key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>
        
        {/* Banner animado */}
        <AnimatedBanner banners={banners} />
        
        {/* Banner Promocional */}
        <PromoBanner />
        
        {/* Últimas lojas */}
        <Section 
          title="Últimas lojas" 
          showSeeMore 
          onSeeMorePress={handleNavigateToMoreStores}
        >
          <FlatList 
            horizontal 
            data={stores}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <StoreItem item={item} navigation={navigation} />}
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingHorizontal: 16 }}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            snapToAlignment="start"
            decelerationRate="normal"
          />
        </Section>
        
        {/* Famosos no iFruits */}
        <Section 
          title="Famosos no iFruits" 
          showSeeMore
          onSeeMorePress={handleNavigateToFamousStores}
        >
          <FlatList 
            horizontal 
            data={famousStores}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <StoreItem item={item} navigation={navigation} />}
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingHorizontal: 16 }}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            snapToAlignment="start"
            decelerationRate="normal"
          />
        </Section>
        
        {/* Lojas */}
        <Section title="Lojas">
          {storeList.map(store => (
            <StoreListItem key={store.id} item={store} navigation={navigation} />
          ))}
        </Section>
        
        {/* Espaço para o tab bar */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
} 