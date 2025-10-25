import { FAQItem } from '@/components/ProductFAQ';

// FAQs padrão para vaporizadores descartáveis
const vapeDisposableFAQs: FAQItem[] = [
  {
    question: 'Quanto tempo dura um vaporizador descartável?',
    answer: 'A duração depende do modelo:\n\n• 1ml: ~200 puffs (3-5 dias de uso moderado)\n• 2ml: ~400 puffs (1-2 semanas)\n• 5ml: ~1000 puffs (3-4 semanas)\n\nO tempo exato varia conforme a intensidade e duração de cada puff. Uso moderado: 10-20 puffs por dia.'
  },
  {
    question: 'Como saber quando o vape acabou?',
    answer: 'Você perceberá quando:\n\n• O vapor fica mais fraco ou rarefeito\n• O sabor diminui consideravelmente\n• A luz indicadora pisca repetidamente (se tiver)\n• Não sai mais vapor ao inalar\n\nModelos com display digital mostram o nível restante em tempo real.'
  },
  {
    question: 'Preciso carregar o vaporizador descartável?',
    answer: 'Depende do modelo:\n\n✅ Descartáveis tradicionais: NÃO precisa carregar. Use até o fim e descarte.\n\n⚡ Descartáveis recarregáveis: Vêm com porta USB-C. Carregue quando a bateria acabar antes do líquido.\n\nA maioria dos modelos premium tem bateria suficiente para todo o líquido.'
  },
  {
    question: 'Qual a diferença entre Delta 8, Delta 9 e Delta 10?',
    answer: 'Cada um tem efeitos únicos:\n\n🔵 Delta 8: Relaxamento suave, menos ansiedade. Ótimo para iniciantes.\n\n🟢 Delta 9: Efeito clássico do THC. Mais potente e eufórico.\n\n🟡 Delta 10: Energia e foco. Similar à Sativa mas mais suave.\n\n🌟 Blends (8+9+10): Efeito balanceado e completo. Melhor custo-benefício.'
  },
  {
    question: 'Vape descartável tem algum cheiro?',
    answer: 'Muito menos que fumaça:\n\n✅ Vapor se dissipa rapidamente (30-60 segundos)\n✅ Cheiro suave de terpenos (frutas/ervas)\n✅ Não gruda em roupas ou cabelo\n✅ Discreto para uso em ambientes internos\n\n⚠️ Ainda assim, respeite ambientes e pessoas ao redor.'
  },
  {
    question: 'É seguro comprar vapes online?',
    answer: 'Sim, quando você compra de fontes confiáveis:\n\n✅ Produtos testados em laboratório (COA disponível)\n✅ Marcas reconhecidas e certificadas\n✅ Embalagem lacrada e autêntica\n✅ Livre de pesticidas e metais pesados\n\nNa America Cannabis, todos os produtos têm certificação e garantia de qualidade.'
  },
  {
    question: 'Qual tipo escolher: Sativa, Indica ou Híbrido?',
    answer: '🌅 Sativa: Para o dia. Energia, foco, criatividade, socialização. Ideal para trabalho, estudos, exercícios.\n\n🌙 Indica: Para a noite. Relaxamento, sono, alívio de dores. Perfeito para desestressar e dormir.\n\n⚖️ Híbrido: Balanceado. Combina os dois. Ótimo para uso ao longo do dia sem extremos.\n\nIniciantes: Comece com Híbrido para encontrar sua preferência.'
  },
  {
    question: 'Quanto tempo demora para fazer efeito?',
    answer: 'Vape é a forma mais rápida:\n\n⚡ Efeito inicial: 30 segundos a 2 minutos\n🎯 Pico de efeito: 10-15 minutos\n⏱️ Duração total: 2-4 horas\n\nDica: Espere 5-10 minutos entre puffs para avaliar o efeito antes de continuar.'
  }
];

// FAQs para cartuchos/refis
const vapeCartridgeFAQs: FAQItem[] = [
  {
    question: 'O cartucho é compatível com minha bateria?',
    answer: 'Se sua bateria é 510 thread (padrão universal), SIM!\n\n✅ Compatible com: Yocan, Vessel, Ooze, Stiiizy, PAX Era, e 99% das baterias do mercado.\n\n🔌 Conexão: 510 rosca padrão\n\nSe sua bateria tem rosca e aceita cartuchos, funcionará perfeitamente.'
  },
  {
    question: 'Qual voltagem usar no cartucho?',
    answer: 'Depende do efeito que você quer:\n\n🔵 2.8-3.2V: Sabor máximo, vapor suave (recomendado)\n🟢 3.2-3.7V: Balanceado, vapor moderado\n🔴 3.7-4.2V: Máxima potência, vapor denso\n\n⚠️ Voltagem alta queima os terpenos! Comece sempre no baixo.'
  },
  {
    question: 'Quanto tempo dura 1g de cartucho?',
    answer: 'Um cartucho de 1ml (1g) rende aproximadamente:\n\n• 200-300 puffs totais\n• 10-15 dias (uso moderado: 20 puffs/dia)\n• 5-7 dias (uso frequente: 40 puffs/dia)\n\nCartuchos de 0.5g duram metade do tempo.'
  },
  {
    question: 'Como armazenar o cartucho corretamente?',
    answer: 'Para máxima durabilidade:\n\n✅ Armazene em pé (vertical)\n✅ Local fresco e escuro\n✅ Temperatura ambiente (não geladeira!)\n✅ Longe de luz solar direta\n❌ Nunca deixe no carro no calor\n\nÓleo pode cristalizar no frio. Se ocorrer, aqueça suavemente nas mãos.'
  },
  {
    question: 'O que fazer se o cartucho entupir?',
    answer: 'Entupimento é raro mas pode acontecer:\n\n1. Aqueça o cartucho entre as mãos (1-2 min)\n2. Dê puffs curtos sem acionar a bateria\n3. Use palito de dente para limpar o bocal\n4. Aumenta levemente a voltagem\n5. Limpe contatos com álcool isopropílico\n\nPrevenção: Guarde vertical e evite puffs muito longos.'
  }
];

