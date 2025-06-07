import React, { createContext, useState, useContext, useEffect } from 'react';
import { useModal } from './ModalContext';
import { hortifruti } from '../utils/mockData';

// Loja HortiFruti padrão
const DEFAULT_STORE = hortifruti;

// Criando o contexto
const CartContext = createContext();

// Hook personalizado para usar o contexto
export const useCart = () => useContext(CartContext);

// Provider do contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [storeInfo, setStoreInfo] = useState(DEFAULT_STORE);
  const { alert, showSuccess } = useModal();
  
  // Inicializar com a loja HortiFruti
  useEffect(() => {
    if (!storeInfo) {
      setStoreInfo(DEFAULT_STORE);
    }
  }, []);
  
  // Adicionar um item ao carrinho
  const addToCart = (product, store = DEFAULT_STORE, quantity = 1) => {
    // Verificar se já existem itens de outra loja
    if (cartItems.length > 0 && storeInfo && storeInfo.id !== store.id) {
      alert(
        "Itens de outra loja",
        "Você possui itens de outra loja no carrinho, finalize primeiro ou esvazie o carrinho para continuar.",
        [
          {
            text: "Manter carrinho",
            style: "cancel"
          },
          { 
            text: "Esvaziar e adicionar", 
            onPress: () => {
              setCartItems([{ ...product, quantity }]);
              setStoreInfo(store);
            }
          }
        ],
        'warning'
      );
      return false;
    }
    
    // Se o carrinho está vazio ou é da mesma loja, adiciona o item
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Se o item já existe, incrementa a quantidade
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Se o item não existe, adiciona ao carrinho
        return [...prevItems, { ...product, quantity }];
      }
    });
    
    // Salvar informações da loja se for o primeiro item
    if (cartItems.length === 0) {
      setStoreInfo(store);
    }
    
    // Mostrar feedback de sucesso
    showSuccess(
      "Produto adicionado",
      `${product.name} foi adicionado ao seu carrinho!`,
      []
    );
    
    return true;
  };
  
  // Aumentar a quantidade de um item
  const increaseQuantity = (productId) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };
  
  // Diminuir a quantidade de um item
  const decreaseQuantity = (productId) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: Math.max(1, item.quantity - 1) } 
          : item
      )
    );
  };
  
  // Remover um item do carrinho
  const removeItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  // Limpar o carrinho
  const clearCart = () => {
    setCartItems([]);
    setStoreInfo(null);
  };
  
  // Obter o total de itens no carrinho
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  // Obter o valor total do carrinho
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  return (
    <CartContext.Provider value={{
      cartItems,
      storeInfo,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext; 