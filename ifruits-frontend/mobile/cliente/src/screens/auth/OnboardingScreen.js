import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  FlatList, 
  Dimensions, 
  StatusBar,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInRight, FadeInLeft } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const slides = [
    {
      id: 1,
      title: 'Bem-vindo ao iFruits',
      description: 'Compre seus hortifrutis preferidos sem sair de casa, com rapidez e facilidade.',
      image: require('../../assets/images/banner1.png'),
      icon: 'fruit-watermelon'
    },
    {
      id: 2,
      title: 'Produtos Frescos',
      description: 'Garantimos a qualidade e frescor de todos os produtos que chegam até você.',
      image: require('../../assets/images/banner2.png'),
      icon: 'leaf'
    },
    {
      id: 3,
      title: 'Entrega Rápida',
      description: 'Receba seus produtos em casa com agilidade e segurança.',
      image: require('../../assets/images/banner3.png'),
      icon: 'truck-delivery'
    }
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  const handleSkip = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const renderSlide = ({ item, index }) => {
    return (
      <View style={{ width, height: height * 0.9, paddingHorizontal: 20 }}>
        <Animated.View 
          entering={index === currentIndex ? FadeInRight.delay(100).duration(500) : FadeInLeft.delay(100).duration(500)}
          className="flex-1 items-center"
        >
          {/* Imagem principal */}
          <View className="items-center justify-center mt-10 mb-8 w-full h-1/2">
            <Image
              source={item.image}
              className="w-full h-full rounded-2xl"
              resizeMode="cover"
            />
            <View className="absolute">
              <View className="bg-white/90 rounded-full p-6">
                <Icon name={item.icon} size={60} color="#41B54A" />
              </View>
            </View>
          </View>
          
          {/* Conteúdo de texto */}
          <View className="items-center">
            <Text className="text-3xl font-bold text-primary mb-4 text-center">
              {item.title}
            </Text>
            <Text className="text-lg text-gray-700 text-center px-4">
              {item.description}
            </Text>
          </View>
        </Animated.View>
      </View>
    );
  };
  
  const Pagination = () => {
    return (
      <View className="flex-row justify-center my-8">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Skip button */}
      <View className="absolute top-10 right-6 z-10">
        <TouchableOpacity
          onPress={handleSkip}
          className="bg-gray-100 rounded-full px-4 py-2"
        >
          <Text className="text-gray-700 font-medium">Pular</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
      />
      
      <View className="pb-10 px-6">
        <Pagination />
        
        <TouchableOpacity
          onPress={handleNext}
          className="bg-primary py-4 rounded-xl"
        >
          <Text className="text-white font-bold text-center text-lg">
            {currentIndex === slides.length - 1 ? 'Começar' : 'Próximo'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
} 