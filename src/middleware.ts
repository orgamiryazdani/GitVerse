import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from '../i18n';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const PROTECTED_ROUTES = ['/profile'];

const PUBLIC_ROUTES = ['/', '/fa', '/en'];

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const locales: readonly string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages([...locales]);
  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

function isProtectedRoute(pathname: string): boolean {
  const pathWithoutLocale = i18n.locales.some((locale) => pathname.startsWith(`/${locale}/`))
    ? `/${pathname.split('/', 3)[2]}`
    : pathname;

  return PROTECTED_ROUTES.some((route) => pathWithoutLocale === route);
}

function isAuthenticated(request: NextRequest): boolean {
  return request.cookies.has('__Secure-authjs.session-token');
}

function getBasePathWithLocale(pathname: string): string {
  const segments = pathname.split('/');
  if (segments.length > 1 && i18n.locales.includes((segments[1] as 'fa') || 'en')) {
    return `/${segments[1]}`;
  }
  return '/';
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (PUBLIC_ROUTES.includes(pathname)) {
    if (pathname === '/') {
      const url = request.nextUrl.clone();
      url.pathname = `/fa`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  if (isProtectedRoute(pathname)) {
    if (!isAuthenticated(request)) {
      const redirectUrl = request.nextUrl.clone();
      const basePath = getBasePathWithLocale(pathname);
      redirectUrl.pathname = basePath;
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  const hasLocale = i18n.locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (!hasLocale) {
    const locale = getLocale(request) || i18n.defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth|auth|favicon.png|robots.txt|sitemap.xml|images).*)'],
};
