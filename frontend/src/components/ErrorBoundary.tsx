'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error para serviço de monitoramento (Sentry, etc)
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // TODO: Enviar para Sentry quando configurado
    // Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
  }

  render() {
    if (this.state.hasError) {
      // Renderizar fallback customizado ou padrão
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">😢</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Algo deu errado
            </h2>
            <p className="text-gray-600 mb-6">
              Desculpe, ocorreu um erro inesperado. Nossa equipe já foi notificada.
            </p>
            {this.state.error && process.env.NODE_ENV === 'development' && (
              <details className="text-left mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <summary className="cursor-pointer font-semibold text-red-900 mb-2">
                  Detalhes do erro (desenvolvimento)
                </summary>
                <pre className="text-xs text-red-800 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <div className="space-y-3">
              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-accent"
              >
                Tentar novamente
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-accent"
              >
                Voltar para a página inicial
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
