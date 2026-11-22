export default function ProductPricingSection({
  price,
  weight,
  errors = {},
  onPriceChange,
  onWeightChange,
}) {
  // Format pemisah ribuan visual (misal 25.000) tanpa mengubah nilai numerik dasar
  const displayPrice = (() => {
    if (price === '' || price === null || price === undefined) return '';
    const num = typeof price === 'number' ? price : Number(String(price).replace(/\D/g, ''));
    if (isNaN(num)) return '';
    return new Intl.NumberFormat('id-ID').format(num);
  })();

  return (
    <section className="create-product-card-section" aria-labelledby="section-pricing-title">
      <div className="create-product-section-header">
        <h2 id="section-pricing-title" className="create-product-section-title">
          2. Harga dan Berat
        </h2>
      </div>

      <div className="create-product-fields-wrap">
        <div className="create-product-grid-2">
          {/* Harga per Kemasan */}
          <div className="create-product-form-group">
            <label htmlFor="input-product-price" className="create-product-label">
              Harga per Kemasan <span className="text-required">*</span>
            </label>
            <div className={`create-product-affix-wrap prefix ${errors.price ? 'has-error' : ''}`}>
              <span className="create-product-affix-label prefix" aria-hidden="true">
                Rp
              </span>
              <input
                id="input-product-price"
                type="text"
                inputMode="numeric"
                className="create-product-input with-prefix"
                placeholder="0"
                value={displayPrice}
                onChange={(e) => {
                  // Ekstrak digit mentah murni
                  const val = e.target.value.replace(/\D/g, '');
                  onPriceChange(val);
                }}
                aria-invalid={errors.price ? 'true' : undefined}
                aria-describedby="helper-product-price"
              />
            </div>
            {errors.price ? (
              <p id="error-product-price" className="create-product-error-text" role="alert">
                {errors.price}
              </p>
            ) : (
              <p id="helper-product-price" className="create-product-helper-text">
                Harga harus lebih besar dari 0.
              </p>
            )}
          </div>

          {/* Berat Bersih */}
          <div className="create-product-form-group">
            <label htmlFor="input-product-weight" className="create-product-label">
              Berat Bersih <span className="text-required">*</span>
            </label>
            <div className={`create-product-affix-wrap suffix ${errors.weight ? 'has-error' : ''}`}>
              <input
                id="input-product-weight"
                type="text"
                inputMode="numeric"
                className="create-product-input with-suffix"
                placeholder="0"
                value={weight}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  onWeightChange(val);
                }}
                aria-invalid={errors.weight ? 'true' : undefined}
                aria-describedby="helper-product-weight"
              />
              <span className="create-product-affix-label suffix" aria-hidden="true">
                gram
              </span>
            </div>
            {errors.weight ? (
              <p id="error-product-weight" className="create-product-error-text" role="alert">
                {errors.weight}
              </p>
            ) : (
              <p id="helper-product-weight" className="create-product-helper-text">
                Masukkan berat bersih dalam gram.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
