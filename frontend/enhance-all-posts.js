const fs = require('fs');
const posts = JSON.parse(fs.readFileSync('src/data/blog-posts.json', 'utf-8'));

console.log('🚀 Melhorando TODOS os posts do blog...\n');
console.log(`Total de posts: ${posts.length}\n`);

let postsUpdated = 0;
let faqsAdded = 0;
let contentExpanded = 0;

// Função para gerar FAQs baseadas no tipo de post
function generateFAQs(post) {
  const { title, slug, category, content } = post;
  const faqs = [];

  // Se já tem FAQs, pular (posts educacionais já têm)
  if (post.faqs && post.faqs.length >= 5) {
    return null;
  }

  // POSTS DE PRODUTOS (reviews)
  if (slug.startsWith('review-') || category.name === 'Produtos & Reviews') {
    const productName = title.split(':')[0].trim();
    const isVape = content.includes('vape') || content.includes('vaporizador') || content.includes('Delta');
    const isSativa = content.includes('Sativa') || slug.includes('sativa');
    const isIndica = content.includes('Indica') || slug.includes('indica');
    const isHibrida = content.includes('Híbrida') || content.includes('Hibrida') || slug.includes('hibrida');

    faqs.push({
      question: `O que é ${productName}?`,
      answer: `${productName} é um produto premium de cannabis ${isVape ? 'em formato de vaporizador descartável' : 'de alta qualidade'} do tipo ${isSativa ? 'Sativa (energizante e estimulante)' : isIndica ? 'Indica (relaxante e calmante)' : isHibrida ? 'Híbrida (equilíbrio entre relaxamento e energia)' : 'cannabis'}. É conhecido por sua qualidade superior, potência consistente e efeitos previsíveis. Ideal para usuários que buscam ${isSativa ? 'energia, foco e criatividade' : isIndica ? 'relaxamento, alívio de dor e melhora do sono' : isHibrida ? 'efeitos balanceados para qualquer momento do dia' : 'experiência premium'}.`
    });

    faqs.push({
      question: `${productName} é seguro?`,
      answer: `Sim, ${productName} é um produto seguro quando usado conforme recomendado. É fabricado seguindo rigorosos padrões de qualidade e passa por testes laboratoriais independentes. Recomenda-se começar com doses baixas, especialmente para iniciantes, e aumentar gradualmente. Sempre compre de fontes confiáveis como a America Cannabis para garantir autenticidade e qualidade. Consulte um médico se tiver condições de saúde pré-existentes.`
    });

    faqs.push({
      question: `Como usar ${productName} corretamente?`,
      answer: `${isVape ? 'Para usar o vaporizador, remova da embalagem e inale suavemente pelo bocal. Não é necessário apertar botões. Comece com 1-2 inalações curtas e aguarde 5-10 minutos para sentir os efeitos antes de continuar.' : 'Siga as instruções da embalagem. Para iniciantes, comece com dose baixa e aumente gradualmente.'} ${isSativa ? 'Ideal para uso diurno, manhãs e atividades que requerem energia.' : isIndica ? 'Melhor usado à noite ou quando busca relaxamento profundo.' : isHibrida ? 'Versátil, pode ser usado a qualquer hora do dia.' : 'Use em ambiente seguro e confortável.'} Mantenha-se hidratado e evite dirigir após o uso.`
    });

    faqs.push({
      question: `Qual o preço de ${productName}?`,
      answer: `O preço de ${productName} varia entre R$ 250 a R$ 500 dependendo do tamanho e fornecedor. Na America Cannabis, oferecemos preços competitivos com garantia de autenticidade. Fique atento a promoções especiais e descontos em compras maiores. Investir em produtos premium como este garante melhor experiência e segurança.`
    });

    faqs.push({
      question: `Onde comprar ${productName} original?`,
      answer: `Compre ${productName} original apenas em lojas confiáveis e autorizadas como a America Cannabis. Evite produtos falsificados que podem ser perigosos para sua saúde. Na America Cannabis garantimos: produtos 100% autênticos, entrega discreta e rápida, suporte ao cliente especializado, e preços justos. Desconfie de preços muito baixos - geralmente indicam produtos falsos ou de qualidade inferior.`
    });

    faqs.push({
      question: `Quais os efeitos de ${productName}?`,
      answer: `Os efeitos de ${productName} incluem ${isSativa ? 'aumento de energia e foco, criatividade elevada, euforia e bem-estar, sociabilidade aumentada, e motivação para atividades físicas e mentais. Ideal para uso diurno.' : isIndica ? 'relaxamento profundo do corpo e mente, alívio de dor e tensão muscular, melhora na qualidade do sono, redução de ansiedade e estresse, e sensação de tranquilidade. Perfeito para uso noturno.' : isHibrida ? 'equilíbrio entre relaxamento e energia, versatilidade para diferentes momentos, efeitos corporais e mentais balanceados, e adaptabilidade às suas necessidades.' : 'bem-estar, relaxamento e experiência premium'}. Os efeitos geralmente começam em ${isVape ? '5-10 minutos' : '30-60 minutos'} e duram 2-4 horas.`
    });

  // POSTS DE MARCAS
  } else if (slug.startsWith('marca-') || slug.startsWith('brand-')) {
    const brandName = title.split(':')[0].replace('Marca', '').trim();

    faqs.push({
      question: `O que é a marca ${brandName}?`,
      answer: `${brandName} é uma marca premium de cannabis reconhecida pela qualidade superior de seus produtos, processos rigorosos de controle de qualidade, e compromisso com a satisfação do cliente. A marca oferece uma linha diversificada de produtos incluindo vaporizadores, flores, concentrados e edibles, todos testados em laboratórios independentes para garantir potência e pureza.`
    });

    faqs.push({
      question: `Produtos ${brandName} são confiáveis?`,
      answer: `Sim, os produtos ${brandName} são extremamente confiáveis. A marca possui certificações de qualidade, realiza testes laboratoriais em todos os lotes, utiliza ingredientes premium, e possui milhares de avaliações positivas de clientes satisfeitos. Na America Cannabis, só trabalhamos com marcas verificadas como ${brandName} para garantir a melhor experiência para nossos clientes.`
    });

    faqs.push({
      question: `Qual o melhor produto ${brandName}?`,
      answer: `Os produtos mais populares de ${brandName} variam conforme preferências pessoais. Para iniciantes, recomendamos os vaporizadores descartáveis pela facilidade de uso. Para usuários experientes, as flores premium e concentrados oferecem potência superior. Produtos Sativa são ideais para energia diurna, Indica para relaxamento noturno, e Híbridos para versatilidade. Consulte nossa equipe para recomendações personalizadas.`
    });

    faqs.push({
      question: `Onde comprar produtos ${brandName} originais?`,
      answer: `Compre produtos ${brandName} originais exclusivamente na America Cannabis. Garantimos 100% de autenticidade, produtos direto do fabricante, preços competitivos, entrega rápida e discreta, e suporte especializado. Evite mercados não autorizados que podem vender falsificações perigosas. Verificamos cada produto antes do envio.`
    });

    faqs.push({
      question: `${brandName} tem boa reputação?`,
      answer: `Sim, ${brandName} tem excelente reputação no mercado de cannabis. A marca é conhecida por: consistência na qualidade dos produtos, transparência nos processos de fabricação, atendimento excepcional ao cliente, inovação constante em produtos, e preços justos. Milhares de clientes recomendam ${brandName} pela confiabilidade e qualidade superior.`
    });

  // POSTS TOP 10 / RANKINGS
  } else if (slug.includes('top-10') || title.includes('Top 10')) {
    const type = slug.includes('indica') ? 'Indica' : slug.includes('sativa') ? 'Sativa' : slug.includes('hibrida') ? 'Híbrida' : 'produtos';

    faqs.push({
      question: `Como foi feito o ranking dos melhores ${type}?`,
      answer: `Nosso ranking de Top 10 ${type} é baseado em critérios rigorosos: análise de qualidade e potência, avaliações reais de clientes, testes laboratoriais independentes, relação custo-benefício, disponibilidade no mercado brasileiro, e feedback da comunidade. Testamos pessoalmente cada produto listado e atualizamos regularmente para refletir novidades do mercado.`
    });

    faqs.push({
      question: `Qual o melhor ${type} para iniciantes?`,
      answer: `Para iniciantes em ${type}, recomendamos começar com produtos de potência média (10-20% THC), formatos fáceis de dosar como vaporizadores descartáveis ou edibles medidos, marcas conhecidas pela qualidade consistente, e sempre iniciar com doses baixas. ${type === 'Indica' ? 'Indicas são ideais para relaxamento noturno sem ansiedade.' : type === 'Sativa' ? 'Sativas leves evitam ansiedade em novos usuários.' : 'Híbridas oferecem efeitos balanceados e previsíveis.'} Consulte nossa equipe para orientação personalizada.`
    });

    faqs.push({
      question: `Onde comprar esses ${type} no Brasil?`,
      answer: `Todos os ${type} listados em nosso Top 10 estão disponíveis na America Cannabis, sua loja confiável de produtos premium. Oferecemos: produtos 100% autênticos e testados, entrega rápida para todo Brasil, embalagem discreta e segura, múltiplas formas de pagamento, e suporte especializado pré e pós-venda. Visite nosso site ou entre em contato para verificar disponibilidade e promoções atuais.`
    });

    faqs.push({
      question: `Qual a diferença entre os produtos do Top 10?`,
      answer: `Os produtos no Top 10 ${type} diferem em: potência (% de THC/CBD), perfil de terpenos (aroma e sabor), efeitos específicos (energia, relaxamento, criatividade), formato (vape, flor, edible, concentrado), preço e disponibilidade, e marca/fabricante. ${type === 'Indica' ? 'Todos promovem relaxamento, mas variam em intensidade e duração.' : type === 'Sativa' ? 'Todos energizam, mas diferem em foco vs. criatividade.' : 'Híbridas variam no balanço entre Indica e Sativa.'} Escolha baseado em suas necessidades específicas.`
    });

    faqs.push({
      question: `Os preços do Top 10 ${type} são atualizados?`,
      answer: `Sim, nosso ranking Top 10 ${type} é atualizado regularmente (mensal ou bimestralmente) para refletir: mudanças de preço no mercado, lançamento de novos produtos premium, feedback atualizado dos clientes, e disponibilidade dos produtos. Os preços mencionados são aproximados e podem variar. Sempre verifique preços atuais no site da America Cannabis para informações precisas. Fique atento a promoções especiais!`
    });

  // POSTS EDUCACIONAIS/GERAIS
  } else {
    const isAboutCBD = slug.includes('cbd') || title.includes('CBD');
    const isAboutTHC = slug.includes('thc') || title.includes('THC');
    const isAboutLaw = category.name === 'Legislação & Regulamentação' || slug.includes('lei') || slug.includes('legal') || slug.includes('anvisa');
    const isAboutHealth = category.name === 'Saúde & Bem-Estar' || slug.includes('saude') || slug.includes('ansiedade') || slug.includes('dor');

    if (isAboutCBD) {
      faqs.push({
        question: 'CBD é legal no Brasil em 2025?',
        answer: 'Sim, CBD é legal no Brasil desde 2015 e regulamentado pela Anvisa através da RDC 660/2022. Produtos com até 0,2% de THC podem ser comercializados com prescrição médica. É possível comprar CBD em farmácias autorizadas, importar com receita médica, ou adquirir em lojas especializadas como a America Cannabis. A legislação continua evoluindo para facilitar o acesso.'
      });

      faqs.push({
        question: 'CBD tem efeitos colaterais?',
        answer: 'O CBD é geralmente bem tolerado e seguro. Possíveis efeitos colaterais leves incluem: boca seca, sonolência (em doses altas), alterações leves no apetite, e raramente diarreia. Efeitos colaterais são infrequentes e geralmente desaparecem com ajuste de dose. CBD não causa dependência, não tem efeito psicoativo, e é considerado seguro pela OMS. Consulte um médico se estiver tomando outros medicamentos.'
      });
    }

    if (isAboutTHC) {
      faqs.push({
        question: 'Qual a diferença entre CBD e THC?',
        answer: 'CBD e THC são canabinoides da planta cannabis, mas com efeitos distintos. THC causa efeito psicoativo ("barato"), é controlado no Brasil, e pode causar ansiedade em altas doses. CBD não causa efeito psicoativo, é legal com prescrição, reduz ansiedade, e modera os efeitos do THC. Ambos têm benefícios terapêuticos, mas CBD é preferido para uso medicinal sem alteração de consciência.'
      });
    }

    if (isAboutLaw) {
      faqs.push({
        question: 'Como obter prescrição de cannabis medicinal no Brasil?',
        answer: 'Para obter prescrição de cannabis medicinal: 1) Consulte médico especializado (neurologista, psiquiatra, oncologista, etc.), 2) Apresente histórico médico e tratamentos anteriores, 3) Médico avalia necessidade e emite receita especial, 4) Com receita, solicite autorização da Anvisa (para importação) ou compre em farmácias autorizadas (produtos nacionais). O processo está mais simples em 2025 com aumento de médicos prescritores.'
      });
    }

    if (isAboutHealth) {
      faqs.push({
        question: 'Cannabis medicinal funciona para ansiedade?',
        answer: 'Sim, estudos científicos comprovam eficácia da cannabis (especialmente CBD) para ansiedade. CBD reduz sintomas de: Transtorno de Ansiedade Generalizada (TAG), Transtorno de Ansiedade Social (TAS), Transtorno de Estresse Pós-Traumático (TEPT), e ataques de pânico. Doses típicas variam de 300-600mg para ansiedade aguda e 20-40mg diários para manutenção. Funciona modulando serotonina e sistema endocanabinoide. Consulte médico para tratamento personalizado.'
      });
    }

    // FAQs gerais para posts educacionais
    faqs.push({
      question: 'Onde comprar produtos de cannabis de qualidade?',
      answer: 'Compre produtos de cannabis de qualidade na America Cannabis, líder no mercado brasileiro. Garantimos: produtos 100% autênticos e testados em laboratório, variedade completa (CBD, vapes, flores, edibles), preços competitivos e transparentes, entrega rápida e discreta para todo Brasil, certificados de análise (COA) disponíveis, e suporte especializado. Evite mercados informais que podem oferecer produtos adulterados ou perigosos.'
    });

    faqs.push({
      question: 'Como escolher o melhor produto de cannabis para mim?',
      answer: 'Para escolher o melhor produto considere: 1) Objetivo (relaxamento, energia, alívio de dor, sono), 2) Experiência (iniciante x experiente), 3) Tipo preferido (Indica, Sativa, Híbrida), 4) Formato (vape, flor, óleo, edible), 5) Potência desejada (baixa, média, alta), 6) Orçamento disponível. Nossa equipe na America Cannabis oferece consultoria gratuita para ajudar na escolha ideal baseada em suas necessidades específicas.'
    });
  }

  // Garantir pelo menos 5 FAQs
  if (faqs.length < 5) {
    faqs.push({
      question: 'Produtos de cannabis são seguros?',
      answer: 'Sim, produtos de cannabis de qualidade são seguros quando: comprados de fontes confiáveis como America Cannabis, usados conforme orientações, iniciados com doses baixas, e adquiridos de marcas que fazem testes laboratoriais. Evite produtos sem procedência, verifique certificados de análise (COA), compre apenas de lojas autorizadas, e consulte profissionais de saúde se tiver dúvidas. Segurança começa com escolha consciente.'
    });
  }

  return faqs.slice(0, 6); // Máximo de 6 FAQs por post
}

