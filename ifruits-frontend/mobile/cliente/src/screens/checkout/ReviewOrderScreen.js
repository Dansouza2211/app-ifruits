import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../contexts/CartContext';

const ReviewOrderScreen = ({ route }) => {
  const navigation = useNavigation();
  const { clearCart } = useCart();
  const { 
    cartItems,
    subtotal,
    deliveryFee,
    serviceFee,
    discount,
    total,
    paymentMethod,
    address,
    deliveryTime,
    storeName
  } = route.params;
  
  // Método de pagamento formatado
  const paymentMethods = {
    credit: 'Cartão de Crédito',
    debit: 'Cartão de Débito',
    money: 'Dinheiro',
    apple: 'Apple Pay'
  };
  
  const handleFinishOrder = () => {
    // Gerar um número de pedido aleatório
    const orderNumber = Math.floor(Math.random() * 10000);
    
    // Limpar o carrinho
    clearCart();
    
    // Navegar para a tela de confirmação
    navigation.navigate('OrderConfirmationScreen', {
      total,
      deliveryTime,
      restaurantName: storeName,
      orderNumber,
      address
    });
  };
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['right', 'top', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Cabeçalho */}
      <View className="bg-white pt-2 shadow-sm">
        <View className="flex-row items-center justify-between px-4 py-3">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              className="w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-200"
            >
              <Icon name="chevron-left" size={26} color="#41B54A" />
            </TouchableOpacity>
            <Text className="ml-4 text-lg font-bold">SACOLA</Text>
          </View>
          <TouchableOpacity onPress={() => {
            clearCart();
            navigation.navigate('Cart');
          }}>
            <Text className="text-base text-[#41B54A] font-medium">Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <Text className="text-2xl font-bold mb-4">Revisar pedido</Text>
          
          {/* Detalhes da loja */}
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <View className="flex-row items-center mb-3">
              <Image 
                source={require('../../assets/images/logo-hortifruti.png')}
                className="w-12 h-12 rounded-full mr-3"
              />
              <View>
                <Text className="text-lg font-bold">{storeName}</Text>
                <TouchableOpacity>
                  <Text className="text-[#41B54A]">Adicionar mais itens</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Lista de itens do pedido */}
            <View className="border-t border-gray-100 pt-3">
              {cartItems.map((item, index) => (
                <View key={index} className="flex-row justify-between mb-2">
                  <Text className="text-base text-gray-700">
                    {item.quantity}x {item.name}
                  </Text>
                  <Text className="text-base font-medium">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Endereço de entrega */}
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <View className="flex-row justify-between items-start">
              <View className="flex-row items-start flex-1">
                <Icon name="map-marker" size={24} color="#333" className="mr-2 mt-1" />
                <View>
                  <Text className="text-base font-bold mb-1">Endereço de entrega</Text>
                  <Text className="text-gray-700">
                    {`${address.street}, ${address.number}`}
                  </Text>
                  <Text className="text-gray-500">{address.neighborhood}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text className="text-[#41B54A] font-bold">Trocar</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Método de pagamento */}
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <View className="flex-row justify-between items-start">
              <View className="flex-row items-start flex-1">
                <Icon 
                  name={paymentMethod === 'money' ? 'cash' : 'credit-card'} 
                  size={24} 
                  color="#333" 
                  className="mr-2 mt-1" 
                />
                <View>
                  <Text className="text-base font-bold mb-1">Pagamento</Text>
                  <Text className="text-gray-700">{paymentMethods[paymentMethod]}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text className="text-[#41B54A] font-bold">Trocar</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Resumo de valores */}
          <View className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <Text className="text-lg font-bold mb-3">Resumo de valores</Text>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Subtotal</Text>
              <Text className="font-medium">R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
            </View>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Taxa de entrega</Text>
              <Text className="font-medium">R$ {deliveryFee.toFixed(2).replace('.', ',')}</Text>
            </View>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Taxa de serviço</Text>
              <View className="flex-row items-center">
                <Text className="font-medium mr-1">R$ {serviceFee.toFixed(2).replace('.', ',')}</Text>
                <Icon name="information-outline" size={16} color="#999" />
              </View>
            </View>
            
            {discount > 0 && (
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Desconto</Text>
                <Text className="font-medium text-green-600">- R$ {discount.toFixed(2).replace('.', ',')}</Text>
              </View>
            )}
            
            <View className="border-t border-gray-200 my-2" />
            
            <View className="flex-row justify-between">
              <Text className="font-bold text-lg">Total</Text>
              <Text className="font-bold text-xl text-[#41B54A]">R$ {total.toFixed(2).replace('.', ',')}</Text>
            </View>
          </View>
          
          {/* Tempo de entrega estimado */}
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <View className="flex-row items-center">
              <Icon name="clock-outline" size={24} color="#333" className="mr-2" />
              <View>
                <Text className="text-base font-bold">Tempo de entrega estimado</Text>
                <Text className="text-gray-600">Hoje, {deliveryTime}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Rodapé com botão de finalizar */}
      <View className="bg-white p-4 shadow-t-sm">
        <TouchableOpacity
          className="bg-[#41B54A] rounded-lg p-4 items-center justify-center"
          onPress={handleFinishOrder}
        >
          <Text className="text-white font-bold text-lg">
            Finalizar pedido • R$ {total.toFixed(2).replace('.', ',')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReviewOrderScreen; 