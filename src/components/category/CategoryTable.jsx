import ImageWithFallback from '../ui/ImageWithFallback';
import AnimatedNumber from '../ui/AnimatedNumber';

export default function CategoryTable({
  categories,
  totalCount,
  filteredCount,
  searchQuery,
  onResetSearch,
  onEditCategory,
  onDeleteCategory,
  onAddCategory,
  getProductCount,
  canDeleteCategory,
}) {
  return (
    <div className="category-card-container">
      {/* Header Panel Daftar Kategori */}
      <div className="category-card-head">
        <h2 className="category-card-title">Daftar Kategori</h2>
        <p className="category-card-subtitle">
          Atur informasi, urutan tampil, dan status kategori.
        </p>
      </div>

      {/* Tabel Kategori Responsive */}
      <div className="category-table-responsive">
        <table className="category-table">
          <thead>
            <tr>
              <th scope="col" className="th-category">Kategori</th>
              <th scope="col" className="th-count">Jumlah Produk</th>
              <th scope="col" className="th-order">Urutan Tampil</th>
              <th scope="col" className="th-status">Status</th>
              <th scope="col" className="th-action">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredCount > 0 ? (
              categories.map((category) => {
                const count = getProductCount(category);
                const isDeletable = canDeleteCategory(category);

                return (
                  <tr key={category.id} className="category-tr">
                    {/* Kolom Kategori (Thumbnail + Nama + Deskripsi) */}
                    <td className="td-category">
                      <div className="category-info-cell">
                        <div className="category-thumb-wrapper">
                          <ImageWithFallback
                            src={category.image}
                            alt={category.alt || category.name}
                            className="category-thumb-img"
                            fallbackCategory="category"
                          />
                        </div>
                        <div className="category-text-meta">
                          <span className="category-name">{category.name}</span>
                          {category.description && (
                            <span className="category-desc">{category.description}</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Kolom Jumlah Produk */}
                    <td className="td-count">
                      <span className="category-cell-text">
                        <AnimatedNumber value={count} suffix=" produk" duration={600} />
                      </span>
                    </td>

                    {/* Kolom Urutan Tampil */}
                    <td className="td-order">
                      <span className="category-cell-text">
                        <AnimatedNumber value={category.sortOrder} duration={450} />
                      </span>
                    </td>

                    {/* Kolom Status */}
                    <td className="td-status">
                      {category.isActive ? (
                        <span className="category-badge-status active">Aktif</span>
                      ) : (
                        <span className="category-badge-status inactive">Nonaktif</span>
                      )}
                    </td>

                    {/* Kolom Aksi */}
                    <td className="td-action">
                      <div className="category-action-buttons">
                        {/* Tombol Edit */}
                        <button
                          type="button"
                          className="category-btn-icon edit"
                          onClick={() => onEditCategory(category)}
                          title={`Edit kategori ${category.name}`}
                          aria-label={`Edit kategori ${category.name}`}
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
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>
                        </button>

                        {/* Tombol Hapus / Masih Digunakan */}
                        {isDeletable ? (
                          <button
                            type="button"
                            className="category-btn-trash-active"
                            onClick={() => onDeleteCategory(category)}
                            title={`Hapus kategori ${category.name}`}
                            aria-label={`Hapus kategori ${category.name}`}
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
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                            <span>Hapus</span>
                          </button>
                        ) : (
                          <div
                            className="category-btn-disabled-wrap"
                            title="Kategori yang masih memiliki produk tidak dapat dihapus"
                          >
                            <svg
                              className="category-trash-icon-disabled"
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
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                            <span className="category-disabled-text">Masih digunakan</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="category-empty-row">
                  {searchQuery ? (
                    <div className="category-empty-state">
                      <p className="category-empty-title">Tidak ada kategori yang cocok</p>
                      <p className="category-empty-sub">
                        Kata kunci &ldquo;{searchQuery}&rdquo; tidak ditemukan pada nama atau deskripsi kategori.
                      </p>
                      <button
                        type="button"
                        className="category-btn-reset-search"
                        onClick={onResetSearch}
                      >
                        Reset Pencarian
                      </button>
                    </div>
                  ) : (
                    <div className="category-empty-state">
                      <p className="category-empty-title">Belum ada kategori yang dibuat</p>
                      <p className="category-empty-sub">
                        Mulai dengan menambahkan kategori baru untuk mengelompokkan produk Anda.
                      </p>
                      <button
                        type="button"
                        className="category-btn-primary small"
                        onClick={onAddCategory}
                      >
                        + Tambah Kategori
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Ringkasan Jumlah Kategori Bawah */}
      <div className="category-table-footer">
        <span className="category-table-summary">
          Menampilkan {filteredCount} dari {totalCount} kategori
        </span>
      </div>
    </div>
  );
}
