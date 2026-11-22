import { useState } from 'react';
import DashboardSimulationNotice from '../dashboard/DashboardSimulationNotice';
import AdminProductHeader from './AdminProductHeader';
import AdminProductFilters from './AdminProductFilters';
import AdminProductTable from './AdminProductTable';
import AdminProductPagination from './AdminProductPagination';
import AdminProductRulesPanel from './AdminProductRulesPanel';
import ProductDeleteModal from './ProductDeleteModal';
import { useAdminProducts } from '../../hooks/useAdminProducts';

export default function AdminProductManagementView({ currentUser, onShowToast, onNavigate }) {
  const {
    products,
    totalFilteredCount,
    totalPages,
    currentPage,
    rangeStart,
    rangeEnd,
    searchQuery,
    categoryFilter,
    publicationFilter,
    availabilityFilter,
    featuredFilter,
    onSearchChange,
    onCategoryChange,
    onPublicationChange,
    onAvailabilityChange,
    onFeaturedChange,
    onResetFilters,
    onPageChange,
    onSoftDelete,
  } = useAdminProducts(currentUser);

  // State dialog konfirmasi hapus produk
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleAddProduct = () => {
    if (onNavigate) {
      onNavigate('/dashboard/produk/tambah');
    }
  };

  const handleEditProduct = (product) => {
    if (onNavigate) {
      onNavigate(`/dashboard/produk/${product.id}/edit`);
    }
  };

  const handleOpenDeleteModal = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      const res = onSoftDelete(productToDelete.id);
      if (res.success) {
        setDeleteModalOpen(false);
        setProductToDelete(null);
        if (onShowToast) {
          onShowToast('Produk dipindahkan ke sampah untuk sesi demo ini.');
        }
      } else if (res.error && onShowToast) {
        onShowToast(res.error);
      }
    }
  };

  return (
    <div className="product-admin-container admin-animate-fade">
      {/* Banner Simulasi Portofolio */}
      <div className="anim-enter anim-stagger-1">
        <DashboardSimulationNotice />
      </div>

      {/* Heading Halaman & Tombol Tambah Produk */}
      <div className="anim-enter anim-stagger-2">
        <AdminProductHeader onAddProductClick={handleAddProduct} />
      </div>

      {/* Panel Utama: Filter, Tabel, & Pagination */}
      <div className="product-admin-card-container anim-enter anim-stagger-3">
        {/* Panel Filter dan Pencarian */}
        <AdminProductFilters
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          publicationFilter={publicationFilter}
          availabilityFilter={availabilityFilter}
          featuredFilter={featuredFilter}
          totalFilteredCount={totalFilteredCount}
          onSearchChange={onSearchChange}
          onCategoryChange={onCategoryChange}
          onPublicationChange={onPublicationChange}
          onAvailabilityChange={onAvailabilityChange}
          onFeaturedChange={onFeaturedChange}
          onResetFilters={onResetFilters}
        />

        {/* Tabel 7 Kolom Produk */}
        <AdminProductTable
          products={products}
          currentUser={currentUser}
          totalFilteredCount={totalFilteredCount}
          searchQuery={searchQuery}
          onResetFilters={onResetFilters}
          onAddProductClick={handleAddProduct}
          onEditProductClick={handleEditProduct}
          onDeleteProductClick={handleOpenDeleteModal}
        />

        {/* Navigasi Pagination */}
        <AdminProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalFilteredCount={totalFilteredCount}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onPageChange={onPageChange}
        />
      </div>

      {/* Panel Catatan Aturan Pengelolaan Produk */}
      <div className="anim-enter anim-stagger-4">
        <AdminProductRulesPanel />
      </div>

      {/* Dialog Konfirmasi Hapus Produk (Khusus Pemilik) */}
      <ProductDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        product={productToDelete}
      />
    </div>
  );
}
