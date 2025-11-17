#!/usr/bin/env python3
import json
import re
import random
from typing import Dict, List, Any

# Mapeamento de categorias para imagens apropriadas
CATEGORY_IMAGES = {
    "guia-iniciante": [
        "https://images.unsplash.com/photo-1606923231631-e594c43d2ed5?w=1200&h=630&fit=crop",  # Cannabis leaf with droplet
        "https://images.unsplash.com/photo-1611689037241-d8dfe4280f2e?w=1200&h=630&fit=crop",  # CBD oil bottle
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&h=630&fit=crop",  # Medical consultation
        "https://images.unsplash.com/photo-1605882171745-0174e1068f23?w=1200&h=630&fit=crop",  # Hemp plant
    ],
    "saude-bem-estar": [
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop",  # Yoga/meditation
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop",  # Wellness
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=630&fit=crop",  # Healthy lifestyle
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&h=630&fit=crop",  # Medical professional
    ],
    "cbd-terapeutico": [
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&h=630&fit=crop",  # CBD oil dropper
        "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=1200&h=630&fit=crop",  # CBD products
        "https://images.unsplash.com/photo-1604135307399-86c6ce0aba8e?w=1200&h=630&fit=crop",  # Lab testing
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&h=630&fit=crop",  # Natural medicine
    ],
    "cultivo": [
        "https://images.unsplash.com/photo-1536657464919-892534f60818?w=1200&h=630&fit=crop",  # Cannabis cultivation
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop",  # Plant growth
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&h=630&fit=crop",  # Growing plants
        "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=1200&h=630&fit=crop",  # Indoor growing
    ],
    "legislacao": [
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=630&fit=crop",  # Legal documents
        "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&h=630&fit=crop",  # Law books
        "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1200&h=630&fit=crop",  # Justice scale
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",  # Legal paperwork
    ],
    "produtos": [
        "https://images.unsplash.com/photo-1611689102192-1f6e0e52df0a?w=1200&h=630&fit=crop",  # CBD products display
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=1200&h=630&fit=crop",  # Product lineup
        "https://images.unsplash.com/photo-1608571424347-5d0d7ef72ce9?w=1200&h=630&fit=crop",  # Premium products
        "https://images.unsplash.com/photo-1611689037241-d8dfe4280f2e?w=1200&h=630&fit=crop",  # CBD bottles
    ],
    "receitas": [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=630&fit=crop",  # Cannabis edibles
        "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=1200&h=630&fit=crop",  # Cooking ingredients
        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=630&fit=crop",  # Food preparation
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=630&fit=crop",  # Healthy food
    ],
    "noticias": [
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=630&fit=crop",  # News/media
        "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&h=630&fit=crop",  # Newspaper
        "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?w=1200&h=630&fit=crop",  # Breaking news
        "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&h=630&fit=crop",  # Digital news
    ],
    "estilo-vida": [
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=630&fit=crop",  # Lifestyle
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop",  # Modern living
        "https://images.unsplash.com/photo-1522444024501-4c17e5b906d8?w=1200&h=630&fit=crop",  # Wellness lifestyle
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop",  # Happy lifestyle
    ],
    "tecnologia": [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=630&fit=crop",  # Medical technology
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=1200&h=630&fit=crop",  # Lab technology
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=630&fit=crop",  # Innovation
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&h=630&fit=crop",  # Research tech
    ]
}

# Palavras-chave que indicam conteúdo problemático ou inadequado
BAD_IMAGE_KEYWORDS = [
    "trash", "garbage", "waste", "dump", "litter",
    "pollution", "dirty", "messy", "broken", "damage"
]

def analyze_image_url(image_url: str) -> Dict[str, Any]:
    """Analisa a URL da imagem e identifica problemas"""
    problems = []

    # Verifica se é uma imagem do Unsplash
    if "unsplash.com" in image_url:
        # Extrai o ID da foto
        photo_id = re.search(r'photo-(\d+)', image_url)
        if photo_id:
            # Verifica se contém palavras-chave problemáticas
            for keyword in BAD_IMAGE_KEYWORDS:
                if keyword in image_url.lower():
                    problems.append(f"Imagem pode ser inadequada (contém '{keyword}')")

    # Verifica dimensões da imagem
    if "w=1200&h=630" not in image_url and "unsplash" in image_url:
        problems.append("Imagem não otimizada para redes sociais (deve ser 1200x630)")

    return {
        "url": image_url,
        "problems": problems,
        "needs_replacement": len(problems) > 0
    }

def analyze_content(content: str) -> Dict[str, Any]:
    """Analisa o conteúdo do post"""
    issues = []

    # Verifica comprimento
    if len(content) < 500:
        issues.append("Conteúdo muito curto (menos de 500 caracteres)")

    # Verifica estrutura HTML
    if not re.search(r'<h[1-6]>', content):
        issues.append("Falta estrutura de cabeçalhos")

    if not re.search(r'<p>', content):
        issues.append("Falta parágrafos")

    # Verifica se tem conteúdo genérico/placeholder
    if "lorem ipsum" in content.lower():
        issues.append("Contém texto placeholder")

    if content.count("<h2>") < 3:
        issues.append("Poucos subtítulos (recomendado mínimo 3)")

    # Verifica links internos
    internal_links = re.findall(r'href="/(.*?)"', content)
    if len(internal_links) < 2:
        issues.append("Poucos links internos (recomendado mínimo 2)")

    return {
        "length": len(content),
        "has_structure": len(issues) == 0,
        "issues": issues,
        "internal_links": len(internal_links),
        "needs_improvement": len(issues) > 0
    }

