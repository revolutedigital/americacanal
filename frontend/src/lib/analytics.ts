// Web Vitals Monitoring
// Reportar métricas Core Web Vitals para Google Analytics

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType: string;
}

export function sendToGoogleAnalytics({ name, value, id }: WebVitalsMetric) {
  // Enviar para Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      value: Math.round(name === 'CLS' ? value * 1000 : value), // CLS em milisegundos
      event_label: id,
      non_interaction: true,
    });
  }

  // Log em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', {
      metric: name,
      value: Math.round(value),
      rating: getRating(name, value),
    });
  }
}

export function sendToVercelAnalytics(metric: WebVitalsMetric) {
  // Vercel Analytics (se disponível)
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    const body = JSON.stringify({
      dsn: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
      id: metric.id,
      page: window.location.pathname,
      href: window.location.href,
      event_name: metric.name,
      value: metric.value.toString(),
      speed: getConnectionSpeed(),
    });

    // Usar sendBeacon se disponível (mais confiável)
    if (navigator.sendBeacon) {
      navigator.sendBeacon('https://vitals.vercel-analytics.com/v1/vitals', body);
    }
  }
}

export function getRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  switch (metric) {
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    case 'FID':
      return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
    case 'FCP':
      return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
    case 'TTFB':
      return value <= 600 ? 'good' : value <= 1500 ? 'needs-improvement' : 'poor';
    case 'INP':
      return value <= 200 ? 'good' : value <= 500 ? 'needs-improvement' : 'poor';
    default:
      return 'good';
  }
}

function getConnectionSpeed(): string {
  if (typeof window === 'undefined') return 'unknown';

  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

  if (connection && connection.effectiveType) {
    return connection.effectiveType;
  }

  return 'unknown';
}

// Event Tracking
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event]', eventName, params);
  }
}

// Page View Tracking
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX', {
      page_path: url,
    });
  }
}

// E-commerce Tracking
export function trackProductView(product: {
  id: string;
  name: string;
  price: number;
  category?: string;
  brand?: string;
}) {
  trackEvent('view_item', {
    currency: 'BRL',
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        item_brand: product.brand,
      },
    ],
  });
}

export function trackAddToCart(product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}) {
  trackEvent('add_to_cart', {
    currency: 'BRL',
    value: product.price * product.quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: product.quantity,
      },
    ],
  });
}

export function trackBeginCheckout(products: Array<{
  id: string;
  name: string;
  price: number;
  quantity: number;
}>) {
  const value = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  trackEvent('begin_checkout', {
    currency: 'BRL',
    value,
    items: products.map((p) => ({
      item_id: p.id,
      item_name: p.name,
      price: p.price,
      quantity: p.quantity,
    })),
  });
}

export function trackPurchase(
  orderId: string,
  products: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>,
  total: number
) {
  trackEvent('purchase', {
    transaction_id: orderId,
    currency: 'BRL',
    value: total,
    items: products.map((p) => ({
      item_id: p.id,
      item_name: p.name,
      price: p.price,
      quantity: p.quantity,
    })),
  });
}

// Search Tracking
export function trackSearch(searchQuery: string) {
  trackEvent('search', {
    search_term: searchQuery,
  });
}

// Error Tracking
export function trackError(error: Error, context?: string) {
  trackEvent('exception', {
    description: error.message,
    fatal: false,
    context,
  });
}
