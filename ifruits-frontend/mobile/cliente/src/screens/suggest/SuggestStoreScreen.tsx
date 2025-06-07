import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';

// Componente para campo de formulário
const FormField = ({ label, placeholder, value, onChangeText, multiline = false, keyboardType = 'default' }) => (
  <View className="mb-4">
    <Text className="font-medium text-gray-800 mb-2">{label}</Text>
    <TextInput
      className={`bg-gray-50 rounded-lg px-4 ${multiline ? 'py-3 h-24 text-top' : 'py-3'}`}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      numberOfLines={multiline ? 4 : 1}
      keyboardType={keyboardType}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
  </View>
);

export default function SuggestStoreScreen({ navigation }) {
  // Estados para o formulário
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  
  // Função para voltar
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  // Função para enviar sugestão
  const handleSubmit = () => {
    if (!storeName || !storeAddress) {
      alert('Por favor, preencha pelo menos o nome e o endereço do hortifruti.');
      return;
    }
    
    // Aqui seria implementada a lógica para enviar a sugestão ao backend
    console.log('Sugestão enviada:', { storeName, storeAddress, storePhone, additionalInfo });
    
    // Feedback e limpar formulário
    alert('Obrigado pela sua sugestão! Vamos analisar e entrar em contato se necessário.');
    setStoreName('');
    setStoreAddress('');
    setStorePhone('');
    setAdditionalInfo('');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header 
        title="Sugerir hortifruti" 
        showBack={true}
        onBackPress={handleGoBack}
        showMenu={false}
      />
      
      <ScrollView className="flex-1 px-4">
        <View className="mt-4 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-1">Sugerir um hortifruti</Text>
          <Text className="text-gray-500">
            Ajude-nos a expandir nossa rede de parceiros
          </Text>
        </View>
        
        {/* Card explicativo */}
        <View className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center">
              <Icon name="store-plus" size={24} color="#41B54A" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="font-bold text-gray-800 text-lg">Indique um novo parceiro</Text>
              <Text className="text-gray-500">
                Conhece um hortifruti que não está no iFruits?
              </Text>
            </View>
          </View>
          
          <View className="mt-4 border-t border-gray-100 pt-4">
            <Text className="text-gray-700">
              Ao sugerir um novo hortifruti, você nos ajuda a expandir nossa rede de parceiros. Se o estabelecimento se tornar parceiro, você ganhará R$ 15 em créditos para usar no app!
            </Text>
          </View>
        </View>
        
        {/* Formulário de sugestão */}
        <View className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <Text className="font-bold text-gray-800 text-lg mb-4">Dados do estabelecimento</Text>
          
          <FormField 
            label="Nome do hortifruti *"
            placeholder="Ex: Hortifruti São Pedro"
            value={storeName}
            onChangeText={setStoreName}
          />
          
          <FormField 
            label="Endereço completo *"
            placeholder="Ex: Rua das Flores, 123, Centro"
            value={storeAddress}
            onChangeText={setStoreAddress}
          />
          
          <FormField 
            label="Telefone (opcional)"
            placeholder="Ex: (11) 99999-9999"
            value={storePhone}
            onChangeText={setStorePhone}
            keyboardType="phone-pad"
          />
          
          <FormField 
            label="Informações adicionais (opcional)"
            placeholder="Adicione qualquer informação relevante sobre o estabelecimento"
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
            multiline={true}
          />
          
          <TouchableOpacity 
            className="bg-primary py-4 rounded-xl mt-2"
            onPress={handleSubmit}
          >
            <Text className="text-white font-bold text-center">ENVIAR SUGESTÃO</Text>
          </TouchableOpacity>
        </View>
        
        {/* Informações adicionais */}
        <View className="bg-blue-50 rounded-xl p-4 mb-10">
          <View className="flex-row">
            <Icon name="information" size={24} color="#3b82f6" />
            <View className="ml-3 flex-1">
              <Text className="font-bold text-gray-800">Como funciona?</Text>
              <Text className="text-gray-700 mt-1">
                Após receber sua sugestão, nossa equipe entrará em contato com o estabelecimento para verificar a possibilidade de parceria. Caso o hortifruti se torne nosso parceiro, você receberá um crédito de R$ 15 na sua conta.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 