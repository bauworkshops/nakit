'use client';

// Text constants
const LOADING_TEXT = 'Loading...';

export default function Loading() {
  return (
    <div className="loading">
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{
          border: '4px solid var(--color-border)',
          borderTop: '4px solid var(--color-primary)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }} />
        <p style={{ color: 'var(--color-text-light)', fontSize: '18px' }}>{LOADING_TEXT}</p>
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

