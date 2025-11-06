import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog-types';

interface RelatedBlogPostsProps {
  tags: string[];
  category?: string;
  maxPosts?: number;
}

export default async function RelatedBlogPosts({ tags, category, maxPosts = 3 }: RelatedBlogPostsProps) {
  // Carregar posts do JSON
  const blogPostsData = await import('@/data/blog-posts.json');
  const allPosts = blogPostsData.default as BlogPost[];

  // Filtrar posts relacionados por tags ou categoria
  const relatedPosts = allPosts
    .filter(post => {
      const hasMatchingTag = post.tags.some(tag =>
        tags.some(searchTag => tag.toLowerCase().includes(searchTag.toLowerCase()))
      );
      const hasMatchingCategory = category && post.category.slug === category;
      return hasMatchingTag || hasMatchingCategory;
    })
    .slice(0, maxPosts);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 mt-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        📚 Artigos Relacionados
      </h3>
      <p className="text-gray-600 mb-6">
        Aprenda mais sobre este tema em nosso blog educativo:
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map(post => {
          const formattedDate = new Date(post.publishedAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });

          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized={post.imageUrl.includes('unsplash.com') || post.imageUrl.includes('bigcommerce.com')}
                />
                <div className="absolute top-2 left-2">
                  <span
                    className="px-2 py-1 rounded-full text-white text-xs font-bold shadow-md"
                    style={{ backgroundColor: post.category.color }}
                  >
                    {post.category.name}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {post.title}
                </h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <time dateTime={post.publishedAt}>{formattedDate}</time>
                  <span>{post.readTime} min</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 hover:gap-3 transition-all"
        >
          Ver todos os artigos
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
