import { Metadata } from 'next';
import { ReactNode } from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.americacannabis.com';

export const metadata: Metadata = {
  title: 'Blog Cannabis | Guias, Notícias e Educação',
  description: 'Artigos completos sobre cannabis medicinal, CBD, benefícios terapêuticos, legislação brasileira, guias práticos e últimas notícias do mercado de cannabis.',
  keywords: [
    'blog cannabis',
    'artigos cbd',
    'cannabis medicinal brasil',
    'guia cannabis iniciantes',
    'notícias cannabis',
    'legislação cannabis brasil',
    'benefícios cbd',
    'como usar cbd',
    'tratamento cannabis',
    'estudos cannabis'
  ],
  openGraph: {
    title: 'Blog Cannabis | Educação e Guias Completos',
    description: 'Aprenda tudo sobre cannabis medicinal, CBD e bem-estar com artigos escritos por especialistas.',
    type: 'website',
    url: `${SITE_URL}/blog`,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Blog America Cannabis',
      },
    ],
    locale: 'pt_BR',
    siteName: 'America Cannabis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Cannabis | Guias e Educação',
    description: 'Artigos completos sobre cannabis medicinal e CBD',
    images: [`${SITE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
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

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
