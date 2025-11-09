'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Logo } from '../Logo';
import styles from './index.module.scss';

// Text constants
const MENU_CATALOGUE = 'Catalogue';
const MENU_COLLECTIONS = 'Collections';
const MENU_PACKAGING = 'Packaging';
const MENU_SHOPS = 'Shops';
const MENU_CONTACTS = 'Contacts';
const ARIA_LABEL_MENU = 'Toggle menu';
const ARIA_LABEL_CLOSE = 'Close menu';

interface NavbarProps {
  enhancedHover?: boolean;
}

export function Navbar({ enhancedHover = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.content}>
          <Link href="/" className={styles.logoLink}>
            <Logo framed={false} className={styles.logoSvg} />
          </Link>
          
          {/* Desktop menu */}
          <ul className={styles.menu}>
            <li>
              <Link 
                href="/catalogue" 
                className={clsx(styles.menuLink, enhancedHover && styles.menuLinkEnhanced)}
              >
                {MENU_CATALOGUE}
              </Link>
            </li>
            <li>
              <Link 
                href="/collections" 
                className={clsx(styles.menuLink, enhancedHover && styles.menuLinkEnhanced)}
              >
                {MENU_COLLECTIONS}
              </Link>
            </li>
            <li>
              <Link 
                href="/packaging" 
                className={clsx(styles.menuLink, enhancedHover && styles.menuLinkEnhanced)}
              >
                {MENU_PACKAGING}
              </Link>
            </li>
            <li>
              <Link 
                href="/shops" 
                className={clsx(styles.menuLink, enhancedHover && styles.menuLinkEnhanced)}
              >
                {MENU_SHOPS}
              </Link>
            </li>
            <li>
              <Link 
                href="/contacts" 
                className={clsx(styles.menuLink, enhancedHover && styles.menuLinkEnhanced)}
              >
                {MENU_CONTACTS}
              </Link>
            </li>
          </ul>

          {/* Hamburger button for mobile */}
          <button 
            className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}
            onClick={toggleMenu}
            aria-label={isOpen ? ARIA_LABEL_CLOSE : ARIA_LABEL_MENU}
            aria-expanded={isOpen}
          >
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 32 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={styles.hamburgerIcon}
            >
              {/* Diamond/Gem inspired hamburger icon */}
              <g className={styles.hamburgerLines}>
                <path 
                  className={styles.line1}
                  d="M6 10 L16 10 L26 10" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
                <path 
                  className={styles.line2}
                  d="M6 16 L26 16" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
                <path 
                  className={styles.line3}
                  d="M6 22 L16 22 L26 22" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div 
          className={styles.overlay} 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.sidebarHeader}>
            <Logo framed={false} className={styles.sidebarLogo} />
            <button 
              className={styles.closeButton}
              onClick={closeMenu}
              aria-label={ARIA_LABEL_CLOSE}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M18 6L6 18M6 6L18 18" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <ul className={styles.sidebarMenu}>
            <li>
              <Link href="/catalogue" className={styles.sidebarLink} onClick={closeMenu}>
                {MENU_CATALOGUE}
              </Link>
            </li>
            <li>
              <Link href="/collections" className={styles.sidebarLink} onClick={closeMenu}>
                {MENU_COLLECTIONS}
              </Link>
            </li>
            <li>
              <Link href="/packaging" className={styles.sidebarLink} onClick={closeMenu}>
                {MENU_PACKAGING}
              </Link>
            </li>
            <li>
              <Link href="/shops" className={styles.sidebarLink} onClick={closeMenu}>
                {MENU_SHOPS}
              </Link>
            </li>
            <li>
              <Link href="/contacts" className={styles.sidebarLink} onClick={closeMenu}>
                {MENU_CONTACTS}
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

