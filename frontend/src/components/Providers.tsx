'use client';

import { ReactNode } from 'react';
import { CustomerAuthProvider } from '@/hooks/useCustomerAuth';
import { WishlistProvider } from '@/hooks/useWishlist';
import { ToastProvider } from '@/contexts/ToastContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CustomerAuthProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CustomerAuthProvider>
    </ToastProvider>
  );
}