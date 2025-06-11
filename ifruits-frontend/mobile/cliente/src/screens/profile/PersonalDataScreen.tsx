import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, Alert, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeInDown, ZoomIn } from 'react-native-reanimated';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from 'utils/supabase';

// Componente de campo de modal
const FormField = ({ label, value, onChangeText, keyboardType = 'default', secureTextEntry = false, placeholder }) => (
  <View className="mb-4">
    <Text className="text-sm text-gray-500 mb-1">{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      className="bg-gray-50 rounded-lg p-3 text-gray-800"
    />
  </View>
);

// Componente de campo de informação
const InfoField = ({ label, value, editable = true, icon, onEdit, masked = false }) => {
  // Função para mascarar valores sensíveis
  const displayValue = masked ? (value ? value.replace(/./g, '•') : '') : value;


  return (
    <Animated.View
      entering={FadeInUp.delay(200).duration(400)}
      className="bg-white rounded-xl mb-4 overflow-hidden"
    >
      <View className="p-4">
        <Text className="text-sm text-gray-500 mb-1">{label}</Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            {icon && <Icon name={icon} size={18} color="#41B54A" className="mr-2" />}
            <Text className="text-base text-gray-800 font-medium">{displayValue}</Text>
          </View>

          {editable && (
            <TouchableOpacity
              onPress={onEdit}
              className="bg-gray-100 rounded-full p-1.5"
            >
              <Icon name="pencil-outline" size={18} color="#41B54A" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

// Componente de modal de edição
const EditModal = ({ visible, onClose, title, children, onSave }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <Animated.View
          entering={ZoomIn.duration(300)}
          className="bg-white rounded-xl w-full max-w-sm shadow-xl overflow-hidden"
        >
          <View className="px-4 py-3 border-b border-gray-100 flex-row items-center justify-between">
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-gray-800">{title}</Text>
            <View style={{ width: 24 }} />
          </View>

          <View className="p-4">
            {children}

            <TouchableOpacity
              className="bg-green-500 py-3 rounded-xl mt-2"
              onPress={onSave}
            >
              <Text className="text-white font-bold text-center">SALVAR</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Componente de modal de confirmação
const ConfirmationModal = ({ visible, onClose, onConfirm, title, message, confirmText = "CONFIRMAR", cancelText = "CANCELAR", destructive = false }) => {
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
          <View className="p-5">
            {/* Título */}
            <Text className="text-xl font-bold text-gray-800 text-center mb-2">{title}</Text>

            {/* Ícone de alerta */}
            <View className="items-center my-3">
              <View className={`w-16 h-16 ${destructive ? 'bg-red-100' : 'bg-green-100'} rounded-full items-center justify-center`}>
                <Icon
                  name={destructive ? "alert-circle-outline" : "check-circle-outline"}
                  size={32}
                  color={destructive ? "#FF5757" : "#41B54A"}
                />
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
                className={`flex-1 py-3 ${destructive ? 'bg-red-500' : 'bg-green-500'} rounded-xl`}
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

// Componente de seção
const Section = ({ title, children }) => {
  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-gray-800 mb-3">{title}</Text>
      {children}
    </View>
  );
};

export default function PersonalDataScreen({ navigation }) {
  console.log('Renderizando tela de dados pessoais');
  const insets = useSafeAreaInsets();

  // Estados para modais
  const [editingField, setEditingField] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorModalVisible, setTwoFactorModalVisible] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);

  // Estados para valores temporários no modal
  const [tempValue, setTempValue] = useState('');
  const [tempValues, setTempValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Estado para dados do usuário
  const [userData, setUserData] = useState<any>({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    profileColor: '#41B54A',
    hasCustomPhoto: false
  });

  const fetchData = async () => {
    const { data, error } = await supabase.from('usuarios').select("*");
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (error) {
      console.log("Erro ao carregar dados do usuário: ", error.message);
      return;
    }

    if (data && data.length > 0) {
      setUserData((prev: any) => ({
        ...prev,
        name: data[0].nome,
        cpf: data[0].cpf,
        email: authData.user?.email,
        phone: data[0].telefone,
        birthDate: data[0].data_nascimento
      }))
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Função para voltar
  const handleGoBack = () => {
    console.log('Voltando da tela de dados pessoais');
    navigation.goBack();
  };

  // Função para fazer logout
  const handleLogout = async () => {
    try {
      // Remover o token de autenticação
      await AsyncStorage.removeItem('@ifruits:userToken');

      console.log('Logout realizado com sucesso');

      // Navegar para a tela de login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alert('Erro ao fazer logout. Tente novamente.');
    }
  };

  // Função para abrir o modal de edição
  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(userData[field]);
    setModalVisible(true);
  };

  // Função para salvar as alterações
  const handleSave = async () => {
    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData.user) {
        console.error("Erro ao obter usuário autenticado:", authError?.message);
        Alert.alert("Erro", "Usuário não autenticado");
        return;
      }

      const userId = authData.user.id;

      const fieldMap = {
        name: 'nome',
        cpf: 'cpf',
        email: 'email',
        phone: 'telefone',
        birthDate: 'data_nascimento',
        gender: 'genero'
      }

      const supabaseField = fieldMap[editingField];

      if(supabaseField == 'email'){
        const { error } = await supabase.auth.updateUser({[supabaseField]: tempValue});
        if(error){ console.error("Erro ao atualizar email", error)}
        return;
      }

      const { error } = await supabase.from("usuarios").update({ [supabaseField]: tempValue }).eq('id', userId);

      if (error) {
        console.error("Erro ao atualizar dados no Supabase: ", error.message);
        Alert.alert("Erro", "Não foi possível salvar as alterações");
        return;
      }

      // Atualiza o estado local
      setUserData((prev) => ({
        ...prev,
        [editingField]: tempValue,
      }));

      setModalVisible(false);
      setEditingField(null);
    } catch(error){
      console.error("Erro ao salvar as alterações", error);
      Alert.alert("Error", "Ocorreu um erro ao sallvar as alterações");
    }
  };

  // Função para alterar a senha
  const handleChangePassword = () => {
    // Validar se as senhas foram preenchidas
    if (!tempValues.currentPassword || !tempValues.newPassword || !tempValues.confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    // Validar se a nova senha tem pelo menos 6 caracteres
    if (tempValues.newPassword.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    // Validar se as senhas coincidem
    if (tempValues.newPassword !== tempValues.confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    // Comentando a validação da senha atual durante o desenvolvimento
    // if (tempValues.currentPassword !== '123456') {
    //   Alert.alert('Erro', 'Senha atual incorreta');
    //   return;
    // }

    // Fechar o modal de senha
    setPasswordModalVisible(false);

    // Resetar os campos
    setTempValues({
      ...tempValues,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    // Navegar para a tela de verificação de e-mail
    navigation.navigate('EmailVerification', {
      email: userData.email,
      fromScreen: 'PersonalData',
      redirectTo: 'PersonalData'
    });

    // Exibir mensagem de sucesso
    // Alert.alert('Sucesso', 'Senha alterada com sucesso');
  };

  // Função para alterar foto
  const handleChangePhoto = () => {
    setPhotoModalVisible(true);
  };

  // Função para selecionar uma cor de perfil
  const handleSelectColor = (color) => {
    setUserData({
      ...userData,
      profileColor: color,
      hasCustomPhoto: false
    });
    setPhotoModalVisible(false);
  };

  // Função para simular upload de foto
  const handleUploadPhoto = () => {
    // Simulação de upload bem-sucedido
    setUserData({
      ...userData,
      hasCustomPhoto: true
    });
    setPhotoModalVisible(false);
    Alert.alert('Sucesso', 'Foto alterada com sucesso!');
  };

  // Cores disponíveis para o perfil
  const profileColors = [
    '#41B54A', // Verde (padrão)
    '#3498db', // Azul
    '#9b59b6', // Roxo
    '#e74c3c', // Vermelho
    '#f39c12', // Laranja
    '#1abc9c'  // Turquesa
  ];

  // Função para ativar/desativar autenticação em 2 fatores
  const handleToggleTwoFactor = () => {
    if (!twoFactorEnabled) {
      setTwoFactorModalVisible(true);
    } else {
      setTwoFactorEnabled(false);
      Alert.alert('Autenticação em 2 fatores desativada');
    }
  };

  // Função para confirmar a ativação da autenticação em 2 fatores
  const confirmTwoFactor = () => {
    setTwoFactorEnabled(true);
    setTwoFactorModalVisible(false);
    Alert.alert('Sucesso', 'Autenticação em 2 fatores ativada com sucesso!');
  };

  // Função para excluir a conta
  const handleDeleteAccount = () => {
    setDeleteAccountModalVisible(true);
  };

  // Função para confirmar a exclusão da conta
  const confirmDeleteAccount = () => {
    // Aqui seria a lógica para excluir a conta
    console.log('Conta excluída com sucesso');
    setDeleteAccountModalVisible(false);
    navigation.navigate('Login'); // Navegar para a tela de login ou outra tela adequada
  };

  // Função para renderizar o título do modal com base no campo sendo editado
  const getModalTitle = () => {
    switch (editingField) {
      case 'name': return 'Editar Nome';
      case 'cpf': return 'Editar CPF';
      case 'email': return 'Editar E-mail';
      case 'phone': return 'Editar Telefone';
      case 'birthDate': return 'Editar Data de Nascimento';
      case 'gender': return 'Editar Gênero';
      default: return 'Editar';
    }
  };

  // Função para renderizar os campos do modal com base no campo sendo editado
  const renderModalContent = () => {
    switch (editingField) {
      case 'name':
        return (
          <FormField
            label="Nome completo"
            value={tempValue}
            onChangeText={setTempValue}
            placeholder="Digite seu nome completo"
          />
        );
      case 'cpf':
        return (
          <FormField
            label="CPF"
            value={tempValue}
            onChangeText={setTempValue}
            keyboardType="numeric"
            placeholder="Digite seu CPF"
          />
        );
      case 'email':
        return (
          <FormField
            label="E-mail"
            value={tempValue}
            onChangeText={setTempValue}
            keyboardType="email-address"
            placeholder="Digite seu e-mail"
          />
        );
      case 'phone':
        return (
          <FormField
            label="Telefone"
            value={tempValue}
            onChangeText={setTempValue}
            keyboardType="phone-pad"
            placeholder="Digite seu telefone"
          />
        );
      case 'birthDate':
        return (
          <FormField
            label="Data de nascimento"
            value={tempValue}
            onChangeText={setTempValue}
            placeholder="DD/MM/AAAA"
          />
        );
      case 'gender':
        return (
          <View>
            <Text className="text-sm text-gray-500 mb-2">Gênero</Text>
            <View className="flex-row gap-2 mb-3">
              <TouchableOpacity
                className={`flex-1 py-3 rounded-lg border ${tempValue === 'Masculino' ? 'bg-green-100 border-green-500' : 'border-gray-300'}`}
                onPress={() => setTempValue('Masculino')}
              >
                <Text className={`text-center ${tempValue === 'Masculino' ? 'text-green-700 font-medium' : 'text-gray-700'}`}>Masculino</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-3 rounded-lg border ${tempValue === 'Feminino' ? 'bg-green-100 border-green-500' : 'border-gray-300'}`}
                onPress={() => setTempValue('Feminino')}
              >
                <Text className={`text-center ${tempValue === 'Feminino' ? 'text-green-700 font-medium' : 'text-gray-700'}`}>Feminino</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className={`py-3 rounded-lg border ${tempValue === 'Outro' ? 'bg-green-100 border-green-500' : 'border-gray-300'}`}
              onPress={() => setTempValue('Outro')}
            >
              <Text className={`text-center ${tempValue === 'Outro' ? 'text-green-700 font-medium' : 'text-gray-700'}`}>Outro</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['right', 'left']}>
      <Header
        title="Meus Dados"
        showBack={true}
        onBackPress={handleGoBack}
        showMenu={true}
      />

      {/* Logout Button */}
      <Animated.View
        entering={FadeInDown.duration(400)}
        className="px-4 pt-4"
      >
        <TouchableOpacity
          className="p-3 border border-red-500 rounded-lg flex-row justify-center items-center"
          onPress={handleLogout}
        >
          <Icon name="logout" size={20} color="#F44336" />
          <Text className="ml-2 text-red-500 font-medium">Sair da conta</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Content */}
      <ScrollView
        className="flex-1 px-4 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture Section */}
        <Animated.View
          entering={FadeInUp.duration(400)}
          className="items-center mb-8"
        >
          {userData.hasCustomPhoto ? (
            <View className="w-24 h-24 bg-green-100 rounded-full items-center justify-center mb-2 overflow-hidden">
              <Image
                source={require('../../assets/images/hortifruti-terra.png')}
                className="w-24 h-24"
                resizeMode="cover"
              />
            </View>
          ) : (
            <View
              className="w-24 h-24 rounded-full items-center justify-center mb-2"
              style={{ backgroundColor: userData.profileColor }}
            >
              <Text className="text-3xl font-bold text-white">
                {userData.name.charAt(0)}
              </Text>
            </View>
          )}
          <TouchableOpacity
            className="bg-gray-50 px-4 py-2 rounded-full border border-gray-200"
            onPress={handleChangePhoto}
          >
            <Text className="text-green-600 font-medium">Alterar foto</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Personal Info Section */}
        <Section title="Informações pessoais">
          <InfoField
            label="Nome completo"
            value={userData.name}
            icon="account"
            onEdit={() => handleEdit('name')}
          />

          <InfoField
            label="CPF"
            value={userData.cpf}
            icon="card-account-details"
            masked={true}
            onEdit={() => handleEdit('cpf')}
          />

          <InfoField
            label="Data de nascimento"
            value={userData.birthDate}
            icon="calendar"
            onEdit={() => handleEdit('birthDate')}
          />

          <InfoField
            label="Gênero"
            value={userData.gender}
            icon="human-male-female"
            onEdit={() => handleEdit('gender')}
          />
        </Section>

        {/* Contact Info Section */}
        <Section title="Informações de contato">
          <InfoField
            label="E-mail"
            value={userData.email}
            icon="email"
            onEdit={() => handleEdit('email')}
          />

          <InfoField
            label="Telefone"
            value={userData.phone}
            icon="phone"
            onEdit={() => handleEdit('phone')}
          />
        </Section>

        {/* Security Section */}
        <Section title="Segurança">
          <TouchableOpacity
            className="bg-white rounded-xl p-4 flex-row items-center justify-between mb-4"
            onPress={() => setPasswordModalVisible(true)}
          >
            <View className="flex-row items-center">
              <Icon name="lock" size={20} color="#41B54A" />
              <Text className="ml-3 text-gray-800 font-medium">Alterar senha</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white rounded-xl p-4 flex-row items-center justify-between"
            onPress={handleToggleTwoFactor}
          >
            <View className="flex-row items-center">
              <Icon name="fingerprint" size={20} color="#41B54A" />
              <Text className="ml-3 text-gray-800 font-medium">Autenticação em 2 fatores</Text>
            </View>
            <View className="flex-row items-center">
              <Text className={`mr-2 ${twoFactorEnabled ? 'text-green-500' : 'text-gray-400'}`}>
                {twoFactorEnabled ? 'Ativado' : 'Ativar'}
              </Text>
              <Switch
                value={twoFactorEnabled}
                onValueChange={handleToggleTwoFactor}
                trackColor={{ false: '#e0e0e0', true: '#a7e9af' }}
                thumbColor={twoFactorEnabled ? '#41B54A' : '#f5f5f5'}
              />
            </View>
          </TouchableOpacity>
        </Section>

        {/* Delete Account Section */}
        <TouchableOpacity
          className="flex-row items-center justify-center py-6"
          onPress={handleDeleteAccount}
        >
          <Icon name="delete" size={16} color="#FF5757" />
          <Text className="text-red-500 ml-2">Excluir minha conta</Text>
        </TouchableOpacity>

        <View className="h-20" />
      </ScrollView>

      {/* Modal de edição de campo */}
      <EditModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={getModalTitle()}
        onSave={handleSave}
      >
        {renderModalContent()}
      </EditModal>

      {/* Modal de alteração de senha */}
      <EditModal
        visible={passwordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
        title="Alterar senha"
        onSave={handleChangePassword}
      >
        <FormField
          label="Senha atual"
          value={tempValues.currentPassword}
          onChangeText={(text) => setTempValues({ ...tempValues, currentPassword: text })}
          secureTextEntry={true}
          placeholder="Digite sua senha atual"
        />
        <FormField
          label="Nova senha"
          value={tempValues.newPassword}
          onChangeText={(text) => setTempValues({ ...tempValues, newPassword: text })}
          secureTextEntry={true}
          placeholder="Digite sua nova senha"
        />
        <FormField
          label="Confirmar nova senha"
          value={tempValues.confirmPassword}
          onChangeText={(text) => setTempValues({ ...tempValues, confirmPassword: text })}
          secureTextEntry={true}
          placeholder="Digite novamente sua nova senha"
        />
      </EditModal>

      {/* Modal de confirmação de exclusão de conta */}
      <ConfirmationModal
        visible={deleteAccountModalVisible}
        onClose={() => setDeleteAccountModalVisible(false)}
        onConfirm={confirmDeleteAccount}
        title="Excluir conta"
        message="Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita."
        confirmText="EXCLUIR"
        cancelText="CANCELAR"
        destructive={true}
      />

      {/* Modal de confirmação de autenticação em 2 fatores */}
      <ConfirmationModal
        visible={twoFactorModalVisible}
        onClose={() => setTwoFactorModalVisible(false)}
        onConfirm={confirmTwoFactor}
        title="Autenticação em 2 fatores"
        message="Ao ativar este recurso, você aumenta a segurança da sua conta. Um código será enviado para seu e-mail ou telefone sempre que fizer login."
        confirmText="ATIVAR"
        cancelText="CANCELAR"
        destructive={false}
      />

      {/* Photo selection Modal */}
      <Modal
        visible={photoModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPhotoModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center p-4">
          <Animated.View
            entering={ZoomIn.duration(300)}
            className="bg-white rounded-xl w-full max-w-sm shadow-xl overflow-hidden"
          >
            <View className="px-4 py-3 border-b border-gray-100 flex-row items-center justify-between">
              <TouchableOpacity onPress={() => setPhotoModalVisible(false)}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
              <Text className="text-lg font-bold text-gray-800">Alterar foto</Text>
              <View style={{ width: 24 }} />
            </View>

            <View className="p-4">
              <Text className="text-gray-500 mb-4">Escolha uma cor para seu avatar ou faça o upload de uma foto</Text>

              {/* Color selection */}
              <Text className="text-sm text-gray-500 mb-2">Selecione uma cor</Text>
              <View className="flex-row flex-wrap justify-between mb-4">
                {profileColors.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    className="w-12 h-12 rounded-full mb-2 items-center justify-center"
                    style={{ backgroundColor: color }}
                    onPress={() => handleSelectColor(color)}
                  >
                    {color === userData.profileColor && (
                      <Icon name="check" size={20} color="#FFF" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {/* Upload photo button */}
              <TouchableOpacity
                className="bg-gray-100 py-3 rounded-xl mb-2 flex-row items-center justify-center"
                onPress={handleUploadPhoto}
              >
                <Icon name="camera" size={20} color="#41B54A" />
                <Text className="ml-2 text-gray-800 font-medium">Escolher da galeria</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-gray-100 py-3 rounded-xl flex-row items-center justify-center"
                onPress={handleUploadPhoto}
              >
                <Icon name="camera-plus" size={20} color="#41B54A" />
                <Text className="ml-2 text-gray-800 font-medium">Tirar foto</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
} 