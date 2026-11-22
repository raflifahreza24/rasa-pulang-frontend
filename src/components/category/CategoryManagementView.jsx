import { useState } from 'react';
import DashboardSimulationNotice from '../dashboard/DashboardSimulationNotice';
import CategoryHeader from './CategoryHeader';
import CategoryToolbar from './CategoryToolbar';
import CategoryTable from './CategoryTable';
import CategoryRulesPanel from './CategoryRulesPanel';
import CategoryFormModal from './CategoryFormModal';
import DeactivateCategoryModal from './DeactivateCategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal';
import { useCategoriesManager } from '../../hooks/useCategoriesManager';

export default function CategoryManagementView({ onShowToast }) {
  const {
    categories,
    filteredCategories,
    searchQuery,
    setSearchQuery,
    totalCount,
    filteredCount,
    getProductCount,
    canDeleteCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryStatus,
  } = useCategoriesManager();

  // State Modal Form (Tambah / Edit)
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // State Modal Konfirmasi Nonaktif
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [categoryToDeactivate, setCategoryToDeactivate] = useState(null);
  const [pendingDeactivateCallback, setPendingDeactivateCallback] = useState(null);

  // State Modal Konfirmasi Hapus
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Handler Buka Modal Tambah
  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setFormModalOpen(true);
  };

  // Handler Buka Modal Edit
  const handleOpenEditModal = (category) => {
    setEditingCategory(category);
    setFormModalOpen(true);
  };

  // Handler Simpan dari Modal Form (Tambah / Edit)
  const handleSaveCategory = (formData) => {
    if (editingCategory) {
      const res = updateCategory(editingCategory.id, formData);
      if (res.success) {
        setFormModalOpen(false);
        setEditingCategory(null);
        if (onShowToast) onShowToast(`Kategori "${formData.name}" berhasil diperbarui.`);
      }
    } else {
      const res = addCategory(formData);
      if (res.success) {
        setFormModalOpen(false);
        if (onShowToast) onShowToast(`Kategori baru "${formData.name}" berhasil ditambahkan.`);
      }
    }
  };

  // Handler Permintaan Konfirmasi Nonaktifkan Kategori
  const handleRequestDeactivateConfirm = ({ category, onConfirm }) => {
    setCategoryToDeactivate(category);
    setPendingDeactivateCallback(() => onConfirm);
    setDeactivateModalOpen(true);
  };

  const handleConfirmDeactivate = () => {
    if (pendingDeactivateCallback) {
      pendingDeactivateCallback();
    } else if (categoryToDeactivate) {
      toggleCategoryStatus(categoryToDeactivate.id, false);
    }
    setDeactivateModalOpen(false);
    setCategoryToDeactivate(null);
    setPendingDeactivateCallback(null);
    if (onShowToast) {
      onShowToast(`Kategori dinonaktifkan. Produk terkait disembunyikan dari publik.`);
    }
  };

  // Handler Permintaan Hapus Kategori
  const handleOpenDeleteModal = (category) => {
    if (!canDeleteCategory(category)) {
      if (onShowToast) {
        onShowToast('Kategori yang masih memiliki produk tidak dapat dihapus.');
      }
      return;
    }
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      const name = categoryToDelete.name;
      const res = deleteCategory(categoryToDelete.id);
      if (res.success) {
        setDeleteModalOpen(false);
        setCategoryToDelete(null);
        if (onShowToast) onShowToast(`Kategori "${name}" berhasil dihapus.`);
      }
    }
  };

  return (
    <div className="category-management-container admin-animate-fade">
      {/* Banner Simulasi Portofolio */}
      <div className="anim-enter anim-stagger-1">
        <DashboardSimulationNotice />
      </div>

      {/* Heading Kategori Produk & Tombol Tambah */}
      <div className="anim-enter anim-stagger-2">
        <CategoryHeader onAddClick={handleOpenAddModal} />
      </div>

      {/* Container Utama Daftar Kategori */}
      <div className="category-main-panel anim-enter anim-stagger-3">
        <CategoryToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={totalCount}
        />

        <CategoryTable
          categories={filteredCategories}
          totalCount={totalCount}
          filteredCount={filteredCount}
          searchQuery={searchQuery}
          onResetSearch={() => setSearchQuery('')}
          onEditCategory={handleOpenEditModal}
          onDeleteCategory={handleOpenDeleteModal}
          onAddCategory={handleOpenAddModal}
          getProductCount={getProductCount}
          canDeleteCategory={canDeleteCategory}
        />
      </div>

      {/* Panel Aturan Pengelolaan Kategori */}
      <div className="anim-enter anim-stagger-4">
        <CategoryRulesPanel />
      </div>

      {/* Modal Tambah & Edit Kategori */}
      {formModalOpen && (
        <CategoryFormModal
          key={editingCategory ? editingCategory.id : 'add-new-category'}
          isOpen={formModalOpen}
          onClose={() => {
            setFormModalOpen(false);
            setEditingCategory(null);
          }}
          onSave={handleSaveCategory}
          category={editingCategory}
          existingCategories={categories}
          onRequestDeactivateConfirm={handleRequestDeactivateConfirm}
        />
      )}

      {/* Modal Konfirmasi Nonaktifkan Kategori */}
      <DeactivateCategoryModal
        isOpen={deactivateModalOpen}
        onClose={() => {
          setDeactivateModalOpen(false);
          setCategoryToDeactivate(null);
          setPendingDeactivateCallback(null);
        }}
        onConfirm={handleConfirmDeactivate}
        category={categoryToDeactivate}
      />

      {/* Modal Konfirmasi Hapus Kategori */}
      <DeleteCategoryModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        category={categoryToDelete}
      />
    </div>
  );
}
