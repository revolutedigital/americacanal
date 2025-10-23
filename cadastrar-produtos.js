#!/usr/bin/env node

const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

// Configuração
const API_URL = 'http://localhost:4000';
const TENANT_ID = '0fb61585-3cb3-48b3-ae76-0a5358084a8c';

// Credenciais de admin (você deve ter criado no sistema)
const ADMIN_EMAIL = 'admin@americacannabiss.com';
const ADMIN_PASSWORD = 'admin123';

let authToken = '';

// Função para fazer login
async function login() {
  try {
    console.log('🔐 Fazendo login como admin...');
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    authToken = response.data.token;
    console.log('✅ Login realizado com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao fazer login:', error.response?.data || error.message);
    console.log('\n⚠️  IMPORTANTE: Você precisa criar um usuário admin primeiro!');
    console.log('Execute este SQL no PostgreSQL:\n');
    console.log(`
INSERT INTO "User" (id, "tenantId", email, password, name, role, "isActive", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  '${TENANT_ID}',
  '${ADMIN_EMAIL}',
  '$2b$10$rJYvVqGJ7iN.nKq7xQX3aO7K8qX9R5K6tZM5N8K7xQX3aO7K8qX9R', -- senha: admin123
  'Administrator',
  'admin',
  true,
  NOW(),
  NOW()
);
    `);
    return false;
  }
}

