export default function AdminProductHeader({ onAddProductClick }) {
  return (
    <div className="product-admin-header-wrap">
      <div className="product-admin-header-text">
        <p className="product-admin-eyebrow">KATALOG</p>
        <h1 className="product-admin-page-title">Daftar Produk</h1>
        <p className="product-admin-page-desc">
          Kelola informasi, harga, dan ketersediaan produk Rasa Pulang.
        </p>
      </div>

      <button
        type="button"
        className="product-admin-btn-primary"
        onClick={onAddProductClick}
        aria-label="Tambah Produk Baru"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span>Tambah Produk</span>
      </button>
    </div>
  );
}
