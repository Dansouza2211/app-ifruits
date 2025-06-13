import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '../utils/supabase';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  storeId: string;
  storeName: string;
  avatar: string;
}

interface RegisterFormData {
  email: string;
  password: string;
  verificationCode: string;
  storeId: string;
  storeName: string;
  storeCategory: string;
  cnpj: string;
  phone: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerCpf: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  register: (formData: RegisterFormData) => Promise<{ success: boolean; user?: User; error?: string }>;
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

  const login = async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error || !data?.user) {
        return { success: false, error: error?.message || 'Login inválido' };
      }

      const user = data.user;
      const userData: User = {
        id: user.id,
        name: user.user_metadata?.name || 'Parceiro',
        email: user.email!,
        role: 'partner',
        storeId: 'store-001',
        storeName: 'Minha Loja',
        avatar: '/profile-photo.jpg'
      };

      localStorage.setItem('ifruits-partner-user', JSON.stringify(userData));
      setCurrentUser(userData);

      return { success: true, user: userData };
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao fazer login';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData: RegisterFormData): Promise<{ success: boolean; user?: User; error?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const { error: codeError } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: formData.verificationCode,
        type: 'email'
      });
      if (codeError) return { success: false, error: codeError.message };

      const { data: ownerData, error: ownerError } = await supabase.from('responsavel_loja').insert([{
        nome: formData.ownerName,
        email: formData.ownerEmail,
        cpf: formData.ownerCpf,
        telefone: formData.ownerPhone
      }]).select().single();
      if (ownerError) return { success: false, error: ownerError.message };

      const { error: lojaError } = await supabase.from('loja').insert([{
        id: formData.storeId,
        id_Responsavel: ownerData.id,
        nome: formData.storeName,
        cnpj: formData.cnpj,
        categoria: formData.storeCategory,
        telefone: formData.phone
      }]);
      if (lojaError) return { success: false, error: lojaError.message };

      const { error: addressError } = await supabase.from('endereco_loja').insert([{
        id_Loja: formData.storeId,
        cep: formData.zipCode,
        rua: formData.street,
        bairro: formData.neighborhood,
        cidade: formData.city,
        estado: formData.state,
        complemento: formData.complement,
        numero: formData.number
      }]);
      if (addressError) return { success: false, error: addressError.message };

      const userData: User = {
        id: ownerData.id,
        name: formData.storeName,
        email: formData.email,
        role: 'partner',
        storeId: formData.storeId,
        storeName: formData.storeName,
        avatar: '/profile-photo.jpg'
      };

      localStorage.setItem('ifruits-partner-user', JSON.stringify(userData));
      setCurrentUser(userData);

      return { success: true, user: userData };
    } catch (err: any) {
      return { success: false, error: err.message || 'Erro ao registrar' };
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('ifruits-partner-user');
    setCurrentUser(null);
  };

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
