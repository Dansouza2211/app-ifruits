import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FadeInDown } from 'react-native-reanimated';
import Header from '../../components/Header';

// Mocks de chats
const chatsMock = [
  {
    id: '1',
    name: 'Hortifruti Santo Antônio',
    avatar: 'https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
    lastMessage: 'Olá! Sua entrega está a caminho. Chegará em aproximadamente 15 minutos.',
    timestamp: '10:30',
    unread: 2,
    isStore: true,
    isOnline: true
  },
  {
    id: '2',
    name: 'João (Entregador)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
    lastMessage: 'Estou na portaria do seu condomínio. Poderia autorizar minha entrada?',
    timestamp: 'Ontem',
    unread: 1,
    isStore: false,
    isOnline: true
  },
  {
    id: '3',
    name: 'HortiFruti Central',
    avatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
    lastMessage: 'Sua reclamação foi registrada. Estamos analisando o caso e retornaremos em breve.',
    timestamp: 'Ontem',
    unread: 0,
    isStore: true,
    isOnline: false
  },
  {
    id: '4',
    name: 'Suporte iFruits',
    avatar: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
    lastMessage: 'Olá! Como podemos ajudá-lo hoje?',
    timestamp: '18/05',
    unread: 0,
    isStore: true,
    isOnline: true
  },
  {
    id: '5',
    name: 'Ana (Entregadora)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
    lastMessage: 'Entrega realizada! Obrigada por utilizar nossos serviços.',
    timestamp: '17/05',
    unread: 0,
    isStore: false,
    isOnline: false
  },
  {
    id: '6',
    name: 'Empório Hortifruti',
    avatar: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
    lastMessage: 'Agradecemos sua preferência! Volte sempre.',
    timestamp: '15/05',
    unread: 0,
    isStore: true,
    isOnline: false
  },
  {
    id: '7',
    name: 'Carlos (Entregador)',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
    lastMessage: 'Cheguei! Estou em frente ao seu prédio.',
    timestamp: '10/05',
    unread: 0,
    isStore: false,
    isOnline: false
  },
];

// Componente de pesquisa
const SearchBar = ({ value, onChangeText }) => (
  <View className="px-4 py-2 bg-white">
    <View className="flex-row items-center bg-gray-100 px-3 py-2 rounded-full">
      <Icon name="magnify" size={20} color="#9CA3AF" />
      <TextInput
        className="flex-1 ml-2 text-gray-800"
        placeholder="Buscar nas conversas"
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Icon name="close-circle" size={18} color="#9CA3AF" />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

// Componente para cada item de chat
const ChatItem = ({ item, onPress }) => (
  <TouchableOpacity
    className="px-4 py-3 bg-white border-b border-gray-100 flex-row items-center"
    onPress={() => onPress(item)}
  >
    <View className="relative">
      <Image
        source={{ uri: item.avatar }}
        className="w-14 h-14 rounded-full"
        resizeMode="cover"
      />
      {item.isOnline && (
        <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
      )}
    </View>

    <View className="flex-1 ml-3">
      <View className="flex-row justify-between items-center">
        <Text className="font-bold text-gray-800">{item.name}</Text>
        <Text className="text-xs text-gray-500">{item.timestamp}</Text>
      </View>

      <View className="flex-row justify-between items-center mt-1">
        <Text className="text-sm text-gray-600" numberOfLines={1} ellipsizeMode="tail">
          {item.lastMessage}
        </Text>
        {item.unread > 0 && (
          <View className="bg-green-500 rounded-full h-5 min-w-5 flex items-center justify-center ml-2">
            <Text className="text-xs text-white font-bold px-1">{item.unread}</Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

// Componente de estado vazio
const EmptyState = () => (
  <View className="flex-1 items-center justify-center p-8">
    <Icon name="chat-outline" size={60} color="#E0E0E0" />
    <Text className="text-gray-400 text-base text-center mt-4">
      Você ainda não tem nenhuma conversa
    </Text>
    <Text className="text-gray-400 text-sm text-center mt-2">
      Inicie um pedido para conversar com a loja ou entregador
    </Text>
    <TouchableOpacity className="mt-4 bg-primary py-2 px-4 rounded-full">
      <Text className="text-white font-medium">Fazer pedido</Text>
    </TouchableOpacity>
  </View>
);

// Componente principal
export default function ChatsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulação de carregamento dos dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setChats(chatsMock);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtra chats baseado na busca
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navega para a tela de conversa
  const handleChatPress = (chat) => {
    navigation.navigate('ChatDetail', { chat });
    
    // Atualiza a contagem de mensagens não lidas
    if (chat.unread > 0) {
      const updatedChats = chats.map(item => 
        item.id === chat.id ? { ...item, unread: 0 } : item
      );
      setChats(updatedChats);
    }
  };

  // Renderiza item de chat
  const renderChatItem = ({ item }) => (
    <ChatItem item={item} onPress={handleChatPress} />
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header title="Minhas conversas" />
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#41B54A" />
        </View>
      ) : filteredChats.length > 0 ? (
        <FlatList
          data={filteredChats}
          renderItem={renderChatItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          className="bg-white"
        />
      ) : (
        <EmptyState />
      )}
    </SafeAreaView>
  );
} 