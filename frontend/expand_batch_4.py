#!/usr/bin/env python3
"""
Batch 4: Expandir artigos 8-10 (CBD Epilepsia, Sistema Endocanabinoide, Efeitos Colaterais)
"""
import json
import sys

# Artigo 8: CBD e Epilepsia
article_cbd_epilepsia = """<h1>CBD e Epilepsia: Estudos, Eficácia e Aprovação da FDA</h1>

<p>O CBD revolucionou o tratamento de epilepsia, especialmente em casos refratários que não respondem a medicamentos convencionais. Este é o primeiro caso de aprovação regulatória do CBD como medicamento pela FDA (Epidiolex), baseado em estudos clínicos robustos.</p>

<h2>O Marco Histórico: Charlotte's Web</h2>

<p>A história moderna do CBD para epilepsia começou com <strong>Charlotte Figi</strong>, uma criança com síndrome de Dravet que sofria centenas de convulsões por semana. Após iniciar tratamento com CBD em 2012:</p>

<ul>
<li>✅ Redução de ~300 convulsões/semana para 2-3/mês</li>
<li>✅ Melhora cognitiva significativa</li>
<li>✅ Redução de medicamentos anticonvulsivantes</li>
<li>✅ Qualidade de vida restaurada</li>
</ul>

<p>Este caso catalisou pesquisas científicas e mudou políticas públicas globalmente.</p>

<h2>Epidiolex: Primeiro CBD Aprovado pela FDA</h2>

<h3>Informações Básicas:</h3>
<ul>
<li><strong>Princípio Ativo:</strong> Canabidiol (CBD) 99% puro</li>
<li><strong>Aprovação FDA:</strong> Junho 2018</li>
<li><strong>Indicações Aprovadas:</strong> Síndrome de Dravet, Síndrome de Lennox-Gastaut, Complexo Esclerose Tuberosa (TSC)</li>
<li><strong>Idade Mínima:</strong> 2 anos</li>
<li><strong>Forma:</strong> Solução oral (100mg CBD/ml)</li>
<li><strong>Fabricante:</strong> GW Pharmaceuticals (agora Jazz Pharmaceuticals)</li>
</ul>

<h3>Por Que a Aprovação é Importante:</h3>
<ol>
<li>✅ Validação científica rigorosa (estudos clínicos fase III)</li>
<li>✅ Protocolo de dosagem estabelecido</li>
<li>✅ Perfil de segurança extensivamente documentado</li>
<li>✅ Cobertura por seguros de saúde (em alguns países)</li>
<li>✅ Padrão de qualidade farmacêutico</li>
</ol>

<h2>Estudos Clínicos Principais</h2>

<h3>Estudo 1: Síndrome de Dravet (GWPCARE1)</h3>

<p><strong>Publicação:</strong> New England Journal of Medicine, 2017<br>
<strong>Participantes:</strong> 120 crianças (2-18 anos)<br>
<strong>Desenho:</strong> Duplo-cego, placebo-controlado<br>
<strong>Duração:</strong> 14 semanas</p>

<p><strong>Protocolo:</strong></p>
<ul>
<li>Grupo 1: CBD 20mg/kg/dia</li>
<li>Grupo 2: Placebo</li>
<li>Ambos continuaram medicamentos existentes</li>
</ul>

<p><strong>Resultados:</strong></p>
<table>
<tr>
<th>Métrica</th>
<th>Grupo CBD</th>
<th>Grupo Placebo</th>
</tr>
<tr>
<td><strong>Redução Convulsões</strong></td>
<td>-38,9%</td>
<td>-13,3%</td>
</tr>
<tr>
<td><strong>50% Redução</strong></td>
<td>43% pacientes</td>
<td>27% pacientes</td>
</tr>
<tr>
<td><strong>Livre de Convulsões</strong></td>
<td>5% pacientes</td>
<td>0% pacientes</td>
</tr>
<tr>
<td><strong>Melhora Qualidade Vida</strong></td>
<td>62% cuidadores</td>
<td>34% cuidadores</td>
</tr>
</table>

<p><strong>Significância Estatística:</strong> p < 0.01 (altamente significativo)</p>

<h3>Estudo 2: Síndrome de Lennox-Gastaut (GWPCARE3)</h3>

<p><strong>Publicação:</strong> Lancet, 2018<br>
<strong>Participantes:</strong> 225 pacientes (2-55 anos)<br>
<strong>Duração:</strong> 14 semanas</p>

<p><strong>Protocolo (3 grupos):</strong></p>
<ul>
<li>Grupo 1: CBD 20mg/kg/dia</li>
<li>Grupo 2: CBD 10mg/kg/dia</li>
<li>Grupo 3: Placebo</li>
</ul>

<p><strong>Resultados (Convulsões Drop):</strong></p>
<table>
<tr>
<th>Grupo</th>
<th>Redução Média</th>
<th>50% Resposta</th>
</tr>
<tr>
<td>CBD 20mg/kg</td>
<td>-41,9%</td>
<td>44%</td>
</tr>
<tr>
<td>CBD 10mg/kg</td>
<td>-37,2%</td>
<td>40%</td>
</tr>
<tr>
<td>Placebo</td>
<td>-17,2%</td>
<td>22%</td>
</tr>
</table>

<p><strong>Conclusão:</strong> Efeito dose-dependente observado, ambas doses superiores ao placebo.</p>

<h3>Estudo 3: Complexo Esclerose Tuberosa (GWPCARE6)</h3>

<p><strong>Publicação:</strong> New England Journal of Medicine, 2018<br>
<strong>Participantes:</strong> 224 pacientes<br>
<strong>Dose:</strong> CBD 25mg/kg/dia (máximo 50mg/kg)</p>

<p><strong>Resultados:</strong></p>
<ul>
<li>✅ <strong>Redução média:</strong> 48,6% (vs 26,5% placebo)</li>
<li>✅ <strong>50% resposta:</strong> 48,6% pacientes (vs 24,8% placebo)</li>
<li>✅ <strong>Livre de convulsões:</strong> 8,4% (vs 1,8% placebo)</li>
</ul>

<h2>Mecanismos de Ação: Como o CBD Funciona na Epilepsia</h2>

<p>O mecanismo anticonvulsivante do CBD é complexo e envolve múltiplos alvos:</p>

<h3>1. Modulação de Canais Iônicos</h3>
<ul>
<li><strong>Canais de Sódio (Nav):</strong> CBD reduz hiperexcitabilidade neuronal</li>
<li><strong>Canais de Cálcio (VDCC):</strong> Controla liberação de neurotransmissores</li>
<li><strong>Canais de Potássio:</strong> Hiperpolariza neurônios, reduzindo disparo</li>
</ul>

<h3>2. Sistema Endocanabinoide</h3>
<ul>
<li><strong>GPR55:</strong> Antagonista que reduz excitabilidade</li>
<li><strong>CB1 (indiretamente):</strong> Aumenta anandamida (endocanabinoide)</li>
<li><strong>CB2:</strong> Efeitos anti-inflamatórios cerebrais</li>
</ul>

<h3>3. Receptores de Serotonina</h3>
<ul>
<li><strong>5-HT1A:</strong> Agonista que tem efeitos anticonvulsivantes</li>
</ul>

<h3>4. Sistema GABAérgico</h3>
<ul>
<li><strong>GABA:</strong> CBD potencializa sistema inibitório principal do cérebro</li>
</ul>

<h3>5. Neuroinflamação</h3>
<ul>
<li><strong>Anti-inflamatório:</strong> Reduz inflamação cerebral associada à epilepsia</li>
</ul>

<h2>Tipos de Epilepsia e Resposta ao CBD</h2>

<h3>Altamente Responsivas ao CBD:</h3>

<p><strong>1. Síndrome de Dravet</strong></p>
<ul>
<li>Início: 1º ano de vida</li>
<li>Características: Convulsões febris severas, resistente a medicamentos</li>
<li>Resposta CBD: 40-50% redução média</li>
<li>Dose típica: 10-20mg/kg/dia</li>
</ul>

<p><strong>2. Síndrome de Lennox-Gastaut</strong></p>
<ul>
<li>Início: 3-5 anos</li>
<li>Características: Múltiplos tipos de convulsão, comprometimento cognitivo</li>
<li>Resposta CBD: 35-45% redução média</li>
<li>Dose típica: 10-20mg/kg/dia</li>
</ul>

<p><strong>3. Complexo Esclerose Tuberosa (TSC)</strong></p>
<ul>
<li>Característica: Tumores benignos cerebrais causando epilepsia</li>
<li>Resposta CBD: 45-50% redução média</li>
<li>Dose típica: 25mg/kg/dia</li>
</ul>

<h3>Moderadamente Responsivas:</h3>
<ul>
<li><strong>Epilepsia Focal Refratária:</strong> 20-30% redução</li>
<li><strong>Espasmos Infantis (Síndrome West):</strong> Dados preliminares positivos</li>
<li><strong>Epilepsia Mioclônica:</strong> Resposta variável</li>
</ul>

<h3>Menos Responsivas:</h3>
<ul>
<li><strong>Epilepsia bem controlada com medicamentos:</strong> Benefício marginal</li>
<li><strong>Epilepsia de Ausência:</strong> Evidências limitadas</li>
</ul>

<h2>Protocolo de Tratamento com CBD</h2>

<h3>Passo 1: Avaliação Médica Completa</h3>
<ol>
<li>✅ Confirmar diagnóstico de epilepsia refratária</li>
<li>✅ Revisar histórico completo de medicamentos</li>
<li>✅ Exames basais (função hepática, hemograma)</li>
<li>✅ EEG recente</li>
<li>✅ Diário de convulsões (pelo menos 1 mês)</li>
</ol>

<h3>Passo 2: Dosagem Inicial (Protocolo Epidiolex)</h3>

<p><strong>Semana 1:</strong> 2,5mg/kg/dia dividido em 2 doses (manhã e noite)</p>
<p><strong>Semana 2:</strong> 5mg/kg/dia (2 doses)</p>
<p><strong>Semana 3+:</strong> Aumentar 2,5-5mg/kg a cada semana até:</p>
<ul>
<li>Dose alvo: 10-20mg/kg/dia (Dravet, Lennox-Gastaut)</li>
<li>Dose alvo: 25mg/kg/dia (TSC)</li>
<li>Máximo: 50mg/kg/dia (sob supervisão)</li>
</ul>

<h3>Exemplo Prático (Criança 20kg):</h3>
<table>
<tr>
<th>Semana</th>
<th>Dose Total/Dia</th>
<th>Manhã</th>
<th>Noite</th>
</tr>
<tr>
<td>1</td>
<td>50mg</td>
<td>25mg</td>
<td>25mg</td>
</tr>
<tr>
<td>2</td>
<td>100mg</td>
<td>50mg</td>
<td>50mg</td>
</tr>
<tr>
<td>3</td>
<td>150mg</td>
<td>75mg</td>
<td>75mg</td>
</tr>
<tr>
<td>4</td>
<td>200mg</td>
<td>100mg</td>
<td>100mg</td>
</tr>
<tr>
<td>5</td>
<td>300mg</td>
<td>150mg</td>
<td>150mg</td>
</tr>
<tr>
<td>6+</td>
<td>400mg (20mg/kg)</td>
<td>200mg</td>
<td>200mg</td>
</tr>
</table>

<h3>Passo 3: Monitoramento</h3>

<p><strong>Mensal (primeiros 3 meses):</strong></p>
<ul>
<li>✅ Contagem de convulsões (diário)</li>
<li>✅ Função hepática (ALT, AST)</li>
<li>✅ Peso corporal (ajustar dose)</li>
<li>✅ Efeitos colaterais</li>
</ul>

<p><strong>Trimestral (após estabilização):</strong></p>
<ul>
<li>✅ Níveis sanguíneos de anticonvulsivantes concomitantes</li>
<li>✅ Avaliação cognitiva/comportamental</li>
<li>✅ EEG (se clinicamente indicado)</li>
</ul>

<h3>Passo 4: Ajustes</h3>

<p><strong>Se resposta insuficiente (<25% redução):</strong></p>
<ul>
<li>Aumentar dose em incrementos de 5mg/kg até máximo 50mg/kg/dia</li>
<li>Aguardar 2-4 semanas entre ajustes</li>
</ul>

<p><strong>Se resposta excelente (>75% redução):</strong></p>
<ul>
<li>Considerar redução gradual de outros anticonvulsivantes</li>
<li>Sempre sob supervisão médica</li>
</ul>

<h2>Interações Medicamentosas Importantes</h2>

<h3>CBD Aumenta Níveis de:</h3>

<p><strong>Clobazam (Onfi):</strong></p>
<ul>
<li>⚠️ Interação mais significativa</li>
<li>⚠️ Pode causar sedação excessiva</li>
<li>✅ Solução: Reduzir dose clobazam em 50%</li>
<li>✅ Monitorar níveis séricos</li>
</ul>

<p><strong>Valproato (Depakene):</strong></p>
<ul>
<li>⚠️ Risco aumentado de lesão hepática</li>
<li>✅ Monitorar função hepática mensalmente</li>
<li>✅ Considerar reduzir dose valproato</li>
</ul>

<p><strong>Outros:</strong></p>
<ul>
<li>Topiramato (Topamax)</li>
<li>Rufinamida (Banzel)</li>
<li>Zonisamida (Zonegran)</li>
</ul>

<h3>CBD Diminui Níveis de:</h3>
<ul>
<li>Levatiracetam (Keppra) - interação menor</li>
</ul>

<p><strong>Importante:</strong> Sempre informar todos os medicamentos ao médico prescritor.</p>

<h2>Efeitos Colaterais em Epilepsia</h2>

<h3>Comuns (>10%):</h3>
<ul>
<li>Sonolência (especialmente se com clobazam)</li>
<li>Diminuição de apetite</li>
<li>Diarreia</li>
<li>Fadiga</li>
<li>Elevação de enzimas hepáticas (geralmente assintomático)</li>
</ul>

<h3>Ocasionais (1-10%):</h3>
<ul>
<li>Infecções respiratórias superiores</li>
<li>Vômito</li>
<li>Febre</li>
<li>Irritabilidade</li>
</ul>

<h3>Raros mas Sérios (<1%):</h3>
<ul>
<li>Lesão hepática (hepatotoxicidade)</li>
<li>Pensamentos suicidas (como todos anticonvulsivantes)</li>
</ul>

<p><strong>Manejo:</strong> Maioria dos efeitos colaterais são leves-moderados e melhoram com ajuste de dose ou tempo.</p>

<h2>CBD para Epilepsia no Brasil</h2>

<h3>Regulamentação:</h3>
<ul>
<li>✅ <strong>Legal:</strong> Desde 2015 (RDC 17/2015), atualizado RDC 660/2022</li>
<li>✅ <strong>Prescrição:</strong> Médico neurologista ou pediatra</li>
<li>✅ <strong>Importação:</strong> Permitida com receita</li>
<li>✅ <strong>Farmácias:</strong> Algumas vendem produtos aprovados</li>
</ul>

<h3>Produtos Disponíveis:</h3>
<ul>
<li><strong>Epidiolex (importado):</strong> Padrão-ouro, mais caro</li>
<li><strong>Genéricos brasileiros:</strong> Mais acessíveis, qualidade variável</li>
<li><strong>Importados individuais:</strong> Diversas marcas aprovadas</li>
</ul>

<h3>Custo Típico (2025):</h3>
<ul>
<li><strong>Epidiolex:</strong> R$ 2.000-3.000/mês</li>
<li><strong>Genéricos/Importados:</strong> R$ 500-1.500/mês</li>
</ul>

<p><strong>Nota:</strong> Algumas decisões judiciais garantem fornecimento gratuito pelo SUS.</p>

<h2>Taxas de Sucesso e Expectativas</h2>

<h3>O Que Esperar Realisticamente:</h3>

<p><strong>Resposta Completa (>75% redução):</strong> 20-30% pacientes</p>
<p><strong>Resposta Boa (50-75% redução):</strong> 20-30% pacientes</p>
<p><strong>Resposta Moderada (25-50% redução):</strong> 20-25% pacientes</p>
<p><strong>Resposta Mínima (<25% redução):</strong> 20-30% pacientes</p>

<p><strong>Conclusão:</strong> ~60-70% dos pacientes terão benefício clinicamente significativo (>25% redução)</p>

<h3>Fatores de Melhor Resposta:</h3>
<ul>
<li>✅ Síndrome de Dravet, Lennox-Gastaut, TSC</li>
<li>✅ Idade mais jovem</li>
<li>✅ Menos medicamentos anticonvulsivantes concomitantes</li>
<li>✅ Início de tratamento mais precoce</li>
<li>✅ Dose adequada (10-20mg/kg/dia)</li>
</ul>

<h2>Perguntas Frequentes</h2>

<h3>1. CBD pode curar epilepsia?</h3>
<p><strong>Não.</strong> CBD controla convulsões mas não cura a condição subjacente. Descontinuar pode levar ao retorno das convulsões.</p>

<h3>2. Quanto tempo para ver resultados?</h3>
<p>Geralmente <strong>4-12 semanas</strong> após atingir dose terapêutica. Alguns pacientes respondem mais rápido.</p>

<h3>3. Pode substituir todos os outros medicamentos?</h3>
<p><strong>Raramente.</strong> CBD geralmente é usado como terapia adjuvante (adicional), não substituto completo.</p>

<h3>4. É seguro para crianças pequenas?</h3>
<p><strong>Sim.</strong> Epidiolex aprovado desde 2 anos. Estudos mostram segurança em uso pediátrico.</p>

<h3>5. CBD causa "barato"?</h3>
<p><strong>Não.</strong> CBD puro não tem efeito psicoativo. Epidiolex contém <0,1% THC.</p>

<h2>Conclusão</h2>

<p>CBD representa um avanço significativo no tratamento de epilepsia refratária, especialmente em síndromes pediátricas severas como Dravet e Lennox-Gastaut. Com aprovação da FDA baseada em estudos rigorosos, temos agora:</p>

<ul>
<li>✅ Evidência científica robusta de eficácia</li>
<li>✅ Protocolo de dosagem estabelecido</li>
<li>✅ Perfil de segurança bem documentado</li>
<li>✅ Opção para pacientes sem outras alternativas</li>
</ul>

<p><strong>Expectativa realista:</strong> 60-70% dos pacientes terão redução clinicamente significativa de convulsões, melhorando qualidade de vida.</p>

<p><strong>Próximos Passos:</strong></p>
<ol>
<li>Consultar neurologista especializado em epilepsia</li>
<li>Documentar frequência atual de convulsões (diário por 4 semanas)</li>
<li>Discutir se CBD é adequado para seu caso</li>
<li>Obter prescrição e iniciar titulação gradual</li>
<li>Monitorar resposta e ajustar com orientação médica</li>
</ol>

<p><small><strong>Aviso Legal:</strong> Este conteúdo é educacional. Não substitui consulta médica. CBD para epilepsia deve ser usado apenas sob supervisão médica especializada.</small></p>"""

