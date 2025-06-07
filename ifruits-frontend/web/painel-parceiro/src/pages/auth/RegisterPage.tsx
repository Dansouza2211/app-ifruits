import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dados da loja
    storeName: '',
    storeCategory: '',
    cnpj: '',
    phone: '',
    
    // Dados do responsável
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerCpf: '',
    
    // Endereço
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    
    // Dados de acesso
    email: '',
    password: '',
    confirmPassword: '',
    
    // Termos
    acceptTerms: false,
    
    // Autenticação por e-mail
    verificationCode: '',
    emailSent: false
  });
  
  const [errors, setErrors] = useState({});
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  
  // Código de verificação padrão
  const defaultVerificationCode = '123456';
  
  const updateFormField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Limpar erro quando o usuário começa a digitar
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };
  
  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      // Validar dados da loja
      if (!formData.storeName.trim()) {
        newErrors.storeName = 'Nome da loja é obrigatório';
      }
      
      if (!formData.storeCategory) {
        newErrors.storeCategory = 'Categoria da loja é obrigatória';
      }
      
      if (!formData.cnpj.trim()) {
        newErrors.cnpj = 'CNPJ é obrigatório';
      } else if (formData.cnpj.replace(/\D/g, '').length !== 14) {
        newErrors.cnpj = 'CNPJ inválido';
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Telefone da loja é obrigatório';
      } else if (formData.phone.replace(/\D/g, '').length < 10) {
        newErrors.phone = 'Telefone inválido';
      }
    }
    
    else if (currentStep === 2) {
      // Validar dados do responsável
      if (!formData.ownerName.trim()) {
        newErrors.ownerName = 'Nome do responsável é obrigatório';
      }
      
      if (!formData.ownerEmail.trim()) {
        newErrors.ownerEmail = 'Email do responsável é obrigatório';
      } else if (!/\S+@\S+\.\S+/.test(formData.ownerEmail)) {
        newErrors.ownerEmail = 'Email inválido';
      }
      
      if (!formData.ownerPhone.trim()) {
        newErrors.ownerPhone = 'Telefone do responsável é obrigatório';
      } else if (formData.ownerPhone.replace(/\D/g, '').length < 10) {
        newErrors.ownerPhone = 'Telefone inválido';
      }
      
      if (!formData.ownerCpf.trim()) {
        newErrors.ownerCpf = 'CPF do responsável é obrigatório';
      } else if (formData.ownerCpf.replace(/\D/g, '').length !== 11) {
        newErrors.ownerCpf = 'CPF inválido';
      }
    }
    
    else if (currentStep === 3) {
      // Validar endereço
      if (!formData.zipCode.trim()) {
        newErrors.zipCode = 'CEP é obrigatório';
      } else if (formData.zipCode.replace(/\D/g, '').length !== 8) {
        newErrors.zipCode = 'CEP inválido';
      }
      
      if (!formData.street.trim()) {
        newErrors.street = 'Rua é obrigatória';
      }
      
      if (!formData.number.trim()) {
        newErrors.number = 'Número é obrigatório';
      }
      
      if (!formData.neighborhood.trim()) {
        newErrors.neighborhood = 'Bairro é obrigatório';
      }
      
      if (!formData.city.trim()) {
        newErrors.city = 'Cidade é obrigatória';
      }
      
      if (!formData.state.trim()) {
        newErrors.state = 'Estado é obrigatório';
      }
    }
    
    else if (currentStep === 4) {
      // Validar dados de acesso
      if (!formData.email.trim()) {
        newErrors.email = 'Email é obrigatório';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email inválido';
      }
      
      if (!formData.password) {
        newErrors.password = 'Senha é obrigatória';
      } else if (formData.password.length < 6) {
        newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'As senhas não coincidem';
      }
      
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'Você precisa aceitar os termos e condições';
      }
    }
    
    else if (currentStep === 5) {
      // Validar código de verificação
      if (!formData.verificationCode.trim()) {
        newErrors.verificationCode = 'Código de verificação é obrigatório';
      } else if (formData.verificationCode !== defaultVerificationCode) {
        newErrors.verificationCode = 'Código de verificação inválido';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const nextStep = () => {
    if (validateStep(step)) {
      if (step === 4) {
        // Simular envio de email com código de verificação
        setFormData({
          ...formData,
          emailSent: true
        });
      }
      setStep(step + 1);
    }
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateStep(step)) {
      const result = await register(formData);
      
      if (result.success) {
        navigate('/onboarding');
      } else {
        setErrors({ auth: result.error || 'Erro ao fazer cadastro. Tente novamente.' });
      }
    }
  };
  
  // Função para reenviar o código
  const resendCode = () => {
    // Simular reenvio de código
    alert('Um novo código foi enviado para seu e-mail');
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-gray-800">Dados da Loja</h2>
            
            <Input
              label="Nome da Loja"
              placeholder="Ex: Frutas Orgânicas do José"
              value={formData.storeName}
              onChange={(e) => updateFormField('storeName', e.target.value)}
              error={errors.storeName}
              required
            />
            
            <div className="form-group">
              <label className="form-label">
                Categoria da Loja
                <span className="text-danger ml-1">*</span>
              </label>
              <select
                className={`input ${errors.storeCategory ? 'input-error' : ''}`}
                value={formData.storeCategory}
                onChange={(e) => updateFormField('storeCategory', e.target.value)}
              >
                <option value="">Selecione uma categoria</option>
                <option value="hortifruti">Hortifruti</option>
                <option value="organicos">Orgânicos</option>
                <option value="frutas">Frutas</option>
                <option value="legumes">Legumes</option>
                <option value="verduras">Verduras</option>
                <option value="temperos">Temperos e Ervas</option>
                <option value="graos">Grãos e Cereais</option>
              </select>
              {errors.storeCategory && <p className="error-message">{errors.storeCategory}</p>}
            </div>
            
            <Input
              label="CNPJ"
              placeholder="00.000.000/0000-00"
              value={formData.cnpj}
              onChange={(e) => updateFormField('cnpj', e.target.value)}
              error={errors.cnpj}
              required
            />
            
            <Input
              label="Telefone da Loja"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={(e) => updateFormField('phone', e.target.value)}
              error={errors.phone}
              required
            />
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-gray-800">Dados do Responsável</h2>
            
            <Input
              label="Nome Completo"
              placeholder="Nome do responsável legal"
              value={formData.ownerName}
              onChange={(e) => updateFormField('ownerName', e.target.value)}
              error={errors.ownerName}
              required
            />
            
            <Input
              label="Email"
              type="email"
              placeholder="Email do responsável"
              value={formData.ownerEmail}
              onChange={(e) => updateFormField('ownerEmail', e.target.value)}
              error={errors.ownerEmail}
              required
            />
            
            <Input
              label="Telefone"
              placeholder="(00) 00000-0000"
              value={formData.ownerPhone}
              onChange={(e) => updateFormField('ownerPhone', e.target.value)}
              error={errors.ownerPhone}
              required
            />
            
            <Input
              label="CPF"
              placeholder="000.000.000-00"
              value={formData.ownerCpf}
              onChange={(e) => updateFormField('ownerCpf', e.target.value)}
              error={errors.ownerCpf}
              required
            />
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-gray-800">Endereço da Loja</h2>
            
            <Input
              label="CEP"
              placeholder="00000-000"
              value={formData.zipCode}
              onChange={(e) => updateFormField('zipCode', e.target.value)}
              error={errors.zipCode}
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Rua"
                  placeholder="Nome da rua"
                  value={formData.street}
                  onChange={(e) => updateFormField('street', e.target.value)}
                  error={errors.street}
                  required
                />
              </div>
              <div>
                <Input
                  label="Número"
                  placeholder="123"
                  value={formData.number}
                  onChange={(e) => updateFormField('number', e.target.value)}
                  error={errors.number}
                  required
                />
              </div>
            </div>
            
            <Input
              label="Complemento"
              placeholder="Apto, sala, loja (opcional)"
              value={formData.complement}
              onChange={(e) => updateFormField('complement', e.target.value)}
              error={errors.complement}
            />
            
            <Input
              label="Bairro"
              placeholder="Nome do bairro"
              value={formData.neighborhood}
              onChange={(e) => updateFormField('neighborhood', e.target.value)}
              error={errors.neighborhood}
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Cidade"
                placeholder="Nome da cidade"
                value={formData.city}
                onChange={(e) => updateFormField('city', e.target.value)}
                error={errors.city}
                required
              />
              
              <div className="form-group">
                <label className="form-label">
                  Estado
                  <span className="text-danger ml-1">*</span>
                </label>
                <select
                  className={`input ${errors.state ? 'input-error' : ''}`}
                  value={formData.state}
                  onChange={(e) => updateFormField('state', e.target.value)}
                >
                  <option value="">Selecione</option>
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
                {errors.state && <p className="error-message">{errors.state}</p>}
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-gray-800">Dados de Acesso</h2>
            
            <Input
              label="Email de acesso"
              type="email"
              placeholder="Email para login no painel"
              value={formData.email}
              onChange={(e) => updateFormField('email', e.target.value)}
              error={errors.email}
              required
            />
            
            <Input
              label="Senha"
              type="password"
              placeholder="Mínimo de 6 caracteres"
              value={formData.password}
              onChange={(e) => updateFormField('password', e.target.value)}
              error={errors.password}
              required
            />
            
            <Input
              label="Confirme sua senha"
              type="password"
              placeholder="Digite sua senha novamente"
              value={formData.confirmPassword}
              onChange={(e) => updateFormField('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              required
            />
            
            <div className="form-group">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary/50"
                    checked={formData.acceptTerms}
                    onChange={(e) => updateFormField('acceptTerms', e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTerms" className="text-gray-600">
                    Eu li e aceito os{' '}
                    <a href="#" className="text-primary hover:underline">Termos de Uso</a>{' '}
                    e a{' '}
                    <a href="#" className="text-primary hover:underline">Política de Privacidade</a>{' '}
                    do iFruits
                  </label>
                  {errors.acceptTerms && <p className="error-message">{errors.acceptTerms}</p>}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-gray-800">Verificação de Email</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6 text-blue-800">
              <p className="font-medium mb-2">Confirme seu email</p>
              <p>Enviamos um código de verificação para <span className="font-medium">{formData.email}</span>.</p>
              <p>Por favor, insira o código de 6 dígitos abaixo para verificar sua conta.</p>
            </div>
            
            <Input
              label="Código de Verificação"
              placeholder="Digite o código de 6 dígitos"
              value={formData.verificationCode}
              onChange={(e) => updateFormField('verificationCode', e.target.value)}
              error={errors.verificationCode}
              required
            />
            
            <div className="text-center">
              <button
                type="button"
                onClick={resendCode}
                className="text-primary hover:underline text-sm mt-2"
              >
                Não recebeu o código? Reenviar
              </button>
              <p className="text-gray-500 text-xs mt-2">
                Dica: Para fins de demonstração, use o código {defaultVerificationCode}
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const renderButtons = () => {
    if (step === 1) {
      return (
        <div className="flex justify-end">
          <Button onClick={nextStep} variant="primary" className="w-full md:w-auto">
            Próximo
          </Button>
        </div>
      );
    } else if (step < 5) {
      return (
        <div className="flex justify-between">
          <Button onClick={prevStep} variant="secondary">
            Voltar
          </Button>
          <Button onClick={nextStep} variant="primary">
            Próximo
          </Button>
        </div>
      );
    } else {
      return (
        <div className="flex justify-between">
          <Button onClick={prevStep} variant="secondary">
            Voltar
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            loading={loading}
          >
            Finalizar Cadastro
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <Logo size="extraLarge" variant="color" showText={false} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6 md:p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Cadastre sua loja</h1>
            <p className="text-gray-600">Torne-se um parceiro iFruits e expanda seu negócio</p>
          </div>
          
          {/* Indicador de Progresso */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {['Dados da Loja', 'Responsável', 'Endereço', 'Acesso', 'Verificação'].map((label, index) => (
                <div key={index} className={`text-xs md:text-sm ${step >= index + 1 ? 'text-primary' : 'text-gray-400'}`}>
                  {label}
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${(step / 5) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-width duration-500"
                ></div>
              </div>
            </div>
          </div>
          
          {errors.auth && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <span className="block sm:inline">{errors.auth}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            <div className="mt-8">
              {renderButtons()}
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta? {' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage; 