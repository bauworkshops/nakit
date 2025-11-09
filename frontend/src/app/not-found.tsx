'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { t } from '@/lib/i18nUtils';

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>404</h1>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: 'var(--color-text)' }}>
        {t(translations.common.notFound, language)}
      </h2>
      <Link href="/" className="back-link">
        {t(translations.common.backToHome, language)}
      </Link>
    </div>
  );
}

