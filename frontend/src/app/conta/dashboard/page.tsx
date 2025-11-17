'use client';

// Force dynamic rendering since this page uses authentication hooks
export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';

export default function CustomerDashboardPage() {
  const router = useRouter();
  const { customer, isLoading, logout } = useCustomerAuth();

  useEffect(() => {
    if (!isLoading && !customer) {
      router.push('/conta/login');
    }
  }, [customer, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Minha Conta</h1>
              <p className="text-gray-600 mt-2">Bem-vindo, {customer.name}!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Perfil */}
              <Link
                href="/conta/perfil"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {customer.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-gray-900">Meu Perfil</h2>
                    <p className="text-sm text-gray-600">Editar informações</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <p className="mb-1"><strong>Email:</strong> {customer.email}</p>
                  {customer.phone && <p className="mb-1"><strong>Telefone:</strong> {customer.phone}</p>}
                  {customer.city && <p><strong>Cidade:</strong> {customer.city}</p>}
                </div>
              </Link>

              {/* Pedidos */}
              <Link
                href="/conta/pedidos"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="text-4xl mb-3">📦</div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Meus Pedidos</h2>
                <p className="text-sm text-gray-600">Acompanhe seus pedidos e histórico de compras</p>
              </Link>

              {/* Favoritos */}
              <Link
                href="/conta/favoritos"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="text-4xl mb-3">❤️</div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Favoritos</h2>
                <p className="text-sm text-gray-600">Produtos salvos para comprar depois</p>
              </Link>

              {/* Avaliações */}
              <Link
                href="/conta/avaliacoes"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="text-4xl mb-3">⭐</div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Minhas Avaliações</h2>
                <p className="text-sm text-gray-600">Veja e gerencie suas avaliações</p>
              </Link>

              {/* Endereços */}
              <Link
                href="/conta/perfil"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="text-4xl mb-3">📍</div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Endereço</h2>
                <p className="text-sm text-gray-600">Gerenciar endereço de entrega</p>
              </Link>

              {/* Sair */}
              <button
                onClick={logout}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 text-left"
              >
                <div className="text-4xl mb-3">🚪</div>
                <h2 className="text-lg font-semibold text-red-600 mb-2">Sair</h2>
                <p className="text-sm text-gray-600">Fazer logout da sua conta</p>
              </button>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/produtos"
                  className="flex items-center p-4 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <span className="text-2xl mr-3">🛍️</span>
                  <span className="font-semibold">Continuar Comprando</span>
                </Link>
                <Link
                  href="/conta/perfil"
                  className="flex items-center p-4 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <span className="text-2xl mr-3">✏️</span>
                  <span className="font-semibold">Atualizar Perfil</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
