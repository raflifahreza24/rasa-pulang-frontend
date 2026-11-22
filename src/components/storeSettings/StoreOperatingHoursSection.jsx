export default function StoreOperatingHoursSection({
  openingHours,
  onChangeOpeningHours,
  errors,
}) {
  return (
    <section className="store-settings-card" aria-labelledby="hours-heading">
      <div className="store-settings-card-header">
        <h2 id="hours-heading" className="store-settings-card-title">
          3. Jam Operasional
        </h2>
        <p className="store-settings-card-desc">
          Tuliskan hari dan jam layanan toko.
        </p>
      </div>

      <div className="store-settings-form-group">
        <label htmlFor="store-hours-input" className="store-settings-label">
          Jam Operasional <span className="store-settings-required">*</span>
        </label>
        <input
          id="store-hours-input"
          type="text"
          className={`store-settings-input ${errors.openingHours ? 'is-invalid' : ''}`}
          value={openingHours}
          onChange={(e) => onChangeOpeningHours(e.target.value)}
          placeholder="Contoh: Senin–Minggu · 08.00–20.00 WIB"
          aria-invalid={!!errors.openingHours}
          aria-describedby={errors.openingHours ? 'store-hours-error' : 'store-hours-hint'}
        />
        {errors.openingHours ? (
          <span id="store-hours-error" className="store-settings-field-error">
            {errors.openingHours}
          </span>
        ) : (
          <span id="store-hours-hint" className="store-settings-field-hint">
            Gunakan format yang mudah dipahami pelanggan.
          </span>
        )}
      </div>
    </section>
  );
}
