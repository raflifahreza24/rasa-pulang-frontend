export default function ProductDisplaySettingsSection({
  availability = 'Tersedia',
  isPublished = false,
  isFeatured = false,
  featuredSlotUsage = { used: 7, max: 8, isFull: false },
  onAvailabilityChange,
  onPublishedChange,
  onFeaturedChange,
}) {
  const isSlotFull = featuredSlotUsage.isFull && !isFeatured;

  return (
    <section className="create-product-card-section" aria-labelledby="section-display-title">
      <div className="create-product-section-header">
        <h2 id="section-display-title" className="create-product-section-title">
          5. Pengaturan Tampilan
        </h2>
      </div>

      <div className="create-product-fields-wrap">
        <div className="create-product-grid-3">
          {/* Kolom 1: Ketersediaan */}
          <div className="create-product-form-group">
            <label htmlFor="select-product-availability" className="create-product-label">
              Ketersediaan <span className="text-required">*</span>
            </label>
            <div className="create-product-select-wrap">
              <select
                id="select-product-availability"
                className="create-product-select"
                value={availability}
                onChange={(e) => onAvailabilityChange(e.target.value)}
              >
                <option value="Tersedia">Tersedia</option>
                <option value="Habis">Habis</option>
              </select>
              <svg
                className="create-product-select-chevron"
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
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            <p className="create-product-helper-text">
              Status manual, tanpa pencatatan jumlah stok.
            </p>
          </div>

          {/* Kolom 2: Publikasi */}
          <div className="create-product-form-group">
            <label htmlFor="select-product-publication" className="create-product-label">
              Publikasi <span className="text-required">*</span>
            </label>
            <div className="create-product-select-wrap">
              <select
                id="select-product-publication"
                className="create-product-select"
                value={isPublished ? 'published' : 'hidden'}
                onChange={(e) => onPublishedChange(e.target.value === 'published')}
              >
                <option value="hidden">Disembunyikan</option>
                <option value="published">Ditampilkan</option>
              </select>
              <svg
                className="create-product-select-chevron"
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
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            <p className="create-product-helper-text">
              Produk ditampilkan setelah dipublikasikan dan kategorinya aktif.
            </p>
          </div>

          {/* Kolom 3: Produk Unggulan */}
          <div className="create-product-form-group">
            <label className="create-product-label">
              Produk Unggulan
            </label>
            <div className="create-product-switch-row">
              <label className="create-product-switch-label">
                <input
                  type="checkbox"
                  className="create-product-switch-input"
                  checked={isFeatured}
                  disabled={isSlotFull}
                  onChange={(e) => onFeaturedChange(e.target.checked)}
                  aria-label="Tandai sebagai produk unggulan"
                />
                <span className={`create-product-switch-slider ${isSlotFull ? 'disabled' : ''}`} />
                <span className="create-product-switch-text">
                  {isFeatured ? 'Ya' : 'Tidak'}
                </span>
              </label>
            </div>
            <p className="create-product-helper-text">
              Tampilkan sebagai pilihan unggulan di Beranda.
            </p>
            <p className={`create-product-slot-usage-text ${isSlotFull ? 'full' : ''}`}>
              {featuredSlotUsage.used} dari {featuredSlotUsage.max} slot digunakan
            </p>
            {isSlotFull && (
              <p className="create-product-warning-text" role="note">
                Slot produk unggulan sudah penuh (maksimal 8 produk).
              </p>
            )}
          </div>
        </div>

        {/* Panel Informasi Bawah Panel 5 */}
        <div className="create-product-bottom-note">
          <svg
            className="create-product-note-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>
            Produk habis tetap dapat dipublikasikan. Produk dalam kategori nonaktif tidak terlihat di website publik.
          </span>
        </div>
      </div>
    </section>
  );
}
