'use client';

// Force dynamic rendering since this page uses authentication hooks
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import api from '@/lib/api';
import { formatPrice } from '@/lib/utils';

interface OrderItem {
  id: string;
  productName: string;
  imageUrl?: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  customerName: string;
  subtotal: number;
  discount: number;
  total: number;
  whatsappConversationUrl?: string;
  createdAt: string;
  items: OrderItem[];
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800' },
  processing: { label: 'Processando', color: 'bg-purple-100 text-purple-800' },
  shipped: { label: 'Enviado', color: 'bg-indigo-100 text-indigo-800' },
  delivered: { label: 'Entregue', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-800' },
};

export default function PedidosPage() {
  const router = useRouter();
  const { customer, isLoading: authLoading } = useCustomerAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !customer) {
      router.push('/conta/login');
    } else if (customer) {
      fetchOrders();
    }
  }, [customer, authLoading, router]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('customerToken');
      const response = await api.get('/api/customers/me/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
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
                <h1 className="text-3xl font-bold text-gray-900">Meus Pedidos</h1>
                <p className="text-gray-600 mt-2">
                  {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}
                </p>
              </div>
              <Link
                href="/conta/dashboard"
                className="text-primary hover:text-green-700 font-semibold"
              >
                Voltar ao Dashboard
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">📦</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Nenhum pedido encontrado
                </h2>
                <p className="text-gray-600 mb-6">
                  Você ainda não fez nenhum pedido
                </p>
                <Link
                  href="/produtos"
                  className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Ver Produtos
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Pedido</p>
                          <p className="text-lg font-bold text-gray-900">
                            #{order.orderNumber}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Data</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${
                              statusLabels[order.status]?.color || 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {statusLabels[order.status]?.label || order.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6">
                      <div className="space-y-4 mb-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-4">
                            {item.imageUrl && (
                              <div className="relative w-20 h-20 flex-shrink-0">
                                <Image
                                  src={item.imageUrl}
                                  alt={item.productName}
                                  fill
                                  className="object-cover rounded"
                                  sizes="80px"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{item.productName}</h3>
                              <p className="text-sm text-gray-600">
                                Quantidade: {item.quantity}
                              </p>
                              <p className="text-sm font-semibold text-gray-900">
                                {formatPrice(item.price)} x {item.quantity} = {formatPrice(item.total)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Total */}
                      <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="font-semibold">{formatPrice(order.subtotal)}</span>
                        </div>
                        {order.discount > 0 && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span>Desconto:</span>
                            <span className="font-semibold">- {formatPrice(order.discount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                          <span>Total:</span>
                          <span>{formatPrice(order.total)}</span>
                        </div>
                      </div>

                      {/* WhatsApp Button */}
                      {order.whatsappConversationUrl && (
                        <div className="mt-4">
                          <a
                            href={order.whatsappConversationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-green-600 text-white text-center font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200"
                          >
                            💬 Conversar no WhatsApp
                          </a>
                        </div>
                      )}
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
