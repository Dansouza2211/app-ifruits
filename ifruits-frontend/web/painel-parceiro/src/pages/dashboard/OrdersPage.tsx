import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Dados mockados para pedidos
const mockOrders = [
  {
    id: '10587',
    customer: {
      name: 'Carlos Oliveira',
      phone: '(11) 99875-3214',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    date: '05/03/2024',
    time: '14:32',
    items: [
      { quantity: 2, name: 'Banana Prata (kg)', price: 5.99 },
      { quantity: 1, name: 'Maçã Fuji (kg)', price: 7.49 }
    ],
    total: 19.47,
    status: 'pending',
    address: 'Rua das Acácias, 123 - Jardim Primavera',
    payment: 'Cartão de Crédito'
  },
  {
    id: '10586',
    customer: {
      name: 'Ana Silva',
      phone: '(11) 98765-4321',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    date: '05/03/2024',
    time: '13:45',
    items: [
      { quantity: 1, name: 'Abacate (un)', price: 6.50 },
      { quantity: 2, name: 'Morango (caixa)', price: 8.99 },
      { quantity: 1, name: 'Melancia (un)', price: 12.90 }
    ],
    total: 37.38,
    status: 'preparing',
    address: 'Av. Paulista, 1500 - Apto 53 - Bela Vista',
    payment: 'Pix'
  },
  {
    id: '10585',
    customer: {
      name: 'Roberto Almeida',
      phone: '(11) 97654-3210',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    date: '05/03/2024',
    time: '11:20',
    items: [
      { quantity: 3, name: 'Banana Prata (kg)', price: 5.99 },
      { quantity: 2, name: 'Maçã Fuji (kg)', price: 7.49 },
      { quantity: 1, name: 'Abacate (un)', price: 6.50 }
    ],
    total: 39.45,
    status: 'delivering',
    address: 'Rua Augusta, 1200 - Consolação',
    payment: 'Dinheiro'
  },
  {
    id: '10584',
    customer: {
      name: 'Maria Silva',
      phone: '(11) 99876-5432',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
    },
    date: '05/03/2024',
    time: '10:15',
    items: [
      { quantity: 1, name: 'Melancia (un)', price: 12.90 },
      { quantity: 2, name: 'Alface Crespa (un)', price: 3.49 }
    ],
    total: 19.88,
    status: 'completed',
    address: 'Av. Brasil, 500 - Jardim Europa',
    payment: 'Cartão de Débito'
  },
  {
    id: '10583',
    customer: {
      name: 'Pedro Souza',
      phone: '(11) 98123-4567',
      avatar: 'https://randomuser.me/api/portraits/men/60.jpg'
    },
    date: '04/03/2024',
    time: '18:45',
    items: [
      { quantity: 1, name: 'Kiwi Importado (kg)', price: 9.99 },
      { quantity: 1, name: 'Abacate (un)', price: 6.50 }
    ],
    total: 16.49,
    status: 'cancelled',
    address: 'Rua dos Pinheiros, 350 - Pinheiros',
    payment: 'Pix'
  },
  {
    id: '10582',
    customer: {
      name: 'Laura Mendes',
      phone: '(11) 99765-4321',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    date: '04/03/2024',
    time: '17:30',
    items: [
      { quantity: 1, name: 'Morango (caixa)', price: 8.99 },
      { quantity: 2, name: 'Cenoura Orgânica (kg)', price: 4.50 },
      { quantity: 1, name: 'Rúcula Fresca (maço)', price: 4.25 }
    ],
    total: 22.24,
    status: 'completed',
    address: 'Rua Oscar Freire, 720 - Jardins',
    payment: 'Cartão de Crédito'
  },
  {
    id: '10581',
    customer: {
      name: 'João Paulo',
      phone: '(11) 98888-7777',
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg'
    },
    date: '04/03/2024',
    time: '15:10',
    items: [
      { quantity: 2, name: 'Tomate Italiano (kg)', price: 5.99 },
      { quantity: 1, name: 'Alface Crespa (un)', price: 3.49 },
      { quantity: 1, name: 'Cenoura Orgânica (kg)', price: 4.50 }
    ],
    total: 19.97,
    status: 'completed',
    address: 'Av. Rebouças, 1000 - Apto 72 - Pinheiros',
    payment: 'Pix'
  }
];

const OrdersPage = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const tabs = [
    { id: 'all', label: 'Todos' },
    { id: 'pending', label: 'Aguardando Aceitação' },
    { id: 'preparing', label: 'Em Preparação' },
    { id: 'delivering', label: 'Em Entrega' },
    { id: 'completed', label: 'Concluídos' },
    { id: 'cancelled', label: 'Cancelados' },
  ];

  // Filtrar pedidos baseado na aba ativa
  const filteredOrders = orders.filter(order => {
    // Filtro por status
    if (activeTab !== 'all' && order.status !== activeTab) {
      return false;
    }
    
    // Filtro por busca
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesId = order.id.includes(searchTerm);
      const matchesCustomer = order.customer.name.toLowerCase().includes(searchLower);
      const matchesItems = order.items.some(item => 
        item.name.toLowerCase().includes(searchLower)
      );
      
      if (!matchesId && !matchesCustomer && !matchesItems) {
        return false;
      }
    }
    
    // Implementação do filtro de data pode ser feita aqui
    
    return true;
  });

  // Obter status em português
  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Aguardando';
      case 'preparing': return 'Em Preparação';
      case 'delivering': return 'Em Entrega';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  // Obter classe de estilo para o status
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'delivering': return 'bg-indigo-100 text-indigo-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Pedidos</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Atualizado: 05/03/2024 14:45</span>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Atualizar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6 overflow-x-auto px-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.id !== 'all' && (
                  <span className="ml-2 py-0.5 px-2 text-xs rounded-full bg-gray-100">
                    {orders.filter(order => order.status === tab.id).length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-grow sm:flex-grow-0">
              <input
                type="text"
                placeholder="Buscar por ID, cliente ou itens..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="">Data (7 dias)</option>
                <option value="today">Hoje</option>
                <option value="yesterday">Ontem</option>
                <option value="week">Últimos 7 dias</option>
                <option value="month">Último mês</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center whitespace-nowrap">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtrar
            </button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Itens
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">#{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                          <img 
                            src={order.customer.avatar} 
                            alt={order.customer.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/32?text=User';
                            }}
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                          <div className="text-sm text-gray-500">{order.customer.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.date}</div>
                      <div className="text-sm text-gray-500">{order.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        {order.items.map((item, i) => (
                          <div key={i} className="truncate">
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                      </div>
                      {order.items.length > 2 && (
                        <div className="text-xs text-primary mt-1 cursor-pointer hover:underline">
                          Ver todos os itens
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">R$ {order.total.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary hover:text-primary/80">
                        Detalhes
                      </button>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              {searchTerm || activeTab !== 'all'
                ? 'Não há pedidos correspondentes aos filtros aplicados.'
                : 'Não há pedidos disponíveis para serem exibidos neste momento.'}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OrdersPage; 