import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { messageId, contact } = route.params || {};
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();

  // Dados mockados para demonstração
  const mockMessages = [
    { 
      id: '1', 
      text: 'Olá, tudo bem?', 
      timestamp: new Date(Date.now() - 40 * 60000), 
      sender: 'other',
      read: true
    },
    { 
      id: '2', 
      text: 'Sim! Obrigado por perguntar.', 
      timestamp: new Date(Date.now() - 35 * 60000), 
      sender: 'me',
      read: true
    },
    { 
      id: '3', 
      text: 'Queria confirmar meu endereço de entrega.', 
      timestamp: new Date(Date.now() - 30 * 60000), 
      sender: 'other',
      read: true
    },
    { 
      id: '4', 
      text: 'Claro! Pode me informar por favor?', 
      timestamp: new Date(Date.now() - 25 * 60000), 
      sender: 'me',
      read: true
    },
    { 
      id: '5', 
      text: 'É na Rua das Flores, 123, apt 45.', 
      timestamp: new Date(Date.now() - 20 * 60000), 
      sender: 'other',
      read: true
    },
    { 
      id: '6', 
      text: 'Tem algum ponto de referência?', 
      timestamp: new Date(Date.now() - 15 * 60000), 
      sender: 'me',
      read: true
    },
    { 
      id: '7', 
      text: 'Sim, é perto do supermercado da esquina!', 
      timestamp: new Date(Date.now() - 10 * 60000), 
      sender: 'other',
      read: true
    },
  ];

  useEffect(() => {
    // Carregar as mensagens mockadas
    setMessages(mockMessages);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: String(Date.now()),
      text: newMessage.trim(),
      timestamp: new Date(),
      sender: 'me',
      read: false
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Rolar para o final depois que a mensagem for enviada
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white"
    >
      {/* Header */}
      <View className="bg-primary pt-12 pb-4 px-6 flex-row items-center">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="pr-4"
        >
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
          className="w-10 h-10 rounded-full mr-3"
        />
        
        <View className="flex-1">
          <Text className="text-white font-semibold text-lg">
            {contact || 'Chat'}
          </Text>
          <Text className="text-white text-opacity-80 text-sm">
            Online agora
          </Text>
        </View>
        
        <TouchableOpacity className="p-2">
          <Icon name="phone" size={22} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Mensagens */}
      <ScrollView 
        className="flex-1 px-4 pt-4"
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
      >
        {messages.map((message) => (
          <View 
            key={message.id}
            className={`mb-4 max-w-[80%] ${message.sender === 'me' ? 'self-end' : 'self-start'}`}
            style={{ alignSelf: message.sender === 'me' ? 'flex-end' : 'flex-start' }}
          >
            <View 
              className={`p-3 rounded-2xl ${
                message.sender === 'me' 
                  ? 'bg-primary rounded-tr-none' 
                  : 'bg-gray-100 rounded-tl-none'
              }`}
            >
              <Text 
                className={`${message.sender === 'me' ? 'text-white' : 'text-gray-800'}`}
              >
                {message.text}
              </Text>
            </View>
            
            <View 
              className={`flex-row items-center mt-1 ${
                message.sender === 'me' ? 'justify-end' : 'justify-start'
              }`}
            >
              <Text className="text-gray-500 text-xs">
                {formatTime(message.timestamp)}
              </Text>
              
              {message.sender === 'me' && (
                <Icon 
                  name={message.read ? 'check-all' : 'check'} 
                  size={14} 
                  color={message.read ? '#41B54A' : '#999'}
                  className="ml-1" 
                />
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      
      {/* Input de mensagem */}
      <View className="px-4 py-2 border-t border-gray-200 flex-row items-center">
        <TouchableOpacity className="p-2">
          <Icon name="paperclip" size={24} color="#999" />
        </TouchableOpacity>
        
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 mx-2"
          multiline
        />
        
        <TouchableOpacity 
          onPress={handleSendMessage}
          disabled={newMessage.trim() === ''}
          className={`p-2 rounded-full ${newMessage.trim() !== '' ? 'bg-primary' : 'bg-gray-300'}`}
        >
          <Icon name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatDetailScreen; 