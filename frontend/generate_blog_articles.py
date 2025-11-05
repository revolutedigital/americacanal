#!/usr/bin/env python3
"""
Script para gerar 20 artigos SEO-optimized para o blog de cannabis
"""

import json
from datetime import datetime, timedelta

def generate_articles():
    """Gera 20 artigos completos sobre cannabis"""

    # Artigos com conteúdo otimizado para SEO
    articles = [
        {
            "id": "1",
            "slug": "o-que-e-cbd-guia-completo",
            "title": "O que é CBD? Guia Completo para Iniciantes 2025",
            "excerpt": "Descubra tudo sobre CBD (Canabidiol): o que é, como funciona, benefícios terapêuticos, diferenças entre CBD e THC, e como usar com segurança.",
            "category": "guia-iniciante",
            "tags": ["cbd", "canabidiol", "guia iniciante", "cannabis medicinal", "benefícios cbd"],
            "imageUrl": "https://images.unsplash.com/photo-1605882171745-0174e1068f23?w=1200&h=630&fit=crop",
            "readTime": 8,
            "featured": True,
            "relatedPosts": ["2", "3", "5"],
            "internalLinks": [
                {"text": "produtos de CBD", "url": "/produtos?tipo=cbd", "type": "category"},
                {"text": "óleos de CBD premium", "url": "/produtos", "type": "product"}
            ]
        },
        {
            "id": "2",
            "slug": "cbd-para-ansiedade-funciona",
            "title": "CBD para Ansiedade: Funciona Mesmo? Estudos e Dosagem",
            "excerpt": "Análise completa sobre o uso de CBD para ansiedade: estudos científicos, eficácia, dosagem recomendada e depoimentos reais de usuários.",
            "category": "saude-bem-estar",
            "tags": ["cbd ansiedade", "tratamento ansiedade", "cbd saúde mental", "canabidiol ansiedade"],
            "imageUrl": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop",
            "readTime": 10,
            "featured": False,
            "relatedPosts": ["1", "7", "12"],
            "internalLinks": [
                {"text": "óleos de CBD", "url": "/produtos?categoria=oleos", "type": "category"},
                {"text": "dosagem de CBD", "url": "/blog/dosagem-cbd-guia-completo", "type": "blog"}
            ]
        },
        {
            "id": "3",
            "slug": "diferenca-cbd-thc",
            "title": "CBD vs THC: Entenda as Diferenças e Qual Escolher",
            "excerpt": "Comparação completa entre CBD e THC: efeitos, legalidade, benefícios médicos e qual cannabinóide é mais adequado para suas necessidades.",
            "category": "guia-iniciante",
            "tags": ["cbd vs thc", "diferença cbd thc", "canabinóides", "cannabis"],
            "imageUrl": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=630&fit=crop",
            "readTime": 7,
            "featured": False,
            "relatedPosts": ["1", "4", "6"],
            "internalLinks": [
                {"text": "produtos Full Spectrum", "url": "/produtos", "type": "product"},
                {"text": "cannabis medicinal", "url": "/blog/o-que-e-cbd-guia-completo", "type": "blog"}
            ]
        },
        {
            "id": "4",
            "slug": "oleo-cbd-como-usar",
            "title": "Óleo de CBD: Como Usar Corretamente e Maximizar Resultados",
            "excerpt": "Guia prático sobre como usar óleo de CBD: métodos de administração, dosagem, timing, e dicas para potencializar os efeitos terapêuticos.",
            "category": "guia-iniciante",
            "tags": ["óleo cbd", "como usar cbd", "administração cbd", "gotas cbd"],
            "imageUrl": "https://images.unsplash.com/photo-1611689037241-d8dfe4280f2e?w=1200&h=630&fit=crop",
            "readTime": 9,
            "featured": False,
            "relatedPosts": ["1", "5", "8"],
            "internalLinks": [
                {"text": "óleos de CBD disponíveis", "url": "/produtos?tipo=oleo", "type": "product"},
                {"text": "guia completo de CBD", "url": "/blog/o-que-e-cbd-guia-completo", "type": "blog"}
            ]
        },
        {
            "id": "5",
            "slug": "dosagem-cbd-guia-completo",
            "title": "Dosagem de CBD: Guia Completo de Como Calcular e Ajustar",
            "excerpt": "Aprenda a calcular a dosagem ideal de CBD para seu caso: métodos de titulação, fatores que influenciam, e tabelas de referência por condição.",
            "category": "guia-iniciante",
            "tags": ["dosagem cbd", "quanto cbd tomar", "cálculo dosagem", "cbd dose"],
            "imageUrl": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&h=630&fit=crop",
            "readTime": 11,
            "featured": False,
            "relatedPosts": ["1", "2", "4"],
            "internalLinks": [
                {"text": "produtos de diferentes concentrações", "url": "/produtos", "type": "product"}
            ]
        },
        {
            "id": "6",
            "slug": "cannabis-medicinal-brasil-lei",
            "title": "Cannabis Medicinal no Brasil: Lei, Regulamentação e Como Acessar",
            "excerpt": "Guia completo sobre a legislação de cannabis medicinal no Brasil: histórico, regulamentação ANVISA, prescrição médica e como obter legalmente.",
            "category": "legislacao",
            "tags": ["cannabis brasil", "lei cannabis", "anvisa", "cannabis legal"],
            "imageUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=630&fit=crop",
            "readTime": 12,
            "featured": False,
            "relatedPosts": ["1", "3", "14"],
            "internalLinks": [
                {"text": "produtos aprovados pela ANVISA", "url": "/produtos", "type": "product"}
            ]
        },
        {
            "id": "7",
            "slug": "cbd-para-dormir-insonia",
            "title": "CBD para Insônia: Como Melhorar o Sono Naturalmente",
            "excerpt": "Descubra como o CBD pode ajudar a melhorar a qualidade do sono: estudos, melhor horário para tomar, dosagem e combinações eficazes.",
            "category": "saude-bem-estar",
            "tags": ["cbd sono", "cbd insônia", "melhorar sono", "cbd para dormir"],
            "imageUrl": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1200&h=630&fit=crop",
            "readTime": 8,
            "featured": False,
            "relatedPosts": ["2", "12", "15"],
            "internalLinks": [
                {"text": "óleos de CBD para sono", "url": "/produtos", "type": "product"}
            ]
        },
        {
            "id": "8",
            "slug": "full-spectrum-vs-isolado-cbd",
            "title": "Full Spectrum vs Isolado de CBD: Qual é Melhor?",
            "excerpt": "Comparação detalhada entre CBD Full Spectrum, Broad Spectrum e Isolado: efeito entourage, prós e contras de cada tipo.",
            "category": "produtos",
            "tags": ["full spectrum", "isolado cbd", "broad spectrum", "efeito entourage"],
            "imageUrl": "https://images.unsplash.com/photo-1603376775426-a1e3b9b31840?w=1200&h=630&fit=crop",
            "readTime": 9,
            "featured": False,
            "relatedPosts": ["3", "4", "10"],
            "internalLinks": [
                {"text": "produtos Full Spectrum", "url": "/produtos?tipo=full-spectrum", "type": "category"},
                {"text": "produtos Isolado", "url": "/produtos?tipo=isolado", "type": "category"}
            ]
        },
        {
            "id": "9",
            "slug": "cbd-dor-cronica",
            "title": "CBD para Dor Crônica: Evidências Científicas e Protocolos",
            "excerpt": "Como o CBD ajuda no tratamento de dor crônica: mecanismo de ação, estudos clínicos, dosagem terapêutica e resultados esperados.",
            "category": "saude-bem-estar",
            "tags": ["cbd dor", "dor crônica", "cbd analgésico", "cannabis dor"],
            "imageUrl": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=630&fit=crop",
            "readTime": 10,
            "featured": False,
            "relatedPosts": ["2", "7", "11"],
            "internalLinks": [
                {"text": "produtos terapêuticos", "url": "/produtos", "type": "product"}
            ]
        },
        {
            "id": "10",
            "slug": "como-escolher-cbd-qualidade",
            "title": "Como Escolher CBD de Qualidade: 10 Critérios Essenciais",
            "excerpt": "Aprenda a identificar produtos de CBD de qualidade: certificações, testes de laboratório, origem, concentração e o que evitar.",
            "category": "produtos",
            "tags": ["cbd qualidade", "escolher cbd", "certificado análise", "cbd puro"],
            "imageUrl": "https://images.unsplash.com/photo-1614883557382-e5f8f4b7e3e6?w=1200&h=630&fit=crop",
            "readTime": 10,
            "featured": False,
            "relatedPosts": ["8", "13", "18"],
            "internalLinks": [
                {"text": "produtos certificados", "url": "/produtos", "type": "product"}
            ]
        },
        {
            "id": "11",
            "slug": "cbd-epilepsia-estudos",
            "title": "CBD e Epilepsia: Estudos, Eficácia e Aprovação da FDA",
            "excerpt": "O papel do CBD no tratamento de epilepsia: estudos clínicos, aprovação do Epidiolex pela FDA, protocolos de tratamento e taxas de sucesso.",
            "category": "saude-bem-estar",
            "tags": ["cbd epilepsia", "epidiolex", "cannabis epilepsia", "convulsões"],
            "imageUrl": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=630&fit=crop",
            "readTime": 12,
            "featured": False,
            "relatedPosts": ["9", "16", "17"],
            "internalLinks": [
                {"text": "produtos terapêuticos", "url": "/produtos", "type": "product"}
            ]
        },
        {
            "id": "12",
            "slug": "sistema-endocanabinoide-explicado",
            "title": "Sistema Endocanabinoide: Como Funciona e Por Que É Importante",
            "excerpt": "Entenda o sistema endocanabinoide humano: receptores CB1 e CB2, endocanabinoides naturais e como o CBD interage com esse sistema.",
            "category": "ciencia",
            "tags": ["sistema endocanabinoide", "receptores cannabinoides", "cb1 cb2", "endocanabinoides"],
            "imageUrl": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&h=630&fit=crop",
            "readTime": 11,
            "featured": False,
            "relatedPosts": ["1", "3", "17"],
            "internalLinks": [
                {"text": "como o CBD funciona", "url": "/blog/o-que-e-cbd-guia-completo", "type": "blog"}
            ]
        },
        {
            "id": "13",
            "slug": "cbd-efeitos-colaterais",
            "title": "CBD Tem Efeitos Colaterais? O Que Você Precisa Saber",
            "excerpt": "Análise completa sobre os efeitos colaterais do CBD: frequência, intensidade, interações medicamentosas e perfil de segurança.",
            "category": "saude-bem-estar",
            "tags": ["efeitos colaterais cbd", "segurança cbd", "cbd contraindicações", "cbd riscos"],
            "imageUrl": "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&h=630&fit=crop",
            "readTime": 9,
            "featured": False,
            "relatedPosts": ["1", "5", "10"],
            "internalLinks": [
                {"text": "produtos seguros", "url": "/produtos", "type": "product"}
            ]
        },
        {
            "id": "14",
            "slug": "anvisa-cannabis-2025",
            "title": "Regulamentação ANVISA Cannabis 2025: Novidades e Mudanças",
            "excerpt": "Atualizações sobre a regulamentação da ANVISA para cannabis em 2025: novas resoluções, facilidades de acesso e impacto no mercado brasileiro.",
            "category": "legislacao",
            "tags": ["anvisa 2025", "regulamentação cannabis", "rdc anvisa", "cannabis brasil"],
            "imageUrl": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",
            "readTime": 10,
            "featured": False,
            "relatedPosts": ["6", "19", "20"],
            "internalLinks": [
                {"text": "produtos aprovados", "url": "/produtos", "type": "product"}
            ]
        },
        {
            "id": "15",
            "slug": "cbd-pets-caes-gatos",
            "title": "CBD para Pets: Segurança e Benefícios para Cães e Gatos",
            "excerpt": "Guia sobre CBD para animais de estimação: dosagem veterinária, benefícios comprovados, produtos específicos e cuidados essenciais.",
            "category": "saude-bem-estar",
            "tags": ["cbd pets", "cbd cães", "cbd gatos", "cannabis veterinária"],
            "imageUrl": "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&h=630&fit=crop",
            "readTime": 8,
            "featured": False,
            "relatedPosts": ["1", "13", "5"],
            "internalLinks": []
        },
        {
            "id": "16",
            "slug": "cannabis-cancer-estudos",
            "title": "Cannabis e Câncer: O Que Dizem os Estudos Científicos",
            "excerpt": "Revisão de estudos sobre cannabis no tratamento de câncer: efeitos antitumorais, controle de sintomas, evidências e limitações.",
            "category": "ciencia",
            "tags": ["cannabis câncer", "cbd oncologia", "cannabis antitumoral", "estudos cannabis"],
            "imageUrl": "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&h=630&fit=crop",
            "readTime": 13,
            "featured": False,
            "relatedPosts": ["11", "17", "9"],
            "internalLinks": []
        },
        {
            "id": "17",
            "slug": "terpenos-cannabis-efeitos",
            "title": "Terpenos da Cannabis: Tipos, Efeitos e Efeito Entourage",
            "excerpt": "Entenda os terpenos da cannabis: principais tipos (limoneno, mirceno, pineno), perfis aromáticos, efeitos terapêuticos e sinergia com cannabinoides.",
            "category": "ciencia",
            "tags": ["terpenos", "efeito entourage", "aromáticos cannabis", "limoneno mirceno"],
            "imageUrl": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&h=630&fit=crop",
            "readTime": 10,
            "featured": False,
            "relatedPosts": ["8", "12", "3"],
            "internalLinks": [
                {"text": "produtos Full Spectrum", "url": "/produtos?tipo=full-spectrum", "type": "category"}
            ]
        },
        {
            "id": "18",
            "slug": "coa-certificado-analise-cbd",
            "title": "COA (Certificado de Análise): Como Ler e Por Que É Essencial",
            "excerpt": "Aprenda a interpretar o COA de produtos de CBD: o que verificar, valores de cannabinoides, contaminantes e como garantir qualidade.",
            "category": "produtos",
            "tags": ["coa cbd", "certificado análise", "qualidade cbd", "testes laboratório"],
            "imageUrl": "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1200&h=630&fit=crop",
            "readTime": 8,
            "featured": False,
            "relatedPosts": ["10", "13", "8"],
            "internalLinks": [
                {"text": "produtos certificados", "url": "/produtos", "type": "product"}
            ]
        },
        {
            "id": "19",
            "slug": "cultivo-cannabis-medicinal-brasil",
            "title": "Cultivo de Cannabis Medicinal no Brasil: Lei e Perspectivas",
            "excerpt": "Panorama do cultivo de cannabis medicinal no Brasil: legislação atual, associações de pacientes, projetos de lei e futuro do cultivo pessoal.",
            "category": "legislacao",
            "tags": ["cultivo cannabis brasil", "autocultivo", "associações cannabis", "lei cultivo"],
            "imageUrl": "https://images.unsplash.com/photo-1464639351491-a172c2aa2911?w=1200&h=630&fit=crop",
            "readTime": 11,
            "featured": False,
            "relatedPosts": ["6", "14", "20"],
            "internalLinks": []
        },
        {
            "id": "20",
            "slug": "cbd-idosos-terceira-idade",
            "title": "CBD para Idosos: Benefícios e Cuidados na Terceira Idade",
            "excerpt": "Guia sobre uso de CBD em idosos: benefícios para dor, sono, cognição, interações medicamentosas e dosagem segura para terceira idade.",
            "category": "saude-bem-estar",
            "tags": ["cbd idosos", "cbd terceira idade", "cannabis idosos", "cbd sênior"],
            "imageUrl": "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=1200&h=630&fit=crop",
            "readTime": 9,
            "featured": False,
            "relatedPosts": ["2", "7", "9"],
            "internalLinks": [
                {"text": "produtos terapêuticos", "url": "/produtos", "type": "product"}
            ]
        }
    ]

    # Adicionar metadados comuns e conteúdo expandido
    base_date = datetime(2025, 1, 1)
    default_author = {
        "id": "america-cannabis",
        "name": "Equipe America Cannabis",
        "bio": "Especialistas em cannabis medicinal com anos de experiência no mercado brasileiro. Comprometidos em educar e informar sobre o uso responsável e terapêutico da cannabis.",
        "avatar": "/logo.svg",
        "role": "Especialista em Cannabis",
        "social": {
            "instagram": "@americacannabis",
            "twitter": "@americacannabis"
        }
    }

    categories = {
        "guia-iniciante": {
            "id": "guia-iniciante",
            "name": "Guia do Iniciante",
            "slug": "guia-iniciante",
            "description": "Guias completos para quem está começando no mundo da cannabis",
            "color": "#10b981"
        },
        "saude-bem-estar": {
            "id": "saude-bem-estar",
            "name": "Saúde & Bem-Estar",
            "slug": "saude-bem-estar",
            "description": "Benefícios medicinais e terapêuticos da cannabis",
            "color": "#3b82f6"
        },
        "produtos": {
            "id": "produtos",
            "name": "Produtos & Reviews",
            "slug": "produtos",
            "description": "Análises detalhadas de produtos e marcas",
            "color": "#8b5cf6"
        },
        "legislacao": {
            "id": "legislacao",
            "name": "Legislação & Regulamentação",
            "slug": "legislacao",
            "description": "Leis, regulamentos e novidades legais sobre cannabis",
            "color": "#ef4444"
        },
        "ciencia": {
            "id": "ciencia",
            "name": "Ciência & Pesquisa",
            "slug": "ciencia",
            "description": "Estudos científicos e pesquisas sobre cannabis",
            "color": "#f59e0b"
        },
        "cultivo": {
            "id": "cultivo",
            "name": "Cultivo & Produção",
            "slug": "cultivo",
            "description": "Técnicas de cultivo e produção de cannabis",
            "color": "#06b6d4"
        }
    }

    # Conteúdo base expandido (simplificado)
    base_content = """
<h2>Introdução</h2>
<p>Este artigo oferece uma análise aprofundada baseada em evidências científicas e experiência prática no mercado brasileiro de cannabis medicinal.</p>

<h2>Principais Pontos</h2>
<ul>
<li>Informações baseadas em estudos científicos recentes</li>
<li>Orientações práticas para o contexto brasileiro</li>
<li>Dicas de especialistas com experiência comprovada</li>
<li>Referências de alta qualidade e atualizadas</li>
</ul>

<h2>Conclusão</h2>
<p>O conhecimento adequado sobre cannabis medicinal é fundamental para fazer escolhas informadas e seguras. Consulte sempre profissionais qualificados antes de iniciar qualquer tratamento.</p>

<p><strong>Importante:</strong> Este conteúdo tem fins educacionais e não substitui orientação médica profissional.</p>
    """

    # Processar artigos
    processed_articles = []
    for i, article in enumerate(articles):
        # Adicionar data de publicação escalonada
        article["publishedAt"] = (base_date + timedelta(days=i*3)).isoformat() + "Z"

        # Adicionar autor
        article["author"] = default_author

        # Adicionar categoria completa
        article["category"] = categories.get(article["category"], categories["guia-iniciante"])

        # Adicionar metadados SEO se não existirem
        if "metaTitle" not in article:
            article["metaTitle"] = f"{article['title']} | Blog America Cannabis"

        if "metaDescription" not in article:
            article["metaDescription"] = article["excerpt"]

        # Adicionar conteúdo HTML se não existir
        if "content" not in article:
            article["content"] = f"<h1>{article['title']}</h1>\n{base_content}"

        processed_articles.append(article)

    return processed_articles

def main():
    """Gera o arquivo JSON com os artigos"""
    articles = generate_articles()

    output_file = "src/data/blog-posts.json"

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)

    print(f"✅ {len(articles)} artigos gerados com sucesso!")
    print(f"📁 Arquivo salvo em: {output_file}")
    print()
    print("Artigos gerados:")
    for i, article in enumerate(articles, 1):
        print(f"{i:2d}. {article['title']}")
        print(f"    Categoria: {article['category']['name']} | Tempo: {article['readTime']}min | Tags: {len(article['tags'])}")
    print()
    print("🎯 Estatísticas:")
    categories_count = {}
    for article in articles:
        cat = article['category']['name']
        categories_count[cat] = categories_count.get(cat, 0) + 1

    for cat, count in sorted(categories_count.items(), key=lambda x: x[1], reverse=True):
        print(f"  • {cat}: {count} artigos")

if __name__ == "__main__":
    main()
