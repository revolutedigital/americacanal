'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import Image from 'next/image';
import { TestimonialIcon, StarIcon } from '@/components/icons/Icons';

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
  createdAt: string;
}

export default function DepoimentosPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        '/api/default-reviews/featured?tenantId=0fb61585-3cb3-48b3-ae76-0a5358084a8c'
      );
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary via-secondary to-primary-dark text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TestimonialIcon className="text-white" size={48} />
              <h1 className="text-4xl md:text-5xl font-bold">
                Depoimentos dos Nossos Clientes
              </h1>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Veja o que nossos clientes dizem sobre nossos produtos de laboratório com tecnologia GMP
            </p>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="container mx-auto px-4 py-16">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">💬</div>
              <p className="text-gray-600 text-2xl font-bold">
                Nenhum depoimento disponível no momento
              </p>
              <p className="text-gray-500 text-lg mt-2">
                Em breve teremos depoimentos de clientes satisfeitos!
              </p>
            </div>
          ) : (
            <>
              {/* Featured Testimonials (Destaque) */}
              {testimonials.filter((t) => t.isFeatured).length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <StarIcon className="text-primary" size={32} />
                    <h2 className="text-3xl font-bold text-gray-900">
                      Depoimentos em Destaque
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {testimonials
                      .filter((t) => t.isFeatured)
                      .slice(0, 4)
                      .map((testimonial) => (
                        <article
                          key={testimonial.id}
                          className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-accent hover:shadow-2xl transition-all duration-300"
                        >
                          {testimonial.mediaUrl && (
                            <div className="relative w-full bg-gray-100">
                              {testimonial.mediaType === 'video' ? (
                                <video
                                  src={testimonial.mediaUrl}
                                  controls
                                  className="w-full max-h-96 object-contain"
                                  playsInline
                                />
                              ) : (
                                <div className="relative w-full h-96">
                                  <Image
                                    src={testimonial.mediaUrl}
                                    alt="Depoimento"
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          <div className="p-6">
                            <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                              <span>Cliente Verificado</span>
                              {testimonial.mediaType === 'video' && (
                                <span className="ml-auto px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs">
                                  🎥 Vídeo
                                </span>
                              )}
                            </div>
                          </div>
                        </article>
                      ))}
                  </div>
                </div>
              )}

              {/* All Testimonials */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Todos os Depoimentos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.map((testimonial) => (
                    <article
                      key={testimonial.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                      {testimonial.mediaUrl && (
                        <div className="relative w-full bg-gray-100">
                          {testimonial.mediaType === 'video' ? (
                            <video
                              src={testimonial.mediaUrl}
                              controls
                              className="w-full max-h-64 object-contain"
                              playsInline
                            />
                          ) : (
                            <div className="relative w-full h-64">
                              <Image
                                src={testimonial.mediaUrl}
                                alt="Depoimento"
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-4">
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-1 text-gray-500">
                            <span>✅</span>
                            <span className="font-medium">Verificado</span>
                          </div>
                          {testimonial.isFeatured && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-semibold">
                              ⭐ Destaque
                            </span>
                          )}
                          {testimonial.mediaType === 'video' && (
                            <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full font-semibold">
                              🎥
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para Experimentar?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de clientes satisfeitos e descubra nossos produtos premium de laboratório
            </p>
            <a
              href="/produtos"
              className="inline-block bg-accent hover:bg-accent-dark text-gray-900 font-bold px-10 py-4 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              🛍️ Ver Produtos
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
