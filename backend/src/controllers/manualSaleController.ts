import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ManualSaleItem {
  productId: string;
  quantity: number;
  price: number;
}

interface ManualSaleData {
  items: ManualSaleItem[];
  customerName?: string;
  customerPhone?: string;
  notes?: string;
  paymentMethod?: string;
}

// Registrar venda manual
export const createManualSale = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items, customerName, customerPhone, notes, paymentMethod }: ManualSaleData = req.body;
    const userId = (req as any).user?.id;

    if (!items || items.length === 0) {
      res.status(400).json({ error: 'Nenhum item informado' });
      return;
    }

    // Validar estoque antes de processar
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: { stock: true, name: true, trackStock: true },
      });

      if (!product) {
        res.status(404).json({ error: `Produto ${item.productId} não encontrado` });
        return;
      }

      if (product.trackStock && product.stock < item.quantity) {
        res.status(400).json({
          error: `Estoque insuficiente para ${product.name}. Disponível: ${product.stock}, Solicitado: ${item.quantity}`,
        });
        return;
      }
    }

    // Calcular total
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Criar a venda em uma transação
    const sale = await prisma.$transaction(async (tx) => {
      // Buscar detalhes dos produtos
      const productsData = await Promise.all(
        items.map(async (item) => {
          const product = await tx.product.findUnique({
            where: { id: item.productId },
            select: { name: true, imageUrl: true },
          });
          return { ...item, product };
        })
      );

      // Gerar número do pedido
      const orderNumber = `MANUAL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Criar o pedido (usando a tabela Order existente)
      const order = await tx.order.create({
        data: {
          tenantId: (req as any).user?.tenantId,
          orderNumber,
          customerName: customerName || 'Venda Manual',
          customerPhone: customerPhone || '',
          customerEmail: '',
          subtotal: total.toString(),
          discount: '0',
          total: total.toString(),
          status: 'completed',
          adminNotes: `${notes ? notes + ' | ' : ''}Venda manual - Pagamento: ${paymentMethod || 'Dinheiro'}`,
          items: {
            create: productsData.map((item) => ({
              productId: item.productId,
              productName: item.product?.name || 'Produto',
              imageUrl: item.product?.imageUrl,
              quantity: item.quantity,
              price: item.price.toString(),
              total: (item.price * item.quantity).toString(),
            })),
          },
        },
        include: {
          items: {
            include: {
              product: {
                select: {
                  name: true,
                  imageUrl: true,
                },
              },
            },
          },
        },
      });

      // Atualizar estoque de cada produto
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity },
            orderCount: { increment: 1 },
          },
        });
      }

      return order;
    });

    res.status(201).json({
      success: true,
      message: 'Venda registrada com sucesso',
      order: sale,
    });
  } catch (error) {
    console.error('Error creating manual sale:', error);
    res.status(500).json({ error: 'Erro ao registrar venda' });
  }
};

// Buscar histórico de vendas
export const getSalesHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const tenantId = (req as any).user?.tenantId;
    const { startDate, endDate, status } = req.query;

    const where: any = { tenantId };

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate as string);
      if (endDate) where.createdAt.lte = new Date(endDate as string);
    }

    if (status) {
      where.status = status;
    }

    const sales = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                imageUrl: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    res.json(sales);
  } catch (error) {
    console.error('Error fetching sales history:', error);
    res.status(500).json({ error: 'Erro ao buscar histórico de vendas' });
  }
};

// Estatísticas de vendas
export const getSalesStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const tenantId = (req as any).user?.tenantId;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Vendas de hoje
    const todaySales = await prisma.order.aggregate({
      where: {
        tenantId,
        status: 'completed',
        createdAt: { gte: today },
      },
      _sum: { total: true },
      _count: true,
    });

    // Vendas do mês
    const monthSales = await prisma.order.aggregate({
      where: {
        tenantId,
        status: 'completed',
        createdAt: { gte: thisMonth },
      },
      _sum: { total: true },
      _count: true,
    });

    // Produtos mais vendidos
    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      where: {
        order: {
          tenantId,
          status: 'completed',
        },
      },
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 10,
    });

    // Buscar detalhes dos produtos
    const topProductsWithDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          select: {
            id: true,
            name: true,
            imageUrl: true,
            price: true,
          },
        });
        return {
          product,
          quantitySold: item._sum.quantity || 0,
        };
      })
    );

    res.json({
      today: {
        total: parseFloat(todaySales._sum.total?.toString() || '0'),
        count: todaySales._count,
      },
      month: {
        total: parseFloat(monthSales._sum.total?.toString() || '0'),
        count: monthSales._count,
      },
      topProducts: topProductsWithDetails,
    });
  } catch (error) {
    console.error('Error fetching sales stats:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
};
