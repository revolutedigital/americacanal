import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const SALT_ROUNDS = 10;

// POST /api/customers/register - Customer registration
export const registerCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId, email, password, name, phone, cpf, address, city, state, zipCode } = req.body;

    // Validation
    if (!tenantId || !email || !password || !name) {
      res.status(400).json({ error: 'tenantId, email, password e name são obrigatórios' });
      return;
    }

    // Check if customer already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: {
        tenantId_email: {
          tenantId,
          email: email.toLowerCase(),
        },
      },
    });

    if (existingCustomer) {
      res.status(400).json({ error: 'Email já cadastrado' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create customer
    const customer = await prisma.customer.create({
      data: {
        tenantId,
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
        phone,
        cpf,
        address,
        city,
        state,
        zipCode,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        cpf: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        createdAt: true,
      },
    });

    // Generate JWT
    const token = jwt.sign(
      {
        customerId: customer.id,
        email: customer.email,
        tenantId,
        type: 'customer',
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({ customer, token });
  } catch (error) {
    console.error('Register customer error:', error);
    res.status(500).json({ error: 'Erro ao registrar cliente' });
  }
};

// POST /api/customers/login - Customer login
export const loginCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId, email, password } = req.body;

    if (!tenantId || !email || !password) {
      res.status(400).json({ error: 'tenantId, email e password são obrigatórios' });
      return;
    }

    // Find customer
    const customer = await prisma.customer.findUnique({
      where: {
        tenantId_email: {
          tenantId,
          email: email.toLowerCase(),
        },
      },
    });

    if (!customer) {
      res.status(401).json({ error: 'Email ou senha incorretos' });
      return;
    }

    // Check if active
    if (!customer.isActive) {
      res.status(401).json({ error: 'Conta desativada' });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Email ou senha incorretos' });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      {
        customerId: customer.id,
        email: customer.email,
        tenantId,
        type: 'customer',
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Return customer data without password
    const { password: _, ...customerData } = customer;

    res.json({ customer: customerData, token });
  } catch (error) {
    console.error('Login customer error:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

// GET /api/customers/me - Get current customer profile
export const getCustomerProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore - customerId is set by auth middleware
    const customerId = req.customerId;

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        cpf: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        country: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!customer) {
      res.status(404).json({ error: 'Cliente não encontrado' });
      return;
    }

    res.json(customer);
  } catch (error) {
    console.error('Get customer profile error:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
};

// PUT /api/customers/me - Update customer profile
export const updateCustomerProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore - customerId is set by auth middleware
    const customerId = req.customerId;
    const { name, phone, cpf, address, city, state, zipCode, country } = req.body;

    const customer = await prisma.customer.update({
      where: { id: customerId },
      data: {
        ...(name && { name }),
        ...(phone !== undefined && { phone }),
        ...(cpf !== undefined && { cpf }),
        ...(address !== undefined && { address }),
        ...(city !== undefined && { city }),
        ...(state !== undefined && { state }),
        ...(zipCode !== undefined && { zipCode }),
        ...(country !== undefined && { country }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        cpf: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        country: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json(customer);
  } catch (error) {
    console.error('Update customer profile error:', error);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
};

// PUT /api/customers/me/password - Change customer password
export const changeCustomerPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore - customerId is set by auth middleware
    const customerId = req.customerId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({ error: 'Senha atual e nova senha são obrigatórias' });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({ error: 'Nova senha deve ter pelo menos 6 caracteres' });
      return;
    }

    // Get customer
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      res.status(404).json({ error: 'Cliente não encontrado' });
      return;
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, customer.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Senha atual incorreta' });
      return;
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    // Update password
    await prisma.customer.update({
      where: { id: customerId },
      data: { password: hashedPassword },
    });

    res.json({ message: 'Senha alterada com sucesso' });
  } catch (error) {
    console.error('Change customer password error:', error);
    res.status(500).json({ error: 'Erro ao alterar senha' });
  }
};

// GET /api/customers/me/orders - Get customer orders
export const getCustomerOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore - customerId is set by auth middleware
    const customerId = req.customerId;

    const orders = await prisma.order.findMany({
      where: { customerId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(orders);
  } catch (error) {
    console.error('Get customer orders error:', error);
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
};

// GET /api/customers/me/reviews - Get customer reviews
export const getCustomerReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore - customerId is set by auth middleware
    const customerId = req.customerId;

    const reviews = await prisma.review.findMany({
      where: { customerId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(reviews);
  } catch (error) {
    console.error('Get customer reviews error:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliações' });
  }
};
