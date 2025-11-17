'use client';

// Force dynamic rendering since this page uses authentication hooks
export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import { useWishlist } from '@/hooks/useWishlist';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';

export default function FavoritosPage() {
  const router = useRouter();
  const { customer, isLoading: authLoading } = useCustomerAuth();
  const { wishlist, isLoading, removeFromWishlist } = useWishlist();

  useEffect(() => {
    if (!authLoading && !customer) {
      router.push('/conta/login');
    }
  }, [customer, authLoading, router]);

  const handleRemove = async (productId: string) => {
    const result = await removeFromWishlist(productId);
    if (!result.success) {
      alert(result.error);
    }
  };

  if (authLoading || isLoading) {
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
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Meus Favoritos</h1>
                <p className="text-gray-600 mt-2">
                  {wishlist.length} {wishlist.length === 1 ? 'produto salvo' : 'produtos salvos'}
                </p>
              </div>
              <Link
                href="/conta/dashboard"
                className="text-primary hover:text-green-700 font-semibold"
              >
                Voltar ao Dashboard
              </Link>
            </div>

            {wishlist.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">💔</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Nenhum produto nos favoritos
                </h2>
                <p className="text-gray-600 mb-6">
                  Adicione produtos aos seus favoritos para encontrá-los facilmente mais tarde
                </p>
                <Link
                  href="/produtos"
                  className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Ver Produtos
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  >
                    <Link href={`/produtos/${item.product.id}`}>
                      <div className="relative h-64">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {item.product.stock === 0 && (
                          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Sob Encomenda
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="p-4">
                      {item.product.category && (
                        <p className="text-xs text-gray-500 uppercase mb-2">
                          {item.product.category.name}
                        </p>
                      )}

                      <Link href={`/produtos/${item.product.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary">
                          {item.product.name}
                        </h3>
                      </Link>

                      <p className="text-2xl font-bold text-primary mb-4">
                        {formatPrice(item.product.price)}
                      </p>

                      <div className="flex gap-2">
                        <a
                          href={getWhatsAppUrl(item.product.name, item.product.price)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-primary text-white text-center font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                        >
                          Comprar
                        </a>
                        <button
                          onClick={() => handleRemove(item.product.id)}
                          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
                          title="Remover dos favoritos"
                        >
                          ❌
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
