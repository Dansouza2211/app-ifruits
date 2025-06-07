import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../../contexts/ProfileContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BankInfoScreen = () => {
  const navigation = useNavigation();
  const { updateBankInfo, login } = useProfile();
  const [bankData, setBankData] = useState({
    bank: '',
    agency: '',
    account: '',
    digit: ''
  });

  const handleChange = (field, value) => {
    setBankData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validação dos dados
    if (!bankData.bank || !bankData.agency || !bankData.account) {
      // Poderia mostrar um alerta de erro
      return;
    }

    // Salvar os dados bancários
    updateBankInfo(bankData);

    // Simular login após cadastro completo
    login('user@example.com', 'password123');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
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
            <Text className="text-xl font-bold mb-2">Dados bancários</Text>
            <Text className="text-gray-600 mb-6">
              É necessário que a conta esteja no seu CPF. Não aceitaremos contas em nome de terceiros.
            </Text>

            <View className="space-y-4">
              <TextInput
                placeholder="Banco"
                value={bankData.bank}
                onChangeText={(value) => handleChange('bank', value)}
                className="bg-gray-200 p-4 rounded-md"
              />
              
              <TextInput
                placeholder="Agência (sem dígito)"
                value={bankData.agency}
                onChangeText={(value) => handleChange('agency', value)}
                keyboardType="numeric"
                className="bg-gray-200 p-4 rounded-md"
              />
              
              <View className="flex-row space-x-2">
                <TextInput
                  placeholder="Número da conta"
                  value={bankData.account}
                  onChangeText={(value) => handleChange('account', value)}
                  keyboardType="numeric"
                  className="bg-gray-200 p-4 rounded-md flex-1"
                />
                
                <TextInput
                  placeholder="Dígito"
                  value={bankData.digit}
                  onChangeText={(value) => handleChange('digit', value)}
                  keyboardType="numeric"
                  className="bg-gray-200 p-4 rounded-md w-24"
                />
              </View>
            </View>

            <View className="mt-6 bg-gray-100 p-4 rounded-md">
              <Text className="text-gray-700 text-sm">
                • Informe os dados da conta bancária onde você deseja receber seus pagamentos
              </Text>
              <Text className="text-gray-700 text-sm mt-2">
                • A conta deve estar no seu CPF, não aceitamos contas de terceiros
              </Text>
              <Text className="text-gray-700 text-sm mt-2">
                • Os pagamentos são processados diariamente às 18h
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-primary py-4 rounded-md mt-8"
            >
              <Text className="text-white text-center font-bold">Finalizar Cadastro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BankInfoScreen; 