// FAQs para gomas/edibles
const edibleFAQs: FAQItem[] = [
  {
    question: 'Quanto tempo demora para a goma fazer efeito?',
    answer: 'Edibles são mais lentos que vapes:\n\n⏱️ Início do efeito: 45-90 minutos\n🎯 Pico de efeito: 2-3 horas após consumo\n⏳ Duração total: 4-8 horas\n\n⚠️ IMPORTANTE: Nunca tome mais antes de 2 horas! O efeito demora mas é forte e duradouro.'
  },
  {
    question: 'Qual a dosagem ideal para iniciantes?',
    answer: 'Comece SEMPRE com dose baixa:\n\n🟢 Primeira vez: 5-10mg THC\n🟡 Já usou algumas vezes: 10-15mg\n🟠 Usuário regular: 15-25mg\n🔴 Muito experiente: 25mg+\n\nRegra de ouro: "Start low, go slow" (comece baixo, vá devagar). Você pode sempre tomar mais, mas não pode "des-tomar"!'
  },
  {
    question: 'Por que gomas duram mais que vapes?',
    answer: 'Diferença no processamento corporal:\n\n💊 Edibles: Passam pelo fígado, que converte THC em 11-hidroxi-THC (3x mais potente!). Por isso o efeito é mais forte e duradouro.\n\n💨 Vapes: THC vai direto para o sangue pelos pulmões. Efeito mais rápido mas menos duradouro.\n\nGomas são ideais para alívio prolongado (dores, insônia, ansiedade).'
  },
  {
    question: 'Posso cortar a goma ao meio para dose menor?',
    answer: 'Sim, mas com cuidado:\n\n✅ Gomas em formato de urso/cubo: Podem ser cortadas com precisão razoável\n\n⚠️ Importante: A distribuição pode não ser 100% uniforme. Corte no meio e teste o efeito.\n\nPara máxima precisão de dose, prefira comprar gomas com a dosagem que você precisa.'
  },
  {
    question: 'Gomas de CBD fazem "barato"?',
    answer: 'Não! CBD não é psicoativo:\n\n🟢 CBD puro: Zero efeito "high". Apenas relaxamento, redução de ansiedade.\n\n🟡 CBD + THC: Depende da proporção. 10:1 CBD:THC = efeito muito suave.\n\n🔴 THC: Esse sim causa efeito psicoativo.\n\nCBD é perfeito para quem quer os benefícios terapêuticos sem alterar a consciência.'
  },
  {
    question: 'Como armazenar gomas corretamente?',
    answer: 'Para manter frescas e potentes:\n\n✅ Recipiente hermético (bem fechado)\n✅ Local fresco e seco (20-25°C)\n✅ Longe da luz solar direta\n❌ NÃO guardar na geladeira (fica duro)\n❌ NÃO expor ao calor (derrete)\n\nFora do alcance de crianças e pets! Parecem doces comuns.'
  }
];

// Função para gerar FAQs baseado no produto
export function generateProductFAQs(product: {
  name: string;
  description: string;
  category?: { name: string };
  type?: string;
}): FAQItem[] {
  const productName = product.name.toLowerCase();
  const categoryName = product.category?.name.toLowerCase() || '';
  const description = product.description?.toLowerCase() || '';

  // Detectar tipo de produto
  const isVapeDisposable =
    categoryName.includes('descartá') ||
    productName.includes('descartá') ||
    description.includes('descartável');

  const isVapeCartridge =
    categoryName.includes('refil') ||
    categoryName.includes('cartucho') ||
    productName.includes('refil') ||
    productName.includes('cart');

  const isEdible =
    categoryName.includes('gummy') ||
    categoryName.includes('comestível') ||
    categoryName.includes('edible') ||
    productName.includes('gummy') ||
    productName.includes('goma');

  // Retornar FAQs apropriadas
  if (isEdible) return edibleFAQs;
  if (isVapeCartridge) return vapeCartridgeFAQs;
  if (isVapeDisposable) return vapeDisposableFAQs;

  // Default: usar FAQs de vape descartável (mais comum)
  return vapeDisposableFAQs.slice(0, 5);
}

// Função para gerar FAQ Schema.org
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}
