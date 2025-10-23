'use client';

import { useState, useCallback } from 'react';

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: any;
}

interface ErrorState {
  error: ApiError | null;
  isError: boolean;
}

export function useErrorHandler() {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isError: false,
  });

  const handleError = useCallback((error: any) => {
    console.error('[ErrorHandler]', error);

    let apiError: ApiError;

    // Axios error
    if (error.response) {
      apiError = {
        message: error.response.data?.message || 'Ocorreu um erro no servidor',
        code: error.response.data?.code || 'SERVER_ERROR',
        statusCode: error.response.status,
        details: error.response.data,
      };
    }
    // Network error
    else if (error.request) {
      apiError = {
        message: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
        code: 'NETWORK_ERROR',
        statusCode: 0,
      };
    }
    // Other errors
    else {
      apiError = {
        message: error.message || 'Ocorreu um erro inesperado',
        code: 'UNKNOWN_ERROR',
      };
    }

    setErrorState({
      error: apiError,
      isError: true,
    });

    // TODO: Enviar para serviço de logging (Sentry)
    // Sentry.captureException(error, { extra: apiError });

    return apiError;
  }, []);

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      isError: false,
    });
  }, []);

  return {
    error: errorState.error,
    isError: errorState.isError,
    handleError,
    clearError,
  };
}

// Hook para tratamento simplificado de erros de API
export function useApiError() {
  const { error, isError, handleError, clearError } = useErrorHandler();

  const getUserMessage = (error: ApiError | null): string => {
    if (!error) return '';

    // Mensagens customizadas por código
    const messageMap: Record<string, string> = {
      'UNAUTHORIZED': 'Você precisa estar logado para realizar esta ação',
      'FORBIDDEN': 'Você não tem permissão para realizar esta ação',
      'NOT_FOUND': 'O recurso solicitado não foi encontrado',
      'VALIDATION_ERROR': 'Por favor, verifique os dados informados',
      'NETWORK_ERROR': 'Sem conexão com a internet. Tente novamente.',
      'SERVER_ERROR': 'Erro no servidor. Tente novamente em alguns instantes.',
    };

    return messageMap[error.code || ''] || error.message;
  };

  const canRetry = (error: ApiError | null): boolean => {
    if (!error) return false;

    const retryableCodes = ['NETWORK_ERROR', 'SERVER_ERROR', 'TIMEOUT_ERROR'];
    return retryableCodes.includes(error.code || '');
  };

  return {
    error,
    isError,
    handleError,
    clearError,
    getUserMessage,
    canRetry,
  };
}
