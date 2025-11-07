#!/usr/bin/env python3
"""
Script para mapear todas as imagens que precisam ser substituídas.
Gera arquivos JSON com listas de produtos e artigos educacionais.

Uso: python3 list_required_images.py
"""

import json
from pathlib import Path

def list_required_images():
    """
    Gera lista de imagens que precisam ser criadas/fotografadas
    """

    blog_posts_path = Path('src/data/blog-posts.json')

    if not blog_posts_path.exists():
        print("❌ Erro: src/data/blog-posts.json não encontrado")
        return

    with open(blog_posts_path, 'r', encoding='utf-8') as f:
        posts = json.load(f)

    # Separar por tipo
    product_posts = []
    educational_posts = []
    already_ok = []

    for post in posts:
        image_url = post.get('imageUrl', '')

        # Verificar se tem imagem Unsplash
        if 'unsplash' not in image_url.lower():
            if image_url:  # Tem imagem mas não é Unsplash
                already_ok.append({
                    'slug': post['slug'],
                    'title': post['title'],
                    'image': image_url[:80] + '...' if len(image_url) > 80 else image_url
                })
            continue

        # Classificar por tipo
        if post['id'].startswith('product-') or post['id'].startswith('brand-'):
            product_id = post['id'].replace('product-', '').replace('brand-', '')
            product_posts.append({
                'post_id': post['id'],
                'slug': post['slug'],
                'title': post['title'],
                'product_id': product_id,
                'current_image': image_url,
                'category': post.get('category', {}).get('name', 'N/A')
            })
        else:
            educational_posts.append({
                'id': post['id'],
                'slug': post['slug'],
                'title': post['title'],
                'category': post.get('category', {}).get('name', 'N/A'),
                'current_image': image_url,
                'tags': post.get('tags', [])
            })

    # Salvar listas
    with open('IMAGE_REQUIRED_PRODUCTS.json', 'w', encoding='utf-8') as f:
        json.dump(product_posts, f, indent=2, ensure_ascii=False)

    with open('IMAGE_REQUIRED_EDUCATIONAL.json', 'w', encoding='utf-8') as f:
        json.dump(educational_posts, f, indent=2, ensure_ascii=False)

    # Relatório
    print("=" * 80)
    print("📸 RELATÓRIO DE IMAGENS UNSPLASH")
    print("=" * 80)
    print()
    print(f"📦 Produtos que precisam de fotos: {len(product_posts)}")
    print(f"📚 Artigos educacionais que precisam de imagens: {len(educational_posts)}")
    print(f"✅ Posts já com imagens adequadas: {len(already_ok)}")
    print(f"📊 Total de posts: {len(posts)}")
    print()

    # Detalhamento de produtos
    if product_posts:
        print("=" * 80)
        print("📦 PRODUTOS REVIEW/BRAND (precisam de fotos reais)")
        print("=" * 80)
        for i, p in enumerate(product_posts[:10], 1):
            print(f"{i:>2}. {p['title'][:60]:<60} | {p['category']}")
        if len(product_posts) > 10:
            print(f"    ... e mais {len(product_posts) - 10} produtos")
        print()

    # Detalhamento de educacionais
    if educational_posts:
        print("=" * 80)
        print("📚 ARTIGOS EDUCACIONAIS (precisam de imagens customizadas)")
        print("=" * 80)

        # Agrupar por categoria
        by_category = {}
        for post in educational_posts:
            cat = post['category']
            if cat not in by_category:
                by_category[cat] = []
            by_category[cat].append(post)

        for category, posts_in_cat in sorted(by_category.items()):
            print(f"\n{category} ({len(posts_in_cat)} posts):")
            for post in posts_in_cat:
                print(f"  • {post['title'][:70]}")
        print()

    # Arquivos criados
    print("=" * 80)
    print("📁 ARQUIVOS GERADOS")
    print("=" * 80)
    print("  ✅ IMAGE_REQUIRED_PRODUCTS.json")
    print(f"     └─ {len(product_posts)} produtos para fotografar")
    print()
    print("  ✅ IMAGE_REQUIRED_EDUCATIONAL.json")
    print(f"     └─ {len(educational_posts)} artigos para ilustrar")
    print()

    # Recomendações
    print("=" * 80)
    print("💡 PRÓXIMOS PASSOS")
    print("=" * 80)
    print()
    print("1. Revisar os arquivos JSON gerados")
    print("2. Priorizar produtos mais vendidos/populares")
    print("3. Definir estratégia de fotografia (in-house vs. contratado)")
    print("4. Para artigos educacionais: decidir entre fotos de produtos, ")
    print("   stock photos premium, ou ilustrações customizadas")
    print()
    print("📖 Veja IMAGE_REPLACEMENT_PLAN.md para detalhes completos")
    print("=" * 80)

if __name__ == "__main__":
    list_required_images()
