import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FadeInUp } from 'react-native-reanimated';
import Header from '../../components/Header';

// Mocks de mensagens
const generateMessages = (chatId) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };
  
  const formatTime = () => {
    const hours = Math.floor(Math.random() * 12) + 8;
    const minutes = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };
  
  // Mensagens diferentes para cada chat
  switch(chatId) {
    case '1': // Hortifruti Santo Antônio
      return [
        {
          id: '1-1',
          text: 'Olá! Seu pedido #123456 foi confirmado.',
          sender: 'them',
          timestamp: `${formatTime()} | ${formatDate(yesterday)}`,
          status: 'read'
        },
        {
          id: '1-2',
          text: 'Ótimo! Quando será entregue?',
          sender: 'me',
          timestamp: `${formatTime()} | ${formatDate(yesterday)}`,
          status: 'read'
        },
        {
          id: '1-3',
          text: 'A previsão de entrega é de 30 a 45 minutos.',
          sender: 'them',
          timestamp: `${formatTime()} | ${formatDate(yesterday)}`,
          status: 'read'
        },
        {
          id: '1-4',
          text: 'Perfeito, obrigado!',
          sender: 'me',
          timestamp: `${formatTime()} | ${formatDate(yesterday)}`,
          status: 'read'
        },
        {
          id: '1-5',
          text: 'Olá! Sua entrega está a caminho. Chegará em aproximadamente 15 minutos.',
          sender: 'them',
          timestamp: `${formatTime()} | ${formatDate(today)}`,
          status: 'unread'
        },
        {
          id: '1-6',
          text: 'O entregador João está levando seu pedido.',
          sender: 'them',
          timestamp: `${formatTime()} | ${formatDate(today)}`,
          status: 'unread'
        }
      ];
    case '2': // João (Entregador)
      return [
        {
          id: '2-1',
          text: 'Olá! Sou o João, entregador do seu pedido #123456 do Hortifruti Santo Antônio.',
          sender: 'them',
          timestamp: `${formatTime()} | ${formatDate(today)}`,
          status: 'read'
        },
        {
          id: '2-2',
          text: 'Olá João! Tudo bem?',
          sender: 'me',
          timestamp: `${formatTime()} | ${formatDate(today)}`,
          status: 'read'
        },
        {
          id: '2-3',
          text: 'Estou na portaria do seu condomínio. Poderia autorizar minha entrada?',
          sender: 'them',
          timestamp: `${formatTime()} | ${formatDate(today)}`,
          status: 'unread'
        }
      ];
    default:
      return [
        {
          id: `${chatId}-1`,
          text: 'Olá! Como posso ajudar?',
          sender: 'them',
          timestamp: `${formatTime()} | ${formatDate(yesterday)}`,
          status: 'read'
        },
        {
          id: `${chatId}-2`,
          text: 'Olá! Gostaria de saber sobre meu pedido.',
          sender: 'me',
          timestamp: `${formatTime()} | ${formatDate(yesterday)}`,
          status: 'read'
        },
        {
          id: `${chatId}-3`,
          text: 'Claro! Pode me informar o número do seu pedido?',
          sender: 'them',
          timestamp: `${formatTime()} | ${formatDate(yesterday)}`,
          status: 'read'
        }
      ];
  }
};

// Componente para exibir informações do chat
const ChatInfo = ({ chat }) => (
  <View className="flex-row items-center">
    <Image
      source={{ uri: chat.avatar }}
      className="w-10 h-10 rounded-full"
      resizeMode="cover"
    />
    <View className="ml-3">
      <Text className="font-bold text-gray-800" numberOfLines={1}>{chat.name}</Text>
      {chat.isOnline && (
        <Text className="text-xs text-green-500">Online</Text>
      )}
    </View>
  </View>
);