// Função para expandir conteúdo de posts curtos
function expandContent(post) {
  const { content, slug, title, category } = post;

  // Se conteúdo já é grande, não expandir
  if (content.length > 8000) {
    return null;
  }

  let additionalContent = '';

  // Para posts de produtos, adicionar seções extras
  if (slug.startsWith('review-') || category.name === 'Produtos & Reviews') {
    additionalContent = `

<h2>Dicas de Segurança e Uso Responsável</h2>

<p>Para garantir a melhor experiência e segurança ao usar este produto, siga estas recomendações importantes:</p>

<ul>
<li><strong>Comece Devagar:</strong> Se é iniciante, comece com doses baixas e aguarde pelo menos 15-30 minutos antes de aumentar a dose. Cada pessoa reage diferentemente.</li>
<li><strong>Ambiente Seguro:</strong> Use em ambiente confortável e seguro, especialmente nas primeiras vezes. Evite locais públicos até conhecer seus efeitos.</li>
<li><strong>Não Dirija:</strong> Nunca dirija ou opere máquinas após usar produtos de cannabis. Os efeitos podem prejudicar reflexos e julgamento.</li>
<li><strong>Hidratação:</strong> Mantenha-se bem hidratado antes, durante e após o uso. Tenha água por perto.</li>
<li><strong>Alimentação:</strong> Ter algo leve no estômago pode ajudar, mas evite uso com estômago muito cheio ou muito vazio.</li>
<li><strong>Armazenamento:</strong> Guarde em local fresco, seco e fora do alcance de crianças e animais. Mantenha na embalagem original.</li>
<li><strong>Interações:</strong> Consulte médico se estiver tomando outros medicamentos, pois podem ocorrer interações.</li>
<li><strong>Dosagem:</strong> Anote suas experiências para encontrar a dose ideal. Menos pode ser mais, especialmente com cannabis.</li>
</ul>

<h2>Perguntas Frequentes dos Clientes</h2>

<p><strong>Quanto tempo dura o produto?</strong><br>
Com uso moderado (2-3 vezes ao dia), um vaporizador descartável dura em média 1-2 semanas. A duração varia conforme frequência e intensidade de uso.</p>

<p><strong>Preciso de prescrição médica?</strong><br>
A legislação varia por região. No Brasil, produtos com THC acima de 0,2% podem exigir prescrição. Consulte nossa equipe para informações atualizadas sobre sua localidade.</p>

<p><strong>Qual a garantia do produto?</strong><br>
Todos os produtos vendidos na America Cannabis têm garantia de autenticidade e qualidade. Se houver qualquer defeito de fabricação, oferecemos troca ou reembolso dentro do prazo estabelecido.</p>

<p><strong>Como saber se o produto é autêntico?</strong><br>
Produtos autênticos têm: embalagem lacrada original, código QR de verificação, informações completas do fabricante, e certificado de análise disponível. Compre sempre de lojas confiáveis.</p>

<h2>Comparação com Produtos Similares</h2>

<p>Este produto se destaca no mercado por diversos motivos quando comparado a alternativas similares:</p>

<ul>
<li><strong>Qualidade Superior:</strong> Ingredientes premium e processo de extração avançado garantem pureza e potência</li>
<li><strong>Preço Competitivo:</strong> Excelente custo-benefício comparado a produtos de qualidade equivalente</li>
<li><strong>Confiabilidade:</strong> Marca estabelecida com histórico comprovado de satisfação do cliente</li>
<li><strong>Disponibilidade:</strong> Facilmente encontrado na America Cannabis com entrega rápida</li>
<li><strong>Variedade:</strong> Disponível em diferentes tamanhos e potências para atender diversas necessidades</li>
</ul>

<h2>Conclusão e Recomendação Final</h2>

<p>Este é definitivamente um dos melhores produtos disponíveis no mercado brasileiro de cannabis. A combinação de qualidade superior, efeitos consistentes, facilidade de uso e preço justo o torna uma escolha excelente tanto para iniciantes quanto usuários experientes.</p>

<p>Na America Cannabis, recomendamos este produto para quem busca:</p>

<ul>
<li>Experiência premium com resultados previsíveis</li>
<li>Produto confiável de marca reconhecida</li>
<li>Facilidade de uso e discrição</li>
<li>Excelente relação custo-benefício</li>
</ul>

<p><strong>Compre com confiança na America Cannabis e receba:</strong> Produto 100% autêntico, entrega rápida e discreta, suporte especializado, e garantia de satisfação.</p>`;
  }

  return additionalContent;
}

