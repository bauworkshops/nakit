import type { Metadata } from 'next';
import { LanguageProvider } from '@/contexts/LanguageContext';
import './globals.scss';

// Text constants
const SITE_TITLE = 'Bau designs - Product Catalog';
const SITE_DESCRIPTION = 'Jewelry Catalog';
const SITE_LANG = 'en';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE_LANG}>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

