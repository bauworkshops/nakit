'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { t } from '@/lib/i18nUtils';
import styles from './index.module.scss';

export function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>{t(translations.footer.company, language)}</h3>
            <p className={styles.text}>{t(translations.footer.catalogueDescription, language)}</p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>{t(translations.footer.navigation, language)}</h3>
            <ul className={styles.links}>
              <li>
                <Link href="/catalogue" className={styles.link}>
                  {t(translations.nav.catalogue, language)}
                </Link>
              </li>
              <li>
                <Link href="/collections" className={styles.link}>
                  {t(translations.nav.collections, language)}
                </Link>
              </li>
              <li>
                <Link href="/shops" className={styles.link}>
                  {t(translations.nav.shops, language)}
                </Link>
              </li>
              <li>
                <Link href="/contacts" className={styles.link}>
                  {t(translations.nav.contacts, language)}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>{t(translations.footer.legal, language)}</h3>
            <ul className={styles.links}>
              <li>
                <Link href="/legal-info" className={styles.link}>
                  {t(translations.footer.legalInfo, language)}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={styles.link}>
                  {t(translations.footer.privacyPolicy, language)}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className={styles.link}>
                  {t(translations.footer.termsOfUse, language)}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Bau designs. {t(translations.footer.allRightsReserved, language)}
          </p>
        </div>
      </div>
    </footer>
  );
}

