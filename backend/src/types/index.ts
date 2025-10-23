import { Request } from 'express';

export interface UserPayload {
  id: string;
  email: string;
  name?: string;
  tenantId: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    tenantId: string;
  };
}

export interface ProductCreateRequest {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  isActive: boolean;
}

export interface ProductUpdateRequest {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  stock?: number;
  isActive?: boolean;
}
