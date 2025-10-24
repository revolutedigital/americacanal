'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';

interface Banner {
  id: string;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  imageMobile?: string;
  linkUrl?: string;
  linkText?: string;
}

export default function HeroBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchBanners();

    // Detectar mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await api.get('/api/banners/active?tenantId=df192cfd-fb87-470a-8ea8-81784633409c&type=HOME');
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 6000); // Muda a cada 6 segundos

      return () => clearInterval(interval);
    }
  }, [banners.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const trackImpression = async (bannerId: string) => {
    try {
      await api.post(`/api/banners/${bannerId}/track-impression`);
    } catch (error) {
      console.error('Error tracking impression:', error);
    }
  };

  const trackClick = async (bannerId: string) => {
    try {
      await api.post(`/api/banners/${bannerId}/track-click`);
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  useEffect(() => {
    if (banners.length > 0) {
      trackImpression(banners[currentIndex].id);
    }
  }, [currentIndex, banners]);

  if (loading || banners.length === 0) {
    return (
      <div className="bg-gradient-to-r from-primary to-primary-dark h-96 flex items-center justify-center">
        {/* Banner será gerenciado no painel admin */}
      </div>
    );
  }

  const currentBanner = banners[currentIndex];
  const imageToShow = isMobile && currentBanner.imageMobile
    ? currentBanner.imageMobile
    : currentBanner.imageUrl;

  const showOverlay = currentBanner.title || currentBanner.subtitle || (currentBanner.linkUrl && currentBanner.linkText);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Banner Image */}
      <div className="relative w-full h-[350px] md:h-[600px]">
        <Image
          src={imageToShow}
          alt={currentBanner.title || 'Banner'}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* Overlay Gradient - Só aparece se houver conteúdo de texto */}
        {showOverlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        )}

        {/* Content - Só aparece se houver título, subtítulo ou link */}
        {showOverlay && (
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                {currentBanner.title && (
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                    {currentBanner.title}
                  </h1>
                )}

                {currentBanner.subtitle && (
                  <p className="text-xl md:text-3xl text-white mb-8 drop-shadow-lg">
                    {currentBanner.subtitle}
                  </p>
                )}

                {currentBanner.linkUrl && currentBanner.linkText && (
                  <Link
                    href={currentBanner.linkUrl}
                    onClick={() => trackClick(currentBanner.id)}
                    className="inline-block bg-secondary hover:bg-secondary-dark text-white font-semibold py-4 px-10 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
                  >
                    {currentBanner.linkText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Value Proposition Badges - Always visible */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-1">🔬</div>
                <div className="text-xs md:text-sm font-bold text-gray-900">Laboratório</div>
                <div className="text-xs text-gray-600 hidden md:block">GMP Certificado</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-1">📋</div>
                <div className="text-xs md:text-sm font-bold text-gray-900">COA Garantido</div>
                <div className="text-xs text-gray-600 hidden md:block">Análise Completa</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-1">⚡</div>
                <div className="text-xs md:text-sm font-bold text-gray-900">Entrega Rápida</div>
                <div className="text-xs text-gray-600 hidden md:block">3-7 dias úteis</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-1">🛡️</div>
                <div className="text-xs md:text-sm font-bold text-gray-900">Seguro 100%</div>
                <div className="text-xs text-gray-600 hidden md:block">SSL & Discreto</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
            aria-label="Banner anterior"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
            aria-label="Próximo banner"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Navigation Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ver banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
