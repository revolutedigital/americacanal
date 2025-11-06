'use client';

import Script from 'next/script';

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-JLG38XGHEL';

export default function GoogleAnalytics() {
  if (!GA4_ID) return null;

  return (
    <>
      {/* Google Analytics GA4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}
