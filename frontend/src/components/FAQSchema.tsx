import { FAQ } from '@/data/blog-faqs';

interface FAQSchemaProps {
  faqs: FAQ[];
}

/**
 * Componente que gera FAQ Schema (JSON-LD) para rich snippets do Google
 * https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */
export default function FAQSchema({ faqs }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
