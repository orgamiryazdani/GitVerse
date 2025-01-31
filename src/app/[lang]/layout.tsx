import './globals.css';
import { Figtree } from 'next/font/google';
import localFont from 'next/font/local';
import { SessionProvider } from 'next-auth/react';
import { getDictionary } from './dictionaries';
import DictionaryProvider from '@/providers/dictionary-provider';
import { lang } from '@/types/languages';
import { Header } from './_components/header';
import { PageTransition } from './_components/page-transition';
import { StairTransition } from './_components/stairs-transition';
import ThemeProvider from '@/providers/theme-provider';
import QueryProvider from '@/providers/react-query-provider';
import { Toaster } from 'react-hot-toast';
import LangProvider from '@/providers/language-provider';

const figtree = Figtree({
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-figtree',
});

const vazir = localFont({
  src: [
    {
      path: '../../../public/fonts/vazir/Vazirmatn-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/vazir/Vazirmatn-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/vazir/Vazirmatn-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/vazir/Vazirmatn-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/vazir/Vazirmatn-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-vazir',
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: lang;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <SessionProvider>
      <DictionaryProvider dictionary={dictionary}>
        <html dir={lang === 'en' ? 'ltr' : 'rtl'} lang={lang} className={`dark ${figtree.variable} ${vazir.variable}`}>
          <body className="min-h-screen bg-light-100 dark:bg-dark-100">
            <ThemeProvider>
              <LangProvider lang={lang}>
                <QueryProvider>
                  <Toaster />
                  <Header />
                  <StairTransition />
                  <PageTransition>{children}</PageTransition>
                </QueryProvider>
              </LangProvider>
            </ThemeProvider>
          </body>
        </html>
      </DictionaryProvider>
    </SessionProvider>
  );
}
