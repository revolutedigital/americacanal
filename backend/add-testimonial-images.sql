-- Adicionar imagens aos depoimentos que não têm mediaUrl
-- Usando imagens disponíveis de banners

UPDATE "DefaultReview"
SET
  "mediaUrl" = 'https://backend-production1.up.railway.app/uploads/images/banners/0cbc4bef-7b6d-4c4f-b3fb-afffa8f77600.jpg',
  "mediaType" = 'image'
WHERE id = 'a12829b7-0e9b-4775-b90e-db86e843af77' AND "mediaUrl" IS NULL;

UPDATE "DefaultReview"
SET
  "mediaUrl" = 'https://backend-production1.up.railway.app/uploads/images/banners/12d34f35-c7fa-4477-935b-dcaf05709092.jpg',
  "mediaType" = 'image'
WHERE id = '8f6c3e4a-b0d5-4f79-9e8c-3f5d12a456de' AND "mediaUrl" IS NULL;

UPDATE "DefaultReview"
SET
  "mediaUrl" = 'https://backend-production1.up.railway.app/uploads/images/banners/1940d3cc-5e12-4f14-86b8-50b89ec1405d.jpg',
  "mediaType" = 'image'
WHERE id = '5c2d1e8a-9b4f-4c6d-8a3e-2f7b1d9e5c4a' AND "mediaUrl" IS NULL;

UPDATE "DefaultReview"
SET
  "mediaUrl" = 'https://backend-production1.up.railway.app/uploads/images/banners/360d0152-f865-4ecc-82a0-f64a81044d18.jpg',
  "mediaType" = 'image'
WHERE id = '3e5a7b2c-4d8f-4e9a-b1c3-6f9d2e5a8b7c' AND "mediaUrl" IS NULL;

UPDATE "DefaultReview"
SET
  "mediaUrl" = 'https://backend-production1.up.railway.app/uploads/images/banners/83dd452f-de23-4340-8c31-217953593481.jpg',
  "mediaType" = 'image'
WHERE id = '9b4d3e7a-5c2f-4a8b-9e1d-4f6c3a7e2b5d' AND "mediaUrl" IS NULL;

UPDATE "DefaultReview"
SET
  "mediaUrl" = 'https://backend-production1.up.railway.app/uploads/images/banners/b05a4c02-4b7e-42c8-b3e0-0b07eb2b05c2.jpg',
  "mediaType" = 'image'
WHERE id = '2f7e4b9a-3c5d-4e8a-b2f1-5a9c6d4e7b3a' AND "mediaUrl" IS NULL;

UPDATE "DefaultReview"
SET
  "mediaUrl" = 'https://backend-production1.up.railway.app/uploads/images/banners/ba8dec1d-bafd-475e-8d16-9866d40221a0.jpg',
  "mediaType" = 'image'
WHERE id = '7d3a9e4b-5f2c-4e8a-9b1d-6c4f3a8e2b7d' AND "mediaUrl" IS NULL;

UPDATE "DefaultReview"
SET
  "mediaUrl" = 'https://backend-production1.up.railway.app/uploads/images/banners/dbe83c55-d8ed-4c50-806f-94f6c9a384be.jpg',
  "mediaType" = 'image'
WHERE id = '4c7b2e9a-6d3f-4a8e-b5c1-9f4d2a7e3b8c' AND "mediaUrl" IS NULL;
