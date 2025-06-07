import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';

const ProfilePage = () => {
  const { currentUser, updateUserData } = useAuth();
  const fileInputRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState('store');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  // Dados do formulário
  const [storeData, setStoreData] = useState({
    name: currentUser?.storeName || '',
    description: 'Loja de hortifruti com produtos frescos e orgânicos.',
    phone: '(11) 99999-9999',
    email: currentUser?.email || '',
    cnpj: '12.345.678/0001-90',
    category: 'hortifruti',
    openingHours: {
      monday: { open: '08:00', close: '18:00', isOpen: true },
      tuesday: { open: '08:00', close: '18:00', isOpen: true },
      wednesday: { open: '08:00', close: '18:00', isOpen: true },
      thursday: { open: '08:00', close: '18:00', isOpen: true },
      friday: { open: '08:00', close: '18:00', isOpen: true },
      saturday: { open: '08:00', close: '14:00', isOpen: true },
      sunday: { open: '08:00', close: '12:00', isOpen: false },
    }
  });
  
  const [addressData, setAddressData] = useState({
    zipCode: '01234-567',
    street: 'Rua Exemplo',
    number: '123',
    complement: 'Sala 45',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
  });
  
  const [bankData, setBankData] = useState({
    bankName: '',
    accountType: '',
    agency: '',
    account: '',
    holderName: '',
    holderDocument: '',
  });
  
  // Função para lidar com o clique no botão de edição da imagem
  const handleImageEditClick = () => {
    fileInputRef.current.click();
  };
  
  // Função para lidar com a seleção de arquivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Verificar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione uma imagem válida.');
      return;
    }
    
    // Criar URL para pré-visualização
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    
    // Converter imagem para base64 para armazenar no localStorage
    const reader = new FileReader();
    reader.onloadend = () => {
      // Atualizar avatar no contexto e localStorage
      updateUserData({ avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };
  
  // Função para atualizar campos do formulário
  const updateStoreField = (field, value) => {
    setStoreData({ ...storeData, [field]: value });
  };
  
  const updateAddressField = (field, value) => {
    setAddressData({ ...addressData, [field]: value });
  };
  
  const updateBankField = (field, value) => {
    setBankData({ ...bankData, [field]: value });
  };
  
  // Função para atualizar horários de funcionamento
  const updateOpeningHour = (day, field, value) => {
    setStoreData({
      ...storeData,
      openingHours: {
        ...storeData.openingHours,
        [day]: {
          ...storeData.openingHours[day],
          [field]: value
        }
      }
    });
  };
  
  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulação de envio de formulário
    setTimeout(() => {
      updateUserData({
        storeName: storeData.name,
        email: storeData.email
      });
      
      setSuccess(true);
      setLoading(false);
      
      // Limpar o feedback após alguns segundos
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  // Dias da semana
  const weekDays = [
    { id: 'monday', label: 'Segunda-feira' },
    { id: 'tuesday', label: 'Terça-feira' },
    { id: 'wednesday', label: 'Quarta-feira' },
    { id: 'thursday', label: 'Quinta-feira' },
    { id: 'friday', label: 'Sexta-feira' },
    { id: 'saturday', label: 'Sábado' },
    { id: 'sunday', label: 'Domingo' },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Perfil</h1>
      </div>
      
      <div className="card overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap -mb-px">
            <button
              onClick={() => setActiveTab('store')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'store'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dados da Loja
            </button>
            <button
              onClick={() => setActiveTab('address')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'address'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Endereço
            </button>
            <button
              onClick={() => setActiveTab('bank')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'bank'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dados Bancários
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4 text-green-800">
              Dados atualizados com sucesso!
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {activeTab === 'store' && (
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <img
                      src={previewImage || currentUser?.avatar || "/profile-photo.jpg"}
                      alt="Logo da loja"
                      className="w-32 h-32 rounded-full object-cover border border-gray-200"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/profile-photo.jpg";
                      }}
                    />
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-md"
                      onClick={handleImageEditClick}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    {/* Input de arquivo oculto */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Nome da Loja"
                    value={storeData.name}
                    onChange={(e) => updateStoreField('name', e.target.value)}
                    required
                  />
                  
                  <div className="form-group">
                    <label className="form-label">
                      Categoria
                    </label>
                    <select
                      className="input"
                      value={storeData.category}
                      onChange={(e) => updateStoreField('category', e.target.value)}
                    >
                      <option value="hortifruti">Hortifruti</option>
                      <option value="mercearia">Mercearia</option>
                      <option value="acougue">Açougue</option>
                      <option value="padaria">Padaria</option>
                      <option value="bebidas">Bebidas</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Descrição da Loja</label>
                  <textarea
                    className="input h-24 resize-none"
                    value={storeData.description}
                    onChange={(e) => updateStoreField('description', e.target.value)}
                    placeholder="Descreva sua loja..."
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Email"
                    type="email"
                    value={storeData.email}
                    onChange={(e) => updateStoreField('email', e.target.value)}
                    required
                  />
                  
                  <Input
                    label="Telefone"
                    value={storeData.phone}
                    onChange={(e) => updateStoreField('phone', e.target.value)}
                    required
                  />
                  
                  <Input
                    label="CNPJ"
                    value={storeData.cnpj}
                    onChange={(e) => updateStoreField('cnpj', e.target.value)}
                    required
                  />
                </div>
                
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Horário de Funcionamento</h3>
                  
                  <div className="space-y-4">
                    {weekDays.map((day) => (
                      <div key={day.id} className="flex items-center gap-4 flex-wrap">
                        <div className="w-32">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-primary focus:ring-primary"
                              checked={storeData.openingHours[day.id].isOpen}
                              onChange={(e) => updateOpeningHour(day.id, 'isOpen', e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-700">{day.label}</span>
                          </label>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="time"
                            className="input"
                            value={storeData.openingHours[day.id].open}
                            onChange={(e) => updateOpeningHour(day.id, 'open', e.target.value)}
                            disabled={!storeData.openingHours[day.id].isOpen}
                          />
                          <span className="text-gray-500">até</span>
                          <input
                            type="time"
                            className="input"
                            value={storeData.openingHours[day.id].close}
                            onChange={(e) => updateOpeningHour(day.id, 'close', e.target.value)}
                            disabled={!storeData.openingHours[day.id].isOpen}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'address' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Input
                      label="CEP"
                      value={addressData.zipCode}
                      onChange={(e) => updateAddressField('zipCode', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <Input
                      label="Rua/Avenida"
                      value={addressData.street}
                      onChange={(e) => updateAddressField('street', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      label="Número"
                      value={addressData.number}
                      onChange={(e) => updateAddressField('number', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      label="Complemento"
                      value={addressData.complement}
                      onChange={(e) => updateAddressField('complement', e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      label="Bairro"
                      value={addressData.neighborhood}
                      onChange={(e) => updateAddressField('neighborhood', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <Input
                      label="Cidade"
                      value={addressData.city}
                      onChange={(e) => updateAddressField('city', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <div className="form-group">
                      <label className="form-label">Estado</label>
                      <select
                        className="input"
                        value={addressData.state}
                        onChange={(e) => updateAddressField('state', e.target.value)}
                        required
                      >
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'bank' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="form-group">
                      <label className="form-label">Banco</label>
                      <select
                        className="input"
                        value={bankData.bankName}
                        onChange={(e) => updateBankField('bankName', e.target.value)}
                        required
                      >
                        <option value="">Selecione um banco</option>
                        <option value="001">Banco do Brasil</option>
                        <option value="033">Santander</option>
                        <option value="104">Caixa Econômica Federal</option>
                        <option value="237">Bradesco</option>
                        <option value="341">Itaú</option>
                        <option value="260">Nubank</option>
                        <option value="077">Inter</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <div className="form-group">
                      <label className="form-label">Tipo de Conta</label>
                      <select
                        className="input"
                        value={bankData.accountType}
                        onChange={(e) => updateBankField('accountType', e.target.value)}
                        required
                      >
                        <option value="">Selecione o tipo</option>
                        <option value="checking">Conta Corrente</option>
                        <option value="savings">Poupança</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Agência"
                    value={bankData.agency}
                    onChange={(e) => updateBankField('agency', e.target.value)}
                    placeholder="Sem dígito"
                    required
                  />
                  
                  <Input
                    label="Conta"
                    value={bankData.account}
                    onChange={(e) => updateBankField('account', e.target.value)}
                    placeholder="Com dígito"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Nome do Titular"
                    value={bankData.holderName}
                    onChange={(e) => updateBankField('holderName', e.target.value)}
                    required
                  />
                  
                  <Input
                    label="CPF/CNPJ do Titular"
                    value={bankData.holderDocument}
                    onChange={(e) => updateBankField('holderDocument', e.target.value)}
                    required
                  />
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-800">
                  <p className="font-medium mb-2">Importante:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>A conta bancária deve estar em nome da empresa ou do responsável legal.</li>
                    <li>O CPF/CNPJ informado deve corresponder ao titular da conta bancária.</li>
                    <li>Verifique os dados bancários com atenção para evitar problemas nos repasses.</li>
                  </ul>
                </div>
              </div>
            )}
            
            <div className="mt-8 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
              >
                Salvar Alterações
              </Button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage; 