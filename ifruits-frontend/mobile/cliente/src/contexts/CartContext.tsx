import React, { createContext, useState, useContext, useEffect } from 'react';
import { useModal } from './ModalContext';
import { hortifruti } from '../utils/mockData';
import { supabase } from 'utils/supabase';
import { Alert } from 'react-native';

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
  const [cartId, setCartId] = useState('');
  const { alert, showSuccess } = useModal();

  // Inicializar com a loja HortiFruti
  useEffect(() => {
    if (!storeInfo) {
      setStoreInfo(DEFAULT_STORE);
    }
  }, []);

  // Adicionar um item ao carrinho
  const addToCart = async (product, store = DEFAULT_STORE, quantity = 1) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Erro ao puxar id do usuário: ", userError?.message);
      return;
    }

    const userId = userData.user?.id;

    const { data: cartData, error: cartError } = await supabase
      .from('carrinho')
      .select('id')
      .eq('id_Usuario', userId);

    if (cartError) {
      console.error("Erro ao puxar dados do carrinho: ", cartError.message);
      return;
    }

    let cartIdToUse;

    if (!cartData || cartData.length === 0) {
      const { data: newCartData, error: newCartError } = await supabase.from('carrinho')
        .insert([{ id_Usuario: userId }])
        .select()
        .single();

      if (newCartError) {
        console.error("Erro ao criar carrinho");
        return;
      }
      cartIdToUse = newCartData.id;
      setCartId(cartIdToUse);
    } else {
      cartIdToUse = cartData[0].id;
      setCartId(cartIdToUse);
    }

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
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      // Atualiza no Supabase somando quantidade
      const { data: itemData, error: fetchError } = await supabase
        .from('itens_carrinho')
        .select('quantidade')
        .eq('id_Carrinho', cartId)
        .eq('id_Produto', product.id)
        .single();

      if (fetchError) {
        console.error("Erro ao carregar item do carrinho:", fetchError.message);
        return;
      }

      const novaQuantidade = itemData.quantidade + quantity;

      const { error: updateError } = await supabase
        .from('itens_carrinho')
        .update({ quantidade: novaQuantidade })
        .eq('id_Carrinho', cartIdToUse)
        .eq('id_Produto', product.id);

      if (updateError) {
        console.error("Erro ao atualizar quantidade:", updateError.message);
        return;
      }

      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const { error: insertError } = await supabase
        .from('itens_carrinho')
        .insert([{
          id_Carrinho: cartIdToUse,
          id_Produto: product.id,
          quantidade: quantity
        }]);

      if (insertError) {
        console.error("Erro ao adicionar item ao carrinho:", insertError.message);
        return;
      }

      setCartItems(prevItems => [...prevItems, { ...product, quantity }]);
    }
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
  const increaseQuantity = async (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    const { data: increaseData, error: increaseError } = await supabase.from("itens_carrinho")
      .select("quantidade")
      .eq("id_Carrinho", cartId)
      .eq("id_Produto", productId)
      .single();

    if (increaseError) {
      console.error("Erro ao puxar dados dos itens do carrinho: ", increaseError.message);
      return;
    };

    const incremento = increaseData.quantidade + 1;

    const { error } = await supabase.from("itens_carrinho")
      .update({ quantidade: incremento })
      .eq("id_Carrinho", cartId)
      .eq("id_Produto", productId);

    if (error) {
      console.error("Erro ao incrementar item no carrinho: ", error.message);
      return;
    }
  };

  // Diminuir a quantidade de um item
  const decreaseQuantity = async (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );

    const { data: decreaseData, error: decreaseError } = await supabase.from("itens_carrinho")
      .select("quantidade")
      .eq("id_Carrinho", cartId)
      .eq("id_Produto", productId)
      .single();

    if (decreaseError) {
      console.error("Erro ao puxar dados dos itens do carrinho: ", decreaseError.message);
      return;
    };

    const decremento = decreaseData.quantidade - 1;

    const { error } = await supabase.from("itens_carrinho")
      .update({ quantidade: decremento })
      .eq("id_Carrinho", cartId)
      .eq("id_Produto", productId);

    if (error) {
      console.error("Erro ao incrementar item no carrinho: ", error.message);
      return;
    }
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