import { useState, useEffect, useMemo, useCallback } from 'react';
import DashboardSimulationNotice from '../dashboard/DashboardSimulationNotice';
import ProductTrashHeader from './ProductTrashHeader';
import ProductTrashTable from './ProductTrashTable';
import RestoreInformationPanel from './RestoreInformationPanel';
import RestoreProductModal from './RestoreProductModal';
import {
  getSessionProducts,
  subscribeSessionProducts,
  restoreSessionProduct,
} from '../../data/productsStore';
import { categoriesData } from '../../data/productsData';

/**
 * Tampilan Utama Halaman Sampah Produk (Khusus Pemilik Toko)
 */
export default function ProductTrashView({
  currentUser,
  onNavigate,
  onShowToast,
}) {
  const isOwner = currentUser?.role === 'owner';

  // State produk dari shared in-memory session store
  const [allProducts, setAllProducts] = useState(getSessionProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  // Berlangganan perubahan pada session store
  useEffect(() => {
    const unsubscribe = subscribeSessionProducts((latest) => {
      setAllProducts([...latest]);
    });
    return unsubscribe;
  }, []);

  // Filter seluruh produk terhapus (deletedAt !== null)
  const allTrashedProducts = useMemo(() => {
    return allProducts
      .filter((p) => Boolean(p.deletedAt))
      .sort((a, b) => {
        const timeA = new Date(a.deletedAt || 0).getTime();
        const timeB = new Date(b.deletedAt || 0).getTime();
        return timeB - timeA || a.id - b.id;
      });
  }, [allProducts]);

  // Filter pencarian berdasarkan nama produk atau SKU
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allTrashedProducts;

    return allTrashedProducts.filter((p) => {
      const matchName = (p.name || '').toLowerCase().includes(q);
      const matchSku = (p.sku || '').toLowerCase().includes(q);
      return matchName || matchSku;
    });
  }, [allTrashedProducts, searchQuery]);

  // Handler buka modal konfirmasi pemulihan
  const handleOpenRestoreModal = useCallback(
    (product) => {
      if (!isOwner) {
        if (onShowToast) onShowToast('Hanya pemilik yang dapat memulihkan produk.');
        return;
      }
      setSelectedProduct(product);
      setIsRestoreModalOpen(true);
    },
    [isOwner, onShowToast]
  );

  // Handler eksekusi pemulihan produk
  const handleConfirmRestore = () => {
    if (!selectedProduct || !isOwner) return;

    setIsRestoring(true);
    const restored = restoreSessionProduct(selectedProduct.id);
    setIsRestoring(false);
    setIsRestoreModalOpen(false);
    setSelectedProduct(null);

    if (restored && onShowToast) {
      onShowToast(
        'Produk dipulihkan untuk sesi demo ini. Perubahan akan kembali ke data awal setelah halaman dimuat ulang.'
      );
    }
  };

  // Navigasi kembali ke Daftar Produk aktif
  const handleBackToProducts = () => {
    if (onNavigate) {
      onNavigate('/dashboard/produk');
    }
  };

  // Jika diakses oleh staf secara langsung, tampilkan batasan akses ramah pengguna
  if (!isOwner) {
    return (
      <div className="product-trash-container admin-animate-fade">
        <DashboardSimulationNotice />
        <div className="product-trash-card-container">
          <div className="product-trash-access-restricted">
            <div className="product-trash-restricted-icon" aria-hidden="true">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#DC722C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h2 className="product-trash-empty-title">Akses tidak tersedia</h2>
            <p className="product-trash-empty-desc">
              Halaman Sampah Produk hanya dapat diakses oleh pemilik toko.
            </p>
            <button
              type="button"
              className="product-trash-btn-empty-action"
              onClick={() => onNavigate && onNavigate('/dashboard')}
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-trash-container">
      {/* Banner Simulasi Portofolio */}
      <div className="anim-enter anim-stagger-1">
        <DashboardSimulationNotice />
      </div>

      {/* Heading Halaman & Tombol Kembali */}
      <div className="anim-enter anim-stagger-2">
        <ProductTrashHeader onBackClick={handleBackToProducts} />
      </div>

      {/* Panel Utama Tabel Produk Terhapus */}
      <div className="anim-enter anim-stagger-3">
        <ProductTrashTable
          products={filteredProducts}
          totalTrashedCount={allTrashedProducts.length}
          searchQuery={searchQuery}
          categories={categoriesData}
          onSearchChange={setSearchQuery}
          onResetSearch={() => setSearchQuery('')}
          onRestoreClick={handleOpenRestoreModal}
          onNavigateToProducts={handleBackToProducts}
        />
      </div>

      {/* Panel Informasi Bawah 'Tentang Pemulihan Produk' */}
      <div className="anim-enter anim-stagger-4">
        <RestoreInformationPanel />
      </div>

      {/* Modal Konfirmasi Pemulihan (Portal Layar Penuh) */}
      <RestoreProductModal
        isOpen={isRestoreModalOpen}
        product={selectedProduct}
        isRestoring={isRestoring}
        onClose={() => {
          if (!isRestoring) {
            setIsRestoreModalOpen(false);
            setSelectedProduct(null);
          }
        }}
        onConfirm={handleConfirmRestore}
      />
    </div>
  );
}
