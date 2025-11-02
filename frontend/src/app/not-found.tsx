import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>404</h1>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#666' }}>
        Страница не найдена
      </h2>
      <Link href="/" className="back-link">
        ← Вернуться на главную
      </Link>
    </div>
  );
}

