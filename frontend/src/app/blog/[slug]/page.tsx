import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BlogHeader from '@/components/BlogHeader';
import BlogFooter from '@/components/BlogFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import BlogCard from '@/components/BlogCard';
import FAQSchema from '@/components/FAQSchema';
import FAQSection from '@/components/FAQSection';
import { BlogPost } from '@/lib/blog-types';
import { generateBlogPostingSchema, generateAuthorSchema, generateBlogBreadcrumbSchema } from '@/lib/blog-schema';
import blogPostsData from '@/data/blog-posts.json';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.americacannabis.com';

interface PageProps {
  params: { slug: string };
}

// Gerar metadata dinâmica
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = (blogPostsData as BlogPost[]).find(p => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Artigo não encontrado | America Cannabis',
      description: 'O artigo que você procura não foi encontrado.'
    };
  }

  const title = post.metaTitle || `${post.title} | Blog America Cannabis`;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/blog/${post.slug}`,
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      section: post.category.name,
      tags: post.tags,
      locale: 'pt_BR',
      siteName: 'America Cannabis',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.imageUrl],
      creator: post.author.social?.twitter,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Gerar paths estáticos
export async function generateStaticParams() {
  return (blogPostsData as BlogPost[]).map(post => ({
    slug: post.slug,
  }));
}

export const revalidate = 3600; // Revalidar a cada 1 hora

export default function BlogPostPage({ params }: PageProps) {
  const post = (blogPostsData as BlogPost[]).find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Posts relacionados
  const relatedPosts = (blogPostsData as BlogPost[])
    .filter(p => post.relatedPosts?.includes(p.id))
    .slice(0, 3);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const blogPostingSchema = generateBlogPostingSchema(post);
  const authorSchema = generateAuthorSchema(post.author);
  const breadcrumbSchema = generateBlogBreadcrumbSchema(post);

  // Processar conteúdo HTML com internal links
  let processedContent = post.content;
  if (post.internalLinks) {
    post.internalLinks.forEach(link => {
      const linkHtml = `<a href="${link.url}" class="text-green-600 font-semibold hover:underline">${link.text}</a>`;
      processedContent = processedContent.replace(link.text, linkHtml);
    });
  }

  // Usar FAQs editáveis do post (gerenciados no admin)
  const faqs = post.faqs && post.faqs.length > 0 ? post.faqs : null;

  return (
    <>
      <Script
        id="blog-posting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <Script
        id="author-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqs && <FAQSchema faqs={faqs} />}

      <BlogHeader />

      <main className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: post.category.name, href: `/blog?categoria=${post.category.slug}` },
                { label: post.title, href: `/blog/${post.slug}` },
              ]}
            />
          </div>
        </div>

        {/* Artigo */}
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span
                className="inline-block px-4 py-2 rounded-full text-white text-sm font-bold"
                style={{ backgroundColor: post.category.color }}
              >
                {post.category.name}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-gray-700 mb-6">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <Image
                src={post.author.avatar || '/logo.svg'}
                alt={post.author.name}
                width={56}
                height={56}
                className="rounded-full"
              />
              <div>
                <div className="font-bold text-gray-900">{post.author.name}</div>
                <div className="text-sm text-gray-600">{post.author.role}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-t border-b border-gray-200 py-4">
              <time dateTime={post.publishedAt}>
                📅 {formattedDate}
              </time>
              <span>•</span>
              <span>⏱️ {post.readTime} minutos de leitura</span>
              {post.updatedAt && (
                <>
                  <span>•</span>
                  <span>
                    Atualizado em {new Date(post.updatedAt).toLocaleDateString('pt-BR')}
                  </span>
                </>
              )}
            </div>
          </header>

          {/* Imagem destaque */}
          <div className="mb-12 rounded-2xl overflow-hidden relative aspect-video">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
              unoptimized={post.imageUrl.includes('unsplash.com') || post.imageUrl.includes('bigcommerce.com')}
            />
          </div>

          {/* Conteúdo */}
          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: processedContent }}
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.75',
            }}
          />

          {/* Tags */}
          <div className="mb-12 pb-8 border-b">
            <h3 className="text-sm font-bold text-gray-600 mb-3">TAGS:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-green-100 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Autor */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-6">
              <Image
                src={post.author.avatar || '/logo.svg'}
                alt={post.author.name}
                width={80}
                height={80}
                className="rounded-full flex-shrink-0"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {post.author.name}
                </h3>
                <p className="text-gray-700 mb-4">{post.author.bio}</p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          {faqs && <FAQSection faqs={faqs} />}

          {/* Posts Relacionados */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                📚 Artigos Relacionados
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <BlogFooter />
    </>
  );
}
