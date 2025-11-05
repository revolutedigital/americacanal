'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      // Adicionar tenantId do America Cannabis
      const response = await api.get('/api/products/admin/all?tenantId=0fb61585-3cb3-48b3-ae76-0a5358084a8c');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Tem certeza que deseja excluir "${name}"?`)) {
      return;
    }

    try {
      await api.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      alert('Produto excluído com sucesso!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Erro ao excluir produto');
    }
  };

  const handleDuplicate = async (productId: string) => {
    if (!confirm('Deseja duplicar este produto? Uma cópia será criada.')) {
      return;
    }

    try {
      // Buscar dados completos do produto
      const response = await api.get(`/api/products/${productId}`);
      const product = response.data;

      // Criar cópia do produto (removendo campos que devem ser únicos)
      const duplicatedProduct = {
        ...product,
        name: `${product.name} (Cópia)`,
        // Remover campos únicos/automáticos
        id: undefined,
        slug: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        viewCount: 0,
        orderCount: 0,
        // Manter demais dados
        tenantId: '0fb61585-3cb3-48b3-ae76-0a5358084a8c',
      };

      // Criar novo produto
      const createResponse = await api.post('/api/products', duplicatedProduct);
      const newProduct = createResponse.data;

      alert(`✅ Produto duplicado com sucesso! Redirecionando para edição...`);

      // Redirecionar para editar o novo produto
      router.push(`/admin/produtos/editar/${newProduct.id}`);
    } catch (error: any) {
      console.error('Error duplicating product:', error);
      alert('Erro ao duplicar produto: ' + (error.response?.data?.error || error.message));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Produtos</h1>
          <p className="text-gray-300">Gerencie todos os produtos do catálogo</p>
        </div>
        <Link href="/admin/produtos/novo" className="btn-primary">
          ➕ Novo Produto
        </Link>
      </div>

      {/* Search Bar */}
      {products.length > 0 && (
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Buscar produtos por nome ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-400 mt-2">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </p>
          )}
        </div>
      )}

      {products.length === 0 ? (
        <div className="bg-gray-800 rounded-lg shadow p-8 text-center">
          <p className="text-gray-300 mb-4">Nenhum produto cadastrado ainda.</p>
          <Link href="/admin/produtos/novo" className="btn-primary inline-block">
            Criar Primeiro Produto
          </Link>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800 border-b-2 border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Estoque
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          className="h-12 w-12 rounded object-cover bg-gray-100"
                          src={product.imageUrl || 'https://via.placeholder.com/100x100?text=Sem+Imagem'}
                          alt={product.name}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/100x100?text=Sem+Imagem';
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {product.description.substring(0, 60)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-white">
                      {formatPrice(product.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{product.stock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() =>
                        router.push(`/admin/produtos/editar/${product.id}`)
                      }
                      className="text-primary hover:text-primary-dark mr-3"
                      title="Editar produto"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDuplicate(product.id)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                      title="Duplicar produto"
                    >
                      📋 Duplicar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="text-red-600 hover:text-red-900"
                      title="Excluir produto"
                    >
                      🗑️ Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
