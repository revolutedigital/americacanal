import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Middleware desabilitado - autenticação é feita client-side no layout
  // O token está no localStorage, não acessível no server-side
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
