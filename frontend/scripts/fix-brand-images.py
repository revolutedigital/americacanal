#!/usr/bin/env python3
import json

def main():
    # Carregar posts
    with open('../src/data/blog-posts.json', 'r', encoding='utf-8') as f:
        posts = json.load(f)

    # Imagens variadas e apropriadas para posts de marcas de cannabis
    brand_images = [
        'https://images.unsplash.com/photo-1616671276441-2a2c019815c5?w=1200&h=630&fit=crop',  # CBD products
        'https://images.unsplash.com/photo-1603909768906-946dffd99f01?w=1200&h=630&fit=crop',  # Cannabis oil
        'https://images.unsplash.com/photo-1612198790700-0e6b44ce4ba7?w=1200&h=630&fit=crop',  # CBD bottle
        'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&h=630&fit=crop',  # Medical cannabis
        'https://images.unsplash.com/photo-1536819114556-1e10f967fb61?w=1200&h=630&fit=crop',  # Cannabis research
        'https://images.unsplash.com/photo-1606318313647-137d1f3b4d3c?w=1200&h=630&fit=crop',  # Premium products
        'https://images.unsplash.com/photo-1584269600464-37b1b21a8b93?w=1200&h=630&fit=crop',  # Quality control
        'https://images.unsplash.com/photo-1612198273689-b437f53152ca?w=1200&h=630&fit=crop',  # Cannabis products
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop',  # Business/certificates
        'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=1200&h=630&fit=crop',  # Cannabis plant close
        'https://images.unsplash.com/photo-1509868918748-a554ad25f858?w=1200&h=630&fit=crop',  # Medical research
        'https://images.unsplash.com/photo-1612197530253-aaf3e7c94b5a?w=1200&h=630&fit=crop',  # CBD products line
        'https://images.unsplash.com/photo-1597403491447-3ab08f8e44dc?w=1200&h=630&fit=crop',  # Cannabis medicine
        'https://images.unsplash.com/photo-1612671120558-ad3faf36dc4f?w=1200&h=630&fit=crop',  # Modern cannabis
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=630&fit=crop',  # Healthcare cannabis
        'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=1200&h=630&fit=crop',  # Lab research
        'https://images.unsplash.com/photo-1587049016823-69ef9d68bd44?w=1200&h=630&fit=crop',  # Professional analysis
        'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=630&fit=crop',  # Cannabis products display
        'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&h=630&fit=crop',  # Natural products
        'https://images.unsplash.com/photo-1593165104811-2e631a7a0519?w=1200&h=630&fit=crop',  # Cannabis cultivation
    ]

    fixes_made = []
    image_index = 0

    for post in posts:
        # Check if it's a brand post
        if post['slug'].startswith('marca-'):
            old_image = post.get('imageUrl', '')
            # Assign a unique image from our list
            post['imageUrl'] = brand_images[image_index % len(brand_images)]
            image_index += 1
            fixes_made.append(f"Fixed {post['slug']} image")
            print(f"✓ {post['slug']}: {post['imageUrl']}")

    # Salvar alterações
    with open('../src/data/blog-posts.json', 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Total brand posts fixed: {len(fixes_made)}")

if __name__ == '__main__':
    main()