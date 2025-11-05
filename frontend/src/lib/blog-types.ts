export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: BlogAuthor;
  category: BlogCategory;
  tags: string[];
  imageUrl: string;
  readTime: number; // em minutos
  publishedAt: string;
  updatedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  relatedPosts?: string[]; // IDs de posts relacionados
  internalLinks?: InternalLink[];
  featured?: boolean;
}

export interface BlogAuthor {
  id: string;
  name: string;
  bio: string;
  avatar?: string;
  role: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color?: string;
}

export interface InternalLink {
  text: string;
  url: string;
  type: 'product' | 'category' | 'blog' | 'page';
}

export const blogCategories: BlogCategory[] = [
  {
    id: 'guia-iniciante',
    name: 'Guia do Iniciante',
    slug: 'guia-iniciante',
    description: 'Guias completos para quem está começando no mundo da cannabis',
    color: '#10b981'
  },
  {
    id: 'saude-bem-estar',
    name: 'Saúde & Bem-Estar',
    slug: 'saude-bem-estar',
    description: 'Benefícios medicinais e terapêuticos da cannabis',
    color: '#3b82f6'
  },
  {
    id: 'produtos',
    name: 'Produtos & Reviews',
    slug: 'produtos',
    description: 'Análises detalhadas de produtos e marcas',
    color: '#8b5cf6'
  },
  {
    id: 'legislacao',
    name: 'Legislação & Regulamentação',
    slug: 'legislacao',
    description: 'Leis, regulamentos e novidades legais sobre cannabis',
    color: '#ef4444'
  },
  {
    id: 'ciencia',
    name: 'Ciência & Pesquisa',
    slug: 'ciencia',
    description: 'Estudos científicos e pesquisas sobre cannabis',
    color: '#f59e0b'
  },
  {
    id: 'cultivo',
    name: 'Cultivo & Produção',
    slug: 'cultivo',
    description: 'Técnicas de cultivo e produção de cannabis',
    color: '#06b6d4'
  }
];

export const defaultAuthor: BlogAuthor = {
  id: 'america-cannabis',
  name: 'Equipe America Cannabis',
  bio: 'Especialistas em cannabis medicinal com anos de experiência no mercado brasileiro. Comprometidos em educar e informar sobre o uso responsável e terapêutico da cannabis.',
  avatar: '/logo.svg',
  role: 'Especialista em Cannabis',
  social: {
    instagram: '@americacannabis',
    twitter: '@americacannabis'
  }
};
