import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../../contexts/CartContext';

const { width } = Dimensions.get('window');

// Componente para exibir contador de quantidade
const QuantitySelector = ({ quantity, onDecrease, onIncrease }) => (
  <View className="flex-row items-center">
    <TouchableOpacity
      className={`w-9 h-9 rounded-full items-center justify-center ${quantity > 1 ? 'bg-green-100' : 'bg-gray-100'}`}
      onPress={onDecrease}
      disabled={quantity <= 1}
    >
      <Icon name="minus" size={20} color={quantity > 1 ? '#41B54A' : '#ccc'} />
    </TouchableOpacity>
    
    <Text className="mx-4 text-lg font-bold">{quantity}</Text>
    
    <TouchableOpacity
      className="w-9 h-9 rounded-full bg-green-100 items-center justify-center"
      onPress={onIncrease}
    >
      <Icon name="plus" size={20} color="#41B54A" />
    </TouchableOpacity>
  </View>
);

// Componente para exibir o botão de adicionar ao carrinho
const AddToCartButton = ({ onPress, price, quantity }) => {
  const totalPrice = price * quantity;
  
  return (
    <TouchableOpacity
      className="flex-1 bg-green-500 rounded-lg py-4 items-center justify-center"
      onPress={onPress}
    >
      <Text className="text-white font-bold text-lg">
        Adicionar • R$ {totalPrice.toFixed(2).replace('.', ',')}
      </Text>
    </TouchableOpacity>
  );
};

// Componente para exibir uma seção de informações
const InfoSection = ({ title, children }) => (
  <View className="mb-6">
    <Text className="text-lg font-bold mb-2">{title}</Text>
    {children}
  </View>
);

export default function ProductDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  // Obter dados do produto e da loja a partir dos parâmetros da rota
  const product = route.params?.product || {
    id: 'p1',
    name: 'Maçã Gala',
    description: 'Maçã fresca da estação - Valor referente a unidade',
    price: 2.99,
    image: require('../../assets/images/produtos/maca.png'),
    weight: '1 unidade (aprox. 150g)',
    category: 'cat2',
    featured: true,
    nutritionalInfo: [
      { name: 'Calorias', value: '52 kcal' },
      { name: 'Carboidratos', value: '14g' },
      { name: 'Proteínas', value: '0.3g' },
      { name: 'Gorduras', value: '0.2g' },
      { name: 'Fibras', value: '2.4g' },
    ]
  };
  
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
  
  // Função para diminuir a quantidade
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Função para aumentar a quantidade
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  
  // Função para adicionar ao carrinho
  const handleAddToCart = () => {
    // Adiciona o produto ao carrinho com a quantidade selecionada
    addToCart(product, store, quantity);
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['right', 'left', 'top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Cabeçalho */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <TouchableOpacity 
          className="w-10 h-10 rounded-full bg-white shadow-sm items-center justify-center"
          style={{ elevation: 2 }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={26} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2">
          <Icon name="share-variant-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Imagem do produto */}
        <View className="w-full bg-gray-50 py-8">
          <Image
            source={product.image}
            style={{ width: width * 0.7, height: width * 0.7, alignSelf: 'center' }}
            resizeMode="contain"
          />
        </View>
        
        {/* Informações do produto */}
        <View className="p-4">
          <Text className="text-3xl font-bold text-gray-800 mb-1">{product.name}</Text>
          <Text className="text-sm text-gray-500 mb-4">{product.weight}</Text>
          <Text className="text-2xl font-bold text-green-600 mb-6">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </Text>
          
          {/* Descrição */}
          <InfoSection title="Descrição">
            <Text className="text-gray-600 text-base">{product.description}</Text>
          </InfoSection>
          
          {/* Informações nutricionais */}
          {product.nutritionalInfo && (
            <InfoSection title="Informações Nutricionais">
              <View className="bg-gray-50 rounded-lg p-3">
                {product.nutritionalInfo.map((item, index) => (
                  <View key={index} className="flex-row justify-between py-1">
                    <Text className="text-gray-600">{item.name}</Text>
                    <Text className="font-medium">{item.value}</Text>
                  </View>
                ))}
              </View>
            </InfoSection>
          )}
          
          {/* Informações de entrega */}
          <InfoSection title="Informações de Entrega">
            <View className="flex-row items-center mb-4">
              <Icon name="truck-delivery-outline" size={24} color="#41B54A" />
              <Text className="text-gray-700 ml-3 text-base">Receba em até 40-50 minutos</Text>
            </View>
            <View className="flex-row items-center">
              <Icon name="calendar-check-outline" size={24} color="#41B54A" />
              <Text className="text-gray-700 ml-3 text-base">Produto fresco colhido no dia</Text>
            </View>
          </InfoSection>
          
          {/* Espaço para o botão flutuante */}
          <View className="h-24" />
        </View>
      </ScrollView>
      
      {/* Botão flutuante de adicionar ao carrinho */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex-row items-center" style={{ zIndex: 50 }}>
        <QuantitySelector
          quantity={quantity}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
        />
        <View className="w-4" />
        <AddToCartButton
          price={product.price}
          quantity={quantity}
          onPress={handleAddToCart}
        />
      </View>
    </SafeAreaView>
  );
} 