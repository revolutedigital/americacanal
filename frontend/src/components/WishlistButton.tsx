'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import { useWishlist } from '@/hooks/useWishlist';

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export default function WishlistButton({ productId, className = '' }: WishlistButtonProps) {
  const router = useRouter();
  const { customer } = useCustomerAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);

  const inWishlist = isInWishlist(productId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!customer) {
      router.push('/conta/login');
      return;
    }

    setIsLoading(true);

    if (inWishlist) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`transition-all duration-200 ${className}`}
      title={inWishlist ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      {isLoading ? (
        <span className="text-2xl">⏳</span>
      ) : inWishlist ? (
        <span className="text-2xl text-red-500">❤️</span>
      ) : (
        <span className="text-2xl text-gray-400 hover:text-red-500">🤍</span>
      )}
    </button>
  );
}
