'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { User, LoginCredentials } from '@/lib/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.get('/api/auth/me');
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    console.log('[LOGIN] Iniciando login...', credentials.email);
    try {
      console.log('[LOGIN] Fazendo requisição para /api/auth/login');
      const response = await api.post('/api/auth/login', credentials);
      console.log('[LOGIN] Resposta recebida:', response.data);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      setUser(user);

      console.log('[LOGIN] Redirecionando para dashboard...');
      // Usar window.location ao invés de router.push para evitar conflitos
      window.location.href = '/admin/dashboard';

      return { success: true };
    } catch (error: any) {
      console.error('[LOGIN] Erro:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao fazer login',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/admin/login');
  };

  return { user, loading, login, logout, checkAuth };
}
