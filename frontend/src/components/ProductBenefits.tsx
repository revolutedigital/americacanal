'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface ProductBenefitsProps {
  productId?: string;
}

export default function ProductBenefits({ productId }: ProductBenefitsProps) {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [useGlobal, setUseGlobal] = useState(false);

  useEffect(() => {
    fetchBenefits();
  }, [productId]);

  const fetchBenefits = async () => {
    try {
      // Primeiro verifica se deve usar benefícios globais
      const configResponse = await api.get('/api/tenant/config');
      const enableGlobalBenefits = configResponse.data?.enableGlobalBenefits || false;
      setUseGlobal(enableGlobalBenefits);

      if (enableGlobalBenefits) {
        // Busca benefícios globais
        const response = await api.get('/api/benefits/global/active?tenantId=df192cfd-fb87-470a-8ea8-81784633409c');
        setBenefits(response.data);
      } else if (productId) {
        // Busca benefícios específicos do produto
        const response = await api.get(`/api/benefits/product/${productId}`);
        setBenefits(response.data);
      }
    } catch (error) {
      console.error('Error fetching benefits:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || benefits.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
        Garantias de Compra
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 text-3xl">
                {benefit.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {benefit.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badge */}
      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          ✅ <span className="font-semibold">Compra 100% Segura</span> - Seus dados estão protegidos
        </p>
      </div>
    </section>
  );
}
