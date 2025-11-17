// Server Component - no 'use client' directive
export const dynamic = 'force-dynamic';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CustomerRegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Criar Conta</h1>
          <p>Criar nova conta</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
