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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
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
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}

