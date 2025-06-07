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
  TextInput,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EmailVerificationScreen({ navigation, route }) {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const windowHeight = Dimensions.get('window').height;
  
  const { email, fromScreen, redirectTo } = route.params || {};
  const maskedEmail = email ? maskEmail(email) : 'seu e-mail';

  // Referências para os inputs
  const inputRefs = Array(6).fill(0).map(() => React.createRef());

  useEffect(() => {
    // Iniciar o contador regressivo
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Função para mascarar o email
  function maskEmail(email) {
    const [username, domain] = email.split('@');
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    return `${maskedUsername}@${domain}`;
  }

  // Manipular mudança nos inputs de código
  const handleCodeChange = (text, index) => {
    if (text.length > 1) {
      text = text[0]; // Limitar a um caractere
    }
    
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = text;
    setVerificationCode(newVerificationCode);
    
    // Avançar para o próximo input se não for o último
    if (text !== '' && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Lidar com a tecla de retrocesso
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && verificationCode[index] === '') {
      inputRefs[index - 1].current.focus();
    }
  };

  // Verificar código
  const handleVerifyCode = async () => {
    const code = verificationCode.join('');
    
    if (code.length !== 6) {
      Alert.alert('Código incompleto', 'Por favor, digite o código de 6 dígitos enviado ao seu e-mail.');
      return;
    }
    
    setLoading(true);
    try {
      // Simulando verificação
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular sucesso
      if (code === '123456') { // Em um app real, isso seria validado no backend
        if (redirectTo) {
          navigation.navigate(redirectTo);
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        }
      } else {
        Alert.alert('Código inválido', 'O código digitado não é válido. Tente novamente.');
        // Limpar os campos
        setVerificationCode(['', '', '', '', '', '']);
        inputRefs[0].current.focus();
      }
    } catch (error) {
      console.error('Erro na verificação:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao verificar o código. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Reenviar código
  const handleResendCode = async () => {
    setResendDisabled(true);
    setTimer(60);
    
    try {
      // Simulando envio do código
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Código reenviado', `Um novo código de verificação foi enviado para ${maskedEmail}.`);
      
      // Iniciar o contador novamente
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Erro ao reenviar código:', error);
      Alert.alert('Erro', 'Não foi possível reenviar o código. Tente novamente mais tarde.');
      setResendDisabled(false);
    }
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
          {/* Header with back button */}
          <View className="pt-4 px-4 flex-row items-center">
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            >
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          {/* Logo Section */}
          <Animated.View 
            entering={FadeInDown.delay(200).duration(800)}
            className="items-center justify-center pt-8 pb-10"
          >
            <Image 
              source={require('../../assets/logo_branca.png')} 
              className="w-32 h-32"
              resizeMode="contain"
            />
          </Animated.View>
          
          {/* Form Section */}
          <Animated.View 
            entering={FadeInUp.delay(400).duration(800)}
            className="bg-white flex-1 rounded-t-3xl px-6 pt-8 pb-6"
          >
            <Text className="text-2xl font-bold text-gray-800 mb-1">Verificação de E-mail</Text>
            <Text className="text-gray-500 mb-6">
              Digite o código de 6 dígitos enviado para {maskedEmail}
            </Text>
            
            {/* Verification Code Input */}
            <View className="flex-row justify-between mb-8">
              {verificationCode.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={inputRefs[index]}
                  className="w-12 h-14 bg-gray-50 rounded-lg border border-gray-200 text-center text-lg font-bold text-gray-800"
                  maxLength={1}
                  keyboardType="number-pad"
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  autoFocus={index === 0}
                />
              ))}
            </View>
            
            {/* Resend Code */}
            <View className="flex-row justify-center mb-8">
              <Text className="text-gray-500">Não recebeu o código? </Text>
              {resendDisabled ? (
                <Text className="text-primary font-medium">Reenviar em {timer}s</Text>
              ) : (
                <TouchableOpacity onPress={handleResendCode}>
                  <Text className="text-primary font-medium">Reenviar código</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {/* Verify Button */}
            <Button
              title="VERIFICAR"
              onPress={handleVerifyCode}
              loading={loading}
              elevated={true}
              className="py-4"
            />
            
            {/* Cancel */}
            <TouchableOpacity 
              className="mt-4 items-center" 
              onPress={() => {
                if (fromScreen) {
                  navigation.navigate(fromScreen);
                } else {
                  navigation.goBack();
                }
              }}
            >
              <Text className="text-gray-500">Cancelar</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 