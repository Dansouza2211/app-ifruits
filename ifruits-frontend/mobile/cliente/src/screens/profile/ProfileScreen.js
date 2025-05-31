import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componente para item do menu de perfil
const ProfileMenuItem = ({ title, subtitle, icon, hasNotification, isNew, onPress }) => (
  <TouchableOpacity 
    className={`flex-row items-center border-b border-gray-100 py-4 ${onPress ? 'opacity-100' : 'opacity-70'}`}
    onPress={onPress}
    disabled={!onPress}
    activeOpacity={0.7}
  >
    <View className="mr-4">
      <Icon name={icon} size={24} color={onPress ? "#41B54A" : "#999"} />
    </View>
    <View className="flex-1">
      <Text className="text-base font-medium">{title}</Text>
      <Text className="text-sm text-gray-500">{subtitle}</Text>
    </View>
    <View className="flex-row items-center">
      {isNew && (
        <View className="bg-green-500 rounded-full px-2 py-0.5 mr-2">
          <Text className="text-white text-xs">NOVO!</Text>
        </View>
      )}
      {hasNotification && (
        <View className="bg-primary rounded-full w-5 h-5 items-center justify-center mr-2">
          <Text className="text-white text-xs font-bold">{hasNotification}</Text>
        </View>
      )}
      <Icon name="chevron-right" size={20} color="#999" />
    </View>
  </TouchableOpacity>
);

