import { contactInformationData } from '../../data/contactData';

export default function ContactInformationPanel({
  onWhatsAppClick,
  onInstagramClick,
  onGoogleMapsClick,
}) {
  const { address, operatingHours, whatsApp, instagram, googleMaps } = contactInformationData;

  return (
    <div className="contact-info-panel" aria-labelledby="contact-info-heading">
      <h2 id="contact-info-heading" className="sr-only">
        Informasi Kontak dan Lokasi Toko
      </h2>

      {/* 1. Alamat Toko */}
      <section className="contact-item-row" aria-labelledby="heading-address">
        <div className="contact-icon-circle" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div className="contact-item-content">
          <h3 id="heading-address" className="contact-item-title">
            {address.label}
          </h3>
          <p className="contact-item-text contact-address-text">
            {address.value}
          </p>
          <p className="contact-item-note">
            {address.note}
          </p>
        </div>
      </section>

      {/* 2. Jam Operasional */}
      <section className="contact-item-row" aria-labelledby="heading-hours">
        <div className="contact-icon-circle" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div className="contact-item-content">
          <h3 id="heading-hours" className="contact-item-title">
            {operatingHours.label}
          </h3>
          <div className="contact-hours-row">
            <span className="contact-hours-days">{operatingHours.days}</span>
            <span className="contact-hours-time">{operatingHours.hours}</span>
          </div>
          <p className="contact-item-note">
            {operatingHours.note}
          </p>
        </div>
      </section>

      {/* 3. WhatsApp */}
      <section className="contact-item-row" aria-labelledby="heading-whatsapp">
        <div className="contact-icon-circle" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </div>
        <div className="contact-item-content">
          <h3 id="heading-whatsapp" className="contact-item-title">
            {whatsApp.label}
          </h3>
          <p className="contact-item-text">
            {whatsApp.description}
          </p>
          <p className="contact-item-note">
            {whatsApp.status}
          </p>
          <div className="contact-btn-wrapper">
            <button
              type="button"
              onClick={onWhatsAppClick}
              className="contact-btn-wa hover-button-solid"
              aria-label="Hubungi toko Rasa Pulang melalui WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>{whatsApp.buttonText}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Instagram */}
      <section className="contact-item-row" aria-labelledby="heading-instagram">
        <div className="contact-icon-circle" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </div>
        <div className="contact-item-content">
          <h3 id="heading-instagram" className="contact-item-title">
            {instagram.label}
          </h3>
          <p className="contact-item-text">
            {instagram.description}
          </p>
          <p className="contact-item-note">
            {instagram.status}
          </p>
          <div className="contact-btn-wrapper">
            <button
              type="button"
              onClick={onInstagramClick}
              className="contact-btn-outline hover-button-outline"
              aria-label="Lihat akun Instagram Rasa Pulang"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>{instagram.buttonText}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Lokasi di Google Maps */}
      <section className="contact-item-row contact-item-row-last" aria-labelledby="heading-maps">
        <div className="contact-icon-circle" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div className="contact-item-content">
          <h3 id="heading-maps" className="contact-item-title">
            {googleMaps.label}
          </h3>
          <p className="contact-item-text">
            {googleMaps.description}
          </p>
          <div className="contact-btn-wrapper">
            <button
              type="button"
              onClick={onGoogleMapsClick}
              className="contact-btn-outline hover-button-outline"
              aria-label="Buka petunjuk lokasi toko di Google Maps"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{googleMaps.buttonText}</span>
            </button>
          </div>
          <p className="contact-item-note contact-maps-note">
            {googleMaps.note}
          </p>
        </div>
      </section>
    </div>
  );
}
