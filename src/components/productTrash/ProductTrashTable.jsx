import ImageWithFallback from '../ui/ImageWithFallback';
import AnimatedNumber from '../ui/AnimatedNumber';

/**
 * Format timestamp ISO deletedAt menjadi string bahasa Indonesia
 * Contoh: 16 November 2026, 15.30 WIB
 */
function formatDeletedAt(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';

  const d = date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  });

  const time = date
    .toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Jakarta',
    })
    .replace(':', '.');

  return `${d}, ${time} WIB`;
}

export default function ProductTrashTable({
  products = [],
  totalTrashedCount = 0,
  searchQuery = '',
  categories = [],
  onSearchChange,
  onResetSearch,
  onRestoreClick,
  onNavigateToProducts,
}) {
  const getCategoryName = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : categoryId || '-';
  };

  // Kondisi 1: Tempat sampah benar-benar kosong
  if (totalTrashedCount === 0) {
    return (
      <div className="product-trash-card-container">
        <div className="product-trash-card-header">
          <h2 className="product-trash-card-title">Produk Terhapus</h2>
          <p className="product-trash-card-subtitle">
            Produk di sini tidak ditampilkan di website publik.
          </p>
        </div>

        <div className="product-trash-empty-state">
          <div className="product-trash-empty-icon" aria-hidden="true">
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#A89485"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </div>
          <h3 className="product-trash-empty-title">Belum ada produk di sampah</h3>
          <p className="product-trash-empty-desc">
            Produk yang dihapus akan muncul di halaman ini dan dapat dipulihkan oleh pemilik.
          </p>
          <button
            type="button"
            className="product-trash-btn-empty-action"
            onClick={onNavigateToProducts}
          >
            Kembali ke Daftar Produk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-trash-card-container">
      {/* Judul & Subjudul Panel */}
      <div className="product-trash-card-header">
        <h2 className="product-trash-card-title">Produk Terhapus</h2>
        <p className="product-trash-card-subtitle">
          Produk di sini tidak ditampilkan di website publik.
        </p>
      </div>

      {/* Toolbar Pencarian & Jumlah Hasil */}
      <div className="product-trash-toolbar">
        <div className="product-trash-search-wrap">
          <svg
            className="product-trash-search-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            className="product-trash-search-input"
            placeholder="Cari nama produk atau SKU..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Cari nama produk atau SKU di sampah"
          />
        </div>

        <div className="product-trash-count-badge">
          <span>
            <AnimatedNumber
              value={products.length}
              suffix=" produk terhapus"
              duration={500}
            />
          </span>
        </div>
      </div>

      {/* Tabel Produk Terhapus atau Tampilan Hasil Kosong */}
      {products.length === 0 ? (
        <div className="product-trash-empty-search">
          <div className="product-trash-empty-search-icon" aria-hidden="true">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#A89485"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h3 className="product-trash-empty-title">Produk tidak ditemukan</h3>
          <p className="product-trash-empty-desc">
            Coba gunakan kata kunci lain.
          </p>
          <button
            type="button"
            className="product-trash-btn-empty-action"
            onClick={onResetSearch}
          >
            Reset Pencarian
          </button>
        </div>
      ) : (
        <div className="product-trash-table-scroll">
          <table className="product-trash-table">
            <thead>
              <tr>
                <th scope="col" className="th-product">Produk</th>
                <th scope="col" className="th-category">Kategori</th>
                <th scope="col" className="th-deleted-at">Dihapus Pada</th>
                <th scope="col" className="th-action">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="product-trash-row">
                  {/* Kolom 1: Produk (Thumbnail, Nama, SKU) */}
                  <td className="td-product">
                    <div className="product-trash-cell">
                      <div className="product-trash-thumb-wrap">
                        <ImageWithFallback
                          src={
                            item.images?.[0]?.path ||
                            (item.imageKey ? `/images/rasa-pulang/products/${item.imageKey}.webp` : '')
                          }
                          alt={item.name}
                          className="product-trash-thumb"
                          fallbackText="Foto Produk"
                        />
                      </div>
                      <div className="product-trash-info-text">
                        <span className="product-trash-name">{item.name}</span>
                        <span className="product-trash-sku">SKU: {item.sku}</span>
                      </div>
                    </div>
                  </td>

                  {/* Kolom 2: Kategori */}
                  <td className="td-category">
                    <span className="product-trash-category-text">
                      {getCategoryName(item.categoryId)}
                    </span>
                  </td>

                  {/* Kolom 3: Dihapus Pada */}
                  <td className="td-deleted-at">
                    <span className="product-trash-date-text">
                      {formatDeletedAt(item.deletedAt)}
                    </span>
                  </td>

                  {/* Kolom 4: Aksi Pulihkan */}
                  <td className="td-action">
                    <button
                      type="button"
                      className="product-trash-btn-restore"
                      onClick={() => onRestoreClick(item)}
                      aria-label={`Pulihkan ${item.name}`}
                      title={`Pulihkan ${item.name}`}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="1 4 1 10 7 10" />
                        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                      </svg>
                      <span>Pulihkan</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bagian Bawah Ringkasan Jumlah */}
      {products.length > 0 && (
        <div className="product-trash-footer-summary">
          <span>
            Menampilkan{' '}
            <AnimatedNumber value={products.length} duration={400} /> dari{' '}
            <AnimatedNumber value={totalTrashedCount} duration={400} /> produk terhapus
          </span>
        </div>
      )}
    </div>
  );
}
