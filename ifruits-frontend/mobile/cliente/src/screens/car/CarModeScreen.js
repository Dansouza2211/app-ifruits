import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';

export default function CarModeScreen({ navigation }) {
  const [carModeEnabled, setCarModeEnabled] = useState(false);
  
  // Função para voltar
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Função para ativar modo carro
  const toggleCarMode = () => {
    setCarModeEnabled(!carModeEnabled);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header 
        title="Usar no carro" 
        showBack={true}
        onBackPress={handleGoBack}
        showMenu={false}
      />
      
      <ScrollView className="flex-1 px-4">
        {/* Cabeçalho */}
        <View className="mt-4 mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-1">Usar no carro</Text>
          <Text className="text-gray-500 text-base">
            Tenha uma experiência otimizada enquanto dirige
          </Text>
        </View>
        
        {/* Card modo carro */}
        <View className="flex-row items-center mb-6">
          <View className="w-16 h-16 rounded-full bg-blue-100 items-center justify-center">
            <Icon name="car" size={28} color="#3b82f6" />
          </View>
          <View className="ml-4 flex-1">
            <Text className="font-bold text-gray-800 text-xl">Modo carro</Text>
            <Text className="text-gray-500 text-base">
              Interface simplificada para usar enquanto dirige
            </Text>
          </View>
        </View>
        
        {/* Lista de recursos */}
        <View className="mb-6">
          <Text className="text-gray-700 mb-4 text-base">
            O modo carro do iFruits oferece:
          </Text>
          
          <View className="flex-row items-center mb-3">
            <Icon name="check-circle" size={24} color="#41B54A" />
            <Text className="text-gray-700 ml-3 text-base">Botões maiores e mais fáceis de acessar</Text>
          </View>
          
          <View className="flex-row items-center mb-3">
            <Icon name="check-circle" size={24} color="#41B54A" />
            <Text className="text-gray-700 ml-3 text-base">Comandos de voz para fazer pedidos</Text>
          </View>
          
          <View className="flex-row items-center mb-3">
            <Icon name="check-circle" size={24} color="#41B54A" />
            <Text className="text-gray-700 ml-3 text-base">Integração com Android Auto e Apple CarPlay</Text>
          </View>
          
          <View className="flex-row items-center mb-4">
            <Icon name="check-circle" size={24} color="#41B54A" />
            <Text className="text-gray-700 ml-3 text-base">Notificações sonoras para atualizações do pedido</Text>
          </View>
        </View>
        
        {/* Toggle para ativar */}
        <View className="flex-row items-center justify-between border-t border-gray-200 pt-6 mb-10">
          <View>
            <Text className="font-bold text-gray-800 text-xl">Ativar modo carro</Text>
            <Text className="text-gray-500 text-base">
              {carModeEnabled ? 'Ativo' : 'Desativado'}
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#E0E0E0", true: "#41B54A" }}
            thumbColor={"#fff"}
            ios_backgroundColor="#E0E0E0"
            onValueChange={toggleCarMode}
            value={carModeEnabled}
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
          />
        </View>
        
        {carModeEnabled && (
          <TouchableOpacity 
            className="bg-primary py-4 rounded-xl mb-10"
            onPress={() => console.log('Iniciar modo carro')}
          >
            <Text className="text-white font-bold text-center text-lg">INICIAR MODO CARRO</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
} 