# Artigo 9: Sistema Endocanabinoide
article_sistema_endocanabinoide = """<h1>Sistema Endocanabinoide: Como Funciona e Por Que É Importante</h1>

<p>O sistema endocanabinoide (SEC) é um dos sistemas regulatórios mais importantes do corpo humano, mas permaneceu desconhecido pela ciência até a década de 1990. Compreender o SEC é fundamental para entender como cannabis, CBD e THC funcionam no organismo.</p>

<h2>Descoberta do Sistema Endocanabinoide</h2>

<h3>Linha do Tempo:</h3>

<p><strong>1964:</strong> Dr. Raphael Mechoulam isola THC<br>
<strong>1988:</strong> Primeira descoberta de receptor canabinoide (CB1) no cérebro de rato<br>
<strong>1990:</strong> CB1 clonado e caracterizado em humanos<br>
<strong>1992:</strong> Descoberta da anandamida (primeiro endocanabinoide)<br>
<strong>1993:</strong> Descoberta do receptor CB2<br>
<strong>1995:</strong> Descoberta do 2-AG (segundo endocanabinoide principal)<br>
<strong>2000+:</strong> Identificação de enzimas, receptores adicionais e funções</p>

<h3>Por Que Demorou Tanto?</h3>
<p>O SEC foi descoberto "de trás para frente" - primeiro pesquisadores descobriram que THC se ligava a receptores específicos, depois descobriram que o corpo produz suas próprias moléculas (endocanabinoides) para esses receptores.</p>

<h2>Componentes do Sistema Endocanabinoide</h2>

<p>O SEC tem 3 componentes principais:</p>

<h3>1. Endocanabinoides (Canabinoides Internos)</h3>

<p><strong>Anandamida (AEA):</strong></p>
<ul>
<li><strong>Nome:</strong> Do sânscrito "ananda" = felicidade, bem-aventurança</li>
<li><strong>Descoberta:</strong> 1992 (Dr. Mechoulam)</li>
<li><strong>Funções:</strong> Humor, memória, apetite, dor, fertilidade</li>
<li><strong>Vida útil:</strong> Muito curta (minutos)</li>
<li><strong>Produção:</strong> Sob demanda (quando necessário)</li>
</ul>

<p><strong>2-AG (2-Araquidonilglicerol):</strong></p>
<ul>
<li><strong>Descoberta:</strong> 1995</li>
<li><strong>Concentração:</strong> ~170x mais abundante que anandamida</li>
<li><strong>Funções:</strong> Inflamação, sistema imune, dor, funções cardiovasculares</li>
<li><strong>Ação:</strong> Agonista completo de CB1 e CB2</li>
<li><strong>Produção:</strong> Também sob demanda</li>
</ul>

<p><strong>Outros Endocanabinoides (menos estudados):</strong></p>
<ul>
<li>Virodamina</li>
<li>N-araquidonoil dopamina (NADA)</li>
<li>2-araquidonil gliceril éter (noladina)</li>
</ul>

<h3>2. Receptores Canabinoides</h3>

<p><strong>Receptor CB1:</strong></p>
<ul>
<li><strong>Localização Principal:</strong> Sistema nervoso central (cérebro e medula espinhal)</li>
<li><strong>Densidade:</strong> Um dos receptores mais abundantes no cérebro</li>
<li><strong>Áreas de Alta Concentração:</strong></li>
</ul>

<table>
<tr>
<th>Região Cerebral</th>
<th>Função Afetada</th>
<th>Efeito da Ativação CB1</th>
</tr>
<tr>
<td><strong>Córtex Cerebral</strong></td>
<td>Cognição, memória</td>
<td>Alteração de memória de curto prazo</td>
</tr>
<tr>
<td><strong>Hipocampo</strong></td>
<td>Memória, aprendizado</td>
<td>Prejuízo temporário de memória</td>
</tr>
<tr>
<td><strong>Gânglios Basais</strong></td>
<td>Movimento</td>
<td>Alteração motora, coordenação</td>
</tr>
<tr>
<td><strong>Cerebelo</strong></td>
<td>Coordenação motora</td>
<td>Descoordenação leve</td>
</tr>
<tr>
<td><strong>Hipotálamo</strong></td>
<td>Apetite, temperatura</td>
<td>Aumento de apetite ("larica")</td>
</tr>
<tr>
<td><strong>Amígdala</strong></td>
<td>Emoções, medo</td>
<td>Ansiedade ou relaxamento</td>
</tr>
<tr>
<td><strong>Tronco Cerebral</strong></td>
<td>Náusea, vômito</td>
<td>Efeito antiemético</td>
</tr>
<tr>
<td><strong>Medula Espinhal</strong></td>
<td>Percepção de dor</td>
<td>Analgesia</td>
</tr>
</table>

<p><strong>Importante:</strong> CB1 é ausente/raro no tronco cerebral que controla respiração e funções cardíacas - por isso não há mortes por overdose de cannabis (ao contrário de opioides).</p>

<p><strong>Receptor CB2:</strong></p>
<ul>
<li><strong>Localização Principal:</strong> Sistema imune, tecidos periféricos</li>
<li><strong>Funções:</strong> Inflamação, resposta imune, dor periférica</li>
<li><strong>Distribuição:</strong></li>
</ul>

<ul>
<li>✅ Células imunes (macrófagos, linfócitos)</li>
<li>✅ Baço</li>
<li>✅ Timo</li>
<li>✅ Tonsillas</li>
<li>✅ Ossos</li>
<li>✅ Pele</li>
<li>✅ Sistema gastrointestinal</li>
<li>✅ Microglia (células imunes do cérebro)</li>
</ul>

<p><strong>Ativação CB2:</strong></p>
<ul>
<li>✅ Anti-inflamatória potente</li>
<li>✅ Modula resposta imune</li>
<li>✅ Sem efeitos psicoativos</li>
<li>✅ Alvo terapêutico para doenças autoimunes</li>
</ul>

<h3>Outros Receptores ("Canabinoides Atípicos"):</h3>

<p><strong>GPR55:</strong></p>
<ul>
<li>Função: Densidade óssea, pressão arterial, inflamação</li>
<li>THC: Agonista</li>
<li>CBD: Antagonista (bloqueia)</li>
</ul>

<p><strong>TRPV1 (Receptor Vaniloide):</strong></p>
<ul>
<li>Função: Percepção de dor, temperatura, inflamação</li>
<li>Anandamida: Agonista</li>
<li>CBD: Agonista (efeito analgésico)</li>
</ul>

<p><strong>PPARs (Receptores Ativados por Proliferadores de Peroxissoma):</strong></p>
<ul>
<li>Função: Metabolismo, inflamação, neurodegeneração</li>
<li>Endocanabinoides e CBD: Ativam PPARs</li>
</ul>

<h3>3. Enzimas Metabólicas</h3>

<p>Enzimas que sintetizam e degradam endocanabinoides:</p>

<p><strong>Enzimas de Síntese:</strong></p>
<ul>
<li><strong>NAPE-PLD:</strong> Produz anandamida</li>
<li><strong>DAGL:</strong> Produz 2-AG</li>
</ul>

<p><strong>Enzimas de Degradação:</strong></p>
<ul>
<li><strong>FAAH (Fatty Acid Amide Hydrolase):</strong> Degrada anandamida</li>
<li><strong>MAGL (Monoacilglicerol Lipase):</strong> Degrada 2-AG</li>
<li><strong>COX-2:</strong> Via alternativa de degradação</li>
</ul>

<p><strong>Importância Terapêutica:</strong> Inibidores de FAAH aumentam anandamida endógena, efeito terapêutico sem psicoatividade</p>

<h2>Como o Sistema Endocanabinoide Funciona</h2>

<h3>Princípio Básico: Sinalização Retrógrada</h3>

<p>O SEC funciona de maneira única comparado a outros sistemas de neurotransmissores:</p>

<p><strong>Sistema Convencional:</strong></p>
<ol>
<li>Neurônio pré-sináptico libera neurotransmissor →</li>
<li>Neurotransmissor atravessa sinapse →</li>
<li>Liga-se a receptor no neurônio pós-sináptico</li>
</ol>

<p><strong>Sistema Endocanabinoide (Retrógrado):</strong></p>
<ol>
<li>Neurônio pós-sináptico é ativado →</li>
<li>Produz endocanabinoides (anandamida ou 2-AG) →</li>
<li>Endocanabinoides viajam "para trás" através da sinapse →</li>
<li>Ligam-se a receptores CB1 no neurônio pré-sináptico →</li>
<li>Reduzem liberação de neurotransmissores</li>
</ol>

<p><strong>Função:</strong> Sistema de "feedback negativo" que reduz superestimulação neuronal</p>

<h3>Sinalização "Sob Demanda"</h3>

<p>Diferente de outros neurotransmissores (que ficam armazenados em vesículas):</p>

<ul>
<li>Endocanabinoides são sintetizados instantaneamente quando necessário</li>
<li>Liberados imediatamente (não armazenados)</li>
<li>Degradados rapidamente após uso (minutos)</li>
<li>Sinalização espacialmente e temporalmente precisa</li>
</ul>

<h2>Funções do Sistema Endocanabinoide</h2>

<p>O SEC atua como "maestro" regulando homeostase (equilíbrio interno):</p>

<h3>1. Sistema Nervoso Central</h3>

<p><strong>Modulação de Neurotransmissores:</strong></p>
<ul>
<li>✅ Glutamato (excitatório) - reduz</li>
<li>✅ GABA (inibitório) - reduz</li>
<li>✅ Dopamina - modula</li>
<li>✅ Serotonina - modula</li>
</ul>

<p><strong>Neuroplasticidade:</strong></p>
<ul>
<li>Formação de novas sinapses</li>
<li>Poda sináptica (eliminar conexões não utilizadas)</li>
<li>Neurogênese adulta (hipocampo)</li>
</ul>

<p><strong>Neuroproteção:</strong></p>
<ul>
<li>Reduz excitotoxicidade (dano por superestimulação)</li>
<li>Anti-inflamatório cerebral</li>
<li>Antioxidante</li>
</ul>

<h3>2. Resposta ao Estresse e Humor</h3>

<ul>
<li><strong>Eixo HPA:</strong> Modula resposta ao cortisol (hormônio do estresse)</li>
<li><strong>Ansiedade:</strong> Reduz através de CB1 (amígdala) e 5-HT1A</li>
<li><strong>Extinção de Memórias Aversivas:</strong> Facilita "esquecer" traumas (PTSD)</li>
<li><strong>Recompensa:</strong> Modula sistema dopaminérgico</li>
</ul>

<h3>3. Dor e Inflamação</h3>

<p><strong>Dor Aguda:</strong></p>
<ul>
<li>CB1 (central): Modula percepção de dor</li>
<li>CB2 (periférico): Reduz inflamação local</li>
<li>TRPV1: Dessensibiliza nociceptores</li>
</ul>

<p><strong>Dor Crônica:</strong></p>
<ul>
<li>Previne sensibilização central</li>
<li>Reduz neuroinflamação espinhal</li>
<li>Modulação descendente de dor</li>
</ul>

<h3>4. Metabolismo e Apetite</h3>

<p><strong>CB1 Hipotalâmico:</strong></p>
<ul>
<li>✅ Estimula apetite (especialmente alimentos palatáveis)</li>
<li>✅ Aumenta lipogênese (armazenamento de gordura)</li>
<li>✅ Reduz gasto energético</li>
</ul>

<p><strong>CB1 Periférico (fígado, adipócitos, músculo):</strong></p>
<ul>
<li>Metabolismo de glicose e lipídios</li>
<li>Sensibilidade à insulina</li>
<li>Termogênese</li>
</ul>

<p><strong>Implicação:</strong> Bloqueadores CB1 (ex: rimonabanto) causam perda de peso mas foram retirados por efeitos psiquiátricos</p>

<h3>5. Sistema Imune</h3>

<p><strong>CB2 Dominante:</strong></p>
<ul>
<li>✅ Reduz liberação de citocinas pró-inflamatórias</li>
<li>✅ Modula ativação de células T e B</li>
<li>✅ Controla migração de células imunes</li>
<li>✅ Previne autoimunidade excessiva</li>
</ul>

<h3>6. Sistema Cardiovascular</h3>

<ul>
<li>Tônus vascular (CB1 e CB2)</li>
<li>Pressão arterial</li>
<li>Resposta inflamatória vascular</li>
<li>Proteção cardíaca pós-isquemia</li>
</ul>

<h3>7. Sistema Reprodutivo</h3>

<ul>
<li><strong>Fertilidade:</strong> Desenvolvimento embrionário, implantação</li>
<li><strong>Parto:</strong> Modulação de contrações uterinas</li>
<li><strong>Espermatogênese:</strong> Maturação de espermatozoides</li>
</ul>

<h3>8. Ossos</h3>

<ul>
<li>CB2: Regula remodelação óssea</li>
<li>Equilíbrio osteoblastos/osteoclastos</li>
<li>Implicação: Alvo para osteoporose</li>
</ul>

<h2>Deficiência Clínica de Endocanabinoides (CED)</h2>

<h3>Teoria do Dr. Ethan Russo (2004):</h3>

<p>Algumas condições podem resultar de <strong>deficiência de endocanabinoides</strong>, similar a deficiências de neurotransmissores (serotonina → depressão).</p>

<h3>Condições Associadas a Possível CED:</h3>

<p><strong>Alta Probabilidade:</strong></p>
<ul>
<li><strong>Enxaqueca:</strong> Baixos níveis de anandamida no líquor</li>
<li><strong>Fibromialgia:</strong> Níveis reduzidos de endocanabinoides</li>
<li><strong>Síndrome do Intestino Irritável:</strong> Disfunção do SEC intestinal</li>
</ul>

<p><strong>Possível:</strong></p>
<ul>
<li>PTSD (extinção de memória prejudicada)</li>
<li>Dor neuropática</li>
<li>Esclerose múltipla</li>
</ul>

<h3>Evidências para CED:</h3>
<ul>
<li>✅ Pacientes com enxaqueca têm anandamida 30% menor no líquor</li>
<li>✅ Fibromialgia: 2-AG reduzido em 40%</li>
<li>✅ Resposta positiva a canabinoides exógenos (THC/CBD)</li>
</ul>

<h3>Fatores que Reduzem Função do SEC:</h3>
<ul>
<li>❌ Estresse crônico</li>
<li>❌ Dieta pobre em ômega-3</li>
<li>❌ Sedentarismo</li>
<li>❌ Privação de sono</li>
<li>❌ Uso crônico de álcool</li>
<li>❌ Variantes genéticas (FAAH, CNR1)</li>
</ul>

<h2>Como Canabinoides Externos Interagem com o SEC</h2>

<h3>THC (Tetrahidrocanabinol):</h3>
<ul>
<li><strong>Mecanismo:</strong> Agonista parcial de CB1 e CB2</li>
<li><strong>Similaridade:</strong> Estrutura similar à anandamida</li>
<li><strong>Diferença Chave:</strong> Não é degradado rapidamente (efeito prolongado)</li>
<li><strong>Efeitos:</strong> "Substitui" endocanabinoides, mas de forma mais potente e duradoura</li>
<li><strong>Psicoatividade:</strong> Alta ativação de CB1 cerebral</li>
</ul>

<h3>CBD (Canabidiol):</h3>
<ul>
<li><strong>Mecanismo:</strong> NÃO se liga fortemente a CB1/CB2</li>
<li><strong>Ação Principal:</strong> Modulador alostérico negativo de CB1</li>
<li><strong>Inibe FAAH:</strong> Aumenta anandamida endógena</li>
<li><strong>Outros alvos:</strong> 5-HT1A, TRPV1, GPR55, PPARs</li>
<li><strong>Efeito:</strong> "Potencializa" sistema endocanabinoide próprio</li>
</ul>

<h3>Efeito Entourage:</h3>
<p>CBD + THC juntos funcionam melhor que separados:</p>
<ul>
<li>✅ CBD reduz psicoatividade do THC</li>
<li>✅ CBD prolonga efeitos terapêuticos do THC</li>
<li>✅ Ativação de múltiplos alvos complementares</li>
</ul>

<h2>Como Fortalecer Seu Sistema Endocanabinoide Naturalmente</h2>

<h3>1. Dieta</h3>

<p><strong>Ômega-3 (EPA e DHA):</strong></p>
<ul>
<li>✅ Precursores de endocanabinoides</li>
<li>✅ Aumenta densidade de receptores CB1</li>
<li>✅ Fontes: Salmão, sardinha, chia, linhaça</li>
<li>✅ Dose: 2-3g/dia</li>
</ul>

<p><strong>Evitar Excesso de Ômega-6:</strong></p>
<ul>
<li>⚠️ Desbalanço ômega-6/ômega-3 prejudica SEC</li>
<li>⚠️ Reduzir: Óleos vegetais industrializados, alimentos processados</li>
</ul>

<p><strong>Chocolate Amargo (>70% cacau):</strong></p>
<ul>
<li>✅ Contém anandamida e inibidores de FAAH</li>
<li>✅ "Runner's high" do chocolate</li>
</ul>

<p><strong>Terpenos Alimentares:</strong></p>
<ul>
<li>Beta-cariofileno (pimenta preta): Agonista CB2</li>
<li>Mirceno (manga, lúpulo): Potencializa canabinoides</li>
</ul>

<h3>2. Exercício Físico</h3>

<p><strong>"Runner's High":</strong></p>
<ul>
<li>✅ Exercício aeróbico aumenta anandamida 30-50%</li>
<li>✅ Efeito máximo: Exercícios moderados 30-60min</li>
<li>✅ Não são endorfinas - é anandamida!</li>
</ul>

<h3>3. Gerenciamento de Estresse</h3>

<p><strong>Meditação:</strong></p>
<ul>
<li>Aumenta atividade CB1 no córtex pré-frontal</li>
<li>Melhora sinalização endocanabinoide</li>
</ul>

<p><strong>Yoga:</strong></p>
<ul>
<li>Combina exercício + meditação</li>
<li>Reduz cortisol (que suprime SEC)</li>
</ul>

<h3>4. Sono Adequado</h3>

<ul>
<li>Privação de sono reduz receptores CB1</li>
<li>Sono profundo restaura função do SEC</li>
<li>Meta: 7-9h/noite</li>
</ul>

<h3>5. Suplementos</h3>

<ul>
<li><strong>Probióticos:</strong> SEC intestinal (eixo intestino-cérebro)</li>
<li><strong>Curcumina:</strong> Aumenta receptores CB1</li>
<li><strong>Chá Verde (EGCG):</strong> Modulador do SEC</li>
</ul>

<h2>Testes Genéticos e SEC</h2>

<h3>Variantes Genéticas Relevantes:</h3>

<p><strong>Gene FAAH (rs324420):</strong></p>
<ul>
<li><strong>C/C (normal):</strong> FAAH funcional normal</li>
<li><strong>A/A (raro, ~10%):</strong> FAAH menos ativa → anandamida elevada</li>
<li><strong>Fenótipo A/A:</strong> Menor ansiedade, maior felicidade basal, maior resiliência ao estresse</li>
</ul>

<p><strong>Gene CNR1 (Receptor CB1):</strong></p>
<ul>
<li>Múltiplas variantes afetam densidade de CB1</li>
<li>Associado: Dependência, obesidade, PTSD</li>
</ul>

<p><strong>Teste disponível:</strong> 23andMe + interpretação via Promethease ou Genetic Genie</p>

<h2>Futuro da Pesquisa do SEC</h2>

<h3>Áreas Promissoras:</h3>
<ol>
<li><strong>Inibidores de FAAH/MAGL:</strong> Aumentar endocanabinoides próprios</li>
<li><strong>Agonistas seletivos CB2:</strong> Anti-inflamatórios sem psicoatividade</li>
<li><strong>Moduladores alostéricos:</strong> "Afinar" resposta sem ativação direta</li>
<li><strong>SEC intestinal:</strong> Síndrome do intestino irritável, doença de Crohn</li>
<li><strong>Neuroproteção:</strong> Alzheimer, Parkinson</li>
<li><strong>Oncologia:</strong> CB2 em tumores</li>
</ol>

<h2>Conclusão</h2>

<p>O sistema endocanabinoide é um regulador fundamental de praticamente todos os sistemas corporais, mantendo homeostase através de sinalização retrógrada precisa. Compreender o SEC explica:</p>

<ul>
<li>✅ Por que cannabis afeta tantos sistemas diferentes</li>
<li>✅ Como CBD e THC produzem efeitos terapêuticos</li>
<li>✅ Por que algumas pessoas têm deficiência endocanabinoide</li>
<li>✅ Como otimizar saúde fortalecendo o SEC naturalmente</li>
</ul>

<p><strong>Importância Clínica:</strong> O SEC representa um dos alvos terapêuticos mais promissores para condições inflamatórias, dor crônica, transtornos psiquiátricos e neurodegeneração.</p>

<p><small><strong>Aviso Legal:</strong> Este conteúdo é educacional e baseado em pesquisa científica atual. Não substitui orientação médica profissional.</small></p>"""

