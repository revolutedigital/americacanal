import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Hash da senha 'admin123'
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findFirst({
      where: {
        email: 'admin@americacannabiss.com',
      },
    });

    if (existingUser) {
      console.log('✅ Usuário admin já existe!');
      return;
    }

    // Criar usuário admin
    const admin = await prisma.user.create({
      data: {
        tenantId: '0fb61585-3cb3-48b3-ae76-0a5358084a8c',
        email: 'admin@americacannabiss.com',
        password: hashedPassword,
        name: 'Administrator',
        role: 'admin',
        isActive: true,
      },
    });

    console.log('✅ Usuário admin criado com sucesso!');
    console.log('   Email:', admin.email);
    console.log('   Senha: admin123');
  } catch (error) {
    console.error('❌ Erro ao criar admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
