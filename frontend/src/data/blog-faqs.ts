/**
 * FAQs para artigos do blog
 * Usado para gerar FAQ Schema (rich snippets Google)
 */

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogFAQs {
  [slug: string]: FAQ[];
}

export const blogFAQs: BlogFAQs = {
  // Artigo: O que é CBD?
  'o-que-e-cbd-guia-completo': [
    {
      question: 'O que é CBD?',
      answer: 'CBD (Canabidiol) é um composto natural encontrado na planta Cannabis sativa. É um dos mais de 100 canabinoides presentes na planta, mas diferente do THC, não causa efeito psicoativo ("barato"). O CBD interage com o sistema endocanabinoide do corpo, oferecendo diversos benefícios terapêuticos como alívio de dor, redução de ansiedade e melhora do sono.'
    },
    {
      question: 'CBD é legal no Brasil?',
      answer: 'Sim, CBD é legal no Brasil desde 2015. A RDC 660/2022 da Anvisa regulamenta a comercialização de produtos de Cannabis para fins medicinais. Produtos com até 0,2% de THC são permitidos com prescrição médica. É possível comprar CBD em farmácias autorizadas ou importar com receita médica.'
    },
    {
      question: 'CBD causa efeito psicoativo?',
      answer: 'Não, CBD puro não causa efeito psicoativo. Ele não altera a consciência, não deixa "chapado" e não prejudica funções cognitivas. Pelo contrário, o CBD é ansiolítico e pode melhorar foco e clareza mental. O efeito psicoativo da cannabis vem do THC, não do CBD.'
    },
    {
      question: 'Para que serve o CBD?',
      answer: 'CBD é usado para diversas condições: dor crônica, ansiedade, insônia, epilepsia, inflamação, enxaqueca, sintomas de câncer, e muito mais. Estudos mostram eficácia principalmente em epilepsia refratária (aprovado pela FDA como Epidiolex), dor neuropática, e transtornos de ansiedade.'
    },
    {
      question: 'Como usar CBD pela primeira vez?',
      answer: 'Para iniciantes, recomenda-se começar com dose baixa (5-10mg) e aumentar gradualmente. O método mais comum é óleo sublingual (gotas sob a língua). Tome 1-2 horas antes do efeito desejado, de preferência com alimento. Aumente 5mg a cada 3-4 dias até encontrar a dose ideal. Sempre consulte um médico antes de iniciar.'
    }
  ],

  // Artigo: CBD vs THC
  'diferenca-cbd-thc': [
    {
      question: 'Qual a diferença entre CBD e THC?',
      answer: 'A principal diferença é que THC é psicoativo (causa "barato") e CBD não. Ambos têm a mesma fórmula química (C21H30O2), mas estrutura molecular diferente. THC se liga fortemente aos receptores CB1 no cérebro causando euforia, enquanto CBD interage indiretamente com o sistema endocanabinoide sem alterar a consciência.'
    },
    {
      question: 'CBD pode dar positivo em teste de drogas?',
      answer: 'CBD puro (isolado) não dá positivo em testes de drogas, pois eles detectam THC, não CBD. Porém, produtos Full Spectrum podem conter traços de THC (até 0,2% no Brasil) que, em uso frequente e altas doses, podem ocasionalmente dar positivo. Para evitar isso, use produtos Broad Spectrum (0% THC) ou Isolado.'
    },
    {
      question: 'CBD e THC podem ser usados juntos?',
      answer: 'Sim, CBD e THC funcionam melhor juntos através do "efeito entourage". O CBD reduz efeitos colaterais do THC (ansiedade, paranoia) e prolonga seus benefícios terapêuticos. Proporções comuns são 1:1, 2:1 ou 20:1 (CBD:THC) dependendo do objetivo. Sempre com prescrição médica para produtos com THC no Brasil.'
    },
    {
      question: 'Qual é melhor para dor: CBD ou THC?',
      answer: 'Para dor, a combinação de CBD e THC geralmente é mais eficaz que isolados. CBD funciona melhor para dor inflamatória e neuropática leve-moderada. THC é mais potente para dor severa e aguda. Produtos com proporção 1:1 ou 2:1 (CBD:THC) oferecem alívio equilibrado com menos efeitos psicoativos.'
    }
  ],

  // Artigo: Dosagem CBD
  'dosagem-cbd-guia-completo': [
    {
      question: 'Qual a dosagem ideal de CBD?',
      answer: 'A dosagem ideal varia por pessoa, condição e produto. Uma regra geral é 1-6mg de CBD por 5kg de peso corporal. Para ansiedade leve: 10-20mg/dia; dor moderada: 20-40mg/dia; condições severas: 40-160mg/dia. Sempre comece com dose baixa (5-10mg) e aumente gradualmente até encontrar o ponto ideal.'
    },
    {
      question: 'Como calcular a dose de CBD em gotas?',
      answer: 'Verifique a concentração do seu óleo (mg/ml). Por exemplo, óleo de 1.000mg em 30ml = 33mg/ml. Se 1ml = 20 gotas, cada gota tem ~1,65mg de CBD. Para dose de 10mg, você precisaria de 6 gotas. A maioria dos produtos vem com dosador que especifica mg por gota ou por ml.'
    },
    {
      question: 'É possível ter overdose de CBD?',
      answer: 'Não há overdose fatal de CBD. Doses muito altas (>1.500mg de uma vez) podem causar desconforto como sonolência extrema, tontura ou diarreia, mas não são perigosas. Estudos mostram segurança até 1.500mg/dia. O corpo elimina excesso naturalmente. Porém, sempre use doses apropriadas para evitar desperdício e efeitos colaterais leves.'
    },
    {
      question: 'Quanto tempo CBD leva para fazer efeito?',
      answer: 'Depende do método: Sublingual (gotas): 15-45 minutos; Cápsulas/comestíveis: 45-90 minutos; Vaping: 5-10 minutos; Tópico: 15-30 minutos (efeito local). O pico de efeito ocorre em 1-2 horas e dura 4-6 horas para via oral. Para condições crônicas, benefício pleno aparece após 2-4 semanas de uso consistente.'
    }
  ],

  // Artigo: CBD para Insônia
  'cbd-para-dormir-insonia': [
    {
      question: 'CBD funciona para insônia?',
      answer: 'Sim, estudos mostram que CBD melhora qualidade e duração do sono em 60-70% dos usuários. CBD trata causas subjacentes da insônia (ansiedade, dor, estresse) e regula o ciclo sono-vigília. Doses de 25-75mg antes de dormir demonstram eficácia. Efeito geralmente aparece em 3-7 dias de uso regular.'
    },
    {
      question: 'Que dose de CBD tomar para dormir?',
      answer: 'Para insônia, a dose recomendada é 25-75mg de CBD tomado 1-2 horas antes de dormir. Comece com 25mg e aumente 10mg a cada 3 dias se necessário. Doses muito baixas (<10mg) podem ser estimulantes. Doses altas (>75mg) são mais sedativas. Combine com higiene do sono para melhores resultados.'
    },
    {
      question: 'CBD deixa sonolento durante o dia?',
      answer: 'CBD não causa sonolência diurna em doses normais (10-40mg). Na verdade, doses baixas-moderadas podem aumentar alerta. Sonolência ocorre com doses altas (>100mg) ou em pessoas muito sensíveis. Se sentir sonolência, tome a dose principal à noite e reduza dose diurna. O efeito sedativo é dose-dependente.'
    },
    {
      question: 'CBD é melhor que melatonina para dormir?',
      answer: 'CBD e melatonina funcionam de formas diferentes e podem ser combinados. Melatonina regula o ciclo circadiano (quando dormir), enquanto CBD trata causas da insônia (ansiedade, dor). Para melhor resultado, combine: 25-50mg CBD + 3-5mg melatonina, 1-2h antes de dormir. CBD oferece benefício mais completo sozinho que melatonina.'
    }
  ],

  // Artigo: CBD e Epilepsia
  'cbd-epilepsia-estudos': [
    {
      question: 'CBD é aprovado para epilepsia?',
      answer: 'Sim, Epidiolex (CBD farmacêutico 99% puro) foi aprovado pela FDA em 2018 para tratar epilepsia refratária em pacientes com Síndrome de Dravet, Lennox-Gastaut e Esclerose Tuberosa (TSC). É o primeiro medicamento de cannabis aprovado pela FDA. No Brasil, CBD para epilepsia é permitido com prescrição médica desde 2015.'
    },
    {
      question: 'CBD reduz convulsões em quanto tempo?',
      answer: 'Estudos clínicos mostram que redução de convulsões começa em 4-8 semanas após iniciar CBD em dose terapêutica. Efeito máximo é observado em 12-16 semanas. Aproximadamente 40-50% dos pacientes têm redução ≥50% na frequência de convulsões. É importante manter dose consistente e não esperar resultado imediato.'
    },
    {
      question: 'Qual dose de CBD para epilepsia?',
      answer: 'Para epilepsia, a dose terapêutica é 10-20mg/kg/dia dividida em 2 doses (protocolo Epidiolex). Por exemplo, criança de 20kg: 200-400mg/dia total. Inicia-se com 2,5mg/kg/dia e aumenta gradualmente a cada semana. Doses até 50mg/kg/dia são usadas em casos severos. SEMPRE sob supervisão médica neurológica.'
    },
    {
      question: 'CBD pode substituir anticonvulsivantes?',
      answer: 'Geralmente NÃO. CBD é usado como terapia adjuvante (adicional), não substituto. Pacientes continuam medicamentos anticonvulsivantes e adicionam CBD para controle adicional. Em alguns casos, médico pode reduzir doses de outros medicamentos após resposta boa ao CBD, mas NUNCA interrompa medicamentos sem orientação médica.'
    }
  ],

  // Artigo: Sistema Endocanabinoide
  'sistema-endocanabinoide-explicado': [
    {
      question: 'O que é o sistema endocanabinoide?',
      answer: 'O sistema endocanabinoide (SEC) é um sistema regulatório do corpo humano descoberto na década de 1990. É composto por receptores (CB1 e CB2), endocanabinoides (moléculas produzidas pelo corpo) e enzimas. O SEC regula homeostase: dor, humor, sono, apetite, memória, sistema imune e muito mais. CBD interage com este sistema.'
    },
    {
      question: 'Todos os humanos têm sistema endocanabinoide?',
      answer: 'Sim, todos os vertebrados (humanos, animais) têm sistema endocanabinoide. É um sistema biológico fundamental presente desde o nascimento. O SEC funciona independente de usar cannabis - o corpo produz seus próprios canabinoides (anandamida, 2-AG). Cannabis/CBD apenas interage com este sistema já existente.'
    },
    {
      question: 'Como fortalecer o sistema endocanabinoide?',
      answer: 'Formas naturais: 1) Consumir ômega-3 (EPA/DHA) - precursor de endocanabinoides; 2) Exercício aeróbico regular - aumenta anandamida; 3) Reduzir estresse - cortisol suprime SEC; 4) Sono adequado (7-9h); 5) Chocolate amargo - contém anandamida; 6) Probióticos - SEC intestinal. CBD suplementa quando sistema está deficiente.'
    }
  ],

  // Artigo: CBD Efeitos Colaterais
  'cbd-efeitos-colaterais': [
    {
      question: 'Quais são os efeitos colaterais do CBD?',
      answer: 'Efeitos colaterais do CBD são raros e geralmente leves: sonolência (10-30%), boca seca (10-20%), alteração de apetite (10-15%), diarreia (5-10%), tontura (3-8%). Efeitos sérios são raros: elevação de enzimas hepáticas em doses muito altas (>20mg/kg/dia). CBD é considerado muito seguro pela OMS e FDA.'
    },
    {
      question: 'CBD interage com medicamentos?',
      answer: 'Sim, CBD pode interagir com medicamentos metabolizados pelo fígado (citocromo P450). Interações importantes: anticoagulantes (aumenta efeito), clobazam (aumenta sedação), valproato (risco hepático). Regra: se medicamento tem aviso "não consumir toranja", pode interagir com CBD. SEMPRE informe médico sobre todos medicamentos antes de usar CBD.'
    },
    {
      question: 'CBD causa dependência?',
      answer: 'Não, CBD não causa dependência física ou psicológica. A OMS declarou em 2017 que "CBD não apresenta potencial de abuso ou dependência". Diferente de THC, benzodiazepínicos ou opioides, você pode parar CBD abruptamente sem sintomas de abstinência. É uma das substâncias terapêuticas mais seguras disponíveis.'
    },
    {
      question: 'Grávidas podem usar CBD?',
      answer: 'NÃO recomendado. FDA e Anvisa contraindicam CBD durante gravidez e amamentação por precaução. Estudos em humanos são limitados, mas pesquisas em animais mostram possível impacto no desenvolvimento fetal. CBD atravessa a placenta e está presente no leite materno. Use apenas se benefício claramente supera risco, sob supervisão médica rigorosa.'
    }
  ],

  // Artigo: CBD para Pets
  'cbd-pets-caes-gatos': [
    {
      question: 'CBD é seguro para cães e gatos?',
      answer: 'Sim, CBD é seguro para pets quando usado corretamente. Estudos da Cornell University e Colorado State confirmam segurança em cães. Importante: use APENAS produtos 0% THC (THC é tóxico para pets). Dose recomendada: 0,25-2mg/kg, 2x/dia. Sempre produtos específicos para pets, sem xilitol ou ingredientes tóxicos. Consulte veterinário.'
    },
    {
      question: 'Que dose de CBD dar ao meu cachorro?',
      answer: 'Dose inicial: 0,25-0,5mg CBD por kg de peso, 2x/dia. Exemplo: cachorro de 10kg = 2,5-5mg, 2x/dia. Dose terapêutica (estudos): 1-2mg/kg, 2x/dia. Para condições severas: até 5mg/kg, 2x/dia. Comece baixo e aumente gradualmente a cada 3-4 dias. Para gatos, use 50-75% da dose canina equivalente.'
    },
    {
      question: 'CBD funciona para artrite em cães?',
      answer: 'Sim, estudo da Cornell (2018) mostrou que 80% dos cães com artrite melhoraram significativamente com CBD (2mg/kg, 2x/dia). Benefícios: aumento de atividade física, redução de dor, melhora de mobilidade, sem efeitos colaterais sérios. CBD é alternativa segura a NSAIDs que causam problemas gástricos em pets.'
    },
    {
      question: 'Meu pet pode ter overdose de CBD?',
      answer: 'Não há overdose fatal de CBD em pets. Doses excessivas podem causar sonolência, tontura leve ou diarreia, mas não são perigosas. Estudos mostram segurança até 10mg/kg/dia em cães. Importante: evitar produtos com THC (tóxico para pets) e xilitol (letal). Se dose excessiva acidental, ofereça água e deixe descansar - efeito passa em 6-8h.'
    }
  ],

  // Artigo: COA
  'coa-certificado-analise-cbd': [
    {
      question: 'O que é COA de CBD?',
      answer: 'COA (Certificado de Análise) é um documento de laboratório terceirizado que verifica: concentração exata de CBD/THC, ausência de contaminantes (pesticidas, metais pesados, solventes), perfil de terpenos e microbiológicos. É a ÚNICA forma de confirmar que produto contém o que promete e é seguro. NUNCA compre CBD sem COA verificável.'
    },
    {
      question: 'Como ler um COA de CBD?',
      answer: 'Verifique: 1) Laboratório é terceirizado e acreditado (ISO 17025); 2) Número de lote corresponde ao produto; 3) CBD total está ±10% do declarado; 4) THC ≤0,2% (Brasil); 5) Pesticidas: ND (não detectado) em todos; 6) Metais pesados: ND; 7) Solventes: ND ou mínimos; 8) Data do teste recente (<6 meses).'
    },
    {
      question: 'Como verificar se COA é verdadeiro?',
      answer: 'Checklist anti-fraude: 1) Ligue para o laboratório e confirme que testaram aquele lote; 2) Verifique acreditação ISO 17025 do lab; 3) Compare número de lote do COA com embalagem; 4) Escaneie QR code (se houver); 5) Procure assinatura/carimbo oficial. Red flags: COA genérico sem lote, empresa se recusa a fornecer, lab não existe.'
    },
    {
      question: 'O que significa ND no COA?',
      answer: 'ND significa "Not Detected" (Não Detectado). Indica que aquele composto (pesticida, metal pesado, solvente) estava abaixo do limite de detecção do equipamento ou ausente. ND é o ideal para todos contaminantes. Para canabinoides, ND significa concentração zero ou traços insignificantes (<0,01%).'
    }
  ],

  // Artigo: CBD para Idosos
  'cbd-idosos-terceira-idade': [
    {
      question: 'CBD é seguro para idosos?',
      answer: 'Sim, CBD é seguro para idosos e pode ser especialmente benéfico. Estudos mostram que 65-75% dos idosos relatam melhora em dor, sono ou ansiedade. Importante: iniciar com dose MUITO baixa (2,5-5mg) devido metabolismo mais lento, informar médico sobre todos medicamentos (interações), e aumentar dose gradualmente. Protocolo "Start Low, Go Slow".'
    },
    {
      question: 'CBD ajuda em artrite em idosos?',
      answer: 'Sim, estudos mostram que 67% dos idosos com artrite relatam melhora significativa da dor com CBD. Protocolo típico: 10-20mg, 2x/dia via oral + creme/gel CBD tópico nas articulações. Benefícios: redução de dor e inflamação, melhora de mobilidade, possibilidade de reduzir NSAIDs (que causam problemas gástricos). Efeito aparece em 3-7 dias.'
    },
    {
      question: 'CBD interage com remédios de pressão?',
      answer: 'CBD pode interagir com anti-hipertensivos potencializando redução de pressão. Risco: hipotensão, tontura, quedas. Precauções: 1) Informar médico antes de iniciar; 2) Monitorar pressão arterial diariamente no início; 3) Iniciar dose MUITO baixa (2,5mg); 4) Reportar tontura imediatamente. CBD pode permitir reduzir dose de anti-hipertensivos (com orientação médica).'
    },
    {
      question: 'Idosos podem usar CBD com anticoagulantes?',
      answer: 'SIM, mas com PRECAUÇÃO. CBD pode aumentar efeito de anticoagulantes (varfarina, rivaroxabana, apixabana, clopidogrel), elevando risco de sangramento. Obrigatório: 1) Consultar médico ANTES; 2) Monitorar INR semanalmente (se varfarina); 3) Observar sinais de sangramento (hematomas, sangue urina/fezes); 4) Ajuste de dose do anticoagulante pode ser necessário. NUNCA inicie sem orientação médica.'
    }
  ],

  // Artigo: Full Spectrum vs Isolado
  'full-spectrum-vs-isolado-cbd': [
    {
      question: 'Qual a diferença entre Full Spectrum e Isolado?',
      answer: 'Full Spectrum contém todos os canabinoides (CBD, CBG, CBN, traços de THC ≤0,2%) e terpenos da planta (efeito entourage). Isolado é CBD 99% puro, sem outros compostos. Full Spectrum é mais eficaz para maioria das condições devido sinergia dos compostos. Isolado é melhor para: testes de drogas, sensibilidade a THC, ou uso em alta dose específica.'
    },
    {
      question: 'O que é Broad Spectrum CBD?',
      answer: 'Broad Spectrum é o meio-termo: contém múltiplos canabinoides (CBD, CBG, CBN) e terpenos EXCETO THC (0,0%). Oferece efeito entourage sem risco de THC em teste de drogas. Ideal para: atletas, profissões com teste obrigatório, pessoas que querem evitar qualquer THC, mas desejam benefício da sinergia de compostos.'
    },
    {
      question: 'Full Spectrum dá positivo em teste de drogas?',
      answer: 'Pode dar, mas é raro. Full Spectrum contém traços de THC (≤0,2% no Brasil). Em uso diário de doses altas (>100mg CBD), THC pode acumular e ocasionalmente dar positivo. Risco aumenta com: doses muito altas, uso prolongado, metabolismo lento. Para ZERO risco: use Broad Spectrum (0% THC) ou Isolado.'
    },
    {
      question: 'Qual tipo de CBD é melhor?',
      answer: 'Depende do objetivo: Full Spectrum - melhor para dor crônica, sono, inflamação (efeito entourage); Broad Spectrum - melhor para ansiedade, uso diurno, evitar THC; Isolado - melhor para dose alta específica, pediatria, sensibilidade a terpenos. Para maioria: Full ou Broad Spectrum são superiores devido efeito entourage.'
    }
  ],

  // Artigo: Óleo CBD Como Usar
  'oleo-cbd-como-usar': [
    {
      question: 'Como usar óleo de CBD corretamente?',
      answer: 'Método sublingual (mais eficaz): 1) Coloque gotas sob a língua; 2) Segure 60-90 segundos antes de engolir; 3) Não coma/beba por 15min após. Dose inicial: 5-10mg (geralmente 3-6 gotas), 1-2x/dia. Tome com alimento gorduroso para melhor absorção. Efeito em 15-45min, dura 4-6h. Aumente gradualmente até dose ideal.'
    },
    {
      question: 'Quantas gotas de CBD devo tomar?',
      answer: 'Depende da concentração do óleo. Exemplo: óleo de 1.000mg em 30ml = ~33mg/ml. Se 1ml = 20 gotas, cada gota tem ~1,65mg. Para dose de 10mg: 6 gotas. Sempre verifique concentração no rótulo. Maioria dos produtos especifica mg por gota. Comece com 3-6 gotas e ajuste conforme resposta.'
    },
    {
      question: 'Posso colocar óleo de CBD na comida?',
      answer: 'Sim, mas é menos eficaz. Sublingual tem absorção de 20-30%; na comida cai para 6-15% (metabolismo de primeira passagem). Se preferir comida: misture em alimento gorduroso (abacate, manteiga de amendoim, azeite) para melhor absorção. Efeito demora 45-90min mas dura mais (6-8h). Bom para quem não gosta do sabor.'
    },
    {
      question: 'Quanto tempo óleo de CBD dura?',
      answer: 'Óleo de CBD bem armazenado dura 12-24 meses. Prazo de validade típico: 18 meses. Para maximizar vida útil: 1) Armazene em local fresco e escuro; 2) Feche bem após uso; 3) Evite luz direta; 4) Geladeira é opcional mas prolonga durabilidade. Sinais de degradação: mudança de cor escura, cheiro rançoso, separação de líquidos.'
    }
  ],

  // Artigo: CBD para Dor Crônica
  'cbd-dor-cronica': [
    {
      question: 'CBD funciona para dor crônica?',
      answer: 'Sim, estudos mostram que 60-70% das pessoas com dor crônica relatam melhora com CBD. É especialmente eficaz para: dor neuropática, artrite, fibromialgia, dor lombar, enxaqueca. CBD funciona através de 5 mecanismos: anti-inflamatório (CB2), modulação de dor (sistema endocanabinoide), redução de sensibilização central, efeito miorrelaxante e ansiolítico (reduz percepção de dor).'
    },
    {
      question: 'Qual dose de CBD para dor crônica?',
      answer: 'Dose varia por severidade: Dor leve: 10-20mg, 2x/dia; Dor moderada: 20-40mg, 2-3x/dia; Dor severa: 40-80mg, 2-3x/dia. Iniciar com 10mg, 2x/dia e aumentar 10mg a cada 3 dias. Maioria encontra alívio em 25-50mg/dia. Combinar oral (sistêmico) + tópico (local) maximiza benefício. Efeito pleno aparece em 2-4 semanas.'
    },
    {
      question: 'CBD é melhor que opioides para dor?',
      answer: 'CBD não é mais potente que opioides para dor aguda severa, mas tem vantagens significativas: não causa dependência, sem risco de overdose fatal, menos efeitos colaterais, trata inflamação subjacente (opioides apenas mascaram dor). Estudos mostram que CBD permite reduzir 40-60% da dose de opioides em dor crônica, reduzindo risco de dependência.'
    },
    {
      question: 'Posso substituir anti-inflamatórios por CBD?',
      answer: 'Possivelmente, mas consulte médico. CBD tem efeito anti-inflamatório comparável a ibuprofeno em estudos pré-clínicos, sem riscos gástricos ou renais. Muitos pacientes reduzem ou eliminam NSAIDs após 4-6 semanas de CBD. Vantagem: CBD trata causa (inflamação) e sintoma (dor), enquanto NSAIDs apenas sintoma. Não interrompa medicamentos sem orientação.'
    }
  ],

  // Artigo: Como Escolher CBD de Qualidade
  'como-escolher-cbd-qualidade': [
    {
      question: 'Como saber se CBD é de qualidade?',
      answer: 'Checklist de qualidade: 1) COA de laboratório terceirizado disponível; 2) Extração CO2 supercrítico; 3) Origem do cânhamo identificada (Colorado, Oregon, Suíça); 4) Concentração clara (mg CBD especificado); 5) Óleo carreador de qualidade (MCT ideal); 6) THC ≤0,2%; 7) Empresa transparente (contato, história); 8) Preço realista (R$0,20-0,50 por mg); 9) Avaliações autênticas; 10) Conformidade legal (Anvisa).'
    },
    {
      question: 'Qual o melhor óleo carreador para CBD?',
      answer: 'MCT (óleo de coco) é o melhor: absorção superior, sabor neutro, vida útil longa, benefícios adicionais (energia, cetose). Outras opções: Óleo de semente de cânhamo (rico em ômega-3/6, sabor forte); Azeite (seguro, antioxidantes, absorção moderada). EVITAR: óleos vegetais baratos (soja, girassol) - inflamatórios e baixa qualidade.'
    },
    {
      question: 'Qual preço justo para CBD?',
      answer: 'Preço justo (Brasil 2025): R$0,20-0,50 por mg de CBD. Exemplo: frasco de 1.000mg deve custar R$200-500. Calcule: (Preço) ÷ (Total CBD em mg). Preços <R$0,15/mg são suspeitos (baixa qualidade); >R$0,60/mg é caro (a menos que orgânico certificado). Desconfie de "promoções" constantes - produto nunca no preço real.'
    },
    {
      question: 'CBD de farmácia é melhor que importado?',
      answer: 'Não necessariamente. Vantagens farmácia: fiscalização Anvisa, fácil acesso, sem espera. Vantagens importado: mais opções, geralmente mais barato, marcas internacionais estabelecidas. O importante: verificar COA (ambos devem ter), origem, método extração. Qualidade depende do fabricante, não do canal de venda. Ambos podem ser excelentes ou ruins.'
    }
  ]
};

/**
 * Obtém FAQs para um artigo específico
 */
export function getFAQsForPost(slug: string): FAQ[] | null {
  return blogFAQs[slug] || null;
}

/**
 * Verifica se artigo tem FAQs
 */
export function hasFAQs(slug: string): boolean {
  return slug in blogFAQs;
}
