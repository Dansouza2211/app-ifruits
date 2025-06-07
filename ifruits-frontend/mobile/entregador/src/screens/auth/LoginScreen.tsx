import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../../contexts/ProfileContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../../components/Logo';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login, isLoading } = useProfile();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const validateForm = () => {
    let isValid = true;
    
    if (!email) {
      setEmailError('Por favor, digite seu email');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email inválido');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    if (!password) {
      setPasswordError('Por favor, digite sua senha');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    return isValid;
  };
  
  const handleLogin = () => {
    if (validateForm()) {
      login(email, password);
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
        <Text className="text-white text-2xl font-bold mb-2">Entrar</Text>
        <Text className="text-white text-sm">Acesse sua conta para começar a entregar</Text>
      </View>
      
      {/* Form */}
      <View className="p-6 flex-1">
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Email</Text>
          <TextInput
            className={`border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 text-gray-800`}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? <Text className="text-red-500 text-xs mt-1">{emailError}</Text> : null}
        </View>
        
        <View className="mb-6">
          <Text className="text-gray-700 mb-2 font-medium">Senha</Text>
          <TextInput
            className={`border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 text-gray-800`}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {passwordError ? <Text className="text-red-500 text-xs mt-1">{passwordError}</Text> : null}
        </View>
        
        <TouchableOpacity 
          className="self-end mb-6"
          onPress={() => {}}
        >
          <Text className="text-primary font-medium">Esqueci minha senha</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className="bg-primary py-4 rounded-md items-center"
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text className="text-white font-bold text-base">ENTRAR</Text>
          )}
        </TouchableOpacity>
      </View>
      
      {/* Footer */}
      <View className="p-6 border-t border-gray-200 flex-row justify-center">
        <Text className="text-gray-600">Ainda não tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text className="text-primary font-bold">Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen; 