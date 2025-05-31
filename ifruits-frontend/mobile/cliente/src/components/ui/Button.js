import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = true,
  className = '',
  icon = null,
  elevated = false,
}) {
  const baseStyles = 'py-3 rounded-xl items-center justify-center';
  const variantStyles = {
    primary: 'bg-green-500',
    secondary: 'bg-white border border-green-500',
    outline: 'bg-transparent border border-gray-300',
    danger: 'bg-red-500',
  };
  
  const textStyles = {
    primary: 'text-white font-bold',
    secondary: 'text-green-600 font-bold',
    outline: 'text-gray-700 font-medium',
    danger: 'text-white font-bold',
  };

  const containerStyle = `${baseStyles} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${elevated ? 'shadow-md' : ''} ${className}`;
  const textStyle = textStyles[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      className={`${containerStyle} ${(disabled && !loading) ? 'opacity-50' : ''}`}
    >
      <View className="flex-row items-center justify-center">
        {loading ? (
          <ActivityIndicator color={variant === 'primary' || variant === 'danger' ? '#fff' : '#41B54A'} />
        ) : (
          <>
            {icon && <View className="mr-2">{icon}</View>}
            <Text className={`${textStyle} text-base`}>{title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
} 