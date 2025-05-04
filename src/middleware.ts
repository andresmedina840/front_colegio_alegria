import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get('token')?.value;
  const role = req.cookies.get('role')?.value;

  // Permitir archivos públicos y rutas internas de Next
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Redirigir a dashboard si ya está autenticado
  if ((pathname === '/' || pathname === '/login') && token && role) {
    const roleLower = role.toLowerCase();
    return NextResponse.redirect(new URL(`/dashboard/${roleLower}`, req.url));
  }

  // Redirigir al login si intenta acceder a dashboard sin token
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
