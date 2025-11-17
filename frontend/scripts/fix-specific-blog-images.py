#!/usr/bin/env python3
import json
import sys

def main():
    # Carregar posts
    with open('../src/data/blog-posts.json', 'r', encoding='utf-8') as f:
        posts = json.load(f)

    fixes_made = []

    # 1. Corrigir imagem do post cannabis-sativa
    for post in posts:
        if post['slug'] == 'cannabis-sativa':
            print(f"Found cannabis-sativa post with image: {post.get('imageUrl', 'NO IMAGE')[:100]}")
            old_image = post.get('imageUrl', '')
            # Trocar para uma imagem apropriada de cannabis
            post['imageUrl'] = 'https://images.unsplash.com/photo-1503262028195-93c528f03218?w=800&h=600'
            fixes_made.append(f"Fixed cannabis-sativa image (was: {old_image[:50]}...)")

    # 2. Encontrar posts de marca sem imagem
    brand_keywords = ['marca', 'brand', 'premium', 'qualidade', 'produto']

    for post in posts:
        title_lower = post['title'].lower()
        # Verificar se é um post sobre marcas
        if any(keyword in title_lower for keyword in brand_keywords):
            # Verificar se não tem imagem ou tem placeholder/trash
            if not post.get('imageUrl') or 'trash' in post.get('imageUrl', '').lower():
                print(f"Brand post without proper image: {post['title']}")

                # Definir imagem baseada no conteúdo
                if 'premium' in title_lower:
                    post['imageUrl'] = 'https://images.unsplash.com/photo-1606318313647-137d1f3b4d3c?w=800&h=600'
                elif 'qualidade' in title_lower:
                    post['imageUrl'] = 'https://images.unsplash.com/photo-1536819114556-1e10f967fb61?w=800&h=600'
                elif 'cbd' in title_lower:
                    post['imageUrl'] = 'https://images.unsplash.com/photo-1616671276441-2a2c019815c5?w=800&h=600'
                else:
                    # Imagem genérica de produtos cannabis
                    post['imageUrl'] = 'https://images.unsplash.com/photo-1612198273689-b437f53152ca?w=800&h=600'

                fixes_made.append(f"Added image to brand post: {post['title']}")

    # 3. Verificar posts específicos que podem ter problemas
    problem_slugs = [
        'melhores-marcas-cbd-brasil',
        'marcas-confiáveis-cbd',
        'como-identificar-cbd-qualidade',
        'certificações-produtos-cannabis'
    ]

    for post in posts:
        if post['slug'] in problem_slugs:
            if not post.get('imageUrl') or len(post.get('imageUrl', '')) < 10:
                print(f"Fixing missing image for: {post['slug']}")
                # Atribuir imagem apropriada
                if 'melhores-marcas' in post['slug']:
                    post['imageUrl'] = 'https://images.unsplash.com/photo-1603909768906-946dffd99f01?w=800&h=600'
                elif 'confiáveis' in post['slug']:
                    post['imageUrl'] = 'https://images.unsplash.com/photo-1612198790700-0e6b44ce4ba7?w=800&h=600'
                elif 'qualidade' in post['slug']:
                    post['imageUrl'] = 'https://images.unsplash.com/photo-1584269600464-37b1b21a8b93?w=800&h=600'
                elif 'certificações' in post['slug']:
                    post['imageUrl'] = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600'

                fixes_made.append(f"Fixed image for: {post['slug']}")

    # Salvar alterações
    with open('../src/data/blog-posts.json', 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Total fixes made: {len(fixes_made)}")
    for fix in fixes_made:
        print(f"  - {fix}")

if __name__ == '__main__':
    main()