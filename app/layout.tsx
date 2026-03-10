import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

const themeScript = `
  (function () {
    try {
      var storedTheme = localStorage.getItem('techgadgets-theme');
      var isDark = storedTheme === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    } catch {}
  })();
`;

export const metadata: Metadata = {
  title: 'TechGadgets eCommerce',
  description: 'A simple eCommerce application built with Next.js App Router and NextAuth.js',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 flex flex-col dark:bg-slate-950 dark:text-slate-100`} suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="flex-grow transition-colors duration-300">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
