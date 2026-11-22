export default function CatalogEmptyState({ onReset }) {
  return (
    <div className="catalog-empty-state" role="status" aria-live="polite">
      <div className="empty-state-icon">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#DC722C"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </div>
      <h2 className="empty-state-title">
        Produk tidak ditemukan
      </h2>
      <p className="empty-state-description">
        Coba gunakan kata kunci lain atau pilih kategori yang berbeda.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="empty-state-reset-btn hover-button-solid"
      >
        Lihat Semua Produk
      </button>
    </div>
  );
}