// Componente de mensagem
const MessageItem = ({ message, isLast }) => {
  const isMe = message.sender === 'me';
  
  return (
    <View className={`px-4 py-1 ${isLast ? 'mb-4' : ''} flex-row ${isMe ? 'justify-end' : 'justify-start'}`}>
      <View className={`max-w-[80%] rounded-2xl p-3 ${isMe ? 'bg-green-100' : 'bg-white border border-gray-100'}`}>
        <Text className="text-gray-800">{message.text}</Text>
        <Text className="text-xs text-gray-500 mt-1 text-right">{message.timestamp.split('|')[0].trim()}</Text>
        
        {isMe && (
          <View className="absolute bottom-1 right-1">
            <Icon 
              name={message.status === 'read' ? 'check-all' : 'check'} 
              size={14} 
              color={message.status === 'read' ? '#41B54A' : '#9CA3AF'} 
            />
          </View>
        )}
      </View>
    </View>
  );
};

// Componente para data da mensagem
const DateSeparator = ({ date }) => (
  <View className="flex-row justify-center items-center my-3">
    <View className="flex-1 h-px bg-gray-200" />
    <Text className="mx-2 text-xs text-gray-500">{date}</Text>
    <View className="flex-1 h-px bg-gray-200" />
  </View>
);

// Componente para rodapé com input de mensagem
const MessageInput = ({ value, onChangeText, onSend }) => (
  <View className="px-2 py-2 bg-white border-t border-gray-100">
    <View className="flex-row items-center">
      <TouchableOpacity className="p-2">
        <Icon name="paperclip" size={24} color="#9CA3AF" />
      </TouchableOpacity>
      
      <View className="flex-1 bg-gray-100 rounded-full px-4 py-2 mx-2 flex-row items-center">
        <TextInput
          className="flex-1 text-gray-800"
          placeholder="Digite uma mensagem..."
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          multiline
        />
        <TouchableOpacity>
          <Icon name="emoticon-outline" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        className={`p-2 rounded-full ${value.trim().length > 0 ? 'bg-primary' : 'bg-gray-200'}`}
        onPress={onSend}
        disabled={value.trim().length === 0}
      >
        <Icon name="send" size={20} color={value.trim().length > 0 ? 'white' : '#9CA3AF'} />
      </TouchableOpacity>
    </View>
  </View>
);

// Componente principal
export default function ChatDetailScreen({ route, navigation }) {
  const { chat } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const flatListRef = useRef(null);

  // Carrega mensagens do chat
  useEffect(() => {
    const mockMessages = generateMessages(chat.id);
    setMessages(mockMessages);
    
    // Monitorar exibição do teclado
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [chat.id]);

  // Rola para o final da lista quando mensagens são atualizadas
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 200);
    }
  }, [messages]);

  // Enviar mensagem
  const handleSendMessage = () => {
    if (message.trim().length === 0) return;
    
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    
    const newMessage = {
      id: `new-${Date.now()}`,
      text: message.trim(),
      sender: 'me',
      timestamp: `${hours}:${minutes} | ${day}/${month}/${year}`,
      status: 'sent'
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simula resposta automática após 1 segundo
    setTimeout(() => {
      const responseMessage = {
        id: `response-${Date.now()}`,
        text: 'Mensagem recebida. Responderemos em breve!',
        sender: 'them',
        timestamp: `${hours}:${minutes} | ${day}/${month}/${year}`,
        status: 'sent'
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  // Agrupar mensagens por data
  const groupedMessages = messages.reduce((acc, message) => {
    const date = message.timestamp.split('|')[1].trim();
    
    if (!acc[date]) {
      acc[date] = [];
    }
    
    acc[date].push(message);
    return acc;
  }, {});

  // Renderizar grupos de mensagens
  const renderMessageGroups = () => {
    const groups = [];
    
    Object.keys(groupedMessages).forEach((date, dateIndex) => {
      groups.push(
        <DateSeparator key={`date-${date}`} date={date} />
      );
      
      groupedMessages[date].forEach((msg, msgIndex) => {
        groups.push(
          <MessageItem 
            key={msg.id} 
            message={msg} 
            isLast={msgIndex === groupedMessages[date].length - 1}
          />
        );
      });
    });
    
    return groups;
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header 
        title={chat.name}
        showBack={true}
        onBackPress={() => navigation.goBack()}
        showMenu={true}
      />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={renderMessageGroups()}
          renderItem={({ item }) => item}
          keyExtractor={(_, index) => `message-group-${index}`}
          className="bg-gray-50 flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
        
        <MessageInput 
          value={message}
          onChangeText={setMessage}
          onSend={handleSendMessage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 