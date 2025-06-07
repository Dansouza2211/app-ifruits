import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';

// Imagens locais
import banner1 from '../../assets/images/banner1.png';
import banner2 from '../../assets/images/banner2.png';
import banner3 from '../../assets/images/banner3.png';
import bannerAntonio from '../../assets/images/banner-antonio.png';
import bannerEmporio from '../../assets/images/banner-emporio.png';
import bannerVerdura from '../../assets/images/banner-verdura.png';
import bannerCampo from '../../assets/images/banner-campo.png';
import bannerImperio from '../../assets/images/banner-imperio.png';

// Componente para post no feed
const FeedItem = ({ post, onLike, onComment }) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <View className="bg-white rounded-xl mb-4 overflow-hidden shadow-sm">
      {/* Header do Post */}
      <View className="p-4 flex-row items-center">
        <Image 
          source={post.store.isLocal ? post.store.logo : { uri: post.store.logo }} 
          className="w-10 h-10 rounded-full"
          resizeMode="cover"
        />
        <View className="ml-3 flex-1">
          <Text className="font-bold text-gray-800">{post.store.name}</Text>
          <Text className="text-gray-500 text-xs">{post.timeAgo}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="dots-vertical" size={20} color="#999" />
        </TouchableOpacity>
      </View>
      
      {/* Conteúdo do Post */}
      <View className="px-4 pb-3">
        <Text className="text-gray-700 mb-3">{post.content}</Text>
      </View>
      
      {/* Imagem do Post (se houver) */}
      {post.image && (
        <View className="w-full h-56 bg-gray-100 justify-center align-center">
          {imageLoading && !imageError && (
            <ActivityIndicator size="large" color="#41B54A" className="absolute self-center" />
          )}
          {imageError ? (
            <View className="items-center justify-center h-full">
              <Icon name="image-off" size={40} color="#999" />
              <Text className="text-gray-500 mt-2">Imagem indisponível</Text>
            </View>
          ) : (
            <Image 
              source={post.isLocal ? post.image : { uri: post.image }}
              className="w-full h-56"
              resizeMode="cover"
              onLoadStart={() => post.isLocal ? null : setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
              }}
            />
          )}
        </View>
      )}
      
      {/* Contagem de Reações */}
      <View className="px-4 py-3 flex-row items-center justify-between border-t border-gray-100">
        <View className="flex-row items-center">
          <View className="bg-primary w-6 h-6 rounded-full items-center justify-center">
            <Icon name="thumb-up" size={14} color="#fff" />
          </View>
          <Text className="text-gray-500 text-sm ml-1">{post.likes}</Text>
        </View>
        
        <Text className="text-gray-500 text-sm">{post.comments} comentários</Text>
      </View>
      
      {/* Botões de Ação */}
      <View className="flex-row border-t border-gray-100">
        <TouchableOpacity 
          className="flex-1 py-2 flex-row items-center justify-center"
          onPress={() => onLike(post.id)}
        >
          <Icon 
            name={post.isLiked ? "thumb-up" : "thumb-up-outline"} 
            size={18} 
            color={post.isLiked ? "#41B54A" : "#777"} 
          />
          <Text className={`ml-2 ${post.isLiked ? "text-primary" : "text-gray-600"}`}>
            Curtir
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-1 py-2 flex-row items-center justify-center"
          onPress={() => onComment(post.id)}
        >
          <Icon name="comment-outline" size={18} color="#777" />
          <Text className="ml-2 text-gray-600">Comentar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-1 py-2 flex-row items-center justify-center"
        >
          <Icon name="share-outline" size={18} color="#777" />
          <Text className="ml-2 text-gray-600">Compartilhar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Componente para filtros do feed
const FeedFilters = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'stores', label: 'Lojas' },
    { id: 'offers', label: 'Ofertas' },
    { id: 'news', label: 'Novidades' }
  ];
  
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="mb-4"
    >
      <View className="flex-row px-1">
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.id}
            onPress={() => setActiveFilter(filter.id)}
            className={`mr-2 py-2 px-4 rounded-full ${activeFilter === filter.id ? 'bg-primary' : 'bg-gray-100'}`}
          >
            <Text 
              className={activeFilter === filter.id ? 'text-white font-medium' : 'text-gray-700'}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// Componente para estado vazio
