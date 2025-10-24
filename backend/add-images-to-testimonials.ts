import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Imagens disponíveis de banners que podem ser usadas como depoimentos
const availableImages = [
  'https://backend-production1.up.railway.app/uploads/images/banners/0cbc4bef-7b6d-4c4f-b3fb-afffa8f77600.jpg',
  'https://backend-production1.up.railway.app/uploads/images/banners/12d34f35-c7fa-4477-935b-dcaf05709092.jpg',
  'https://backend-production1.up.railway.app/uploads/images/banners/1940d3cc-5e12-4f14-86b8-50b89ec1405d.jpg',
  'https://backend-production1.up.railway.app/uploads/images/banners/360d0152-f865-4ecc-82a0-f64a81044d18.jpg',
  'https://backend-production1.up.railway.app/uploads/images/banners/83dd452f-de23-4340-8c31-217953593481.jpg',
  'https://backend-production1.up.railway.app/uploads/images/banners/b05a4c02-4b7e-42c8-b3e0-0b07eb2b05c2.jpg',
  'https://backend-production1.up.railway.app/uploads/images/banners/ba8dec1d-bafd-475e-8d16-9866d40221a0.jpg',
  'https://backend-production1.up.railway.app/uploads/images/banners/dbe83c55-d8ed-4c50-806f-94f6c9a384be.jpg',
  'https://backend-production1.up.railway.app/uploads/images/banners/f7f2ca5f-028f-4d56-b8f9-a15ba49fedc7.jpg',
];

async function addImagesToTestimonials() {
  console.log('🖼️  Adding images to testimonials...');

  try {
    // Buscar todos os depoimentos sem imagem
    const reviewsWithoutMedia = await prisma.defaultReview.findMany({
      where: {
        mediaUrl: null,
        showOnHome: true,
      },
      take: 9, // Limitar aos primeiros 9 para ter 9 imagens
    });

    console.log(`📊 Found ${reviewsWithoutMedia.length} testimonials without images`);

    if (reviewsWithoutMedia.length === 0) {
      console.log('✅ All testimonials already have images!');
      return;
    }

    // Atribuir uma imagem diferente para cada depoimento
    let updated = 0;
    for (let i = 0; i < reviewsWithoutMedia.length && i < availableImages.length; i++) {
      const review = reviewsWithoutMedia[i];
      const imageUrl = availableImages[i];

      await prisma.defaultReview.update({
        where: { id: review.id },
        data: {
          mediaUrl: imageUrl,
          mediaType: 'image',
        },
      });

      console.log(`✅ Updated testimonial ${review.id} with image ${i + 1}`);
      updated++;
    }

    console.log(`\n✨ Successfully added images to ${updated} testimonials!`);

  } catch (error) {
    console.error('❌ Error adding images to testimonials:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addImagesToTestimonials()
  .then(() => {
    console.log('\n✅ Task completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Task failed:', error);
    process.exit(1);
  });
