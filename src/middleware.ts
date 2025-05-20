import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const roleRedirectMap: Record<string, string> = {
  admin: "/dashboard/admin",
  padre: "/dashboard/padre",
  profesor: "/dashboard/profesor",
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;
  const role = req.cookies.get("role")?.value?.toLowerCase();

  const isPublicFile =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname);

  // 🎯 Permitir archivos públicos y APIs
  if (isPublicFile) return NextResponse.next();

  // 🔁 Redirigir desde raíz o login si ya está autenticado
  if ((pathname === "/" || pathname === "/login") && token && role) {
    const destination = roleRedirectMap[role];
    if (destination) {
      return NextResponse.redirect(new URL(destination, req.url));
    }
  }

  // 🔐 Bloquear acceso a /dashboard si no hay token
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(
      new URL("/login?sessionExpired=true", req.url)
    );
  }

  // 🛑 Rol válido pero está en ruta equivocada → forzar redirección
  if (pathname.startsWith("/dashboard") && token && role) {
    const expectedPath = roleRedirectMap[role];
    if (expectedPath && !pathname.startsWith(expectedPath)) {
      return NextResponse.redirect(new URL(expectedPath, req.url));
    }
  }

  return NextResponse.next();
}

// 💡 Matcher: aplicar solo a rutas visibles, no a APIs ni assets
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
