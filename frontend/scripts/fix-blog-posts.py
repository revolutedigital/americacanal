#!/usr/bin/env python3
import json
import re
import random
from typing import Dict, List, Any
from datetime import datetime
import hashlib

# Mapeamento de categorias para imagens apropriadas
CATEGORY_IMAGES = {
    "guia-iniciante": [
        "https://images.unsplash.com/photo-1606923231631-e594c43d2ed5?w=1200&h=630&fit=crop",  # Cannabis leaf with droplet
        "https://images.unsplash.com/photo-1611689037241-d8dfe4280f2e?w=1200&h=630&fit=crop",  # CBD oil bottle
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&h=630&fit=crop",  # Medical consultation
    ],
    "saude-bem-estar": [
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop",  # Yoga/meditation
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop",  # Wellness
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=630&fit=crop",  # Healthy lifestyle
    ],
    "cbd-terapeutico": [
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&h=630&fit=crop",  # CBD oil dropper
        "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=1200&h=630&fit=crop",  # CBD products
        "https://images.unsplash.com/photo-1604135307399-86c6ce0aba8e?w=1200&h=630&fit=crop",  # Lab testing
    ],
    "cultivo": [
        "https://images.unsplash.com/photo-1536657464919-892534f60818?w=1200&h=630&fit=crop",  # Cannabis cultivation
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop",  # Plant growth
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&h=630&fit=crop",  # Growing plants
    ],
    "legislacao": [
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=630&fit=crop",  # Legal documents
        "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&h=630&fit=crop",  # Law books
        "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1200&h=630&fit=crop",  # Justice scale
    ],
    "produtos": [
        "https://images.unsplash.com/photo-1611689102192-1f6e0e52df0a?w=1200&h=630&fit=crop",  # CBD products display
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=1200&h=630&fit=crop",  # Product lineup
        "https://images.unsplash.com/photo-1608571424347-5d0d7ef72ce9?w=1200&h=630&fit=crop",  # Premium products
    ],
    "receitas": [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=630&fit=crop",  # Cannabis edibles
        "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=1200&h=630&fit=crop",  # Cooking ingredients
        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=630&fit=crop",  # Food preparation
    ],
    "noticias": [
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=630&fit=crop",  # News/media
        "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&h=630&fit=crop",  # Newspaper
        "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?w=1200&h=630&fit=crop",  # Breaking news
    ],
    "estilo-vida": [
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=630&fit=crop",  # Lifestyle
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop",  # Modern living
        "https://images.unsplash.com/photo-1522444024501-4c17e5b906d8?w=1200&h=630&fit=crop",  # Wellness lifestyle
    ],
    "tecnologia": [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=630&fit=crop",  # Medical technology
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=1200&h=630&fit=crop",  # Lab technology
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=630&fit=crop",  # Innovation
    ]
}

# Palavras-chave problemáticas em URLs de imagem
BAD_IMAGE_KEYWORDS = [
    "trash", "garbage", "waste", "dump", "litter",
    "pollution", "dirty", "messy", "broken", "damage",
    "placeholder", "default", "404", "error"
]