export default function ProfileScreen({ navigation }) {
  // Função auxiliar para lidar com navegação
  const handleNavigation = (screenName) => {
    console.log(`Navegando para: ${screenName}`);
    
    if (screenName && navigation && navigation.navigate) {
      navigation.navigate(screenName);
    } else {
      console.warn('Navegação não disponível ou tela não especificada');
    }
  };

  // Função para fazer logout
  const handleLogout = async () => {
    try {
      // Remover o token de autenticação
      await AsyncStorage.removeItem('@ifruits:userToken');
      
      console.log('Logout realizado com sucesso');
      
      // Navegar para a tela de login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alert('Erro ao fazer logout. Tente novamente.');
    }
  };

  const menuItems = [
    { 
      id: 1, 
      title: 'Notificações', 
      subtitle: '2 não lidas', 
      icon: 'bell-outline', 
      hasNotification: 2,
      isNew: false,
      onPress: () => handleNavigation('Notifications')
    },
    { 
      id: 2, 
      title: 'Pagamentos', 
      subtitle: 'Saldo, cartões e mais', 
      icon: 'wallet-outline', 
      hasNotification: false,
      isNew: false,
      onPress: () => handleNavigation('Payments')
    },
    { 
      id: 3, 
      title: 'Chats', 
      subtitle: 'Minhas conversas', 
      icon: 'message-text-outline', 
      hasNotification: 2,
      isNew: false,
      onPress: () => handleNavigation('Chats')
    },
    { 
      id: 4, 
      title: 'Clube iFruits', 
      subtitle: 'Minhas conversas', 
      icon: 'crown-outline', 
      hasNotification: false,
      isNew: true,
      onPress: () => handleNavigation('Club')
    },
    { 
      id: 5, 
      title: 'Cupons', 
      subtitle: 'Meus cupons de desconto', 
      icon: 'ticket-percent-outline', 
      hasNotification: false,
      isNew: false,
      onPress: () => handleNavigation('Coupons')
    },
    { 
      id: 6, 
      title: 'Fidelidade', 
      subtitle: 'Minhas fidelidades', 
      icon: 'star-outline', 
      hasNotification: false,
      isNew: false,
      onPress: () => handleNavigation('Loyalty')
    },
    { 
      id: 7, 
      title: 'Favoritos', 
      subtitle: 'Meus locais favoritos', 
      icon: 'heart-outline', 
      hasNotification: false,
      isNew: true,
      onPress: () => handleNavigation('Favorites')
    },
    { 
      id: 8, 
      title: 'Feed', 
      subtitle: 'Acompanhe seus locais favoritos', 
      icon: 'newspaper-variant-outline', 
      hasNotification: false,
      isNew: true,
      onPress: () => handleNavigation('Feed')
    },
    { 
      id: 9, 
      title: 'Endereços', 
      subtitle: 'Meus endereços de entrega', 
      icon: 'map-marker-outline', 
      hasNotification: false,
      isNew: false,
      onPress: () => handleNavigation('Addresses')
    },
    { 
      id: 10, 
      title: 'Doações', 
      subtitle: 'Minhas doações', 
      icon: 'gift-outline', 
      hasNotification: false,
      isNew: true,
      onPress: () => handleNavigation('Donations')
    },
    { 
      id: 11, 
      title: 'Meus dados', 
      subtitle: 'Minhas informações da conta', 
      icon: 'account-outline', 
      hasNotification: false,
      isNew: false,
      onPress: () => handleNavigation('PersonalData')
    },
    { 
      id: 12, 
      title: 'Convide seus amigos', 
      subtitle: 'Ganhe R$ 10 indicando o iFruits', 
      icon: 'account-multiple-plus-outline', 
      hasNotification: false,
      isNew: true,
      onPress: () => handleNavigation('Invite')
    },
    { 
      id: 13, 
      title: 'Ajuda', 
      subtitle: 'Perguntas frequentes e suporte', 
      icon: 'help-circle-outline', 
      hasNotification: false,
      isNew: false,
      onPress: () => handleNavigation('Help')
    },
    { 
      id: 14, 
      title: 'Configurações', 
      subtitle: 'Preferências do aplicativo', 
      icon: 'cog-outline', 
      hasNotification: false,
      isNew: false,
      onPress: () => handleNavigation('Settings')
    },
    { 
      id: 15, 
      title: 'Segurança', 
      subtitle: 'Senhas, biometria e privacidade', 
      icon: 'shield-check-outline', 
      hasNotification: false,
      isNew: false,
      onPress: () => handleNavigation('Security')
    },
    { 
      id: 16, 
      title: 'Usar no carro', 
      subtitle: 'Modo de interface para dirigir com segurança', 
      icon: 'car-outline', 
      hasNotification: false,
      isNew: true,
      onPress: () => handleNavigation('CarMode')
    },
    { 
      id: 17, 
      title: 'Sugerir hortifruti', 
      subtitle: 'Indique estabelecimentos para parceria', 
      icon: 'store-plus-outline', 
      hasNotification: false,
      isNew: false,
      onPress: () => handleNavigation('SuggestStore')
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['right', 'bottom', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header 
        title="Perfil" 
        showBack={false}
        showMenu={true}
      />
      
      <ScrollView className="flex-1">
        {/* User Profile Section */}
        <View className="p-4 flex-row items-center border-b border-gray-100">
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            className="w-16 h-16 rounded-full"
            resizeMode="cover"
          />
          <View className="ml-4 flex-1">
            <Text className="font-bold text-lg">João Silva</Text>
            <Text className="text-gray-500">joao.silva@email.com</Text>
            <TouchableOpacity 
              onPress={() => handleNavigation('PersonalData')}
              className="mt-1 flex-row items-center"
            >
              <Text className="text-primary text-sm mr-1">Ver perfil</Text>
              <Icon name="chevron-right" size={14} color="#41B54A" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Menu Items */}
        <View className="p-4">
          {menuItems.map((item) => (
            <ProfileMenuItem
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              hasNotification={item.hasNotification}
              isNew={item.isNew}
              onPress={item.onPress}
            />
          ))}
        </View>
        
        {/* Logout Button */}
        <View className="p-4 mt-4 mb-8">
          <TouchableOpacity 
            className="p-3 border border-red-500 rounded-lg flex-row justify-center items-center"
            onPress={handleLogout}
          >
            <Icon name="logout" size={20} color="#F44336" />
            <Text className="ml-2 text-red-500 font-medium">Sair da conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 