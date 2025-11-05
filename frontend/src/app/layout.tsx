import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CustomerAuthProvider } from "@/hooks/useCustomerAuth";
import { WishlistProvider } from "@/hooks/useWishlist";
import { ToastProvider } from "@/contexts/ToastContext";
import StickyWhatsAppButton from "@/components/StickyWhatsAppButton";
import ToastContainer from "@/components/ToastContainer";
import WebVitals from "@/components/WebVitals";
import SkipLink from "@/components/SkipLink";
import TrackingScripts from "@/components/TrackingScripts";

// Removido force-dynamic para melhorar performance via ISR/SSG
// Páginas específicas que precisam de dados dinâmicos devem declarar revalidate individualmente
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.americacannabis.com';
const siteName = 'America Cannabis';
const siteDescription = 'Produtos de cannabis premium de alta qualidade. CBD Oil, Hemp Flowers, extratos e muito mais. Entrega em todo Brasil com certificados de qualidade.';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#10b981',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Produtos Premium de Cannabis`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'cannabis',
    'CBD',
    'hemp',
    'óleo CBD',
    'produtos cannabis',
    'cannabis medicinal',
    'flores hemp',
    'extratos cannabis',
    'CBD Brasil',
    'canabidiol',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
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
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} - Produtos Premium de Cannabis`,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteName} - Produtos Premium`,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - Produtos Premium de Cannabis`,
    description: siteDescription,
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@americacannabis',
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
};

// Schema.org JSON-LD para Organization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: siteDescription,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+595-98-257-4068',
    contactType: 'customer service',
    availableLanguage: ['Portuguese', 'Spanish', 'English'],
  },
};

// Schema.org JSON-LD para WebSite
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/produtos?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <SkipLink />
        <WebVitals />
        <TrackingScripts />
        <ToastProvider>
          <CustomerAuthProvider>
            <WishlistProvider>
              {children}
              <StickyWhatsAppButton />
              <ToastContainer />
            </WishlistProvider>
          </CustomerAuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
