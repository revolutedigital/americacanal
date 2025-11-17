// Server Component - no 'use client' directive
// Force dynamic rendering since this page uses authentication hooks
export const dynamic = 'force-dynamic';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/conta/LoginForm';

export default function CustomerLoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
}