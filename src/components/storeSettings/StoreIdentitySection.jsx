import { useRef } from 'react';
import ImageWithFallback from '../ui/ImageWithFallback';

export default function StoreIdentitySection({
  storeName,
  logo,
  onChangeStoreName,
  onLogoChange,
  onLogoReset,
  hasCustomLogo,
  errors,
}) {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onLogoChange(file);
    }
  };

  return (
    <section className="store-settings-card" aria-labelledby="identity-heading">
      <div className="store-settings-card-header">
        <h2 id="identity-heading" className="store-settings-card-title">
          1. Identitas Toko
        </h2>
        <p className="store-settings-card-desc">
          Nama dan logo yang digunakan pada website.
        </p>
      </div>

      <div className="store-settings-identity-grid">
        {/* Kolom Kiri: Nama Toko (~60%) */}
        <div className="store-settings-form-col">
          <div className="store-settings-form-group">
            <label htmlFor="store-name-input" className="store-settings-label">
              Nama Toko <span className="store-settings-required">*</span>
            </label>
            <input
              id="store-name-input"
              type="text"
              className={`store-settings-input ${errors.storeName ? 'is-invalid' : ''}`}
              value={storeName}
              onChange={(e) => onChangeStoreName(e.target.value)}
              placeholder="Contoh: Rasa Pulang"
              aria-invalid={!!errors.storeName}
              aria-describedby={errors.storeName ? 'store-name-error' : undefined}
            />
            {errors.storeName && (
              <span id="store-name-error" className="store-settings-field-error">
                {errors.storeName}
              </span>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Logo Toko (~40%) */}
        <div className="store-settings-logo-col">
          <label className="store-settings-label">Logo Toko</label>

          {/* Kotak Pratinjau Logo */}
          <div className="store-settings-logo-preview-box">
            <ImageWithFallback
              src={logo}
              alt={storeName || 'Logo Rasa Pulang'}
              fallbackText="Logo toko"
              className="store-settings-logo-img"
            />
          </div>

          {/* Tombol Aksi Upload */}
          <div className="store-settings-logo-actions">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="store-settings-hidden-file"
              aria-label="Pilih berkas logo toko"
            />
            <button
              type="button"
              onClick={handleUploadClick}
              className="store-settings-btn-upload"
            >
              <svg
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Ganti Logo Toko
            </button>

            {hasCustomLogo && (
              <button
                type="button"
                onClick={onLogoReset}
                className="store-settings-btn-reset-logo"
                title="Batalkan penggantian logo"
              >
                Batalkan Penggantian
              </button>
            )}
          </div>

          <div className="store-settings-logo-hints">
            <p className="store-settings-hint-text">
              JPG, PNG, atau WebP · Maksimal 2 MB.
            </p>
            <p className="store-settings-hint-text">
              Gunakan logo yang jelas dengan latar transparan bila tersedia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
