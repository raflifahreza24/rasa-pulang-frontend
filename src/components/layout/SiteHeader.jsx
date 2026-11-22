import { useState, useEffect } from 'react';
import { siteConfig, navigationLinks } from '../../data/homeData';

export default function SiteHeader({ activeNav = 'beranda', onNavigate, onContactClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Tutup menu saat menekan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(link.href, link.id);
    }
  };

  return (
    <header className="site-header">
      <div className="site-header-container">
        {/* Logo & Wordmark */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, { id: 'beranda', href: '/' })}
          className="brand-logo-link"
          aria-label="Rasa Pulang — Kembali ke Beranda"
        >
          <svg
            className="brand-logo-icon"
            width="30"
            height="30"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Outline rumah dengan nuansa lokal */}
            <path
              d="M16 3L3 13.5V27C3 28.1 3.9 29 5 29H27C28.1 29 29 28.1 29 27V13.5L16 3Z"
              stroke="#DC722C"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Ikon camilan/kehangatan di dalam rumah */}
            <path
              d="M11 20C11 17.2 13.2 15 16 15C18.8 15 21 17.2 21 20"
              stroke="#DC722C"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="16" cy="11.5" r="2" fill="#DC722C" />
          </svg>
          <span className="brand-wordmark">{siteConfig.storeName}</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Navigasi Utama">
          <ul className="desktop-nav-list">
            {navigationLinks.map((link) => {
              const isActive = activeNav === link.id;
              return (
                <li key={link.id} className="desktop-nav-item">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`desktop-nav-link ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                    {isActive && <span className="nav-active-indicator" aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop CTA Button */}
        <div className="header-action-wrapper">
          <button
            type="button"
            onClick={onContactClick}
            className="header-contact-btn hover-button-outline"
            aria-label="Hubungi kami melalui WhatsApp"
          >
            {/* Ikon WhatsApp */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Hubungi Kami</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="mobile-drawer-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi mobile"
          >
            <nav className="mobile-nav">
              <ul className="mobile-nav-list">
                {navigationLinks.map((link) => {
                  const isActive = activeNav === link.id;
                  return (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                        className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mobile-drawer-cta">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="mobile-contact-btn hover-button-solid"
              >
                Hubungi via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
