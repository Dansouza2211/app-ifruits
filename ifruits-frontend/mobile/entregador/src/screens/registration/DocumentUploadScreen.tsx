import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../../contexts/ProfileContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DocumentUploadScreen = () => {
  const navigation = useNavigation();
  const { updateDocuments } = useProfile();
  const [uploadedDocs, setUploadedDocs] = useState({
    identity: false,
    driverLicense: false,
    vehicleRegistration: false,
    profilePhoto: false
  });
  
  const documents = [
    {
      id: 'identity',
      name: 'Documento de identidade',
      description: 'RG, CNH ou outro documento com foto',
      icon: 'card-account-details-outline',
      uploaded: uploadedDocs.identity
    },
    {
      id: 'driverLicense',
      name: 'Carteira de Habilitação',
      description: 'CNH válida e dentro do prazo',
      icon: 'card-account-details',
      uploaded: uploadedDocs.driverLicense
    },
    {
      id: 'vehicleRegistration',
      name: 'Documento do veículo',
      description: 'CRLV válido e dentro do prazo',
      icon: 'file-document-outline',
      uploaded: uploadedDocs.vehicleRegistration
    },
    {
      id: 'profilePhoto',
      name: 'Foto de perfil',
      description: 'Foto sua com fundo claro',
      icon: 'account',
      uploaded: uploadedDocs.profilePhoto
    }
  ];
  
  const handleUpload = (docId) => {
    // Simulação de upload
    setUploadedDocs(prev => ({
      ...prev,
      [docId]: true
    }));
    
    // Salvar no contexto
    updateDocuments(docId, {
      uploaded: true,
      uploadDate: new Date().toISOString(),
      status: 'pending'
    });
  };
  
  const handleContinue = () => {
    navigation.navigate('BankInfo');
  };
  
  // Verificar se todos os documentos foram enviados
  const allUploaded = Object.values(uploadedDocs).every(v => v);
  
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary pt-12 pb-4 px-4 rounded-b-3xl">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold mb-2">Documentos</Text>
        <Text className="text-white text-sm">Envie os documentos necessários para completar seu cadastro</Text>
      </View>
      
      <ScrollView className="flex-1 p-6">
        <Text className="text-gray-500 mb-6">
          Todos os documentos enviados serão analisados por nossa equipe. 
          Este processo pode levar até 48 horas úteis.
        </Text>
        
        {documents.map((doc) => (
          <View 
            key={doc.id}
            className={`border rounded-lg p-4 mb-4 ${
              doc.uploaded ? 'border-green-500' : 'border-gray-200'
            }`}
          >
            <View className="flex-row items-center mb-3">
              <View className={`w-10 h-10 rounded-full ${
                doc.uploaded ? 'bg-green-100' : 'bg-gray-100'
              } items-center justify-center mr-3`}>
                <Icon 
                  name={doc.icon} 
                  size={20} 
                  color={doc.uploaded ? '#34C759' : '#757575'} 
                />
              </View>
              
              <View className="flex-1">
                <Text className="text-gray-800 font-medium">{doc.name}</Text>
                <Text className="text-gray-500 text-xs">{doc.description}</Text>
              </View>
              
              {doc.uploaded ? (
                <View className="bg-green-100 py-1 px-2 rounded">
                  <Text className="text-green-700 text-xs font-medium">ENVIADO</Text>
                </View>
              ) : null}
            </View>
            
            {doc.uploaded ? (
              <View className="flex-row items-center">
                <Icon name="check-circle" size={16} color="#34C759" />
                <Text className="text-green-600 text-xs ml-1">
                  Documento enviado, aguardando análise
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                className="bg-primary py-2 px-4 rounded self-start"
                onPress={() => handleUpload(doc.id)}
              >
                <Text className="text-white font-medium">Enviar documento</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
      
      <View className="p-6 border-t border-gray-100">
        <TouchableOpacity
          className={`py-4 rounded-md items-center ${
            allUploaded ? 'bg-primary' : 'bg-gray-300'
          }`}
          onPress={handleContinue}
          disabled={!allUploaded}
        >
          <Text className="text-white font-bold text-base">CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DocumentUploadScreen; 