'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import DashboardSkeleton from '@/components/skeletons/DashboardSkeleton';
import {
  PackageIcon,
  MoneyIcon,
  BoltIcon,
  XIcon,
  CashIcon,
  BarChartIcon,
  CheckIcon,
  PlusIcon,
  ListIcon,
  StarIcon,
  SettingsIcon,
  AlertIcon,
} from '@/components/admin/icons/AdminIcons';

interface ExtendedProduct extends Product {
  _count?: {
    reviews?: number;
    orderItems?: number;
  };
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<ExtendedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    inactiveProducts: 0,
    outOfStock: 0,
    lowStock: 0,
    totalInventoryValue: 0,
    averagePrice: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/products/admin/all?tenantId=df192cfd-fb87-470a-8ea8-81784633409c');
      const data = response.data;
      setProducts(data);

      // Calcular estatísticas avançadas
      const active = data.filter((p: Product) => p.isActive);
      const outOfStock = data.filter((p: Product) => p.stock === 0);
      const lowStock = data.filter((p: Product) => p.stock > 0 && p.stock <= 5);
      const totalValue = data.reduce((acc: number, p: Product) => acc + (Number(p.price) * p.stock), 0);
      const avgPrice = data.length > 0 ? data.reduce((acc: number, p: Product) => acc + Number(p.price), 0) / data.length : 0;

