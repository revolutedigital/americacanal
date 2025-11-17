// Server Component - no 'use client' directive
export const dynamic = 'force-dynamic';

import { ReactNode, Suspense } from 'react';

export const metadata = {
  title: 'Minha Conta',
  description: 'Área do cliente - America Cannabis',
};

export default function ContaLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      {children}
    </Suspense>
  );
}