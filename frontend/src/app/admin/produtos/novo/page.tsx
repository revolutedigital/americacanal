'use client';

import { useRouter } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import api from '@/lib/api';
import { ProductFormData } from '@/lib/types';

export default function NewProductPage() {
  const router = useRouter();

  const handleSubmit = async (data: ProductFormData) => {
    try {
      // Adicionar tenantId do America Cannabis
      const productData = {
        ...data,
        tenantId: 'df192cfd-fb87-470a-8ea8-81784633409c',
      };

      await api.post('/api/products', productData);
      alert('Produto criado com sucesso!');
      router.push('/admin/produtos');
    } catch (error: any) {
      console.error('Error creating product:', error);
      alert(error.response?.data?.error || 'Erro ao criar produto');
      throw error;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Novo Produto</h1>
        <p className="text-gray-300">Adicione um novo produto ao catálogo</p>
      </div>

      <ProductForm onSubmit={handleSubmit} submitLabel="Criar Produto" />
    </div>
  );
}
