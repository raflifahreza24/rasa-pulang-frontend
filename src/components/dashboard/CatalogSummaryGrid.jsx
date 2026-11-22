import CatalogStatCard from './CatalogStatCard';

export default function CatalogSummaryGrid({ metrics }) {
  return (
    <section className="admin-summary-section" aria-label="Ringkasan Statistik Katalog">
      {/* 5 Kartu Statistik Utama */}
      <div className="admin-stats-row">
        <CatalogStatCard
          iconType="tag"
          label="Kategori Aktif"
          count={metrics.activeCategoriesCount}
          hint="Kategori yang diaktifkan"
        />
        <CatalogStatCard
          iconType="box"
          label="Total Produk"
          count={metrics.totalProductsCount}
          hint="Produk belum dihapus"
        />
        <CatalogStatCard
          iconType="eye"
          label="Produk Ditampilkan"
          count={metrics.displayedProductsCount}
          hint="Status publikasi ditampilkan"
        />
        <CatalogStatCard
          iconType="eye-off"
          label="Produk Disembunyikan"
          count={metrics.hiddenProductsCount}
          hint="Status publikasi disembunyikan"
        />
        <CatalogStatCard
          iconType="box"
          label="Produk Habis"
          count={metrics.outOfStockCount}
          hint="Ketersediaan habis"
        />
      </div>

      {/* Catatan Visibilitas Produk di Bawah Kartu */}
      <div className="admin-visibility-note" role="note">
        <svg
          className="admin-note-icon"
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
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span className="admin-note-text">
          Produk hanya terlihat pelanggan jika dipublikasikan dan kategorinya aktif.
        </span>
      </div>
    </section>
  );
}
