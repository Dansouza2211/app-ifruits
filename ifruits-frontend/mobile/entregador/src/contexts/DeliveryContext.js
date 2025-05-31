import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dados mockados de entregas disponíveis
const mockDeliveries = [
  {
    id: '12345',
    restaurant: 'iLanches Hamburgueria',
    address: 'Av. Paulista, 1000, São Paulo',
    customer: 'Maria Silva',
    items: [
      { name: 'X-Tudo', quantity: 1 },
      { name: 'Refrigerante Lata', quantity: 1 }
    ],
    distance: 3.5,
    estimatedTime: 25,
    value: 12.90,
    pickup: 'Av. Paulista, 1000, São Paulo',
    delivery: 'Rua Augusta, 123, São Paulo'
  },
  {
    id: '12346',
    restaurant: 'Pizza Express',
    address: 'Rua Augusta, 500, São Paulo',
    customer: 'João Oliveira',
    items: [
      { name: 'Pizza Grande Calabresa', quantity: 1 }
    ],
    distance: 4.2,
    estimatedTime: 30,
    value: 15.50,
    pickup: 'Rua Augusta, 500, São Paulo',
    delivery: 'Av. Faria Lima, 987, São Paulo'
  }
];

// Criando o contexto
const DeliveryContext = createContext();

// Hook personalizado para usar o contexto
export const useDelivery = () => useContext(DeliveryContext);

// Provedor do contexto
export const DeliveryProvider = ({ children }) => {
  const [isDeliveryMode, setIsDeliveryMode] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentDelivery, setCurrentDelivery] = useState(null);
  const [deliveries, setDeliveries] = useState(mockDeliveries);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [earnings, setEarnings] = useState({
    today: 0,
    week: 120.50,
    month: 760.80
  });

  // Carregar dados quando o app inicia
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const deliveryModeData = await AsyncStorage.getItem('@ifruits_deliveryMode');
        if (deliveryModeData) {
          setIsDeliveryMode(JSON.parse(deliveryModeData));
        }

        const currentDeliveryData = await AsyncStorage.getItem('@ifruits_currentDelivery');
        if (currentDeliveryData) {
          setCurrentDelivery(JSON.parse(currentDeliveryData));
        }
      } catch (error) {
        console.error('Erro ao carregar dados de entrega:', error);
      }
    };

    loadSavedData();
  }, []);

  // Iniciar modo de entrega
  const startDeliveryMode = () => {
    setIsDeliveryMode(true);
  };

  // Parar modo de entrega
  const stopDeliveryMode = () => {
    setIsDeliveryMode(false);
  };

  // Aceitar entrega
  const acceptDelivery = (deliveryId) => {
    const delivery = deliveries.find(d => d.id === deliveryId);
    if (delivery) {
      setCurrentDelivery({
        ...delivery,
        status: 'accepted',
        acceptedAt: new Date().toISOString()
      });
      setDeliveries(prev => prev.filter(d => d.id !== deliveryId));
    }
  };

  // Recusar entrega
  const rejectDelivery = (deliveryId) => {
    setDeliveries(prev => prev.filter(d => d.id !== deliveryId));
  };

  // Iniciar entrega
  const startDelivery = () => {
    if (currentDelivery) {
      setCurrentDelivery({
        ...currentDelivery,
        status: 'in_progress',
        startedAt: new Date().toISOString()
      });
    }
  };

  // Completar entrega
  const completeDelivery = () => {
    if (currentDelivery) {
      const completedDelivery = {
        ...currentDelivery,
        status: 'completed',
        completedAt: new Date().toISOString()
      };
      
      setOrders(prev => [completedDelivery, ...prev]);
      setCurrentDelivery(null);
      
      // Atualizar ganhos
      const newEarnings = { ...earnings };
      newEarnings.today += currentDelivery.value;
      setEarnings(newEarnings);
    }
  };

  // Cancelar entrega
  const cancelDelivery = () => {
    if (currentDelivery) {
      const canceledDelivery = {
        ...currentDelivery,
        status: 'canceled',
        canceledAt: new Date().toISOString()
      };
      
      setOrders(prev => [canceledDelivery, ...prev]);
      setCurrentDelivery(null);
    }
  };

  // Atualizar localização atual
  const updateLocation = (location) => {
    setCurrentLocation(location);
  };

  return (
    <DeliveryContext.Provider
      value={{
        isDeliveryMode,
        currentLocation,
        currentDelivery,
        deliveries,
        orders,
        earnings,
        isLoading,
        startDeliveryMode,
        stopDeliveryMode,
        acceptDelivery,
        rejectDelivery,
        startDelivery,
        completeDelivery,
        cancelDelivery,
        updateLocation
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryContext; 