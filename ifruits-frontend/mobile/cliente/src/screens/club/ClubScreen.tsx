import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

// Dados mockados para benefícios
const benefits = [
  {
    id: 'b1',
    title: 'Frete Grátis',
    description: 'Frete grátis para todas as compras acima de R$30',
    icon: 'truck-fast-outline'
  },
  {
    id: 'b2',
    title: 'Cashback de 5%',
    description: 'Receba 5% de volta em todas as suas compras',
    icon: 'cash-multiple'
  },
  {
    id: 'b3',
    title: 'Ofertas Exclusivas',
    description: 'Acesso a ofertas e descontos exclusivos para membros',
    icon: 'tag-outline'
  },
  {
    id: 'b4',
    title: 'Atendimento Prioritário',
    description: 'Suporte prioritário em todos os canais',
    icon: 'headset'
  }
];

// Componente para benefício
const BenefitItem = ({ item }) => (
  <Animated.View 
    entering={FadeInUp.delay(200).duration(400)}
    className="bg-white rounded-xl shadow-sm mb-4 border border-gray-100 p-4"
  >
    <View className="flex-row">
      <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center mr-3">
        <Icon name={item.icon} size={24} color="#41B54A" />
      </View>
      <View className="flex-1">
        <Text className="font-semibold text-gray-800">{item.title}</Text>
        <Text className="text-gray-500 text-sm mt-1">{item.description}</Text>
      </View>
    </View>
  </Animated.View>
);

// Componente para plano
const PlanCard = ({ title, price, isRecommended, onPress }) => (
  <Animated.View 
    entering={FadeInUp.delay(300).duration(400)}
    className={`rounded-xl shadow-sm mb-4 border p-4 ${isRecommended ? 'border-primary bg-green-50' : 'border-gray-100 bg-white'}`}
  >
    {isRecommended && (
      <View className="absolute -top-3 right-4 bg-primary px-3 py-1 rounded-full">
        <Text className="text-white text-xs font-medium">Recomendado</Text>
      </View>
    )}
    
    <Text className={`font-bold text-lg ${isRecommended ? 'text-primary' : 'text-gray-800'}`}>{title}</Text>
    <Text className="text-gray-500 text-sm mb-3">Todos os benefícios incluídos</Text>
    
    <View className="flex-row items-baseline mb-4">
      <Text className={`text-2xl font-bold ${isRecommended ? 'text-primary' : 'text-gray-800'}`}>{price}</Text>
      <Text className="text-gray-500 text-sm ml-1">/mês</Text>
    </View>
    
    <TouchableOpacity 
      onPress={onPress}
      className={`py-3 rounded-lg items-center ${isRecommended ? 'bg-primary' : 'bg-white border border-primary'}`}
    >
      <Text className={`font-medium ${isRecommended ? 'text-white' : 'text-primary'}`}>
        Assinar agora
      </Text>
    </TouchableOpacity>
  </Animated.View>
);

export default function ClubScreen({ navigation }) {
  console.log('Renderizando tela do clube');
  
  // Função para voltar
  const handleGoBack = () => {
    console.log('Voltando da tela do clube');
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
        <Text className="text-xl font-semibold text-gray-800">Clube iFruits</Text>
      </View>
      
      <ScrollView className="flex-1">
        {/* Banner */}
        <Animated.View 
          entering={FadeInDown.duration(400)}
          className="p-4"
        >
          <View className="bg-green-100 rounded-xl p-6">
            <View className="flex-row items-center mb-3">
              <Icon name="crown" size={24} color="#41B54A" className="mr-2" />
              <Text className="text-xl font-bold text-primary">Clube iFruits</Text>
            </View>
            <Text className="text-gray-700 text-base mb-4">
              Assine o Clube iFruits e tenha acesso a benefícios exclusivos, entregas grátis, 
              ofertas especiais e muito mais!
            </Text>
            <Text className="text-gray-500 italic text-sm">Economize até 25% em suas compras mensais</Text>
          </View>
        </Animated.View>
        
        {/* Benefícios */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Benefícios</Text>
          
          {benefits.map(benefit => (
            <BenefitItem key={benefit.id} item={benefit} />
          ))}
        </View>
        
        {/* Planos */}
        <View className="px-4 mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Escolha seu plano</Text>
          
          <PlanCard 
            title="Plano Mensal" 
            price="R$19,90" 
            isRecommended={false}
            onPress={() => {}}
          />
          
          <PlanCard 
            title="Plano Anual" 
            price="R$14,90" 
            isRecommended={true}
            onPress={() => {}}
          />
          
          <Text className="text-xs text-gray-400 text-center mt-2">
            Cancele a qualquer momento sem multa ou fidelidade
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 