const EmptyState = () => (
  <View className="items-center justify-center py-8">
    <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-4">
      <Icon name="newspaper-variant-outline" size={32} color="#CCC" />
    </View>
    <Text className="text-gray-400 font-medium text-center">
      Sem novidades no momento
    </Text>
    <Text className="text-gray-400 text-sm text-center mt-1">
      Adicione lojas aos seus favoritos para ver novidades aqui
    </Text>
  </View>
);

export default function FeedScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Dados de exemplo para posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      store: {
        name: 'Hortifruti Santo Antônio',
        logo: require('../../assets/images/hortifruti-antonio.png'),
        isLocal: true
      },
      content: 'Já conhece nosso novo mix de frutas vermelhas? Ideal para smoothies e sobremesas!',
      image: bannerAntonio,
      isLocal: true,
      timeAgo: 'há 2 horas',
      likes: 24,
      comments: 3,
      isLiked: false,
      type: 'offers'
    },
    {
      id: 2,
      store: {
        name: 'Empório Hortifruti',
        logo: require('../../assets/images/emporio-hortifruti.png'),
        isLocal: true
      },
      content: 'Novidade! Estamos com uma nova seleção de produtos orgânicos diretamente do produtor. Venha conferir!',
      image: bannerEmporio,
      isLocal: true,
      timeAgo: 'há 1 dia',
      likes: 11,
      comments: 2,
      isLiked: true,
      type: 'news'
    },
    {
      id: 3,
      store: {
        name: 'Verdura Fácil',
        logo: require('../../assets/images/verdura-facil.png'),
        isLocal: true
      },
      content: 'Chegaram nossas verduras orgânicas cultivadas em fazendas locais! Colhidas hoje de manhã para chegar fresquinhas até você.',
      image: bannerVerdura,
      isLocal: true,
      timeAgo: 'há 5 horas',
      likes: 18,
      comments: 4,
      isLiked: false,
      type: 'news'
    },
    {
      id: 4,
      store: {
        name: 'Frutas do Campo',
        logo: require('../../assets/images/frutas-campo.png'),
        isLocal: true
      },
      content: 'SUPER PROMOÇÃO! Todas as bananas com 20% de desconto hoje. Aproveitem enquanto durar o estoque!',
      image: bannerCampo,
      isLocal: true,
      timeAgo: 'há 3 horas',
      likes: 42,
      comments: 7,
      isLiked: true,
      type: 'offers'
    },
    {
      id: 5,
      store: {
        name: 'Império Hortifruti',
        logo: require('../../assets/images/imperio-hortifruti.png'),
        isLocal: true
      },
      content: 'Inauguramos nossa nova unidade no centro da cidade! Para comemorar, estamos com desconto de 15% em toda a loja até o final da semana.',
      image: bannerImperio,
      isLocal: true,
      timeAgo: 'há 2 dias',
      likes: 78,
      comments: 12,
      isLiked: false,
      type: 'stores'
    }
  ]);

  // Filtra posts com base no filtro ativo
  const filteredPosts = activeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.type === activeFilter);

  // Função para curtir um post
  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  // Função para comentar em um post
  const handleComment = (postId) => {
    console.log(`Comentando no post: ${postId}`);
    // Implementar lógica para abrir tela de comentários
  };

  // Navegação de volta
  const handleGoBack = () => {
    console.log('Voltando da tela de feed');
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header 
        title="Feed" 
        showBack={true}
        onBackPress={handleGoBack}
        showMenu={true}
      />
      
      <ScrollView className="flex-1 px-4 pt-4">
        <View className="mb-4">
          <Text className="text-xl font-bold text-gray-800 mb-1">Acompanhe seus locais favoritos</Text>
          <Text className="text-gray-500">
            Fique por dentro das novidades e promoções
          </Text>
        </View>
        
        <FeedFilters 
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <FeedItem
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))
        ) : (
          <EmptyState />
        )}
        
        {/* Espaço reduzido para o tab bar */}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
} 