// Processar todos os posts
posts.forEach((post, index) => {
  let updated = false;

  // Adicionar FAQs se não existir ou for insuficiente
  if (!post.faqs || post.faqs.length < 5) {
    const newFAQs = generateFAQs(post);
    if (newFAQs && newFAQs.length > 0) {
      post.faqs = newFAQs;
      faqsAdded++;
      updated = true;
      console.log(`✅ [${index + 1}/${posts.length}] Adicionadas ${newFAQs.length} FAQs: ${post.title.substring(0, 60)}...`);
    }
  }

  // Expandir conteúdo se for muito curto
  if (post.content.length < 6000) {
    const additionalContent = expandContent(post);
    if (additionalContent) {
      post.content += additionalContent;
      contentExpanded++;
      updated = true;
      console.log(`📝 [${index + 1}/${posts.length}] Conteúdo expandido: ${post.title.substring(0, 60)}...`);
    }
  }

  if (updated) {
    postsUpdated++;
  }
});

// Salvar arquivo
fs.writeFileSync('src/data/blog-posts.json', JSON.stringify(posts, null, 2), 'utf-8');

console.log('\n' + '='.repeat(80));
console.log('✅ MELHORIAS CONCLUÍDAS!\n');
console.log(`📊 Estatísticas:`);
console.log(`   - Posts processados: ${posts.length}`);
console.log(`   - Posts atualizados: ${postsUpdated}`);
console.log(`   - FAQs adicionadas: ${faqsAdded} posts`);
console.log(`   - Conteúdos expandidos: ${contentExpanded} posts`);
console.log('\n✅ Arquivo salvo: src/data/blog-posts.json');
console.log('='.repeat(80));
