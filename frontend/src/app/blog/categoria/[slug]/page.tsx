import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import BlogCard from '@/components/BlogCard';
import { BlogPost, blogCategories } from '@/lib/blog-types';
import blogPostsData from '@/data/blog-posts.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.americacannabis.com';

interface PageProps {
  params: { slug: string };
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = blogCategories.find(c => c.slug === params.slug);

  if (!category) {
    return {
      title: 'Categoria não encontrada | America Cannabis',
      description: 'A categoria que você procura não foi encontrada.'
    };
  }

  const title = `${category.name} - Blog America Cannabis`;
  const description = `${category.description}. Artigos, guias e análises sobre ${category.name.toLowerCase()}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/blog/categoria/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// Generate static params
export async function generateStaticParams() {
  return blogCategories.map(category => ({
    slug: category.slug,
  }));
}

export const revalidate = 3600; // Revalidate every hour

export default function CategoryPage({ params }: PageProps) {
  const category = blogCategories.find(c => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const posts = (blogPostsData as BlogPost[]).filter(
    post => post.category.slug === params.slug
  );

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: category.name, href: `/blog/categoria/${params.slug}` },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Header */}
          <div className="mb-12 text-center">
            <div className="inline-block mb-4">
              <span
                className="px-4 py-2 rounded-full text-white font-bold text-sm"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {category.description}
            </p>
            <div className="mt-6 text-gray-500">
              {posts.length} {posts.length === 1 ? 'artigo' : 'artigos'}
            </div>
          </div>

          {/* Articles Grid */}
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nenhum artigo encontrado nesta categoria.
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Quer aprender mais sobre cannabis?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Explore todas as nossas categorias e descubra artigos que podem te ajudar.
            </p>
            <a
              href="/blog"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Ver Todos os Artigos
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
