import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from '../i18n';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const locales: readonly string[] = i18n.locales;
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages([
        ...locales,
    ]);
    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
}


export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (pathname === '/') {
        const url = request.nextUrl.clone();
        url.pathname = `/fa`;
        return NextResponse.rewrite(url);
    }

    const hasLocale = i18n.locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!hasLocale) {
        const locale = getLocale(request) || i18n.defaultLocale;
        const url = request.nextUrl.clone();
        url.pathname = `/${locale}${pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api/auth|auth|favicon.png|robots.txt|sitemap.xml|images).*)',
    ],
};