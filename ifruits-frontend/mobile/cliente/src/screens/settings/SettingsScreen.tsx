import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';

// Componente para item de configuração com toggle
const ToggleSettingItem = ({ title, description, value, onValueChange }) => (
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

// Componente para item de configuração com seta
const ArrowSettingItem = ({ title, description, onPress }) => (
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

export default function SettingsScreen({ navigation }) {
  // Estados para os toggles
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailsEnabled, setEmailsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  // Função para voltar
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header 
        title="Configurações" 
        showBack={true}
        onBackPress={handleGoBack}
        showMenu={false}
      />
      
      <ScrollView className="flex-1 px-4">
        <View className="mt-4">
          <Text className="text-lg font-bold text-gray-800 mb-2">Preferências do aplicativo</Text>
          
          <ToggleSettingItem 
            title="Notificações push" 
            description="Receba notificações sobre seus pedidos e promoções"
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
          
          <ToggleSettingItem 
            title="E-mails promocionais" 
            description="Receba ofertas e novidades por e-mail"
            value={emailsEnabled}
            onValueChange={setEmailsEnabled}
          />
          
          <ToggleSettingItem 
            title="Localização em segundo plano" 
            description="Permitir acesso à localização mesmo quando o app não estiver aberto"
            value={locationEnabled}
            onValueChange={setLocationEnabled}
          />
          
          <ToggleSettingItem 
            title="Modo escuro" 
            description="Alterar para tema escuro do aplicativo"
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
          />
        </View>
        
        <View className="mt-6">
          <Text className="text-lg font-bold text-gray-800 mb-2">Geral</Text>
          
          <ArrowSettingItem 
            title="Idioma" 
            description="Português (Brasil)"
            onPress={() => console.log('Mudar idioma')}
          />
          
          <ArrowSettingItem 
            title="Moeda" 
            description="Real (R$)"
            onPress={() => console.log('Mudar moeda')}
          />
          
          <ArrowSettingItem 
            title="Armazenamento" 
            description="Gerenciar cache e dados armazenados"
            onPress={() => console.log('Gerenciar armazenamento')}
          />
        </View>
        
        <View className="mt-6 mb-10">
          <Text className="text-lg font-bold text-gray-800 mb-2">Sobre</Text>
          
          <ArrowSettingItem 
            title="Termos de uso" 
            onPress={() => console.log('Abrir termos de uso')}
          />
          
          <ArrowSettingItem 
            title="Política de privacidade" 
            onPress={() => console.log('Abrir política de privacidade')}
          />
          
          <ArrowSettingItem 
            title="Versão do aplicativo" 
            description="1.0.0 (build 103)"
            onPress={() => console.log('Informações da versão')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 