import ImageWithFallback from '../ui/ImageWithFallback';
import AnimatedNumber from '../ui/AnimatedNumber';
import { categoriesData } from '../../data/productsData';

// Map kategori untuk pencarian nama & status aktif yang cepat
const categoriesMap = new Map(categoriesData.map((c) => [c.id, c]));

export default function AdminProductTable({
  products,
  currentUser,
  totalFilteredCount,
  searchQuery,
  onResetFilters,
  onAddProductClick,
  onEditProductClick,
  onDeleteProductClick,
}) {
  const isOwner = currentUser?.role === 'owner' || !currentUser?.role;

  return (
    <div className="product-admin-table-responsive">
      <table className="product-admin-table">
        <thead>
          <tr>
            <th scope="col" className="th-product">Produk</th>
            <th scope="col" className="th-category">Kategori</th>
            <th scope="col" className="th-price">Harga</th>
            <th scope="col" className="th-availability">Ketersediaan</th>
            <th scope="col" className="th-publication">Publikasi</th>
            <th scope="col" className="th-featured">Unggulan</th>
            <th scope="col" className="th-action">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {totalFilteredCount > 0 ? (
            products.map((product) => {
              const category = categoriesMap.get(product.categoryId);
              const categoryName = category?.name || product.categoryId || '-';
              const isCategoryInactive = category && !category.isActive;
              const isAvailable = product.availability === 'Tersedia';
              const isPublished = product.isPublished;
              const isFeatured = Boolean(product.isFeatured);

              return (
                <tr key={product.id} className="product-admin-tr">
                  {/* Kolom 1: Produk (Thumbnail + Nama + SKU) */}
                  <td className="td-product">
                    <div className="product-admin-cell-lockup">
                      <div className="product-admin-thumb-wrapper">
                        <ImageWithFallback
                          src={`/images/rasa-pulang/products/${product.imageKey}.webp`}
                          alt={product.alt || product.name}
                          className="product-admin-thumb-img"
                          fallbackCategory="product"
                        />
                      </div>
                      <div className="product-admin-name-meta">
                        <span className="product-admin-name">{product.name}</span>
                        <span className="product-admin-sku">SKU {product.sku || `RP-${String(product.id).padStart(3, '0')}`}</span>
                      </div>
                    </div>
                  </td>

                  {/* Kolom 2: Kategori */}
                  <td className="td-category">
                    <div className="product-admin-cat-cell">
                      <span className="product-admin-cat-name">{categoryName}</span>
                      {isCategoryInactive && (
                        <span className="product-admin-cat-inactive-tag">
                          Kategori nonaktif
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Kolom 3: Harga */}
                  <td className="td-price">
                    <span className="product-admin-price-text">
                      <AnimatedNumber value={product.price} format="currency" duration={650} />
                    </span>
                  </td>

                  {/* Kolom 4: Ketersediaan */}
                  <td className="td-availability">
                    <span
                      className={`product-admin-badge ${isAvailable ? 'available' : 'out-of-stock'
                        }`}
                    >
                      {product.availability}
                    </span>
                  </td>

                  {/* Kolom 5: Publikasi */}
                  <td className="td-publication">
                    <span
                      className={`product-admin-badge ${isPublished ? 'published' : 'hidden'
                        }`}
                    >
                      {isPublished ? 'Ditampilkan' : 'Disembunyikan'}
                    </span>
                  </td>

                  {/* Kolom 6: Unggulan */}
                  <td className="td-featured">
                    {isFeatured ? (
                      <span className="product-admin-featured-tag yes">
                        <svg
                          className="product-admin-star-icon"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="#DC722C"
                          stroke="#DC722C"
                          strokeWidth="1"
                          aria-hidden="true"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span>Ya</span>
                      </span>
                    ) : (
                      <span className="product-admin-featured-tag no">
                        <span className="product-admin-dash" aria-hidden="true">—</span>
                        <span>Tidak</span>
                      </span>
                    )}
                  </td>

                  {/* Kolom 7: Aksi */}
                  <td className="td-action">
                    <div className="product-admin-actions-cell">
                      {/* Tombol Edit (Pemilik & Staf) */}
                      <button
                        type="button"
                        className="product-admin-btn-action edit"
                        onClick={() => onEditProductClick(product)}
                        title={`Edit ${product.name}`}
                        aria-label={`Edit ${product.name}`}
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

                      {/* Tombol Hapus (HANYA Pemilik) */}
                      {isOwner && (
                        <button
                          type="button"
                          className="product-admin-btn-action delete"
                          onClick={() => onDeleteProductClick(product)}
                          title={`Hapus ${product.name}`}
                          aria-label={`Hapus ${product.name}`}
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
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="product-admin-empty-cell">
                {searchQuery ? (
                  <div className="product-admin-empty-wrap">
                    <p className="product-admin-empty-title">Produk tidak ditemukan</p>
                    <p className="product-admin-empty-desc">
                      Coba kata kunci lain atau reset filter.
                    </p>
                    <button
                      type="button"
                      className="product-admin-btn-empty-reset"
                      onClick={onResetFilters}
                    >
                      Reset Filter
                    </button>
                  </div>
                ) : (
                  <div className="product-admin-empty-wrap">
                    <p className="product-admin-empty-title">Belum ada produk</p>
                    <p className="product-admin-empty-desc">
                      Tambahkan produk untuk mulai mengisi katalog Rasa Pulang.
                    </p>
                    <button
                      type="button"
                      className="product-admin-btn-primary small"
                      onClick={onAddProductClick}
                    >
                      + Tambah Produk
                    </button>
                  </div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
