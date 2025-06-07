import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { usePayment } from '../../contexts/PaymentContext';
import { useModal } from '../../contexts/ModalContext';

// Componente de input personalizado
const CustomInput = ({ label, placeholder, value, onChangeText, keyboardType = 'default', secureTextEntry = false, error = null }) => (
  <View className="mb-4">
    <Text className="text-gray-500 text-xs mb-1">{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      className={`p-3 rounded-md text-gray-700 ${error ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}
    />
    {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
  </View>
);

export default function CardRegisterScreen({ navigation, route }) {
  console.log('Renderizando tela de registro de cartão');
  const { addCard, updateCard } = usePayment();
  const { showSuccess } = useModal();
  
  // Estado para dados do cartão
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  
  // Estado para validação
  const [errors, setErrors] = useState({});
  
  // Verificar se é edição ou novo cartão
  const editingCard = route?.params?.card;
  
  // Se for edição, preencher os campos
  useEffect(() => {
    if (editingCard) {
      setCardHolder(editingCard.holder);
      setCardNumber(editingCard.number);
      setExpiryDate(editingCard.expiryDate);
      setSecurityCode(editingCard.securityCode);
    }
  }, [editingCard]);
  
  // Funções de formatação
  const formatCardNumber = (text) => {
    // Remover espaços e caracteres não numéricos
    const cleaned = text.replace(/\D/g, '');
    
    // Limitar a 16 dígitos
    const limited = cleaned.substring(0, 16);
    
    // Adicionar espaços a cada 4 dígitos
    const formatted = limited.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    return formatted;
  };
  
  const formatExpiryDate = (text) => {
    // Remover caracteres não numéricos
    const cleaned = text.replace(/\D/g, '');
    
    // Limitar a 6 dígitos (MM/AAAA)
    const limited = cleaned.substring(0, 6);
    
    // Adicionar barra após os primeiros 2 dígitos
    if (limited.length > 2) {
      return `${limited.substring(0, 2)}/${limited.substring(2)}`;
    }
    
    return limited;
  };
  
  // Função para validar o cartão
  const validateCard = () => {
    const newErrors = {};
    
    // Validar nome do titular
    if (!cardHolder.trim()) {
      newErrors.cardHolder = 'Nome do titular é obrigatório';
    }
    
    // Validar número do cartão
    if (!cardNumber.trim()) {
      newErrors.cardNumber = 'Número do cartão é obrigatório';
    } else if (cardNumber.replace(/\D/g, '').length < 16) {
      newErrors.cardNumber = 'Número do cartão deve ter 16 dígitos';
    }
    
    // Validar data de validade
    if (!expiryDate.trim()) {
      newErrors.expiryDate = 'Data de validade é obrigatória';
    } else {
      const [month, year] = expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      
      if (!month || !year || month > 12 || month < 1) {
        newErrors.expiryDate = 'Data de validade inválida';
      } else if (parseInt(`20${year}`) < currentYear || 
                (parseInt(`20${year}`) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = 'Cartão expirado';
      }
    }
    
    // Validar código de segurança
    if (!securityCode.trim()) {
      newErrors.securityCode = 'Código de segurança é obrigatório';
    } else if (securityCode.length < 3) {
      newErrors.securityCode = 'Código de segurança deve ter 3 dígitos';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Função para salvar o cartão
  const handleSaveCard = () => {
    if (validateCard()) {
      const cardData = {
        holder: cardHolder,
        number: cardNumber.replace(/\s/g, ''),
        expiryDate,
        securityCode
      };
      
      if (editingCard) {
        // Atualizar cartão existente
        updateCard(editingCard.id, cardData);
        showSuccess('Cartão atualizado', 'Seu cartão foi atualizado com sucesso.');
      } else {
        // Adicionar novo cartão
        addCard(cardData);
        showSuccess('Cartão adicionado', 'Seu cartão foi adicionado com sucesso.');
      }
      
      // Voltar para a tela anterior
      navigation.goBack();
    }
  };
  
  // Função para voltar
  const handleGoBack = () => {
    console.log('Voltando da tela de registro de cartão');
    navigation.goBack();
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity 
          onPress={handleGoBack}
          className="mr-3"
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-800">
          {editingCard ? 'Editar Cartão' : 'Cadastrar Cartão'}
        </Text>
      </View>
      
      <ScrollView className="flex-1 p-4">
        <Animated.View 
          entering={FadeInUp.delay(200).duration(400)}
          className="bg-white rounded-xl shadow-sm mb-6 border border-gray-100 p-4"
        >
          <View className="flex-row items-center mb-4">
            <Icon name="credit-card-outline" size={24} color="#41B54A" className="mr-2" />
            <Text className="text-lg font-semibold text-gray-800">Informações do Cartão</Text>
          </View>
          
          <CustomInput
            label="Nome do Titular"
            placeholder="Nome como aparece no cartão"
            value={cardHolder}
            onChangeText={setCardHolder}
            error={errors.cardHolder}
          />
          
          <CustomInput
            label="Número do Cartão"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChangeText={(text) => setCardNumber(formatCardNumber(text))}
            keyboardType="number-pad"
            error={errors.cardNumber}
          />
          
          <View className="flex-row">
            <View className="flex-1 mr-3">
              <CustomInput
                label="Data de Validade"
                placeholder="MM/AAAA"
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                keyboardType="number-pad"
                error={errors.expiryDate}
              />
            </View>
            
            <View className="flex-1">
              <CustomInput
                label="Código de Segurança"
                placeholder="CVV"
                value={securityCode}
                onChangeText={(text) => setSecurityCode(text.replace(/\D/g, '').substring(0, 3))}
                keyboardType="number-pad"
                secureTextEntry
                error={errors.securityCode}
              />
            </View>
          </View>
        </Animated.View>
        
        <TouchableOpacity 
          className="bg-primary py-3 rounded-lg items-center mb-4"
          onPress={handleSaveCard}
        >
          <Text className="text-white font-medium">
            {editingCard ? 'Atualizar Cartão' : 'Salvar Cartão'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="py-3 rounded-lg items-center border border-gray-200"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-gray-500">Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
} 