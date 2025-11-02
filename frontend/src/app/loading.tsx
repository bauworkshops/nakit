'use client';

export default function Loading() {
  return (
    <div className="loading">
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #d4af37',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }} />
        <p style={{ color: '#999', fontSize: '18px' }}>Загрузка...</p>
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

