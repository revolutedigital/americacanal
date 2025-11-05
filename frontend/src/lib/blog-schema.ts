import { BlogPost, BlogAuthor } from './blog-types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.americacannabis.com';

export function generateBlogPostingSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl,
    author: {
      '@type': 'Person',
      name: post.author.name,
      description: post.author.bio,
      ...(post.author.avatar && { image: post.author.avatar }),
      ...(post.author.social?.twitter && {
        sameAs: [`https://twitter.com/${post.author.social.twitter.replace('@', '')}`]
      })
    },
    publisher: {
      '@type': 'Organization',
      name: 'America Cannabis',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`
      }
    },
    datePublished: post.publishedAt,
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`
    },
    articleSection: post.category.name,
    keywords: post.tags.join(', '),
    wordCount: Math.ceil(post.content.split(' ').length),
    timeRequired: `PT${post.readTime}M`,
    inLanguage: 'pt-BR'
  };
}

export function generateAuthorSchema(author: BlogAuthor) {
  const sameAs = [];

  if (author.social?.twitter) {
    sameAs.push(`https://twitter.com/${author.social.twitter.replace('@', '')}`);
  }
  if (author.social?.linkedin) {
    sameAs.push(`https://linkedin.com/in/${author.social.linkedin}`);
  }
  if (author.social?.instagram) {
    sameAs.push(`https://instagram.com/${author.social.instagram.replace('@', '')}`);
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    description: author.bio,
    jobTitle: author.role,
    ...(author.avatar && { image: author.avatar }),
    ...(sameAs.length > 0 && { sameAs })
  };
}

export function generateBlogBreadcrumbSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.category.name,
        item: `${SITE_URL}/blog/categoria/${post.category.slug}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`
      }
    ]
  };
}

export function generateBlogListSchema(posts: BlogPost[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog America Cannabis',
    description: 'Artigos, guias e notícias sobre cannabis medicinal, CBD e bem-estar',
    url: `${SITE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'America Cannabis',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`
      }
    },
    blogPost: posts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author.name
      }
    }))
  };
}
