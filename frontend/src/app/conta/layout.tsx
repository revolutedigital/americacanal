// Server Component - no 'use client' directive
export const dynamic = 'force-dynamic';

import { ReactNode } from 'react';

export default function ContaLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}