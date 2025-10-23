import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

interface CustomerTokenPayload {
  customerId: string;
  email: string;
  tenantId: string;
  type: 'customer';
}

export const customerAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      res.status(401).json({ error: 'Formato de token inválido' });
      return;
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      res.status(401).json({ error: 'Token mal formatado' });
      return;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as CustomerTokenPayload;

      // Verify it's a customer token
      if (decoded.type !== 'customer') {
        res.status(401).json({ error: 'Token inválido para esta operação' });
        return;
      }

      // Attach customer info to request
      // @ts-ignore
      req.customerId = decoded.customerId;
      // @ts-ignore
      req.customerEmail = decoded.email;
      // @ts-ignore
      req.tenantId = decoded.tenantId;

      next();
    } catch (error) {
      res.status(401).json({ error: 'Token inválido ou expirado' });
      return;
    }
  } catch (error) {
    console.error('Customer auth middleware error:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Optional auth - doesn't require token but attaches customer if present
export const optionalCustomerAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      next();
      return;
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      next();
      return;
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      next();
      return;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as CustomerTokenPayload;

      if (decoded.type === 'customer') {
        // @ts-ignore
        req.customerId = decoded.customerId;
        // @ts-ignore
        req.customerEmail = decoded.email;
        // @ts-ignore
        req.tenantId = decoded.tenantId;
      }
    } catch (error) {
      // Silently fail for optional auth
    }

    next();
  } catch (error) {
    next();
  }
};
