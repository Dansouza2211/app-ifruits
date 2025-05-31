import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../../contexts/ProfileContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const VehicleSelectionScreen = () => {
  const navigation = useNavigation();
  const { updateVehicle } = useProfile();
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const vehicles = [
    { id: 'bike', name: 'Bicicleta', icon: 'bicycle' },
    { id: 'motorcycle', name: 'Moto', icon: 'motorbike' },
    { id: 'car', name: 'Carro', icon: 'car' }
  ];

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleContinue = () => {
    if (selectedVehicle) {
      updateVehicle(selectedVehicle);
      navigation.navigate('DocumentUpload');
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
            <Text className="text-xl font-bold mb-2">Escolha seu veículo de entregas</Text>
            <Text className="text-gray-600 mb-6">
              Você pode escolher qualquer um disponível. Não se preocupe, você conseguirá alterar no app.
            </Text>

            <View className="flex-row justify-around mb-10">
              {vehicles.map((vehicle) => (
                <TouchableOpacity
                  key={vehicle.id}
                  onPress={() => handleSelectVehicle(vehicle)}
                  className={`items-center ${selectedVehicle?.id === vehicle.id ? 'opacity-100' : 'opacity-50'}`}
                >
                  <View className={`w-20 h-20 rounded-full bg-gray-200 items-center justify-center mb-2 ${selectedVehicle?.id === vehicle.id ? 'border-2 border-primary' : ''}`}>
                    <Icon name={vehicle.icon} size={36} color="#41B54A" />
                  </View>
                  <Text className="text-center">{vehicle.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={handleContinue}
              className={`py-4 rounded-md mt-8 ${selectedVehicle ? 'bg-primary' : 'bg-gray-300'}`}
              disabled={!selectedVehicle}
            >
              <Text className="text-white text-center font-bold">Próximo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default VehicleSelectionScreen;