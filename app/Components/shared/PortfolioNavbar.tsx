'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

type PortfolioNavbarProps = {
  logoHref: string;
  logoText: string;
  items: NavItem[];
  className?: string;
  showThemeToggle?: boolean;
};

export default function PortfolioNavbar({
  logoHref,
  logoText,
  items,
  className,
  showThemeToggle = true,
}: PortfolioNavbarProps) {
  const [menuActive, setMenuActive] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as 'dark' | 'light' | null) || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const renderLink = (item: NavItem, classNames: string, onClick?: () => void) => {
    if (item.external) {
      return (
        <a
          key={item.label}
          href={item.href}
          className={classNames}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link key={item.label} href={item.href} className={classNames} onClick={onClick}>
        {item.label}
      </Link>
    );
  };

  return (
    <>
      <div className={`portfolio-mobile-menu ${menuActive ? 'active' : ''}`}>
        {items.map((item) => renderLink(item, 'portfolio-mobile-link', () => setMenuActive(false)))}
      </div>

      <nav className={`portfolio-nav ${className || ''}`}>
        <Link href={logoHref} className="portfolio-logo magnet">
          {logoText}
        </Link>

        <div className="portfolio-nav-right">
          <div className="portfolio-menu-items">
            {items.map((item) => renderLink(item, 'portfolio-menu-link magnet'))}
          </div>

          {showThemeToggle && (
            <button className="portfolio-theme-btn magnet" onClick={toggleTheme} aria-label="Toggle Theme" type="button">
              <i className={theme === 'light' ? 'ri-sun-line' : 'ri-moon-line'}></i>
            </button>
          )}

          <button className="portfolio-menu-icon" onClick={() => setMenuActive((prev) => !prev)} aria-label="Menu" type="button">
            <i className="ri-menu-4-line"></i>
          </button>
        </div>
      </nav>

      <style jsx>{`
        .portfolio-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 5vw;
          position: fixed;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
          background: var(--nav-bg, rgba(11, 11, 11, 0.8));
          border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.1));
          transition: background 0.5s ease;
        }

        .portfolio-logo {
          font-family: 'Clash Display', sans-serif;
          font-weight: 600;
          font-size: 1.5rem;
          letter-spacing: -0.5px;
          color: inherit;
          text-decoration: none;
        }

        .portfolio-nav-right {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .portfolio-menu-items {
          display: flex;
          gap: 30px;
        }

        .portfolio-menu-link {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
          color: inherit;
          text-decoration: none;
        }

        .portfolio-menu-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--text, #e0e0e0);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s ease;
        }

        .portfolio-menu-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .portfolio-theme-btn {
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: none;
          color: inherit;
        }

        .portfolio-menu-icon {
          display: none;
          font-size: 1.5rem;
          z-index: 102;
          border: none;
          background: none;
          color: inherit;
        }

        .portfolio-mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: var(--bg, #0b0b0b);
          z-index: 101;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 40px;
          transform: translateY(-100%);
          transition: transform 0.6s cubic-bezier(0.7, 0, 0.3, 1);
        }

        .portfolio-mobile-menu.active {
          transform: translateY(0);
        }

        .portfolio-mobile-link {
          font-family: 'Clash Display', sans-serif;
          font-size: 3rem;
          color: var(--text, #e0e0e0);
          text-decoration: none;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .portfolio-menu-items {
            display: none;
          }

          .portfolio-menu-icon {
            display: block;
          }

          .portfolio-nav {
            padding: 20px 5vw;
          }
        }
      `}</style>
    </>
  );
}
