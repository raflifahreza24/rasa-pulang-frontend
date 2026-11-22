import { categoriesData } from '../../data/productsData';

export default function CatalogToolbar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  activeSort,
  onSortChange,
  totalResults,
  startIndex,
  endIndex,
}) {
  const sortOptions = [
    { value: 'newest', label: 'Terbaru' },
    { value: 'price_asc', label: 'Harga Termurah' },
    { value: 'price_desc', label: 'Harga Termahal' },
  ];

  return (
    <div className="catalog-toolbar-wrapper catalog-animate-toolbar">
      {/* Panel Utama Filter & Pencarian */}
      <div className="catalog-toolbar-panel">
        {/* Baris 1: Pencarian & Pengurutan */}
        <div className="toolbar-top-row">
          {/* Kolom Kiri: Input Pencarian Lebar */}
          <div className="search-input-container">
            <svg
              className="search-input-icon"
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
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari nama produk..."
              className="search-input-field"
              aria-label="Cari nama produk"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="search-clear-btn"
                aria-label="Hapus kata kunci pencarian"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Kolom Kanan: Dropdown Pengurutan */}
          <div className="sort-select-container">
            <label htmlFor="catalog-sort-select" className="sr-only">
              Urutkan berdasarkan
            </label>
            <div className="sort-select-wrapper">
              <span className="sort-select-prefix">Urutkan:</span>
              <select
                id="catalog-sort-select"
                value={activeSort}
                onChange={(e) => onSortChange(e.target.value)}
                className="sort-select-field"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <svg
                className="sort-select-arrow"
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
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Baris 2: Kategori Pills */}
        <div className="toolbar-bottom-row" role="group" aria-label="Filter berdasarkan kategori produk">
          <span className="category-label">Kategori</span>
          <div className="category-pills-container">
            <button
              type="button"
              onClick={() => onCategoryChange('all')}
              className={`category-filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
              aria-pressed={activeCategory === 'all'}
            >
              Semua Produk
            </button>
            {categoriesData.map((cat) => {
              const isSelected = activeCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onCategoryChange(cat.slug)}
                  className={`category-filter-pill ${isSelected ? 'active' : ''}`}
                  aria-pressed={isSelected}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Info Jumlah Hasil (Dinamis & Ramah Aksesibilitas) */}
      {totalResults > 0 && (
        <div className="catalog-results-count" aria-live="polite">
          <p>
            Menampilkan {startIndex}–{endIndex} dari {totalResults} produk
          </p>
        </div>
      )}
    </div>
  );
}
