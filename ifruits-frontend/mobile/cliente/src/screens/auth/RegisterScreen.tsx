import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Dimensions,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from 'utils/supabase';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const windowHeight = Dimensions.get('window').height;

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      // Simulando cadastro
      await new Promise(resolve => setTimeout(resolve, 1500));

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });

      const { user } = signUpData;

      if (signUpError) {
        console.error(signUpError);
        return;
      }

      if (user) {
        const { error: profileError } = await supabase.from('usuarios').insert([
          {
            id: user.id,
            nome: name
          }
        ])

        if (profileError) {
          console.error("Erro na criação do perfil: ", profileError);
        } else {
          console.log('Perfil criado!');
        }
      }

      // Simulando um token de autenticação
      const userToken = 'fake-auth-token-' + Date.now();

      // Salvando o token no AsyncStorage
      await AsyncStorage.setItem('@ifruits:userToken', userToken);

      // Navegar para a tela de verificação de e-mail
      navigation.navigate('EmailVerification', {
        email: email,
        fromScreen: 'Register',
        redirectTo: 'Main'
      });
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao realizar o cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            <Text className="text-2xl font-bold text-gray-800 mb-1">Cadastro</Text>
            <Text className="text-gray-500 mb-6">Crie sua conta e aproveite nossas ofertas</Text>

            {/* Nome Input */}
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Digite seu nome completo..."
              icon="account-outline"
              containerClassName="mb-4"
            />

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
              containerClassName="mb-4"
            />

            {/* Confirm Password Input */}
            <Input
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirme sua senha..."
              secureTextEntry={!showConfirmPassword}
              icon="lock-check-outline"
              rightIcon={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              onRightIconPress={toggleConfirmPasswordVisibility}
              containerClassName="mb-6"
            />

            {/* Register Button */}
            <Button
              title="CADASTRAR"
              onPress={handleRegister}
              loading={loading}
              elevated={true}
              className="py-4"
            />

            {/* Login link */}
            <View className="mt-6 flex-row justify-center">
              <Text className="text-gray-500">Já possui uma conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-primary font-medium">Faça o login</Text>
              </TouchableOpacity>
            </View>

            {/* Termos e condições */}
            <Text className="text-gray-400 text-xs text-center mt-4">
              Ao se cadastrar, você concorda com nossos Termos de Uso e Política de Privacidade
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 