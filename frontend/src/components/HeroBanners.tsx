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
      const response = await api.get('/api/banners/active?tenantId=0fb61585-3cb3-48b3-ae76-0a5358084a8c&type=HOME');
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
    return null; // Não mostra nada se não houver banners
  }

  const currentBanner = banners[currentIndex];
  const imageToShow = isMobile && currentBanner.imageMobile
    ? currentBanner.imageMobile
    : currentBanner.imageUrl;

  const showOverlay = currentBanner.title || currentBanner.subtitle || (currentBanner.linkUrl && currentBanner.linkText);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Banner Image */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
        <Image
          src={imageToShow}
          alt={currentBanner.title || 'Banner'}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={90}
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
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4">
          <div className="bg-white/98 backdrop-blur-md rounded-xl md:rounded-2xl shadow-xl border border-gray-100 p-3 md:p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              <div className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-2xl md:text-3xl mb-1.5">🔬</div>
                <div className="text-xs md:text-sm font-bold text-gray-900 leading-tight">Laboratório</div>
                <div className="text-[10px] md:text-xs text-gray-600 mt-0.5">GMP Certificado</div>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-2xl md:text-3xl mb-1.5">📋</div>
                <div className="text-xs md:text-sm font-bold text-gray-900 leading-tight">COA Garantido</div>
                <div className="text-[10px] md:text-xs text-gray-600 mt-0.5">Análise Completa</div>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-2xl md:text-3xl mb-1.5">⚡</div>
                <div className="text-xs md:text-sm font-bold text-gray-900 leading-tight">Entrega Rápida</div>
                <div className="text-[10px] md:text-xs text-gray-600 mt-0.5">3-7 dias úteis</div>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-2xl md:text-3xl mb-1.5">🛡️</div>
                <div className="text-xs md:text-sm font-bold text-gray-900 leading-tight">Seguro 100%</div>
                <div className="text-[10px] md:text-xs text-gray-600 mt-0.5">SSL & Discreto</div>
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
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/30 backdrop-blur-sm rounded-full px-3 py-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-6'
                  : 'bg-white/60 hover:bg-white/80 w-2'
              }`}
              aria-label={`Ver banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
