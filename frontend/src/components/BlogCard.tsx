import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog-types';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* Imagem */}
          <div className="relative h-64 md:h-full overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              unoptimized={post.imageUrl.includes('unsplash.com') || post.imageUrl.includes('bigcommerce.com')}
            />
            <div className="absolute top-4 left-4">
              <span
                className="px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg"
                style={{ backgroundColor: post.category.color }}
              >
                {post.category.name}
              </span>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
              <time dateTime={post.publishedAt}>{formattedDate}</time>
              <span>•</span>
              <span>{post.readTime} min de leitura</span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
              {post.title}
            </h2>

            <p className="text-gray-700 mb-6 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3">
              <Image
                src={post.author.avatar || '/logo.svg'}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-medium text-gray-900">{post.author.name}</div>
                <div className="text-sm text-gray-600">{post.author.role}</div>
              </div>
            </div>

            <div className="mt-6">
              <span className="text-green-600 font-semibold group-hover:gap-3 inline-flex items-center gap-2 transition-all">
                Ler artigo completo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Imagem */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          unoptimized={post.imageUrl.includes('unsplash.com') || post.imageUrl.includes('bigcommerce.com')}
        />
        <div className="absolute top-3 left-3">
          <span
            className="px-3 py-1 rounded-full text-white text-xs font-bold shadow-md"
            style={{ backgroundColor: post.category.color }}
          >
            {post.category.name}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
          <time dateTime={post.publishedAt}>{formattedDate}</time>
          <span>•</span>
          <span>{post.readTime} min</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2">
          <Image
            src={post.author.avatar || '/logo.svg'}
            alt={post.author.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="text-sm">
            <div className="font-medium text-gray-900">{post.author.name}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
