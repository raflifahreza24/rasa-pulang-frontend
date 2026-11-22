export default function StoreAddressSection({
  address,
  onChangeAddress,
  errors,
}) {
  return (
    <section className="store-settings-card" aria-labelledby="address-heading">
      <div className="store-settings-card-header">
        <h2 id="address-heading" className="store-settings-card-title">
          2. Alamat Toko
        </h2>
        <p className="store-settings-card-desc">
          Informasi lokasi yang ditampilkan kepada pelanggan.
        </p>
      </div>

      <div className="store-settings-form-group">
        <label htmlFor="store-address-input" className="store-settings-label">
          Alamat Lengkap <span className="store-settings-required">*</span>
        </label>
        <textarea
          id="store-address-input"
          rows={3}
          className={`store-settings-textarea ${errors.address ? 'is-invalid' : ''}`}
          value={address}
          onChange={(e) => onChangeAddress(e.target.value)}
          placeholder="Tuliskan alamat lengkap toko..."
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? 'store-address-error' : undefined}
        />
        {errors.address && (
          <span id="store-address-error" className="store-settings-field-error">
            {errors.address}
          </span>
        )}
      </div>

      {/* Catatan Beige Alamat Simulasi */}
      <div className="store-settings-notice-box">
        <svg
          width="18"
          height="18"
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
        <span>Alamat simulasi, bukan lokasi usaha sebenarnya.</span>
      </div>
    </section>
  );
}
