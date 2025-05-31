import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../contexts/CartContext';

const AddressConfirmationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { clearCart } = useCart();
  const { total, cartItems, storeInfo } = route.params || { total: 0, cartItems: [], storeInfo: null };
  const [deliveryOption, setDeliveryOption] = useState('fast'); // 'standard' ou 'fast'
  
  // Endereço padrão do usuário (em uma aplicação real, isso viria de um contexto ou API)
  const address = {
    street: 'St. Hab. Vicente Pires Chácara 225',
    number: '33',
    neighborhood: 'Taguatinga',
    city: 'Brasília',
    state: 'DF',
    zipCode: '71095-080',
  };
  
  // Opções de entrega
  const deliveryOptions = {
    standard: {
      name: 'Padrão',
      time: '31 - 41min',
      price: 15.99,
    },
    fast: {
      name: 'Rápida',
      time: '25 - 35min',
      price: 19.99,
    },
  };
  
  // Alertas/warning
  const locationWarning = 'O endereço de entrega está diferente da sua localização';
  
  const handleContinue = () => {
    navigation.navigate('PaymentScreen', {
      total: total,
      cartItems: cartItems,
      deliveryFee: deliveryOptions[deliveryOption].price,
      address: address,
      deliveryTime: deliveryOptions[deliveryOption].time,
      storeName: storeInfo ? storeInfo.name : 'HortiFruti'
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
          <Text className="text-2xl font-bold mb-4">Entregar no endereço</Text>
          
          {/* Seleção de endereço */}
          <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <View className="flex-row items-start">
              <Icon name="map-marker" size={24} color="#333" className="mr-3 mt-1" />
              <View className="flex-1">
                <Text className="text-base font-bold">
                  {`${address.street}, ${address.number}`}
                </Text>
                <Text className="text-gray-500 text-base">{address.neighborhood}</Text>
                
                {/* Alerta de localização diferente */}
                <View className="bg-yellow-50 px-3 py-2 rounded-lg mt-2">
                  <Text className="text-amber-700 text-sm">{locationWarning}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text className="text-[#41B54A] font-bold">Trocar</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Opções de entrega */}
          <View className="mb-6">
            <View className="flex-row items-center mb-2">
              <Text className="text-xl font-bold">Opções de entrega</Text>
              <TouchableOpacity className="ml-2">
                <Icon name="help-circle-outline" size={20} color="#999" />
              </TouchableOpacity>
            </View>
            
            {/* Opção Padrão */}
            <TouchableOpacity 
              className={`bg-white rounded-lg p-4 mb-3 ${deliveryOption === 'standard' ? 'border-2 border-[#41B54A]' : 'border border-gray-200'}`}
              onPress={() => setDeliveryOption('standard')}
            >
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-base font-medium">Padrão</Text>
                  <Text className="text-gray-500">Hoje, {deliveryOptions.standard.time}</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-base font-bold mr-3">
                    R$ {deliveryOptions.standard.price.toFixed(2).replace('.', ',')}
                  </Text>
                  {deliveryOption === 'standard' && (
                    <View className="w-6 h-6 rounded-full bg-[#41B54A] items-center justify-center">
                      <Icon name="check" size={16} color="#fff" />
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
            
            {/* Opção Rápida */}
            <TouchableOpacity 
              className={`bg-white rounded-lg p-4 ${deliveryOption === 'fast' ? 'border-2 border-[#41B54A]' : 'border border-gray-200'}`}
              onPress={() => setDeliveryOption('fast')}
            >
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-base font-medium">Rápida</Text>
                  <Text className="text-gray-500">Hoje, {deliveryOptions.fast.time}</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-base font-bold mr-3">
                    R$ {deliveryOptions.fast.price.toFixed(2).replace('.', ',')}
                  </Text>
                  {deliveryOption === 'fast' && (
                    <View className="w-6 h-6 rounded-full bg-[#41B54A] items-center justify-center">
                      <Icon name="check" size={16} color="#fff" />
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {/* Rodapé com botão de continuar */}
      <View className="bg-white p-4 shadow-t-sm">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-base text-gray-600">Total com a entrega</Text>
          <Text className="text-xl font-bold">
            R$ {(total + deliveryOptions[deliveryOption].price).toFixed(2).replace('.', ',')} / 1 item
          </Text>
        </View>
        <TouchableOpacity
          className="bg-[#41B54A] rounded-lg p-4 items-center justify-center"
          onPress={handleContinue}
        >
          <Text className="text-white font-bold text-lg">
            Continuar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddressConfirmationScreen; 