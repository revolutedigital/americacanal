'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface CanonicalUrlProps {
  baseUrl?: string;
}

export default function CanonicalUrl({ baseUrl = 'https://frontend-production1.up.railway.app' }: CanonicalUrlProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Remove canonical existente se houver
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Cria nova tag canonical sem query params
    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', `${baseUrl}${pathname}`);
    document.head.appendChild(canonical);

    // Cleanup ao desmontar
    return () => {
      const link = document.querySelector('link[rel="canonical"]');
      if (link) {
        link.remove();
      }
    };
  }, [pathname, baseUrl]);

  return null; // Este componente não renderiza nada visualmente
}