# Templates de conteúdo por categoria
CONTENT_TEMPLATES = {
    "cbd-terapeutico": """
<h2>Benefícios Terapêuticos do CBD</h2>
<p>O canabidiol (CBD) tem demonstrado propriedades terapêuticas significativas em diversos estudos científicos. Seus benefícios incluem redução da ansiedade, alívio da dor crônica e melhoria na qualidade do sono.</p>

<h2>Como o CBD Funciona no Organismo</h2>
<p>O CBD interage com o sistema endocanabinoide do corpo humano, ajudando a regular funções importantes como humor, apetite, sono e resposta imunológica. Diferentemente do THC, o CBD não possui efeitos psicoativos.</p>

<h2>Formas de Uso e Dosagem</h2>
<p>Existem diversas formas de consumir CBD, incluindo óleos sublinguais, cápsulas, cremes tópicos e vaporizadores. A dosagem ideal varia de pessoa para pessoa e deve ser determinada gradualmente.</p>

<p>Para encontrar os melhores <a href="/produtos">produtos de CBD</a>, visite nossa loja online. Também oferecemos <a href="/blog">artigos informativos</a> sobre o uso medicinal da cannabis.</p>
""",
    "cultivo": """
<h2>Preparação do Ambiente de Cultivo</h2>
<p>O cultivo bem-sucedido de cannabis medicinal começa com a preparação adequada do ambiente. Fatores como temperatura, umidade e ventilação são cruciais para o desenvolvimento saudável das plantas.</p>

<h2>Escolha das Variedades</h2>
<p>A seleção das variedades corretas é fundamental. Considere fatores como o espaço disponível, experiência no cultivo e os efeitos desejados. Variedades com alto teor de CBD são ideais para uso medicinal.</p>

<h2>Nutrientes e Cuidados Essenciais</h2>
<p>Durante o ciclo de crescimento, as plantas necessitam de nutrientes específicos em cada fase. O pH da água, a quantidade de luz e o controle de pragas são aspectos que requerem atenção constante.</p>

<p>Explore nossa seleção de <a href="/produtos">sementes e produtos</a> para cultivo. Confira também nossos <a href="/blog/categoria/cultivo">guias de cultivo</a> para mais informações.</p>
""",
    "legislacao": """
<h2>Marco Legal da Cannabis Medicinal no Brasil</h2>
<p>A legislação brasileira sobre cannabis medicinal tem evoluído significativamente nos últimos anos. A ANVISA regulamentou o uso de produtos à base de cannabis para fins medicinais, estabelecendo critérios claros para importação e produção.</p>

<h2>Requisitos para Acesso Legal</h2>
<p>Pacientes que necessitam de tratamento com cannabis medicinal devem seguir procedimentos específicos, incluindo prescrição médica, autorização da ANVISA e cadastro no sistema de controle.</p>

<h2>Perspectivas Futuras</h2>
<p>Projetos de lei em tramitação no Congresso Nacional podem ampliar o acesso à cannabis medicinal no Brasil. O debate público continua evoluindo, com crescente apoio da comunidade médica e científica.</p>

<p>Mantenha-se informado com nossas <a href="/blog/categoria/noticias">últimas notícias</a> sobre legislação. Conheça também nossos <a href="/produtos">produtos legalizados</a>.</p>
""",
    "saude-bem-estar": """
<h2>Cannabis e Qualidade de Vida</h2>
<p>O uso responsável de cannabis medicinal pode contribuir significativamente para a melhoria da qualidade de vida. Pacientes com condições crônicas relatam redução de sintomas e maior bem-estar geral.</p>

<h2>Abordagem Holística da Saúde</h2>
<p>A cannabis medicinal é parte de uma abordagem integrativa da saúde, combinando tratamentos convencionais com terapias complementares. Esta visão holística considera o paciente em sua totalidade.</p>

<h2>Evidências Científicas</h2>
<p>Estudos clínicos demonstram a eficácia da cannabis no tratamento de diversas condições, incluindo epilepsia, dor neuropática, esclerose múltipla e sintomas relacionados ao câncer.</p>

<p>Descubra nossos <a href="/produtos">produtos para bem-estar</a> e leia mais <a href="/blog">artigos sobre saúde</a> em nosso blog.</p>
"""
}