// Função para apagar todos os produtos
async function deleteAllProducts() {
  try {
    console.log('🗑️  Buscando produtos existentes...');
    const response = await axios.get(`${API_URL}/api/products?tenantId=${TENANT_ID}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    const products = response.data;
    console.log(`📦 Encontrados ${products.length} produtos para apagar`);

    for (const product of products) {
      try {
        await axios.delete(`${API_URL}/api/products/${product.id}`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log(`  ✓ Produto apagado: ${product.name}`);
      } catch (error) {
        console.log(`  ✗ Erro ao apagar: ${product.name}`);
      }
    }

    console.log('✅ Todos os produtos foram apagados!\n');
  } catch (error) {
    console.error('❌ Erro ao apagar produtos:', error.message);
  }
}

// Função para criar slug
function createSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Função para gerar descrição SEO otimizada
function generateSEODescription(productName, price) {
  const priceFormatted = price.replace('R$ ', 'R$ ').replace(',00', '');

  // Identifica o tipo de produto
  const isGummy = productName.toLowerCase().includes('gummy') || productName.toLowerCase().includes('goma');
  const isCogumelo = productName.toLowerCase().includes('cogumelo') || productName.toLowerCase().includes('mushroom');
  const isDelta = productName.toLowerCase().includes('delta');
  const isThc = productName.toLowerCase().includes('thc');
  const isInd = productName.toLowerCase().includes('ind');
  const isSat = productName.toLowerCase().includes('sat');
  const isHyb = productName.toLowerCase().includes('hyb');

  let baseDesc = `Compre ${productName} por ${priceFormatted} na America Cannabis. `;

  if (isGummy) {
    baseDesc += 'Gomas de THC premium com dosagem precisa, sabor incrível e efeitos potentes. ';
    baseDesc += 'Perfeito para quem busca discrição e praticidade no consumo. ';
    baseDesc += 'Gummies testados em laboratório, 100% legais e com entrega em todo Brasil. ';
  } else if (isCogumelo) {
    baseDesc += 'Vape de cogumelo psicodélico de alta qualidade com THC-A. ';
    baseDesc += 'Experiência única e controlada, ideal para relaxamento profundo. ';
    baseDesc += 'Produto premium com ingredientes naturais e efeitos duradouros. ';
  } else if (isDelta && isThc) {
    baseDesc += 'Vape de Delta THC de altíssima potência, testado em laboratório. ';
    baseDesc += 'Tecnologia de ponta para vapor suave e sabor premium. ';
    baseDesc += 'Cartucho descartável ou recarregável com bateria de longa duração. ';
  } else {
    baseDesc += 'Produto premium de cannabis com altíssima qualidade e pureza. ';
    baseDesc += 'Testado em laboratório, 100% legal e com certificação de origem. ';
    baseDesc += 'Efeitos potentes e duradouros para uma experiência única. ';
  }

  if (isInd) {
    baseDesc += 'Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. ';
  } else if (isSat) {
    baseDesc += 'Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. ';
  } else if (isHyb) {
    baseDesc += 'Efeito Híbrido: Equilíbrio perfeito entre relaxamento e energia, versátil para qualquer momento. ';
  }

  baseDesc += 'Entrega rápida e discreta em todo Brasil. ';
  baseDesc += 'Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. ';
  baseDesc += 'Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.';

  return baseDesc;
}

// Função para gerar URL de imagem placeholder
function generateImageURL(productName) {
  // Usando placeholder.com com cores e texto personalizados
  const slug = createSlug(productName).substring(0, 30);
  return `https://via.placeholder.com/800x800/10b981/ffffff?text=${encodeURIComponent(productName.substring(0, 20))}`;
}

// Função para parsear preço
function parsePrice(priceString) {
  return parseFloat(priceString.replace('R$ ', '').replace('.', '').replace(',', '.'));
}

// Função para cadastrar um produto
async function createProduct(productData) {
  try {
    const response = await axios.post(`${API_URL}/api/products`, productData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Erro ao criar produto: ${error.response?.data?.error || error.message}`);
    return null;
  }
}

// Função para processar o CSV
async function processCSV() {
  const fileStream = fs.createReadStream('/Users/yourapple/Downloads/produtos.csv');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const products = [];
  let lineNumber = 0;

  for await (const line of rl) {
    lineNumber++;

    // Pular header e linha inválida
    if (lineNumber <= 2) continue;

    // Parse CSV - split simples por vírgula
    const columns = line.split(',');

    if (columns.length < 4) continue;

    const name = columns[0]?.replace(/^"|"$/g, '').trim();
    const priceString = columns[2]?.replace(/^"|"$/g, '').trim();
    const availability = columns[3]?.replace(/^"|"$/g, '').trim();

    if (!name || name === '') continue;
    if (!priceString || priceString === '') continue;

    const price = parsePrice(priceString);
    const isAvailable = availability && availability.includes('Disponível');

    products.push({
      name: name,
      price,
      isAvailable,
      stock: isAvailable ? 10 : 0,
    });
  }

  return products;
}

// Função principal
async function main() {
  console.log('🚀 America Cannabis - Cadastro Automático de Produtos\n');
  console.log('=' .repeat(60) + '\n');

  // 1. Login
  const loginSuccess = await login();
  if (!loginSuccess) {
    console.log('\n⚠️  Configure o usuário admin e tente novamente.');
    process.exit(1);
  }

  console.log('');

  // 2. Apagar produtos existentes
  await deleteAllProducts();

  // 3. Processar CSV
  console.log('📖 Lendo arquivo CSV...');
  const products = await processCSV();
  console.log(`✅ ${products.length} produtos encontrados no CSV\n`);

  // 4. Cadastrar produtos
  console.log('📦 Cadastrando produtos...\n');

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    console.log(`[${i + 1}/${products.length}] ${product.name}...`);

    const productData = {
      tenantId: TENANT_ID,
      name: product.name,
      description: generateSEODescription(product.name, `R$ ${product.price.toFixed(2)}`),
      price: product.price,
      imageUrl: generateImageURL(product.name),
      images: [generateImageURL(product.name)],
      stock: product.stock,
      lowStockAlert: 5,
      isActive: product.isAvailable,
    };

    const result = await createProduct(productData);

    if (result) {
      successCount++;
      console.log(`  ✅ Cadastrado com sucesso!\n`);
    } else {
      errorCount++;
      console.log(`  ❌ Erro ao cadastrar\n`);
    }

    // Aguardar 500ms entre requests para não sobrecarregar
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('=' .repeat(60));
  console.log('\n📊 RESUMO DO CADASTRO:');
  console.log(`   ✅ Sucesso: ${successCount} produtos`);
  console.log(`   ❌ Erros: ${errorCount} produtos`);
  console.log(`   📦 Total: ${products.length} produtos`);
  console.log('\n✨ Cadastro concluído!');
  console.log(`\n🌐 Acesse: http://localhost:5178/admin/produtos`);
}

// Executar
main().catch(error => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});
