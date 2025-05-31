import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Registrando os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const FinancePage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Dados mockados
  const [saldoDisponivel] = useState(1325.75);
  const [previsto] = useState(875.50);
  const [faturamentoMes] = useState(2548.30);
  const [pedidosMes] = useState(18);
  const [pedidosConcluidos] = useState(23);
  const [ticketMedio] = useState(110.80);

  // Dados mockados para o gráfico
  const [earningsData] = useState({
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Faturamento 2025',
        data: [120, 210, 180, 260, 240, 280, 320, 340, 360, 0, 0, 0], // Dados parciais de 2025
        borderColor: '#41B54A',
        backgroundColor: 'rgba(65, 181, 74, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Faturamento 2024',
        data: [1800, 2200, 1900, 2400, 2100, 2800, 3200, 3100, 2900, 3400, 3600, 3900],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        fill: true,
        tension: 0.4,
      },
    ],
  });

  // Configurações dos gráficos
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Transações mockadas
  const [transactions] = useState([
    {
      date: '10/10/2025',
      orderId: '12458',
      description: 'Venda - Cesta de Frutas Premium',
      status: 'completed',
      type: 'credit',
      amount: 125.90
    },
    {
      date: '09/10/2025',
      orderId: '12457',
      description: 'Venda - Mix de Frutas Tropicais',
      status: 'completed',
      type: 'credit',
      amount: 89.50
    },
    {
      date: '08/10/2025',
      orderId: '12456',
      description: 'Venda - Frutas Orgânicas Selecionadas',
      status: 'completed',
      type: 'credit',
      amount: 105.75
    },
    {
      date: '07/10/2025',
      orderId: '12455',
      description: 'Taxa de Serviço iFruits',
      status: 'completed',
      type: 'debit',
      amount: 38.40
    },
    {
      date: '05/10/2025',
      orderId: '12454',
      description: 'Venda - Kit Salada Especial',
      status: 'completed',
      type: 'credit',
      amount: 72.30
    },
    {
      date: '03/10/2025',
      orderId: '12453',
      description: 'Venda - Combo Frutas Vermelhas',
      status: 'pending',
      type: 'credit',
      amount: 118.25
    },
    {
      date: '01/10/2025',
      orderId: '12452',
      description: 'Estorno - Pedido Cancelado',
      status: 'cancelled',
      type: 'debit',
      amount: 95.80
    }
  ]);

  // Histórico de saques mockado
  const [withdrawals] = useState([
    {
      id: 'W12345',
      date: '28/09/2025',
      amount: 1500.00,
      status: 'completed',
      account: 'Banco Itaú - Ag: 1234 CC: 56789-0'
    },
    {
      id: 'W12344',
      date: '15/09/2025',
      amount: 2200.00,
      status: 'completed',
      account: 'Banco Itaú - Ag: 1234 CC: 56789-0'
    },
    {
      id: 'W12343',
      date: '29/08/2025',
      amount: 1800.00,
      status: 'completed',
      account: 'Banco Itaú - Ag: 1234 CC: 56789-0'
    }
  ]);

  // Animação para os componentes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Financeiro</h1>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center">
            Solicitar Saque
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-sm text-gray-500 font-medium mb-2">Saldo Disponível</h2>
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saldoDisponivel)}
          </div>
          <p className="text-sm text-gray-500">Disponível para saque</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-sm text-gray-500 font-medium mb-2">Previsto</h2>
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(previsto)}
          </div>
          <p className="text-sm text-gray-500">A receber nos próximos dias</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-sm text-gray-500 font-medium mb-2">Faturamento (Outubro)</h2>
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(faturamentoMes)}
          </div>
          <p className="text-sm text-gray-500">{pedidosMes} pedidos</p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'overview'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'transactions'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Transações
          </button>
          <button
            onClick={() => setActiveTab('withdrawals')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'withdrawals'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Saques
          </button>
        </div>

        {activeTab === 'overview' && (
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">Faturamento Mensal</h2>
            <div className="h-80">
              <Line data={earningsData} options={lineOptions} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Pedidos Concluídos</h3>
                <div className="text-2xl font-bold text-gray-800">{pedidosConcluidos}</div>
                <p className="text-xs text-gray-500 mt-1">Nos últimos 30 dias</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Ticket Médio</h3>
                <div className="text-2xl font-bold text-gray-800">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ticketMedio)}
                </div>
                <p className="text-xs text-gray-500 mt-1">Valor médio por pedido</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Taxa iFruits</h3>
                <div className="text-2xl font-bold text-gray-800">12%</div>
                <p className="text-xs text-gray-500 mt-1">Sobre o valor total</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div>
            <div className="flex flex-wrap justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-2 md:mb-0">Histórico de Transações</h2>
              <div className="flex flex-wrap gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 max-w-xs">
                  <option value="30days">Últimos 30 dias</option>
                  <option value="90days">Últimos 90 dias</option>
                  <option value="year">Este ano</option>
                  <option value="all">Todo o período</option>
                </select>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Exportar
                </button>
              </div>
            </div>

            {transactions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID do Pedido
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrição
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{transaction.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">#{transaction.orderId}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{transaction.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              transaction.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : transaction.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {transaction.status === 'completed'
                              ? 'Concluído'
                              : transaction.status === 'pending'
                              ? 'Pendente'
                              : 'Cancelado'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className={`text-sm font-medium ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'}
                            R$ {transaction.amount.toFixed(2)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma transação encontrada</h3>
                <p className="text-gray-500 max-w-md">
                  Quando você começar a receber pedidos, suas transações aparecerão aqui.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'withdrawals' && (
          <div>
            <div className="flex flex-wrap justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-2 md:mb-0">Histórico de Saques</h2>
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center">
                Solicitar Saque
              </button>
            </div>

            {withdrawals.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Conta
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {withdrawals.map((withdrawal, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{withdrawal.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{withdrawal.date}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{withdrawal.account}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Concluído
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-medium text-gray-900">
                            R$ {withdrawal.amount.toFixed(2)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum saque realizado</h3>
                <p className="text-gray-500 max-w-md mb-6">
                  Quando você solicitar saques, eles aparecerão aqui.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md text-left">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Como funcionam os saques?</h4>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Os saques são processados em até 2 dias úteis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>O valor mínimo para saque é de R$ 50,00</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Os valores são transferidos para a conta bancária cadastrada no seu perfil</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default FinancePage; 