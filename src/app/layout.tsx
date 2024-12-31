import './globals.css';
import { Figtree } from 'next/font/google';
import localFont from 'next/font/local';
import { SessionProvider } from 'next-auth/react';
import { Header } from './_components/header';

const figtree = Figtree({
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-figtree',
});

const vazir = localFont({
  src: [
    {
      path: '../../public/fonts/vazir/Vazirmatn-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vazir/Vazirmatn-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vazir/Vazirmatn-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vazir/Vazirmatn-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vazir/Vazirmatn-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-vazir',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html dir="rtl" className={`dark ${figtree.variable} ${vazir.variable}`}>
        <body className="min-h-screen bg-light-100 dark:bg-dark-100">
          <Header />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
