import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';

// Componente para item de FAQ
const FaqItem = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <View className="border-b border-gray-100">
      <TouchableOpacity 
        className="py-4 flex-row items-center justify-between"
        onPress={() => setExpanded(!expanded)}
      >
        <Text className="text-base font-medium flex-1 mr-2">{title}</Text>
        <Icon 
          name={expanded ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#999" 
        />
      </TouchableOpacity>
      
      {expanded && (
        <View className="pb-4">
          <Text className="text-gray-500">{content}</Text>
        </View>
      )}
    </View>
  );
};

// Componente para categoria de ajuda
const HelpCategory = ({ icon, title, description, onPress }) => (
  <TouchableOpacity 
    className="bg-white rounded-xl shadow-sm p-4 mb-4 flex-row items-center"
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">
      <Icon name={icon} size={22} color="#fff" />
    </View>
    <View className="ml-3 flex-1">
      <Text className="font-bold text-gray-800">{title}</Text>
      <Text className="text-gray-500 text-sm">{description}</Text>
    </View>
    <Icon name="chevron-right" size={20} color="#999" />
  </TouchableOpacity>
);

export default function HelpScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Função para voltar
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  // Dados para FAQ
  const faqItems = [
    {
      id: 1,
      title: 'Como acompanhar meu pedido?',
      content: 'Você pode acompanhar seu pedido em tempo real na aba "Pedidos". Lá você verá o status atual da entrega, previsão de chegada e informações sobre o entregador.'
    },
    {
      id: 2,
      title: 'Como cancelar um pedido?',
      content: 'Para cancelar um pedido, acesse a aba "Pedidos", selecione o pedido que deseja cancelar e toque em "Cancelar pedido". Note que o cancelamento só é possível antes do início da preparação.'
    },
    {
      id: 3,
      title: 'Como solicitar reembolso?',
      content: 'Para solicitar um reembolso, acesse a aba "Pedidos", selecione o pedido que teve problema e toque em "Reportar problema". Escolha o motivo e siga as instruções na tela.'
    },
    {
      id: 4,
      title: 'Como adicionar um novo endereço?',
      content: 'Para adicionar um novo endereço, acesse seu perfil, toque em "Endereços" e depois em "Adicionar novo endereço". Preencha os dados solicitados e salve.'
    },
    {
      id: 5,
      title: 'Como alterar minha forma de pagamento?',
      content: 'Para alterar sua forma de pagamento, vá até a tela de finalização do pedido e toque em "Forma de pagamento". Você pode adicionar novas formas ou selecionar entre as existentes.'
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header 
        title="Ajuda" 
        showBack={true}
        onBackPress={handleGoBack}
        showMenu={false}
      />
      
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Busca */}
        <View className="bg-white rounded-xl flex-row items-center px-4 mb-5">
          <Icon name="magnify" size={20} color="#999" />
          <TextInput
            className="flex-1 py-3 px-2"
            placeholder="Buscar dúvidas"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        {/* Categorias de ajuda */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-3">Como podemos ajudar?</Text>
          
          <HelpCategory 
            icon="message-question-outline"
            title="Fale conosco"
            description="Converse com nossa equipe de suporte"
            onPress={() => console.log('Fale conosco')}
          />
          
          <HelpCategory 
            icon="clipboard-text-outline"
            title="Meus pedidos"
            description="Ajuda com pedidos e entregas"
            onPress={() => console.log('Ajuda com pedidos')}
          />
          
          <HelpCategory 
            icon="cash-multiple"
            title="Pagamentos e reembolsos"
            description="Problemas com pagamentos ou reembolsos"
            onPress={() => console.log('Ajuda com pagamentos')}
          />
          
          <HelpCategory 
            icon="account-outline"
            title="Minha conta"
            description="Alterar dados, configurações, etc."
            onPress={() => console.log('Ajuda com conta')}
          />
        </View>
        
        {/* FAQ */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-3">Perguntas frequentes</Text>
          
          <View className="bg-white rounded-xl p-4">
            {faqItems.map(item => (
              <FaqItem 
                key={item.id}
                title={item.title}
                content={item.content}
              />
            ))}
          </View>
        </View>
        
        {/* Centro de ajuda */}
        <View className="mb-10">
          <TouchableOpacity 
            className="bg-white rounded-xl p-4 items-center"
            onPress={() => console.log('Acessar central de ajuda')}
          >
            <Icon name="lifebuoy" size={40} color="#41B54A" />
            <Text className="font-bold text-gray-800 mt-2">Central de Ajuda</Text>
            <Text className="text-gray-500 text-center mt-1">
              Acesse nossa central de ajuda completa com mais informações
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 