def fix_image_url(current_url: str, category_id: str, post_title: str) -> str:
    """Corrige URL de imagem problemática"""
    # Verifica se a imagem tem palavras-chave problemáticas
    for keyword in BAD_IMAGE_KEYWORDS:
        if keyword in current_url.lower():
            # Substitui por uma imagem apropriada da categoria
            if category_id in CATEGORY_IMAGES:
                # Usa hash do título para selecionar imagem consistente
                hash_val = int(hashlib.md5(post_title.encode()).hexdigest(), 16)
                images = CATEGORY_IMAGES[category_id]
                return images[hash_val % len(images)]

    # Verifica se a imagem está otimizada para redes sociais
    if "unsplash.com" in current_url and "w=1200&h=630" not in current_url:
        # Adiciona parâmetros de otimização
        if "?" in current_url:
            return current_url + "&w=1200&h=630&fit=crop"
        else:
            return current_url + "?w=1200&h=630&fit=crop"

    # Se não houver categoria específica, usa imagem genérica
    if not current_url or current_url == "":
        return CATEGORY_IMAGES.get(category_id, CATEGORY_IMAGES["cbd-terapeutico"])[0]

    return current_url

def fix_content(content: str, category_id: str, title: str) -> str:
    """Adiciona conteúdo completo ao post"""
    # Se o conteúdo for muito curto, adiciona template
    if len(content) < 500:
        template = CONTENT_TEMPLATES.get(
            category_id,
            CONTENT_TEMPLATES["cbd-terapeutico"]
        )

        # Personaliza o template com o título
        intro = f"<h1>{title}</h1>\n<p>{title} é um tema de grande relevância no contexto atual da cannabis medicinal no Brasil.</p>\n"

        return intro + template

    # Adiciona links internos se não existirem
    internal_links = re.findall(r'href="/(.*?)"', content)
    if len(internal_links) < 2:
        # Adiciona links no final do conteúdo
        links_section = """
<h2>Conteúdo Relacionado</h2>
<p>Para mais informações sobre cannabis medicinal, visite nossa <a href="/produtos">loja online</a> e explore nossos <a href="/blog">artigos educativos</a>.
Também recomendamos conhecer nossa seção de <a href="/sobre">informações institucionais</a> e <a href="/contato">entrar em contato</a> para dúvidas.</p>
"""
        if "</article>" in content:
            content = content.replace("</article>", links_section + "</article>")
        else:
            content = content + links_section

    # Adiciona headers se não existirem
    if not re.search(r'<h[2-6]>', content):
        # Adiciona estrutura básica
        sections = content.split("</p>")
        if len(sections) > 3:
            # Adiciona h2 a cada 2-3 parágrafos
            new_content = []
            headers = ["Visão Geral", "Pontos Importantes", "Considerações Finais"]
            header_idx = 0

            for i, section in enumerate(sections):
                if i > 0 and i % 3 == 0 and header_idx < len(headers):
                    new_content.append(f"<h2>{headers[header_idx]}</h2>")
                    header_idx += 1
                new_content.append(section + "</p>" if section.strip() else "")

            content = "".join(new_content)

    return content

def optimize_seo(post: Dict[str, Any]) -> Dict[str, Any]:
    """Otimiza SEO do post"""
    title = post.get("title", "")

    # Fix meta title
    meta_title = post.get("metaTitle", "")
    if len(meta_title) < 30 or len(meta_title) > 60:
        # Cria meta title otimizado
        if len(title) <= 50:
            meta_title = f"{title} | Cannabis"
        else:
            meta_title = title[:57] + "..."
        post["metaTitle"] = meta_title

    # Fix meta description
    meta_desc = post.get("metaDescription", "")
    if len(meta_desc) < 120 or len(meta_desc) > 160:
        # Extrai primeira frase do conteúdo ou cria descrição
        content = post.get("content", "")
        clean_content = re.sub(r'<[^>]+>', '', content)  # Remove HTML

        if clean_content:
            sentences = clean_content.split(".")
            if sentences:
                meta_desc = sentences[0][:150] + "..."
            else:
                meta_desc = clean_content[:150] + "..."
        else:
            meta_desc = f"{title}. Informações completas sobre cannabis medicinal, CBD e produtos relacionados. Acesse e saiba mais."

        post["metaDescription"] = meta_desc

    # Fix slug se muito longo
    slug = post.get("slug", "")
    if len(slug) > 50:
        # Encurta slug mantendo palavras principais
        words = slug.split("-")[:5]  # Pega primeiras 5 palavras
        new_slug = "-".join(words)
        post["slug"] = new_slug

    # Adiciona tags se não existirem
    tags = post.get("tags", [])
    if len(tags) < 3:
        category_id = post.get("category", {}).get("id", "")
        default_tags = ["cannabis medicinal", "cbd", "saúde"]

        if category_id == "cbd-terapeutico":
            default_tags.extend(["canabidiol", "tratamento", "terapia"])
        elif category_id == "cultivo":
            default_tags.extend(["cultivo", "plantas", "jardinagem"])
        elif category_id == "legislacao":
            default_tags.extend(["leis", "regulamentação", "anvisa"])
        elif category_id == "saude-bem-estar":
            default_tags.extend(["bem-estar", "qualidade de vida", "saúde natural"])

        post["tags"] = list(set(tags + default_tags))[:6]  # Máximo 6 tags

    return post