# Artigo 10: CBD Efeitos Colaterais
article_cbd_efeitos_colaterais = """<h1>CBD Tem Efeitos Colaterais? O Que Você Precisa Saber</h1>

<p>CBD é amplamente considerado seguro e bem tolerado, mas como qualquer substância ativa, pode causar efeitos colaterais. Este guia completo analisa frequência, intensidade, interações medicamentosas e perfil de segurança baseado em estudos científicos e dados clínicos.</p>

<h2>Perfil de Segurança Geral do CBD</h2>

<h3>Conclusões da Organização Mundial da Saúde (OMS, 2017):</h3>

<ul>
<li>✅ "CBD é geralmente bem tolerado com bom perfil de segurança"</li>
<li>✅ "Não há evidência de potencial de abuso ou dependência"</li>
<li>✅ "Sem efeitos adversos significativos em saúde pública"</li>
<li>✅ "Não causa os efeitos típicos de canabinoides psicoativos (ex: THC)"</li>
</ul>

<h3>FDA (Agência Reguladora EUA):</h3>

<ul>
<li>✅ Aprovou Epidiolex (CBD farmacêutico) em 2018</li>
<li>✅ Considerado suficientemente seguro para uso pediátrico (≥2 anos)</li>
<li>⚠️ Requer monitoramento de função hepática em doses altas</li>
</ul>

<h3>Comparação com Outros Medicamentos:</h3>

<p>Em escala de 0-10 de gravidade de efeitos colaterais:</p>
<ul>
<li><strong>CBD:</strong> 2-3/10 (muito leves)</li>
<li><strong>Aspirina:</strong> 4/10</li>
<li><strong>Ibuprofeno:</strong> 4-5/10</li>
<li><strong>Opioides:</strong> 7-8/10</li>
<li><strong>Antidepressivos (SSRIs):</strong> 5-6/10</li>
<li><strong>Benzodiazepínicos:</strong> 6-7/10</li>
</ul>

<h2>Efeitos Colaterais: Frequência e Intensidade</h2>

<h3>Muito Comuns (>10% dos usuários):</h3>

<p><strong>1. Sonolência / Fadiga</strong></p>
<ul>
<li><strong>Frequência:</strong> 10-30% (dose-dependente)</li>
<li><strong>Intensidade:</strong> Leve a moderada</li>
<li><strong>Quando Ocorre:</strong> Doses >100mg/dia, especialmente em iniciantes</li>
<li><strong>Duração:</strong> Geralmente melhora após 1-2 semanas (tolerância)</li>
<li><strong>Manejo:</strong>
  <ul>
  <li>Tomar à noite inicialmente</li>
  <li>Reduzir dose temporariamente</li>
  <li>Dividir em doses menores ao longo do dia</li>
  </ul>
</li>
</ul>

<p><strong>2. Boca Seca (Xerostomia)</strong></p>
<ul>
<li><strong>Frequência:</strong> 10-20%</li>
<li><strong>Intensidade:</strong> Leve</li>
<li><strong>Mecanismo:</strong> Receptores CB1/CB2 nas glândulas salivares reduzem produção de saliva</li>
<li><strong>Manejo:</strong>
  <ul>
  <li>Aumentar hidratação (água)</li>
  <li>Mascar chiclete sem açúcar</li>
  <li>Usar spray oral hidratante</li>
  </ul>
</li>
</ul>

<p><strong>3. Alterações de Apetite</strong></p>
<ul>
<li><strong>Frequência:</strong> 10-15%</li>
<li><strong>Direção:</strong> Geralmente redução (diferente do THC que aumenta)</li>
<li><strong>Intensidade:</strong> Leve a moderada</li>
<li><strong>Observação:</strong> Pode ser desejável para perda de peso</li>
<li><strong>Manejo:</strong>
  <ul>
  <li>Ajustar horário de administração (tomar com refeição)</li>
  <li>Reduzir dose se perda de apetite problemática</li>
  </ul>
</li>
</ul>

<h3>Comuns (1-10% dos usuários):</h3>

<p><strong>4. Diarreia</strong></p>
<ul>
<li><strong>Frequência:</strong> 5-10% (mais comum em doses muito altas)</li>
<li><strong>Intensidade:</strong> Leve a moderada</li>
<li><strong>Causa:</strong> Óleo carreador (MCT) em alguns casos, não o CBD</li>
<li><strong>Manejo:</strong>
  <ul>
  <li>Tomar com comida</li>
  <li>Trocar tipo de óleo carreador</li>
  <li>Reduzir dose temporariamente</li>
  <li>Considerar forma não oral (vaping, tópico)</li>
  </ul>
</li>
</ul>

<p><strong>5. Tontura</strong></p>
<ul>
<li><strong>Frequência:</strong> 3-8%</li>
<li><strong>Intensidade:</strong> Leve</li>
<li><strong>Mecanismo:</strong> Possível leve redução de pressão arterial</li>
<li><strong>Quando:</strong> Primeiras doses, doses altas</li>
<li><strong>Manejo:</strong>
  <ul>
  <li>Iniciar com dose baixa</li>
  <li>Evitar mudanças posturais rápidas</li>
  <li>Sentar/deitar se ocorrer</li>
  </ul>
</li>
</ul>

<p><strong>6. Náusea</strong></p>
<ul>
<li><strong>Frequência:</strong> 2-5% (paradoxal, já que CBD geralmente trata náusea)</li>
<li><strong>Intensidade:</strong> Leve</li>
<li><strong>Causa:</strong> Geralmente sabor/óleo carreador, não CBD em si</li>
<li><strong>Manejo:</strong>
  <ul>
  <li>Tomar com comida</li>
  <li>Usar cápsulas em vez de óleo sublingual</li>
  <li>Trocar marca/sabor</li>
  </ul>
</li>
</ul>

<h3>Raros (<1% dos usuários):</h3>

<p><strong>7. Elevação de Enzimas Hepáticas</strong></p>
<ul>
<li><strong>Frequência:</strong> 5-20% em doses MUITO altas (>20mg/kg/dia)</li>
<li><strong>Frequência:</strong> <1% em doses normais (<5mg/kg/dia)</li>
<li><strong>Intensidade:</strong> Geralmente assintomático (descoberto em exames)</li>
<li><strong>Biomarcadores:</strong> ALT, AST elevados</li>
<li><strong>Risco Aumentado:</strong> Uso concomitante com valproato (anticonvulsivante)</li>
<li><strong>Reversibilidade:</strong> Normaliza após redução/interrupção de dose</li>
<li><strong>Monitoramento:</strong>
  <ul>
  <li>Exames basais antes de iniciar doses altas</li>
  <li>Repetir mensal (primeiros 3 meses) se >10mg/kg/dia</li>
  <li>Trimestral após estabilização</li>
  </ul>
</li>
</ul>

<p><strong>8. Mudanças de Humor / Irritabilidade</strong></p>
<ul>
<li><strong>Frequência:</strong> <1%</li>
<li><strong>Intensidade:</strong> Leve a moderada</li>
<li><strong>Observação:</strong> Pode ser interação com outros medicamentos ou condição subjacente</li>
</ul>

<h2>Efeitos Colaterais: Tabela Resumo</h2>

<table>
<tr>
<th>Efeito Colateral</th>
<th>Frequência</th>
<th>Intensidade</th>
<th>Dose-Dependente?</th>
<th>Manejável?</th>
</tr>
<tr>
<td>Sonolência</td>
<td>10-30%</td>
<td>Leve-Moderada</td>
<td>✅ Sim</td>
<td>✅ Sim</td>
</tr>
<tr>
<td>Boca Seca</td>
<td>10-20%</td>
<td>Leve</td>
<td>⚠️ Parcial</td>
<td>✅ Sim</td>
</tr>
<tr>
<td>Alteração Apetite</td>
<td>10-15%</td>
<td>Leve-Moderada</td>
<td>✅ Sim</td>
<td>✅ Sim</td>
</tr>
<tr>
<td>Diarreia</td>
<td>5-10%</td>
<td>Leve-Moderada</td>
<td>✅ Sim</td>
<td>✅ Sim</td>
</tr>
<tr>
<td>Tontura</td>
<td>3-8%</td>
<td>Leve</td>
<td>✅ Sim</td>
<td>✅ Sim</td>
</tr>
<tr>
<td>Náusea</td>
<td>2-5%</td>
<td>Leve</td>
<td>⚠️ Parcial</td>
<td>✅ Sim</td>
</tr>
<tr>
<td>Elevação Enzimas</td>
<td><1% (dose normal)</td>
<td>Assintomático</td>
<td>✅ Sim (forte)</td>
<td>✅ Sim</td>
</tr>
<tr>
<td>Irritabilidade</td>
<td><1%</td>
<td>Variável</td>
<td>❌ Não claro</td>
<td>⚠️ Variável</td>
</tr>
</table>

<h2>Interações Medicamentosas</h2>

<p>CBD é metabolizado no fígado pelas enzimas do citocromo P450 (principalmente CYP3A4 e CYP2C19). CBD pode inibir essas enzimas, aumentando níveis sanguíneos de outros medicamentos.</p>

<h3>Regra do "Toranja":</h3>
<p>⚠️ <strong>Se um medicamento tem aviso para não consumir toranja, provavelmente interage com CBD</strong></p>
<p>Ambos (toranja e CBD) inibem CYP3A4</p>

<h3>Interações Significativas (ALTA PRIORIDADE):</h3>

<p><strong>1. Anticoagulantes:</strong></p>
<ul>
<li><strong>Medicamentos:</strong> Warfarina (Coumadin), Clopidogrel</li>
<li><strong>Efeito:</strong> CBD aumenta níveis → risco de sangramento</li>
<li><strong>Manejo:</strong> Monitorar INR mais frequentemente, ajustar dose de anticoagulante</li>
<li><strong>Risco:</strong> 🔴 ALTO</li>
</ul>

<p><strong>2. Anticonvulsivantes:</strong></p>
<ul>
<li><strong>Clobazam (Onfi):</strong>
  <ul>
  <li>CBD aumenta níveis em 2-3x</li>
  <li>Risco de sedação excessiva</li>
  <li>Solução: Reduzir dose clobazam 50%</li>
  </ul>
</li>
<li><strong>Valproato (Depakene):</strong>
  <ul>
  <li>Combinação aumenta risco de lesão hepática</li>
  <li>Monitorar ALT/AST mensalmente</li>
  </ul>
</li>
<li><strong>Outros:</strong> Topiramato, Zonisamida, Rufinamida</li>
<li><strong>Risco:</strong> 🔴 ALTO</li>
</ul>

<p><strong>3. Imunossupressores:</strong></p>
<ul>
<li><strong>Medicamentos:</strong> Tacrolimus, Ciclosporina</li>
<li><strong>Efeito:</strong> CBD aumenta níveis significativamente</li>
<li><strong>Risco:</strong> Toxicidade do imunossupressor</li>
<li><strong>Manejo:</strong> Monitorar níveis séricos do medicamento</li>
<li><strong>Risco:</strong> 🔴 ALTO</li>
</ul>

<h3>Interações Moderadas:</h3>

<p><strong>4. Benzodiazepínicos:</strong></p>
<ul>
<li><strong>Medicamentos:</strong> Alprazolam (Xanax), Diazepam (Valium)</li>
<li><strong>Efeito:</strong> Sedação aumentada</li>
<li><strong>Risco:</strong> 🟡 MODERADO</li>
</ul>

<p><strong>5. Antidepressivos:</strong></p>
<ul>
<li><strong>SSRIs:</strong> Fluoxetina, Sertralina, Escitalopram</li>
<li><strong>Tricíclicos:</strong> Amitriptilina</li>
<li><strong>Efeito:</strong> Aumento modesto de níveis</li>
<li><strong>Risco:</strong> 🟡 MODERADO</li>
</ul>

<p><strong>6. Opioides:</strong></p>
<ul>
<li><strong>Medicamentos:</strong> Codeína, Oxicodona, Morfina</li>
<li><strong>Efeito:</strong> Possível potencialização de sedação</li>
<li><strong>Benefício:</strong> Pode permitir reduzir dose de opioide</li>
<li><strong>Risco:</strong> 🟡 MODERADO</li>
</ul>

<p><strong>7. Estatinas:</strong></p>
<ul>
<li><strong>Medicamentos:</strong> Sinvastatina, Atorvastatina</li>
<li><strong>Efeito:</strong> CBD pode aumentar níveis ligeiramente</li>
<li><strong>Risco:</strong> 🟡 MODERADO (risco de miopatia)</li>
</ul>

<h3>Interações Leves:</h3>

<p><strong>8. Anti-inflamatórios (NSAIDs):</strong></p>
<ul>
<li>Ibuprofeno, Naproxeno</li>
<li>Interação mínima</li>
<li>Risco: 🟢 BAIXO</li>
</ul>

<p><strong>9. Metformina (Diabetes):</strong></p>
<ul>
<li>Interação mínima</li>
<li>CBD pode melhorar sensibilidade à insulina (benefício)</li>
<li>Risco: 🟢 BAIXO</li>
</ul>

<h3>Tabela de Interações Resumida:</h3>

<table>
<tr>
<th>Classe de Medicamento</th>
<th>Risco</th>
<th>Ação Requerida</th>
</tr>
<tr>
<td>Anticoagulantes</td>
<td>🔴 ALTO</td>
<td>Monitorar INR, ajustar dose</td>
</tr>
<tr>
<td>Clobazam</td>
<td>🔴 ALTO</td>
<td>Reduzir dose 50%</td>
</tr>
<tr>
<td>Valproato</td>
<td>🔴 ALTO</td>
<td>Monitorar função hepática</td>
</tr>
<tr>
<td>Imunossupressores</td>
<td>🔴 ALTO</td>
<td>Monitorar níveis séricos</td>
</tr>
<tr>
<td>Benzodiazepínicos</td>
<td>🟡 MODERADO</td>
<td>Observar sedação</td>
</tr>
<tr>
<td>Antidepressivos</td>
<td>🟡 MODERADO</td>
<td>Monitorar efeitos</td>
</tr>
<tr>
<td>Opioides</td>
<td>🟡 MODERADO</td>
<td>Observar sedação</td>
</tr>
<tr>
<td>Estatinas</td>
<td>🟡 MODERADO</td>
<td>Monitorar CK se dor muscular</td>
</tr>
<tr>
<td>NSAIDs</td>
<td>🟢 BAIXO</td>
<td>Nenhuma específica</td>
</tr>
<tr>
<td>Metformina</td>
<td>🟢 BAIXO</td>
<td>Nenhuma específica</td>
</tr>
</table>

<h2>Populações Especiais</h2>

<h3>1. Gravidez e Amamentação</h3>

<p><strong>Recomendação FDA/Anvisa:</strong> ❌ <strong>EVITAR</strong></p>

<p><strong>Razões:</strong></p>
<ul>
<li>⚠️ Dados de segurança limitados em humanos</li>
<li>⚠️ Canabinoides atravessam placenta</li>
<li>⚠️ Presentes no leite materno</li>
<li>⚠️ Possível impacto no desenvolvimento cerebral fetal</li>
<li>⚠️ Estudos em animais mostram efeitos no neurodesenvolvimento</li>
</ul>

<p><strong>Exceção:</strong> Apenas se benefício claramente supera risco (ex: epilepsia severa refratária) sob supervisão médica rigorosa</p>

<h3>2. Crianças</h3>

<p><strong>Segurança:</strong></p>
<ul>
<li>✅ <strong>Aprovado pela FDA desde 2 anos</strong> (Epidiolex)</li>
<li>✅ Estudos extensos em epilepsia pediátrica</li>
<li>✅ Bem tolerado em crianças em doses apropriadas</li>
</ul>

<p><strong>Considerações:</strong></p>
<ul>
<li>Dosagem por peso corporal (mg/kg)</li>
<li>Monitoramento médico obrigatório</li>
<li>Avaliação de crescimento e desenvolvimento</li>
</ul>

<h3>3. Idosos (>65 anos)</h3>

<p><strong>Segurança:</strong></p>
<ul>
<li>✅ Geralmente seguro</li>
<li>✅ Pode beneficiar múltiplas condições (dor, sono, inflamação)</li>
</ul>

<p><strong>Precauções:</strong></p>
<ul>
<li>⚠️ Metabolismo mais lento (iniciar com doses menores)</li>
<li>⚠️ Mais medicamentos = mais interações</li>
<li>⚠️ Maior risco de quedas se tontura/sonolência</li>
<li>⚠️ Função hepática pode ser reduzida</li>
</ul>

<p><strong>Recomendação:</strong> "Start low, go slow" - começar muito baixo (2,5-5mg) e aumentar gradualmente</p>

<h3>4. Doença Hepática</h3>

<p><strong>Precaução:</strong> ⚠️ <strong>CUIDADO</strong></p>

<ul>
<li>CBD é metabolizado no fígado</li>
<li>Insuficiência hepática reduz clearance</li>
<li>Risco aumentado de elevação de enzimas</li>
<li>Dose reduzida necessária</li>
<li>Monitoramento frequente obrigatório</li>
</ul>

<h3>5. Doença Renal</h3>

<p><strong>Segurança:</strong> ✅ <strong>GERALMENTE SEGURO</strong></p>
<ul>
<li>CBD eliminado principalmente por fígado, não rins</li>
<li>Ajuste de dose geralmente não necessário</li>
</ul>

<h2>Comparação: CBD vs THC - Efeitos Colaterais</h2>

<table>
<tr>
<th>Efeito</th>
<th>CBD</th>
<th>THC</th>
</tr>
<tr>
<td><strong>Psicoatividade</strong></td>
<td>❌ Não</td>
<td>✅ Sim (principal efeito)</td>
</tr>
<tr>
<td><strong>Ansiedade</strong></td>
<td>✅ Reduz</td>
<td>⚠️ Pode aumentar (dose alta)</td>
</tr>
<tr>
<td><strong>Paranoia</strong></td>
<td>❌ Não</td>
<td>⚠️ Sim (comum)</td>
</tr>
<tr>
<td><strong>Prejuízo Memória</strong></td>
<td>❌ Não</td>
<td>✅ Sim (temporário)</td>
</tr>
<tr>
<td><strong>Coordenação Motora</strong></td>
<td>❌ Mínimo</td>
<td>✅ Prejudicada</td>
</tr>
<tr>
<td><strong>Apetite</strong></td>
<td>⚠️ Pode reduzir</td>
<td>✅ Aumenta ("larica")</td>
</tr>
<tr>
<td><strong>Olhos Vermelhos</strong></td>
<td>❌ Raro</td>
<td>✅ Comum</td>
</tr>
<tr>
<td><strong>Taquicardia</strong></td>
<td>❌ Mínimo</td>
<td>✅ Comum</td>
</tr>
<tr>
<td><strong>Boca Seca</strong></td>
<td>⚠️ Leve</td>
<td>✅ Moderada-Severa</td>
</tr>
<tr>
<td><strong>Dependência</strong></td>
<td>❌ Não</td>
<td>⚠️ Psicológica possível</td>
</tr>
<tr>
<td><strong>Teste de Droga</strong></td>
<td>❌ Não detecta</td>
<td>✅ Detecta</td>
</tr>
</table>

<h2>Sinais de Dosagem Excessiva</h2>

<p><strong>Não existe overdose fatal de CBD</strong>, mas doses muito altas podem causar desconforto:</p>

<h3>Sintomas de Dose Excessiva (>500mg dose única):</h3>
<ul>
<li>Sonolência extrema</li>
<li>Tontura significativa</li>
<li>Náusea/vômito</li>
<li>Diarreia</li>
<li>Confusão mental (raro)</li>
</ul>

<p><strong>Manejo:</strong></p>
<ol>
<li>Descansar em local seguro</li>
<li>Hidratar</li>
<li>Aguardar efeito passar (6-8 horas)</li>
<li>Não há necessidade de atendimento médico na maioria dos casos</li>
<li>Reduzir dose subsequente</li>
</ol>

<h2>Como Minimizar Efeitos Colaterais</h2>

<h3>Estratégia "Start Low, Go Slow":</h3>

<p><strong>Fase 1 (Dias 1-3): Dose Inicial Baixa</strong></p>
<ul>
<li>2,5-5mg CBD, 1-2x/dia</li>
<li>Avaliar tolerância</li>
</ul>

<p><strong>Fase 2 (Dias 4-7): Aumento Gradual</strong></p>
<ul>
<li>Aumentar 5mg a cada 3-4 dias</li>
<li>Observar efeitos terapêuticos e colaterais</li>
</ul>

<p><strong>Fase 3 (Semanas 2-4): Titulação</strong></p>
<ul>
<li>Continuar aumentando até dose efetiva</li>
<li>Dose típica: 20-50mg/dia para maioria das condições</li>
<li>Máximo comum: 100-300mg/dia</li>
</ul>

<h3>Outras Estratégias:</h3>
<ol>
<li>✅ <strong>Tomar com comida:</strong> Reduz náusea, melhora absorção</li>
<li>✅ <strong>Dividir dose:</strong> 2-3x/dia em vez de dose única grande</li>
<li>✅ <strong>Horário estratégico:</strong> À noite se causa sonolência</li>
<li>✅ <strong>Qualidade do produto:</strong> COA verificado, extração CO2</li>
<li>✅ <strong>Hidratação:</strong> 2-3L água/dia reduz boca seca</li>
<li>✅ <strong>Monitoramento:</strong> Diário de sintomas e efeitos</li>
</ol>

<h2>Quando Consultar Médico</h2>

<p><strong>Procurar orientação médica se:</strong></p>
<ul>
<li>🔴 Toma medicamentos de prescrição (interações)</li>
<li>🔴 Tem doença hepática</li>
<li>🔴 Está grávida ou amamentando</li>
<li>🔴 Sintomas intolerá​veis/persistentes</li>
<li>🔴 Precisa de doses >100mg/dia</li>
<li>🔴 Efeitos colaterais após ajustes de dose</li>
</ul>

<h2>Conclusão</h2>

<p>CBD tem um perfil de segurança excelente comparado à maioria dos medicamentos. Efeitos colaterais são:</p>

<ul>
<li>✅ Geralmente leves (2-3/10 em gravidade)</li>
<li>✅ Dose-dependentes (ajustáveis)</li>
<li>✅ Temporários (melhoram com tempo)</li>
<li>✅ Manejáveis (estratégias simples funcionam)</li>
<li>✅ Reversíveis (normalizam após parar)</li>
</ul>

<p><strong>Interações medicamentosas</strong> são a consideração mais importante - sempre informar médico sobre todos os medicamentos antes de usar CBD.</p>

<p><strong>Expectativa realista:</strong> 70-80% dos usuários não experienciam efeitos colaterais significativos com doses apropriadas.</p>

<p><small><strong>Aviso Legal:</strong> Este conteúdo é educacional. Consulte profissional de saúde antes de usar CBD, especialmente se toma medicamentos ou tem condições médicas.</small></p>"""

