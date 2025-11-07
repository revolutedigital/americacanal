'use client';

import dynamic from 'next/dynamic';

// Load Header without SSR to prevent hydration issues
const Header = dynamic(() => import('./Header'), {
  ssr: false,
  loading: () => (
    <header className="bg-gradient-to-r from-primary via-primary-vibrant to-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex-shrink-0">
            <div className="relative w-62 sm:w-72 md:w-94 lg:w-104 h-18 md:h-26 px-2 md:px-4 py-1 md:py-2 flex items-center justify-center">
              <div className="animate-pulse bg-white/20 w-full h-full rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  ),
});

export default Header;
