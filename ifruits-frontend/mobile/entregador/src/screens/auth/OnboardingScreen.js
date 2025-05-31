import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WelcomeIllustration, DeliveryOnDemandIllustration, FastPaymentIllustration } from '../../components/OnboardingIllustrations';
import Logo from '../../components/Logo';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Seja bem-vindo ao iFruits',
    description: 'O aplicativo de entregas que valoriza seu trabalho e facilita sua rotina.',
    component: WelcomeIllustration
  },
  {
    id: '2',
    title: 'Entregas sob demanda',
    description: 'Aceite entregas quando quiser e gerencie seu próprio horário.',
    component: DeliveryOnDemandIllustration
  },
  {
    id: '3',
    title: 'Pagamentos rápidos',
    description: 'Receba o valor das suas entregas diretamente na sua conta bancária.',
    component: FastPaymentIllustration
  }
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const IllustrationComponent = item.component;
    
    return (
      <View style={styles.slideContainer}>
        {currentIndex === 0 && item.id === '1' && (
          <View style={styles.logoContainer}>
            <Logo size="large" white={true} />
          </View>
        )}
        <View style={styles.imageContainer}>
          <IllustrationComponent />
        </View>
        <Text style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.description}>
          {item.description}
        </Text>
      </View>
    );
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true
      });
    } else {
      navigation.navigate('Login');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Pular</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={styles.slider}
      />
      
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index.toString()}
              style={[
                styles.indicator,
                index === currentIndex ? styles.activeIndicator : styles.inactiveIndicator
              ]}
            />
          ))}
        </View>
        
        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'COMEÇAR' : 'PRÓXIMO'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  skipContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 16,
    paddingHorizontal: 24
  },
  skipText: {
    color: '#41B54A',
    fontWeight: '500'
  },
  slider: {
    flex: 1,
    width: width
  },
  slideContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  logoContainer: {
    marginBottom: 20,
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1F2937'
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 32,
    lineHeight: 24
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4
  },
  activeIndicator: {
    backgroundColor: '#41B54A'
  },
  inactiveIndicator: {
    backgroundColor: '#D1D5DB'
  },
  button: {
    backgroundColor: '#41B54A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default OnboardingScreen; 