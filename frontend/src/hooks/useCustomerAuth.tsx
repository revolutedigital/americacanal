'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import api from '@/lib/api';

interface Customer {
  id: string;
  email: string;
  name: string;
  phone?: string;
  cpf?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface CustomerAuthContextType {
  customer: Customer | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<Customer>) => Promise<{ success: boolean; error?: string }>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  cpf?: string;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

const TENANT_ID = '0fb61585-3cb3-48b3-ae76-0a5358084a8c'; // TODO: Get from environment or tenant resolution

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('customerToken');
    if (token) {
      // Verify token and get customer profile
      api.get('/api/customers/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setCustomer(response.data);
        })
        .catch(() => {
          localStorage.removeItem('customerToken');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/api/customers/login', {
        tenantId: TENANT_ID,
        email,
        password,
      });

      const { token, customer: customerData } = response.data;
      localStorage.setItem('customerToken', token);
      setCustomer(customerData);

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao fazer login',
      };
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await api.post('/api/customers/register', {
        tenantId: TENANT_ID,
        ...data,
      });

      const { token, customer: customerData } = response.data;
      localStorage.setItem('customerToken', token);
      setCustomer(customerData);

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao criar conta',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('customerToken');
    setCustomer(null);
    window.location.href = '/';
  };

  const updateProfile = async (data: Partial<Customer>) => {
    try {
      const token = localStorage.getItem('customerToken');
      const response = await api.put('/api/customers/me', data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCustomer(response.data);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao atualizar perfil',
      };
    }
  };

  return (
    <CustomerAuthContext.Provider value={{ customer, isLoading, login, register, logout, updateProfile }}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);
  if (context === undefined) {
    throw new Error('useCustomerAuth must be used within CustomerAuthProvider');
  }
  return context;
}
