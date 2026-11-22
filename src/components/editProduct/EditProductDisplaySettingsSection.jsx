/**
 * Panel 5: Pengaturan Tampilan (Khusus Halaman Edit Produk)
 * Mengatur Ketersediaan, Publikasi, serta Toggle Switch Produk Unggulan
 * dengan kalkulasi kapasitas slot slot unggulan yang memperhitungkan status produk saat ini.
 */
export default function EditProductDisplaySettingsSection({
  availability,
  publication,
  isFeatured,
  slotUsage,
  onAvailabilityChange,
  onPublicationChange,
  onFeaturedChange,
}) {
  // Apakah switch dapat diaktifkan:
  // Jika produk sudah berstatus unggulan, mempertahankan status unggulan tidak membutuhkan slot baru.
  // Jika produk bukan unggulan, switch dinonaktifkan jika slot penuh (8/8).
  const isToggleDisabled = !isFeatured && !slotUsage.canEnable;

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
              <span className="create-product-select-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
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
                value={publication}
                onChange={(e) => onPublicationChange(e.target.value)}
              >
                <option value="Ditampilkan">Ditampilkan</option>
                <option value="Disembunyikan">Disembunyikan</option>
              </select>
              <span className="create-product-select-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
            <p className="create-product-helper-text">
              Produk tampil jika kategori aktif.
            </p>
          </div>

          {/* Kolom 3: Produk Unggulan */}
          <div className="create-product-form-group">
            <span className="create-product-label">
              Produk Unggulan
            </span>
            <div className="create-product-toggle-row">
              <label className={`create-product-switch ${isToggleDisabled ? 'disabled' : ''}`}>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  disabled={isToggleDisabled}
                  onChange={(e) => onFeaturedChange(e.target.checked)}
                  aria-label="Jadikan produk unggulan di Beranda"
                />
                <span className="create-product-slider" />
              </label>
              <span className="create-product-toggle-state-text">
                {isFeatured ? 'Ya' : 'Tidak'}
              </span>
            </div>
            <p className="create-product-helper-text">
              Tampilkan sebagai pilihan unggulan di Beranda.
            </p>
            {/* Slot Unggulan Counter */}
            <div className="edit-product-slot-info-row">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#DC722C"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span className="create-product-featured-usage highlight">
                {isFeatured && slotUsage.isCurrentlyFeatured
                  ? `${slotUsage.totalUsed} dari ${slotUsage.max} slot digunakan, termasuk produk ini.`
                  : isFeatured && !slotUsage.isCurrentlyFeatured
                  ? `${slotUsage.otherUsed + 1} dari ${slotUsage.max} slot digunakan, termasuk produk ini.`
                  : `${slotUsage.otherUsed} dari ${slotUsage.max} slot digunakan.`}
              </span>
            </div>
          </div>
        </div>

        {/* Info Box di Bawah Pengaturan Tampilan */}
        <div className="create-product-info-alert">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8C7362"
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