def analyze_seo(post: Dict[str, Any]) -> Dict[str, Any]:
    """Analisa SEO do post"""
    issues = []

    # Verifica meta title
    meta_title = post.get("metaTitle", "")
    if len(meta_title) < 30:
        issues.append("Meta title muito curto (mínimo 30 caracteres)")
    elif len(meta_title) > 60:
        issues.append("Meta title muito longo (máximo 60 caracteres)")

    # Verifica meta description
    meta_desc = post.get("metaDescription", "")
    if len(meta_desc) < 120:
        issues.append("Meta description muito curta (mínimo 120 caracteres)")
    elif len(meta_desc) > 160:
        issues.append("Meta description muito longa (máximo 160 caracteres)")

    # Verifica slug
    slug = post.get("slug", "")
    if len(slug) > 50:
        issues.append("Slug muito longo")

    # Verifica tags
    tags = post.get("tags", [])
    if len(tags) < 3:
        issues.append("Poucas tags (recomendado mínimo 3)")

    return {
        "meta_title_length": len(meta_title),
        "meta_desc_length": len(meta_desc),
        "slug_length": len(slug),
        "tags_count": len(tags),
        "issues": issues,
        "needs_optimization": len(issues) > 0
    }

def suggest_better_image(category_id: str, current_url: str) -> str:
    """Sugere uma imagem melhor baseada na categoria"""
    if category_id in CATEGORY_IMAGES:
        images = CATEGORY_IMAGES[category_id]
        # Remove a imagem atual da lista se estiver lá
        available_images = [img for img in images if img != current_url]
        if available_images:
            return random.choice(available_images)

    # Imagem genérica de fallback
    return "https://images.unsplash.com/photo-1611689037241-d8dfe4280f2e?w=1200&h=630&fit=crop"

def main():
    # Carrega o arquivo de posts
    with open('/Users/yourapple/americancannabiss/frontend/src/data/blog-posts.json', 'r', encoding='utf-8') as f:
        posts = json.load(f)

    print(f"Analisando {len(posts)} posts do blog...")
    print("-" * 80)

    posts_with_issues = []
    image_issues_count = 0
    content_issues_count = 0
    seo_issues_count = 0

    for i, post in enumerate(posts):
        post_id = post.get("id", f"post_{i}")
        title = post.get("title", "Sem título")
        category_id = post.get("category", {}).get("id", "")

        # Analisa imagem
        image_analysis = analyze_image_url(post.get("imageUrl", ""))

        # Analisa conteúdo
        content_analysis = analyze_content(post.get("content", ""))

        # Analisa SEO
        seo_analysis = analyze_seo(post)

        # Compila problemas
        has_issues = (
            image_analysis["needs_replacement"] or
            content_analysis["needs_improvement"] or
            seo_analysis["needs_optimization"]
        )

        if has_issues:
            issue_report = {
                "id": post_id,
                "title": title,
                "category": category_id,
                "image_issues": image_analysis["problems"],
                "content_issues": content_analysis["issues"],
                "seo_issues": seo_analysis["issues"],
                "suggested_image": None
            }

            if image_analysis["needs_replacement"]:
                issue_report["suggested_image"] = suggest_better_image(category_id, image_analysis["url"])
                image_issues_count += 1

            if content_analysis["needs_improvement"]:
                content_issues_count += 1

            if seo_analysis["needs_optimization"]:
                seo_issues_count += 1

            posts_with_issues.append(issue_report)

    # Imprime relatório
    print(f"\n📊 RELATÓRIO DE ANÁLISE DOS POSTS\n")
    print(f"Total de posts analisados: {len(posts)}")
    print(f"Posts com problemas: {len(posts_with_issues)}")
    print(f"  - Problemas de imagem: {image_issues_count}")
    print(f"  - Problemas de conteúdo: {content_issues_count}")
    print(f"  - Problemas de SEO: {seo_issues_count}")
    print("-" * 80)

    # Mostra os 10 posts mais problemáticos
    print(f"\n🔴 TOP 10 POSTS COM MAIS PROBLEMAS:\n")

    # Ordena por número total de problemas
    posts_with_issues.sort(
        key=lambda x: len(x["image_issues"]) + len(x["content_issues"]) + len(x["seo_issues"]),
        reverse=True
    )

    for i, issue in enumerate(posts_with_issues[:10], 1):
        total_issues = len(issue["image_issues"]) + len(issue["content_issues"]) + len(issue["seo_issues"])
        print(f"\n{i}. [{issue['id']}] {issue['title'][:60]}...")
        print(f"   Categoria: {issue['category']}")
        print(f"   Total de problemas: {total_issues}")

        if issue["image_issues"]:
            print(f"   🖼️  Imagem: {', '.join(issue['image_issues'])}")
            if issue["suggested_image"]:
                print(f"      Sugestão: {issue['suggested_image']}")

        if issue["content_issues"]:
            print(f"   📝 Conteúdo: {', '.join(issue['content_issues'][:2])}")

        if issue["seo_issues"]:
            print(f"   🔍 SEO: {', '.join(issue['seo_issues'])}")

    # Salva relatório completo em JSON
    with open('/Users/yourapple/americancannabiss/frontend/scripts/blog-issues-report.json', 'w', encoding='utf-8') as f:
        json.dump(posts_with_issues, f, ensure_ascii=False, indent=2)

    print(f"\n💾 Relatório completo salvo em: blog-issues-report.json")
    print(f"\n✅ Análise concluída!")

if __name__ == "__main__":
    main()