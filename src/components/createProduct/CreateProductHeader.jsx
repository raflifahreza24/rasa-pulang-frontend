export default function CreateProductHeader({ onBackClick }) {
  return (
    <div className="create-product-header-wrap">
      <div className="create-product-header-left">
        <p className="create-product-eyebrow">KATALOG</p>
        <h1 className="create-product-page-title">Tambah Produk</h1>
        <p className="create-product-page-desc">
          Lengkapi informasi produk untuk ditampilkan di katalog Rasa Pulang.
        </p>
        <p className="create-product-required-legend">
          Kolom bertanda <span className="text-required">*</span> wajib diisi.
        </p>
      </div>

      <button
        type="button"
        className="create-product-btn-back"
        onClick={onBackClick}
        aria-label="Kembali ke Daftar Produk"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        <span>Kembali ke Daftar</span>
      </button>
    </div>
  );
}
