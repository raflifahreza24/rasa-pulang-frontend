/**
 * Header Halaman Sampah Produk Dashboard
 * Menampilkan Eyebrow, Judul H1, Deskripsi, Badge 'Khusus pemilik',
 * serta tombol navigasi 'Kembali ke Daftar Produk'.
 */
export default function ProductTrashHeader({ onBackClick }) {
  return (
    <div className="product-trash-header-wrap">
      <div className="product-trash-header-left">
        <span className="product-trash-eyebrow">KATALOG</span>
        <h1 className="product-trash-page-title">Sampah Produk</h1>
        <p className="product-trash-page-desc">
          Lihat produk yang dihapus dan pulihkan jika masih diperlukan.
        </p>

        {/* Badge Akses Khusus Pemilik */}
        <div className="product-trash-role-badge">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>Khusus pemilik</span>
        </div>
      </div>

      <button
        type="button"
        className="product-trash-btn-back"
        onClick={onBackClick}
        aria-label="Kembali ke Daftar Produk"
      >
        <span aria-hidden="true">&larr;</span>
        <span>Kembali ke Daftar Produk</span>
      </button>
    </div>
  );
}
