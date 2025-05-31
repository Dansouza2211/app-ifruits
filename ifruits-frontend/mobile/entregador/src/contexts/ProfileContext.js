import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Criando o contexto
const ProfileContext = createContext();

// Hook personalizado para usar o contexto
export const useProfile = () => useContext(ProfileContext);

// Provedor do contexto
export const ProfileProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [documents, setDocuments] = useState({});
  const [bankInfo, setBankInfo] = useState(null);
  const [appLoading, setAppLoading] = useState(true);

  // Carregar dados salvos quando o app inicia
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const userData = await AsyncStorage.getItem('@ifruits_user');
        if (userData) {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        }
        
        const vehicleData = await AsyncStorage.getItem('@ifruits_vehicle');
        if (vehicleData) {
          setVehicle(JSON.parse(vehicleData));
        }
        
        const documentsData = await AsyncStorage.getItem('@ifruits_documents');
        if (documentsData) {
          setDocuments(JSON.parse(documentsData));
        }
        
        const bankInfoData = await AsyncStorage.getItem('@ifruits_bankInfo');
        if (bankInfoData) {
          setBankInfo(JSON.parse(bankInfoData));
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setAppLoading(false);
      }
    };
    
    loadSavedData();
  }, []);

  // Função de login
  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      // Simulação de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser = {
        id: '1',
        name: 'Entregador Teste',
        email,
        phone: '11999999999',
        avatar: null,
        status: 'active',
        rating: 4.8,
        deliveries: 150,
      };
      
      // Salvar no AsyncStorage
      await AsyncStorage.setItem('@ifruits_user', JSON.stringify(mockUser));
      
      // Atualizar estado
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const logout = async () => {
    setIsLoading(true);
    
    try {
      // Remover dados do AsyncStorage
      await AsyncStorage.removeItem('@ifruits_user');
      
      // Resetar estados
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para atualizar o veículo
  const updateVehicle = async (vehicleData) => {
    try {
      await AsyncStorage.setItem('@ifruits_vehicle', JSON.stringify(vehicleData));
      setVehicle(vehicleData);
    } catch (error) {
      console.error('Erro ao atualizar veículo:', error);
    }
  };

  // Função para atualizar documentos
  const updateDocuments = async (documentType, documentData) => {
    try {
      const updatedDocuments = {
        ...documents,
        [documentType]: documentData
      };
      
      await AsyncStorage.setItem('@ifruits_documents', JSON.stringify(updatedDocuments));
      setDocuments(updatedDocuments);
    } catch (error) {
      console.error('Erro ao atualizar documentos:', error);
    }
  };

  // Função para atualizar informações bancárias
  const updateBankInfo = async (bankInfoData) => {
    try {
      await AsyncStorage.setItem('@ifruits_bankInfo', JSON.stringify(bankInfoData));
      setBankInfo(bankInfoData);
    } catch (error) {
      console.error('Erro ao atualizar informações bancárias:', error);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        user,
        vehicle,
        documents,
        bankInfo,
        appLoading,
        login,
        logout,
        updateVehicle,
        updateDocuments,
        updateBankInfo
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext; 