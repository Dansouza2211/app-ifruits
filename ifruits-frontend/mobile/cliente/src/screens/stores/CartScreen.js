import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../contexts/CartContext';
import { useModal } from '../../contexts/ModalContext';

// Componente para exibir item do carrinho
const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => (
  <View className="flex-row bg-white p-3 rounded-lg shadow-sm mb-3">
    <Image
      source={item.image}
      className="w-16 h-16 rounded-lg mr-3"
      resizeMode="cover"
    />
    <View className="flex-1">
      <View className="flex-row justify-between">
        <Text className="text-base font-bold text-gray-800 mb-1" numberOfLines={1}>
          {item.name}
        </Text>
        <TouchableOpacity onPress={() => onRemove(item.id)}>
          <Icon name="close" size={20} color="#999" />
        </TouchableOpacity>
      </View>
      <Text className="text-xs text-gray-500 mb-2" numberOfLines={1}>{item.weight}</Text>
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-bold text-green-600">
          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
        </Text>
        <View className="flex-row items-center">
          <TouchableOpacity
            className="w-7 h-7 rounded-full bg-gray-100 items-center justify-center"
            onPress={() => onDecrease(item.id)}
            disabled={item.quantity <= 1}
          >
            <Icon name="minus" size={16} color={item.quantity > 1 ? '#41B54A' : '#ccc'} />
          </TouchableOpacity>
          <Text className="mx-2 font-medium">{item.quantity}</Text>
          <TouchableOpacity
            className="w-7 h-7 rounded-full bg-green-100 items-center justify-center"
            onPress={() => onIncrease(item.id)}
          >
            <Icon name="plus" size={16} color="#41B54A" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

// Componente para exibir resumo do pedido
const OrderSummary = ({ subtotal, deliveryFee, discount, total }) => (
  <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
    <Text className="text-lg font-bold mb-3">Resumo do pedido</Text>
    
    <View className="flex-row justify-between mb-2">
      <Text className="text-gray-600">Subtotal</Text>
      <Text className="font-medium">R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
    </View>
    
    <View className="flex-row justify-between mb-2">
      <Text className="text-gray-600">Taxa de entrega</Text>
      <Text className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
        {deliveryFee === 0 ? 'Grátis' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}
      </Text>
    </View>
    
    {discount > 0 && (
      <View className="flex-row justify-between mb-2">
        <Text className="text-gray-600">Desconto</Text>
        <Text className="font-medium text-green-600">- R$ {discount.toFixed(2).replace('.', ',')}</Text>
      </View>
    )}
    
    <View className="border-t border-gray-200 my-2" />
    
    <View className="flex-row justify-between">
      <Text className="font-bold text-base">Total</Text>
      <Text className="font-bold text-lg text-green-600">R$ {total.toFixed(2).replace('.', ',')}</Text>
    </View>
  </View>
);

// Componente para exibir campo de cupom
const CouponField = ({ coupon, setCoupon, onApplyCoupon }) => (
  <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
    <Text className="text-lg font-bold mb-3">Cupom de desconto</Text>
    
    <View className="flex-row">
      <TextInput
        className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-base"
        placeholder="Digite o código do cupom"
        value={coupon}
        onChangeText={setCoupon}
      />
      <TouchableOpacity
        className="bg-green-500 rounded-r-lg px-4 items-center justify-center"
        onPress={onApplyCoupon}
      >
        <Text className="text-white font-medium">Aplicar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Componente para exibir método de pagamento
const PaymentMethod = ({ selectedMethod, onSelectMethod }) => (
  <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
    <Text className="text-lg font-bold mb-3">Forma de pagamento</Text>
    
    <TouchableOpacity 
      className="flex-row items-center py-3 border-b border-gray-200"
      onPress={() => onSelectMethod('credit')}
    >
      <View className={`w-5 h-5 rounded-full border-2 ${selectedMethod === 'credit' ? 'border-green-500' : 'border-gray-300'} items-center justify-center`}>
        {selectedMethod === 'credit' && (
          <View className="w-3 h-3 rounded-full bg-green-500" />
        )}
      </View>
      <Icon name="credit-card" size={20} color="#666" className="ml-3 mr-2" />
      <Text className="ml-2">Cartão de crédito</Text>
    </TouchableOpacity>
    
    <TouchableOpacity 
      className="flex-row items-center py-3 border-b border-gray-200"
      onPress={() => onSelectMethod('debit')}
    >
      <View className={`w-5 h-5 rounded-full border-2 ${selectedMethod === 'debit' ? 'border-green-500' : 'border-gray-300'} items-center justify-center`}>
        {selectedMethod === 'debit' && (
          <View className="w-3 h-3 rounded-full bg-green-500" />
        )}
      </View>
      <Icon name="credit-card-outline" size={20} color="#666" className="ml-3 mr-2" />
      <Text className="ml-2">Cartão de débito</Text>
    </TouchableOpacity>
    
    <TouchableOpacity 
      className="flex-row items-center py-3"
      onPress={() => onSelectMethod('money')}
    >
      <View className={`w-5 h-5 rounded-full border-2 ${selectedMethod === 'money' ? 'border-green-500' : 'border-gray-300'} items-center justify-center`}>
        {selectedMethod === 'money' && (
          <View className="w-3 h-3 rounded-full bg-green-500" />
        )}
      </View>
      <Icon name="cash" size={20} color="#666" className="ml-3 mr-2" />
      <Text className="ml-2">Dinheiro</Text>
    </TouchableOpacity>
  </View>
);

// Componente para botão de finalizar pedido
const CheckoutButton = ({ total, onPress }) => (
  <TouchableOpacity
    className="bg-[#41B54A] rounded-lg p-4 items-center justify-center"
    onPress={onPress}
  >
    <Text className="text-white font-bold text-lg">
      Finalizar pedido • R$ {total.toFixed(2).replace('.', ',')}
    </Text>
  </TouchableOpacity>
);

export default function CartScreen() {
  const navigation = useNavigation();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const { showSuccess, alert } = useModal();
  
  const { 
    cartItems, 
    storeInfo,
    increaseQuantity, 
    decreaseQuantity, 
    removeItem, 
    clearCart, 
    getTotalPrice 
  } = useCart();
  
  // Função para aplicar cupom de desconto
  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'IFRUITS10') {
      // Aplicar 10% de desconto
      const subtotal = getTotalPrice();
      setDiscount(subtotal * 0.1);
      showSuccess('Cupom aplicado!', 'Você recebeu 10% de desconto.');
    } else if (coupon.toUpperCase() === 'FRETE') {
      // Frete grátis
      setDeliveryFee(0);
      setDiscount(6.90); // Assumindo que o frete padrão é R$ 6,90
      showSuccess('Cupom aplicado!', 'Frete grátis aplicado.');
    } else {
      alert('Cupom inválido', 'Este cupom não existe ou já expirou.', [], 'error');
    }
  };
  
  // Função para finalizar o pedido
  const handleCheckout = () => {
    // Redirecionar para a tela de confirmação de endereço
    navigation.navigate('AddressConfirmationScreen', {
      total: total,
      cartItems: cartItems,
      storeInfo: storeInfo
    });
  };
  
  // Calcular subtotal
  const subtotal = getTotalPrice();
  
  // Calcular total
  const total = subtotal + deliveryFee - discount;
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['right', 'top', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Cabeçalho */}
      <View className="bg-gray-50 pt-2">
        <View className="flex-row items-center px-4 py-3">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-white shadow-sm items-center justify-center"
            style={{ elevation: 2 }}
          >
            <Icon name="chevron-left" size={26} color="#333" />
          </TouchableOpacity>
          <Text className="ml-4 text-lg font-bold">Carrinho</Text>
          <Text className="ml-2 text-sm text-gray-500">HortiFruti</Text>
        </View>
      </View>
      
      {cartItems.length === 0 ? (
        // Carrinho vazio
        <View className="flex-1 items-center justify-center p-4">
          <Icon name="cart-outline" size={80} color="#ccc" />
          <Text className="text-xl font-bold text-gray-500 mt-4 mb-2">Seu carrinho está vazio</Text>
          <Text className="text-gray-500 text-center mb-6">Adicione produtos para continuar</Text>
          <TouchableOpacity
            className="bg-green-500 rounded-lg px-6 py-3"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white font-bold">Adicionar produtos</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Carrinho com itens
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="p-4">
            {/* Lista de itens do carrinho */}
            <View className="mb-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onRemove={removeItem}
                />
              ))}
            </View>
            
            {/* Campo de cupom */}
            <CouponField
              coupon={coupon}
              setCoupon={setCoupon}
              onApplyCoupon={handleApplyCoupon}
            />
            
            {/* Método de pagamento */}
            <PaymentMethod
              selectedMethod={paymentMethod}
              onSelectMethod={setPaymentMethod}
            />
            
            {/* Resumo do pedido */}
            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              discount={discount}
              total={total}
            />
            
            {/* Botão de finalizar pedido */}
            <CheckoutButton
              total={total}
              onPress={handleCheckout}
            />
            
            {/* Espaço extra no final */}
            <View className="h-8" />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
} 