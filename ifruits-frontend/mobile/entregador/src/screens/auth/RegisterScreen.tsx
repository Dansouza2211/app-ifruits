import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../../contexts/ProfileContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../../components/Logo';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { isLoading } = useProfile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  
  const updateFormField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Limpar erro quando o usuário começa a digitar
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validar nome
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    // Validar telefone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Telefone inválido';
    }
    
    // Validar senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }
    
    // Validar confirmação de senha
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleRegister = () => {
    if (validateForm()) {
      // Aqui implementaríamos a lógica real de registro
      setTimeout(() => {
        navigation.navigate('VehicleSelection');
      }, 1500);
    }
  };
  
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary pt-12 pb-4 px-4 rounded-b-3xl">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <View className="items-center mb-4">
          <Logo size="medium" white={false} showText={false} />
        </View>
        <Text className="text-white text-2xl font-bold mb-2">Cadastro</Text>
        <Text className="text-white text-sm">Crie sua conta para começar a entregar</Text>
      </View>
      
      {/* Form */}
      <ScrollView className="flex-1 p-6">
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Nome completo</Text>
          <TextInput
            className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 text-gray-800`}
            placeholder="Digite seu nome completo"
            value={formData.name}
            onChangeText={(text) => updateFormField('name', text)}
          />
          {errors.name ? <Text className="text-red-500 text-xs mt-1">{errors.name}</Text> : null}
        </View>
        
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Email</Text>
          <TextInput
            className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 text-gray-800`}
            placeholder="Digite seu email"
            value={formData.email}
            onChangeText={(text) => updateFormField('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email ? <Text className="text-red-500 text-xs mt-1">{errors.email}</Text> : null}
        </View>
        
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Telefone</Text>
          <TextInput
            className={`border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 text-gray-800`}
            placeholder="Digite seu telefone"
            value={formData.phone}
            onChangeText={(text) => updateFormField('phone', text)}
            keyboardType="phone-pad"
          />
          {errors.phone ? <Text className="text-red-500 text-xs mt-1">{errors.phone}</Text> : null}
        </View>
        
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Senha</Text>
          <TextInput
            className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 text-gray-800`}
            placeholder="Crie uma senha"
            value={formData.password}
            onChangeText={(text) => updateFormField('password', text)}
            secureTextEntry
          />
          {errors.password ? <Text className="text-red-500 text-xs mt-1">{errors.password}</Text> : null}
        </View>
        
        <View className="mb-6">
          <Text className="text-gray-700 mb-2 font-medium">Confirme sua senha</Text>
          <TextInput
            className={`border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 text-gray-800`}
            placeholder="Digite sua senha novamente"
            value={formData.confirmPassword}
            onChangeText={(text) => updateFormField('confirmPassword', text)}
            secureTextEntry
          />
          {errors.confirmPassword ? <Text className="text-red-500 text-xs mt-1">{errors.confirmPassword}</Text> : null}
        </View>
        
        <TouchableOpacity
          className="bg-primary py-4 rounded-md items-center mb-6"
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text className="text-white font-bold text-base">CADASTRAR</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      
      {/* Footer */}
      <View className="p-6 border-t border-gray-200 flex-row justify-center">
        <Text className="text-gray-600">Já tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-primary font-bold">Faça login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen; 