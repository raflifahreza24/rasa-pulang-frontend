export default function AdminProductRulesPanel() {
  return (
    <div className="product-admin-rules-card" role="region" aria-label="Catatan Aturan Pengelolaan Produk">
      <div className="product-admin-rules-icon-wrap" aria-hidden="true">
        <svg
          className="product-admin-rules-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </div>

      <div className="product-admin-rules-content">
        <p className="product-admin-rules-text">
          Produk habis tetap dapat ditampilkan. Produk tersembunyi atau berkategori nonaktif tidak terlihat di website publik.
        </p>
        <p className="product-admin-rules-text">
          Produk yang dihapus masuk ke Sampah Produk dan dapat dipulihkan oleh pemilik.
        </p>
      </div>
    </div>
  );
}
