'use client';

// Text constants
const ERROR_TITLE = 'Error';
const ERROR_DEFAULT_MESSAGE = 'Something went wrong';
const TRY_AGAIN_BUTTON = 'Try again';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px', color: 'var(--color-error)' }}>
        {ERROR_TITLE}
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '30px', color: 'var(--color-text)' }}>
        {error.message || ERROR_DEFAULT_MESSAGE}
      </p>
      <button
        onClick={reset}
        style={{
          padding: '12px 24px',
          background: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
        }}
      >
        {TRY_AGAIN_BUTTON}
      </button>
    </div>
  );
}

