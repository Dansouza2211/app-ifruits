import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Componente de cabeçalho padronizado para todas as telas
 * @param {object} props - Propriedades do componente
 * @param {string} props.title - Título a ser exibido no cabeçalho
 * @param {boolean} props.showBack - Se deve mostrar o botão de voltar
 * @param {function} props.onBackPress - Função a ser executada ao pressionar o botão de voltar
 * @param {boolean} props.showMenu - Se deve mostrar o botão de menu
 * @param {function} props.onMenuPress - Função a ser executada ao pressionar o botão de menu
 */
const Header = ({ 
  title, 
  showBack = true, 
  onBackPress, 
  showMenu = true, 
  onMenuPress 
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      // Implementar a ação padrão do menu (por exemplo, abrir drawer ou mostrar opções)
      console.log('Menu pressionado');
    }
  };

  return (
    <SafeAreaView edges={['top']} className="bg-white">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center">
          {showBack && (
            <TouchableOpacity 
              onPress={handleBackPress}
              className="mr-3 p-1"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
          )}
          <Text className="text-xl font-bold text-gray-800">{title}</Text>
        </View>
        
        {showMenu && (
          <TouchableOpacity 
            onPress={handleMenuPress}
            className="p-1"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View className="w-8 h-8 bg-green-50 rounded-full items-center justify-center">
              <Icon name="menu" size={20} color="#41B54A" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header; 