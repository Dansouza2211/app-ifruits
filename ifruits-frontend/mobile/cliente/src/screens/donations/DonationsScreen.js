import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';

// Imagens locais
const IMAGES = {
  bancoAlimentosCard: require('../../assets/images/donations/banco-alimentos.png'),
  larCriancasCard: require('../../assets/images/donations/lar-criancas.png'),
  bancoAlimentosLogo: require('../../assets/images/donations/logo-banco.png'),
  larCriancasLogo: require('../../assets/images/donations/logo-lar.png'),
};

// Componente para o card de informações de doação
const DonationInfoCard = () => {
  return (
    <View className="bg-white rounded-xl shadow-sm p-4 mb-5">
      <View className="flex-row items-center">
        <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center">
          <Icon name="gift-outline" size={24} color="#41B54A" />
        </View>
        <View className="ml-3 flex-1">
          <Text className="font-bold text-gray-800 text-lg">Minhas doações</Text>
          <Text className="text-gray-500">
            Ajude quem precisa com suas compras
          </Text>
        </View>
      </View>
      
      <View className="mt-4 border-t border-gray-100 pt-4">
        <Text className="text-gray-700">
          A cada compra realizada no iFruits, você pode doar uma parte do valor para instituições parceiras. Ajude a fazer a diferença!
        </Text>
      </View>
    </View>
  );
};

// Componente para card de estatísticas
const DonationStatsCard = ({ totalDonated, donationsCount, lastDonation }) => {
  return (
    <View className="bg-white rounded-xl shadow-sm p-4 mb-5">
      <Text className="font-bold text-gray-800 mb-4">Seu impacto</Text>
      
      <View className="flex-row justify-between mb-4">
        <View className="items-center flex-1">
          <Text className="text-gray-500 text-sm mb-1">Total doado</Text>
          <Text className="text-xl font-bold text-primary">R$ {totalDonated}</Text>
        </View>
        
        <View className="items-center flex-1">
          <Text className="text-gray-500 text-sm mb-1">Doações</Text>
          <Text className="text-xl font-bold text-primary">{donationsCount}</Text>
        </View>
        
        <View className="items-center flex-1">
          <Text className="text-gray-500 text-sm mb-1">Última</Text>
          <Text className="text-xl font-bold text-primary">{lastDonation}</Text>
        </View>
      </View>
      
      <View className="flex-row items-center bg-green-50 p-3 rounded-lg">
        <Icon name="information-outline" size={24} color="#41B54A" />
        <Text className="ml-2 text-gray-700 flex-1">
          Suas doações ajudaram {donationsCount} famílias este mês!
        </Text>
      </View>
    </View>
  );
};

// Componente para card de instituição
const CharityCard = ({ charity, onDonate }) => {
  return (
    <View className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
      <Image 
        source={charity.imageSource}
        className="w-full h-40"
        resizeMode="cover"
      />
      
      <View className="p-4">
        <Text className="font-bold text-gray-800 text-lg">{charity.name}</Text>
        <Text className="text-gray-500 mb-3">{charity.description}</Text>
        
        <TouchableOpacity 
          onPress={() => onDonate(charity.id)}
          className="bg-primary py-3 rounded-xl flex-row items-center justify-center"
        >
          <Icon name="gift-outline" size={20} color="#fff" />
          <Text className="ml-2 text-white font-medium">Fazer doação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Componente para histórico de doações
const DonationHistoryItem = ({ donation }) => {
  return (
    <View className="bg-white rounded-xl shadow-sm mb-3 p-4">
      <View className="flex-row items-center">
        <Image 
          source={donation.charity.logoSource}
          className="w-10 h-10 rounded-full"
          resizeMode="cover"
        />
        <View className="ml-3 flex-1">
          <Text className="font-bold text-gray-800">{donation.charity.name}</Text>
          <Text className="text-gray-500 text-xs">{donation.date}</Text>
        </View>
        <Text className="font-bold text-primary">R$ {donation.amount}</Text>
      </View>
    </View>
  );
};

export default function DonationsScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [donationStats, setDonationStats] = useState({
    totalDonated: '0,00',
    donationsCount: 0,
    lastDonation: '--/--'
  });
  const [charities, setCharities] = useState([]);
  const [donationHistory, setDonationHistory] = useState([]);
  
  // Navegação de volta
  const handleGoBack = () => {
    console.log('Voltando da tela de doações');
    navigation.goBack();
  };
  
  // Carregar dados
  useEffect(() => {
    // Simulação de carregamento de dados
    const timer = setTimeout(() => {
      setDonationStats({
        totalDonated: '75,00',
        donationsCount: 3,
        lastDonation: '20/06'
      });
      
      setCharities([
        {
          id: 1,
          name: 'Banco de Alimentos',
          description: 'Ajude a combater a fome e o desperdício de alimentos.',
          imageSource: IMAGES.bancoAlimentosCard
        },
        {
          id: 2,
          name: 'Lar das Crianças',
          description: 'Ajude crianças em situação de vulnerabilidade.',
          imageSource: IMAGES.larCriancasCard
        }
      ]);
      
      setDonationHistory([
        {
          id: 1,
          amount: '25,00',
          date: '20/06/2023',
          charity: {
            name: 'Banco de Alimentos',
            logoSource: IMAGES.bancoAlimentosLogo
          }
        },
        {
          id: 2,
          amount: '25,00',
          date: '15/05/2023',
          charity: {
            name: 'Lar das Crianças',
            logoSource: IMAGES.larCriancasLogo
          }
        },
        {
          id: 3,
          amount: '25,00',
          date: '02/04/2023',
          charity: {
            name: 'Banco de Alimentos',
            logoSource: IMAGES.bancoAlimentosLogo
          }
        },
      ]);
      
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Função para fazer doação
  const handleDonate = (charityId) => {
    console.log(`Fazendo doação para instituição ID: ${charityId}`);
    // Aqui seria implementada a lógica para iniciar o processo de doação
    // Navegar para tela de doação
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header 
        title="Doações" 
        showBack={true}
        onBackPress={handleGoBack}
        showMenu={true}
      />
      
      <ScrollView className="flex-1 px-4 pt-4">
        <View className="mb-5">
          <Text className="text-xl font-bold text-gray-800 mb-1">Minhas doações</Text>
          <Text className="text-gray-500">
            Ajude quem precisa com suas compras
          </Text>
        </View>
        
        <DonationInfoCard />
        
        <DonationStatsCard 
          totalDonated={donationStats.totalDonated}
          donationsCount={donationStats.donationsCount}
          lastDonation={donationStats.lastDonation}
        />
        
        {/* Instituições parceiras */}
        <View className="mb-2">
          <Text className="font-bold text-gray-800 text-lg mb-3">Instituições parceiras</Text>
          
          {charities.map(charity => (
            <CharityCard 
              key={charity.id}
              charity={charity}
              onDonate={handleDonate}
            />
          ))}
        </View>
        
        {/* Histórico de doações */}
        <View className="mb-5">
          <Text className="font-bold text-gray-800 text-lg mb-3">Histórico de doações</Text>
          
          {donationHistory.length > 0 ? (
            donationHistory.map(donation => (
              <DonationHistoryItem 
                key={donation.id}
                donation={donation}
              />
            ))
          ) : (
            <View className="bg-white rounded-xl p-4 items-center justify-center">
              <Icon name="history" size={40} color="#E0E0E0" />
              <Text className="text-gray-400 text-center mt-2">
                Você ainda não realizou doações
              </Text>
            </View>
          )}
        </View>
        
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
} 