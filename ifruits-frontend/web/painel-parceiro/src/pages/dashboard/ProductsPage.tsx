import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../utils/supabase';

const AddModal = ({
  show,
  onClose,
  onSubmit,
  formState,
  onFormChange,
  onImageUpload,
  previewImage,
  onRemoveImage,
  fileInputRef,
  categories
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Adicionar Novo Produto</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Produto
            </label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={onFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Ex: Maçã Gala"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select
              name="category"
              value={formState.category}
              onChange={onFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            >
              <option value="Frutas">Frutas</option>
              <option value="Legumes">Legumes</option>
              <option value="Verduras">Verduras</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagem do Produto
            </label>
            <div className="flex flex-col space-y-3">
              <div
                className="w-full border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                onClick={() => fileInputRef.current.click()}
              >
                {previewImage ? (
                  <div className="mb-3">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
                <p className="text-sm text-gray-500 text-center">
                  {previewImage ? "Clique para alterar a imagem" : "Clique para selecionar uma imagem"}
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG ou GIF até 5MB</p>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onImageUpload}
                ref={fileInputRef}
              />
              {previewImage && (
                <button
                  type="button"
                  onClick={onRemoveImage}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remover imagem
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço (R$)
              </label>
              <input
                type="number"
                name="price"
                value={formState.price}
                onChange={onFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estoque
              </label>
              <input
                type="number"
                name="stock"
                value={formState.stock}
                onChange={onFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                min="0"
                required
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="active"
              id="newProductActive"
              checked={formState.active}
              onChange={onFormChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="newProductActive" className="ml-2 block text-sm text-gray-700">
              Produto ativo
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              disabled={!previewImage}
            >
              Adicionar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditModal = ({
  show,
  product,
  formState,
  onClose,
  onChange,
  onSubmit,
  previewImage,
  onImageUpload,
  onRemoveImage,
  fileInputRef
}) => {
  if (!show || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Editar Produto</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Produto
            </label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select
              name="category"
              value={formState.category}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            >
              <option value="Frutas">Frutas</option>
              <option value="Legumes">Legumes</option>
              <option value="Verduras">Verduras</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagem do Produto
            </label>
            <div className="flex flex-col space-y-3">
              <div
                className="w-full border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                onClick={() => fileInputRef.current.click()}
              >
                {previewImage ? (
                  <div className="mb-3">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/100?text=Produto';
                      }}
                    />
                  </div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
                <p className="text-sm text-gray-500 text-center">
                  {previewImage ? "Clique para alterar a imagem" : "Clique para selecionar uma imagem"}
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG ou GIF até 5MB</p>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onImageUpload}
                ref={fileInputRef}
              />
              {previewImage && (
                <button
                  type="button"
                  onClick={onRemoveImage}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remover imagem
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço (R$)
              </label>
              <input
                type="number"
                name="price"
                value={formState.price}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estoque
              </label>
              <input
                type="number"
                name="stock"
                value={formState.stock}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                min="0"
                required
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="active"
              id="active"
              checked={formState.active}
              onChange={onChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
              Produto ativo
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteModal = ({ show, product, onClose, onConfirm }) => {
  if (!show || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex items-center justify-center text-red-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Excluir Produto</h2>
        <p className="text-gray-600 text-center mb-6">
          Tem certeza que deseja excluir o produto <span className="font-semibold">{product.name}</span>? Esta ação não pode ser desfeita.
        </p>

        <div className="flex justify-center space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    active: true,
    image: ''
  });
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'Frutas', // Categoria padrão
    price: 0,
    stock: 0,
    active: true,
    image: ''
  });
  const [previewImage, setPreviewImage] = useState('');
  const [editPreviewImage, setEditPreviewImage] = useState('');
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  // Função para filtrar produtos
  const filteredProducts = products.filter(product => {
    const name = product?.name || '';
    const category = product?.category || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || category === selectedCategory;
    return matchesSearch && matchesCategory;
  });


  useEffect(() => {
    const fetchProducts = async () => {
      const { data: storeData, error: storeError } = await supabase.auth.getUser();

      if (storeError) {
        console.error("Erro ao resgatar dados da loja: ", storeError.message);
      }

      const storeId = storeData.user?.id;

      const { data, error } = await supabase
        .from('produto')
        .select('*')
        .order('nome', { ascending: true })
        .eq("id_Loja", storeId);

      if (error) {
        console.error("Erro ao carregar produtos:", error.message);
        return;
      }

      console.log("Produtos carregados: ", data);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Manipular busca
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Manipular categoria
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Categorias únicas
  const categories = [...new Set(products.map(product => product.category))];

  // Funções para o modal de adição
  const openAddModal = () => {
    // Resetar o formulário
    setNewProductForm({
      name: '',
      category: categories[0] || 'Frutas',
      price: 0,
      stock: 0,
      active: true,
      image: ''
    });
    setPreviewImage('');
    setShowAddModal(true);
  };

  const handleNewProductFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProductForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked :
        type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar se é uma imagem
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido.');
      return;
    }

    const filePath = `${file.name}-${Date.now()}`

    // Criar URL temporária para preview
    const { error: uploadingError } = await supabase.storage.from("produto-imagem").upload(filePath, file);

    if (uploadingError) {
      console.error("Erro ao subir imagem para o servidor: ", uploadingError);
      return;
    }

    const { data: imageData } = await supabase.storage.from("produto-imagem").getPublicUrl(filePath);

    const imageUrl = imageData.publicUrl;
    setPreviewImage(imageUrl);

    // Em um cenário real, aqui fariamos upload para um servidor
    // e receberíamos a URL da imagem salva
    // Por enquanto, vamos apenas simular e usar a URL local temporária
    setNewProductForm(prev => ({
      ...prev,
      image: imageUrl
    }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const { data: storeData, error: storeError } = await supabase.auth.getUser();

    if (storeError) {
      console.error("Erro ao buscar ID da loja!", storeError?.message);
      return;
    }

    const storeId = storeData.user?.id;

    // Criar novo produto (sem o campo `id`, o Supabase gera automaticamente)
    const newProduct = {
      id_Loja: storeId,
      nome: newProductForm.name,
      preco: parseFloat(newProductForm.price),
      categoria: newProductForm.category,
      estoque: parseInt(newProductForm.stock),
      image_url: newProductForm.image,
      ativo: newProductForm.active,
    };

    // Persistir no Supabase
    const { data, error } = await supabase
      .from('produto')
      .insert([newProduct]).select().single();


    if (!data || !data.nome || typeof data.preco !== 'number') {
      console.warn("Produto inválido recebido do Supabase:", data);
      return;
    }

    if (error) {
      console.error("Erro ao adicionar produto:", error.message);
      alert("Erro ao salvar no banco de dados.");
      return;
    }

    // Atualiza localmente após salvar no Supabase
    setProducts(prevProducts => [...prevProducts, data]);
    setShowAddModal(false);
  };

  // Funções para o modal de edição
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      active: product.active,
      image: product.image
    });
    setEditPreviewImage(product.image);
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked :
        type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar se é uma imagem
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido.');
      return;
    }

    // Criar URL temporária para preview
    const imageUrl = URL.createObjectURL(file);
    setEditPreviewImage(imageUrl);

    // Em um cenário real, aqui faríamos upload para um servidor
    // e receberíamos a URL da imagem salva
    setEditForm(prev => ({
      ...prev,
      image: imageUrl
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    // Atualizar produto na lista
    const updatedProducts = products.map(product =>
      product.id === selectedProduct.id
        ? { ...product, ...editForm }
        : product
    );

    setProducts(updatedProducts);
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  // Funções para o modal de exclusão
  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    // Remover produto da lista
    const updatedProducts = products.filter(product => product.id !== selectedProduct.id);
    setProducts(updatedProducts);
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
        <button
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center"
          onClick={openAddModal}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar Produto
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex w-full md:w-auto items-center gap-2">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Buscar
            </button>
          </div>
          <div className="w-full md:w-auto">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Todas as categorias</option>
              <option value="Frutas">Frutas</option>
              <option value="Legumes">Legumes</option>
              <option value="Verduras">Verduras</option>
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque
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
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-md bg-gray-200 flex-shrink-0 overflow-hidden">
                          <img
                            src={product.image_url}
                            alt={product.nome}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/40?text=Fruta';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.nome}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.categoria}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        R$ {typeof product.preco === 'number' ? product.preco.toFixed(2) : '0,00'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${product.estoque > 0 ? 'text-gray-900' : 'text-red-600 font-medium'}`}>
                        {product.estoque > 0 ? product.estoque : 'Esgotado'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {product.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-green-600 hover:text-green-800 mr-3"
                        onClick={() => openEditModal(product)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => openDeleteModal(product)}
                      >
                        Excluir
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              {searchTerm || selectedCategory
                ? 'Não encontramos produtos correspondentes aos critérios de busca.'
                : 'Adicione seu primeiro produto para começar a vender através do iFruits.'}
            </p>
            <button
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center"
              onClick={openAddModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Adicionar Produto
            </button>
          </div>
        )}
      </div>

      {/* Renderizar modais */}
      <AddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubmit}
        formState={newProductForm}
        onFormChange={handleNewProductFormChange}
        onImageUpload={handleImageUpload}
        previewImage={previewImage}
        onRemoveImage={() => {
          setPreviewImage('');
          setNewProductForm(prev => ({ ...prev, image: '' }));
          if (fileInputRef.current) fileInputRef.current.value = '';
        }}
        fileInputRef={fileInputRef}
        categories={categories}
      />

      <EditModal
        show={showEditModal}
        product={selectedProduct}
        formState={editForm}
        onClose={() => setShowEditModal(false)}
        onChange={handleEditFormChange}
        onSubmit={handleEditSubmit}
        previewImage={editPreviewImage}
        onImageUpload={handleEditImageUpload}
        onRemoveImage={() => {
          setEditPreviewImage('');
          setEditForm(prev => ({ ...prev, image: '' }));
          if (editFileInputRef.current) {
            editFileInputRef.current.value = '';
          }
        }}
        fileInputRef={editFileInputRef}
      />

      <DeleteModal
        show={showDeleteModal}
        product={selectedProduct}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </motion.div>
  );
};

export default ProductsPage; 