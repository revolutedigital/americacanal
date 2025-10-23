'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const generateId = () => `toast-${Date.now()}-${Math.random()}`;

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = generateId();
    const newToast: Toast = { id, ...toast };

    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss se tiver duração definida
    if (toast.duration !== undefined && toast.duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, toast.duration);
    }
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message: string, duration = 5000) => {
      showToast({ type: 'success', message, duration });
    },
    [showToast]
  );

  const error = useCallback(
    (message: string, duration = 5000) => {
      showToast({ type: 'error', message, duration });
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string, duration = 5000) => {
      showToast({ type: 'warning', message, duration });
    },
    [showToast]
  );

  const info = useCallback(
    (message: string, duration = 5000) => {
      showToast({ type: 'info', message, duration });
    },
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        hideToast,
        success,
        error,
        warning,
        info,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
