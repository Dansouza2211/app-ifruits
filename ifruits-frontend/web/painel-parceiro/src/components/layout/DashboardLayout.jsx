import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../Logo';

// Ícones do Menu
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  ClipboardDocumentListIcon, 
  BanknotesIcon,
  UserIcon, 
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  RssIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const DashboardLayout = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isStoreOpen, setIsStoreOpen] = useState(true); // Exemplo: estado da loja aberta/fechada

  // Detecta se é dispositivo móvel e fecha sidebar por padrão
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Chama no carregamento inicial
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleStoreStatus = () => {
    setIsStoreOpen(!isStoreOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Itens do menu
  const menuItems = [
    { path: '/dashboard', icon: <HomeIcon className="w-5 h-5" />, label: 'Início' },
    { path: '/dashboard/produtos', icon: <ShoppingBagIcon className="w-5 h-5" />, label: 'Produtos' },
    { path: '/dashboard/categorias', icon: <TagIcon className="w-5 h-5" />, label: 'Categorias' },
    { path: '/dashboard/pedidos', icon: <ClipboardDocumentListIcon className="w-5 h-5" />, label: 'Pedidos' },
    { path: '/dashboard/mensagens', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />, label: 'Mensagens' },
    { path: '/dashboard/avaliacoes', icon: <StarIcon className="w-5 h-5" />, label: 'Avaliações' },
    { path: '/dashboard/feed', icon: <RssIcon className="w-5 h-5" />, label: 'Feed' },
    { path: '/dashboard/financeiro', icon: <BanknotesIcon className="w-5 h-5" />, label: 'Financeiro' },
    { path: '/dashboard/perfil', icon: <UserIcon className="w-5 h-5" />, label: 'Perfil' },
    { path: '/dashboard/configuracoes', icon: <Cog6ToothIcon className="w-5 h-5" />, label: 'Configurações' },
  ];

  // Verifica se o link está ativo
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Animação para o sidebar
  const sidebarVariants = {
    open: { 
      width: '240px',
      transition: { duration: 0.3 }
    },
    closed: { 
      width: '80px',
      transition: { duration: 0.3 }
    }
  };

  // Animação para o conteúdo principal
  const contentVariants = {
    withSidebar: { 
      marginLeft: isSidebarOpen ? '240px' : '80px',
      transition: { duration: 0.3 }
    },
    fullWidth: { 
      marginLeft: '0px',
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Mobile */}
      <header className="bg-white shadow-sm border-b border-gray-200 md:hidden">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="mr-4 text-gray-600 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
            <Link to="/dashboard" className="flex items-center">
              <Logo size="small" variant="color" showText={true} />
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-gray-600 focus:outline-none">
              <BellIcon className="w-6 h-6" />
            </button>
            <button 
              onClick={toggleProfileDropdown}
              className="flex items-center text-gray-600 focus:outline-none"
            >
              <UserCircleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border-t border-gray-200 overflow-hidden"
            >
              <nav className="px-4 py-2">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center p-3 rounded-md ${
                          isActive(item.path)
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
                      <span>Sair</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Profile Dropdown Mobile */}
        <AnimatePresence>
          {isProfileDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-4 top-16 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-10"
            >
              <div className="p-4 border-b border-gray-200">
                <p className="font-medium text-gray-800">{currentUser?.name}</p>
                <p className="text-sm text-gray-500">{currentUser?.email}</p>
              </div>
              <div className="p-2">
                <Link
                  to="/dashboard/perfil"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  Meu Perfil
                </Link>
                <Link
                  to="/dashboard/configuracoes"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  Configurações
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Sair
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={isSidebarOpen ? 'open' : 'closed'}
        className={`fixed top-0 left-0 z-20 h-full bg-white shadow-md border-r border-gray-200 hidden md:block`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className={`h-16 flex items-center px-4 border-b border-gray-200 ${!isSidebarOpen && 'justify-center'}`}>
            {isSidebarOpen ? (
              <Link to="/dashboard" className="flex items-center">
                <Logo size="medium" variant="color" showText={false} />
              </Link>
            ) : (
              <Link to="/dashboard" className="flex items-center justify-center">
                <Logo size="small" variant="color" showText={false} />
              </Link>
            )}
          </div>
          
          {/* Status da Loja */}
          <div className={`px-4 py-3 bg-gray-50 border-b border-gray-200 ${!isSidebarOpen && 'text-center'}`}>
            {isSidebarOpen ? (
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Loja {isStoreOpen ? 'aberta' : 'fechada'}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={isStoreOpen}
                      onChange={toggleStoreStatus}
                    />
                    <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <span className="text-xs text-gray-500">
                  Gestor de Pedidos {isStoreOpen ? 'ativo' : 'inativo'}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <label className="relative inline-flex items-center cursor-pointer mb-1">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isStoreOpen}
                    onChange={toggleStoreStatus}
                  />
                  <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <span className={`block w-2 h-2 rounded-full ${isStoreOpen ? 'bg-primary' : 'bg-gray-400'}`}></span>
              </div>
            )}
          </div>

          {/* Menu Navigation */}
          <nav className="flex-grow py-4 px-2 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-md ${
                      isActive(item.path)
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    } ${!isSidebarOpen && 'justify-center'}`}
                  >
                    <span className={isSidebarOpen ? 'mr-3' : ''}>{item.icon}</span>
                    {isSidebarOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile at Bottom */}
          <div className="border-t border-gray-200 p-4">
            {isSidebarOpen ? (
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    src={currentUser?.avatar || "/profile-photo.jpg"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/profile-photo.jpg";
                    }}
                  />
                </div>
                <div className="ml-3 min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {currentUser?.name || "Usuário"}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-primary hover:text-primary/80"
                  >
                    Sair
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <button onClick={handleLogout} className="text-gray-600 hover:text-primary">
                  <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        variants={contentVariants}
        animate={window.innerWidth >= 768 ? 'withSidebar' : 'fullWidth'}
        className="flex-grow min-h-screen"
      >
        {/* Header Desktop */}
        <header className="bg-white shadow-sm h-16 border-b border-gray-200 hidden md:block">
          <div className="px-6 h-full flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="mr-4 text-gray-600 focus:outline-none"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                {menuItems.find(item => isActive(item.path))?.label || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 focus:outline-none relative">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
              </button>
              <div className="relative">
                <button 
                  onClick={toggleProfileDropdown}
                  className="flex items-center text-gray-700 focus:outline-none"
                >
                  <img
                    src={currentUser?.avatar || "/profile-photo.jpg"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-2"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/profile-photo.jpg";
                    }}
                  />
                  <span className="font-medium mr-1">{currentUser?.name || "Usuário"}</span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                </button>
                
                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-10"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <p className="font-medium text-gray-800">{currentUser?.name}</p>
                        <p className="text-sm text-gray-500">{currentUser?.email}</p>
                      </div>
                      <div className="p-2">
                        <Link
                          to="/dashboard/perfil"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Meu Perfil
                        </Link>
                        <Link
                          to="/dashboard/configuracoes"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Configurações
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                          Sair
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
};

export default DashboardLayout; 