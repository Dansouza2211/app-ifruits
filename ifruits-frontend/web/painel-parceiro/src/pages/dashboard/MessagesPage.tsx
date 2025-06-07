import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Dados mockados de mensagens
const mockMessages = [
  {
    id: '1',
    user: {
      name: 'Maria Silva',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
    },
    lastMessage: 'Olá, gostaria de saber se vocês têm manga orgânica disponível?',
    time: '10:42',
    unread: true,
    conversation: [
      { id: 'm1', text: 'Olá, gostaria de saber se vocês têm manga orgânica disponível?', sender: 'customer', time: '10:42' }
    ]
  },
  {
    id: '2',
    user: {
      name: 'João Oliveira',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    lastMessage: 'Obrigado pelo atendimento!',
    time: '09:15',
    unread: false,
    conversation: [
      { id: 'm1', text: 'Olá, preciso saber se meu pedido já saiu para entrega', sender: 'customer', time: '09:10' },
      { id: 'm2', text: 'Olá João! Sim, seu pedido já está com o entregador. Deve chegar em aproximadamente 15 minutos.', sender: 'store', time: '09:12' },
      { id: 'm3', text: 'Obrigado pelo atendimento!', sender: 'customer', time: '09:15' }
    ]
  },
  {
    id: '3',
    user: {
      name: 'Ana Costa',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    lastMessage: 'Vocês têm previsão de chegada das bananas?',
    time: 'Ontem',
    unread: false,
    conversation: [
      { id: 'm1', text: 'Olá, vocês têm banana prata?', sender: 'customer', time: '14:30' },
      { id: 'm2', text: 'Olá Ana! No momento estamos sem banana prata em estoque.', sender: 'store', time: '14:35' },
      { id: 'm3', text: 'Vocês têm previsão de chegada das bananas?', sender: 'customer', time: '14:40' }
    ]
  }
];

const MessagesPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Inicializar estado com dados mockados
  const [messages] = useState(mockMessages);
  
  const [selectedChat, setSelectedChat] = useState(null);
  const [replyText, setReplyText] = useState('');
  
  const handleChatSelect = (message) => {
    setSelectedChat(message);
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!replyText.trim()) return;
    
    // Em uma aplicação real, isso enviaria a mensagem para uma API
    // Aqui apenas simulamos adicionando a mensagem à conversa existente
    if (selectedChat) {
      const updatedMessages = messages.map(msg => {
        if (msg.id === selectedChat.id) {
          const updatedMsg = {
            ...msg,
            lastMessage: replyText,
            time: 'Agora',
            unread: false,
            conversation: [
              ...msg.conversation,
              { id: `m${msg.conversation.length + 1}`, text: replyText, sender: 'store', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            ]
          };
          return updatedMsg;
        }
        return msg;
      });
      
      // Atualizar o estado com as mensagens atualizadas
      // Em uma aplicação real, isso seria feito após uma resposta bem-sucedida da API
      const updatedSelectedChat = updatedMessages.find(msg => msg.id === selectedChat.id);
      setSelectedChat(updatedSelectedChat);
      setReplyText('');
      
      // Simulação de atualização do estado global de mensagens
      // Em uma aplicação real, isso seria manipulado por um context ou estado global
      // Aqui fazemos uma simulação simples
      const messagesElement = document.querySelectorAll('.messages-list');
      if (messagesElement) {
        setTimeout(() => {
          messagesElement.forEach(el => {
            el.scrollTop = el.scrollHeight;
          });
        }, 100);
      }
    }
  };
  
  const filteredMessages = messages.filter(message => 
    message.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Mensagens</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[calc(100vh-180px)]">
        <div className="flex h-full">
          {/* Lista de conversas */}
          <div className="w-1/3 border-r border-gray-200 h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar conversa..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-200">
              <div className="flex px-2">
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'all'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('all')}
                >
                  Todos
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'unread'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('unread')}
                >
                  Não lidos
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredMessages
                .filter(message => activeTab === 'all' || (activeTab === 'unread' && message.unread))
                .map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    selectedChat?.id === message.id ? 'bg-gray-50' : ''
                  } ${message.unread ? 'bg-green-50' : ''}`}
                  onClick={() => handleChatSelect(message)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      <img src={message.user.avatar} alt={message.user.name} className="w-10 h-10 rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{message.user.name}</h3>
                        <span className="text-xs text-gray-500">{message.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{message.lastMessage}</p>
                    </div>
                    {message.unread && (
                      <div className="ml-2 bg-primary w-2 h-2 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredMessages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <p className="text-gray-500">Nenhuma conversa encontrada</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Área da conversa */}
          <div className="w-2/3 flex flex-col h-full">
            {selectedChat ? (
              <>
                <div className="p-4 border-b border-gray-200 flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    <img src={selectedChat.user.avatar} alt={selectedChat.user.name} className="w-10 h-10 rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedChat.user.name}</h3>
                    <p className="text-xs text-gray-500">Cliente</p>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedChat.conversation.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'store' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                          message.sender === 'store'
                            ? 'bg-primary text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs ${message.sender === 'store' ? 'text-green-100' : 'text-gray-500'} text-right mt-1`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <form onSubmit={handleSendMessage} className="flex items-center">
                    <input
                      type="text"
                      placeholder="Digite sua mensagem..."
                      className="flex-1 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary px-4 py-2"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-primary text-white rounded-r-lg px-4 py-2 hover:bg-primary/90"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-700 mb-2">Suas mensagens</h3>
                <p className="text-gray-500 max-w-sm">
                  Selecione uma conversa para visualizar e responder às mensagens dos seus clientes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessagesPage; 