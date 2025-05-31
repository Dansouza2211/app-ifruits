import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../../contexts/ProfileContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const VehicleSelectionScreen = () => {
  const navigation = useNavigation();
  const { updateVehicle } = useProfile();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  
  const vehicles = [
    {
      id: 'bike',
      name: 'Bicicleta',
      icon: 'bike',
      description: 'Ideal para entregas em curta distância'
    },
    {
      id: 'motorcycle',
      name: 'Motocicleta',
      icon: 'motorbike',
      description: 'Ideal para entregas em média distância'
    },
    {
      id: 'car',
      name: 'Carro',
      icon: 'car',
      description: 'Ideal para entregas em longa distância'
    }
  ];
  
  const handleContinue = () => {
    if (!selectedVehicle) return;
    
    updateVehicle({
      type: selectedVehicle,
      details: vehicles.find(v => v.id === selectedVehicle)
    });
    
    navigation.navigate('DocumentUpload');
  };
  
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary pt-12 pb-4 px-4 rounded-b-3xl">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold mb-2">Tipo de Veículo</Text>
        <Text className="text-white text-sm">Selecione o tipo de veículo que você utilizará para as entregas</Text>
      </View>
      
      <ScrollView className="flex-1 p-6">
        {vehicles.map((vehicle) => (
          <TouchableOpacity
            key={vehicle.id}
            className={`border-2 rounded-lg p-4 mb-4 ${
              selectedVehicle === vehicle.id
                ? 'border-primary bg-green-50'
                : 'border-gray-200'
            }`}
            onPress={() => setSelectedVehicle(vehicle.id)}
          >
            <View className="flex-row items-center">
              <View className={`w-12 h-12 rounded-full ${
                selectedVehicle === vehicle.id ? 'bg-primary' : 'bg-gray-100'
              } items-center justify-center mr-4`}>
                <Icon 
                  name={vehicle.icon} 
                  size={24} 
                  color={selectedVehicle === vehicle.id ? '#FFF' : '#757575'} 
                />
              </View>
              
              <View className="flex-1">
                <Text className={`font-bold ${
                  selectedVehicle === vehicle.id ? 'text-primary' : 'text-gray-800'
                }`}>
                  {vehicle.name}
                </Text>
                <Text className="text-gray-500 text-sm">{vehicle.description}</Text>
              </View>
              
              {selectedVehicle === vehicle.id && (
                <Icon name="check-circle" size={24} color="#41B54A" />
              )}
            </View>
          </TouchableOpacity>
        ))}
        
        <Text className="text-gray-500 text-center mb-6 mt-4">
          Você poderá alterar o tipo de veículo posteriormente em seu perfil.
        </Text>
      </ScrollView>
      
      <View className="p-6 border-t border-gray-100">
        <TouchableOpacity
          className={`py-4 rounded-md items-center ${
            selectedVehicle ? 'bg-primary' : 'bg-gray-300'
          }`}
          onPress={handleContinue}
          disabled={!selectedVehicle}
        >
          <Text className="text-white font-bold text-base">CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VehicleSelectionScreen; 