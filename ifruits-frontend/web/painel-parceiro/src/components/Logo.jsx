import React from 'react';

// Importando as imagens do logo
// Note: Em uma aplicação real, importaríamos diretamente os arquivos, mas para nosso exemplo, usaremos caminhos relativos
const logoVerde = '/logo_sem_fundo.png'; // Logo sem fundo
const logoBranca = '/logo_branca.png';

const Logo = ({ size = 'medium', variant = 'color', showText = true }) => {
  // Tamanhos predefinidos do logo
  const sizes = {
    small: { logo: 'w-12 h-12', text: 'text-lg' },
    medium: { logo: 'w-20 h-20', text: 'text-xl' },
    large: { logo: 'w-32 h-32', text: 'text-2xl' },
    extraLarge: { logo: 'w-48 h-48', text: 'text-3xl' },
    superLarge: { logo: 'w-64 h-64', text: 'text-4xl' }
  };

  // Variantes de cor
  const variants = {
    color: { logo: logoVerde, text: 'text-gray-800', highlight: 'text-primary' },
    white: { logo: logoBranca, text: 'text-white', highlight: 'text-white' }
  };

  const selectedSize = sizes[size] || sizes.medium;
  const selectedVariant = variants[variant] || variants.color;

  return (
    <div className="flex items-center gap-3">
      <div className={`${selectedSize.logo} relative flex items-center justify-center bg-transparent`}>
        <img 
          src={selectedVariant.logo} 
          alt="iFruits Logo" 
          className="w-full h-full object-contain p-2"
        />
      </div>
      
      {showText && (
        <span className={`font-bold ${selectedSize.text} ${selectedVariant.text}`}>
          <span className={selectedVariant.highlight}>i</span>Fruits
        </span>
      )}
    </div>
  );
};

export default Logo; 