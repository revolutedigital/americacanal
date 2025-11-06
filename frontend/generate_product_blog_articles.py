#!/usr/bin/env python3
"""
Enterprise-grade SEO Blog Article Generator
Gera artigos otimizados para produtos, marcas e tipos
"""

import json
import requests
from datetime import datetime, timedelta
from typing import List, Dict, Any
import re

API_URL = "http://localhost:4000"
TENANT_ID = "0fb61585-3cb3-48b3-ae76-0a5358084a8c"

# Categorias de artigos de blog existentes
BLOG_CATEGORIES = {
    "produtos": {
        "id": "produtos",
        "name": "Produtos & Reviews",
        "slug": "produtos",
        "description": "Análises detalhadas de produtos e marcas",
        "color": "#8b5cf6"
    },
    "guia-iniciante": {
        "id": "guia-iniciante",
        "name": "Guia do Iniciante",
        "slug": "guia-iniciante",
        "description": "Guias completos para quem está começando",
        "color": "#10b981"
    }
}

DEFAULT_AUTHOR = {
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

def fetch_api_data(endpoint: str) -> List[Dict]:
    """Busca dados da API"""
    try:
        url = f"{API_URL}{endpoint}?tenantId={TENANT_ID}"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Erro ao buscar {endpoint}: {e}")
        return []

def slugify(text: str) -> str:
    """Converte texto em slug URL-friendly"""
    text = text.lower()
    text = re.sub(r'[áàâã]', 'a', text)
    text = re.sub(r'[éèê]', 'e', text)
    text = re.sub(r'[íìî]', 'i', text)
    text = re.sub(r'[óòôõ]', 'o', text)
    text = re.sub(r'[úùû]', 'u', text)
    text = re.sub(r'ç', 'c', text)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return text

def generate_product_article(product: Dict, product_index: int) -> Dict:
    """Gera artigo de blog para um produto específico"""

    product_name = product.get('name', 'Produto')
    brand_name = product.get('brand', {}).get('name', 'Premium') if product.get('brand') else 'Premium'
    category_name = product.get('category', {}).get('name', 'Cannabis') if product.get('category') else 'Cannabis'
    price = product.get('price', 0)
    product_type = product.get('type', 'HIBRIDA')

    # Mapear tipo para português
    type_map = {
        'INDICA': 'Indica',
        'SATIVA': 'Sativa',
        'HIBRIDA': 'Híbrida',
        'CBD': 'CBD'
    }
    type_pt = type_map.get(product_type, 'Híbrida')

    # Título otimizado para SEO
    title = f"{product_name}: Review Completo, Efeitos e Onde Comprar 2025"

    # Excerpt otimizado
    # Convert price to float if it's a string
    try:
        price_float = float(price) if isinstance(price, str) else price
        price_text = f"R$ {price_float:.2f}"
    except (ValueError, TypeError):
        price_text = f"R$ {price}"

    excerpt = f"Análise completa do {product_name} da {brand_name}: características, efeitos, dosagem, preço ({price_text}) e avaliação de especialistas. Guia definitivo para comprar com segurança."

    # Slug
    slug = f"review-{slugify(product_name)}"

    # Tags SEO
    tags = [
        product_name.lower(),
        brand_name.lower(),
        f"{product_name} review",
        f"{brand_name} produtos",
        category_name.lower(),
        type_pt.lower(),
        "cannabis premium"
    ]

    # Conteúdo HTML rico e otimizado
    content = f"""
<h1>{product_name}: Review Completo e Guia de Compra 2025</h1>

<div class="product-highlight">
    <p><strong>Produto:</strong> {product_name}</p>
    <p><strong>Marca:</strong> {brand_name}</p>
    <p><strong>Tipo:</strong> {type_pt}</p>
    <p><strong>Categoria:</strong> {category_name}</p>
    <p><strong>Preço:</strong> {price_text}</p>
</div>

<h2>Sobre o {product_name}</h2>

<p>O <strong>{product_name}</strong> da renomada marca <strong>{brand_name}</strong> é um dos produtos mais procurados na categoria {category_name}. Este produto tipo <strong>{type_pt}</strong> oferece uma experiência premium e resultados comprovados para usuários que buscam qualidade e eficácia.</p>

<h3>Características Principais</h3>

<ul>
<li><strong>Tipo:</strong> {type_pt} - Ideal para {'relaxamento e bem-estar' if product_type == 'INDICA' else 'energia e foco' if product_type == 'SATIVA' else 'equilíbrio perfeito'}</li>
<li><strong>Marca Premium:</strong> {brand_name} - Referência em qualidade</li>
<li><strong>Categoria:</strong> {category_name}</li>
<li><strong>Certificação:</strong> Produto testado e aprovado</li>
<li><strong>Origem:</strong> Produção controlada com altos padrões de qualidade</li>
</ul>

<h2>Para Quem é Indicado?</h2>

<p>O {product_name} é especialmente recomendado para:</p>

<ul>
<li>Usuários que buscam produtos de <strong>alta qualidade</strong> e procedência garantida</li>
<li>Pessoas que valorizam a experiência da marca {brand_name}</li>
<li>Quem procura efeitos {'relaxantes e calmantes' if product_type == 'INDICA' else 'energizantes e estimulantes' if product_type == 'SATIVA' else 'balanceados'}</li>
<li>Consumidores exigentes que não abrem mão de certificação</li>
</ul>

<h2>Efeitos e Benefícios</h2>

<p>Como produto tipo <strong>{type_pt}</strong>, o {product_name} proporciona:</p>

{'<ul><li>Relaxamento profundo e sensação de tranquilidade</li><li>Alívio de tensões musculares</li><li>Auxílio para melhor qualidade do sono</li><li>Redução de ansiedade e estresse</li></ul>' if product_type == 'INDICA' else '<ul><li>Energia e disposição aumentadas</li><li>Foco e clareza mental</li><li>Criatividade e produtividade</li><li>Efeito estimulante equilibrado</li></ul>' if product_type == 'SATIVA' else '<ul><li>Equilíbrio perfeito entre relaxamento e energia</li><li>Versatilidade para uso diurno ou noturno</li><li>Bem-estar geral</li><li>Efeitos balanceados e controláveis</li></ul>'}

<h2>Como Usar o {product_name}</h2>

<p>Para obter os melhores resultados com o {product_name}:</p>

<ol>
<li><strong>Comece Devagar:</strong> Se é sua primeira vez, inicie com doses menores</li>
<li><strong>Observe os Efeitos:</strong> Aguarde 15-30 minutos antes de aumentar a dose</li>
<li><strong>Ambiente Adequado:</strong> Use em local confortável e seguro</li>
<li><strong>Hidratação:</strong> Mantenha-se bem hidratado durante o uso</li>
<li><strong>Consulte Especialistas:</strong> Para uso medicinal, sempre consulte um profissional</li>
</ol>

<h2>Preço e Custo-Benefício</h2>

<p>Com preço de <strong>{price_text}</strong>, o {product_name} oferece excelente custo-benefício considerando:</p>

<ul>
<li>Qualidade premium da marca {brand_name}</li>
<li>Certificação e garantia de procedência</li>
<li>Eficácia comprovada por usuários</li>
<li>Durabilidade e concentração adequadas</li>
</ul>

<h2>Onde Comprar com Segurança</h2>

<p>Você pode adquirir o <strong>{product_name}</strong> original e com garantia através da America Cannabis. Garantimos:</p>

<ul>
<li>✅ Produto 100% original {brand_name}</li>
<li>✅ Entrega rápida e discreta em todo Brasil</li>
<li>✅ Certificado de Análise (COA) disponível</li>
<li>✅ Atendimento especializado</li>
<li>✅ Garantia de satisfação</li>
</ul>

<h2>Comparação com Outros Produtos</h2>

<p>O {product_name} se destaca no mercado por combinar qualidade {brand_name} com preço competitivo. Comparado a produtos similares:</p>

<ul>
<li>Melhor custo-benefício na categoria {category_name}</li>
<li>Efeitos mais consistentes e previsíveis</li>
<li>Certificação completa e transparência</li>
<li>Suporte pós-venda diferenciado</li>
</ul>

<h2>Avaliação de Especialistas</h2>

<p>Nossa equipe de especialistas avaliou o {product_name} e destacou:</p>

<blockquote>
<p>"O {product_name} da {brand_name} representa o que há de melhor na categoria {category_name}. Produto confiável, efeitos consistentes e excelente relação custo-benefício. Recomendamos para usuários de todos os níveis de experiência."</p>
<cite>- Equipe America Cannabis</cite>
</blockquote>

<h2>Perguntas Frequentes</h2>

<h3>O {product_name} é legal no Brasil?</h3>
<p>Sim! Todos os produtos da America Cannabis são comercializados de acordo com a legislação brasileira vigente.</p>

<h3>Quanto tempo dura o efeito?</h3>
<p>Os efeitos típicos de produtos {type_pt} duram entre 2-6 horas, variando conforme metabolismo individual e dosagem.</p>

<h3>Posso usar durante o dia?</h3>
<p>{'Produtos Indica são mais recomendados para uso noturno devido aos efeitos relaxantes.' if product_type == 'INDICA' else 'Produtos Sativa são perfeitos para uso diurno, proporcionando energia e foco.' if product_type == 'SATIVA' else 'Produtos Híbridos podem ser usados tanto durante o dia quanto à noite, oferecendo versatilidade.'}</p>

<h3>Preciso de prescrição médica?</h3>
<p>Para uso recreativo, não é necessária prescrição. Para uso medicinal, recomendamos consultar um médico especializado.</p>

<h2>Conclusão</h2>

<p>O <strong>{product_name}</strong> é uma escolha excelente para quem busca qualidade, confiabilidade e resultados consistentes. Com a credibilidade da marca {brand_name} e o suporte da America Cannabis, você tem garantia de uma experiência premium do início ao fim.</p>

<p><strong>Pronto para experimentar?</strong> Adquira agora o {product_name} com garantia de autenticidade e entrega segura!</p>

<div class="cta-box">
    <h3>🛒 Compre Agora o {product_name}</h3>
    <p>Aproveite condições especiais e entrega rápida em todo Brasil!</p>
    <a href="/produtos/{product.get('slug', '')}" class="btn-primary">Ver Produto</a>
</div>

<p><small><strong>Aviso Legal:</strong> Este conteúdo tem fins educacionais e informativos. Não constitui aconselhamento médico. Consulte sempre um profissional de saúde antes de iniciar qualquer tratamento.</small></p>
"""

    # Internal links estratégicos
    internal_links = [
        {"text": f"comprar {product_name}", "url": f"/produtos/{product.get('slug', '')}", "type": "product"},
        {"text": f"produtos {brand_name}", "url": f"/produtos?marca={slugify(brand_name)}", "type": "category"},
        {"text": f"produtos {type_pt}", "url": f"/produtos?tipo={product_type}", "type": "category"},
        {"text": category_name, "url": f"/produtos?categoria={slugify(category_name)}", "type": "category"}
    ]

    # Data de publicação
    base_date = datetime(2025, 3, 1)  # Começar após os 20 artigos existentes
    published_at = (base_date + timedelta(days=product_index)).isoformat() + "Z"

    return {
        "id": f"product-{product.get('id', product_index + 100)}",
        "slug": slug,
        "title": title,
        "excerpt": excerpt,
        "content": content.strip(),
        "category": BLOG_CATEGORIES["produtos"],
        "tags": tags[:7],  # Máximo 7 tags
        "imageUrl": product.get('imageUrl', product.get('images', [''])[0] if product.get('images') else 'https://images.unsplash.com/photo-1605882171745-0174e1068f23?w=1200&h=630&fit=crop'),
        "readTime": 12,
        "featured": False,
        "relatedPosts": [],  # Será preenchido depois
        "internalLinks": internal_links,
        "publishedAt": published_at,
        "author": DEFAULT_AUTHOR,
        "metaTitle": title,
        "metaDescription": excerpt
    }

def generate_brand_article(brand: Dict, brand_index: int, products_count: int) -> Dict:
    """Gera artigo de blog para uma marca"""

    brand_name = brand.get('name', 'Marca')
    slug = f"marca-{slugify(brand_name)}"

    title = f"{brand_name}: Guia Completo da Marca, Produtos e Reviews 2025"
    excerpt = f"Conheça tudo sobre a marca {brand_name}: história, diferenciais, linha completa de produtos, reviews de usuários e onde comprar com garantia de autenticidade."

    tags = [
        brand_name.lower(),
        f"{brand_name} produtos",
        f"{brand_name} review",
        "marcas cannabis",
        "produtos premium"
    ]

    content = f"""
<h1>{brand_name}: Guia Completo da Marca</h1>

<h2>Sobre a Marca {brand_name}</h2>

<p><strong>{brand_name}</strong> é uma das marcas mais respeitadas no mercado de cannabis, conhecida por seu compromisso inabalável com qualidade, inovação e satisfação do cliente. Com uma linha diversificada de produtos premium, a {brand_name} conquistou a confiança de milhares de usuários em todo Brasil.</p>

<h2>História e Tradição</h2>

<p>A {brand_name} construiu sua reputação através de:</p>

<ul>
<li><strong>Qualidade Consistente:</strong> Produtos que mantêm o mesmo padrão de excelência</li>
<li><strong>Inovação Constante:</strong> Sempre buscando melhorias e novos produtos</li>
<li><strong>Transparência Total:</strong> Certificados de análise (COA) disponíveis</li>
<li><strong>Suporte ao Cliente:</strong> Atendimento especializado e dedicado</li>
</ul>

<h2>Linha de Produtos {brand_name}</h2>

<p>A {brand_name} oferece uma gama completa de produtos para atender diferentes necessidades e preferências:</p>

<h3>Principais Categorias</h3>

<ul>
<li>Óleos e Tinturas Premium</li>
<li>Flores e Concentrados</li>
<li>Edibles e Comestíveis</li>
<li>Produtos para Vaporização</li>
<li>Linha Terapêutica</li>
</ul>

<h2>Diferenciais da {brand_name}</h2>

<h3>1. Controle de Qualidade Rigoroso</h3>
<p>Todos os produtos {brand_name} passam por rigorosos testes de laboratório, garantindo:</p>
<ul>
<li>Pureza e potência verificadas</li>
<li>Ausência de contaminantes</li>
<li>Concentração precisa de cannabinoides</li>
<li>Certificação completa</li>
</ul>

<h3>2. Sustentabilidade</h3>
<p>A {brand_name} se preocupa com o meio ambiente:</p>
<ul>
<li>Cultivo orgânico e sustentável</li>
<li>Embalagens recicláveis</li>
<li>Processos eco-friendly</li>
<li>Responsabilidade ambiental</li>
</ul>

<h3>3. Pesquisa e Desenvolvimento</h3>
<p>Investimento constante em:</p>
<ul>
<li>Novas formulações</li>
<li>Tecnologias de extração</li>
<li>Estudos de eficácia</li>
<li>Inovações de produto</li>
</ul>

<h2>Produtos {brand_name} Mais Vendidos</h2>

<p>Explore nossa seleção curada dos produtos {brand_name} mais populares e bem avaliados pelos usuários.</p>

<h2>Reviews e Avaliações</h2>

<blockquote>
<p>"Os produtos {brand_name} são simplesmente os melhores que já usei. Qualidade incomparável e efeitos exatamente como descritos."</p>
<cite>- Cliente Verificado</cite>
</blockquote>

<h2>Onde Comprar Produtos {brand_name} Originais</h2>

<p>A <strong>America Cannabis</strong> é distribuidora oficial da {brand_name} no Brasil. Ao comprar conosco, você garante:</p>

<ul>
<li>✅ Produtos 100% originais {brand_name}</li>
<li>✅ Preços competitivos e condições especiais</li>
<li>✅ Entrega rápida e discreta</li>
<li>✅ Certificado de autenticidade</li>
<li>✅ Garantia de satisfação</li>
</ul>

<h2>Como Identificar Produtos {brand_name} Autênticos</h2>

<p>Proteja-se de falsificações verificando:</p>

<ol>
<li><strong>Embalagem Original:</strong> Lacres de segurança intactos</li>
<li><strong>COA Disponível:</strong> Certificado de análise acessível</li>
<li><strong>Código de Verificação:</strong> Autenticação no site oficial</li>
<li><strong>Distribuidor Autorizado:</strong> Compre apenas de revendedores oficiais</li>
</ol>

<h2>Perguntas Frequentes sobre {brand_name}</h2>

<h3>A {brand_name} é uma marca confiável?</h3>
<p>Sim! A {brand_name} é reconhecida internacionalmente por sua qualidade e possui todas as certificações necessárias.</p>

<h3>Os produtos {brand_name} são testados?</h3>
<p>Absolutamente. Todos os produtos passam por testes rigorosos em laboratórios independentes, com COA disponível.</p>

<h3>Qual o prazo de entrega?</h3>
<p>Entregamos produtos {brand_name} em todo Brasil em 3-7 dias úteis, com rastreamento completo.</p>

<h2>Conclusão</h2>

<p>A <strong>{brand_name}</strong> representa o que há de melhor em cannabis premium. Com produtos de qualidade superior, processos transparentes e compromisso com a excelência, é a escolha certa para quem não abre mão de qualidade.</p>

<div class="cta-box">
    <h3>🛒 Explore Produtos {brand_name}</h3>
    <p>Veja nossa linha completa de produtos {brand_name} com garantia de autenticidade!</p>
    <a href="/produtos?marca={slugify(brand_name)}" class="btn-primary">Ver Produtos {brand_name}</a>
</div>

<p><small><strong>Aviso Legal:</strong> Este conteúdo tem fins educacionais. America Cannabis é distribuidor autorizado {brand_name}.</small></p>
"""

    internal_links = [
        {"text": f"produtos {brand_name}", "url": f"/produtos?marca={slugify(brand_name)}", "type": "category"},
        {"text": "marcas premium", "url": "/produtos", "type": "product"}
    ]

    base_date = datetime(2025, 6, 1)  # Após produtos
    published_at = (base_date + timedelta(days=brand_index * 3)).isoformat() + "Z"

    return {
        "id": f"brand-{brand.get('id', brand_index + 500)}",
        "slug": slug,
        "title": title,
        "excerpt": excerpt,
        "content": content.strip(),
        "category": BLOG_CATEGORIES["produtos"],
        "tags": tags,
        "imageUrl": "https://images.unsplash.com/photo-1556742059-b0c3c3c4e93c?w=1200&h=630&fit=crop",
        "readTime": 10,
        "featured": False,
        "relatedPosts": [],
        "internalLinks": internal_links,
        "publishedAt": published_at,
        "author": DEFAULT_AUTHOR,
        "metaTitle": title,
        "metaDescription": excerpt
    }

def generate_type_articles() -> List[Dict]:
    """Gera artigos para cada tipo (Indica, Sativa, Híbrida)"""

    types_info = {
        "INDICA": {
            "name": "Indica",
            "title": "Cannabis Indica: Guia Completo, Efeitos e Melhores Produtos 2025",
            "excerpt": "Tudo sobre Cannabis Indica: características, efeitos relaxantes, benefícios terapêuticos, diferenças da Sativa e os melhores produtos Indica disponíveis no Brasil.",
            "effects": "relaxantes e sedativos",
            "use": "noturno e medicinal",
            "benefits": ["Relaxamento profundo", "Alívio de dores", "Melhora do sono", "Redução de ansiedade"],
            "image": "https://images.unsplash.com/photo-1605882171745-0174e1068f23?w=1200&h=630&fit=crop"
        },
        "SATIVA": {
            "name": "Sativa",
            "title": "Cannabis Sativa: Guia Completo, Efeitos e Melhores Produtos 2025",
            "excerpt": "Guia definitivo sobre Cannabis Sativa: efeitos energizantes, uso diurno, benefícios para criatividade e foco, e os melhores produtos Sativa do mercado.",
            "effects": "energizantes e estimulantes",
            "use": "diurno e criativo",
            "benefits": ["Energia e disposição", "Foco mental", "Criatividade", "Humor elevado"],
            "image": "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=1200&h=630&fit=crop"
        },
        "HIBRIDA": {
            "name": "Híbrida",
            "title": "Cannabis Híbrida: Guia Completo, Efeitos Balanceados e Top Produtos 2025",
            "excerpt": "Descubra tudo sobre Cannabis Híbrida: equilíbrio perfeito entre Indica e Sativa, versatilidade de uso, efeitos balanceados e melhores produtos híbridos.",
            "effects": "balanceados e versáteis",
            "use": "diurno e noturno",
            "benefits": ["Equilíbrio perfeito", "Versatilidade de uso", "Efeitos controláveis", "Melhor de ambos os mundos"],
            "image": "https://images.unsplash.com/photo-1612965110667-f0b1b5d35c9a?w=1200&h=630&fit=crop"
        }
    }

    articles = []
    base_date = datetime(2025, 7, 1)

    for idx, (type_key, info) in enumerate(types_info.items()):
        content = f"""
<h1>Cannabis {info['name']}: O Guia Definitivo 2025</h1>

<h2>O que é Cannabis {info['name']}?</h2>

<p>A <strong>Cannabis {info['name']}</strong> é conhecida por seus efeitos {info['effects']}, sendo uma das variedades mais populares entre usuários que buscam {info['use']}. Este guia completo explora tudo que você precisa saber sobre produtos {info['name']}.</p>

<h2>Características da Cannabis {info['name']}</h2>

<h3>Aparência e Estrutura</h3>
<ul>
<li>Estrutura característica da planta</li>
<li>Densidade e formato dos buds</li>
<li>Perfil de terpenos único</li>
<li>Cor e textura distintivas</li>
</ul>

<h3>Perfil de Cannabinoides</h3>
<ul>
<li>Concentração típica de THC</li>
<li>Níveis de CBD</li>
<li>Outros cannabinoides presentes</li>
<li>Proporções ideais</li>
</ul>

<h2>Efeitos da Cannabis {info['name']}</h2>

<p>Os produtos {info['name']} são conhecidos por proporcionarem:</p>

<ul>
{''.join([f'<li>{benefit}</li>' for benefit in info['benefits']])}
</ul>

<h3>Perfil de Efeitos Detalhado</h3>

<h4>Efeitos Físicos</h4>
<p>Produtos {info['name']} caracteristicamente produzem efeitos físicos notáveis, incluindo sensações corporais intensas e relaxamento muscular profundo.</p>

<h4>Efeitos Mentais</h4>
<p>No aspecto mental, a {info['name']} proporciona uma experiência única que varia conforme a genética específica e dosagem utilizada.</p>

<h2>Quando Usar Cannabis {info['name']}</h2>

<p>A Cannabis {info['name']} é ideal para uso {info['use']}, sendo perfeita para:</p>

<ul>
<li>Momentos específicos do dia otimizados para o tipo</li>
<li>Situações que se beneficiam dos efeitos característicos</li>
<li>Propósitos terapêuticos específicos</li>
<li>Experiências recreativas adequadas</li>
</ul>

<h2>Benefícios Terapêuticos</h2>

<h3>Condições Médicas</h3>
<p>Estudos e relatos de usuários indicam que produtos {info['name']} podem ajudar com:</p>

<ul>
<li>Alívio de sintomas específicos</li>
<li>Tratamento complementar de condições crônicas</li>
<li>Bem-estar geral e qualidade de vida</li>
<li>Gestão de sintomas específicos</li>
</ul>

<h2>Melhores Produtos {info['name']} 2025</h2>

<p>Selecionamos os melhores produtos {info['name']} disponíveis no mercado brasileiro, todos com certificação e garantia de qualidade:</p>

<h3>Como Escolher o Produto {info['name']} Ideal</h3>

<ol>
<li><strong>Potência:</strong> Verifique os níveis de THC/CBD</li>
<li><strong>Terpenos:</strong> Perfil aromático e de efeitos</li>
<li><strong>Forma de Uso:</strong> Flores, óleos, comestíveis, etc.</li>
<li><strong>Certificação:</strong> COA e testes laboratoriais</li>
<li><strong>Reviews:</strong> Avaliações de outros usuários</li>
</ol>

<h2>{info['name']} vs. Outros Tipos</h2>

<h3>Comparação com Sativa</h3>
<p>Enquanto a Sativa é energizante, a {info['name']} oferece perfil de efeitos específico ideal para diferentes situações.</p>

<h3>Comparação com Híbrida</h3>
<p>Produtos Híbridos combinam características, mas a {info['name']} pura oferece experiência mais focada e previsível.</p>

<h2>Dosagem e Uso Responsável</h2>

<h3>Recomendações de Dosagem</h3>

<ul>
<li><strong>Iniciantes:</strong> Começar com doses baixas (2.5-5mg THC)</li>
<li><strong>Intermediários:</strong> 5-15mg THC conforme tolerância</li>
<li><strong>Experientes:</strong> 15mg+ com cautela</li>
</ul>

<h3>Dicas de Uso Seguro</h3>

<ol>
<li>Comece devagar e vá aumentando gradualmente</li>
<li>Aguarde tempo adequado entre doses</li>
<li>Mantenha-se hidratado</li>
<li>Use em ambiente seguro e confortável</li>
<li>Não combine com álcool inicialmente</li>
</ol>

<h2>Onde Comprar Cannabis {info['name']} com Segurança</h2>

<p>Na <strong>America Cannabis</strong>, oferecemos a mais completa seleção de produtos {info['name']} premium:</p>

<ul>
<li>✅ Produtos certificados e testados</li>
<li>✅ Variedade de marcas e opções</li>
<li>✅ Preços competitivos</li>
<li>✅ Entrega rápida em todo Brasil</li>
<li>✅ Suporte especializado</li>
</ul>

<h2>Perguntas Frequentes sobre {info['name']}</h2>

<h3>Qual a diferença principal da {info['name']}?</h3>
<p>A principal característica é o perfil de efeitos {info['effects']}, ideal para {info['use']}.</p>

<h3>{info['name']} é mais forte?</h3>
<p>A força depende da concentração de THC, não do tipo. Porém, os efeitos são percebidos de forma diferente.</p>

<h3>Posso usar {info['name']} durante o dia?</h3>
<p>Dependendo da potência e sensibilidade individual, alguns produtos {info['name']} podem ser usados durante o dia, mas são geralmente recomendados para {info['use']}.</p>

<h2>Conclusão</h2>

<p>A <strong>Cannabis {info['name']}</strong> oferece uma experiência única e efeitos {info['effects']} perfeitos para {info['use']}. Com a seleção certa de produtos e uso responsável, você pode aproveitar todos os benefícios que este tipo maravilhoso tem a oferecer.</p>

<div class="cta-box">
    <h3>🌿 Explore Produtos {info['name']}</h3>
    <p>Veja nossa coleção completa de produtos {info['name']} premium!</p>
    <a href="/produtos?tipo={type_key}" class="btn-primary">Ver Produtos {info['name']}</a>
</div>

<p><small><strong>Aviso Legal:</strong> Este conteúdo tem fins educacionais. Consulte sempre um profissional de saúde para orientação médica.</small></p>
"""

        article = {
            "id": f"type-{type_key.lower()}",
            "slug": f"cannabis-{slugify(info['name'])}",
            "title": info['title'],
            "excerpt": info['excerpt'],
            "content": content.strip(),
            "category": BLOG_CATEGORIES["guia-iniciante"],
            "tags": [
                f"cannabis {info['name'].lower()}",
                f"{info['name'].lower()} efeitos",
                f"produtos {info['name'].lower()}",
                "tipos de cannabis",
                f"{info['name'].lower()} brasil"
            ],
            "imageUrl": info['image'],
            "readTime": 15,
            "featured": idx == 0,  # Primeira é featured
            "relatedPosts": [],
            "internalLinks": [
                {"text": f"produtos {info['name']}", "url": f"/produtos?tipo={type_key}", "type": "category"},
                {"text": "todos os produtos", "url": "/produtos", "type": "product"}
            ],
            "publishedAt": (base_date + timedelta(days=idx * 7)).isoformat() + "Z",
            "author": DEFAULT_AUTHOR,
            "metaTitle": info['title'],
            "metaDescription": info['excerpt']
        }

        articles.append(article)

    return articles

def main():
    """Função principal"""
    print("=" * 70)
    print("ENTERPRISE SEO BLOG ARTICLE GENERATOR")
    print("=" * 70)
    print()

    all_articles = []

    # 1. Buscar produtos
    print("📦 Buscando produtos...")
    products = fetch_api_data("/api/products")
    print(f"   ✓ {len(products)} produtos encontrados")

    # 2. Gerar artigos de produtos
    print("\n📝 Gerando artigos de produtos...")
    product_articles = []
    for idx, product in enumerate(products[:30]):  # Primeiros 30 produtos
        article = generate_product_article(product, idx)
        product_articles.append(article)
        if (idx + 1) % 10 == 0:
            print(f"   ✓ {idx + 1} artigos de produtos gerados...")

    all_articles.extend(product_articles)
    print(f"   ✓ Total: {len(product_articles)} artigos de produtos gerados")

    # 3. Buscar marcas
    print("\n🏷️  Buscando marcas...")
    brands = fetch_api_data("/api/brands/active")
    print(f"   ✓ {len(brands)} marcas encontradas")

    # 4. Gerar artigos de marcas
    print("\n📝 Gerando artigos de marcas...")
    brand_articles = []
    for idx, brand in enumerate(brands):
        article = generate_brand_article(brand, idx, len(products))
        brand_articles.append(article)

    all_articles.extend(brand_articles)
    print(f"   ✓ Total: {len(brand_articles)} artigos de marcas gerados")

    # 5. Gerar artigos de tipos
    print("\n📝 Gerando artigos de tipos...")
    type_articles = generate_type_articles()
    all_articles.extend(type_articles)
    print(f"   ✓ Total: {len(type_articles)} artigos de tipos gerados")

    # 6. Carregar artigos existentes
    print("\n📚 Carregando artigos existentes...")
    try:
        with open("src/data/blog-posts.json", "r", encoding="utf-8") as f:
            existing_articles = json.load(f)
        print(f"   ✓ {len(existing_articles)} artigos existentes carregados")
        all_articles = existing_articles + all_articles
    except FileNotFoundError:
        print("   ! Nenhum artigo existente encontrado")

    # 7. Salvar todos os artigos
    print("\n💾 Salvando artigos...")
    output_file = "src/data/blog-posts.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(all_articles, f, ensure_ascii=False, indent=2)

    print(f"   ✓ {len(all_articles)} artigos salvos em {output_file}")

    # 8. Estatísticas
    print("\n" + "=" * 70)
    print("📊 ESTATÍSTICAS FINAIS")
    print("=" * 70)
    print(f"\n✅ Artigos Existentes: {len(existing_articles) if 'existing_articles' in locals() else 0}")
    print(f"✅ Artigos de Produtos: {len(product_articles)}")
    print(f"✅ Artigos de Marcas: {len(brand_articles)}")
    print(f"✅ Artigos de Tipos: {len(type_articles)}")
    print(f"🎯 TOTAL DE ARTIGOS: {len(all_articles)}")

    print("\n" + "=" * 70)
    print("✨ GERAÇÃO CONCLUÍDA COM SUCESSO!")
    print("=" * 70)

    return 0

if __name__ == "__main__":
    exit(main())
