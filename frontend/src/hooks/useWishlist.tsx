'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import api from '@/lib/api';
import { useCustomerAuth } from './useCustomerAuth';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  stock: number;
  category?: {
    name: string;
    slug: string;
  };
}

interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  createdAt: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  isLoading: boolean;
  addToWishlist: (productId: string) => Promise<{ success: boolean; error?: string }>;
  removeFromWishlist: (productId: string) => Promise<{ success: boolean; error?: string }>;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { customer } = useCustomerAuth();

  const fetchWishlist = async () => {
    if (!customer) {
      setWishlist([]);
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('customerToken');
      const response = await api.get('/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (customer) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [customer]);

  const addToWishlist = async (productId: string) => {
    if (!customer) {
      return { success: false, error: 'Você precisa estar logado para adicionar aos favoritos' };
    }

    try {
      const token = localStorage.getItem('customerToken');
      const response = await api.post('/api/wishlist',
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setWishlist(prev => [...prev, response.data]);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao adicionar aos favoritos',
      };
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!customer) {
      return { success: false, error: 'Você precisa estar logado' };
    }

    try {
      const token = localStorage.getItem('customerToken');
      await api.delete(`/api/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setWishlist(prev => prev.filter(item => item.productId !== productId));
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao remover dos favoritos',
      };
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.productId === productId);
  };

  const refreshWishlist = async () => {
    await fetchWishlist();
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isLoading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
        refreshWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
