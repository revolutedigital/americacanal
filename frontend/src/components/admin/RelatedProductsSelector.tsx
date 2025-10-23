'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
  isActive: boolean;
}

interface RelatedProductsSelectorProps {
  currentProductId?: string;
  selectedProductIds: string[];
  onChange: (productIds: string[]) => void;
  maxRelated?: number;
}

export default function RelatedProductsSelector({
  currentProductId,
  selectedProductIds,
  onChange,
  maxRelated = 8,
}: RelatedProductsSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  // Buscar produtos selecionados ao carregar
  useEffect(() => {
    if (selectedProductIds.length > 0) {
      fetchSelectedProducts();
    }
  }, [selectedProductIds]);

  // Buscar produtos disponíveis quando o usuário digita
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 2) {
        searchProducts();
      } else {
        setAvailableProducts([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchSelectedProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/products', {
        params: { ids: selectedProductIds.join(',') },
      });
      setSelectedProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching selected products:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async () => {
    try {
      setSearching(true);
      const response = await api.get('/api/products', {
        params: {
          search: searchTerm,
          isActive: true,
          limit: 20,
        },
      });

      // Filtrar produto atual e produtos já selecionados
      const filtered = response.data.products.filter(
        (p: Product) =>
          p.id !== currentProductId &&
          !selectedProductIds.includes(p.id)
      );

      setAvailableProducts(filtered);
    } catch (error) {
      console.error('Error searching products:', error);
      setAvailableProducts([]);
    } finally {
      setSearching(false);
    }
  };

  const handleAddProduct = (product: Product) => {
    if (selectedProductIds.length >= maxRelated) {
      alert(`Máximo de ${maxRelated} produtos relacionados permitido`);
      return;
    }

    const updatedIds = [...selectedProductIds, product.id];
    const updatedProducts = [...selectedProducts, product];

    setSelectedProducts(updatedProducts);
    onChange(updatedIds);
    setSearchTerm('');
    setAvailableProducts([]);
  };

  const handleRemoveProduct = (productId: string) => {
    const updatedIds = selectedProductIds.filter((id) => id !== productId);
    const updatedProducts = selectedProducts.filter((p) => p.id !== productId);

    setSelectedProducts(updatedProducts);
    onChange(updatedIds);
  };

  const handleMoveProduct = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= selectedProductIds.length) return;

    const newIds = [...selectedProductIds];
    const newProducts = [...selectedProducts];

    [newIds[index], newIds[targetIndex]] = [newIds[targetIndex], newIds[index]];
    [newProducts[index], newProducts[targetIndex]] = [newProducts[targetIndex], newProducts[index]];

    setSelectedProducts(newProducts);
    onChange(newIds);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Produtos Relacionados</h3>
          <p className="text-sm text-gray-300">
            Selecione produtos que serão mostrados como "Você também pode gostar"
          </p>
        </div>
        <span className="text-sm font-medium text-gray-300">
          {selectedProductIds.length}/{maxRelated}
        </span>
      </div>

      {/* Busca de Produtos */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Buscar Produtos
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite o nome do produto..."
          className="input-field"
          disabled={selectedProductIds.length >= maxRelated}
        />

        {/* Resultados da Busca */}
        {searchTerm.length >= 2 && (
          <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {searching ? (
              <div className="p-4 text-center text-gray-500">
                Buscando produtos...
              </div>
            ) : availableProducts.length > 0 ? (
              <div className="py-2">
                {availableProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleAddProduct(product)}
                    className="w-full px-4 py-3 hover:bg-gray-800 flex items-center gap-3 text-left transition-colors"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-300">
                        {formatPrice(product.price)} • Estoque: {product.stock}
                      </p>
                    </div>
                    <span className="text-primary text-sm">+ Adicionar</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                Nenhum produto encontrado
              </div>
            )}
          </div>
        )}
      </div>

      {/* Produtos Selecionados */}
      {selectedProducts.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <div className="text-4xl mb-3">🔗</div>
          <p className="text-gray-300 mb-2">Nenhum produto relacionado adicionado</p>
          <p className="text-sm text-gray-500">
            Busque e adicione produtos para cross-sell e upsell
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {selectedProducts.map((product, index) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded-lg p-4 flex items-center gap-4"
            >
              <span className="text-xs font-medium text-gray-500 w-8">
                #{index + 1}
              </span>

              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white truncate">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-300">
                  {formatPrice(product.price)}
                </p>
                {!product.isActive && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                    Inativo
                  </span>
                )}
              </div>

              {/* Botões de ação */}
              <div className="flex items-center gap-2">
                {/* Ordenação */}
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => handleMoveProduct(index, 'up')}
                    disabled={index === 0}
                    className="text-xs text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Mover para cima"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveProduct(index, 'down')}
                    disabled={index === selectedProducts.length - 1}
                    className="text-xs text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Mover para baixo"
                  >
                    ↓
                  </button>
                </div>

                {/* Remover */}
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(product.id)}
                  className="text-sm text-red-600 hover:text-red-700 px-3 py-1"
                  title="Remover"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-sm text-gray-300 space-y-1">
        <p>💡 <strong>Dicas:</strong></p>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>Produtos relacionados aparecem na seção "Você também pode gostar"</li>
          <li>A ordem dos produtos será mantida na exibição</li>
          <li>Escolha produtos complementares ou similares para aumentar vendas</li>
          <li>Recomendamos adicionar 4-6 produtos relacionados</li>
        </ul>
      </div>
    </div>
  );
}
