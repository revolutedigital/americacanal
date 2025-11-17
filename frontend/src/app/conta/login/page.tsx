// Server Component - no 'use client' directive
// Force dynamic rendering since this page uses authentication hooks
export const dynamic = 'force-dynamic';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/conta/LoginForm';
import ClientOnlyWrapper from '@/components/ClientOnlyWrapper';

export default function CustomerLoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ClientOnlyWrapper fallback={
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-6"></div>
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </main>
      }>
        <LoginForm />
      </ClientOnlyWrapper>
      <Footer />
    </div>
  );
}