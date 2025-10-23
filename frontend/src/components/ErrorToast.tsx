'use client';

import { useEffect } from 'react';
import { ApiError } from '@/hooks/useErrorHandler';

interface ErrorToastProps {
  error: ApiError | null;
  onClose: () => void;
  duration?: number;
  onRetry?: () => void;
}

export default function ErrorToast({
  error,
  onClose,
  duration = 5000,
  onRetry,
}: ErrorToastProps) {
  useEffect(() => {
    if (error && !onRetry) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [error, duration, onClose, onRetry]);

  if (!error) return null;

  const getIcon = () => {
    switch (error.statusCode) {
      case 404:
        return '🔍';
      case 401:
      case 403:
        return '🔒';
      case 500:
        return '🔥';
      default:
        return '⚠️';
    }
  };

  const getColorClasses = () => {
    if (error.code === 'NETWORK_ERROR') {
      return 'bg-yellow-50 border-yellow-200 text-yellow-900';
    }
    return 'bg-red-50 border-red-200 text-red-900';
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] max-w-md animate-in slide-in-from-right-5 fade-in duration-300">
      <div className={`${getColorClasses()} border-l-4 rounded-lg shadow-xl p-4`}>
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0" aria-hidden="true">
            {getIcon()}
          </span>

          <div className="flex-1 min-w-0">
            <h4 className="font-bold mb-1">
              {error.code === 'NETWORK_ERROR' ? 'Sem conexão' : 'Erro'}
            </h4>
            <p className="text-sm leading-relaxed">
              {error.message}
            </p>

            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-3 text-sm font-semibold underline hover:no-underline focus-visible:no-underline focus-visible:outline-none"
              >
                Tentar novamente
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar notificação"
            className="flex-shrink-0 hover:bg-black/10 rounded p-1 transition-colors focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        {!onRetry && (
          <div className="mt-3 h-1 bg-black/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-current rounded-full transition-all"
              style={{
                width: '100%',
                animation: `shrink ${duration}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
