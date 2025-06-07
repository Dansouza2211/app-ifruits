import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EarningsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  // Dados de exemplo para demonstração
  const earningsData = {
    today: {
      total: 0,
      deliveries: 0,
      average: 0,
      hours: 0
    },
    week: {
      total: 120.50,
      deliveries: 8,
      average: 15.06,
      hours: 12
    },
    month: {
      total: 760.80,
      deliveries: 42,
      average: 18.11,
      hours: 65
    }
  };
  
  // Dados do período selecionado
  const currentData = earningsData[selectedPeriod];
  
  // Dados para o gráfico diário (mockados)
  const dailyData = [
    { day: 'Seg', value: 35.40 },
    { day: 'Ter', value: 0 },
    { day: 'Qua', value: 25.90 },
    { day: 'Qui', value: 0 },
    { day: 'Sex', value: 30.20 },
    { day: 'Sáb', value: 29.00 },
    { day: 'Dom', value: 0 }
  ];
  
  // Encontrar o valor máximo para escala do gráfico
  const maxValue = Math.max(...dailyData.map(item => item.value));
  
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-primary px-4 pt-4 pb-6">
        <Text className="text-white text-xl font-bold mb-1">Meus Ganhos</Text>
        
        {/* Seletor de período */}
        <View className="flex-row bg-white/20 rounded-lg mt-3 p-1">
          <TouchableOpacity 
            className={`flex-1 py-2 px-4 rounded-md ${selectedPeriod === 'today' ? 'bg-white' : 'bg-transparent'}`}
            onPress={() => setSelectedPeriod('today')}
          >
            <Text className={`text-center font-medium ${selectedPeriod === 'today' ? 'text-primary' : 'text-white'}`}>
              Hoje
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 py-2 px-4 rounded-md ${selectedPeriod === 'week' ? 'bg-white' : 'bg-transparent'}`}
            onPress={() => setSelectedPeriod('week')}
          >
            <Text className={`text-center font-medium ${selectedPeriod === 'week' ? 'text-primary' : 'text-white'}`}>
              Semana
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 py-2 px-4 rounded-md ${selectedPeriod === 'month' ? 'bg-white' : 'bg-transparent'}`}
            onPress={() => setSelectedPeriod('month')}
          >
            <Text className={`text-center font-medium ${selectedPeriod === 'month' ? 'text-primary' : 'text-white'}`}>
              Mês
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView className="flex-1">
        {/* Card com total de ganhos */}
        <View className="bg-white mx-4 rounded-lg shadow-sm p-5 -mt-4">
          <Text className="text-gray-500 mb-1">Total de ganhos</Text>
          <Text className="text-3xl font-bold text-gray-800">
            R$ {currentData.total.toFixed(2)}
          </Text>
          <Text className="text-gray-500 text-sm">
            {currentData.deliveries} {currentData.deliveries === 1 ? 'entrega' : 'entregas'} • {currentData.hours} {currentData.hours === 1 ? 'hora' : 'horas'}
          </Text>
        </View>
        
        {/* Cards com métricas */}
        <View className="flex-row justify-between mx-4 mt-4">
          <View className="bg-white rounded-lg shadow-sm p-4 w-[48%]">
            <Text className="text-gray-500 mb-1">Média por entrega</Text>
            <Text className="text-xl font-bold text-gray-800">
              R$ {currentData.average.toFixed(2)}
            </Text>
          </View>
          
          <View className="bg-white rounded-lg shadow-sm p-4 w-[48%]">
            <Text className="text-gray-500 mb-1">Média por hora</Text>
            <Text className="text-xl font-bold text-gray-800">
              R$ {currentData.hours > 0 ? (currentData.total / currentData.hours).toFixed(2) : '0.00'}
            </Text>
          </View>
        </View>
        
        {/* Gráfico de ganhos diários (semana) */}
        {selectedPeriod === 'week' && (
          <View className="bg-white mx-4 rounded-lg shadow-sm p-4 mt-4">
            <Text className="text-gray-800 font-bold mb-4">Ganhos por dia</Text>
            <View className="flex-row justify-between items-end h-24">
              {dailyData.map((item, index) => (
                <View key={index} className="flex-1 items-center">
                  <View 
                    className="bg-primary rounded-t-md w-6"
                    style={{ 
                      height: item.value > 0 ? `${(item.value / maxValue) * 100}%` : 4,
                      opacity: item.value > 0 ? 1 : 0.3
                    }}
                  />
                  <Text className="text-xs text-gray-500 mt-1">{item.day}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {/* Histórico de pagamentos */}
        <View className="bg-white mx-4 rounded-lg shadow-sm p-4 my-4">
          <Text className="text-gray-800 font-bold mb-3">Histórico de Pagamentos</Text>
          
          <View className="border-b border-gray-100 pb-3 mb-3">
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-800 font-medium">Semana 27/06 - 03/07</Text>
              <Text className="text-gray-800 font-bold">R$ 320,50</Text>
            </View>
            <View className="flex-row items-center">
              <Icon name="check-circle" size={16} color="#34C759" />
              <Text className="text-green-600 text-xs ml-1">Pago em 05/07</Text>
            </View>
          </View>
          
          <View className="border-b border-gray-100 pb-3 mb-3">
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-800 font-medium">Semana 20/06 - 26/06</Text>
              <Text className="text-gray-800 font-bold">R$ 275,90</Text>
            </View>
            <View className="flex-row items-center">
              <Icon name="check-circle" size={16} color="#34C759" />
              <Text className="text-green-600 text-xs ml-1">Pago em 28/06</Text>
            </View>
          </View>
          
          <View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-800 font-medium">Semana 13/06 - 19/06</Text>
              <Text className="text-gray-800 font-bold">R$ 164,40</Text>
            </View>
            <View className="flex-row items-center">
              <Icon name="check-circle" size={16} color="#34C759" />
              <Text className="text-green-600 text-xs ml-1">Pago em 21/06</Text>
            </View>
          </View>
          
          <TouchableOpacity className="mt-4 flex-row items-center justify-center">
            <Text className="text-primary font-medium">Ver todos os pagamentos</Text>
            <Icon name="chevron-right" size={16} color="#41B54A" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EarningsScreen; 