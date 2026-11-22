export default function ProductNotFound({ onNavigate }) {
  const handleBackToCatalog = () => {
    if (onNavigate) {
      onNavigate('/katalog');
    }
  };

  return (
    <div className="product-not-found-wrapper" role="status" aria-live="polite">
      <div className="not-found-icon-box">
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
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h1 className="not-found-title">
        Produk Tidak Ditemukan
      </h1>
      <p className="not-found-desc">
        Produk yang Anda cari tidak tersedia atau sedang tidak ditampilkan.
      </p>
      <button
        type="button"
        onClick={handleBackToCatalog}
        className="not-found-btn hover-button-solid"
      >
        Kembali ke Katalog
      </button>
    </div>
  );
}
