import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/">
          <h1>Nakit</h1>
        </Link>
      </div>
    </nav>
  );
}

