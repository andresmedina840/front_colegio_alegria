import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get('access_token')?.value; // <- debe coincidir con tu backend
  const role = req.cookies.get('role')?.value;

  // Permitir archivos públicos y rutas internas de Next
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Si ya está autenticado y entra a login o raíz, redirigir al dashboard
  if ((pathname === '/' || pathname === '/login') && token && role) {
    const roleLower = role.trim().toLowerCase();
    return NextResponse.redirect(new URL(`/dashboard/${roleLower}`, req.url));
  }

  // Si intenta acceder a dashboard sin token, redirigir a login
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
