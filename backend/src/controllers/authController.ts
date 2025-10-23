import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import { LoginRequest, LoginResponse } from '../types';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as LoginRequest;

    // Validação básica
    if (!email || !password) {
      res.status(400).json({ error: 'Email e senha são obrigatórios' });
      return;
    }

    // Buscar usuário (admin can be from any tenant)
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    // Gerar token JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name || undefined,
      tenantId: user.tenantId,
    });

    const response: LoginResponse = {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name || undefined,
        tenantId: user.tenantId,
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const me = async (req: Request, res: Response): Promise<void> => {
  try {
    // O middleware já validou o token e adicionou req.user
    const authReq = req as any;

    if (!authReq.user) {
      res.status(401).json({ error: 'Não autenticado' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: authReq.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
