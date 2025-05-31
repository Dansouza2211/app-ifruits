import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SettingsPage = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Estados para os diferentes formulários
  const [accountData, setAccountData] = useState({
    email: currentUser?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newOrderAlert: true,
    orderStatusChanges: true,
    promotionalEmails: false,
    weeklyReports: true,
  });
  
  const [integrationSettings, setIntegrationSettings] = useState({
    googleSheets: false,
    googleCalendar: false,
    whatsapp: true,
    telegram: false,
    ifruitsAPI: true,
  });
  
  // Atualização de campos
  const updateAccountField = (field, value) => {
    setAccountData({ ...accountData, [field]: value });
  };
  
  const updateNotificationSetting = (field, value) => {
    setNotificationSettings({ ...notificationSettings, [field]: value });
  };
  
  const updateIntegrationSetting = (field, value) => {
    setIntegrationSettings({ ...integrationSettings, [field]: value });
  };
  
  // Função para enviar formulários
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulação de envio de formulário
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      
      // Limpar o feedback após alguns segundos
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
      // Limpar campos de senha
      if (activeTab === 'account') {
        setAccountData({
          ...accountData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    }, 1000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
      </div>
      
      <div className="card overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap -mb-px">
            <button
              onClick={() => setActiveTab('account')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'account'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Conta
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Notificações
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'integrations'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Integrações
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'privacy'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Privacidade
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4 text-green-800">
              Configurações atualizadas com sucesso!
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Informações da Conta</h2>
                
                <Input
                  label="Email"
                  type="email"
                  value={accountData.email}
                  onChange={(e) => updateAccountField('email', e.target.value)}
                  required
                />
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Alterar Senha</h3>
                  
                  <Input
                    label="Senha Atual"
                    type="password"
                    value={accountData.currentPassword}
                    onChange={(e) => updateAccountField('currentPassword', e.target.value)}
                    placeholder="Digite sua senha atual"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <Input
                      label="Nova Senha"
                      type="password"
                      value={accountData.newPassword}
                      onChange={(e) => updateAccountField('newPassword', e.target.value)}
                      placeholder="Digite sua nova senha"
                    />
                    
                    <Input
                      label="Confirmar Nova Senha"
                      type="password"
                      value={accountData.confirmPassword}
                      onChange={(e) => updateAccountField('confirmPassword', e.target.value)}
                      placeholder="Confirme sua nova senha"
                    />
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-2">
                    A senha deve ter pelo menos 8 caracteres e incluir letras maiúsculas, minúsculas e números.
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Sessões Ativas</h3>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">Este dispositivo</p>
                        <p className="text-sm text-gray-500">MacBook Pro • São Paulo, SP • Última atividade: Agora</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Ativo</span>
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => {
                      if (window.confirm('Tem certeza que deseja sair de todas as sessões?')) {
                        logout();
                      }
                    }}
                  >
                    Sair de Todas as Sessões
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Preferências de Notificação</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-800">Notificações por Email</p>
                      <p className="text-sm text-gray-500">Receba notificações por email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => updateNotificationSetting('emailNotifications', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-800">Alerta de Novos Pedidos</p>
                      <p className="text-sm text-gray-500">Seja notificado quando receber um novo pedido</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings.newOrderAlert}
                        onChange={(e) => updateNotificationSetting('newOrderAlert', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-800">Mudanças de Status</p>
                      <p className="text-sm text-gray-500">Receba notificações sobre mudanças de status dos pedidos</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings.orderStatusChanges}
                        onChange={(e) => updateNotificationSetting('orderStatusChanges', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-800">Emails Promocionais</p>
                      <p className="text-sm text-gray-500">Receba ofertas e promoções do iFruits</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings.promotionalEmails}
                        onChange={(e) => updateNotificationSetting('promotionalEmails', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-800">Relatórios Semanais</p>
                      <p className="text-sm text-gray-500">Receba um resumo semanal do desempenho da sua loja</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings.weeklyReports}
                        onChange={(e) => updateNotificationSetting('weeklyReports', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Integrações</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-md mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Google Sheets</h3>
                        <p className="text-sm text-gray-500">Sincronize pedidos e estoque com Google Sheets</p>
                      </div>
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={integrationSettings.googleSheets}
                          onChange={(e) => updateIntegrationSetting('googleSheets', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-md mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Google Calendar</h3>
                        <p className="text-sm text-gray-500">Adicione pedidos ao seu calendário Google</p>
                      </div>
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={integrationSettings.googleCalendar}
                          onChange={(e) => updateIntegrationSetting('googleCalendar', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-md mr-4">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.38 1.25 4.8l-1.3 3.85c-.08.22-.03.47.13.64c.15.17.4.22.62.15l3.96-1.3c1.36.74 2.9 1.17 4.55 1.17c5.46 0 9.91-4.45 9.91-9.91c0-5.46-4.45-9.91-9.91-9.91zm6.08 14.15c-.25.35-.65.48-1.01.36c-1.01-.34-2.27-.53-3.35-.53c-1.08 0-2.34.19-3.35.53c-.36.12-.76-.01-1.01-.36c-.42-.59-.44-1.36-.04-1.97c.39-.6 1.09-.93 1.78-.93h4.24c.69 0 1.39.33 1.78.93c.4.61.38 1.38-.04 1.97z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">WhatsApp</h3>
                        <p className="text-sm text-gray-500">Receba notificações via WhatsApp</p>
                      </div>
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={integrationSettings.whatsapp}
                          onChange={(e) => updateIntegrationSetting('whatsapp', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-md mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15.2-.15.4-.15.6 0 2.2-1.7 4.8-4.8 4.8-1 0-1.8-.3-2.6-.7.15.05.25.05.4.05.8 0 1.5-.25 2.1-.7-.75 0-1.35-.5-1.6-1.2.1.05.2.1.35.1.15 0 .3 0 .45-.1C9.2 11.5 8.5 10.7 8.5 9.8c.2.1.5.2.8.2-.45-.3-.8-.8-.8-1.4 0-.3.1-.6.25-.8.85 1 2.1 1.65 3.5 1.7-.05-.1-.1-.25-.1-.4 0-1 .8-1.8 1.8-1.8.5 0 1 .2 1.3.55.4-.1.8-.25 1.15-.45-.15.4-.4.75-.8.95.35-.05.7-.15 1-.3-.25.35-.55.65-.9.9z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Telegram</h3>
                        <p className="text-sm text-gray-500">Receba notificações via Telegram</p>
                      </div>
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={integrationSettings.telegram}
                          onChange={(e) => updateIntegrationSetting('telegram', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-md mr-4">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">API iFruits</h3>
                        <p className="text-sm text-gray-500">Acesse a API iFruits para integração com sistemas externos</p>
                      </div>
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={integrationSettings.ifruitsAPI}
                          onChange={(e) => updateIntegrationSetting('ifruitsAPI', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Privacidade e Segurança</h2>
                
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-800">
                    <h3 className="font-medium mb-2">Política de Privacidade</h3>
                    <p className="text-sm">
                      Ao utilizar nossos serviços, você concorda com nossa política de privacidade.
                      Leia nossa política completa para entender como tratamos seus dados.
                    </p>
                    <a 
                      href="#" 
                      className="text-primary font-medium text-sm inline-flex items-center mt-2"
                    >
                      Ler Política de Privacidade
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Excluir Conta</h3>
                    <p className="text-gray-600 mb-4">
                      Ao excluir sua conta, todos os seus dados serão removidos permanentemente.
                      Esta ação não pode ser desfeita.
                    </p>
                    <Button 
                      type="button" 
                      variant="danger"
                      onClick={() => {
                        if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
                          // Lógica para exclusão de conta
                          alert('Solicitação de exclusão enviada. Nossa equipe entrará em contato.');
                        }
                      }}
                    >
                      Solicitar Exclusão de Conta
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab !== 'privacy' && (
              <div className="mt-8 flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                >
                  Salvar Alterações
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage; 