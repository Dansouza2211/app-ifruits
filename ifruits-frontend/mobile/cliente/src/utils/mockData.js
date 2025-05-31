// Dados mockados para a loja HortiFruti
export const hortifruti = {
  id: 1,
  name: 'HortiFruti',
  logo: require('../assets/images/logo-hortifruti.png'),
  deliveryFee: 0, // Frete grátis por padrão
  minOrder: 10,
  categories: [
    { id: 1, name: 'Frutas' },
    { id: 2, name: 'Verduras' },
    { id: 3, name: 'Legumes' },
    { id: 4, name: 'Orgânicos' }
  ],
  products: [
    {
      id: 1,
      name: 'Maçã Gala',
      price: 2.99,
      image: require('../assets/images/produtos/maca.png'),
      weight: '1 unidade (aprox. 150g)',
      category: 1,
      description: 'Maçã Gala fresca e suculenta.',
      rating: 4.8,
      reviews: 120,
      isOrganic: false
    },
    {
      id: 2,
      name: 'Banana Prata',
      price: 5.99,
      image: require('../assets/images/produtos/banana.png'),
      weight: '1kg (aprox. 6-7 unidades)',
      category: 1,
      description: 'Banana prata de alta qualidade.',
      rating: 4.7,
      reviews: 95,
      isOrganic: false
    },
    {
      id: 3,
      name: 'Alface Crespa',
      price: 3.50,
      image: require('../assets/images/produtos/alface.png'),
      weight: '1 unidade (aprox. 350g)',
      category: 2,
      description: 'Alface crespa fresca e crocante.',
      rating: 4.5,
      reviews: 82,
      isOrganic: true
    },
    {
      id: 4,
      name: 'Tomate Italiano',
      price: 6.99,
      image: require('../assets/images/produtos/tomate.png'),
      weight: '500g (aprox. 3-4 unidades)',
      category: 3,
      description: 'Tomate italiano, ideal para molhos.',
      rating: 4.6,
      reviews: 105,
      isOrganic: false
    }
  ]
};

// Dados mockados para outras lojas (Burger King, por exemplo)
export const burgerKing = {
  id: 2,
  name: 'Burger King - Águas Claras',
  logo: require('../assets/images/burger-logo.png'),
  deliveryFee: 6.99,
  minOrder: 15,
  categories: [
    { id: 1, name: 'Lanches' },
    { id: 2, name: 'Acompanhamentos' },
    { id: 3, name: 'Bebidas' },
    { id: 4, name: 'Sobremesas' }
  ],
  products: [
    // Produtos do Burger King
  ]
};

// Lista de lojas disponíveis
export const stores = [
  hortifruti,
  burgerKing,
  // Outras lojas
];

// Exportar lojas individualmente para facilitar o acesso
export default {
  hortifruti,
  burgerKing,
  stores
}; 