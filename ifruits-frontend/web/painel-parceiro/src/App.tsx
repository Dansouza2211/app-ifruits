import React, { useEffect, ReactNode } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';
import { Link } from 'react-router-dom';

// Páginas de Autenticação
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import OnboardingPage from './pages/auth/OnboardingPage';

// Layout e Páginas do Dashboard
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProductsPage from './pages/dashboard/ProductsPage';
import CategoriesPage from './pages/dashboard/CategoriesPage';
import OrdersPage from './pages/dashboard/OrdersPage';
import FinancePage from './pages/dashboard/FinancePage';
import ProfilePage from './pages/dashboard/ProfilePage';
import SettingsPage from './pages/dashboard/SettingsPage';
import MessagesPage from './pages/dashboard/MessagesPage';
import ReviewsPage from './pages/dashboard/ReviewsPage';
import FeedPage from './pages/dashboard/FeedPage';

interface RouteProps {
  children: ReactNode;
}

// Componente para rotas protegidas
const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Componente para redirecionar usuários logados
const RedirectIfAuthenticated: React.FC<RouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

function App(): JSX.Element {
  const location = useLocation();
  
  // Scroll para o topo quando mudar de rota
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Rotas de Autenticação */}
        <Route path="/login" element={    
            <LoginPage />
        } />
        
        <Route path="/cadastrar" element={
            <RegisterPage />
        } />
        
        <Route path="/esqueci-senha" element={  
            <ForgotPasswordPage />
        } />
        
        <Route path="/onboarding" element={  
            <OnboardingPage />
        } />
        
        {/* Rotas do Dashboard */}
        <Route path="/dashboard" element={      
            <DashboardLayout />
        }>
          <Route index element={<DashboardPage />} />
          <Route path="produtos" element={<ProductsPage />} />
          <Route path="categorias" element={<CategoriesPage />} />
          <Route path="pedidos" element={<OrdersPage />} />
          <Route path="mensagens" element={<MessagesPage />} />
          <Route path="avaliacoes" element={<ReviewsPage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="financeiro" element={<FinancePage />} />
          <Route path="perfil" element={<ProfilePage />} />
          <Route path="configuracoes" element={<SettingsPage />} />
        </Route>
        
        {/* Redirecionamento para Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rota 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-gray-600 mb-6">Página não encontrada</p>
            <Link to="/dashboard" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
              Voltar ao Dashboard
            </Link>
          </div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default App; 