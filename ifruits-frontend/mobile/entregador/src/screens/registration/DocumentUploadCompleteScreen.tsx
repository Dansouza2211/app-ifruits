import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DocumentUploadCompleteScreen = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <View className="bg-green-100 rounded-full p-6 mb-6">
          <Icon name="check-circle" size={80} color="#41B54A" />
        </View>
        
        <Text className="text-2xl font-bold text-center mb-4 text-gray-800">
          Cadastro Concluído!
        </Text>
        
        <Text className="text-base text-center text-gray-600 mb-8">
          Seus documentos foram enviados e estão em análise. 
          Você receberá uma notificação assim que forem aprovados.
        </Text>
        
        <View className="bg-yellow-50 p-4 rounded-lg mb-8 w-full">
          <View className="flex-row">
            <Icon name="information" size={24} color="#F59E0B" className="mr-2" />
            <View className="flex-1 ml-2">
              <Text className="text-gray-800 font-medium mb-1">Análise em andamento</Text>
              <Text className="text-gray-600 text-sm">
                A análise de documentos pode levar até 48 horas úteis. Você pode acompanhar o status no seu perfil.
              </Text>
            </View>
          </View>
        </View>
        
        <Text className="text-base text-center text-gray-600 mb-6">
          Enquanto isso, você pode configurar seu perfil ou explorar o aplicativo.
        </Text>
        
        <TouchableOpacity
          className="bg-primary py-4 px-6 rounded-md w-full mb-4"
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-white font-bold text-center">IR PARA O LOGIN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className="py-4 px-6 w-full"
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-primary font-medium text-center">EXPLORAR APLICATIVO</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DocumentUploadCompleteScreen; 