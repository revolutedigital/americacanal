'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ContaError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log do erro (você pode enviar para um serviço de monitoramento)
    console.error('Erro na área de conta:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ops! Algo deu errado
        </h2>
        <p className="text-gray-600 mb-6">
          Encontramos um problema ao carregar esta página. Por favor, tente novamente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Tentar novamente
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}