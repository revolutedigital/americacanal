import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production';
const JWT_EXPIRES_IN = '7d';

export const generateToken = (payload: UserPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): UserPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
