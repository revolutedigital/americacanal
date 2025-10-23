'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import api from '@/lib/api';
import { ProductFormData, Product } from '@/lib/types';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [initialData, setInitialData] = useState<ProductFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/api/products/${id}`);
      const product: Product = response.data;

      setInitialData({
        name: product.name,
        description: product.description,
        price: Number(product.price),
        comparePrice: product.comparePrice ? Number(product.comparePrice) : undefined,
        imageUrl: product.imageUrl,
        images: product.images || [],
        stock: product.stock,
        lowStockAlert: product.lowStockAlert || 5,
        isActive: product.isActive,
        categoryId: product.categoryId || undefined,
        faqs: product.faqs || [],
        relatedProductIds: product.relatedTo?.map((rel: any) => rel.relatedProductId) || [],
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Erro ao carregar produto');
      router.push('/admin/produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: ProductFormData) => {
    try {
      await api.put(`/api/products/${id}`, data);
      alert('Produto atualizado com sucesso!');
      router.push('/admin/produtos');
    } catch (error: any) {
      console.error('Error updating product:', error);
      alert(error.response?.data?.error || 'Erro ao atualizar produto');
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!initialData) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Editar Produto</h1>
        <p className="text-gray-300">Atualize as informações do produto</p>
      </div>

      <ProductForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Atualizar Produto"
      />
    </div>
  );
}
