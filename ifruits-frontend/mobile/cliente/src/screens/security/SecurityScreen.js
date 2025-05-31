import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componente para item de segurança com toggle
const ToggleSecurityItem = ({ title, description, value, onValueChange }) => (
  <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
    <View className="flex-1 mr-4">
      <Text className="text-base font-medium">{title}</Text>
      {description && <Text className="text-sm text-gray-500">{description}</Text>}
    </View>
    <Switch
      trackColor={{ false: "#E0E0E0", true: "#41B54A" }}
      thumbColor={"#fff"}
      ios_backgroundColor="#E0E0E0"
      onValueChange={onValueChange}
      value={value}
    />
  </View>
);

// Componente para item de segurança com seta
const ArrowSecurityItem = ({ title, description, onPress }) => (
  <TouchableOpacity 
    className="flex-row items-center justify-between py-4 border-b border-gray-100"
    onPress={onPress}
  >
    <View className="flex-1 mr-4">
      <Text className="text-base font-medium">{title}</Text>
      {description && <Text className="text-sm text-gray-500">{description}</Text>}
    </View>
    <Icon name="chevron-right" size={20} color="#999" />
  </TouchableOpacity>
);

export default function SecurityScreen({ navigation }) {
  // Estados para os toggles
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [pinEnabled, setPinEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Função para voltar
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  // Função para encerrar todas as sessões (logout)
  const handleLogoutAllSessions = async () => {
    try {
      // Remover o token de autenticação
      await AsyncStorage.removeItem('@ifruits:userToken');
      
      console.log('Todas as sessões encerradas com sucesso');
      
      // Navegar para a tela de login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Erro ao encerrar sessões:', error);
      alert('Erro ao encerrar sessões. Tente novamente.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header 
        title="Segurança" 
        showBack={true}
        onBackPress={handleGoBack}
        showMenu={false}
      />
      
      <ScrollView className="flex-1 px-4">
        <View className="mt-4">
          <Text className="text-lg font-bold text-gray-800 mb-2">Autenticação</Text>
          
          <ToggleSecurityItem 
            title="Biometria" 
            description="Use sua impressão digital ou Face ID para acessar o app"
            value={biometricEnabled}
            onValueChange={setBiometricEnabled}
          />
          
          <ToggleSecurityItem 
            title="PIN de acesso" 
            description="Use um código PIN para proteger seu acesso"
            value={pinEnabled}
            onValueChange={setPinEnabled}
          />
          
          <ToggleSecurityItem 
            title="Autenticação em duas etapas" 
            description="Adicione uma camada extra de segurança"
            value={twoFactorEnabled}
            onValueChange={setTwoFactorEnabled}
          />
          
          <ArrowSecurityItem 
            title="Alterar senha" 
            description="Última alteração: 28/04/2023"
            onPress={() => console.log('Alterar senha')}
          />
        </View>
        
        <View className="mt-6">
          <Text className="text-lg font-bold text-gray-800 mb-2">Privacidade</Text>
          
          <ArrowSecurityItem 
            title="Gerenciar permissões" 
            description="Câmera, localização, contatos, etc."
            onPress={() => console.log('Gerenciar permissões')}
          />
          
          <ArrowSecurityItem 
            title="Dados armazenados" 
            description="Gerenciar seus dados pessoais"
            onPress={() => console.log('Gerenciar dados')}
          />
          
          <ArrowSecurityItem 
            title="Histórico de login" 
            description="Veja os acessos à sua conta"
            onPress={() => console.log('Ver histórico de login')}
          />
        </View>
        
        <View className="mt-6 mb-10">
          <TouchableOpacity 
            className="p-4 bg-red-50 rounded-lg flex-row items-center"
            onPress={handleLogoutAllSessions}
          >
            <Icon name="logout-variant" size={24} color="#F44336" />
            <View className="ml-3 flex-1">
              <Text className="font-bold text-red-500">Encerrar todas as sessões</Text>
              <Text className="text-gray-500">Desconectar de todos os dispositivos</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 