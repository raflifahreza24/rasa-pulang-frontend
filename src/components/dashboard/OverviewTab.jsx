export default function OverviewTab({
  metrics,
  onNavigateTab,
  onNewProductClick,
}) {
  return (
    <div className="dash-overview-view">
      {/* Header Halaman Ringkasan */}
      <div className="dash-section-header">
        <div>
          <h1 className="dash-heading">Ringkasan Katalog</h1>
          <p className="dash-subheading">
            Pantau kondisi seluruh produk, kategori, dan ketersediaan stok Rasa Pulang secara cepat.
          </p>
        </div>
        <div className="dash-header-actions">
          <button
            type="button"
            className="dash-btn-primary"
            onClick={onNewProductClick}
          >
            <span aria-hidden="true">+</span> Tambah Produk Baru
          </button>
        </div>
      </div>

      {/* Grid Kartu Metrik Statistik (Brief Bab 6.A) */}
      <div className="dash-stats-grid">
        <div className="dash-stat-card">
          <div className="dash-stat-icon-wrap" style={{ background: '#EAF8EF', color: '#167C3E' }}>
            📁
          </div>
          <div className="dash-stat-info">
            <span className="dash-stat-title">Kategori Aktif</span>
            <span className="dash-stat-number">{metrics.activeCategoriesCount}</span>
            <span className="dash-stat-hint">Siap ditampilkan ke publik</span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon-wrap" style={{ background: '#FBF0E8', color: '#DC722C' }}>
            📦
          </div>
          <div className="dash-stat-info">
            <span className="dash-stat-title">Total Produk Aktif</span>
            <span className="dash-stat-number">{metrics.totalProductsCount}</span>
            <span className="dash-stat-hint">Belum dihapus dari sistem</span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon-wrap" style={{ background: '#E8F1FC', color: '#1A73E8' }}>
            👁️
          </div>
          <div className="dash-stat-info">
            <span className="dash-stat-title">Produk Ditampilkan</span>
            <span className="dash-stat-number">{metrics.displayedProductsCount}</span>
            <span className="dash-stat-hint">Muncul di website publik</span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon-wrap" style={{ background: '#FEF7E0', color: '#B06000' }}>
            🙈
          </div>
          <div className="dash-stat-info">
            <span className="dash-stat-title">Produk Disembunyikan</span>
            <span className="dash-stat-number">{metrics.hiddenProductsCount}</span>
            <span className="dash-stat-hint">Hanya tersimpan di dashboard</span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon-wrap" style={{ background: '#FCE8E6', color: '#D93025' }}>
            ⚠️
          </div>
          <div className="dash-stat-info">
            <span className="dash-stat-title">Produk Berstatus Habis</span>
            <span className="dash-stat-number">{metrics.outOfStockCount}</span>
            <span className="dash-stat-hint">Ditandai badge habis</span>
          </div>
        </div>
      </div>

      {/* Tabel 5 Produk yang Terakhir Diperbarui */}
      <div className="dash-card">
        <div className="dash-card-header">
          <h2 className="dash-card-title">5 Produk Terakhir Diperbarui</h2>
          <button
            type="button"
            className="dash-card-action-link"
            onClick={() => onNavigateTab('produk')}
          >
            Lihat Semua Produk →
          </button>
        </div>

        <div className="dash-table-responsive">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Produk</th>
                <th>SKU</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Ketersediaan</th>
                <th>Publikasi</th>
              </tr>
            </thead>
            <tbody>
              {metrics.recentProducts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="dash-product-cell">
                      <div className="dash-product-thumb">
                        <img
                          src={p.images?.[0]?.path || `/images/rasa-pulang/products/${p.imageKey}.webp`}
                          alt={p.name}
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="%23eaddcf"><rect width="40" height="40"/></svg>';
                          }}
                        />
                      </div>
                      <div className="dash-product-names">
                        <span className="dash-prod-title">{p.name}</span>
                        <span className="dash-prod-weight">{p.netWeightGrams} g</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="dash-sku-code">{p.sku}</span>
                  </td>
                  <td>
                    <span className="dash-cat-name">{p.categoryId}</span>
                  </td>
                  <td>
                    <span className="dash-price-text">
                      Rp{p.price?.toLocaleString('id-ID')}
                    </span>
                  </td>
                  <td>
                    <span className={`dash-status-pill ${p.availability === 'Tersedia' ? 'avail' : 'empty'}`}>
                      {p.availability}
                    </span>
                  </td>
                  <td>
                    <span className={`dash-pub-pill ${p.isPublished ? 'published' : 'hidden'}`}>
                      {p.isPublished ? 'Ditampilkan' : 'Disembunyikan'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Keterangan Portofolio Simulasi */}
      <div className="dash-notice-box">
        <span className="dash-notice-icon">ℹ️</span>
        <p className="dash-notice-text">
          <strong>Catatan Desain & Bisnis:</strong> Sesuai Brief Klien Dina Prameswari, ringkasan dashboard belum menyertakan grafik laporan penjualan karena pemesanan diproses langsung melalui WhatsApp tanpa pencatatan transaksi kasir di website.
        </p>
      </div>
    </div>
  );
}
