import { Navbar } from '@/components/Navbar';
import { GoogleMap } from '@/components/GoogleMap';
import { pb, Registry } from '@/lib/pocketbase';
import styles from './page.module.scss';

// Revalidate every 30 minutes (1800 seconds)
export const revalidate = 1800;

// Text constants
const PAGE_TITLE = 'Contacts';
const SECTION_TITLE = 'Get in Touch';
const SECTION_SUBTITLE = 'We\'d love to hear from you. Here\'s how you can reach us.';
const LABEL_ADDRESS = 'Address';
const LABEL_PHONE = 'Phone';
const LABEL_EMAIL = 'Email';
const LABEL_HOURS = 'Working Hours';

// Default fallback values
const DEFAULT_ADDRESS = '123 Fashion Street, Downtown District, City 12345';
const DEFAULT_PHONE = '+381 (62) 822-6474';
const DEFAULT_EMAIL = 'u.baukina@gmail.com';
const DEFAULT_HOURS = 'Mon-Fri: 9:00 AM - 8:00 PM, Sat-Sun: 10:00 AM - 6:00 PM';

// Default coordinates (New York City center as example)
const DEFAULT_LAT = 40.7589;
const DEFAULT_LNG = -73.9851;

// Fetch registry value by key
async function getRegistryValue(key: string, defaultValue: string): Promise<string> {
  try {
    const records = await pb.collection('registry').getFullList<Registry>({
      filter: `key = "${key}"`,
    });
    return records.length > 0 ? records[0].value : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

export default async function ContactsPage() {
  const address = await getRegistryValue('contact_address', DEFAULT_ADDRESS);
  const phone = await getRegistryValue('contact_phone', DEFAULT_PHONE);
  const email = await getRegistryValue('contact_email', DEFAULT_EMAIL);
  const hours = await getRegistryValue('contact_hours', DEFAULT_HOURS);
  const contact_coords = await getRegistryValue('contact_coords', `${DEFAULT_LAT},${DEFAULT_LNG}`);
  const [lat, lng] = contact_coords.split(',');

  return (
    <div>
      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>{PAGE_TITLE}</h1>
        
        <div className={styles.content}>
          <div className={styles.info}>
            <h2 className={styles.sectionTitle}>{SECTION_TITLE}</h2>
            <p className={styles.subtitle}>{SECTION_SUBTITLE}</p>
            
            <div className={styles.contactItem}>
              <h3 className={styles.label}>{LABEL_ADDRESS}</h3>
              <p className={styles.value}>{address}</p>
            </div>
            
            <div className={styles.contactItem}>
              <h3 className={styles.label}>{LABEL_PHONE}</h3>
              <p className={styles.value}>{phone}</p>
            </div>
            
            <div className={styles.contactItem}>
              <h3 className={styles.label}>{LABEL_EMAIL}</h3>
              <p className={styles.value}>
                <a href={`mailto:${email}`} className={styles.emailLink}>
                  {email}
                </a>
              </p>
            </div>
            
            <div className={styles.contactItem}>
              <h3 className={styles.label}>{LABEL_HOURS}</h3>
              <p className={styles.value}>{hours}</p>
            </div>
          </div>
          
          <div className={styles.mapWrapper}>
            <GoogleMap
              lat={parseFloat(lat)}
              lng={parseFloat(lng)}
              title="Location map"
              className={styles.map}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

