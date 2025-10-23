export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  imageUrl: string;
  images?: string[];
  stock: number;
  lowStockAlert?: number;
  isActive: boolean;
  categoryId?: string;
  brandId?: string;
  brand?: {
    id: string;
    name: string;
    slug: string;
  };
  type?: 'INDICA' | 'SATIVA' | 'HIBRIDA';
  faqs?: FAQ[];
  relatedTo?: { relatedProductId: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  imageUrl: string;
  images?: string[];
  stock: number;
  lowStockAlert?: number;
  isActive: boolean;
  categoryId?: string;
  brandId?: string;
  type?: string;
  faqs?: FAQ[];
  relatedProductIds?: string[];
}

export interface FAQ {
  id?: string;
  question: string;
  answer: string;
  isActive: boolean;
  order: number;
}
