'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { t } from '@/lib/i18nUtils';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { language } = useLanguage();

  return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px', color: 'var(--color-error)' }}>
        {t(translations.common.error, language)}
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '30px', color: 'var(--color-text)' }}>
        {error.message || t(translations.common.errorDefault, language)}
      </p>
      <button
        onClick={reset}
        style={{
          padding: '12px 24px',
          background: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
        }}
      >
        {t(translations.common.tryAgain, language)}
      </button>
    </div>
  );
}

