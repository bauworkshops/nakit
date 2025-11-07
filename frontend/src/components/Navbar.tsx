import Link from 'next/link';

const BRAND_NAME = 'BAU';

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link href="/" className="logo-link">
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 48 48" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="logo-svg"
          >
            {/* Diamond shape */}
            <path 
              d="M24 4L34 14L24 44L14 14L24 4Z" 
              fill="url(#gradient1)"
              stroke="#d4af37"
              strokeWidth="1.5"
              strokeLinejoin="miter"
            />
            <path 
              d="M14 14L24 24L34 14" 
              stroke="#d4af37"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
            <path 
              d="M24 24L29 34" 
              stroke="#d4af37"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.4"
            />
            <path 
              d="M24 24L19 34" 
              stroke="#d4af37"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.4"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient1" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f4e4c1" />
                <stop offset="50%" stopColor="#e8d5a8" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
          <div className="brand-text">
            <span className="brand-name">{BRAND_NAME}</span>
            <span className="brand-tagline">Fine Jewelry</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

