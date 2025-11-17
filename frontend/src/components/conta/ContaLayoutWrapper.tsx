'use client';

import { ReactNode, Suspense } from 'react';
import { usePathname } from 'next/navigation';

interface ContaLayoutWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ContaLayoutWrapper({
  children,
  fallback
}: ContaLayoutWrapperProps) {
  const pathname = usePathname();

  // Loading state para páginas de conta
  const defaultFallback = (
    <main className="flex-grow bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
}