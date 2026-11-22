export default function ProductInformationSection({
  description,
  ingredients,
  shelfLife,
  errors = {},
  onDescriptionChange,
  onIngredientsChange,
  onShelfLifeChange,
}) {
  return (
    <section className="create-product-card-section" aria-labelledby="section-info-title">
      <div className="create-product-section-header">
        <h2 id="section-info-title" className="create-product-section-title">
          3. Informasi Produk
        </h2>
      </div>

      <div className="create-product-fields-wrap">
        {/* Deskripsi Produk (Selebar Panel) */}
        <div className="create-product-form-group">
          <label htmlFor="textarea-product-desc" className="create-product-label">
            Deskripsi Produk <span className="text-required">*</span>
          </label>
          <textarea
            id="textarea-product-desc"
            rows={3}
            className={`create-product-textarea ${errors.description ? 'has-error' : ''}`}
            placeholder="Jelaskan produk, rasa, dan karakteristiknya..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            aria-invalid={errors.description ? 'true' : undefined}
            aria-describedby={errors.description ? 'error-product-desc' : undefined}
          />
          {errors.description && (
            <p id="error-product-desc" className="create-product-error-text" role="alert">
              {errors.description}
            </p>
          )}
        </div>

        {/* Komposisi & Daya Simpan (2 Kolom Desktop) */}
        <div className="create-product-grid-2">
          {/* Komposisi */}
          <div className="create-product-form-group">
            <label htmlFor="textarea-product-ingredients" className="create-product-label">
              Komposisi
            </label>
            <textarea
              id="textarea-product-ingredients"
              rows={3}
              className="create-product-textarea"
              placeholder="Contoh: Pisang, minyak nabati, gula"
              value={ingredients}
              onChange={(e) => onIngredientsChange(e.target.value)}
            />
          </div>

          {/* Daya Simpan & Penyimpanan */}
          <div className="create-product-form-group">
            <label htmlFor="textarea-product-shelflife" className="create-product-label">
              Daya Simpan & Penyimpanan
            </label>
            <textarea
              id="textarea-product-shelflife"
              rows={3}
              className="create-product-textarea"
              placeholder="Tuliskan perkiraan daya simpan dan cara penyimpanan..."
              value={shelfLife}
              onChange={(e) => onShelfLifeChange(e.target.value)}
            />
          </div>
        </div>

        <p className="create-product-helper-text">
          Komposisi dan daya simpan dapat dikosongkan jika belum tersedia.
        </p>
      </div>
    </section>
  );
}
