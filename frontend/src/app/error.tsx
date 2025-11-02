'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#e74c3c' }}>
        Ошибка
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '30px', color: '#666' }}>
        {error.message || 'Что-то пошло не так'}
      </p>
      <button
        onClick={reset}
        style={{
          padding: '12px 24px',
          background: '#d4af37',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
        }}
      >
        Попробовать снова
      </button>
    </div>
  );
}

