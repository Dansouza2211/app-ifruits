import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { usePayment } from '../../contexts/PaymentContext';

// Componente para cartão
const CardItem = ({ card, onEdit, onDelete, index, total }) => {
  // Função para formatar o número do cartão (exibir apenas os últimos 4 dígitos)
  const formatCardNumber = (number) => {
    if (!number) return '';
    const last4 = number.slice(-4);
    return `•••• ${last4}`;
  };

  return (
    <Animated.View 
      entering={FadeInUp.delay(200).duration(400)}
      className="bg-white rounded-xl shadow-sm mb-4 border border-gray-100 p-4"
    >
      <View>
        <Text className="text-gray-500 text-xs mb-1">Nome do titular</Text>
        <View className="bg-gray-50 p-2 rounded-md mb-3">
          <Text className="text-gray-700">{card.holder}</Text>
        </View>
        
        <Text className="text-gray-500 text-xs mb-1">Número do cartão</Text>
        <View className="bg-gray-50 p-2 rounded-md mb-3">
          <Text className="text-gray-700">{formatCardNumber(card.number)}</Text>
        </View>
        
        <View className="flex-row mb-3">
          <View className="flex-1 mr-2">
            <Text className="text-gray-500 text-xs mb-1">Código de Segurança</Text>
            <View className="bg-gray-50 p-2 rounded-md">
              <Text className="text-gray-700">•••</Text>
            </View>
          </View>
          
          <View className="flex-1">
            <Text className="text-gray-500 text-xs mb-1">Data de Validade</Text>
            <View className="bg-gray-50 p-2 rounded-md">
              <Text className="text-gray-700">{card.expiryDate}</Text>
            </View>
          </View>
        </View>
        
        <View className="flex-row justify-between mt-2">
          <TouchableOpacity onPress={onEdit}>
            <Text className="text-primary font-medium">Editar cartão</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onDelete}>
            <Text className="text-red-500 font-medium">Excluir</Text>
          </TouchableOpacity>
        </View>
        
        {total > 1 && (
          <View className="items-center mt-4">
            <Text className="text-gray-400 text-xs">{index + 1} de {total}</Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

// Componente para transação
const TransactionItem = ({ item }) => (
  <Animated.View 
    entering={FadeInUp.delay(200).duration(400)}
    className="bg-white rounded-xl shadow-sm mb-4 border border-gray-100 overflow-hidden"
  >
    <View className="flex-row items-center p-3 border-b border-gray-100">
      <View className="w-10 h-10 rounded-full bg-primary items-center justify-center mr-3">
        <Text className="text-white font-bold">{item.store.charAt(0)}</Text>
      </View>
      <Text className="font-medium text-gray-800">{item.store}</Text>
    </View>
    
    <View className="p-3">
      <Text className="text-gray-700 mb-1">Valor da compra: <Text className="font-medium">{item.value}</Text></Text>
      <Text className="text-gray-700 mb-1">Forma de pagamento: <Text className="font-medium">{item.paymentMethod}</Text></Text>
      <Text className="text-gray-700">Data: <Text className="font-medium">{item.date}</Text></Text>
    </View>
  </Animated.View>
);

// Componentes para estados vazios
const EmptyCards = ({ onPress }) => (
  <View className="items-center justify-center p-6 bg-gray-50 rounded-xl">
    <Icon name="credit-card-outline" size={40} color="#ccc" />
    <Text className="text-gray-500 mt-2 mb-3 text-center">
      Nenhum cartão cadastrado
    </Text>
    <TouchableOpacity 
      onPress={onPress}
      className="bg-primary px-4 py-2 rounded-full"
    >
      <Text className="text-white font-medium">Cadastrar Cartão</Text>
    </TouchableOpacity>
  </View>
);

const EmptyTransactions = () => (
  <View className="items-center justify-center p-6 bg-gray-50 rounded-xl">
    <Icon name="receipt-outline" size={40} color="#ccc" />
    <Text className="text-gray-500 mt-2 text-center">
      Você ainda não possui nenhuma transação no aplicativo
    </Text>
  </View>
);

export default function PaymentsScreen({ navigation }) {
  console.log('Renderizando tela de pagamentos');
  const { cards, removeCard } = usePayment();
  const [transactions, setTransactions] = useState([
    {
      id: 't1',
      store: 'Hortifruti Santo Antônio',
      value: 'R$45,90',
      paymentMethod: 'Cartão de Crédito',
      date: '12/05/2023'
    },
    {
      id: 't2',
      store: 'Hortifruti Central',
      value: 'R$32,50',
      paymentMethod: 'Cartão de Crédito',
      date: '05/05/2023'
    }
  ]);
  const [balance, setBalance] = useState('R$00,00');
  
  // Função para voltar
  const handleGoBack = () => {
    console.log('Voltando da tela de pagamentos');
    navigation.goBack();
  };
  
  // Função para navegar para o registro de cartão
  const handleNavigateToCardRegister = () => {
    console.log('Navegando para registro de cartão');
    navigation.navigate('CardRegister');
  };
  
  // Função para editar um cartão
  const handleEditCard = (card) => {
    navigation.navigate('CardRegister', { card });
  };
  
  // Função para excluir um cartão
  const handleDeleteCard = (cardId) => {
    Alert.alert(
      'Excluir cartão',
      'Tem certeza que deseja excluir este cartão?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          onPress: () => removeCard(cardId),
          style: 'destructive'
        }
      ]
    );
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
        <Text className="text-xl font-semibold text-gray-800">Pagamentos</Text>
      </View>
      
      <ScrollView className="flex-1">
        {/* Saldo */}
        <View className="flex-row items-center px-4 py-6">
          <Text className="text-base text-gray-700">Saldo disponível: </Text>
          <Text className="text-xl font-bold text-primary">{balance}</Text>
        </View>
        
        {/* Cartões */}
        <View className="px-4 mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-semibold text-gray-800">Cartões cadastrados</Text>
            {cards.length > 0 && (
              <TouchableOpacity onPress={handleNavigateToCardRegister}>
                <Text className="text-primary font-medium">Adicionar</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {cards.length > 0 ? (
            cards.map((card, index) => (
              <CardItem 
                key={card.id} 
                card={card}
                index={index}
                total={cards.length}
                onEdit={() => handleEditCard(card)}
                onDelete={() => handleDeleteCard(card.id)}
              />
            ))
          ) : (
            <EmptyCards onPress={handleNavigateToCardRegister} />
          )}
        </View>
        
        {/* Transações */}
        <View className="px-4 mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Últimas Transações no App</Text>
          
          {transactions.length > 0 ? (
            transactions.map(transaction => (
              <TransactionItem key={transaction.id} item={transaction} />
            ))
          ) : (
            <EmptyTransactions />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 