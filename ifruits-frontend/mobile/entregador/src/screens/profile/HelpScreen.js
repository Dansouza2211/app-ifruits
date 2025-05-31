import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const HelpScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  
  const helpCategories = [
    {
      id: '1',
      title: 'Entregas',
      icon: 'package-variant',
      questions: [
        {
          id: '1-1',
          question: 'Como aceitar uma entrega?',
          answer: 'Para aceitar uma entrega, basta acessar a tela de pedidos disponíveis e tocar no botão "Aceitar" do pedido desejado. Você terá um tempo limitado para aceitar antes que o pedido seja oferecido a outro entregador.'
        },
        {
          id: '1-2',
          question: 'O que fazer se não conseguir encontrar o endereço de entrega?',
          answer: 'Se você estiver com dificuldades para encontrar o endereço de entrega, primeiro confira se o endereço está correto no aplicativo. Em seguida, você pode usar o botão "Ligar para o cliente" para obter orientações adicionais. Se ainda assim não conseguir localizar, entre em contato com o suporte pelo chat.'
        },
        {
          id: '1-3',
          question: 'Como proceder se o cliente não estiver no local?',
          answer: 'Se o cliente não estiver no local de entrega, aguarde por até 5 minutos e tente entrar em contato por telefone. Se não conseguir contato, use o botão "Problema com a entrega" no aplicativo e siga as instruções fornecidas pelo suporte.'
        }
      ]
    },
    {
      id: '2',
      title: 'Pagamentos',
      icon: 'cash-multiple',
      questions: [
        {
          id: '2-1',
          question: 'Quando recebo o pagamento das minhas entregas?',
          answer: 'Os pagamentos são processados diariamente e ficam disponíveis no seu saldo em até 24 horas após a conclusão de cada entrega. Você pode transferir o valor para sua conta bancária a qualquer momento, sem taxas adicionais.'
        },
        {
          id: '2-2',
          question: 'Como alterar meus dados bancários?',
          answer: 'Para alterar seus dados bancários, acesse a seção "Pagamentos" no menu de perfil, toque em "Dados Bancários" e depois no ícone de edição. Preencha os novos dados e confirme a alteração. Por segurança, você receberá um código de confirmação por e-mail.'
        },
        {
          id: '2-3',
          question: 'Por que minha transferência está pendente?',
          answer: 'Transferências podem ficar pendentes por diversos motivos, como: verificação adicional de segurança, dados bancários incorretos ou problemas técnicos temporários. Se a transferência permanecer pendente por mais de 24 horas, entre em contato com o suporte.'
        }
      ]
    },
    {
      id: '3',
      title: 'Conta e Documentação',
      icon: 'card-account-details-outline',
      questions: [
        {
          id: '3-1',
          question: 'Como atualizar meus documentos?',
          answer: 'Para atualizar seus documentos, acesse a seção "Documentos" no menu de perfil, localize o documento que deseja atualizar e toque em "Atualizar". Você poderá tirar uma nova foto ou fazer upload de um arquivo existente. A nova versão será analisada e você receberá uma notificação sobre a aprovação.'
        },
        {
          id: '3-2',
          question: 'Quais documentos são necessários para ser entregador?',
          answer: 'Os documentos necessários são: Documento de Identidade (RG ou CNH), Comprovante de Residência, Foto de Perfil, Certificado de Registro do Veículo (se aplicável) e Comprovante de Conta Bancária. Todos os documentos devem estar dentro da validade e legíveis.'
        },
        {
          id: '3-3',
          question: 'O que fazer se meu documento for recusado?',
          answer: 'Se seu documento for recusado, você receberá uma notificação com o motivo da recusa. Verifique as orientações fornecidas, faça as correções necessárias e envie novamente. Caso tenha dúvidas sobre o motivo da recusa, entre em contato com o suporte.'
        }
      ]
    },
    {
      id: '4',
      title: 'Aplicativo',
      icon: 'cellphone',
      questions: [
        {
          id: '4-1',
          question: 'Como resolver problemas de conexão no aplicativo?',
          answer: 'Para resolver problemas de conexão, verifique sua conexão com a internet, reinicie o aplicativo, limpe o cache nas configurações do app ou reinstale o aplicativo. Se o problema persistir, entre em contato com o suporte técnico.'
        },
        {
          id: '4-2',
          question: 'Como ativar as notificações?',
          answer: 'Para ativar as notificações, acesse a seção "Configurações" no menu de perfil, selecione "Notificações" e ative as opções desejadas. Verifique também se as notificações estão permitidas nas configurações do seu dispositivo.'
        },
        {
          id: '4-3',
          question: 'O aplicativo está consumindo muita bateria. O que fazer?',
          answer: 'Se o aplicativo estiver consumindo muita bateria, ative o modo de economia de dados nas configurações do app, verifique se há atualizações disponíveis, feche outros aplicativos em segundo plano e reinicie seu dispositivo. Em casos extremos, reinstale o aplicativo.'
        }
      ]
    }
  ];

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleChatSupport = () => {
    // Lógica para abrir o chat com o suporte
    console.log('Open chat support');
  };

  const handleCallSupport = () => {
    // Lógica para ligar para o suporte
    console.log('Call support');
  };

  const toggleCategory = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
      setExpandedQuestion(null);
    }
  };

  const toggleQuestion = (questionId) => {
    if (expandedQuestion === questionId) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(questionId);
    }
  };

  const filteredCategories = searchQuery.trim() === '' 
    ? helpCategories 
    : helpCategories.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajuda</Text>
        <View style={styles.placeholderIcon} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon name="magnify" size={20} color="#6B7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar dúvidas e soluções"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                style={styles.clearButton} 
                onPress={() => setSearchQuery('')}
              >
                <Icon name="close-circle" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.supportButtonsContainer}>
          <TouchableOpacity style={styles.supportButton} onPress={handleChatSupport}>
            <Icon name="chat-outline" size={24} color="#41B54A" />
            <Text style={styles.supportButtonText}>Chat com Suporte</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportButton} onPress={handleCallSupport}>
            <Icon name="phone-outline" size={24} color="#41B54A" />
            <Text style={styles.supportButtonText}>Ligar para Suporte</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.faqContainer}>
          <Text style={styles.faqTitle}>Perguntas Frequentes</Text>
          
          {filteredCategories.map((category) => (
            <View key={category.id} style={styles.categoryContainer}>
              <TouchableOpacity 
                style={styles.categoryHeader}
                onPress={() => toggleCategory(category.id)}
              >
                <View style={styles.categoryTitleContainer}>
                  <View style={styles.categoryIconContainer}>
                    <Icon name={category.icon} size={20} color="#41B54A" />
                  </View>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                </View>
                <Icon 
                  name={expandedCategory === category.id ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#6B7280" 
                />
              </TouchableOpacity>
              
              {expandedCategory === category.id && (
                <View style={styles.questionsContainer}>
                  {category.questions.map((item) => (
                    <View key={item.id} style={styles.questionContainer}>
                      <TouchableOpacity 
                        style={styles.questionHeader}
                        onPress={() => toggleQuestion(item.id)}
                      >
                        <Text style={styles.questionText}>{item.question}</Text>
                        <Icon 
                          name={expandedQuestion === item.id ? "minus" : "plus"} 
                          size={18} 
                          color="#6B7280" 
                        />
                      </TouchableOpacity>
                      
                      {expandedQuestion === item.id && (
                        <Text style={styles.answerText}>{item.answer}</Text>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Ainda precisa de ajuda?</Text>
          <Text style={styles.contactText}>
            Nossa equipe de suporte está disponível de segunda a domingo, das 8h às 22h.
          </Text>
          
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Icon name="email-outline" size={20} color="#41B54A" />
              <Text style={styles.contactItemText}>suporte@ifruits.com.br</Text>
            </View>
            
            <View style={styles.contactItem}>
              <Icon name="phone-outline" size={20} color="#41B54A" />
              <Text style={styles.contactItemText}>(11) 4002-8922</Text>
            </View>
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#41B54A',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholderIcon: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  clearButton: {
    padding: 4,
  },
  supportButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  supportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  supportButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#41B54A',
    marginLeft: 8,
  },
  faqContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  categoryContainer: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E6F7E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  questionsContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
  },
  questionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  answerText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563',
    marginTop: 8,
    paddingBottom: 4,
  },
  contactContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563',
    marginBottom: 16,
  },
  contactInfo: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactItemText: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 8,
  },
  spacer: {
    height: 40,
  },
});

export default HelpScreen; 