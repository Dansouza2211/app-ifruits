import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  storeId: string;
  storeName: string;
  avatar: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  register: (userData: { email: string; storeName: string; password: string }) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  updateUserData: (newData: Partial<User>) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
  const login = async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    setLoading(true);
    setError(null);
    
    try {
      // Limpar o localStorage para garantir que as novas informações sejam utilizadas
      localStorage.removeItem('ifruits-partner-user');
      
      // Aceitar qualquer credencial neste momento
      const userData: User = {
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
    } catch (err: any) {
      const errorMessage = err.message || 'Ocorreu um erro durante o login';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Função de cadastro
  const register = async (userData: { email: string; storeName: string; password: string }): Promise<{ success: boolean; user?: User; error?: string }> => {
    setLoading(true);
    setError(null);
    
    try {
      // Limpar o localStorage para garantir que as novas informações sejam utilizadas
      localStorage.removeItem('ifruits-partner-user');
      
      // Simular registro (isso seria uma chamada de API real)
      const newUser: User = {
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
    } catch (err: any) {
      const errorMessage = err.message || 'Ocorreu um erro durante o cadastro';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = (): void => {
    localStorage.removeItem('ifruits-partner-user');
    setCurrentUser(null);
  };

  // Função para atualizar dados do usuário
  const updateUserData = (newData: Partial<User>): void => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...newData };
      localStorage.setItem('ifruits-partner-user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
    }
  };

  const value: AuthContextType = {
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