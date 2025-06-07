import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../../components/Logo';
import Button from '../../components/Button';

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };

  // Variantes de animação para o Framer Motion
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            key="step1"
            initial="hidden"
            animate="visible"
            variants={variants}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="bg-tertiary rounded-full p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Bem-vindo ao iFruits!</h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Estamos felizes em ter você como parceiro. Vamos passar por algumas etapas rápidas para você começar a vender seus produtos.
            </p>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div 
            key="step2"
            initial="hidden"
            animate="visible"
            variants={variants}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="bg-tertiary rounded-full p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Cadastre seus produtos</h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              O próximo passo é cadastrar seus produtos no sistema. Quanto mais detalhes você fornecer, melhor será a experiência dos seus clientes.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <h3 className="font-semibold text-gray-700 mb-2">Dica importante:</h3>
              <p className="text-gray-600 text-sm">
                Fotos de qualidade e descrições claras aumentam as vendas em até 30%! Não esqueça de incluir informações sobre origem, qualidade e outras características especiais dos seus produtos.
              </p>
            </div>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div 
            key="step3"
            initial="hidden"
            animate="visible"
            variants={variants}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="bg-tertiary rounded-full p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tudo pronto!</h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Sua loja está quase pronta para começar a receber pedidos. No seu painel de controle, você poderá gerenciar produtos, acompanhar pedidos e muito mais.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="text-primary mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-700">Produtos</h3>
                <p className="text-gray-500 text-sm">Gerencie seu catálogo</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="text-primary mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-700">Pedidos</h3>
                <p className="text-gray-500 text-sm">Acompanhe suas vendas</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="text-primary mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-700">Financeiro</h3>
                <p className="text-gray-500 text-sm">Controle suas finanças</p>
              </div>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-12">
          <Logo size="extraLarge" variant="color" showText={false} />
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            {renderStep()}
            
            <div className="mt-8 flex justify-between items-center">
              <div className="flex space-x-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full ${index + 1 <= step ? 'bg-primary' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              
              <Button 
                onClick={nextStep} 
                variant="primary"
                size="lg"
              >
                {step < totalSteps ? 'Próximo' : 'Ir para o Dashboard'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage; 