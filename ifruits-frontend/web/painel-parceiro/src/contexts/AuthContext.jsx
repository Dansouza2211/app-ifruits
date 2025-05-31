import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verificar se o usuário já está logado quando a aplicação carrega
    const storedUser = localStorage.getItem('ifruits-partner-user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Erro ao parsear dados do usuário:", e);
        localStorage.removeItem('ifruits-partner-user');
      }
    }
    setLoading(false);
  }, []);

  // Função de login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Limpar o localStorage para garantir que as novas informações sejam utilizadas
      localStorage.removeItem('ifruits-partner-user');
      
      // Aceitar qualquer credencial neste momento
      const userData = {
        id: 'partner-001',
        name: 'Hortifruti Express',
        email: email || 'demo@ifruits.com',
        role: 'partner',
        storeId: 'store-001',
        storeName: 'Hortifruti Express',
        avatar: '/profile-photo.jpg'
      };
      
      // Salvar usuário no localStorage
      localStorage.setItem('ifruits-partner-user', JSON.stringify(userData));
      setCurrentUser(userData);
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Função de cadastro
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Limpar o localStorage para garantir que as novas informações sejam utilizadas
      localStorage.removeItem('ifruits-partner-user');
      
      // Simular registro (isso seria uma chamada de API real)
      const newUser = {
        id: `partner-${Math.floor(Math.random() * 1000)}`,
        name: userData.storeName,
        email: userData.email,
        role: 'partner',
        storeId: `store-${Math.floor(Math.random() * 1000)}`,
        storeName: userData.storeName,
        avatar: '/profile-photo.jpg'
      };
      
      // Salvar usuário no localStorage
      localStorage.setItem('ifruits-partner-user', JSON.stringify(newUser));
      setCurrentUser(newUser);
      return { success: true, user: newUser };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('ifruits-partner-user');
    setCurrentUser(null);
  };

  // Função para atualizar dados do usuário
  const updateUserData = (newData) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...newData };
      localStorage.setItem('ifruits-partner-user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
    error,
    updateUserData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 