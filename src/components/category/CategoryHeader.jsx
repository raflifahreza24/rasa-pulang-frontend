export default function CategoryHeader({ onAddClick }) {
  return (
    <div className="category-header-wrap">
      <div className="category-header-text">
        <p className="category-eyebrow">KATALOG</p>
        <h1 className="category-page-title">Kategori Produk</h1>
        <p className="category-page-desc">
          Kelola pengelompokan produk agar pelanggan mudah menemukan camilan favoritnya.
        </p>
      </div>

      <button
        type="button"
        className="category-btn-primary"
        onClick={onAddClick}
        aria-label="Tambah Kategori Baru"
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
        <span>Tambah Kategori</span>
      </button>
    </div>
  );
}
