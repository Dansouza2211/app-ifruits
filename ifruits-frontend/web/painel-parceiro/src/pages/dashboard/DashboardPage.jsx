import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import ExportButton from '../../components/ExportButton';

// Registrando os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Dados mockados para o dashboard
const mockDashboardData = {
  pedidosHoje: {
    quantidade: 12,
    valor: 'R$427,80'
  },
  ticketMedioHoje: 'R$35,65',
  pedidosMes: {
    quantidade: 187,
    valor: 'R$6.542,50'
  },
  ticketMedioMes: 'R$34,99',
  avaliacaoApp: 4.7,
  vendas: {
    week: [2, 5, 8, 3, 7, 9, 4],
    month: [45, 58, 42, 63],
    year: [120, 145, 187, 163, 178, 162, 190, 183, 176, 192, 168, 150]
  },
  statusPedidos: {
    entregues: 143,
    emEntrega: 24,
    cancelados: 12
  }
};

const DashboardPage = () => {
  const [salesData, setSalesData] = useState({
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Vendas',
        data: mockDashboardData.vendas.week,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  });

  const [orderStatus, setOrderStatus] = useState({
    labels: ['Entregues', 'Em entrega', 'Cancelados'],
    datasets: [
      {
        label: 'Pedidos',
        data: [
          mockDashboardData.statusPedidos.entregues,
          mockDashboardData.statusPedidos.emEntrega,
          mockDashboardData.statusPedidos.cancelados
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const [chartView, setChartView] = useState('week');

  // Configurações dos gráficos
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Atualiza o gráfico quando a visualização muda
  useEffect(() => {
    switch (chartView) {
      case 'week':
        setSalesData({
          labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
          datasets: [
            {
              label: 'Vendas',
              data: mockDashboardData.vendas.week,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.4,
              fill: true,
            },
          ],
        });
        break;
      case 'month':
        setSalesData({
          labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
          datasets: [
            {
              label: 'Vendas',
              data: mockDashboardData.vendas.month,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.4,
              fill: true,
            },
          ],
        });
        break;
      case 'year':
        setSalesData({
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          datasets: [
            {
              label: 'Vendas',
              data: mockDashboardData.vendas.year,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.4,
              fill: true,
            },
          ],
        });
        break;
      default:
        break;
    }
  }, [chartView]);

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

  const renderSummaryCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-gray-500">Pedidos de hoje</span>
            <div className="flex items-end">
              <span className="text-2xl font-bold text-gray-800">{mockDashboardData.pedidosHoje.quantidade}</span>
              <span className="ml-2 text-sm text-gray-500">pedidos</span>
            </div>
            <span className="text-sm text-gray-500">{mockDashboardData.pedidosHoje.valor}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-gray-500">Ticket médio de hoje</span>
            <div className="flex items-end">
              <span className="text-2xl font-bold text-gray-800">{mockDashboardData.ticketMedioHoje}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-gray-500">Pedidos de Março</span>
            <div className="flex items-end">
              <span className="text-2xl font-bold text-gray-800">{mockDashboardData.pedidosMes.quantidade}</span>
              <span className="ml-2 text-sm text-gray-500">pedidos</span>
            </div>
            <span className="text-sm text-gray-500">{mockDashboardData.pedidosMes.valor}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-gray-500">Ticket médio de março</span>
            <div className="flex items-end">
              <span className="text-2xl font-bold text-gray-800">{mockDashboardData.ticketMedioMes}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-gray-500">Avaliação no App</span>
            <div className="flex items-end">
              <span className="text-2xl font-bold text-gray-800">{mockDashboardData.avaliacaoApp}</span>
              <div className="ml-2 flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className={`w-4 h-4 ${star <= Math.floor(mockDashboardData.avaliacaoApp) ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOverviewCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Mensagens</h3>
            <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">
              2 não lidas
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Maria Silva" className="w-10 h-10 rounded-full mr-3" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-medium text-gray-900 truncate">Maria Silva</h4>
                  <span className="text-xs text-gray-500">10:42</span>
                </div>
                <p className="text-sm text-gray-500 truncate">Olá, gostaria de saber se vocês têm manga orgânica disponível?</p>
              </div>
            </div>
            <div className="flex items-center">
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Ana Costa" className="w-10 h-10 rounded-full mr-3" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-medium text-gray-900 truncate">Ana Costa</h4>
                  <span className="text-xs text-gray-500">Ontem</span>
                </div>
                <p className="text-sm text-gray-500 truncate">Vocês têm previsão de chegada das bananas?</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link to="/dashboard/mensagens" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
              Ver todas as mensagens
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Avaliações</h3>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-700">4.2</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-1">
                <div className="flex mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      className={`w-4 h-4 ${star <= 5 ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500">Hoje</span>
              </div>
              <p className="text-sm text-gray-700">Produtos frescos e entrega super rápida! Recomendo demais esta loja.</p>
              <p className="text-xs text-gray-500 mt-1">Carlos M.</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-1">
                <div className="flex mr-2">
                  {[1, 2].map((star) => (
                    <svg 
                      key={star} 
                      className="w-4 h-4 text-yellow-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  {[1, 2, 3].map((star) => (
                    <svg 
                      key={star} 
                      className="w-4 h-4 text-gray-300" 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500">Ontem</span>
              </div>
              <p className="text-sm text-gray-700">As frutas não estavam tão frescas quanto esperava.</p>
              <p className="text-xs text-gray-500 mt-1">Roberto A.</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link to="/dashboard/avaliacoes" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
              Ver todas as avaliações
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Feed</h3>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              +12% engajamento
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-700">Sua publicação sobre morangos orgânicos recebeu 24 curtidas</p>
                <p className="text-xs text-gray-500 mt-1">Hoje às 15:30</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-700">Sua promoção de bananas termina hoje!</p>
                <p className="text-xs text-gray-500 mt-1">Hoje às 10:15</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link to="/dashboard/feed" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
              Criar nova publicação
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // Função para renderizar os produtos mais vendidos
  const renderTopProducts = () => {
    // Dados mockados de produtos mais vendidos
    const topProducts = [
      { name: 'Banana Prata', quantity: 45, value: 'R$157,50', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=100&auto=format&fit=crop' },
      { name: 'Maçã Fuji', quantity: 38, value: 'R$152,00', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=100&auto=format&fit=crop' },
      { name: 'Morango', quantity: 27, value: 'R$135,00', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=100&auto=format&fit=crop' },
      { name: 'Abacate', quantity: 24, value: 'R$96,00', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=100&auto=format&fit=crop' },
      { name: 'Melancia', quantity: 18, value: 'R$90,00', image: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?q=80&w=100&auto=format&fit=crop' }
    ];

    return (
      <div className="space-y-4">
        {topProducts.length > 0 ? (
          topProducts.map((product, index) => (
            <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/40?text=Fruta';
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{product.quantity} vendidos</span>
                  <span>{product.value}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500">Sem dados disponíveis</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-3">
          <ExportButton />
        </div>
      </div>
      
      {renderSummaryCards()}
      
      {renderOverviewCards()}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Vendas</h2>
                <select
                  className="text-sm border-gray-300 rounded-md text-gray-700 py-1 px-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={chartView}
                  onChange={(e) => setChartView(e.target.value)}
                >
                  <option value="week">Esta Semana</option>
                  <option value="month">Este Mês</option>
                  <option value="year">Este Ano</option>
                </select>
              </div>
            </div>
            <div className="p-6 h-72">
              <Line data={salesData} options={lineOptions} />
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Produtos Mais Vendidos</h2>
            </div>
            <div className="p-4">
              {renderTopProducts()}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Status dos Pedidos</h2>
            <Link to="/dashboard/pedidos" className="text-primary hover:text-primary/80 text-sm font-medium">
              Ver Todos
            </Link>
          </div>
        </div>
        <div className="p-6 h-72">
          <Bar data={orderStatus} options={barOptions} />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage; 