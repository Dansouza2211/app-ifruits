import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Criando o contexto
const PaymentContext = createContext();

// Hook personalizado para usar o contexto de pagamento
export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment deve ser usado dentro de um PaymentProvider');
  }
  return context;
};

// Provedor do contexto
export const PaymentProvider = ({ children }) => {
  // Estado para armazenar os cartões do usuário
  const [cards, setCards] = useState([]);
  
  // Estado para armazenar o método de pagamento selecionado
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
    type: 'apple', // 'apple', 'card', 'money', 'pix'
    id: null, // ID do cartão, se aplicável
  });
  
  // Carregar dados salvos quando o componente é montado
  useEffect(() => {
    const loadData = async () => {
      try {
        // Carregar cartões salvos
        const savedCards = await AsyncStorage.getItem('user_cards');
        if (savedCards) {
          setCards(JSON.parse(savedCards));
        }
        
        // Carregar método de pagamento selecionado
        const savedMethod = await AsyncStorage.getItem('selected_payment_method');
        if (savedMethod) {
          setSelectedPaymentMethod(JSON.parse(savedMethod));
        }
      } catch (error) {
        console.error('Erro ao carregar dados de pagamento:', error);
      }
    };
    
    loadData();
  }, []);
  
  // Salvar alterações nos cartões
  useEffect(() => {
    const saveCards = async () => {
      try {
        await AsyncStorage.setItem('user_cards', JSON.stringify(cards));
      } catch (error) {
        console.error('Erro ao salvar cartões:', error);
      }
    };
    
    if (cards.length > 0) {
      saveCards();
    }
  }, [cards]);
  
  // Salvar alterações no método de pagamento selecionado
  useEffect(() => {
    const saveSelectedMethod = async () => {
      try {
        await AsyncStorage.setItem('selected_payment_method', JSON.stringify(selectedPaymentMethod));
      } catch (error) {
        console.error('Erro ao salvar método de pagamento:', error);
      }
    };
    
    saveSelectedMethod();
  }, [selectedPaymentMethod]);
  
  // Adicionar um novo cartão
  const addCard = (card) => {
    const newCard = {
      id: Date.now().toString(),
      ...card
    };
    setCards([...cards, newCard]);
    return newCard;
  };
  
  // Atualizar um cartão existente
  const updateCard = (id, updatedCard) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, ...updatedCard } : card
    ));
  };
  
  // Remover um cartão
  const removeCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
    
    // Se o cartão removido era o selecionado, resetar para o padrão
    if (selectedPaymentMethod.type === 'card' && selectedPaymentMethod.id === id) {
      setSelectedPaymentMethod({ type: 'apple', id: null });
    }
  };
  
  // Selecionar um método de pagamento
  const selectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };
  
  // Obter o método de pagamento selecionado
  const getSelectedPaymentMethod = () => {
    if (selectedPaymentMethod.type === 'card' && selectedPaymentMethod.id) {
      const selectedCard = cards.find(card => card.id === selectedPaymentMethod.id);
      if (selectedCard) {
        return {
          ...selectedPaymentMethod,
          card: selectedCard
        };
      }
    }
    
    return selectedPaymentMethod;
  };
  
  return (
    <PaymentContext.Provider
      value={{
        cards,
        addCard,
        updateCard,
        removeCard,
        selectPaymentMethod,
        getSelectedPaymentMethod,
        selectedPaymentMethod
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}; 