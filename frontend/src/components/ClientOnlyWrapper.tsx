'use client';

import { useEffect, useState, ReactNode } from 'react';

interface ClientOnlyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * SOLUÇÃO DEFINITIVA PARA HYDRATION ERRORS
 *
 * Este wrapper garante que o conteúdo só é renderizado no cliente,
 * eliminando COMPLETAMENTE qualquer possibilidade de hydration mismatch.
 *
 * USO: Envolva qualquer componente problemático com este wrapper.
 */
export default function ClientOnlyWrapper({
  children,
  fallback = null
}: ClientOnlyWrapperProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}