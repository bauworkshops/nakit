import { Navbar } from '@/components/Navbar';
import styles from './page.module.scss';

const LOADING_TEXT = 'Loading shop...';

export default function Loading() {
  return (
    <div>
      <Navbar />
      <main className={styles.detail}>
        <div className={styles.content}>
          <div className={styles.info}>
            <p>{LOADING_TEXT}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

