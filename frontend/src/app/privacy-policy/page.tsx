'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18nUtils';
import { translations } from '@/lib/translations';
import styles from './page.module.scss';

// Text constants
const LAST_UPDATED = 'November 10, 2025';

const PRIVACY_CONTENT = {
  eng: {
    intro: 'This Privacy Policy describes how Bau designs ("we", "us", or "our") handles information when you use our jewelry catalogue website.',
    noDataCollection: {
      title: '1. No Personal Data Collection',
      content: 'This website is a product catalogue only. We do not collect, store, or process any personal data from visitors. We do not use cookies, analytics, or tracking technologies.',
    },
    noCookies: {
      title: '2. No Cookies',
      content: 'We do not use cookies or similar tracking technologies on this website.',
    },
    thirdParty: {
      title: '3. Third-Party Services',
      content: 'Our website may display maps using Google Maps. Please refer to Google\'s Privacy Policy for information about how Google processes data: https://policies.google.com/privacy',
    },
    contactInfo: {
      title: '4. Contact Information',
      content: 'If you have any questions about this Privacy Policy, please contact us through the information provided on our Contacts page.',
    },
    changes: {
      title: '5. Changes to This Policy',
      content: 'We may update this Privacy Policy from time to time. The updated version will be indicated by the "Last updated" date at the top of this page.',
    },
  },
  rus: {
    intro: 'Эта Политика конфиденциальности описывает, как Bau designs ("мы", "нас" или "наш") обрабатывает информацию при использовании нашего веб-сайта каталога ювелирных изделий.',
    noDataCollection: {
      title: '1. Отсутствие сбора персональных данных',
      content: 'Этот веб-сайт является только каталогом продукции. Мы не собираем, не храним и не обрабатываем какие-либо персональные данные посетителей. Мы не используем файлы cookie, аналитику или технологии отслеживания.',
    },
    noCookies: {
      title: '2. Отсутствие файлов cookie',
      content: 'Мы не используем файлы cookie или аналогичные технологии отслеживания на этом веб-сайте.',
    },
    thirdParty: {
      title: '3. Сторонние сервисы',
      content: 'Наш веб-сайт может отображать карты с помощью Google Maps. Пожалуйста, ознакомьтесь с Политикой конфиденциальности Google для получения информации о том, как Google обрабатывает данные: https://policies.google.com/privacy',
    },
    contactInfo: {
      title: '4. Контактная информация',
      content: 'Если у вас есть вопросы по этой Политике конфиденциальности, пожалуйста, свяжитесь с нами через информацию, предоставленную на странице Контакты.',
    },
    changes: {
      title: '5. Изменения в этой политике',
      content: 'Мы можем время от времени обновлять эту Политику конфиденциальности. Обновленная версия будет указана датой "Последнее обновление" в верхней части этой страницы.',
    },
  },
  srb: {
    intro: 'Ova Politika privatnosti opisuje kako Bau designs ("mi", "nas" ili "naš") obrađuje informacije kada koristite našu veb stranicu kataloga nakita.',
    noDataCollection: {
      title: '1. Bez prikupljanja ličnih podataka',
      content: 'Ova veb stranica je samo katalog proizvoda. Ne prikupljamo, ne čuvamo niti obrađujemo lične podatke posetilaca. Ne koristimo kolačiće, analitiku ili tehnologije praćenja.',
    },
    noCookies: {
      title: '2. Bez kolačića',
      content: 'Ne koristimo kolačiće ili slične tehnologije praćenja na ovoj veb stranici.',
    },
    thirdParty: {
      title: '3. Usluge trećih strana',
      content: 'Naša veb stranica može prikazivati mape koristeći Google Maps. Molimo pogledajte Politiku privatnosti Google-a za informacije o tome kako Google obrađuje podatke: https://policies.google.com/privacy',
    },
    contactInfo: {
      title: '4. Kontakt informacije',
      content: 'Ako imate bilo kakva pitanja o ovoj Politici privatnosti, molimo kontaktirajte nas putem informacija navedenih na našoj stranici Kontakti.',
    },
    changes: {
      title: '5. Izmene ove politike',
      content: 'Možemo s vremena na vreme ažurirati ovu Politiku privatnosti. Ažurirana verzija će biti označena datumom "Poslednje ažurirano" na vrhu ove stranice.',
    },
  },
};

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const content = PRIVACY_CONTENT[language];

  return (
    <div>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t(translations.legal.privacyTitle, language)}</h1>
          <p className={styles.updated}>
            {t(translations.legal.lastUpdated, language)}: {LAST_UPDATED}
          </p>

          <div className={styles.content}>
            <p className={styles.intro}>{content.intro}</p>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{content.noDataCollection.title}</h2>
              <p className={styles.text}>{content.noDataCollection.content}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{content.noCookies.title}</h2>
              <p className={styles.text}>{content.noCookies.content}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{content.thirdParty.title}</h2>
              <p className={styles.text}>{content.thirdParty.content}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{content.contactInfo.title}</h2>
              <p className={styles.text}>{content.contactInfo.content}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{content.changes.title}</h2>
              <p className={styles.text}>{content.changes.content}</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

