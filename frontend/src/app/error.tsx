'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error para serviço de monitoramento
    console.error('[Global Error]', error);

    // TODO: Enviar para Sentry
    // Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="text-7xl mb-6 animate-bounce">💥</div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Ops! Algo deu errado
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Desculpe pelo inconveniente. Ocorreu um erro inesperado, mas nossa equipe já foi notificada
          e está trabalhando para resolver.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="text-left mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <summary className="cursor-pointer font-semibold text-red-900 mb-2">
              Detalhes técnicos (modo desenvolvimento)
            </summary>
            <pre className="text-xs text-red-800 overflow-auto mt-2 p-3 bg-red-100 rounded">
              {error.message}
              {'\n\n'}
              {error.stack}
            </pre>
            {error.digest && (
              <p className="text-xs text-red-700 mt-2">
                Error Digest: {error.digest}
              </p>
            )}
          </details>
        )}

        <div className="space-y-3">
          <button
            onClick={() => reset()}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            Tentar Novamente
          </button>

          <Link
            href="/"
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            Voltar para a Página Inicial
          </Link>

          <a
            href="https://wa.me/595982574068?text=Ol%C3%A1!%20Encontrei%20um%20erro%20no%20site"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:outline-none"
          >
            Reportar Problema no WhatsApp
          </a>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Se o problema persistir, entre em contato conosco.
        </p>
      </div>
    </div>
  );
}
