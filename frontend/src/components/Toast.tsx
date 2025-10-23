'use client';

import { useEffect, useState } from 'react';
import { Toast as ToastType } from '@/contexts/ToastContext';

interface ToastProps {
  toast: ToastType;
  onClose: () => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (toast.duration && toast.duration > 0 && !toast.action) {
      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.duration, toast.action]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Duração da animação de saída
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getColorClasses = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-500 text-green-900';
      case 'error':
        return 'bg-red-50 border-red-500 text-red-900';
      case 'warning':
        return 'bg-yellow-50 border-yellow-500 text-yellow-900';
      case 'info':
        return 'bg-blue-50 border-blue-500 text-blue-900';
    }
  };

  const getIconColorClasses = () => {
    switch (toast.type) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      case 'info':
        return 'text-blue-600';
    }
  };

  return (
    <div
      className={`${getColorClasses()} border-l-4 rounded-lg shadow-xl p-4 min-w-[320px] max-w-md transition-all duration-300 ${
        isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className={`${getIconColorClasses()} flex-shrink-0`} aria-hidden="true">
          {getIcon()}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-relaxed">
            {toast.message}
          </p>

          {toast.action && (
            <button
              onClick={() => {
                toast.action!.onClick();
                handleClose();
              }}
              className="mt-2 text-sm font-semibold underline hover:no-underline focus-visible:no-underline focus-visible:outline-none"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        <button
          onClick={handleClose}
          aria-label="Fechar notificação"
          className="flex-shrink-0 hover:bg-black/10 rounded p-1 transition-colors focus-visible:ring-2 focus-visible:ring-current focus-visible:outline-none"
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

      {/* Progress bar - apenas se não tiver action e tiver duration */}
      {!toast.action && toast.duration && toast.duration > 0 && (
        <div className="mt-3 h-1 bg-black/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-current rounded-full"
            style={{
              animation: `shrinkWidth ${toast.duration}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes shrinkWidth {
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
