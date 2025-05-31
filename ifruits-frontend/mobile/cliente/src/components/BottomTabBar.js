import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BottomTabBar({ navigation, currentRoute }) {
  const insets = useSafeAreaInsets();
  
  // Configuração dos tabs
  const tabs = [
    { name: 'Home', label: 'Início', icon: 'home' },
    { name: 'Search', label: 'Buscar', icon: 'magnify' },
    { name: 'Orders', label: 'Pedidos', icon: 'clipboard-list' },
    { name: 'Profile', label: 'Perfil', icon: 'account' },
  ];
  
  // Função para navegar
  const navigateTo = (routeName) => {
    if (routeName === currentRoute) return;
    
    if (routeName === 'Home' && currentRoute !== 'Home') {
      navigation.navigate('Main', { screen: 'Home' });
    } else {
      navigation.navigate(routeName);
    }
  };
  
  return (
    <View 
      className="flex-row justify-around items-center bg-white border-t border-gray-200"
      style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 10 }}
    >
      {tabs.map((tab) => {
        const isActive = tab.name === currentRoute;
        
        return (
          <TouchableOpacity
            key={tab.name}
            className="items-center pt-2 pb-1 px-3"
            onPress={() => navigateTo(tab.name)}
          >
            <Icon 
              name={tab.icon} 
              size={24} 
              color={isActive ? '#41B54A' : '#999'} 
            />
            <Text 
              className={`text-xs mt-1 ${isActive ? 'text-green-500 font-medium' : 'text-gray-500'}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
} 