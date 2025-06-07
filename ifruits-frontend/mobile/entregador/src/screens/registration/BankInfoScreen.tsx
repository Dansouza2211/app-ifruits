import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../../contexts/ProfileContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BankInfoScreen = () => {
  const navigation = useNavigation();
  const { updateBankInfo } = useProfile();
  const [formData, setFormData] = useState({
    holderName: '',
    holderCpf: '',
    bankName: '',
    bankBranch: '',
    accountNumber: '',
    accountType: 'checking'
  });
  const [errors, setErrors] = useState({});
  
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro quando o usuário digita
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.holderName.trim()) {
      newErrors.holderName = 'Nome é obrigatório';
    }
    
    if (!formData.holderCpf.trim()) {
      newErrors.holderCpf = 'CPF é obrigatório';
    } else if (!/^\d{11}$/.test(formData.holderCpf.replace(/\D/g, ''))) {
      newErrors.holderCpf = 'CPF inválido';
    }
    
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Nome do banco é obrigatório';
    }
    
    if (!formData.bankBranch.trim()) {
      newErrors.bankBranch = 'Agência é obrigatória';
    }
    
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Número da conta é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleContinue = () => {
    if (validateForm()) {
      updateBankInfo(formData);
      navigation.navigate('DocumentUploadComplete');
    }
  };
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      {/* Header */}
      <View className="bg-primary pt-12 pb-4 px-4 rounded-b-3xl">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold mb-2">Dados Bancários</Text>
        <Text className="text-white text-sm">Informe seus dados bancários para receber os pagamentos</Text>
      </View>
      
      <ScrollView className="flex-1 p-6">
        <Text className="text-gray-500 mb-6">
          Informe os dados da conta onde você deseja receber seus pagamentos. 
          Certifique-se de que os dados estão corretos.
        </Text>
        
        {/* Formulário */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Nome do titular</Text>
          <TextInput
            className={`border ${errors.holderName ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 text-gray-800`}
            placeholder="Digite o nome do titular da conta"
            value={formData.holderName}
            onChangeText={(text) => updateField('holderName', text)}
          />
          {errors.holderName ? <Text className="text-red-500 text-xs mt-1">{errors.holderName}</Text> : null}
        </View>
        
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">CPF do titular</Text>
          <TextInput
            className={`border ${errors.holderCpf ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 text-gray-800`}
            placeholder="Digite o CPF do titular"
            value={formData.holderCpf}
            onChangeText={(text) => updateField('holderCpf', text)}
            keyboardType="numeric"
          />
          {errors.holderCpf ? <Text className="text-red-500 text-xs mt-1">{errors.holderCpf}</Text> : null}
        </View>
        
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Nome do banco</Text>
          <TextInput
            className={`border ${errors.bankName ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 text-gray-800`}
            placeholder="Digite o nome do banco"
            value={formData.bankName}
            onChangeText={(text) => updateField('bankName', text)}
          />
          {errors.bankName ? <Text className="text-red-500 text-xs mt-1">{errors.bankName}</Text> : null}
        </View>
        
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Agência</Text>
          <TextInput
            className={`border ${errors.bankBranch ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 text-gray-800`}
            placeholder="Digite o número da agência"
            value={formData.bankBranch}
            onChangeText={(text) => updateField('bankBranch', text)}
            keyboardType="numeric"
          />
          {errors.bankBranch ? <Text className="text-red-500 text-xs mt-1">{errors.bankBranch}</Text> : null}
        </View>
        
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Número da conta</Text>
          <TextInput
            className={`border ${errors.accountNumber ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 text-gray-800`}
            placeholder="Digite o número da conta"
            value={formData.accountNumber}
            onChangeText={(text) => updateField('accountNumber', text)}
            keyboardType="numeric"
          />
          {errors.accountNumber ? <Text className="text-red-500 text-xs mt-1">{errors.accountNumber}</Text> : null}
        </View>
        
        <View className="mb-6">
          <Text className="text-gray-700 mb-2 font-medium">Tipo de conta</Text>
          <View className="flex-row">
            <TouchableOpacity
              className={`flex-1 py-3 border rounded-l-md mr-1 items-center ${
                formData.accountType === 'checking'
                  ? 'bg-primary border-primary'
                  : 'bg-white border-gray-300'
              }`}
              onPress={() => updateField('accountType', 'checking')}
            >
              <Text
                className={`font-medium ${
                  formData.accountType === 'checking' ? 'text-white' : 'text-gray-700'
                }`}
              >
                Corrente
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className={`flex-1 py-3 border rounded-r-md ml-1 items-center ${
                formData.accountType === 'savings'
                  ? 'bg-primary border-primary'
                  : 'bg-white border-gray-300'
              }`}
              onPress={() => updateField('accountType', 'savings')}
            >
              <Text
                className={`font-medium ${
                  formData.accountType === 'savings' ? 'text-white' : 'text-gray-700'
                }`}
              >
                Poupança
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      <View className="p-6 border-t border-gray-100">
        <TouchableOpacity
          className="bg-primary py-4 rounded-md items-center"
          onPress={handleContinue}
        >
          <Text className="text-white font-bold text-base">CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BankInfoScreen; 