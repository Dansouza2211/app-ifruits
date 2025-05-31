import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Dados mockados de posts do feed
const mockPosts = [
  {
    id: '1',
    content: 'Acabaram de chegar morangos orgânicos fresquinhos! Aproveitem que o estoque é limitado! 🍓',
    images: ['https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
    date: '2023-05-28T15:30:00',
    likes: 24,
    comments: 5,
    isPromotion: false
  },
  {
    id: '2',
    content: '🔥 PROMOÇÃO DE HOJE! 🔥\nCompre 2kg de banana e leve 500g de maçã gratuitamente! Oferta válida apenas hoje!',
    images: [],
    date: '2023-05-27T10:15:00',
    likes: 47,
    comments: 12,
    isPromotion: true
  },
  {
    id: '3',
    content: 'Vocês pediram e nós trouxemos! Agora temos uma linha completa de frutas exóticas para vocês experimentarem algo diferente. Venham conferir!',
    images: [
      'https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1537884557178-342a575d7d16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    date: '2023-05-25T14:20:00',
    likes: 31,
    comments: 8,
    isPromotion: false
  }
];

const FeedPage = () => {
  const [posts, setPosts] = useState(mockPosts);
  
  const [newPost, setNewPost] = useState({
    content: '',
    images: [],
    isPromotion: false
  });
  
  const [imageUrls, setImageUrls] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [publishLoading, setPublishLoading] = useState(false);
  
  const fileInputRef = useRef(null);
  
  const handleContentChange = (e) => {
    setNewPost({
      ...newPost,
      content: e.target.value
    });
  };
  
  const handlePromotionToggle = () => {
    setNewPost({
      ...newPost,
      isPromotion: !newPost.isPromotion
    });
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + imageUrls.length > 4) {
      setUploadError('Você só pode enviar até 4 imagens por publicação');
      return;
    }
    
    setUploadError('');
    
    // Em uma aplicação real, aqui seria feito o upload das imagens para um servidor
    // Aqui estamos apenas simulando e gerando URLs locais para exibição
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrls(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };
  
  const removeImage = (index) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newPost.content.trim() && imageUrls.length === 0) {
      setUploadError('Adicione um texto ou imagem para publicar');
      return;
    }
    
    setPublishLoading(true);
    
    // Simular atraso de publicação (em uma aplicação real, seria uma chamada de API)
    setTimeout(() => {
      const newPostItem = {
        id: Date.now().toString(),
        content: newPost.content,
        images: imageUrls,
        date: new Date().toISOString(),
        likes: 0,
        comments: 0,
        isPromotion: newPost.isPromotion
      };
      
      setPosts([newPostItem, ...posts]);
      
      // Limpar o formulário
      setNewPost({
        content: '',
        images: [],
        isPromotion: false
      });
      setImageUrls([]);
      setPublishLoading(false);
    }, 1500);
  };
  
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Feed</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Formulário de Publicação */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Nova Publicação</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  rows="4"
                  placeholder="O que você quer compartilhar com seus clientes hoje?"
                  value={newPost.content}
                  onChange={handleContentChange}
                ></textarea>
              </div>
              
              {uploadError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                  {uploadError}
                </div>
              )}
              
              {imageUrls.length > 0 && (
                <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="flex items-center text-gray-700 hover:text-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Adicionar Foto
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
                
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={newPost.isPromotion}
                    onChange={handlePromotionToggle}
                  />
                  <div className={`relative w-10 h-5 rounded-full transition-colors ${newPost.isPromotion ? 'bg-primary' : 'bg-gray-300'}`}>
                    <div className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${newPost.isPromotion ? 'transform translate-x-5' : ''}`} />
                  </div>
                  <span className="ml-2 text-gray-700">Marcar como Promoção</span>
                </label>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center disabled:opacity-70"
                  disabled={publishLoading}
                >
                  {publishLoading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {publishLoading ? 'Publicando...' : 'Publicar'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Dicas e Estatísticas */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Dicas para Publicações</h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Publique fotos de alta qualidade dos seus produtos
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mantenha seus clientes informados sobre promoções
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Compartilhe receitas com seus produtos
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Anuncie a chegada de novos produtos
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Estatísticas</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Alcance total (últimos 7 dias)</p>
                <p className="text-2xl font-bold text-gray-800">1.243</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Engajamento médio</p>
                <p className="text-2xl font-bold text-gray-800">6.8%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Publicações este mês</p>
                <p className="text-2xl font-bold text-gray-800">{posts.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Listagem de Publicações */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Suas Publicações</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <img
                        src="https://via.placeholder.com/40"
                        alt="Store Logo"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Sua Loja</h3>
                      <p className="text-xs text-gray-500">{formatDate(post.date)}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {post.isPromotion && (
                      <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Promoção
                      </span>
                    )}
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {post.content && (
                  <p className="text-gray-700 mb-4 whitespace-pre-line">{post.content}</p>
                )}
                
                {post.images && post.images.length > 0 && (
                  <div className={`mb-4 grid ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
                    {post.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Post image ${index + 1}`}
                        className="w-full h-auto rounded-lg"
                      />
                    ))}
                  </div>
                )}
                
                <div className="flex items-center text-gray-500 text-sm">
                  <div className="flex items-center mr-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {post.likes} curtidas
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {post.comments} comentários
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhuma publicação ainda</h3>
              <p className="text-gray-500 text-center max-w-md">
                Comece a criar publicações para engajar seus clientes e aumentar suas vendas.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FeedPage; 