import styles from './index.module.scss';

// Text constants
const LOCALE = 'en-US';

interface ProductInfoProps {
  title: string;
  price: number;
  description?: string;
}

export function ProductInfo({ title, price, description }: ProductInfoProps) {
  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.price}>{price.toLocaleString(LOCALE)} ₽</p>
      {description && (
        <div>
          <p className={styles.description}>{description}</p>
        </div>
      )}
    </div>
  );
}

