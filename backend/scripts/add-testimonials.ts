/**
 * Script para adicionar depoimentos do WhatsApp ao banco de dados
 * As imagens já estão em /depoimentos/*.jpeg
 *
 * Uso: npx ts-node scripts/add-testimonials.ts
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const TENANT_ID = '3aac40a2-42a8-4db4-8f46-d044844c618d';
const BACKEND_URL = process.env.BACKEND_URL || 'https://backend-production1.up.railway.app';

// Depoimentos baseados nas imagens do WhatsApp
const testimonials = [
  {
    customerName: 'Cliente Satisfeito 1',
    customerCity: 'São Paulo, SP',
    rating: 5,
    comment: 'Produto de excelente qualidade! Recomendo muito.',
    mediaType: 'image' as const,
    productName: 'Cannabis Premium',
    usageDuration: '1 mês',
    resultType: 'Excelente',
  },
  {
    customerName: 'Cliente Satisfeito 2',
    customerCity: 'Rio de Janeiro, RJ',
    rating: 5,
    comment: 'Atendimento impecável e entrega rápida.',
    mediaType: 'image' as const,
    productName: 'CBD Premium',
    usageDuration: '2 semanas',
    resultType: 'Ótimo',
  },
  {
    customerName: 'Cliente Satisfeito 3',
    customerCity: 'Belo Horizonte, MG',
    rating: 5,
    comment: 'Melhor experiência que já tive. Produto top!',
    mediaType: 'image' as const,
    productName: 'Indica Premium',
    usageDuration: '3 semanas',
    resultType: 'Excelente',
  },
  {
    customerName: 'Cliente Satisfeito 4',
    customerCity: 'Curitiba, PR',
    rating: 5,
    comment: 'Qualidade incomparável. Virou meu fornecedor oficial.',
    mediaType: 'image' as const,
    productName: 'Sativa Premium',
    usageDuration: '1 mês',
    resultType: 'Excelente',
  },
  {
    customerName: 'Cliente Satisfeito 5',
    customerCity: 'Porto Alegre, RS',
    rating: 5,
    comment: 'Superou todas as expectativas!',
    mediaType: 'image' as const,
    productName: 'Híbrida Premium',
    usageDuration: '2 meses',
    resultType: 'Excelente',
  },
  {
    customerName: 'Cliente Satisfeito 6',
    customerCity: 'Brasília, DF',
    rating: 5,
    comment: 'Produto de alta qualidade, entrega discreta.',
    mediaType: 'image' as const,
    productName: 'Delta 9 Premium',
    usageDuration: '3 semanas',
    resultType: 'Ótimo',
  },
  {
    customerName: 'Cliente Satisfeito 7',
    customerCity: 'Salvador, BA',
    rating: 5,
    comment: 'Recomendo! Melhor custo-benefício.',
    mediaType: 'image' as const,
    productName: 'THC-P Premium',
    usageDuration: '1 mês',
    resultType: 'Excelente',
  },
  {
    customerName: 'Cliente Satisfeito 8',
    customerCity: 'Fortaleza, CE',
    rating: 5,
    comment: 'Atendimento nota 10 e produto incrível.',
    mediaType: 'image' as const,
    productName: 'Cannabis Flower',
    usageDuration: '2 semanas',
    resultType: 'Excelente',
  },
  {
    customerName: 'Cliente Satisfeito 9',
    customerCity: 'Recife, PE',
    rating: 5,
    comment: 'Qualidade premium, entrega rápida!',
    mediaType: 'image' as const,
    productName: 'Vape Cartridge',
    usageDuration: '3 semanas',
    resultType: 'Ótimo',
  },
  {
    customerName: 'Cliente Satisfeito 10',
    customerCity: 'Manaus, AM',
    rating: 5,
    comment: 'Produto excepcional! Voltarei a comprar.',
    mediaType: 'image' as const,
    productName: 'Edibles Premium',
    usageDuration: '1 mês',
    resultType: 'Excelente',
  },
  {
    customerName: 'Cliente Satisfeito 11',
    customerCity: 'Belém, PA',
    rating: 5,
    comment: 'Melhor experiência de compra. Recomendo!',
    mediaType: 'image' as const,
    productName: 'Concentrado Premium',
    usageDuration: '2 meses',
    resultType: 'Excelente',
  },
];

async function addTestimonials() {
  console.log('🔧 Iniciando adição de depoimentos do WhatsApp...\n');

  try {
    // Buscar imagens na pasta depoimentos
    const depoimentosPath = path.join(__dirname, '../../depoimentos');

    if (!fs.existsSync(depoimentosPath)) {
      console.error(`❌ Pasta não encontrada: ${depoimentosPath}`);
      return;
    }

    const imageFiles = fs
      .readdirSync(depoimentosPath)
      .filter((file) => file.endsWith('.jpeg'))
      .sort();

    console.log(`📸 Imagens encontradas: ${imageFiles.length}\n`);

    if (imageFiles.length === 0) {
      console.error('❌ Nenhuma imagem encontrada na pasta depoimentos');
      return;
    }

    let addedCount = 0;

    for (let i = 0; i < Math.min(imageFiles.length, testimonials.length); i++) {
      const imageFile = imageFiles[i];
      const testimonial = testimonials[i];

      // Construir URL da imagem
      // As imagens precisam ser servidas pelo backend
      const mediaUrl = `${BACKEND_URL}/uploads/images/testimonials/${imageFile}`;

      // Criar depoimento
      const review = await prisma.defaultReview.create({
        data: {
          tenantId: TENANT_ID,
          customerName: testimonial.customerName,
          customerCity: testimonial.customerCity,
          rating: testimonial.rating,
          comment: testimonial.comment,
          mediaUrl: mediaUrl,
          mediaType: testimonial.mediaType,
          productName: testimonial.productName,
          usageDuration: testimonial.usageDuration,
          resultType: testimonial.resultType,
          isActive: true,
          isFeatured: i < 6, // Primeiros 6 como featured
          showOnHome: i < 6, // Primeiros 6 na home
          showOnProducts: true,
          order: i + 1,
        },
      });

      console.log(`✅ Depoimento ${i + 1} adicionado:`);
      console.log(`   Cliente: ${testimonial.customerName}`);
      console.log(`   Imagem: ${imageFile}`);
      console.log(`   URL: ${mediaUrl}`);
      console.log(`   Featured: ${i < 6 ? 'Sim' : 'Não'}\n`);

      addedCount++;
    }

    console.log('\n📊 RELATÓRIO FINAL:');
    console.log(`   ✅ Depoimentos adicionados: ${addedCount}`);
    console.log(`   📸 Imagens utilizadas: ${addedCount}`);
    console.log(`   ⭐ Featured (Home): ${Math.min(6, addedCount)}`);
    console.log(`   📦 Todos em produtos: Sim`);

    console.log('\n💡 PRÓXIMOS PASSOS:');
    console.log('   1. Copiar imagens para backend/uploads/images/testimonials/');
    console.log('   2. Fazer deploy do backend com as imagens');
    console.log('   3. Verificar no painel admin em /admin/depoimentos');
    console.log('   4. Verificar na home do site');

  } catch (error) {
    console.error('\n❌ Erro ao adicionar depoimentos:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar script
addTestimonials()
  .then(() => {
    console.log('\n✅ Script concluído com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script falhou:', error);
    process.exit(1);
  });
