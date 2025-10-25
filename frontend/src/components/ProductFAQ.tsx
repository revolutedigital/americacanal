'use client';

import { useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  faqs: FAQItem[];
}

export default function ProductFAQ({ faqs }: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mt-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        ❓ Perguntas Frequentes
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden transition-all hover:border-primary/50"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900 pr-4">
                {faq.question}
              </h3>
              <svg
                className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openIndex === index && (
              <div className="p-5 bg-white border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 p-6 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg border border-accent/20">
        <p className="text-gray-700 mb-4">
          <strong>Ainda tem dúvidas?</strong> Nossa equipe está pronta para ajudar!
        </p>
        <a
          href="https://wa.me/595982574068?text=Ol%C3%A1!%20Tenho%20d%C3%BAvidas%20sobre%20os%20produtos"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Falar no WhatsApp
        </a>
      </div>
    </div>
  );
}
