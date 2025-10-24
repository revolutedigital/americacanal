import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function fixImageUrls() {
  console.log('🔄 Starting image URL migration...');

  const OLD_URL = 'http://localhost:4000';
  const NEW_URL = 'https://backend-production1.up.railway.app';

  try {
    // Raw SQL queries for better performance

    // 1. Update Product imageUrl
    await prisma.$executeRaw`
      UPDATE "Product"
      SET "imageUrl" = REPLACE("imageUrl", ${OLD_URL}, ${NEW_URL})
      WHERE "imageUrl" LIKE '%localhost%'
    `;
    console.log('✅ Updated Product imageUrl');

    // 2. Update Product images array
    await prisma.$executeRaw`
      UPDATE "Product"
      SET images = ARRAY(
        SELECT REPLACE(unnest(images)::text, ${OLD_URL}, ${NEW_URL})
      )
      WHERE images::text LIKE '%localhost%'
    `;
    console.log('✅ Updated Product images array');

    // 3. Update Banner imageUrl
    await prisma.$executeRaw`
      UPDATE "Banner"
      SET "imageUrl" = REPLACE("imageUrl", ${OLD_URL}, ${NEW_URL})
      WHERE "imageUrl" LIKE '%localhost%'
    `;
    console.log('✅ Updated Banner imageUrl');

    // 4. Update Banner imageMobile
    await prisma.$executeRaw`
      UPDATE "Banner"
      SET "imageMobile" = REPLACE("imageMobile", ${OLD_URL}, ${NEW_URL})
      WHERE "imageMobile" LIKE '%localhost%'
    `;
    console.log('✅ Updated Banner imageMobile');

    // 5. Update DefaultReview mediaUrl
    await prisma.$executeRaw`
      UPDATE "DefaultReview"
      SET "mediaUrl" = REPLACE("mediaUrl", ${OLD_URL}, ${NEW_URL})
      WHERE "mediaUrl" LIKE '%localhost%'
    `;
    console.log('✅ Updated DefaultReview mediaUrl');

    // 6. Update Brand imageUrl
    await prisma.$executeRaw`
      UPDATE "Brand"
      SET "imageUrl" = REPLACE("imageUrl", ${OLD_URL}, ${NEW_URL})
      WHERE "imageUrl" LIKE '%localhost%'
    `;
    console.log('✅ Updated Brand imageUrl');

    // 7. Update Category imageUrl
    await prisma.$executeRaw`
      UPDATE "Category"
      SET "imageUrl" = REPLACE("imageUrl", ${OLD_URL}, ${NEW_URL})
      WHERE "imageUrl" LIKE '%localhost%'
    `;
    console.log('✅ Updated Category imageUrl');

    console.log('\n✅ All image URLs updated successfully!');
    console.log(`Changed: ${OLD_URL} → ${NEW_URL}`);

  } catch (error) {
    console.error('❌ Error updating image URLs:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

fixImageUrls()
  .then(() => {
    console.log('\n✅ Migration completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  });
