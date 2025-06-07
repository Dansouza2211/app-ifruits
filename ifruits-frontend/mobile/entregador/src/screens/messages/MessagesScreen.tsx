import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const MessagesScreen = () => {
  const navigation = useNavigation();
  
  // Dados mockados para demonstração
  const mockMessages = [
    {
      id: '1',
      sender: 'Maddy Lin',
      avatar: 'https://i.pravatar.cc/150?img=5',
      message: 'Olá, boa noite',
      time: '3:74 Pm',
      unread: true,
      conversation: [
        { id: 'm1', text: 'Olá, tudo bem?', sender: 'them', time: '15:30' },
        { id: 'm2', text: 'Estou esperando meu pedido', sender: 'them', time: '15:31' },
        { id: 'm3', text: 'Olá! Estou a caminho, chegarei em 5 minutos', sender: 'me', time: '15:35' },
        { id: 'm4', text: 'Obrigado!', sender: 'them', time: '15:36' },
        { id: 'm5', text: 'Olá, boa noite', sender: 'them', time: '15:40' }
      ]
    },
    {
      id: '2',
      sender: 'Sarah Jen',
      avatar: 'https://i.pravatar.cc/150?img=10',
      message: 'Obrigadaaaa',
      time: '6:32 Pm',
      unread: false,
      conversation: [
        { id: 'm1', text: 'Entrega realizada!', sender: 'me', time: '18:20' },
        { id: 'm2', text: 'Obrigadaaaa', sender: 'them', time: '18:32' }
      ]
    },
    {
      id: '3',
      sender: 'Ron Edward',
      avatar: 'https://i.pravatar.cc/150?img=12',
      message: 'QNN 20 conjunto 13 casa 7',
      time: '7:22 Pm',
      unread: true,
      conversation: [
        { id: 'm1', text: 'Olá, não encontrei o endereço', sender: 'me', time: '19:15' },
        { id: 'm2', text: 'Qual é o endereço exato?', sender: 'me', time: '19:16' },
        { id: 'm3', text: 'QNN 20 conjunto 13 casa 7', sender: 'them', time: '19:22' }
      ]
    },
    {
      id: '4',
      sender: 'Alice Adam',
      avatar: 'https://i.pravatar.cc/150?img=13',
      message: 'Deixa na portaria por favor',
      time: 'Ontem',
      unread: false,
      conversation: [
        { id: 'm1', text: 'Estou chegando no seu condomínio', sender: 'me', time: '14:50' },
        { id: 'm2', text: 'Você prefere que eu entregue na sua porta?', sender: 'me', time: '14:51' },
        { id: 'm3', text: 'Deixa na portaria por favor', sender: 'them', time: '14:55' }
      ]
    },
    {
      id: '5',
      sender: 'Will Smith',
      avatar: 'https://i.pravatar.cc/150?img=15',
      message: 'Estou descendo',
      time: 'Ontem',
      unread: false,
      conversation: [
        { id: 'm1', text: 'Cheguei no seu prédio', sender: 'me', time: '17:35' },
        { id: 'm2', text: 'Estou na portaria', sender: 'me', time: '17:36' },
        { id: 'm3', text: 'Estou descendo', sender: 'them', time: '17:40' }
      ]
    },
    {
      id: '6',
      sender: 'Jessica Ben',
      avatar: 'https://i.pravatar.cc/150?img=17',
      message: 'tudo certo?',
      time: 'Ontem',
      unread: false,
      conversation: [
        { id: 'm1', text: 'Entreguei seu pedido', sender: 'me', time: '12:25' },
        { id: 'm2', text: 'tudo certo?', sender: 'them', time: '12:30' }
      ]
    }
  ];

  const systemMessages = [
    {
      id: 's1',
      type: 'promo',
      title: 'Indique e ganhe!',
      message: 'Convide um amigo e ganhe recompensas!',
      icon: 'gift',
      color: '#41B54A',
      time: '2 m ago',
      conversation: [
        { 
          id: 'sm1', 
          text: 'Olá! Sabia que você pode ganhar R$10 para cada amigo que você indicar e começar a entregar pelo iFruits? É super fácil! Basta compartilhar seu código de indicação: ENTREGA123. Quando seu amigo se cadastrar usando esse código e completar 5 entregas, vocês dois ganham R$10!', 
          sender: 'system', 
          time: '10:00' 
        }
      ]
    },
    {
      id: 's2',
      type: 'order',
      title: 'Pedido cancelado',
      message: 'O pedido #129876 foi cancelado.',
      icon: 'close-circle',
      color: '#EF4444',
      time: '2 m ago',
      conversation: [
        { 
          id: 'sm1', 
          text: 'Informamos que o pedido #129876 foi cancelado pelo cliente. Você não precisa mais realizar esta entrega. Desculpe pelo inconveniente.', 
          sender: 'system', 
          time: '10:05' 
        }
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'system'

  const handleOpenConversation = (message) => {
    navigation.navigate('Conversation', { message });
  };

  const renderMessage = (message) => (
    <TouchableOpacity
      key={message.id}
      style={styles.messageItem}
      onPress={() => handleOpenConversation(message)}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: message.avatar }}
          style={styles.avatar}
        />
        {message.unread && (
          <View style={styles.unreadBadge} />
        )}
      </View>
      
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.senderName}>{message.sender}</Text>
          <Text style={styles.messageTime}>{message.time}</Text>
        </View>
        <Text style={[styles.messageText, message.unread && styles.unreadText]} numberOfLines={1}>
          {message.message}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSystemMessage = (message) => (
    <TouchableOpacity
      key={message.id}
      style={styles.messageItem}
      onPress={() => handleOpenConversation(message)}
    >
      <View style={[styles.systemIconContainer, { backgroundColor: message.color === '#EF4444' ? '#FEE2E2' : '#E6F7E8' }]}>
        <Icon name={message.icon} size={24} color={message.color} />
      </View>
      
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.senderName}>{message.title}</Text>
          <Text style={styles.messageTime}>{message.time}</Text>
        </View>
        <Text style={styles.messageText} numberOfLines={1}>
          {message.message}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Mensagens
        </Text>
      </View>
      
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]} 
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>Conversas</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'system' && styles.activeTab]} 
          onPress={() => setActiveTab('system')}
        >
          <Text style={[styles.tabText, activeTab === 'system' && styles.activeTabText]}>Sistema</Text>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>{systemMessages.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {activeTab === 'system' ? (
          <>
            {systemMessages.map(renderSystemMessage)}
          </>
        ) : (
          <>
            {mockMessages.map(renderMessage)}
          </>
        )}
        
        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#41B54A',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#41B54A',
  },
  tabText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#41B54A',
    fontWeight: '600',
  },
  notificationBadge: {
    backgroundColor: '#41B54A',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  highlight: {
    color: '#41B54A',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  unreadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#41B54A',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  systemIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E6F7E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  senderName: {
    fontWeight: '600',
    color: '#1F2937',
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  messageText: {
    fontSize: 14,
    color: '#6B7280',
  },
  unreadText: {
    color: '#1F2937',
    fontWeight: '500',
  },
  spacer: {
    height: 80,
  },
});

export default MessagesScreen; 