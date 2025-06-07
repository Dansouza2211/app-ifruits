import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../components/Logo';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size="large" white={false} showText={true} />
        <Text style={styles.subtitle}>Entregador</Text>
      </View>
      
      <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#41B54A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  logoContainer: {
    alignItems: 'center'
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 20,
    marginTop: 8,
    marginBottom: 16
  },
  loader: {
    marginTop: 32
  }
});

export default SplashScreen; 