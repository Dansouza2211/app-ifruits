import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../contexts/CartContext';
import { usePayment } from '../../contexts/PaymentContext';
import { useModal } from '../../contexts/ModalContext';

const PaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const { clearCart } = useCart();
  const { getSelectedPaymentMethod, cards } = usePayment();
  const { showSuccess, alert } = useModal();
  const { total, cartItems, deliveryFee, address, deliveryTime, storeName } = route.params;
  
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  // Obter o método de pagamento selecionado
  const selectedPaymentMethod = getSelectedPaymentMethod();
  
  // Subtotal (sem frete)
  const subtotal = total;
  
  // Taxa de serviço fixa
  const serviceFee = 0.99;
  
  // Total final com desconto
  const finalTotal = total + serviceFee + deliveryFee - discount;
  
  // Função para aplicar cupom de desconto
  const applyDiscount = () => {
    if (couponCode.toUpperCase() === 'IFRUITS10') {
      const discountAmount = subtotal * 0.1; // 10% de desconto
      setDiscount(discountAmount);
      showSuccess('Cupom aplicado!', `Desconto de R$ ${discountAmount.toFixed(2).replace('.', ',')} aplicado.`);
    } else {
      alert('Cupom inválido', 'Este cupom não existe ou já expirou.', [], 'error');
    }
  };
  
  // Função para trocar o método de pagamento
  const handleChangePaymentMethod = () => {
    navigation.navigate('PaymentSelector');
  };
  
  // Função para continuar para a revisão do pedido
  const handleContinue = () => {
    // Verificar se tem cartão caso seja método de pagamento por cartão
    if (selectedPaymentMethod.type === 'card' && (!cards || cards.length === 0)) {
      alert(
        'Nenhum cartão cadastrado', 
        'Adicione um cartão para continuar com este método de pagamento.', 
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Adicionar cartão', 
            onPress: () => navigation.navigate('CardRegister') 
          }
        ]
      );
      return;
    }
    
    navigation.navigate('ReviewOrderScreen', {
      cartItems,
      subtotal,
      deliveryFee,
      serviceFee,
      discount,
      total: finalTotal,
      paymentMethod: selectedPaymentMethod,
      address,
      deliveryTime,
      storeName
    });
  };
  
  // Função para renderizar o método de pagamento selecionado
  const renderSelectedPaymentMethod = () => {
    // Determinar o texto e ícone com base no tipo de pagamento
    let icon;
    let text = 'Método de pagamento';
    
    switch (selectedPaymentMethod.type) {
      case 'apple':
        icon = (
          <Image 
            source={require('../../assets/images/apple-pay.png')} 
            className="w-8 h-8 mr-3"
            resizeMode="contain"
          />
        );
        text = 'Apple Pay';
        break;
      case 'google':
        icon = <Icon name="google-pay" size={24} color="#333" className="mr-3" />;
        text = 'Google Pay';
        break;
      case 'pix':
        icon = <Icon name="qrcode" size={24} color="#333" className="mr-3" />;
        text = 'Pix';
        break;
      case 'card':
        const card = selectedPaymentMethod.card;
        icon = <Icon name="credit-card-outline" size={24} color="#333" className="mr-3" />;
        if (card) {
          // Mostrar apenas os últimos 4 dígitos do cartão
          const last4 = card.number.slice(-4);
          text = `Cartão •••• ${last4}`;
        } else {
          text = 'Cartão de crédito';
        }
        break;
      case 'money':
        icon = <Icon name="cash" size={24} color="#333" className="mr-3" />;
        text = 'Dinheiro (na entrega)';
        break;
      default:
        icon = <Icon name="credit-card-outline" size={24} color="#333" className="mr-3" />;
        text = 'Selecionar método de pagamento';
    }
    
    return (
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          {icon}
          <Text className="text-base">{text}</Text>
        </View>
        <TouchableOpacity onPress={handleChangePaymentMethod}>
          <Text className="text-[#41B54A] font-bold">Trocar</Text>
        </TouchableOpacity>
      </View>
    );
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
          {/* Loja */}
          <View className="mb-5 flex-row items-center">
            <Image 
              source={require('../../assets/images/logo-hortifruti.png')} 
              className="w-12 h-12 rounded-full mr-3"
              resizeMode="cover"
            />
            <View>
              <Text className="text-lg font-bold">{storeName}</Text>
              <TouchableOpacity>
                <Text className="text-[#41B54A]">Adicionar mais itens</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Cupom de desconto */}
          <View className="bg-white rounded-lg p-4 mb-4">
            <Text className="text-lg font-bold mb-3">Cupom de desconto</Text>
            
            <View className="flex-row">
              <TextInput
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2"
                placeholder="Digite o código do cupom"
                value={couponCode}
                onChangeText={setCouponCode}
              />
              <TouchableOpacity
                className="bg-green-500 rounded-r-lg px-4 items-center justify-center"
                onPress={applyDiscount}
              >
                <Text className="text-white font-medium">Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Pagamento pelo app */}
          <View className="bg-white rounded-lg p-4 mb-4">
            <Text className="text-lg font-bold mb-3">Pagamento pelo app</Text>
            
            {/* Método de pagamento selecionado */}
            {renderSelectedPaymentMethod()}
          </View>
          
          {/* Cupom bloqueado */}
          <View className="bg-white rounded-lg p-4 mb-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Icon name="ticket-percent-outline" size={24} color="#333" className="mr-2" />
                <View>
                  <Text className="text-base font-medium">Cupom</Text>
                  <Text className="text-sm text-gray-500">1 bloqueado nesta loja</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text className="text-[#41B54A] font-bold">Ver</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Gorjeta */}
          <View className="bg-white rounded-lg p-4 mb-6">
            <Text className="text-lg font-bold mb-1">Sua gorjeta faz a diferença</Text>
            <Text className="text-gray-500 mb-2">Opção disponível apenas para pagamentos no cartão de crédito à vista</Text>
          </View>
          
          {/* Resumo de valores */}
          <View className="bg-white rounded-lg p-4 mb-6">
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
              <Text className="font-bold text-xl text-[#41B54A]">R$ {finalTotal.toFixed(2).replace('.', ',')}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Rodapé com botão de revisar pedido */}
      <View className="bg-white p-4 shadow-t-sm">
        <TouchableOpacity
          className="bg-[#41B54A] rounded-lg p-4 items-center justify-center"
          onPress={handleContinue}
        >
          <Text className="text-white font-bold text-lg">
            Revisar pedido • R$ {finalTotal.toFixed(2).replace('.', ',')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen; 