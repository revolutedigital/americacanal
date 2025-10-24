'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { formatPrice } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  isActive?: boolean;
}

interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  stock: number;
}

export default function ManualSalesPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [items, setItems] = useState<SaleItem[]>([]);

  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('Dinheiro');
  const [notes, setNotes] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/products/admin/all?tenantId=df192cfd-fb87-470a-8ea8-81784633409c');
      const activeProducts = response.data.filter((p: Product) => p.isActive && p.stock > 0);
      setProducts(activeProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const addItem = () => {
    if (!selectedProduct) {
      alert('Selecione um produto');
      return;
    }

    if (quantity <= 0) {
      alert('Quantidade deve ser maior que zero');
      return;
    }

    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    // Verificar se o produto já está na lista
    const existingItem = items.find((i) => i.productId === selectedProduct);
    if (existingItem) {
      alert('Produto já adicionado. Remova e adicione novamente com a quantidade correta.');
      return;
    }

    // Verificar estoque
    if (quantity > product.stock) {
      alert(`Estoque insuficiente. Disponível: ${product.stock}`);
      return;
    }

    const newItem: SaleItem = {
      productId: product.id,
      productName: product.name,
      quantity,
      price: Number(product.price),
      stock: product.stock,
    };

    setItems([...items, newItem]);
    setSelectedProduct('');
    setQuantity(1);
  };

  const removeItem = (productId: string) => {
    setItems(items.filter((i) => i.productId !== productId));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert('Adicione pelo menos um produto');
      return;
    }

    if (!customerName.trim()) {
      alert('Informe o nome do cliente');
      return;
    }

    try {
      setSubmitting(true);

      const saleData = {
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        customerName,
        customerPhone,
        paymentMethod,
        notes,
      };

      const response = await api.post('/api/sales', saleData);

      if (response.data.success) {
        alert('Venda registrada com sucesso!');
        // Limpar formulário
        setItems([]);
        setCustomerName('');
        setCustomerPhone('');
        setNotes('');
        setPaymentMethod('Dinheiro');
        fetchProducts(); // Atualizar estoque
      }
    } catch (error: any) {
      console.error('Error submitting sale:', error);
      alert(error.response?.data?.error || 'Erro ao registrar venda');
    } finally {
      setSubmitting(false);
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
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Registrar Venda</h1>
        <p className="text-gray-300">Registre vendas feitas fora do sistema e atualize o estoque</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Adicionar Produtos */}
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-white mb-4">Produtos da Venda</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Produto
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="input-field"
                >
                  <option value="">Selecione um produto</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - {formatPrice(Number(product.price))} (Estoque: {product.stock})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Quantidade
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="input-field"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={addItem}
              className="btn-primary w-full md:w-auto"
            >
              ➕ Adicionar Produto
            </button>

            {/* Lista de Itens */}
            {items.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Itens da Venda</h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-300">
                          {item.quantity}x {formatPrice(item.price)} = {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="text-red-600 hover:text-red-800 ml-4"
                      >
                        🗑️ Remover
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Informações do Cliente */}
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-white mb-4">Informações do Cliente</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Nome do Cliente *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="input-field"
                  placeholder="João Silva"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Telefone (opcional)
                </label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="input-field"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Forma de Pagamento
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="input-field"
                >
                  <option value="Pix">Pix</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Observações (opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input-field"
                  rows={3}
                  placeholder="Informações adicionais sobre a venda..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Resumo da Venda */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-bold text-white mb-4">Resumo</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Itens:</span>
                <span className="font-medium">{items.length}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Quantidade Total:</span>
                <span className="font-medium">
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting || items.length === 0 || !customerName}
              className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Registrando...' : '✅ Finalizar Venda'}
            </button>

            {items.length === 0 && (
              <p className="text-sm text-gray-500 text-center mt-4">
                Adicione produtos para continuar
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
