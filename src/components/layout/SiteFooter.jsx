import { siteConfig, navigationLinks } from '../../data/homeData';

export default function SiteFooter({ onNavigate, onContactClick, onInstagramClick }) {
  const handleNavClick = (e, link) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(link.href, link.id);
    }
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="footer-columns-grid">
          {/* Kolom 1: Brand & Tagline */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M16 3L3 13.5V27C3 28.1 3.9 29 5 29H27C28.1 29 29 28.1 29 27V13.5L16 3Z"
                  stroke="#DC722C"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 20C11 17.2 13.2 15 16 15C18.8 15 21 17.2 21 20"
                  stroke="#DC722C"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="11.5" r="2" fill="#DC722C" />
              </svg>
              <span className="footer-brand-name">{siteConfig.storeName}</span>
            </div>
            <p className="footer-tagline">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Kolom 2: Navigasi */}
          <div className="footer-nav-col">
            <h3 className="footer-heading">Navigasi</h3>
            <ul className="footer-link-list">
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Kontak & Informasi */}
          <div className="footer-contact-col">
            <h3 className="footer-heading">Kontak &amp; Informasi</h3>
            <ul className="footer-info-list">
              <li>
                <button
                  type="button"
                  onClick={onContactClick}
                  className="footer-contact-action hover-link-orange"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{siteConfig.contact.phoneDisplay}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onInstagramClick}
                  className="footer-contact-action hover-link-orange"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>Instagram: {siteConfig.contact.instagramHandle}</span>
                </button>
              </li>
              <li className="footer-info-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{siteConfig.operatingHours}</span>
              </li>
              <li className="footer-info-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{siteConfig.city}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Baris Bawah: Hak Cipta & Penafian Simulasi */}
        <div className="footer-bottom-bar">
          <p>{siteConfig.footerDisclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
