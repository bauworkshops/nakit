'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18nUtils';
import { translations } from '@/lib/translations';
import styles from './page.module.scss';

// Text constants
const LAST_UPDATED = 'November 10, 2025';

const TERMS_CONTENT = {
  eng: {
    intro: 'These Terms of Use govern your access to and use of the Bau designs jewelry catalogue website. By accessing this website, you agree to these terms.',
    catalogueNature: {
      title: '1. Nature of the Website',
      content: 'This website is a product catalogue for informational purposes only. It is not an online store. Products shown are for reference and may not be available for immediate purchase. For purchase inquiries, please contact us directly through the information provided on our Contacts page or visit our physical shops.',
    },
    intellectualProperty: {
      title: '2. Intellectual Property',
      content: 'All content on this website, including but not limited to images, text, designs, and logos, is the property of Bau designs and is protected by copyright laws. You may not reproduce, distribute, or use any content without our prior written permission.',
    },
    accuracy: {
      title: '3. Product Information Accuracy',
      content: 'While we strive to provide accurate product information, including descriptions, images, and specifications, we do not guarantee that all information is error-free, complete, or current. Product colors may vary from images shown due to screen settings.',
    },
    noWarranty: {
      title: '4. Disclaimer',
      content: 'This website and all information provided are on an "as is" basis. We make no warranties, expressed or implied, regarding the operation of the website or the information provided.',
    },
    liability: {
      title: '5. Limitation of Liability',
      content: 'To the fullest extent permitted by law, Bau designs shall not be liable for any damages arising from the use or inability to use this website.',
    },
    modifications: {
      title: '6. Modifications',
      content: 'We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to the website.',
    },
    governingLaw: {
      title: '7. Governing Law',
      content: 'These Terms of Use are governed by the laws of the Republic of Serbia.',
    },
  },
  rus: {
    intro: 'Эти Условия использования регулируют ваш доступ и использование веб-сайта каталога ювелирных изделий Bau designs. Получая доступ к этому веб-сайту, вы соглашаетесь с этими условиями.',
    catalogueNature: {
      title: '1. Характер веб-сайта',
      content: 'Этот веб-сайт является каталогом продукции только в информационных целях. Это не интернет-магазин. Показанные продукты предназначены только для справки и могут быть недоступны для немедленной покупки. По вопросам покупки обращайтесь к нам напрямую через информацию, предоставленную на нашей странице Контакты, или посетите наши физические магазины.',
    },
    intellectualProperty: {
      title: '2. Интеллектуальная собственность',
      content: 'Весь контент на этом веб-сайте, включая, но не ограничиваясь изображениями, текстом, дизайнами и логотипами, является собственностью Bau designs и защищен законами об авторском праве. Вы не можете воспроизводить, распространять или использовать какой-либо контент без нашего предварительного письменного разрешения.',
    },
    accuracy: {
      title: '3. Точность информации о продукте',
      content: 'Хотя мы стремимся предоставлять точную информацию о продукте, включая описания, изображения и спецификации, мы не гарантируем, что вся информация безошибочна, полна или актуальна. Цвета продукта могут отличаться от показанных на изображениях из-за настроек экрана.',
    },
    noWarranty: {
      title: '4. Отказ от гарантий',
      content: 'Этот веб-сайт и вся предоставленная информация предоставляются "как есть". Мы не даем никаких гарантий, явных или подразумеваемых, относительно работы веб-сайта или предоставленной информации.',
    },
    liability: {
      title: '5. Ограничение ответственности',
      content: 'В максимальной степени, разрешенной законом, Bau designs не несет ответственности за любые убытки, возникающие в результате использования или невозможности использования этого веб-сайта.',
    },
    modifications: {
      title: '6. Изменения',
      content: 'Мы оставляем за собой право изменять эти Условия использования в любое время. Изменения вступают в силу немедленно после публикации на веб-сайте.',
    },
    governingLaw: {
      title: '7. Применимое право',
      content: 'Эти Условия использования регулируются законами Республики Сербия.',
    },
  },
  srb: {
    intro: 'Ovi Uslovi korišćenja regulišu vaš pristup i upotrebu veb stranice kataloga nakita Bau designs. Pristupanjem ovoj veb stranici, slažete se sa ovim uslovima.',
    catalogueNature: {
      title: '1. Priroda veb stranice',
      content: 'Ova veb stranica je katalog proizvoda samo u informativne svrhe. To nije online prodavnica. Prikazani proizvodi su samo za referencu i možda nisu dostupni za trenutnu kupovinu. Za upite o kupovini, molimo kontaktirajte nas direktno putem informacija navedenih na našoj stranici Kontakti ili posetite naše fizičke prodavnice.',
    },
    intellectualProperty: {
      title: '2. Intelektualna svojina',
      content: 'Sav sadržaj na ovoj veb stranici, uključujući ali ne ograničavajući se na slike, tekst, dizajne i logotipe, je vlasništvo Bau designs i zaštićeno je zakonima o autorskim pravima. Ne smete reprodukovati, distribuirati ili koristiti bilo koji sadržaj bez naše prethodne pismene dozvole.',
    },
    accuracy: {
      title: '3. Tačnost informacija o proizvodu',
      content: 'Iako nastojimo da pružimo tačne informacije o proizvodu, uključujući opise, slike i specifikacije, ne garantujemo da su sve informacije bez grešaka, potpune ili aktuelne. Boje proizvoda mogu varirati od prikazanih slika zbog podešavanja ekrana.',
    },
    noWarranty: {
      title: '4. Odricanje od garancije',
      content: 'Ova veb stranica i sve pružene informacije su na osnovu "takvih kakvi jesu". Ne dajemo nikakve garancije, izričite ili podrazumevane, u vezi sa radom veb stranice ili pruženih informacija.',
    },
    liability: {
      title: '5. Ograničenje odgovornosti',
      content: 'U najvećoj meri dozvoljenoj zakonom, Bau designs neće biti odgovoran za bilo kakvu štetu koja proizilazi iz upotrebe ili nemogućnosti korišćenja ove veb stranice.',
    },
    modifications: {
      title: '6. Izmene',
      content: 'Zadržavamo pravo da izmenimo ove Uslove korišćenja u bilo kom trenutku. Izmene će stupiti na snagu odmah nakon objavljivanja na veb stranici.',
    },
    governingLaw: {
      title: '7. Merodavno pravo',
      content: 'Ovi Uslovi korišćenja regulisani su zakonima Republike Srbije.',
    },
  },
};

export default function TermsOfUsePage() {
  const { language } = useLanguage();
  const content = TERMS_CONTENT[language];

  return (
    <div>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t(translations.legal.termsTitle, language)}</h1>
          <p className={styles.updated}>
            {t(translations.legal.lastUpdated, language)}: {LAST_UPDATED}
          </p>

          <div className={styles.content}>
            <p className={styles.intro}>{content.intro}</p>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{content.catalogueNature.title}</h2>
              <p className={styles.text}>{content.catalogueNature.content}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{content.intellectualProperty.title}</h2>
              <p className={styles.text}>{content.intellectualProperty.content}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{content.accuracy.title}</h2>
              <p className={styles.text}>{content.accuracy.content}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{content.noWarranty.title}</h2>
              <p className={styles.text}>{content.noWarranty.content}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{content.liability.title}</h2>
              <p className={styles.text}>{content.liability.content}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{content.modifications.title}</h2>
              <p className={styles.text}>{content.modifications.content}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{content.governingLaw.title}</h2>
              <p className={styles.text}>{content.governingLaw.content}</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

