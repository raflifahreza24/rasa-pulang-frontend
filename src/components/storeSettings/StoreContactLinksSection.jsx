export default function StoreContactLinksSection({
  whatsappNumber,
  onChangeWhatsApp,
  instagramUrl,
  onChangeInstagram,
  googleMapsUrl,
  onChangeGoogleMaps,
  onOpenMaps,
  errors,
}) {
  const isWhatsAppFilled = Boolean(whatsappNumber && String(whatsappNumber).trim() !== '');
  const isInstagramFilled = Boolean(instagramUrl && String(instagramUrl).trim() !== '');

  // Helper text dinamis untuk Maps
  const isSidoarjoDefault = Boolean(
    googleMapsUrl && googleMapsUrl.toLowerCase().includes('sidoarjo')
  );

  return (
    <section className="store-settings-card" aria-labelledby="contact-heading">
      <div className="store-settings-card-header">
        <h2 id="contact-heading" className="store-settings-card-title">
          4. Kontak dan Tautan
        </h2>
        <p className="store-settings-card-desc">
          Tujuan komunikasi dan lokasi pada website publik.
        </p>
      </div>

      <div className="store-settings-contact-list">
        {/* A. Nomor WhatsApp */}
        <div className="store-settings-contact-block">
          <div className="store-settings-contact-label-row">
            <div className="store-settings-contact-label-left">
              <span className="store-settings-contact-icon" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2D2319"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </span>
              <label htmlFor="whatsapp-input" className="store-settings-label store-settings-label-inline">
                Nomor WhatsApp
              </label>
            </div>
            <span className="store-settings-status-badge">
              {isWhatsAppFilled ? 'Nomor disetel · kontak simulasi' : 'Belum diisi · kontak simulasi'}
            </span>
          </div>

          <input
            id="whatsapp-input"
            type="text"
            inputMode="numeric"
            className={`store-settings-input ${errors.whatsappNumber ? 'is-invalid' : ''}`}
            value={whatsappNumber || ''}
            onChange={(e) => onChangeWhatsApp(e.target.value)}
            placeholder="Contoh format: 628xxxxxxxxxx"
            aria-invalid={!!errors.whatsappNumber}
            aria-describedby={errors.whatsappNumber ? 'wa-error' : 'wa-hint'}
          />

          {errors.whatsappNumber ? (
            <span id="wa-error" className="store-settings-field-error">
              {errors.whatsappNumber}
            </span>
          ) : (
            <span id="wa-hint" className="store-settings-field-hint">
              Gunakan format internasional, diawali 62 tanpa tanda +, spasi, atau angka 0 di depan.
            </span>
          )}

          <div className="store-settings-notice-box store-settings-notice-box-compact">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#A64B17"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>Perubahan nomor WhatsApp berlaku pada seluruh tombol WhatsApp di website.</span>
          </div>
        </div>

        {/* B. Tautan Instagram */}
        <div className="store-settings-contact-block">
          <div className="store-settings-contact-label-row">
            <div className="store-settings-contact-label-left">
              <span className="store-settings-contact-icon" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2D2319"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </span>
              <label htmlFor="instagram-input" className="store-settings-label store-settings-label-inline">
                Tautan Instagram
              </label>
            </div>
            <span className="store-settings-status-badge">
              {isInstagramFilled ? 'Tautan disetel · akun simulasi' : 'Belum diisi · akun simulasi'}
            </span>
          </div>

          <input
            id="instagram-input"
            type="url"
            className={`store-settings-input ${errors.instagramUrl ? 'is-invalid' : ''}`}
            value={instagramUrl || ''}
            onChange={(e) => onChangeInstagram(e.target.value)}
            placeholder="https://www.instagram.com/namaakun/"
            aria-invalid={!!errors.instagramUrl}
            aria-describedby={errors.instagramUrl ? 'ig-error' : 'ig-hint'}
          />

          {errors.instagramUrl ? (
            <span id="ig-error" className="store-settings-field-error">
              {errors.instagramUrl}
            </span>
          ) : (
            <span id="ig-hint" className="store-settings-field-hint">
              Masukkan tautan profil Instagram toko.
            </span>
          )}
        </div>

        {/* C. Tautan Google Maps */}
        <div className="store-settings-contact-block">
          <div className="store-settings-contact-label-row">
            <div className="store-settings-contact-label-left">
              <span className="store-settings-contact-icon" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2D2319"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <label htmlFor="maps-input" className="store-settings-label store-settings-label-inline">
                Tautan Google Maps
              </label>
            </div>
          </div>

          <input
            id="maps-input"
            type="url"
            className={`store-settings-input ${errors.googleMapsUrl ? 'is-invalid' : ''}`}
            value={googleMapsUrl || ''}
            onChange={(e) => onChangeGoogleMaps(e.target.value)}
            placeholder="https://www.google.com/maps/search/?api=1&query=Sidoarjo"
            aria-invalid={!!errors.googleMapsUrl}
            aria-describedby={errors.googleMapsUrl ? 'maps-error' : 'maps-hint'}
          />

          {errors.googleMapsUrl ? (
            <span id="maps-error" className="store-settings-field-error">
              {errors.googleMapsUrl}
            </span>
          ) : (
            <span id="maps-hint" className="store-settings-field-hint">
              {isSidoarjoDefault
                ? 'Untuk demo, tautan mengarah ke pencarian wilayah Sidoarjo.'
                : 'Tautan lokasi toko di Google Maps.'}
            </span>
          )}

          <div className="store-settings-maps-action">
            <button
              type="button"
              onClick={onOpenMaps}
              className="store-settings-btn-open-maps"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Buka Tautan Maps
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
