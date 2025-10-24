import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
console.log('[API] Inicializando com baseURL:', apiUrl);

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos timeout
});

// Interceptor para adicionar token JWT em todas as requisições
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log estruturado do erro
    console.error('[API Error]', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });

    // Tratamento específico por status code
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - limpar token e redirecionar para login (se necessário)
          if (typeof window !== 'undefined' && error.config?.url?.includes('/admin/')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Apenas redirecionar se não estiver tentando fazer login
            if (!error.config?.url?.includes('/login')) {
              window.location.href = '/admin/login';
            }
          }
          break;

        case 403:
          // Forbidden
          console.warn('[API] Acesso negado:', error.config?.url);
          break;

        case 404:
          // Not Found - já tratado por componente
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          // Server Errors
          console.error('[API] Erro no servidor');
          break;
      }
    } else if (error.request) {
      // Network Error
      console.error('[API] Erro de rede - servidor não respondeu');
    }

    // Propagar erro para ser tratado nos componentes
    return Promise.reject(error);
  }
);

export default api;
