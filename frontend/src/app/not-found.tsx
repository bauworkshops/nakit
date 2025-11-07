import Link from 'next/link';

// Text constants
const NOT_FOUND_CODE = '404';
const PAGE_NOT_FOUND = 'Page not found';
const BACK_TO_HOME = '← Return to home';

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>{NOT_FOUND_CODE}</h1>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#666' }}>
        {PAGE_NOT_FOUND}
      </h2>
      <Link href="/" className="back-link">
        {BACK_TO_HOME}
      </Link>
    </div>
  );
}

