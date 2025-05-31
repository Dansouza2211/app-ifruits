import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Logo({ size = 'medium', variant = 'white' }) {
  // Mapeia os tamanhos para dimensões específicas
  const sizeMap = {
    small: { fontSize: 16, iconSize: 24 },
    medium: { fontSize: 24, iconSize: 32 },
    large: { fontSize: 32, iconSize: 40 },
  };

  const { fontSize, iconSize } = sizeMap[size] || sizeMap.medium;
  const color = variant === 'white' ? '#FFFFFF' : '#41B54A';

  return (
    <View className="items-center justify-center flex-row">
      <Icon name="leaf" size={iconSize} color={color} />
      <Text style={{ fontSize, color, fontWeight: 'bold', marginLeft: 4 }}>
        Ifruits
      </Text>
    </View>
  );
} 