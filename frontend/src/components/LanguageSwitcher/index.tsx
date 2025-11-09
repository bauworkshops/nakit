'use client';

import { useLanguage, Language } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './index.module.scss';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: Language[] = ['eng', 'rus', 'srb'];

  return (
    <div className={styles.switcher}>
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`${styles.langButton} ${language === lang ? styles.active : ''}`}
          aria-label={`Switch to ${translations.language[lang]}`}
        >
          {translations.language[lang]}
        </button>
      ))}
    </div>
  );
}

