import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Share, StatusBar, Clipboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';

// Componente para o card de convite principal
const InviteCardInfo = () => {
  return (
    <View className="bg-white rounded-xl shadow-sm p-4 mb-5">
      <View className="flex-row items-center">
        <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center">
          <Icon name="account-multiple-plus" size={24} color="#41B54A" />
        </View>
        <View className="ml-3 flex-1">
          <Text className="font-bold text-gray-800 text-lg">Convide seus amigos</Text>
          <Text className="text-gray-500">
            Ganhe R$ 10 indicando o iFruits
          </Text>
        </View>
      </View>
      
      <View className="mt-4 border-t border-gray-100 pt-4">
        <Text className="text-gray-700">
          Para cada amigo que se cadastrar usando seu código, você ganhará R$ 10 em créditos para usar no app!
        </Text>
      </View>
    </View>
  );
};

// Componente para o card de código de indicação
const ReferralCodeCard = ({ code, onCopy, onShare }) => {
  return (
    <View className="bg-white rounded-xl shadow-sm p-4 mb-5">
      <Text className="font-bold text-gray-800 mb-3">Seu código de indicação</Text>
      
      <View className="flex-row items-center bg-gray-50 p-3 rounded-lg mb-3">
        <Text className="flex-1 text-center font-bold text-gray-800 text-lg tracking-widest">
          {code}
        </Text>
        <TouchableOpacity 
          onPress={onCopy}
          className="p-2"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="content-copy" size={20} color="#41B54A" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        onPress={onShare}
        className="bg-primary py-3 rounded-xl flex-row items-center justify-center"
      >
        <Icon name="share-variant" size={20} color="#fff" />
        <Text className="ml-2 text-white font-medium">Compartilhar código</Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente para o card de compartilhamento de link
const ShareLinkCard = ({ link, onCopy, onShare }) => {
  return (
    <View className="bg-white rounded-xl shadow-sm p-4 mb-5">
      <Text className="font-bold text-gray-800 mb-3">Link de indicação</Text>
      
      <View className="flex-row items-center bg-gray-50 p-3 rounded-lg mb-3">
        <Text className="flex-1 text-gray-700 mr-2" numberOfLines={1} ellipsizeMode="middle">
          {link}
        </Text>
        <TouchableOpacity 
          onPress={onCopy}
          className="p-2"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="content-copy" size={20} color="#41B54A" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        onPress={onShare}
        className="bg-primary py-3 rounded-xl flex-row items-center justify-center"
      >
        <Icon name="share-variant" size={20} color="#fff" />
        <Text className="ml-2 text-white font-medium">Compartilhar link</Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente para a seção de convite por e-mail
const InviteByEmailSection = ({ email, setEmail, onInvite }) => {
  return (
    <View className="bg-white rounded-xl shadow-sm p-4 mb-5">
      <Text className="font-bold text-gray-800 mb-3">Convidar por e-mail</Text>
      
      <View className="flex-row items-center bg-gray-50 p-3 rounded-lg mb-3">
        <Icon name="email-outline" size={20} color="#999" />
        <TextInput
          className="flex-1 ml-2 text-gray-700"
          placeholder="Digite o e-mail do seu amigo"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <TouchableOpacity 
        onPress={onInvite}
        className="bg-primary py-3 rounded-xl flex-row items-center justify-center"
      >
        <Icon name="send" size={20} color="#fff" />
        <Text className="ml-2 text-white font-medium">Enviar convite</Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente para a seção de compartilhamento social
const SocialShareSection = ({ onShareWhatsApp, onShareFacebook, onShareTwitter, onShareTelegram }) => {
  return (
    <View className="bg-white rounded-xl shadow-sm p-4 mb-5">
      <Text className="font-bold text-gray-800 mb-3">Compartilhar nas redes sociais</Text>
      
      <View className="flex-row justify-between">
        <TouchableOpacity 
          onPress={onShareWhatsApp}
          className="items-center"
        >
          <View className="w-12 h-12 rounded-full bg-green-500 items-center justify-center mb-1">
            <Icon name="whatsapp" size={24} color="#fff" />
          </View>
          <Text className="text-xs text-gray-700">WhatsApp</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={onShareFacebook}
          className="items-center"
        >
          <View className="w-12 h-12 rounded-full bg-blue-600 items-center justify-center mb-1">
            <Icon name="facebook" size={24} color="#fff" />
          </View>
          <Text className="text-xs text-gray-700">Facebook</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={onShareTwitter}
          className="items-center"
        >
          <View className="w-12 h-12 rounded-full bg-blue-400 items-center justify-center mb-1">
            <Icon name="twitter" size={24} color="#fff" />
          </View>
          <Text className="text-xs text-gray-700">Twitter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={onShareTelegram}
          className="items-center"
        >
          <View className="w-12 h-12 rounded-full bg-blue-500 items-center justify-center mb-1">
            <Icon name="telegram" size={24} color="#fff" />
          </View>
          <Text className="text-xs text-gray-700">Telegram</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function InviteScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const referralCode = 'IFRUITS10';
  const referralLink = 'https://ifruits.com.br/convite/IFRUITS10';
  
  // Navegação de volta
  const handleGoBack = () => {
    console.log('Voltando da tela de convite');
    navigation.goBack();
  };
  
  // Funções para compartilhar
  const handleCopyCode = () => {
    Clipboard.setString(referralCode);
    alert('Código copiado para a área de transferência!');
  };
  
  const handleCopyLink = () => {
    Clipboard.setString(referralLink);
    alert('Link copiado para a área de transferência!');
  };
  
  const handleShareCode = async () => {
    try {
      await Share.share({
        message: `Use meu código ${referralCode} para ganhar R$ 10 no iFruits!`,
      });
    } catch (error) {
      console.log('Erro ao compartilhar:', error.message);
    }
  };
  
  const handleShareLink = async () => {
    try {
      await Share.share({
        message: `Ganhe R$ 10 para usar no iFruits! Cadastre-se usando meu link: ${referralLink}`,
      });
    } catch (error) {
      console.log('Erro ao compartilhar:', error.message);
    }
  };
  
  const handleInviteByEmail = () => {
    if (!email || !email.includes('@')) {
      alert('Por favor, digite um e-mail válido');
      return;
    }
    
    alert(`Convite enviado para ${email}`);
    setEmail('');
  };
  
  // Funções para compartilhar nas redes sociais
  const handleShareWhatsApp = () => {
    console.log('Compartilhar no WhatsApp');
  };
  
  const handleShareFacebook = () => {
    console.log('Compartilhar no Facebook');
  };
  
  const handleShareTwitter = () => {
    console.log('Compartilhar no Twitter');
  };
  
  const handleShareTelegram = () => {
    console.log('Compartilhar no Telegram');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header 
        title="Convide seus amigos" 
        showBack={true}
        onBackPress={handleGoBack}
        showMenu={true}
      />
      
      <ScrollView className="flex-1 px-4 pt-4">
        <View className="mb-5">
          <Text className="text-xl font-bold text-gray-800 mb-1">Convide seus amigos</Text>
          <Text className="text-gray-500">
            Ganhe R$ 10 indicando o iFruits
          </Text>
        </View>
        
        <InviteCardInfo />
        
        <ReferralCodeCard 
          code={referralCode}
          onCopy={handleCopyCode}
          onShare={handleShareCode}
        />
        
        <ShareLinkCard 
          link={referralLink}
          onCopy={handleCopyLink}
          onShare={handleShareLink}
        />
        
        <InviteByEmailSection 
          email={email}
          setEmail={setEmail}
          onInvite={handleInviteByEmail}
        />
        
        <SocialShareSection 
          onShareWhatsApp={handleShareWhatsApp}
          onShareFacebook={handleShareFacebook}
          onShareTwitter={handleShareTwitter}
          onShareTelegram={handleShareTelegram}
        />
        
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
} 