def main():
    # Carrega o arquivo de posts
    print("Carregando posts do blog...")
    with open('/Users/yourapple/americancannabiss/frontend/src/data/blog-posts.json', 'r', encoding='utf-8') as f:
        posts = json.load(f)

    print(f"Total de posts: {len(posts)}")
    print("-" * 80)

    fixed_count = 0
    image_fixes = 0
    content_fixes = 0
    seo_fixes = 0

    for i, post in enumerate(posts):
        post_id = post.get("id", f"post_{i}")
        title = post.get("title", "Sem título")
        category_id = post.get("category", {}).get("id", "")
        original_post = json.dumps(post, ensure_ascii=False)

        print(f"\nProcessando [{i+1}/{len(posts)}]: {title[:60]}...")

        # 1. Fix imagem
        old_image = post.get("imageUrl", "")
        new_image = fix_image_url(old_image, category_id, title)
        if new_image != old_image:
            post["imageUrl"] = new_image
            image_fixes += 1
            print(f"  ✅ Imagem corrigida")

        # 2. Fix conteúdo
        old_content = post.get("content", "")
        new_content = fix_content(old_content, category_id, title)
        if new_content != old_content:
            post["content"] = new_content
            content_fixes += 1
            print(f"  ✅ Conteúdo expandido")

        # 3. Optimize SEO
        post = optimize_seo(post)
        updated_post = json.dumps(post, ensure_ascii=False)

        if original_post != updated_post:
            fixed_count += 1
            if post.get("metaTitle") or post.get("metaDescription") or post.get("tags"):
                seo_fixes += 1
                print(f"  ✅ SEO otimizado")

    # Salva o arquivo atualizado
    print("\n" + "=" * 80)
    print(f"Salvando {len(posts)} posts corrigidos...")

    # Backup do arquivo original
    from datetime import datetime
    backup_name = f'/Users/yourapple/americancannabiss/frontend/src/data/blog-posts.backup.{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'
    with open('/Users/yourapple/americancannabiss/frontend/src/data/blog-posts.json', 'r', encoding='utf-8') as f:
        backup_content = f.read()
    with open(backup_name, 'w', encoding='utf-8') as f:
        f.write(backup_content)
    print(f"✅ Backup criado: {backup_name}")

    # Salva arquivo corrigido
    with open('/Users/yourapple/americancannabiss/frontend/src/data/blog-posts.json', 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    print("\n" + "=" * 80)
    print("📊 RESUMO DAS CORREÇÕES:")
    print(f"  Total de posts processados: {len(posts)}")
    print(f"  Posts modificados: {fixed_count}")
    print(f"  Imagens corrigidas: {image_fixes}")
    print(f"  Conteúdos expandidos: {content_fixes}")
    print(f"  SEO otimizado: {seo_fixes}")
    print("=" * 80)
    print("✅ Correções concluídas com sucesso!")

if __name__ == "__main__":
    main()