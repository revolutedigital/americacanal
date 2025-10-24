-- Update Product imageUrl and images array
UPDATE "Product"
SET "imageUrl" = REPLACE("imageUrl", 'http://localhost:4000', 'https://backend-production1.up.railway.app')
WHERE "imageUrl" LIKE '%localhost%';

-- Update Product images array (PostgreSQL specific)
UPDATE "Product"
SET images = ARRAY(
  SELECT REPLACE(unnest(images)::text, 'http://localhost:4000', 'https://backend-production1.up.railway.app')
)
WHERE images::text LIKE '%localhost%';

-- Update Banner imageUrl
UPDATE "Banner"
SET "imageUrl" = REPLACE("imageUrl", 'http://localhost:4000', 'https://backend-production1.up.railway.app')
WHERE "imageUrl" LIKE '%localhost%';

-- Update Banner imageMobile
UPDATE "Banner"
SET "imageMobile" = REPLACE("imageMobile", 'http://localhost:4000', 'https://backend-production1.up.railway.app')
WHERE "imageMobile" LIKE '%localhost%';

-- Update DefaultReview mediaUrl
UPDATE "DefaultReview"
SET "mediaUrl" = REPLACE("mediaUrl", 'http://localhost:4000', 'https://backend-production1.up.railway.app')
WHERE "mediaUrl" LIKE '%localhost%';

-- Update Brand imageUrl
UPDATE "Brand"
SET "imageUrl" = REPLACE("imageUrl", 'http://localhost:4000', 'https://backend-production1.up.railway.app')
WHERE "imageUrl" LIKE '%localhost%';

-- Update Category imageUrl
UPDATE "Category"
SET "imageUrl" = REPLACE("imageUrl", 'http://localhost:4000', 'https://backend-production1.up.railway.app')
WHERE "imageUrl" LIKE '%localhost%';
