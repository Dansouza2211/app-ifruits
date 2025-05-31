import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

/**
 * Componente para exibir o gráfico de vendas com diferentes visualizações (semana, mês, ano)
 */
const SalesChart = ({ data, view }) => {
  const [chartData, setChartData] = useState(data);
  
  // Dados mockados para diferentes visualizações
  const mockData = {
    week: {
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      datasets: [
        {
          label: 'Vendas',
          data: [2, 5, 8, 3, 7, 9, 4],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: true,
        },
      ],
    },
    month: {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      datasets: [
        {
          label: 'Vendas',
          data: [45, 58, 42, 63],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: true,
        },
      ],
    },
    year: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [
        {
          label: 'Vendas',
          data: [120, 145, 187, 163, 178, 162, 190, 183, 176, 192, 168, 150],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: true,
        },
      ],
    },
  };
  
  // Configurações do gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
              label += context.parsed.y + ' pedidos - R$ ' + (context.parsed.y * 35).toFixed(2);
            }
            return label;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + ' pedidos';
          }
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };
  
  // Atualiza os dados do gráfico quando a visualização muda
  useEffect(() => {
    setChartData(mockData[view] || data);
  }, [view, data]);
  
  return (
    <div className="h-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesChart; 