def main():
    # Carregar blog-posts.json
    with open('/Users/yourapple/americancannabiss/frontend/src/data/blog-posts.json', 'r', encoding='utf-8') as f:
        posts = json.load(f)

    # Mapear artigos
    articles_to_update = {
        'cbd-epilepsia-estudos': article_cbd_epilepsia,
        'sistema-endocanabinoide-explicado': article_sistema_endocanabinoide,
        'cbd-efeitos-colaterais': article_cbd_efeitos_colaterais
    }

    # Atualizar cada artigo
    updated_count = 0
    for post in posts:
        if post['slug'] in articles_to_update:
            old_content = post['content']
            new_content = articles_to_update[post['slug']]
            post['content'] = new_content

            print(f"✅ Atualizado: {post['title']}")
            print(f"   Antes: {len(old_content)} caracteres")
            print(f"   Depois: {len(new_content)} caracteres")
            print(f"   Crescimento: {len(new_content) - len(old_content)} caracteres (+{((len(new_content) / len(old_content)) - 1) * 100:.1f}%)\n")

            updated_count += 1

    # Salvar de volta
    with open('/Users/yourapple/americancannabiss/frontend/src/data/blog-posts.json', 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    print(f"\n🎉 Batch 4 completo!")
    print(f"✅ {updated_count} artigos expandidos com sucesso!")
    print(f"📊 Total expandido até agora: 10 artigos")
    print(f"📋 Faltam: 3 artigos")

if __name__ == '__main__':
    main()
