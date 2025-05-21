// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const roleRedirectMap: Record<string, string> = {
  ADMIN: "/dashboard/admin",
  PADRE: "/dashboard/padre",
  PROFESOR: "/dashboard/profesor",
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;
  const role = req.cookies.get("role")?.value as keyof typeof roleRedirectMap;

  const isPublicAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname);

  // ✅ Permitir recursos públicos
  if (isPublicAsset) return NextResponse.next();

  // ⛔ No hay token → redirigir a login
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(
      new URL("/login?sessionExpired=true", req.url)
    );
  }

  // ✅ Usuario autenticado → evitar mostrar /login o /
  if ((pathname === "/" || pathname === "/login") && token && role) {
    const redirectTo = roleRedirectMap[role];
    if (redirectTo) {
      return NextResponse.redirect(new URL(redirectTo, req.url));
    }
  }

  // 🚨 Usuario autenticado pero en ruta incorrecta según su rol
  if (pathname.startsWith("/dashboard") && token && role) {
    const allowedPrefix = roleRedirectMap[role];
    if (!pathname.startsWith(allowedPrefix)) {
      return NextResponse.redirect(new URL(allowedPrefix, req.url));
    }
  }

  return NextResponse.next();
}

// ✅ Aplicar middleware solo a páginas, no a API ni assets
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
