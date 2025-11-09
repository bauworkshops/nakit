'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { t } from '@/lib/i18nUtils';

export default function Loading() {
  const { language } = useLanguage();

  return (
    <div className="loading">
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{
          border: '4px solid var(--color-border)',
          borderTop: '4px solid var(--color-primary)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }} />
        <p style={{ color: 'var(--color-text-light)', fontSize: '18px' }}>{t(translations.common.loading, language)}</p>
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

