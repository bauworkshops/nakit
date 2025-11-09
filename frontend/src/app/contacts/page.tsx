'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { GoogleMap } from '@/components/GoogleMap';
import { pb, Registry } from '@/lib/pocketbase';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { t } from '@/lib/i18nUtils';
import styles from './page.module.scss';

// Default fallback values
const DEFAULT_ADDRESS = '123 Fashion Street, Downtown District, City 12345';
const DEFAULT_PHONE = '+381 (62) 822-6474';
const DEFAULT_EMAIL = 'u.baukina@gmail.com';
const DEFAULT_HOURS = 'Mon-Fri: 9:00 AM - 8:00 PM, Sat-Sun: 10:00 AM - 6:00 PM';
const DEFAULT_LAT = 40.7589;
const DEFAULT_LNG = -73.9851;

export default function ContactsPage() {
  const { language } = useLanguage();
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const [phone, setPhone] = useState(DEFAULT_PHONE);
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [hours, setHours] = useState(DEFAULT_HOURS);
  const [coords, setCoords] = useState({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    const abortController = new AbortController();

    const fetchContactInfo = async () => {
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

        const [addressVal, phoneVal, emailVal, hoursVal, coordsVal] = await Promise.all([
          getRegistryValue('contact_address', DEFAULT_ADDRESS),
          getRegistryValue('contact_phone', DEFAULT_PHONE),
          getRegistryValue('contact_email', DEFAULT_EMAIL),
          getRegistryValue('contact_hours', DEFAULT_HOURS),
          getRegistryValue('contact_coords', `${DEFAULT_LAT},${DEFAULT_LNG}`),
        ]);

        if (isCancelled) return;

        const [latStr, lngStr] = coordsVal.split(',');
        
        setAddress(addressVal);
        setPhone(phoneVal);
        setEmail(emailVal);
        setHours(hoursVal);
        setCoords({ lat: parseFloat(latStr), lng: parseFloat(lngStr) });
      } catch (error: any) {
        if (isCancelled || error?.isAbort) return;
        console.error('Error loading contact info:', error);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchContactInfo();

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
          <p>{t(translations.common.loading, language)}</p>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>{t(translations.contacts.title, language)}</h1>
        
        <div className={styles.content}>
          <div className={styles.info}>
            <h2 className={styles.sectionTitle}>{t(translations.contacts.sectionTitle, language)}</h2>
            <p className={styles.subtitle}>{t(translations.contacts.subtitle, language)}</p>
            
            <div className={styles.contactItem}>
              <h3 className={styles.label}>{t(translations.contacts.address, language)}</h3>
              <p className={styles.value}>{address}</p>
            </div>
            
            <div className={styles.contactItem}>
              <h3 className={styles.label}>{t(translations.contacts.phone, language)}</h3>
              <p className={styles.value}>{phone}</p>
            </div>
            
            <div className={styles.contactItem}>
              <h3 className={styles.label}>{t(translations.contacts.email, language)}</h3>
              <p className={styles.value}>
                <a href={`mailto:${email}`} className={styles.emailLink}>
                  {email}
                </a>
              </p>
            </div>
            
            <div className={styles.contactItem}>
              <h3 className={styles.label}>{t(translations.contacts.hours, language)}</h3>
              <p className={styles.value}>{hours}</p>
            </div>
          </div>
          
          <div className={styles.mapWrapper}>
            <GoogleMap
              lat={coords.lat}
              lng={coords.lng}
              title="Location map"
              className={styles.map}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

