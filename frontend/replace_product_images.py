#!/usr/bin/env python3
"""
Script para substituir imagens Unsplash por imagens reais dos produtos.
Busca imagens via API do backend e atualiza blog-posts.json automaticamente.

IMPORTANTE: Só atualiza se o produto tiver imagem REAL (não Unsplash)

Uso: python3 replace_product_images.py [--dry-run]
"""

import json
import requests
import sys
from pathlib import Path

TENANT_ID = "3aac40a2-42a8-4db4-8f46-d044844c618d"
API_URL = "https://backend-production1.up.railway.app"

def is_real_image(url):
    """Verifica se a URL é uma imagem real (não Unsplash/placeholder)"""
    if not url:
        return False

    url_lower = url.lower()

    # Blacklist de placeholders
    placeholders = [
        'unsplash.com',
        'placeholder.com',
        'via.placeholder',
        'placehold.it',
        'dummyimage.com'
    ]

    return not any(p in url_lower for p in placeholders)

def update_blog_images(dry_run=False):
    """
    Busca imagens reais dos produtos via API e atualiza blog-posts.json

    Args:
        dry_run: Se True, apenas simula as mudanças sem salvar
    """

    blog_posts_path = Path('src/data/blog-posts.json')

    if not blog_posts_path.exists():
        print("❌ Erro: src/data/blog-posts.json não encontrado")
        return

    with open(blog_posts_path, 'r', encoding='utf-8') as f:
        posts = json.load(f)

    print("=" * 80)
    print(f"🔄 {'[DRY RUN] ' if dry_run else ''}SUBSTITUIÇÃO DE IMAGENS")
    print("=" * 80)
    print()

    updated = 0
    skipped_still_unsplash = 0
    skipped_not_product = 0
    errors = 0

    for post in posts:
        # Só processar posts de produtos/marcas
        if not (post['id'].startswith('product-') or post['id'].startswith('brand-')):
            skipped_not_product += 1
            continue

        # Só processar se ainda tem Unsplash
        current_image = post.get('imageUrl', '')
        if 'unsplash' not in current_image.lower():
            continue

        # Extrair ID do produto/marca
        if post['id'].startswith('product-'):
            item_id = post['id'].replace('product-', '')
            item_type = 'produto'
        else:
            item_id = post['id'].replace('brand-', '')
            item_type = 'marca'

        # Buscar na API
        try:
            response = requests.get(
                f"{API_URL}/api/products/{item_id}",
                params={"tenantId": TENANT_ID},
                timeout=10
            )

            if response.status_code == 200:
                item = response.json()
                images = item.get('images', [])

                # Verificar se tem imagem real
                if images and is_real_image(images[0]):
                    old_image = post['imageUrl']
                    new_image = images[0]

                    if not dry_run:
                        post['imageUrl'] = new_image

                    print(f"✅ {item_type.upper()}: {post['title'][:50]}")
                    print(f"   Antes: {old_image[:70]}...")
                    print(f"   Depois: {new_image[:70]}...")
                    print()

                    updated += 1
                else:
                    print(f"⚠️  {item_type.upper()} ainda usa Unsplash: {post['title'][:50]}")
                    skipped_still_unsplash += 1

            elif response.status_code == 404:
                print(f"❌ {item_type.upper()} não encontrado: {post['title'][:50]}")
                errors += 1

            else:
                print(f"❌ Erro HTTP {response.status_code}: {post['title'][:50]}")
                errors += 1

        except requests.exceptions.Timeout:
            print(f"⏱️  Timeout: {post['title'][:50]}")
            errors += 1

        except Exception as e:
            print(f"❌ Erro: {post['title'][:50]} - {e}")
            errors += 1

    # Salvar alterações (se não for dry-run)
    if not dry_run and updated > 0:
        with open(blog_posts_path, 'w', encoding='utf-8') as f:
            json.dump(posts, f, indent=2, ensure_ascii=False)
        print("💾 Arquivo blog-posts.json atualizado!")
        print()

    # Relatório final
    print("=" * 80)
    print("📊 RELATÓRIO FINAL")
    print("=" * 80)
    print(f"✅ Imagens atualizadas: {updated}")
    print(f"⚠️  Produtos ainda com Unsplash: {skipped_still_unsplash}")
    print(f"❌ Erros: {errors}")
    print(f"⏭️  Posts não-produto pulados: {skipped_not_product}")
    print()

    if updated > 0:
        if dry_run:
            print("ℹ️  Este foi um DRY RUN. Execute sem --dry-run para aplicar as mudanças.")
        else:
            print("🚀 Próximo passo: Fazer build e testar")
            print("   npm run build")
            print()
            print("   Depois, fazer commit:")
            print("   git add src/data/blog-posts.json")
            print('   git commit -m "feat(blog): Substituir imagens Unsplash por fotos reais"')
    else:
        print("ℹ️  Nenhuma atualização disponível no momento.")
        print("   Os produtos no backend ainda usam imagens Unsplash.")
        print()
        print("📸 Consulte IMAGE_REPLACEMENT_PLAN.md para próximos passos")

    print("=" * 80)

if __name__ == "__main__":
    dry_run = '--dry-run' in sys.argv

    if dry_run:
        print("🔍 Executando em modo DRY RUN (sem salvar alterações)")
        print()

    update_blog_images(dry_run=dry_run)
