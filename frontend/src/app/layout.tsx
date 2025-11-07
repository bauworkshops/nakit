import type { Metadata } from 'next';
import './globals.css';

// Text constants
const SITE_TITLE = 'Nakit - Product Catalog';
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
      <body>{children}</body>
    </html>
  );
}

