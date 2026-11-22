export default function CategoryRulesPanel() {
  return (
    <div className="category-rules-card" role="region" aria-label="Aturan Pengelolaan Kategori">
      <div className="category-rules-main">
        <div className="category-rules-header">
          <svg
            className="category-rules-icon"
            width="18"
            height="18"
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
          <span className="category-rules-title">Aturan Pengelolaan Kategori</span>
        </div>

        <ul className="category-rules-list">
          <li className="category-rules-item">
            Nama kategori harus unik.
          </li>
          <li className="category-rules-item">
            Kategori yang masih memiliki produk tidak dapat dihapus. Pindahkan produk terlebih dahulu, termasuk produk di sampah.
          </li>
          <li className="category-rules-item">
            Menonaktifkan kategori menyembunyikan seluruh produknya dari website publik. Data tetap tersedia di dashboard.
          </li>
        </ul>
      </div>

      <div className="category-rules-meta">
        <span>Gambar: JPG, PNG, atau WebP · Maks. 2 MB</span>
      </div>
    </div>
  );
}
