import Link from 'next/link';
import { Logo } from '../Logo';
import styles from './index.module.scss';

// Text constants
const MENU_CATALOGUE = 'Catalogue';
const MENU_COLLECTIONS = 'Collections';
const MENU_SHOPS = 'Shops';
const MENU_CONTACTS = 'Contacts';

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.content}>
        <Link href="/" className={styles.logoLink}>
          <Logo framed={false} className={styles.logoSvg} />
        </Link>
        
        <ul className={styles.menu}>
          <li><Link href="/catalogue" className={styles.menuLink}>{MENU_CATALOGUE}</Link></li>
          <li><Link href="/collections" className={styles.menuLink}>{MENU_COLLECTIONS}</Link></li>
          <li><Link href="/shops" className={styles.menuLink}>{MENU_SHOPS}</Link></li>
          <li><Link href="/contacts" className={styles.menuLink}>{MENU_CONTACTS}</Link></li>
        </ul>
      </div>
    </nav>
  );
}

