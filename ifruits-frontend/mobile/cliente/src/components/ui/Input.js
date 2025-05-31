import React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Input({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  label,
  icon,
  rightIcon,
  onRightIconPress,
  className = '',
  containerClassName = '',
  autoCapitalize = 'sentences',
}) {
  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && <Text className="text-gray-700 mb-1 text-sm">{label}</Text>}
      <View className="relative">
        {icon && (
          <View className="absolute top-3 left-3 z-10">
            <Icon name={icon} size={20} color="#41B54A" />
          </View>
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          className={`border border-gray-200 rounded-xl p-3 text-gray-800 bg-gray-50 ${
            error ? 'border-red-500' : 'border-gray-100'
          } ${icon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${className}`}
        />
        {rightIcon && (
          <TouchableOpacity 
            onPress={onRightIconPress}
            className="absolute top-3 right-3 z-10"
          >
            <Icon 
              name={rightIcon} 
              size={20} 
              color="#999"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
} 