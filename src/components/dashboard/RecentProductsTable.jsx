import PublicationBadge from './PublicationBadge';
import AvailabilityBadge from './AvailabilityBadge';
import ImageWithFallback from '../ui/ImageWithFallback';
import AnimatedNumber from '../ui/AnimatedNumber';

export default function RecentProductsTable({
  products = [],
  onViewAllProducts,
  onEditProduct,
}) {
  return (
    <div className="admin-table-card">
      {/* Header Tabel */}
      <div className="admin-table-header">
        <div className="admin-table-heading-group">
          <h2 className="admin-table-title">Produk Terakhir Diperbarui</h2>
          <p className="admin-table-subtitle">Lima produk dengan pembaruan terbaru.</p>
        </div>
        <button
          type="button"
          onClick={onViewAllProducts}
          className="admin-link-action"
        >
          Lihat Semua Produk →
        </button>
      </div>

      {/* Kontainer Responsif Tabel */}
      <div className="admin-table-responsive">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th scope="col" style={{ minWidth: '220px' }}>Produk</th>
              <th scope="col">Kategori</th>
              <th scope="col">Harga</th>
              <th scope="col">Publikasi</th>
              <th scope="col">Ketersediaan</th>
              <th scope="col">Diperbarui</th>
              <th scope="col" style={{ textAlign: 'center', width: '70px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="admin-empty-cell">
                  <div className="admin-empty-state">
                    <p className="admin-empty-title">Belum ada produk</p>
                    <p className="admin-empty-desc">
                      Silakan tambahkan produk baru untuk mulai mengisi katalog toko Anda.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const categoryLabel = getCategoryLabel(product.categoryId);
                const updatedTimeFormatted = formatRelativeDate(product.updatedAt);
                const mainImage = product.images?.[0]?.path || `/images/rasa-pulang/products/${product.imageKey}.webp`;

                return (
                  <tr key={product.id}>
                    <td>
                      <div className="admin-product-cell">
                        <div className="admin-product-thumb">
                          <ImageWithFallback
                            src={mainImage}
                            alt={product.name}
                            aspectRatio="1 / 1"
                            placeholderLabel="Foto"
                          />
                        </div>
                        <div className="admin-product-meta">
                          <span className="admin-product-name">{product.name}</span>
                          <span className="admin-product-sku">SKU: {product.sku}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="admin-category-text">{categoryLabel}</span>
                    </td>
                    <td>
                      <span className="admin-price-text">
                        <AnimatedNumber value={product.price} format="currency" duration={700} />
                      </span>
                    </td>
                    <td>
                      <PublicationBadge
                        status={product.isPublished ? 'Ditampilkan' : 'Disembunyikan'}
                      />
                    </td>
                    <td>
                      <AvailabilityBadge status={product.availability} />
                    </td>
                    <td>
                      <span className="admin-time-text">{updatedTimeFormatted}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => onEditProduct && onEditProduct(product)}
                        className="admin-action-btn"
                        aria-label={`Edit ${product.name}`}
                        title={`Edit ${product.name}`}
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
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getCategoryLabel(categoryId) {
  switch (categoryId) {
    case 'camilan-manis':
      return 'Camilan Manis';
    case 'keripik-kerupuk':
      return 'Keripik & Kerupuk';
    case 'camilan-gurih':
      return 'Camilan Gurih';
    case 'oleh-oleh-daerah':
      return 'Oleh-oleh Daerah';
    case 'paket-hampers':
      return 'Paket & Hampers';
    default:
      return categoryId || '-';
  }
}

function formatRelativeDate(isoString) {
  if (!isoString) return '-';
  const date = new Date(isoString);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const timeStr = `${hours}.${minutes}`;

  if (isToday) {
    return `Hari ini, ${timeStr}`;
  }
  if (isYesterday) {
    return `Kemarin, ${timeStr}`;
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${date.getDate()} ${months[date.getMonth()]}, ${timeStr}`;
}
