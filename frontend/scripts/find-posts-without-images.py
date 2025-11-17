#!/usr/bin/env python3
import json

def main():
    # Carregar posts
    with open('../src/data/blog-posts.json', 'r', encoding='utf-8') as f:
        posts = json.load(f)

    posts_without_images = []
    posts_with_trash = []
    brand_posts = []

    for post in posts:
        # Check if no image
        if not post.get('imageUrl') or len(post.get('imageUrl', '')) < 10:
            posts_without_images.append(post)

        # Check if trash/garbage image
        elif 'trash' in post.get('imageUrl', '').lower() or 'garbage' in post.get('imageUrl', '').lower() or '1530587191325' in post.get('imageUrl', ''):
            posts_with_trash.append(post)

        # Check if brand/marca post
        title_lower = post['title'].lower()
        if 'marca' in title_lower or 'brand' in title_lower:
            brand_posts.append(post)

    print(f"Posts without images: {len(posts_without_images)}")
    for post in posts_without_images[:10]:  # Show first 10
        print(f"  - {post['slug']}: {post['title']}")

    print(f"\nPosts with trash/garbage images: {len(posts_with_trash)}")
    for post in posts_with_trash:
        print(f"  - {post['slug']}: {post.get('imageUrl', '')[:100]}")

    print(f"\nBrand/Marca posts: {len(brand_posts)}")
    for post in brand_posts:
        has_image = "✓" if post.get('imageUrl') and len(post.get('imageUrl', '')) > 10 else "✗"
        print(f"  [{has_image}] {post['slug']}: {post['title']}")
        if not post.get('imageUrl') or len(post.get('imageUrl', '')) < 10:
            print(f"      -> NO IMAGE!")

if __name__ == '__main__':
    main()