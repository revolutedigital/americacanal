const { PrismaClient } = require('@prisma/client');
const https = require('https');

const prisma = new PrismaClient();

async function exportAndSendDescriptions() {
  try {
    console.log('📚 Extraindo descrições do banco local...');

    // Buscar todos os produtos com descrições otimizadas
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true
      },
      where: {
        description: {
          contains: '🔬' // Indicador de que tem descrição otimizada
        }
      }
    });

    console.log(`✅ Encontrados ${products.length} produtos com descrições otimizadas\n`);

    if (products.length === 0) {
      console.log('❌ Nenhum produto com descrição otimizada encontrado!');
      return;
    }

    // Preparar dados para envio
    const descriptions = products.map(p => ({
      id: p.id,
      description: p.description
    }));

    console.log('📤 Enviando descrições para o Railway...\n');

    // Enviar para o endpoint
    const data = JSON.stringify({ descriptions });

    const options = {
      hostname: 'backend-production1.up.railway.app',
      port: 443,
      path: '/api/admin/bulk-update-descriptions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        console.log('\n📨 Resposta do servidor:');
        console.log(responseData);

        try {
          const result = JSON.parse(responseData);
          console.log('\n' + '='.repeat(60));
          console.log('✅ RESULTADO:');
          console.log('='.repeat(60));
          console.log(`✅ Sucessos: ${result.success}/${result.total}`);
          console.log(`❌ Erros: ${result.errors}`);
          console.log(`📊 Taxa de sucesso: ${result.successRate}`);
          console.log('='.repeat(60));

          if (result.errorDetails && result.errorDetails.length > 0) {
            console.log('\n⚠️  Detalhes dos erros:');
            result.errorDetails.forEach((err, i) => {
              console.log(`  ${i + 1}. ${err}`);
            });
          }
        } catch (e) {
          console.log('Resposta:', responseData);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Erro na requisição:', error);
    });

    req.write(data);
    req.end();

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

exportAndSendDescriptions();
