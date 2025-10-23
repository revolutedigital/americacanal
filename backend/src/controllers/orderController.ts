import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Generate order number (format: AC-YYYYMMDD-XXXXX)
function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5, '0');

  return `AC-${year}${month}${day}-${random}`;
}

// POST /api/orders - Create order (can be guest or customer)
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      tenantId,
      customerId,
      customerName,
      customerEmail,
      customerPhone,
      items, // [{ productId, quantity, variantId? }]
      deliveryAddress,
      deliveryCity,
      deliveryState,
      deliveryZipCode,
      couponCode,
      customerNotes,
      whatsappConversationUrl,
    } = req.body;

    // Validation
    if (!tenantId || !customerName || !customerEmail || !customerPhone || !items || items.length === 0) {
      res.status(400).json({ error: 'Dados obrigatórios faltando' });
      return;
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: {
          variants: true,
        },
      });

      if (!product) {
        res.status(404).json({ error: `Produto ${item.productId} não encontrado` });
        return;
      }

      // Get price (from variant or product)
      let price = product.price;
      let variantInfo = null;

      if (item.variantId) {
        const variant = product.variants.find((v) => v.id === item.variantId);
        if (variant && variant.price) {
          price = variant.price;
        }
        if (variant) {
          variantInfo = variant.options;
        }
      }

      const itemTotal = Number(price) * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: {
          connect: { id: item.productId },
        },
        productName: product.name,
        productSku: product.sku,
        imageUrl: product.imageUrl,
        quantity: item.quantity,
        price: price,
        total: itemTotal,
        ...(variantInfo && { variantInfo }),
      });
    }

    // Apply coupon discount
    let discount = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: {
          tenantId_code: {
            tenantId,
            code: couponCode.toUpperCase(),
          },
        },
      });

      if (coupon && coupon.isActive) {
        // Check validity
        const now = new Date();
        const isValid =
          (!coupon.startsAt || coupon.startsAt <= now) &&
          (!coupon.expiresAt || coupon.expiresAt >= now) &&
          (!coupon.usageLimit || coupon.usageCount < coupon.usageLimit) &&
          (!coupon.minPurchase || subtotal >= Number(coupon.minPurchase));

        if (isValid) {
          if (coupon.type === 'percentage') {
            discount = subtotal * (Number(coupon.value) / 100);
            if (coupon.maxDiscount && discount > Number(coupon.maxDiscount)) {
              discount = Number(coupon.maxDiscount);
            }
          } else if (coupon.type === 'fixed') {
            discount = Number(coupon.value);
          }

          // Update coupon usage
          await prisma.coupon.update({
            where: { id: coupon.id },
            data: {
              usageCount: {
                increment: 1,
              },
            },
          });
        }
      }
    }

    const total = subtotal - discount;
    const orderNumber = generateOrderNumber();

    // Create order
    const order = await prisma.order.create({
      data: {
        tenantId,
        customerId: customerId || null,
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        subtotal,
        discount,
        total,
        couponCode: couponCode ? couponCode.toUpperCase() : null,
        deliveryAddress,
        deliveryCity,
        deliveryState,
        deliveryZipCode,
        customerNotes,
        whatsappConversationUrl,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Update product order counts
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          orderCount: {
            increment: item.quantity,
          },
        },
      });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
};

// GET /api/orders/:orderNumber - Get order by number (public with order number)
export const getOrderByNumber = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderNumber } = req.params;

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: {
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
        },
      },
    });

    if (!order) {
      res.status(404).json({ error: 'Pedido não encontrado' });
      return;
    }

    res.json(order);
  } catch (error) {
    console.error('Get order by number error:', error);
    res.status(500).json({ error: 'Erro ao buscar pedido' });
  }
};

// GET /api/orders/admin - Get all orders (admin protected)
export const getAllOrdersAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId, status } = req.query;

    if (!tenantId) {
      res.status(400).json({ error: 'tenantId é obrigatório' });
      return;
    }

    const orders = await prisma.order.findMany({
      where: {
        tenantId: tenantId as string,
        ...(status && { status: status as string }),
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
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(orders);
  } catch (error) {
    console.error('Get all orders admin error:', error);
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
};

// PUT /api/orders/:id/status - Update order status (admin protected)
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

    if (!status || !validStatuses.includes(status)) {
      res.status(400).json({ error: 'Status inválido' });
      return;
    }

    const order = await prisma.order.update({
      where: { id },
      data: {
        status,
        ...(adminNotes !== undefined && { adminNotes }),
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json(order);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Erro ao atualizar status do pedido' });
  }
};

// PUT /api/orders/:id - Update order details (admin protected)
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      deliveryCity,
      deliveryState,
      deliveryZipCode,
      whatsappConversationUrl,
      adminNotes,
      customerNotes,
    } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(customerName && { customerName }),
        ...(customerEmail && { customerEmail }),
        ...(customerPhone && { customerPhone }),
        ...(deliveryAddress !== undefined && { deliveryAddress }),
        ...(deliveryCity !== undefined && { deliveryCity }),
        ...(deliveryState !== undefined && { deliveryState }),
        ...(deliveryZipCode !== undefined && { deliveryZipCode }),
        ...(whatsappConversationUrl !== undefined && { whatsappConversationUrl }),
        ...(adminNotes !== undefined && { adminNotes }),
        ...(customerNotes !== undefined && { customerNotes }),
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json(order);
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ error: 'Erro ao atualizar pedido' });
  }
};

// GET /api/orders/stats - Get order statistics (admin protected)
export const getOrderStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId } = req.query;

    if (!tenantId) {
      res.status(400).json({ error: 'tenantId é obrigatório' });
      return;
    }

    const totalOrders = await prisma.order.count({
      where: { tenantId: tenantId as string },
    });

    const ordersByStatus = await prisma.order.groupBy({
      by: ['status'],
      where: { tenantId: tenantId as string },
      _count: true,
    });

    const totalRevenue = await prisma.order.aggregate({
      where: {
        tenantId: tenantId as string,
        status: {
          in: ['confirmed', 'processing', 'shipped', 'delivered'],
        },
      },
      _sum: {
        total: true,
      },
    });

    res.json({
      totalOrders,
      ordersByStatus,
      totalRevenue: totalRevenue._sum.total || 0,
    });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
};
