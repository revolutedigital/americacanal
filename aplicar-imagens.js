#!/usr/bin/env node

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuração
const API_URL = 'http://localhost:4000';
const TENANT_ID = '0fb61585-3cb3-48b3-ae76-0a5358084a8c';
const ADMIN_EMAIL = 'admin@americacannabiss.com';
const ADMIN_PASSWORD = 'admin123';

let authToken = '';

// Mapeamento de produtos para imagens reais encontradas
const productImageMap = {
  // Torch produtos
  'torch': 'https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg',

  // Delta King
  'delta king': 'https://cdn.shopify.com/s/files/1/0558/3340/6127/files/Delta_King_Disposable_Vape_-_Granddaddy_Purple_1_oz_480x480.jpg',

  // Snoop Dogg
  'snoop dogg': 'https://everythingfor420.com/cdn/shop/files/SNOOP_20S_20DOGG_20VAPE_grande.jpg',

  // Pressure LA
  'pressure': 'https://images.leafly.com/flower-images/pressure-platinum-kush.png',

  // Gummies genérico
  'gummy': 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800',

  // Cogumelo/Mushroom
  'cogumelo': 'https://images.unsplash.com/photo-1576776654949-0b0fad6c4e21?w=800',

  // Ignite
  'ignite': 'https://cdn.shopify.com/s/files/1/0558/3340/6127/files/Ignite_Delta_8_Disposable_Vape_-_Blueberry_Kush_2g_480x480.jpg',

  // Hidden Hills
  'hidden hills': 'https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg',

  // Pulse
  'pulse': 'https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800',

  // Hallu
  'hallu': 'https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800',

  // Cactus
  'cactus': 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800',

  // Stoney Cat
  'stoney cat': 'https://images.unsplash.com/photo-1615486511262-2558ca0cc2ea?w=800',

  // Tree House
  'tree house': 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800',
};

// Função para fazer login
async function login() {
  try {
    console.log('🔐 Fazendo login como admin...');
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    authToken = response.data.token;
    console.log('✅ Login realizado com sucesso!\n');
    return true;
  } catch (error) {
    console.error('❌ Erro ao fazer login:', error.response?.data || error.message);
    return false;
  }
}

// Função para buscar produtos
async function getProducts() {
  try {
    const response = await axios.get(`${API_URL}/api/products?tenantId=${TENANT_ID}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar produtos:', error.message);
    return [];
  }
}

// Função para determinar URL da imagem baseado no nome do produto
function getImageUrlForProduct(productName) {
  const nameLower = productName.toLowerCase();

  // Procura por matches no mapa
  for (const [key, url] of Object.entries(productImageMap)) {
    if (nameLower.includes(key)) {
      return url;
    }
  }

  // Fallback para placeholder
  return null;
}

// Função para baixar imagem
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const file = fs.createWriteStream(filepath);
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(filepath);
        });
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // Seguir redirect
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      } else {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Função para fazer upload de imagem
async function uploadImage(filepath) {
  try {
    // Simular upload - na verdade vamos usar a URL direta
    // pois o backend aceita URLs de imagens
    return filepath;
  } catch (error) {
    console.error('❌ Erro ao fazer upload:', error.message);
    return null;
  }
}

// Função para atualizar produto com nova imagem
async function updateProductImage(productId, imageUrl) {
  try {
    const response = await axios.put(
      `${API_URL}/api/products/${productId}`,
      {
        imageUrl: imageUrl,
        images: [imageUrl]
      },
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );
    return response.data;
  } catch (error) {
    console.error(`❌ Erro ao atualizar produto: ${error.response?.data?.error || error.message}`);
    return null;
  }
}

// Função principal
async function main() {
  console.log('🖼️  America Cannabis - Aplicação de Imagens Reais\n');
  console.log('=' .repeat(60) + '\n');

  // 1. Login
  const loginSuccess = await login();
  if (!loginSuccess) {
    console.log('\n⚠️  Erro ao fazer login. Verifique as credenciais.');
    process.exit(1);
  }

  // 2. Buscar produtos
  console.log('📦 Buscando produtos...');
  const products = await getProducts();
  console.log(`✅ ${products.length} produtos encontrados\n`);

  // 3. Filtrar apenas produtos com placeholder
  const productsToUpdate = products.filter(p =>
    p.imageUrl && p.imageUrl.includes('placeholder')
  );

  console.log(`🎯 ${productsToUpdate.length} produtos precisam de imagens reais\n`);
  console.log('=' .repeat(60) + '\n');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  // 4. Processar cada produto
  for (let i = 0; i < productsToUpdate.length; i++) {
    const product = productsToUpdate[i];
    console.log(`[${i + 1}/${productsToUpdate.length}] ${product.name}`);

    // Determinar URL da imagem
    const imageUrl = getImageUrlForProduct(product.name);

    if (!imageUrl) {
      console.log('  ⏭️  Nenhuma imagem encontrada, mantendo placeholder\n');
      skipCount++;
      continue;
    }

    console.log(`  🔍 Imagem encontrada: ${imageUrl.substring(0, 50)}...`);

    // Atualizar produto
    const result = await updateProductImage(product.id, imageUrl);

    if (result) {
      successCount++;
      console.log(`  ✅ Imagem aplicada com sucesso!\n`);
    } else {
      errorCount++;
      console.log(`  ❌ Erro ao aplicar imagem\n`);
    }

    // Aguardar 300ms entre requests
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log('=' .repeat(60));
  console.log('\n📊 RESUMO DA APLICAÇÃO DE IMAGENS:');
  console.log(`   ✅ Sucesso: ${successCount} produtos`);
  console.log(`   ⏭️  Pulados: ${skipCount} produtos`);
  console.log(`   ❌ Erros: ${errorCount} produtos`);
  console.log(`   📦 Total processado: ${productsToUpdate.length} produtos`);
  console.log('\n✨ Processo concluído!');
  console.log(`\n🌐 Verifique os produtos em: http://localhost:5178/admin/produtos`);
}

// Executar
main().catch(error => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});
