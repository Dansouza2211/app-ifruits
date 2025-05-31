import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email) {
      setError('Por favor, digite seu email');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email inválido');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      // Simular envio de email de recuperação (em produção, isso seria uma chamada API)
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-8"
      >
        <div className="flex justify-center mb-6">
          <Logo size="extraLarge" variant="color" showText={false} />
        </div>
        
        {!success ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Esqueceu sua senha?</h1>
              <p className="text-gray-600">
                Digite seu email abaixo e enviaremos um link para redefinir sua senha.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email"
                type="email"
                placeholder="Digite seu email cadastrado"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                required
              />
              
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-full"
                loading={loading}
              >
                Enviar Link de Recuperação
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="bg-green-100 text-green-800 rounded-full p-3 inline-flex mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Email enviado!</h2>
            <p className="text-gray-600 mb-6">
              Enviamos um link de recuperação para <strong>{email}</strong>. 
              Por favor, verifique sua caixa de entrada.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Se não encontrar o email, verifique também sua pasta de spam.
            </p>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <Link to="/login" className="text-primary font-medium hover:underline">
            Voltar para o login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage; 