'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CanonicalUrlProps {
  baseUrl?: string;
}

export default function CanonicalUrl({ baseUrl = 'https://frontend-production1.up.railway.app' }: CanonicalUrlProps) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Só executa no cliente após montagem
    if (!isMounted || typeof document === 'undefined') return;

    // Usa setTimeout para garantir que o DOM está pronto
    const timer = setTimeout(() => {
      try {
        // Remove canonical existente se houver
        const existingCanonical = document.querySelector('link[rel="canonical"]');
        if (existingCanonical && existingCanonical.parentNode) {
          existingCanonical.parentNode.removeChild(existingCanonical);
        }

        // Cria nova tag canonical sem query params
        const canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute('href', `${baseUrl}${pathname}`);

        if (document.head) {
          document.head.appendChild(canonical);
        }
      } catch (error) {
        console.error('Error setting canonical URL:', error);
      }
    }, 0);

    // Cleanup ao desmontar
    return () => {
      clearTimeout(timer);
      try {
        const link = document.querySelector('link[rel="canonical"]');
        if (link && link.parentNode) {
          link.parentNode.removeChild(link);
        }
      } catch (error) {
        console.error('Error removing canonical URL:', error);
      }
    };
  }, [pathname, baseUrl, isMounted]);

  return null; // Este componente não renderiza nada visualmente
}
