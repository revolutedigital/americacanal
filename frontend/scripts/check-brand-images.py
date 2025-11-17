#!/usr/bin/env python3
import json

def main():
    # Carregar posts
    with open('../src/data/blog-posts.json', 'r', encoding='utf-8') as f:
        posts = json.load(f)

    # Verificar posts de marca
    brand_posts = []

    for post in posts:
        title_lower = post['title'].lower()
        if 'marca' in title_lower or 'brand' in title_lower:
            image_url = post.get('imageUrl', '')
            print(f"\n{post['slug']}:")
            print(f"  Title: {post['title']}")
            print(f"  Image: {image_url[:100]}...")

            # Check for problematic images
            if 'trash' in image_url or 'garbage' in image_url or '1530587191325' in image_url:
                print(f"  ⚠️ PROBLEMATIC IMAGE!")
                brand_posts.append(post)
            elif not image_url or len(image_url) < 10:
                print(f"  ⚠️ NO IMAGE!")
                brand_posts.append(post)

    return brand_posts

if __name__ == '__main__':
    problematic = main()
    if problematic:
        print(f"\n\n❌ Found {len(problematic)} posts with problematic images")
    else:
        print(f"\n\n✅ All brand posts have proper images")