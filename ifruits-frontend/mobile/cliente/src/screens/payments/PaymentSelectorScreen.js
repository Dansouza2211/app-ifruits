import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { usePayment } from '../../contexts/PaymentContext';

// Componente para um método de pagamento
const PaymentMethod = ({ title, icon, selected, onSelect, rightText }) => (
  <TouchableOpacity 
    onPress={onSelect}
    className={`flex-row items-center justify-between p-4 border-b border-gray-100 ${selected ? 'bg-green-50' : ''}`}
  >
    <View className="flex-row items-center">
      {typeof icon === 'string' ? (
        <Icon name={icon} size={24} color="#333" className="mr-3" />
      ) : (
        <Image 
          source={icon} 
          className="w-8 h-8 mr-3" 
          resizeMode="contain"
        />
      )}
      <Text className="text-base">{title}</Text>
    </View>
    
    <View className="flex-row items-center">
      {rightText && (
        <Text className="text-gray-500 mr-2">{rightText}</Text>
      )}
      {selected && (
        <Icon name="check-circle" size={20} color="#41B54A" />
      )}
    </View>
  </TouchableOpacity>
);

// Componente para um cartão
const CardItem = ({ card, selected, onSelect }) => {
  // Função para formatar o número do cartão (exibir apenas os últimos 4 dígitos)
  const formatCardNumber = (number) => {
    if (!number) return '';
    const last4 = number.slice(-4);
    return `•••• ${last4}`;
  };

  return (
    <TouchableOpacity 
      onPress={onSelect}
      className={`p-4 border-b border-gray-100 ${selected ? 'bg-green-50' : ''}`}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Icon 
            name="credit-card-outline" 
            size={24} 
            color="#333" 
            className="mr-3" 
          />
          <View>
            <Text className="text-base">{formatCardNumber(card.number)}</Text>
            <Text className="text-xs text-gray-500">{card.holder}</Text>
          </View>
        </View>
        
        {selected && (
          <Icon name="check-circle" size={20} color="#41B54A" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function PaymentSelectorScreen({ navigation, route }) {
  const { cards, selectPaymentMethod, selectedPaymentMethod } = usePayment();
  const [localSelectedMethod, setLocalSelectedMethod] = useState(selectedPaymentMethod);

  // Aplicar seleção atual quando a tela é montada
  useEffect(() => {
    setLocalSelectedMethod(selectedPaymentMethod);
  }, [selectedPaymentMethod]);

  // Função para voltar
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Função para navegar para a tela de cadastro de cartão
  const handleNavigateToCardRegister = () => {
    navigation.navigate('CardRegister');
  };

  // Função para selecionar um método de pagamento
  const handleSelectMethod = (type, id = null) => {
    setLocalSelectedMethod({ type, id });
  };

  // Função para confirmar a seleção e voltar
  const handleConfirm = () => {
    selectPaymentMethod(localSelectedMethod);
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity 
          onPress={handleGoBack}
          className="mr-3"
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-800">Forma de Pagamento</Text>
      </View>
      
      <ScrollView className="flex-1">
        <Animated.View entering={FadeInUp.delay(100).duration(300)}>
          {/* Métodos de pagamento digitais */}
          <View className="p-4">
            <Text className="text-lg font-bold mb-2">Pagamento pelo app</Text>
            
            <View className="bg-white rounded-lg border border-gray-100 overflow-hidden">
              <PaymentMethod 
                title="Apple Pay"
                icon={require('../../assets/images/apple-pay.png')}
                selected={localSelectedMethod.type === 'apple'}
                onSelect={() => handleSelectMethod('apple')}
              />
              
              <PaymentMethod 
                title="Google Pay"
                icon="google-pay"
                selected={localSelectedMethod.type === 'google'}
                onSelect={() => handleSelectMethod('google')}
              />
              
              <PaymentMethod 
                title="Pix"
                icon="qrcode"
                selected={localSelectedMethod.type === 'pix'}
                onSelect={() => handleSelectMethod('pix')}
              />
            </View>
          </View>
          
          {/* Cartões de crédito */}
          <View className="p-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-bold">Cartões</Text>
              <TouchableOpacity onPress={handleNavigateToCardRegister}>
                <Text className="text-primary font-medium">Adicionar</Text>
              </TouchableOpacity>
            </View>
            
            <View className="bg-white rounded-lg border border-gray-100 overflow-hidden">
              {cards.length > 0 ? (
                cards.map((card) => (
                  <CardItem 
                    key={card.id}
                    card={card}
                    selected={localSelectedMethod.type === 'card' && localSelectedMethod.id === card.id}
                    onSelect={() => handleSelectMethod('card', card.id)}
                  />
                ))
              ) : (
                <View className="p-4 items-center">
                  <Text className="text-gray-500 mb-2">Nenhum cartão cadastrado</Text>
                  <TouchableOpacity 
                    onPress={handleNavigateToCardRegister}
                    className="bg-primary px-4 py-2 rounded-full"
                  >
                    <Text className="text-white">Cadastrar Cartão</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          
          {/* Outros métodos */}
          <View className="p-4">
            <Text className="text-lg font-bold mb-2">Dinheiro</Text>
            
            <View className="bg-white rounded-lg border border-gray-100 overflow-hidden">
              <PaymentMethod 
                title="Dinheiro"
                icon="cash"
                rightText="Pagamento na entrega"
                selected={localSelectedMethod.type === 'money'}
                onSelect={() => handleSelectMethod('money')}
              />
            </View>
          </View>
        </Animated.View>
      </ScrollView>
      
      {/* Botão de confirmar */}
      <View className="p-4 border-t border-gray-100">
        <TouchableOpacity 
          className="bg-primary py-3 rounded-lg items-center"
          onPress={handleConfirm}
        >
          <Text className="text-white font-bold">Confirmar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
} 