export default function ProductInformation({ product }) {
  const hasDescription = Boolean(product.description);
  const hasIngredients = Boolean(product.ingredients);
  const hasShelfLife = Boolean(product.shelfLifeInfo);

  return (
    <section className="product-info-panel detail-animate-panel" aria-label="Informasi lengkap produk">
      {/* 1. Deskripsi Produk */}
      {hasDescription && (
        <div className="info-subsection">
          <h2 className="info-subsection-title">
            Deskripsi Produk
          </h2>
          <p className="info-subsection-text">
            {product.description}
          </p>
        </div>
      )}

      {/* 2. Komposisi (Opsional) */}
      {hasIngredients && (
        <div className="info-subsection has-top-divider">
          <h2 className="info-subsection-title">
            Komposisi
          </h2>
          <p className="info-subsection-text">
            {product.ingredients}
          </p>
        </div>
      )}

      {/* 3. Daya Simpan & Penyimpanan (Opsional) */}
      {hasShelfLife && (
        <div className="info-subsection has-top-divider">
          <h2 className="info-subsection-title">
            Daya Simpan &amp; Penyimpanan
          </h2>
          <p className="info-subsection-text">
            {product.shelfLifeInfo}
          </p>

          {/* Catatan Informasi Daya Simpan */}
          <div className="shelf-life-notice-box" role="note">
            <svg
              className="notice-info-icon"
              width="20"
              height="20"
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
            <p className="notice-info-text">
              Informasi daya simpan bersifat umum. Tanggal kedaluwarsa per kemasan dikonfirmasi melalui staf toko.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
