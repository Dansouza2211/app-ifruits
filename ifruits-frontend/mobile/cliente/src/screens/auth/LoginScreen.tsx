import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Logo from '../../components/ui/Logo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from 'utils/supabase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const windowHeight = Dimensions.get('window').height;

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      // Simulando login
      await new Promise(resolve => setTimeout(resolve, 1500));

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        // Tratamento de erro para mostrar mensagens específicas
        if (error.message.includes('Invalid login credentials')) {
          alert('Email ou senha incorretos.');
        } else if (error.message.includes('User not found')) {
          alert('Usuário não encontrado.');
        } else {
          alert(`Erro ao fazer login: ${error.message}`);
        }
        return;
      }

      const userToken = data.session.access_token;

      // Salvando o token no AsyncStorage
      await AsyncStorage.setItem('@ifruits:userToken', userToken);

      // Navegar para a tela principal após o login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView className="flex-1" edges={['right', 'left']}>
      <StatusBar barStyle="light-content" backgroundColor="#41B54A" />

      {/* Background */}
      <View className="absolute w-full h-full">
        <View className="absolute w-full h-full bg-primary opacity-95" />
        <View className="absolute w-full h-2/3 bg-primary" />
        <View className="absolute bottom-0 w-full h-1/3 bg-white" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, minHeight: windowHeight }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(800)}
            className="items-center justify-center pt-16 pb-10"
          >
            <Image
              source={require('../../assets/logo_branca.png')}
              className="w-40 h-40"
              resizeMode="contain"
            />
          </Animated.View>

          {/* Form Section */}
          <Animated.View
            entering={FadeInUp.delay(400).duration(800)}
            className="bg-white flex-1 rounded-t-3xl px-6 pt-8 pb-6"
          >
            <Text className="text-2xl font-bold text-gray-800 mb-1">Olá!</Text>
            <Text className="text-gray-500 mb-6">Acesse sua conta para continuar</Text>

            {/* Email Input */}
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu email..."
              keyboardType="email-address"
              autoCapitalize="none"
              icon="email-outline"
              containerClassName="mb-4"
            />

            {/* Password Input */}
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Digite sua senha..."
              secureTextEntry={!showPassword}
              icon="lock-outline"
              rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
              onRightIconPress={togglePasswordVisibility}
              containerClassName="mb-6"
            />

            {/* Forgot Password */}
            <TouchableOpacity className="items-end mb-6">
              <Text className="text-primary text-sm">Esqueceu sua senha?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <Button
              title="ACESSAR"
              onPress={handleLogin}
              loading={loading}
              elevated={true}
              className="py-4"
            />

            {/* Sign up link */}
            <View className="mt-6 flex-row justify-center">
              <Text className="text-gray-500">Ainda não possui conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text className="text-primary font-medium">Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 