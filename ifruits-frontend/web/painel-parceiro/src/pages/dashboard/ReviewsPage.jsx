import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Dados mockados de avaliações
const mockReviews = [
  {
    id: '1',
    user: {
      name: 'Carlos Mendes',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
    },
    rating: 5,
    comment: 'Produtos frescos e entrega super rápida! Recomendo demais esta loja.',
    date: '2023-05-28T14:30:00',
    reply: null,
    order: {
      id: '#12345',
      items: ['Maçã Fuji 1kg', 'Banana Prata 1kg', 'Morango 500g']
    }
  },
  {
    id: '2',
    user: {
      name: 'Amanda Souza',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
    },
    rating: 4,
    comment: 'Gostei bastante dos produtos, só acho que poderiam melhorar a embalagem das frutas mais sensíveis.',
    date: '2023-05-26T09:15:00',
    reply: 'Olá Amanda! Agradecemos seu feedback. Estamos implementando novas embalagens para frutas como morango e amora. Esperamos que goste na próxima compra!',
    order: {
      id: '#12322',
      items: ['Morango 500g', 'Amora 300g', 'Mirtilo 200g']
    }
  },
  {
    id: '3',
    user: {
      name: 'Roberto Alves',
      avatar: 'https://randomuser.me/api/portraits/men/43.jpg'
    },
    rating: 2,
    comment: 'As frutas não estavam tão frescas quanto esperava. Um pouco decepcionado.',
    date: '2023-05-25T16:45:00',
    reply: null,
    order: {
      id: '#12301',
      items: ['Abacaxi 1un', 'Manga 2un', 'Pêssego 500g']
    }
  },
  {
    id: '4',
    user: {
      name: 'Juliana Lima',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    rating: 5,
    comment: 'Atendimento excelente! O entregador foi super simpático e os produtos estavam impecáveis.',
    date: '2023-05-24T11:20:00',
    reply: 'Ficamos muito felizes com seu feedback, Juliana! Volte sempre!',
    order: {
      id: '#12289',
      items: ['Melancia 1un', 'Uva sem semente 500g', 'Pêra 4un']
    }
  },
  {
    id: '5',
    user: {
      name: 'Fernando Costa',
      avatar: 'https://randomuser.me/api/portraits/men/72.jpg'
    },
    rating: 3,
    comment: 'Produtos bons, mas a entrega demorou mais do que o previsto.',
    date: '2023-05-23T13:10:00',
    reply: null,
    order: {
      id: '#12270',
      items: ['Maçã Verde 1kg', 'Kiwi 6un', 'Laranja 2kg']
    }
  }
];

const ReviewsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [sortOption, setSortOption] = useState('recent');
  
  // Inicializar estado com dados mockados
  const [reviews] = useState(mockReviews);
  
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  
  const handleReplySubmit = (reviewId) => {
    if (!replyText.trim()) return;
    
    // Em uma aplicação real, isso enviaria a resposta para uma API
    // Aqui apenas simulamos atualizando o estado local
    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          reply: replyText
        };
      }
      return review;
    });
    
    // Atualizar estado com as avaliações atualizadas
    // O useState não possui um setter porque estamos usando dados mockados
    // Em uma aplicação real, isso seria gerenciado por um context ou estado global
    
    // Simulação visual da atualização
    const reviewElement = document.querySelector(`[data-review-id="${reviewId}"]`);
    if (reviewElement) {
      const replyContainer = document.createElement('div');
      replyContainer.className = 'bg-gray-50 rounded-lg p-4 mb-3 ml-2 border-l-4 border-primary';
      replyContainer.innerHTML = `
        <div class="flex items-center mb-2">
          <span class="font-medium text-gray-900 text-sm">Resposta da Loja</span>
        </div>
        <p class="text-gray-700 text-sm">${replyText}</p>
      `;
      
      const replyFormElement = reviewElement.querySelector('.reply-form');
      if (replyFormElement) {
        replyFormElement.style.display = 'none';
        reviewElement.insertBefore(replyContainer, replyFormElement);
      }
    }
    
    setReplyText('');
    setReplyingTo(null);
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  // Filtragem e ordenação das avaliações
  const filteredReviews = reviews.filter(review => {
    if (activeTab === 'all') return true;
    if (activeTab === 'positive' && review.rating >= 4) return true;
    if (activeTab === 'negative' && review.rating <= 2) return true;
    if (activeTab === 'unanswered' && !review.reply) return true;
    return false;
  });
  
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortOption === 'recent') {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortOption === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    }
    if (sortOption === 'highest') {
      return b.rating - a.rating;
    }
    if (sortOption === 'lowest') {
      return a.rating - b.rating;
    }
    return 0;
  });
  
  // Cálculo das estatísticas
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / totalReviews) * 100
  }));
  
  // Renderiza as estrelas com base na avaliação
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Avaliações</h1>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Ordenar por:</span>
          <select
            className="border border-gray-300 rounded-md text-gray-700 py-1 px-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="recent">Mais recentes</option>
            <option value="oldest">Mais antigas</option>
            <option value="highest">Maior avaliação</option>
            <option value="lowest">Menor avaliação</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Estatísticas de Avaliação */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 h-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Resumo de Avaliações</h2>
            
            <div className="flex items-center mb-6">
              <div className="text-3xl font-bold text-gray-800 mr-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex">{renderStars(Math.round(averageRating))}</div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Baseado em {totalReviews} avaliações
            </p>
            
            <div className="space-y-3">
              {ratingCounts.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center">
                  <div className="w-10 text-sm text-gray-600">{rating} ★</div>
                  <div className="flex-1 mx-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-8 text-sm text-gray-600">{count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Lista de Avaliações */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                <button
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'all'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('all')}
                >
                  Todas ({reviews.length})
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'positive'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('positive')}
                >
                  Positivas ({reviews.filter(r => r.rating >= 4).length})
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'negative'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('negative')}
                >
                  Negativas ({reviews.filter(r => r.rating <= 2).length})
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'unanswered'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('unanswered')}
                >
                  Não respondidas ({reviews.filter(r => !r.reply).length})
                </button>
              </div>
            </div>
            
            {/* Lista de Reviews */}
            <div className="divide-y divide-gray-200">
              {sortedReviews.length > 0 ? (
                sortedReviews.map((review) => (
                  <div key={review.id} className="p-6" data-review-id={review.id}>
                    <div className="flex items-start mb-4">
                      <img
                        src={review.user.avatar}
                        alt={review.user.name}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h3 className="font-medium text-gray-900 mr-2">{review.user.name}</h3>
                          <span className="text-sm text-gray-500">· {formatDate(review.date)}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="flex mr-2">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-600">
                            Pedido {review.order.id}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{review.comment}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {review.order.items.map((item, index) => (
                            <span
                              key={index}
                              className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-700"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        
                        {/* Resposta da loja */}
                        {review.reply && (
                          <div className="bg-gray-50 rounded-lg p-4 mb-3 ml-2 border-l-4 border-primary">
                            <div className="flex items-center mb-2">
                              <span className="font-medium text-gray-900 text-sm">Resposta da Loja</span>
                            </div>
                            <p className="text-gray-700 text-sm">{review.reply}</p>
                          </div>
                        )}
                        
                        {/* Form de resposta */}
                        {!review.reply && (
                          <div className="reply-form">
                            {replyingTo === review.id ? (
                              <div className="mt-3">
                                <textarea
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                  rows="3"
                                  placeholder="Digite sua resposta..."
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                ></textarea>
                                <div className="flex justify-end mt-2 space-x-2">
                                  <button
                                    onClick={() => {
                                      setReplyingTo(null);
                                      setReplyText('');
                                    }}
                                    className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                                  >
                                    Cancelar
                                  </button>
                                  <button
                                    onClick={() => handleReplySubmit(review.id)}
                                    className="px-4 py-2 text-sm text-white bg-primary rounded-lg hover:bg-primary/90"
                                  >
                                    Responder
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => setReplyingTo(review.id)}
                                className="text-primary hover:text-primary/80 text-sm font-medium"
                              >
                                Responder avaliação
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-300 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhuma avaliação encontrada</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    Não encontramos avaliações correspondentes aos critérios selecionados.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewsPage; 