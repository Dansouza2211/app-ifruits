import React, { useState } from 'react';

/**
 * Componente de botão de exportação com dropdown para selecionar o formato
 */
const ExportButton = ({ onExport }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleExport = (format) => {
    // Em uma aplicação real, isso chamaria uma função para gerar e baixar o arquivo
    if (onExport) {
      onExport(format);
    } else {
      // Simulação básica de exportação
      console.log(`Exportando dados em formato ${format}`);
      
      // Mostrar uma notificação ou feedback ao usuário
      alert(`Relatório exportado em formato ${format}`);
    }
    
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Exportar
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <ul className="py-1">
            <li>
              <button
                onClick={() => handleExport('excel')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Exportar como Excel
              </button>
            </li>
            <li>
              <button
                onClick={() => handleExport('csv')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Exportar como CSV
              </button>
            </li>
            <li>
              <button
                onClick={() => handleExport('pdf')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Exportar como PDF
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExportButton; 