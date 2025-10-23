'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';
import { TestimonialIcon, TagIcon, ClockIcon, VerifiedIcon } from '@/components/icons/Icons';

interface Testimonial {
  id: string;
  comment?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  customerName?: string;
  customerCity?: string;
  productName?: string;
  usageDuration?: string;
  resultType?: string;
  isFeatured: boolean;
  showOnHome: boolean;
  createdAt: string;
}

export default function DefaultReviewsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await api.get('/api/default-reviews?tenantId=0fb61585-3cb3-48b3-ae76-0a5358084a8c&isActive=true');
      // Filtrar apenas os que devem aparecer na home
      const homeTestimonials = response.data.filter((t: Testimonial) => t.showOnHome);
      // Ordenar por destaque primeiro
      homeTestimonials.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      setTestimonials(homeTestimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll effect - da direita para esquerda
  useEffect(() => {
    if (testimonials.length === 0) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const scrollSpeed = 1; // pixels per frame
    const cardWidth = 350; // largura aproximada do card + gap

    const scroll = () => {
      scrollAmount += scrollSpeed;
      container.scrollLeft = scrollAmount;

      // Quando chegar no meio (duplicados), volta pro início
      const maxScroll = container.scrollWidth / 2;
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
        container.scrollLeft = 0;
      }
    };

    const intervalId = setInterval(scroll, 30); // ~33fps

    // Pausar scroll ao passar o mouse
    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeave = () => {
      const newIntervalId = setInterval(scroll, 30);
      return () => clearInterval(newIntervalId);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [testimonials]);

  if (loading || testimonials.length === 0) {
    return null;
  }

  // Duplicar os depoimentos para criar efeito infinito
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <TestimonialIcon className="text-primary" size={36} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Depoimentos de Clientes
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Veja o que nossos clientes dizem sobre nossos produtos
          </p>
        </div>

        {/* Carrossel Horizontal */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-[300px] md:w-[350px] group"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
                {/* Media Display */}
                {testimonial.mediaUrl && (
                  <div className="relative w-full">
                    {testimonial.mediaType === 'video' ? (
                      <div className="relative bg-black h-[400px]">
                        <video
                          src={testimonial.mediaUrl}
                          controls
                          className="w-full h-full object-contain"
                          playsInline
                        />
                      </div>
                    ) : (
                      <div className="relative h-[400px] bg-gradient-to-br from-primary/5 to-secondary/5">
                        <Image
                          src={testimonial.mediaUrl}
                          alt="Depoimento"
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                    )}

                    {/* Context Overlays */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Top-left: Product Info */}
                      {testimonial.productName && (
                        <div className="absolute top-3 left-3">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                            <TagIcon className="text-primary" size={14} />
                            <span className="text-xs font-semibold text-gray-800">{testimonial.productName}</span>
                          </div>
                        </div>
                      )}

                      {/* Top-right: Featured + Result Type */}
                      <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                        {testimonial.isFeatured && (
                          <div className="px-3 py-1.5 bg-yellow-100/90 backdrop-blur-sm text-yellow-800 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                            <VerifiedIcon size={12} />
                            <span>Destaque</span>
                          </div>
                        )}
                        {testimonial.resultType && (
                          <div className="px-3 py-1.5 bg-green-100/90 backdrop-blur-sm text-green-800 rounded-full text-xs font-semibold shadow-lg">
                            {testimonial.resultType}
                          </div>
                        )}
                      </div>

                      {/* Bottom: Customer Info + Usage Duration */}
                      <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-2">
                        {/* Customer Info */}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                          <div className="flex items-center gap-1.5 text-xs">
                            {testimonial.customerName && (
                              <span className="font-semibold text-gray-800">{testimonial.customerName}</span>
                            )}
                            {testimonial.customerName && testimonial.customerCity && (
                              <span className="text-gray-400">•</span>
                            )}
                            {testimonial.customerCity && (
                              <span className="text-gray-600">{testimonial.customerCity}</span>
                            )}
                            {!testimonial.customerName && !testimonial.customerCity && (
                              <span className="font-semibold text-gray-800">Cliente Verificado</span>
                            )}
                          </div>
                        </div>

                        {/* Usage Duration */}
                        {testimonial.usageDuration && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-white rounded-full shadow-lg w-fit">
                            <ClockIcon className="text-white" size={14} />
                            <span className="text-xs font-semibold">{testimonial.usageDuration}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/depoimentos"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors group"
          >
            <span>Ver todos os {testimonials.length} depoimentos</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
