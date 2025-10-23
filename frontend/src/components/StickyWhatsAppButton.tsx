'use client';

import { useState, useEffect } from 'react';

export default function StickyWhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="https://wa.me/595982574068?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20America%20Cannabis"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3
                 bg-green-500 hover:bg-green-600 text-white px-6 py-4
                 rounded-full shadow-2xl hover:scale-110 transition-all
                 duration-300 group animate-bounce hover:animate-none"
      aria-label="Falar com especialista via WhatsApp"
    >
      <span className="text-2xl">💬</span>
      <span className="hidden md:inline font-bold">Fale com Especialista</span>

      {/* Notification Badge */}
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
    </a>
  );
}
