import { categoriesData } from '../../data/productsData';

export default function ProductIdentitySection({
  name,
  sku,
  categoryId,
  errors = {},
  onNameChange,
  onSkuChange,
  onCategoryChange,
}) {
  const selectedCategory = categoriesData.find((c) => c.id === categoryId);
  const isSelectedCategoryInactive = selectedCategory && !selectedCategory.isActive;

  return (
    <section className="create-product-card-section" aria-labelledby="section-identity-title">
      <div className="create-product-section-header">
        <h2 id="section-identity-title" className="create-product-section-title">
          1. Identitas Produk
        </h2>
        <p className="create-product-section-subtitle">
          Informasi dasar untuk mengenali produk.
        </p>
      </div>

      <div className="create-product-fields-wrap">
        {/* Baris 1: Nama Produk & SKU (2 Kolom Desktop) */}
        <div className="create-product-grid-2">
          {/* Nama Produk */}
          <div className="create-product-form-group">
            <label htmlFor="input-product-name" className="create-product-label">
              Nama Produk <span className="text-required">*</span>
            </label>
            <input
              id="input-product-name"
              type="text"
              className={`create-product-input ${errors.name ? 'has-error' : ''}`}
              placeholder="Contoh: Keripik Pisang Original 250 g"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              aria-invalid={errors.name ? 'true' : undefined}
              aria-describedby={errors.name ? 'error-product-name' : undefined}
            />
            {errors.name && (
              <p id="error-product-name" className="create-product-error-text" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* SKU / Kode Produk */}
          <div className="create-product-form-group">
            <label htmlFor="input-product-sku" className="create-product-label">
              SKU / Kode Produk <span className="text-required">*</span>
            </label>
            <input
              id="input-product-sku"
              type="text"
              className={`create-product-input ${errors.sku ? 'has-error' : ''}`}
              placeholder="Contoh: RP-041"
              value={sku}
              onChange={(e) => onSkuChange(e.target.value)}
              aria-invalid={errors.sku ? 'true' : undefined}
              aria-describedby="helper-product-sku"
            />
            {errors.sku ? (
              <p id="error-product-sku" className="create-product-error-text" role="alert">
                {errors.sku}
              </p>
            ) : (
              <p id="helper-product-sku" className="create-product-helper-text">
                Kode harus unik untuk setiap produk.
              </p>
            )}
          </div>
        </div>

        {/* Baris 2: Kategori (Selebar Panel) */}
        <div className="create-product-form-group">
          <label htmlFor="select-product-category" className="create-product-label">
            Kategori <span className="text-required">*</span>
          </label>
          <div className="create-product-select-wrap">
            <select
              id="select-product-category"
              className={`create-product-select ${errors.categoryId ? 'has-error' : ''}`}
              value={categoryId}
              onChange={(e) => onCategoryChange(e.target.value)}
              aria-invalid={errors.categoryId ? 'true' : undefined}
              aria-describedby="helper-product-category"
            >
              <option value="">Pilih kategori</option>
              {categoriesData.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} {!cat.isActive ? '(Nonaktif)' : ''}
                </option>
              ))}
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

          {errors.categoryId ? (
            <p id="error-product-category" className="create-product-error-text" role="alert">
              {errors.categoryId}
            </p>
          ) : (
            <p id="helper-product-category" className="create-product-helper-text">
              Satu produk hanya memiliki satu kategori. Setiap rasa dan ukuran dibuat sebagai produk terpisah.
            </p>
          )}

          {/* Peringatan jika kategori yang dipilih nonaktif */}
          {isSelectedCategoryInactive && (
            <p className="create-product-warning-text" role="note">
              Produk dalam kategori nonaktif tidak terlihat di website publik.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