      setStats({
        totalProducts: data.length,
        activeProducts: active.length,
        inactiveProducts: data.length - active.length,
        outOfStock: outOfStock.length,
        lowStock: lowStock.length,
        totalInventoryValue: totalValue,
        averagePrice: avgPrice,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTopProducts = () => {
    return products
      .filter(p => p.isActive)
      .sort((a: ExtendedProduct, b: ExtendedProduct) => (b._count?.orderItems || 0) - (a._count?.orderItems || 0))
      .slice(0, 5);
  };

  const getMostReviewedProducts = () => {
    return products
      .filter(p => p._count && p._count.reviews && p._count.reviews > 0)
      .sort((a: ExtendedProduct, b: ExtendedProduct) => (b._count?.reviews || 0) - (a._count?.reviews || 0))
      .slice(0, 5);
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-300">Visão geral completa do sistema</p>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total de Produtos</p>
              <p className="text-4xl font-bold">{stats.totalProducts}</p>
              <p className="text-blue-100 text-xs mt-2">
                {stats.activeProducts} ativos
              </p>
            </div>
            <PackageIcon size={48} className="opacity-20" strokeWidth={1.5} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Valor em Estoque</p>
              <p className="text-4xl font-bold">
                {formatPrice(stats.totalInventoryValue).replace('R$', '').trim()}
              </p>
              <p className="text-green-100 text-xs mt-2">
                Valor total do inventário
              </p>
            </div>
            <MoneyIcon size={48} className="opacity-20" strokeWidth={1.5} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm mb-1">Estoque Baixo</p>
              <p className="text-4xl font-bold">{stats.lowStock}</p>
              <p className="text-yellow-100 text-xs mt-2">
                Produtos com ≤ 5 unidades
              </p>
            </div>
            <BoltIcon size={48} className="opacity-20" strokeWidth={1.5} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm mb-1">Sem Estoque</p>
              <p className="text-4xl font-bold">{stats.outOfStock}</p>
              <p className="text-red-100 text-xs mt-2">
                Produtos indisponíveis
              </p>
            </div>
            <XIcon size={48} className="opacity-20" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Preço Médio</h3>
            <CashIcon size={24} className="text-accent" />
          </div>
          <p className="text-3xl font-bold text-white">
            {formatPrice(stats.averagePrice)}
          </p>
          <p className="text-sm text-gray-300 mt-2">
            Média de todos os produtos
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Taxa de Ativação</h3>
            <BarChartIcon size={24} className="text-accent" />
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.totalProducts > 0
              ? Math.round((stats.activeProducts / stats.totalProducts) * 100)
              : 0}%
          </p>
          <p className="text-sm text-gray-300 mt-2">
            Produtos ativos vs total
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Disponibilidade</h3>
            <CheckIcon size={24} className="text-accent" />
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.totalProducts > 0
              ? Math.round(((stats.totalProducts - stats.outOfStock) / stats.totalProducts) * 100)
              : 0}%
          </p>
          <p className="text-sm text-gray-300 mt-2">
            Produtos com estoque
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/produtos/novo"
            className="flex items-center gap-3 p-4 border-2 border-accent text-accent rounded-lg hover:bg-accent hover:text-gray-900 transition-all group"
          >
            <PlusIcon size={24} className="flex-shrink-0" />
            <div>
              <p className="font-semibold">Novo Produto</p>
              <p className="text-xs opacity-75">Adicionar ao catálogo</p>
            </div>
          </Link>

          <Link
            href="/admin/produtos"
            className="flex items-center gap-3 p-4 border-2 border-gray-600 text-gray-200 rounded-lg hover:border-accent hover:text-accent transition-all group"
          >
            <ListIcon size={24} className="flex-shrink-0" />
            <div>
              <p className="font-semibold">Ver Produtos</p>
              <p className="text-xs opacity-75">Gerenciar catálogo</p>
            </div>
          </Link>

          <Link
            href="/admin/reviews"
            className="flex items-center gap-3 p-4 border-2 border-gray-600 text-gray-200 rounded-lg hover:border-accent hover:text-accent transition-all group"
          >
            <StarIcon size={24} className="flex-shrink-0" />
            <div>
              <p className="font-semibold">Avaliações</p>
              <p className="text-xs opacity-75">Moderar reviews</p>
            </div>
          </Link>

          <Link
            href="/admin/configuracoes"
            className="flex items-center gap-3 p-4 border-2 border-gray-600 text-gray-200 rounded-lg hover:border-accent hover:text-accent transition-all group"
          >
            <SettingsIcon size={24} className="flex-shrink-0" />
            <div>
              <p className="font-semibold">Configurações</p>
              <p className="text-xs opacity-75">Personalizar loja</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Alerts */}
      {(stats.lowStock > 0 || stats.outOfStock > 0) && (
        <div className="space-y-4">
          {stats.outOfStock > 0 && (
            <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg border border-red-500/30">
              <div className="flex items-center gap-3">
                <AlertIcon size={24} className="text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-red-200 font-semibold">
                    {stats.outOfStock} {stats.outOfStock === 1 ? 'produto está' : 'produtos estão'} sem estoque
                  </p>
                  <p className="text-red-300 text-sm">
                    Reponha o estoque para não perder vendas
                  </p>
                </div>
              </div>
            </div>
          )}

          {stats.lowStock > 0 && (
            <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-lg border border-yellow-500/30">
              <div className="flex items-center gap-3">
                <BoltIcon size={24} className="text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-yellow-200 font-semibold">
                    {stats.lowStock} {stats.lowStock === 1 ? 'produto está' : 'produtos estão'} com estoque baixo
                  </p>
                  <p className="text-yellow-300 text-sm">
                    Considere repor em breve
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Produtos Recentes</h2>
          </div>
          <div className="p-6">
            {products.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhum produto cadastrado</p>
            ) : (
              <div className="space-y-3">
                {products.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-3 hover:bg-gray-800 rounded-lg transition-colors">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{product.name}</p>
                      <p className="text-sm text-gray-300">{formatPrice(product.price)}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        product.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-700 text-gray-800'
                      }`}
                    >
                      {product.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Alerta de Estoque</h2>
          </div>
          <div className="p-6">
            {products.filter(p => p.stock <= 5).length === 0 ? (
              <p className="text-gray-500 text-center py-8">Todos os produtos com estoque OK</p>
            ) : (
              <div className="space-y-3">
                {products
                  .filter(p => p.stock <= 5)
                  .slice(0, 5)
                  .map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-3 hover:bg-gray-800 rounded-lg transition-colors">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">{product.name}</p>
                        <p className="text-sm text-gray-300">
                          Estoque: {product.stock} unidades
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          product.stock === 0
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {product.stock === 0 ? 'Sem estoque' : 'Baixo'}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
