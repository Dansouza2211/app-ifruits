import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    // Animação de fade in e scale
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();

    // Para fins de desenvolvimento, limpe o AsyncStorage para sempre mostrar onboarding
    const resetStorage = async () => {
      try {
        await AsyncStorage.removeItem('@ifruits:hasSeenOnboarding');
        await AsyncStorage.removeItem('@ifruits:userToken');
        console.log('Storage limpo para desenvolvimento');
      } catch (e) {
        console.error('Erro ao limpar storage:', e);
      }
    };

    // Remova esta linha em produção:
    resetStorage();

    // Simulando carregamento inicial do aplicativo
    const timer = setTimeout(async () => {
      try {
        // Verificar se é a primeira vez que o usuário abre o aplicativo
        const hasSeenOnboarding = await AsyncStorage.getItem('@ifruits:hasSeenOnboarding');
        
        // Verificar se o usuário está logado
        const userToken = await AsyncStorage.getItem('@ifruits:userToken');
        
        console.log('hasSeenOnboarding:', hasSeenOnboarding);
        console.log('userToken:', userToken);
        
        // Para garantir o fluxo completo durante o desenvolvimento:
        navigation.reset({
          index: 0,
          routes: [{ name: 'Onboarding' }],
        });
        
        /* Fluxo normal que será usado em produção:
        if (hasSeenOnboarding !== 'true') {
          // Marcar que o usuário viu o onboarding
          await AsyncStorage.setItem('@ifruits:hasSeenOnboarding', 'true');
          
          // Navegar para a tela de onboarding
          navigation.reset({
            index: 0,
            routes: [{ name: 'Onboarding' }],
          });
        } else if (userToken) {
          // Navegar para a tela principal se estiver logado
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        } else {
          // Navegar para a tela de login
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
        */
      } catch (error) {
        console.error('Erro ao verificar informações de usuário:', error);
        // Navegar para login em caso de erro
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" backgroundColor="#41B54A" />
      <View className="flex-1 justify-center items-center">
        <Animated.View style={{ 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 10
        }}>
          <Image 
            source={require('../../assets/logo_branca.png')} 
            style={{ width: screenWidth * 0.6, height: screenWidth * 0.6 }}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
} 