import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const OrderTrackingScreen = ({ route }) => {
  const navigation = useNavigation();
  const { 
    orderNumber = '5432', 
    restaurantName = 'Burger King - Águas Claras', 
    total = 59.90, 
    address = { street: 'R Treze De Maio', number: '45', neighborhood: 'Bela Vista' } 
  } = route.params || {};
  
  const [orderStatus, setOrderStatus] = useState('preparing'); // preparing, ontheway, delivered
  const [deliveryTime, setDeliveryTime] = useState({ min: '02:39', max: '02:49' });
  const [deliveryPerson, setDeliveryPerson] = useState({
    name: 'Lucas Cabral',
    photo: require('../../assets/images/delivery-person.png'),
    type: 'Motocicleta',
    partner: 'Entrega parceira',
  });
  
  // Coordenadas simuladas para o mapa
  const [region, setRegion] = useState({
    latitude: -23.5505,
    longitude: -46.6333,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  const [deliveryLocation, setDeliveryLocation] = useState({
    latitude: -23.5535,
    longitude: -46.6275,
  });
  
  const [destinationLocation, setDestinationLocation] = useState({
    latitude: -23.5605,
    longitude: -46.6380,
  });
  
  // Código de entrega
  const deliveryCode = '8860';
  
  // Atualiza o status do pedido após um tempo
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setOrderStatus('ontheway');
    }, 10000);
    
    return () => {
      clearTimeout(timer1);
    };
  }, []);
  
  // Formatar o status do pedido
  const getStatusText = () => {
    switch (orderStatus) {
      case 'preparing':
        return 'O pedido está sendo preparado e sairá pra entrega';
      case 'ontheway':
        return 'Lucas está indo até você';
      case 'delivered':
        return 'Pedido entregue';
      default:
        return '';
    }
  };
  
  const renderStatusStep = () => {
    const steps = [
      { id: 'preparing', label: 'Preparando' },
      { id: 'ontheway', label: 'A caminho' },
      { id: 'delivered', label: 'Entregue' }
    ];
    
    // Determinar o passo atual
    let currentStepIndex = steps.findIndex(step => step.id === orderStatus);
    if (currentStepIndex === -1) currentStepIndex = 0;
    
    return (
      <View className="w-full">
        <View className="flex-row items-center mb-4 mt-2">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Círculo de status */}
              <View className={`w-6 h-6 rounded-full items-center justify-center ${index <= currentStepIndex ? 'bg-[#41B54A]' : 'bg-gray-300'}`}>
                {index < currentStepIndex ? (
                  <Icon name="check" size={16} color="white" />
                ) : (
                  <View className={`w-2 h-2 rounded-full ${index === currentStepIndex ? 'bg-white' : 'bg-gray-400'}`} />
                )}
              </View>
              
              {/* Texto do status */}
              <Text className={`mx-2 ${index <= currentStepIndex ? 'text-[#41B54A] font-bold' : 'text-gray-500'}`}>
                {step.label}
              </Text>
              
              {/* Linha conectora (exceto para o último item) */}
              {index < steps.length - 1 && (
                <View className={`flex-1 h-1 ${index < currentStepIndex ? 'bg-[#41B54A]' : 'bg-gray-300'}`} />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    );
  };
  
  // Função para ligar para o entregador
  const callDeliveryPerson = () => {
    Linking.openURL('tel:+5511999999999');
  };
  
  // Função para abrir o chat
  const openChat = () => {
    navigation.navigate('ChatWithDelivery', { deliveryPerson });
  };

  // Função para confirmar a entrega
  const confirmDelivery = () => {
    setOrderStatus('delivered');
    
    // Aguardar a animação completar e voltar para a lista de pedidos
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };
  
  // Função para voltar para a lista de pedidos
  const goBackToOrders = () => {
    navigation.goBack();
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['right', 'top', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Cabeçalho */}
      <View className="bg-white pt-2 shadow-sm">
        <View className="flex-row items-center justify-between px-4 py-3">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={goBackToOrders}
              className="w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-200"
            >
              <Icon name="chevron-left" size={26} color="#41B54A" />
            </TouchableOpacity>
            <Text className="ml-4 text-lg font-bold">ACOMPANHE SEU PEDIDO</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-base text-[#41B54A] font-medium">Ajuda</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Status atual e previsão */}
        <View className="bg-white p-4">
          <Text className="text-lg font-bold mb-2">Previsão de entrega</Text>
          <Text className="text-2xl font-bold mb-2">{deliveryTime.min} - {deliveryTime.max}</Text>
          
          {/* Barra de progresso de status */}
          {renderStatusStep()}
          
          {/* Texto de status atual */}
          <View className="flex-row items-center mt-2">
            <View className="w-2 h-2 rounded-full bg-[#41B54A] mr-2" />
            <Text className="text-base">{getStatusText()}</Text>
          </View>
        </View>
        
        {/* Mapa de rastreamento */}
        <View className="h-48">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={region}
            showsUserLocation={true}
          >
            {/* Marcador do entregador */}
            <Marker
              coordinate={deliveryLocation}
              title="Entregador"
              description="Seu entregador está aqui"
            >
              <View className="bg-[#41B54A] p-2 rounded-full">
                <Icon name="motorbike" size={20} color="white" />
              </View>
            </Marker>
            
            {/* Marcador do destino */}
            <Marker
              coordinate={destinationLocation}
              title="Seu endereço"
              description="Local de entrega"
            >
              <View className="bg-red-500 p-2 rounded-full">
                <Icon name="map-marker" size={20} color="white" />
              </View>
            </Marker>
          </MapView>
        </View>
        
        {/* Informações de entrega */}
        <View className="bg-white p-4 mb-4">
          <View className="mb-4">
            <Text className="text-base font-medium mb-2">Entrega em</Text>
            <Text className="text-base">R Treze De Maio, Bela Vista</Text>
          </View>
          
          <View className="mb-4">
            <Text className="text-base font-medium mb-2">Seu pedido chegou?</Text>
            <Text className="text-base text-gray-500">Confirme assim que receber o pedido e nos ajude a saber se deu tudo certo.</Text>
          </View>
          
          <TouchableOpacity 
            className="bg-[#41B54A] rounded-lg py-3 items-center"
            onPress={confirmDelivery}
          >
            <Text className="text-white font-bold text-base">Confirmar Entrega</Text>
          </TouchableOpacity>
        </View>
        
        {/* Informações do entregador (condicionalmente renderizado) */}
        {orderStatus === 'ontheway' && (
          <View className="bg-white p-4 mb-28">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <Image 
                  source={deliveryPerson.photo} 
                  className="w-12 h-12 rounded-full mr-3"
                />
                <View>
                  <Text className="text-base font-bold">{deliveryPerson.name}</Text>
                  <Text className="text-sm text-gray-500">{deliveryPerson.type} • {deliveryPerson.partner}</Text>
                </View>
              </View>
              
              <TouchableOpacity onPress={callDeliveryPerson} className="bg-white border border-[#41B54A] rounded-lg px-3 py-1">
                <Text className="text-[#41B54A] font-medium">Ligar</Text>
              </TouchableOpacity>
            </View>
            
            {/* Código de entrega */}
            <View className="flex-row items-center mt-4">
              <Text className="text-base font-medium mr-2">Código de entrega</Text>
              <Icon name="information-outline" size={16} color="#999" />
            </View>
            <View className="bg-gray-100 rounded-lg p-2 mt-2 items-center">
              <Text className="text-xl font-bold tracking-widest">{deliveryCode}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderTrackingScreen; 