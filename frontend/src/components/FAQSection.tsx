'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ } from '@/data/blog-faqs';

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Primeira pergunta aberta por padrão

  if (!faqs || faqs.length === 0) return null;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-12 bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-vibrant rounded-xl flex items-center justify-center">
          <span className="text-2xl">❓</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Perguntas Frequentes
          </h2>
          <p className="text-gray-600 text-sm">
            Respostas rápidas às dúvidas mais comuns
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-primary/30 transition-all"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-gray-900 pr-4">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4 pt-2">
                <div className="text-gray-700 leading-relaxed border-l-4 border-primary/30 pl-4 bg-primary/5 py-3 rounded-r">
                  {faq.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Não encontrou sua resposta?{' '}
          <a
            href="/contato"
            className="text-primary hover:text-primary-vibrant font-medium underline"
          >
            Entre em contato conosco
          </a>
        </p>
      </div>
    </section>
  );
}
