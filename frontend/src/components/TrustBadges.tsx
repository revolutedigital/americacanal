'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface TrustBadge {
  icon: string;
  title: string;
  text: string;
}

export default function TrustBadges() {
  const [badges, setBadges] = useState<TrustBadge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrustBadges();
  }, []);

  const fetchTrustBadges = async () => {
    try {
      const response = await api.get('/api/tenant/config');
      if (response.data?.trustBadges && Array.isArray(response.data.trustBadges)) {
        setBadges(response.data.trustBadges);
      }
    } catch (error) {
      console.error('Error fetching trust badges:', error);
      // Fallback: use default badges if API fails
      setBadges([
        { icon: '🚚', title: 'Entrega Rápida', text: 'Todo o Brasil' },
        { icon: '🔒', title: 'Compra Segura', text: 'Pagamento protegido' },
        { icon: '⭐', title: 'Qualidade Premium', text: 'Produtos selecionados' },
        { icon: '💬', title: 'Suporte 24/7', text: 'Sempre disponível' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading || badges.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-r from-primary via-primary-light to-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{badge.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-1">{badge.title}</h3>
              <p className="text-sm text-white/80">{badge.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
