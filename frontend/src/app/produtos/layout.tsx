import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Produtos Premium de Cannabis | Catálogo Completo',
  description: 'Explore nosso catálogo completo com mais de 50 produtos premium de cannabis. Óleos CBD, flores, concentrados e acessórios de alta qualidade. Certificação GMP, COA garantido e entrega rápida em todo Brasil.',
  keywords: [
    'produtos cannabis',
    'comprar cbd',
    'óleo cbd',
    'flores cannabis',
    'produtos premium cannabis',
    'cbd brasil',
    'cannabis medicinal',
    'concentrados cannabis',
    'acessórios cannabis',
    'loja cannabis online'
  ],
  openGraph: {
    title: 'Produtos Premium de Cannabis | America Cannabis',
    description: 'Catálogo completo com +50 produtos de cannabis certificados. Qualidade GMP, entrega rápida e segura.',
    type: 'website',
    url: 'https://frontend-production1.up.railway.app/produtos',
    images: [
      {
        url: 'https://frontend-production1.up.railway.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'America Cannabis - Produtos Premium',
      },
    ],
    locale: 'pt_BR',
    siteName: 'America Cannabis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Produtos Premium de Cannabis | America Cannabis',
    description: 'Catálogo completo com +50 produtos certificados de cannabis.',
    images: ['https://frontend-production1.up.railway.app/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://frontend-production1.up.railway.app/produtos',
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

export default function ProdutosLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
