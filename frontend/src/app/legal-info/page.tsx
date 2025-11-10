'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18nUtils';
import { translations } from '@/lib/translations';
import { pb, Registry } from '@/lib/pocketbase';
import styles from './page.module.scss';

// Default fallback values - REPLACE WITH ACTUAL COMPANY INFORMATION
const DEFAULT_COMPANY_NAME = 'Bau designs';
const DEFAULT_REG_NUMBER = '[Registration Number]';
const DEFAULT_TAX_ID = '[PIB Number]';
const DEFAULT_ADDRESS = '123 Fashion Street, Downtown District, City 12345';
const DEFAULT_PHONE = '+381 (62) 822-6474';
const DEFAULT_EMAIL = 'u.baukina@gmail.com';

const LEGAL_CONTENT = {
  eng: {
    intro: 'This page contains the legal and registration information for our business in accordance with Serbian and EU regulations.',
    businessInfo: {
      title: 'Business Information',
      companyLabel: 'Legal Entity Name',
      regLabel: 'Registration Number (Matični broj)',
      taxLabel: 'Tax Identification Number (PIB)',
      addressLabel: 'Business Address',
    },
    contactSection: {
      title: 'Contact Information',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
    },
    catalogueInfo: {
      title: 'About This Catalogue',
      content: 'This website serves as a product catalogue for jewelry items. It is not an e-commerce platform. For purchases, please visit our physical shops or contact us directly using the information provided above.',
    },
    compliance: {
      title: 'Legal Compliance',
      content: 'Our business operates in compliance with the laws of the Republic of Serbia and applicable EU regulations. All jewelry products meet safety standards and material composition requirements.',
    },
  },
  rus: {
    intro: 'Эта страница содержит юридическую и регистрационную информацию о нашем бизнесе в соответствии с сербскими и европейскими нормами.',
    businessInfo: {
      title: 'Информация о компании',
      companyLabel: 'Юридическое лицо',
      regLabel: 'Регистрационный номер (Matični broj)',
      taxLabel: 'Налоговый идентификационный номер (PIB)',
      addressLabel: 'Юридический адрес',
    },
    contactSection: {
      title: 'Контактная информация',
      phoneLabel: 'Телефон',
      emailLabel: 'Электронная почта',
    },
    catalogueInfo: {
      title: 'О каталоге',
      content: 'Этот веб-сайт служит каталогом продукции ювелирных изделий. Это не платформа электронной коммерции. Для покупок посетите наши физические магазины или свяжитесь с нами напрямую, используя информацию, предоставленную выше.',
    },
    compliance: {
      title: 'Юридическое соответствие',
      content: 'Наш бизнес работает в соответствии с законами Республики Сербия и применимыми нормами ЕС. Все ювелирные изделия соответствуют стандартам безопасности и требованиям к составу материалов.',
    },
  },
  srb: {
    intro: 'Ova stranica sadrži pravne i registracione informacije za naše poslovanje u skladu sa srpskim i EU propisima.',
    businessInfo: {
      title: 'Poslovne informacije',
      companyLabel: 'Pravno lice',
      regLabel: 'Matični broj',
      taxLabel: 'Poreski identifikacioni broj (PIB)',
      addressLabel: 'Poslovna adresa',
    },
    contactSection: {
      title: 'Kontakt informacije',
      phoneLabel: 'Telefon',
      emailLabel: 'Email',
    },
    catalogueInfo: {
      title: 'O katalogu',
      content: 'Ova veb stranica služi kao katalog proizvoda nakita. To nije platforma za e-trgovinu. Za kupovinu, posetite naše fizičke prodavnice ili nas kontaktirajte direktno koristeći informacije navedene gore.',
    },
    compliance: {
      title: 'Zakonska usklađenost',
      content: 'Naše poslovanje je u skladu sa zakonima Republike Srbije i važećim EU propisima. Svi proizvodi nakita ispunjavaju standarde bezbednosti i zahteve za sastav materijala.',
    },
  },
};

export default function LegalInfoPage() {
  const { language } = useLanguage();
  const content = LEGAL_CONTENT[language];

  const [companyName, setCompanyName] = useState(DEFAULT_COMPANY_NAME);
  const [regNumber, setRegNumber] = useState(DEFAULT_REG_NUMBER);
  const [taxId, setTaxId] = useState(DEFAULT_TAX_ID);
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const [phone, setPhone] = useState(DEFAULT_PHONE);
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    const abortController = new AbortController();

    const fetchLegalInfo = async () => {
      try {
        const getRegistryValue = async (key: string, defaultValue: string): Promise<string> => {
          try {
            const records = await pb.collection('registry').getFullList<Registry>({
              filter: `key = "${key}"`,
              requestKey: `registry-${key}`,
              signal: abortController.signal,
            });
            return records.length > 0 ? records[0].value : defaultValue;
          } catch (error: any) {
            if (error?.isAbort) return defaultValue;
            return defaultValue;
          }
        };

        const [companyVal, regVal, taxVal, addrVal, phoneVal, emailVal] = await Promise.all([
          getRegistryValue('legal_company_name', DEFAULT_COMPANY_NAME),
          getRegistryValue('legal_reg_number', DEFAULT_REG_NUMBER),
          getRegistryValue('legal_tax_id', DEFAULT_TAX_ID),
          getRegistryValue('legal_address', DEFAULT_ADDRESS),
          getRegistryValue('contact_phone', DEFAULT_PHONE),
          getRegistryValue('contact_email', DEFAULT_EMAIL),
        ]);

        if (isCancelled) return;

        setCompanyName(companyVal);
        setRegNumber(regVal);
        setTaxId(taxVal);
        setAddress(addrVal);
        setPhone(phoneVal);
        setEmail(emailVal);
      } catch (error: any) {
        if (isCancelled || error?.isAbort) return;
        console.error('Error loading legal info:', error);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchLegalInfo();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.container}>
            <p>{t(translations.common.loading, language)}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t(translations.legal.legalInfoTitle, language)}</h1>

          <div className={styles.content}>
            <p className={styles.intro}>{content.intro}</p>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{content.businessInfo.title}</h2>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>{content.businessInfo.companyLabel}:</span>
                  <span className={styles.value}>{companyName}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>{content.businessInfo.regLabel}:</span>
                  <span className={styles.value}>{regNumber}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>{content.businessInfo.taxLabel}:</span>
                  <span className={styles.value}>{taxId}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>{content.businessInfo.addressLabel}:</span>
                  <span className={styles.value}>{address}</span>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{content.contactSection.title}</h2>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>{content.contactSection.phoneLabel}:</span>
                  <span className={styles.value}>
                    <a href={`tel:${phone}`} className={styles.link}>{phone}</a>
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>{content.contactSection.emailLabel}:</span>
                  <span className={styles.value}>
                    <a href={`mailto:${email}`} className={styles.link}>{email}</a>
                  </span>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{content.catalogueInfo.title}</h2>
              <p className={styles.text}>{content.catalogueInfo.content}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{content.compliance.title}</h2>
              <p className={styles.text}>{content.compliance.content}</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

