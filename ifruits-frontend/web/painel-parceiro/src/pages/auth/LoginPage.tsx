import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../utils/supabase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Por favor, digite seu email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password) {
      newErrors.password = 'Por favor, digite sua senha';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            alert('Email ou senha incorretos.');
          } else if (error.message.includes('User not found')) {
            alert('Usuário não encontrado.');
          } else {
            alert(`Erro ao fazer login: ${error.message}`);
          }
          return;
        }

        const token = data.session.access_token;
        localStorage.setItem('userToken', token);
        navigate('/dashboard');
      } catch (error) {
        console.error('Erro no login:', error);
        alert('Erro ao fazer login. Tente novamente.');
      }
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
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="extraLarge" variant="color" showText={false} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Portal do Parceiro</h1>
          <p className="text-gray-600">Acesse e gerencie a sua loja de forma rápida</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.auth && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{errors.auth}</span>
            </div>
          )}

          <Input
            label="Email"
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
          />

          <div className="flex justify-end">
            <Link to="/esqueci-senha" className="text-sm text-primary hover:underline">
              Eita, esqueci a senha
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={loading}
          >
            Entrar
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Ainda não tem uma loja? {' '}
            <Link to="/cadastrar" className="text-primary font-medium hover:underline">
              Cadastrar minha loja
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage; 