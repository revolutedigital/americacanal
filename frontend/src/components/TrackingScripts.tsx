'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

interface TrackingConfig {
  metaPixelId?: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
}

export default function TrackingScripts() {
  const [config, setConfig] = useState<TrackingConfig>({});
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fetch tracking configuration
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/tenant/config');
        if (response.ok) {
          const data = await response.json();
          setConfig({
            metaPixelId: data.metaPixelId,
            googleAnalyticsId: data.googleAnalyticsId,
            googleTagManagerId: data.googleTagManagerId,
          });
          setIsReady(true);
        }
      } catch (error) {
        console.error('Error fetching tracking config:', error);
      }
    };

    fetchConfig();
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (!isReady) return;

    const url = pathname + searchParams.toString();

    // Google Analytics PageView
    if (config.googleAnalyticsId && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', config.googleAnalyticsId, {
        page_path: url,
      });
    }

    // Meta Pixel PageView
    if (config.metaPixelId && typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }, [pathname, searchParams, isReady, config]);

  if (!isReady) return null;

  return (
    <>
      {/* Google Tag Manager */}
      {config.googleTagManagerId && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${config.googleTagManagerId}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${config.googleTagManagerId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* Google Analytics GA4 */}
      {config.googleAnalyticsId && !config.googleTagManagerId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${config.googleAnalyticsId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Meta Pixel (Facebook) */}
      {config.metaPixelId && !config.googleTagManagerId && (
        <>
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${config.metaPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${config.metaPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  );
}

// Helper functions to track e-commerce events
// Usage: import { trackAddToCart, trackPurchase } from '@/components/TrackingScripts';

export const trackAddToCart = (product: {
  id: string;
  name: string;
  price: number;
  category?: string;
}) => {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag('event', 'add_to_cart', {
      currency: 'BRL',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          item_category: product.category || 'Cannabis',
          quantity: 1,
        },
      ],
    });
  }

  // Meta Pixel
  if ((window as any).fbq) {
    (window as any).fbq('track', 'AddToCart', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: 'BRL',
    });
  }
};

export const trackPurchase = (order: {
  orderId: string;
  total: number;
  products: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    category?: string;
  }>;
}) => {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag('event', 'purchase', {
      transaction_id: order.orderId,
      value: order.total,
      currency: 'BRL',
      items: order.products.map((product) => ({
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category || 'Cannabis',
        quantity: product.quantity,
      })),
    });
  }

  // Meta Pixel
  if ((window as any).fbq) {
    (window as any).fbq('track', 'Purchase', {
      content_ids: order.products.map((p) => p.id),
      content_type: 'product',
      value: order.total,
      currency: 'BRL',
      num_items: order.products.reduce((acc, p) => acc + p.quantity, 0),
    });
  }
};

export const trackViewContent = (product: {
  id: string;
  name: string;
  price: number;
  category?: string;
}) => {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag('event', 'view_item', {
      currency: 'BRL',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          item_category: product.category || 'Cannabis',
        },
      ],
    });
  }

  // Meta Pixel
  if ((window as any).fbq) {
    (window as any).fbq('track', 'ViewContent', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: 'BRL',
    });
  }
};

export const trackInitiateCheckout = (cart: {
  total: number;
  products: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}) => {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag('event', 'begin_checkout', {
      currency: 'BRL',
      value: cart.total,
      items: cart.products.map((product) => ({
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: product.quantity,
      })),
    });
  }

  // Meta Pixel
  if ((window as any).fbq) {
    (window as any).fbq('track', 'InitiateCheckout', {
      content_ids: cart.products.map((p) => p.id),
      content_type: 'product',
      value: cart.total,
      currency: 'BRL',
      num_items: cart.products.reduce((acc, p) => acc + p.quantity, 0),
    });
  }
};
