import { storeLocationData, siteConfig } from '../../data/homeData';
import ImageWithFallback from '../ui/ImageWithFallback';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function StoreLocationSection({ onLocationClick }) {
  const sectionRef = useScrollReveal();

  return (
    <section id="kontak" className="location-section" aria-labelledby="location-heading" ref={sectionRef}>
      <div className="section-container">
        <div className="location-card reveal-init">
          {/* Kolom Kiri: Informasi Toko */}
          <div className="location-info">
            <h2 id="location-heading" className="location-title">
              {storeLocationData.title}
            </h2>

            <div className="location-details-list">
              {/* Item 1: Kota & Badge Simulasi */}
              <div className="location-detail-item">
                <div className="detail-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC722C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="detail-primary-text">
                    {storeLocationData.city}
                  </p>
                  <p className="detail-secondary-text">
                    {storeLocationData.simulationBadge}
                  </p>
                </div>
              </div>

              {/* Item 2: Alamat Toko */}
              <div className="location-detail-item">
                <div className="detail-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC722C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div>
                  <p className="detail-primary-text">
                    {storeLocationData.address}
                  </p>
                </div>
              </div>

              {/* Item 3: Jam Operasional */}
              <div className="location-detail-item">
                <div className="detail-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC722C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <p className="detail-primary-text">
                    {storeLocationData.operatingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Tombol Aksi Lokasi */}
            <div className="location-actions">
              <button
                type="button"
                onClick={onLocationClick}
                className="location-btn-primary hover-button-solid"
              >
                {storeLocationData.ctaPrimary}
              </button>
              <a
                href={siteConfig.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="location-btn-secondary hover-button-outline"
                aria-label="Buka lokasi di Google Maps (tab baru)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                <span>{storeLocationData.ctaSecondary}</span>
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Foto Depan Toko */}
          <div className="location-image-wrapper">
            <div className="location-image-frame">
              <ImageWithFallback
                src={storeLocationData.image}
                alt={storeLocationData.imageAlt}
                aspectRatio="16 / 11"
                placeholderLabel="Foto tampak depan toko"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
