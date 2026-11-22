import { categoriesData } from '../../data/productsData';
import AnimatedNumber from '../ui/AnimatedNumber';

export default function AdminProductFilters({
  searchQuery,
  categoryFilter,
  publicationFilter,
  availabilityFilter,
  featuredFilter,
  totalFilteredCount,
  onSearchChange,
  onCategoryChange,
  onPublicationChange,
  onAvailabilityChange,
  onFeaturedChange,
  onResetFilters,
}) {
  return (
    <div className="product-admin-filters-panel" role="search" aria-label="Filter dan Pencarian Produk">
      {/* Baris 1: Pencarian & Counter Hasil */}
      <div className="product-admin-search-row">
        <div className="product-admin-search-wrapper">
          <svg
            className="product-admin-search-icon"
            width="17"
            height="17"
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
            type="text"
            className="product-admin-search-input"
            placeholder="Cari nama produk atau SKU..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Cari nama produk atau SKU"
          />

          {searchQuery && (
            <button
              type="button"
              className="product-admin-search-clear"
              onClick={() => onSearchChange('')}
              aria-label="Hapus kata kunci pencarian"
            >
              ✕
            </button>
          )}
        </div>

        <div className="product-admin-total-badge">
          <span>
            <AnimatedNumber value={totalFilteredCount} suffix=" produk" duration={500} />
          </span>
        </div>
      </div>

      {/* Baris 2: 4 Dropdown Filter & Tombol Reset */}
      <div className="product-admin-dropdowns-row">
        {/* Filter Kategori */}
        <div className="product-admin-filter-group">
          <label htmlFor="filter-category-select" className="product-admin-filter-label">
            Kategori
          </label>
          <div className="product-admin-select-wrap">
            <select
              id="filter-category-select"
              className="product-admin-select"
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <option value="all">Semua kategori</option>
              {categoriesData.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} {!cat.isActive ? '(Nonaktif)' : ''}
                </option>
              ))}
            </select>
            <svg
              className="product-admin-select-chevron"
              width="14"
              height="14"
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

        {/* Filter Publikasi */}
        <div className="product-admin-filter-group">
          <label htmlFor="filter-publication-select" className="product-admin-filter-label">
            Publikasi
          </label>
          <div className="product-admin-select-wrap">
            <select
              id="filter-publication-select"
              className="product-admin-select"
              value={publicationFilter}
              onChange={(e) => onPublicationChange(e.target.value)}
            >
              <option value="all">Semua status</option>
              <option value="published">Ditampilkan</option>
              <option value="hidden">Disembunyikan</option>
            </select>
            <svg
              className="product-admin-select-chevron"
              width="14"
              height="14"
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

        {/* Filter Ketersediaan */}
        <div className="product-admin-filter-group">
          <label htmlFor="filter-availability-select" className="product-admin-filter-label">
            Ketersediaan
          </label>
          <div className="product-admin-select-wrap">
            <select
              id="filter-availability-select"
              className="product-admin-select"
              value={availabilityFilter}
              onChange={(e) => onAvailabilityChange(e.target.value)}
            >
              <option value="all">Semua kondisi</option>
              <option value="available">Tersedia</option>
              <option value="out_of_stock">Habis</option>
            </select>
            <svg
              className="product-admin-select-chevron"
              width="14"
              height="14"
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

        {/* Filter Unggulan */}
        <div className="product-admin-filter-group">
          <label htmlFor="filter-featured-select" className="product-admin-filter-label">
            Unggulan
          </label>
          <div className="product-admin-select-wrap">
            <select
              id="filter-featured-select"
              className="product-admin-select"
              value={featuredFilter}
              onChange={(e) => onFeaturedChange(e.target.value)}
            >
              <option value="all">Semua produk</option>
              <option value="yes">Unggulan</option>
              <option value="no">Bukan unggulan</option>
            </select>
            <svg
              className="product-admin-select-chevron"
              width="14"
              height="14"
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

        {/* Tombol Reset Filter */}
        <div className="product-admin-reset-wrap">
          <button
            type="button"
            className="product-admin-btn-reset"
            onClick={onResetFilters}
            aria-label="Reset seluruh filter dan pencarian"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            <span>Reset Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
}
