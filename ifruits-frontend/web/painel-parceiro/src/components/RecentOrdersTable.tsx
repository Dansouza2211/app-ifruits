import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente para exibir uma tabela de pedidos recentes
 */
const RecentOrdersTable = ({ orders }) => {
  // Dados mockados para demonstração
  const mockOrders = [
    {
      id: '#12345',
      customer: 'Carlos Mendes',
      date: '28/05/2023',
      status: 'Entregue',
      total: 'R$ 78,90',
      items: ['Maçã Fuji 1kg', 'Banana Prata 1kg', 'Morango 500g']
    },
    {
      id: '#12344',
      customer: 'Amanda Souza',
      date: '28/05/2023',
      status: 'Em entrega',
      total: 'R$ 45,70',
      items: ['Morango 500g', 'Amora 300g', 'Mirtilo 200g']
    },
    {
      id: '#12343',
      customer: 'Roberto Alves',
      date: '27/05/2023',
      status: 'Pendente',
      total: 'R$ 63,50',
      items: ['Abacaxi 1un', 'Manga 2un', 'Pêssego 500g']
    },
    {
      id: '#12342',
      customer: 'Juliana Lima',
      date: '27/05/2023',
      status: 'Entregue',
      total: 'R$ 52,20',
      items: ['Melancia 1un', 'Uva sem semente 500g', 'Pêra 4un']
    },
    {
      id: '#12341',
      customer: 'Fernando Costa',
      date: '26/05/2023',
      status: 'Cancelado',
      total: 'R$ 34,80',
      items: ['Maçã Verde 1kg', 'Kiwi 6un', 'Laranja 2kg']
    }
  ];

  // Usar dados mockados se nenhum for fornecido
  const displayOrders = orders?.length > 0 ? orders : mockOrders;

  // Função para obter a classe CSS com base no status do pedido
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'entregue':
        return 'bg-green-100 text-green-800';
      case 'em entrega':
        return 'bg-blue-100 text-blue-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pedido
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Itens
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayOrders.length > 0 ? (
            displayOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {order.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {order.total}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="flex flex-wrap gap-1">
                    {order.items.map((item, index) => (
                      <span 
                        key={index} 
                        className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs font-medium text-gray-700"
                        title={item}
                      >
                        {item.length > 15 ? `${item.substring(0, 15)}...` : item}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <Link to={`/dashboard/pedidos/${order.id}`} className="text-primary hover:text-primary/80 font-medium">
                    Ver detalhes
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                Nenhum pedido recente encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersTable; 