import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../../contexts/ProfileContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DocumentUploadScreen = () => {
  const navigation = useNavigation();
  const { updateDocuments } = useProfile();
  const [documents, setDocuments] = useState({
    idDocument: null,
    selfie: null
  });

  const handleUploadDocument = (documentType) => {
    // Aqui seria implementada a lógica de upload de imagem
    // Como é um mockup, vamos simular que a foto foi tirada
    const mockPhoto = {
      id: Math.random().toString(),
      uri: 'https://example.com/photo.jpg',
      timestamp: new Date()
    };
    
    setDocuments(prev => ({
      ...prev,
      [documentType]: mockPhoto
    }));
    
    updateDocuments(documentType, mockPhoto);
  };

  const handleContinue = () => {
    // Verifica se todos os documentos foram enviados
    if (documents.idDocument && documents.selfie) {
      navigation.navigate('BankInfo');
    } else {
      // Poderia mostrar um alerta de que é necessário enviar todos os documentos
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <View className="p-6">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            <Text className="text-xl font-semibold text-center flex-1">Cadastro</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Help')}>
              <Icon name="help-circle-outline" size={24} color="#41B54A" />
            </TouchableOpacity>
          </View>

          <View className="mt-6">
            <Text className="text-xl font-bold mb-2">Fotos e documentos</Text>
            <Text className="text-gray-600 mb-6">
              Toque nos ícones e siga as instruções para tirar as fotos.
            </Text>

            <View className="flex-row space-x-6 justify-center mb-8">
              <TouchableOpacity 
                className="items-center"
                onPress={() => handleUploadDocument('idDocument')}
              >
                <View className={`w-20 h-20 rounded-full ${documents.idDocument ? 'bg-primary' : 'bg-gray-200'} items-center justify-center mb-2`}>
                  <Icon 
                    name={documents.idDocument ? 'check' : 'card-account-details'} 
                    size={36} 
                    color={documents.idDocument ? '#FFF' : '#41B54A'} 
                  />
                </View>
                <Text className="text-center">Foto CNH</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                className="items-center"
                onPress={() => handleUploadDocument('selfie')}
              >
                <View className={`w-20 h-20 rounded-full ${documents.selfie ? 'bg-primary' : 'bg-gray-200'} items-center justify-center mb-2`}>
                  <Icon 
                    name={documents.selfie ? 'check' : 'account'} 
                    size={36} 
                    color={documents.selfie ? '#FFF' : '#41B54A'} 
                  />
                </View>
                <Text className="text-center">Foto Rosto</Text>
              </TouchableOpacity>
            </View>

            <View className="mt-4 bg-gray-100 p-4 rounded-md">
              <Text className="text-gray-700 text-sm">
                • Envie uma foto da sua CNH ou documento de identidade com foto
              </Text>
              <Text className="text-gray-700 text-sm mt-2">
                • Envie uma selfie segurando seu documento para verificação de identidade
              </Text>
              <Text className="text-gray-700 text-sm mt-2">
                • Certifique-se de que as imagens estão legíveis e bem iluminadas
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleContinue}
              className={`py-4 rounded-md mt-8 ${documents.idDocument && documents.selfie ? 'bg-primary' : 'bg-gray-300'}`}
              disabled={!documents.idDocument || !documents.selfie}
            >
              <Text className="text-white text-center font-bold">Próximo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DocumentUploadScreen; 