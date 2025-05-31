import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeInDown, BounceIn, ZoomIn } from 'react-native-reanimated';
import Header from '../../components/Header';

// Componente de campo de formulário
const FormField = ({ label, placeholder, value, onChangeText, keyboardType = 'default', required = false }) => (
  <View className="mb-4">
    <Text className="font-medium text-gray-800 mb-1">
      {label} {required && <Text className="text-red-500">*</Text>}
    </Text>
    <TextInput
      className="bg-gray-50 rounded-lg px-4 py-3"
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  </View>
);

// Componente para endereço
const AddressCard = ({ address, isDefault, onEdit, onDelete, onSetDefault }) => {
  return (
    <Animated.View 
      entering={FadeInUp.delay(200).duration(400)}
      className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
    >
      <View className="px-4 py-3 bg-gray-50 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Icon name="map-marker" size={18} color="#41B54A" />
          <Text className="font-medium ml-2 text-gray-800">{address.name}</Text>
        </View>
        {isDefault && (
          <View className="bg-green-100 px-2 py-1 rounded-full">
            <Text className="text-green-700 text-xs font-medium">Padrão</Text>
          </View>
        )}
      </View>
      
      <View className="p-4">
        <Text className="text-gray-700 leading-5">{address.street}, {address.number}</Text>
        <Text className="text-gray-700 leading-5">{address.complement}</Text>
        <Text className="text-gray-700 leading-5">{address.neighborhood} - {address.city}, {address.state}</Text>
        <Text className="text-gray-700 leading-5">CEP: {address.zipCode}</Text>
        
        <View className="flex-row mt-4 border-t border-gray-100 pt-3">
          <TouchableOpacity 
            onPress={onEdit}
            className="flex-row items-center mr-4"
          >
            <Icon name="pencil-outline" size={16} color="#41B54A" />
            <Text className="text-green-600 ml-1 font-medium">Editar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={onDelete}
            className="flex-row items-center mr-4"
          >
            <Icon name="delete-outline" size={16} color="#FF5757" />
            <Text className="text-red-500 ml-1 font-medium">Excluir</Text>
          </TouchableOpacity>
          
          {!isDefault && (
            <TouchableOpacity 
              onPress={onSetDefault}
              className="flex-row items-center"
            >
              <Icon name="check-circle-outline" size={16} color="#41B54A" />
              <Text className="text-green-600 ml-1 font-medium">Definir como padrão</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

// Componente para adicionar novo endereço
const AddAddressCard = ({ onPress }) => {
  return (
    <Animated.View 
      entering={FadeInUp.delay(300).duration(400)}
    >
      <TouchableOpacity 
        onPress={onPress}
        className="bg-white border border-dashed border-green-300 rounded-xl p-4 mb-4 items-center justify-center"
      >
        <View className="w-12 h-12 bg-green-50 rounded-full items-center justify-center mb-2">
          <Icon name="plus" size={24} color="#41B54A" />
        </View>
        <Text className="text-green-600 font-medium">Adicionar novo endereço</Text>
        <Text className="text-gray-400 text-xs text-center mt-1">
          Cadastre um novo local para receber suas entregas
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Componente de barra de pesquisa
const SearchBar = ({ value, onChangeText }) => {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2 mb-4">
      <Icon name="magnify" size={20} color="#666" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar endereço"
        className="flex-1 ml-2 text-gray-700"
      />
      {value !== '' && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Icon name="close-circle" size={18} color="#999" />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Modal de formulário de endereço
const AddressFormModal = ({ visible, onClose, address, onSave, isEditing }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  });

  // Carrega os dados do endereço se estiver editando
  useEffect(() => {
    if (address && isEditing) {
      setFormData(address);
    } else {
      // Reseta o formulário quando for um novo endereço
      setFormData({
        id: Date.now(), // Gera um ID único baseado no timestamp
        name: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
        isDefault: false
      });
    }
  }, [address, isEditing, visible]);

  const handleSave = () => {
    // Validação básica de campos obrigatórios
    if (!formData.name || !formData.street || !formData.number || 
        !formData.neighborhood || !formData.city || !formData.state || !formData.zipCode) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-4 py-3 border-b border-gray-100 flex-row items-center justify-between">
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-800">
            {isEditing ? 'Editar endereço' : 'Novo endereço'}
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView className="flex-1 px-4 py-4">
          <FormField 
            label="Nome do endereço"
            placeholder="Ex: Casa, Trabalho"
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
            required={true}
          />
          
          <FormField 
            label="CEP"
            placeholder="00000-000"
            value={formData.zipCode}
            onChangeText={(text) => setFormData({...formData, zipCode: text})}
            keyboardType="number-pad"
            required={true}
          />
          
          <FormField 
            label="Rua/Avenida"
            placeholder="Nome da rua ou avenida"
            value={formData.street}
            onChangeText={(text) => setFormData({...formData, street: text})}
            required={true}
          />
          
          <FormField 
            label="Número"
            placeholder="123"
            value={formData.number}
            onChangeText={(text) => setFormData({...formData, number: text})}
            keyboardType="number-pad"
            required={true}
          />
          
          <FormField 
            label="Complemento"
            placeholder="Apto, Bloco, Referência"
            value={formData.complement}
            onChangeText={(text) => setFormData({...formData, complement: text})}
          />
          
          <FormField 
            label="Bairro"
            placeholder="Nome do bairro"
            value={formData.neighborhood}
            onChangeText={(text) => setFormData({...formData, neighborhood: text})}
            required={true}
          />
          
          <FormField 
            label="Cidade"
            placeholder="Nome da cidade"
            value={formData.city}
            onChangeText={(text) => setFormData({...formData, city: text})}
            required={true}
          />
          
          <FormField 
            label="Estado"
            placeholder="UF"
            value={formData.state}
            onChangeText={(text) => setFormData({...formData, state: text})}
            required={true}
          />

          <TouchableOpacity 
            className="flex-row items-center mt-2 mb-6"
            onPress={() => setFormData({...formData, isDefault: !formData.isDefault})}
          >
            <View className={`w-5 h-5 rounded-md mr-2 border ${formData.isDefault ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
              {formData.isDefault && <Icon name="check" size={16} color="#FFF" />}
            </View>
            <Text className="text-gray-800">Definir como endereço padrão</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-green-500 py-4 rounded-xl mb-6"
            onPress={handleSave}
          >
            <Text className="text-white font-bold text-center">SALVAR ENDEREÇO</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

// Componente Modal de Confirmação personalizado
const ConfirmationModal = ({ visible, onClose, onConfirm, title, message, confirmText = "EXCLUIR", cancelText = "CANCELAR" }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-5">
        <Animated.View 
          entering={ZoomIn.duration(300)}
          className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden"
        >
          {/* Cabeçalho do modal */}
          <View className="bg-green-500 pt-4 items-center pb-2">
            <View className="w-16 h-16 bg-white rounded-full items-center justify-center mb-1">
              <Icon name="leaf" size={30} color="#41B54A" />
            </View>
          </View>
          
          <View className="p-5">
            {/* Título */}
            <Text className="text-xl font-bold text-gray-800 text-center mb-2">{title}</Text>
            
            {/* Ícone de alerta */}
            <View className="items-center my-3">
              <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center">
                <Icon name="trash-can-outline" size={32} color="#FF5757" />
              </View>
            </View>
            
            {/* Mensagem */}
            <Text className="text-gray-600 text-center mb-6">{message}</Text>
            
            {/* Botões */}
            <View className="flex-row items-center justify-between gap-3 mt-2">
              <TouchableOpacity 
                onPress={onClose}
                className="flex-1 py-3 border border-gray-300 rounded-xl"
              >
                <Text className="text-gray-700 font-semibold text-center">{cancelText}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={onConfirm}
                className="flex-1 py-3 bg-red-500 rounded-xl"
              >
                <Text className="text-white font-bold text-center">{confirmText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default function AddressesScreen({ navigation }) {
  console.log('Renderizando tela de endereços');
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  
  // Estado para os endereços
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Casa',
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 101',
      neighborhood: 'Jardim América',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01430-000',
      isDefault: true
    },
    {
      id: 2,
      name: 'Trabalho',
      street: 'Avenida Paulista',
      number: '1578',
      complement: 'Sala 302',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-200',
      isDefault: false
    }
  ]);

  // Estado para o modal de formulário
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Estado para o modal de confirmação de exclusão
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  // Função para voltar
  const handleGoBack = () => {
    console.log('Voltando da tela de endereços');
    navigation.goBack();
  };

  // Função para filtrar endereços com base na pesquisa
  const filteredAddresses = addresses.filter(address => {
    const searchLower = searchText.toLowerCase();
    return address.name.toLowerCase().includes(searchLower) || 
           address.street.toLowerCase().includes(searchLower) ||
           address.neighborhood.toLowerCase().includes(searchLower) ||
           address.city.toLowerCase().includes(searchLower);
  });

  // Função para adicionar novo endereço
  const handleAddAddress = () => {
    setCurrentAddress(null);
    setIsEditing(false);
    setModalVisible(true);
  };

  // Função para editar endereço
  const handleEditAddress = (address) => {
    setCurrentAddress(address);
    setIsEditing(true);
    setModalVisible(true);
  };

  // Função para excluir endereço
  const handleDeleteAddress = (address) => {
    setAddressToDelete(address);
    setDeleteModalVisible(true);
  };
  
  // Função para confirmar exclusão do endereço
  const confirmDeleteAddress = () => {
    if (addressToDelete) {
      const updatedAddresses = addresses.filter(item => item.id !== addressToDelete.id);
      setAddresses(updatedAddresses);
      setDeleteModalVisible(false);
      setAddressToDelete(null);
    }
  };

  // Função para definir endereço como padrão
  const handleSetDefault = (address) => {
    const updatedAddresses = addresses.map(item => ({
      ...item,
      isDefault: item.id === address.id ? true : false
    }));
    setAddresses(updatedAddresses);
  };

  // Função para salvar endereço (novo ou editado)
  const handleSaveAddress = (address) => {
    if (isEditing) {
      // Se estiver editando, atualiza o endereço existente
      const updatedAddresses = addresses.map(item => {
        if (item.id === address.id) {
          // Se o endereço editado estiver marcado como padrão, desmarca os outros
          if (address.isDefault) {
            return {
              ...address,
              isDefault: true
            };
          }
          return address;
        }
        // Se o endereço atual estiver marcado como padrão e o editado também,
        // desmarca o atual
        if (address.isDefault && item.isDefault) {
          return {
            ...item,
            isDefault: false
          };
        }
        return item;
      });
      setAddresses(updatedAddresses);
    } else {
      // Se estiver adicionando, adiciona um novo endereço
      if (address.isDefault) {
        // Se o novo endereço for padrão, desmarca os outros
        const updatedAddresses = addresses.map(item => ({
          ...item,
          isDefault: false
        }));
        setAddresses([...updatedAddresses, address]);
      } else {
        // Caso contrário, apenas adiciona
        setAddresses([...addresses, address]);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['right', 'left']}>
      <Header 
        title="Meus Endereços"
        showBack={true}
        onBackPress={handleGoBack}
        showMenu={true}
      />
      
      {/* Content */}
      <ScrollView 
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <SearchBar 
          value={searchText}
          onChangeText={setSearchText}
        />
        
        <AddAddressCard onPress={handleAddAddress} />
        
        <Text className="font-semibold text-gray-700 mb-3">Endereços cadastrados</Text>
        
        {filteredAddresses.length > 0 ? (
          filteredAddresses.map(address => (
            <AddressCard
              key={address.id}
              address={address}
              isDefault={address.isDefault}
              onEdit={() => handleEditAddress(address)}
              onDelete={() => handleDeleteAddress(address)}
              onSetDefault={() => handleSetDefault(address)}
            />
          ))
        ) : (
          <Text className="text-gray-500 text-center py-4">
            {searchText ? "Nenhum endereço encontrado" : "Você ainda não possui endereços cadastrados"}
          </Text>
        )}
        
        <View className="h-20" />
      </ScrollView>

      {/* Modal de formulário de endereço */}
      <AddressFormModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        address={currentAddress}
        onSave={handleSaveAddress}
        isEditing={isEditing}
      />
      
      {/* Modal de confirmação de exclusão */}
      <ConfirmationModal
        visible={deleteModalVisible}
        title="Excluir endereço"
        message={addressToDelete ? `Tem certeza que deseja excluir o endereço "${addressToDelete.name}"?` : ""}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={confirmDeleteAddress}
      />
    </SafeAreaView>
  );
} 