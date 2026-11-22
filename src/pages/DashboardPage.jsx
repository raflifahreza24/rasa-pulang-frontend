import { useState, useMemo } from 'react';
import { defaultOwnerUser, defaultStaffUser } from '../data/demoUser';
import { productsData, categoriesData } from '../data/productsData';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import AdminTopbar from '../components/dashboard/AdminTopbar';
import DashboardSimulationNotice from '../components/dashboard/DashboardSimulationNotice';
import DashboardHeading from '../components/dashboard/DashboardHeading';
import CatalogSummaryGrid from '../components/dashboard/CatalogSummaryGrid';
import RecentProductsTable from '../components/dashboard/RecentProductsTable';
import CategoryManagementView from '../components/category/CategoryManagementView';
import AdminProductManagementView from '../components/adminProduct/AdminProductManagementView';
import CreateProductView from '../components/createProduct/CreateProductView';
import EditProductView from '../components/editProduct/EditProductView';
import ProductTrashView from '../components/productTrash/ProductTrashView';
import WebsiteContentView from '../components/websiteContent/WebsiteContentView';
import StoreSettingsView from '../components/storeSettings/StoreSettingsView';
import UsersView from '../components/users/UsersView';
import MyProfileView from '../components/profile/MyProfileView';
import AdminFooter from '../components/dashboard/AdminFooter';
import ToastNotice from '../components/ui/ToastNotice';

export default function DashboardPage({ onNavigate, user, initialTab = 'ringkasan', editProductId }) {
  // Pengguna demo aktif (default Dina Prameswari jika akses langsung)
  const initialUser = useMemo(() => {
    if (user) {
      return user.role === 'staff' || user.role === 'staf' ? defaultStaffUser : defaultOwnerUser;
    }
    return defaultOwnerUser;
  }, [user]);

  const [currentUser, setCurrentUser] = useState(initialUser);

  const handleUpdateCurrentUser = (updated) => {
    setCurrentUser(updated);
  };

  const activeTab = initialTab;
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  // Kalkulasi 5 Metrik Ringkasan Secara Dinamis dari Data Dummy
  const metrics = useMemo(() => {
    const activeCategoriesCount = categoriesData.filter((c) => c.isActive).length;
    const nonDeleted = productsData.filter((p) => !p.deletedAt);
    const displayedProductsCount = nonDeleted.filter((p) => p.isPublished).length;
    const hiddenProductsCount = nonDeleted.filter((p) => !p.isPublished).length;
    const outOfStockCount = nonDeleted.filter((p) => p.availability === 'Habis').length;

    // 5 Produk Terakhir Diperbarui (diurutkan berdasarkan updatedAt menurun, lalu id sekunder)
    const recentProducts = [...nonDeleted]
      .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0) || a.id - b.id)
      .slice(0, 5);

    return {
      activeCategoriesCount,
      totalProductsCount: nonDeleted.length,
      displayedProductsCount,
      hiddenProductsCount,
      outOfStockCount,
      recentProducts,
    };
  }, []);

  const handleViewWebsite = () => {
    if (onNavigate) {
      onNavigate('/');
    }
  };

  const handleLogout = () => {
    showToast('Berhasil keluar dari dashboard. Mengalihkan ke halaman login...');
    setTimeout(() => {
      if (onNavigate) {
        onNavigate('/login');
      }
    }, 600);
  };

  const handleAddProduct = () => {
    if (onNavigate) {
      onNavigate('/dashboard/produk/tambah');
    }
  };

  const handleViewAllProducts = () => {
    if (onNavigate) {
      onNavigate('/dashboard/produk');
    }
  };

  const handleEditProduct = (product) => {
    if (onNavigate) {
      onNavigate(`/dashboard/produk/${product.id}/edit`);
    }
  };

  const handleMenuItemClick = (item) => {
    if (item.id === 'ringkasan') {
      if (onNavigate) onNavigate('/dashboard');
      return;
    }
    if (item.id === 'kategori') {
      if (onNavigate) onNavigate('/dashboard/kategori');
      return;
    }
    if (item.id === 'produk') {
      if (onNavigate) onNavigate('/dashboard/produk');
      return;
    }
    if (item.id === 'sampah') {
      if (onNavigate) onNavigate('/dashboard/produk/sampah');
      return;
    }
    if (item.id === 'konten') {
      if (onNavigate) onNavigate('/dashboard/konten-website');
      return;
    }
    if (item.id === 'pengaturan') {
      if (onNavigate) onNavigate('/dashboard/pengaturan-toko');
      return;
    }
    if (item.id === 'pengguna') {
      if (onNavigate) onNavigate('/dashboard/pengguna');
      return;
    }
    if (item.id === 'profil') {
      if (onNavigate) onNavigate('/dashboard/profil');
      return;
    }
    showToast(`Modul ${item.label} belum tersedia pada demo ini.`);
  };

  const handleProfileClick = () => {
    if (onNavigate) onNavigate('/dashboard/profil');
  };

  return (
    <div className="admin-root-layout">
      {/* Sidebar Navigasi Kiri */}
      <AdminSidebar
        currentUser={currentUser}
        activeItem={
          activeTab === 'tambah-produk' || activeTab === 'edit-produk'
            ? 'produk'
            : activeTab
        }
        onMenuItemClick={handleMenuItemClick}
        onLogout={handleLogout}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Area Konten Utama Kanan */}
      <div className="admin-main-wrapper">
        {/* Topbar */}
        <AdminTopbar
          currentUser={currentUser}
          activeTab={activeTab}
          onViewWebsite={handleViewWebsite}
          onProfileClick={handleProfileClick}
          onLogout={handleLogout}
          onOpenSidebar={() => setMobileSidebarOpen(true)}
        />

        {/* Isi Halaman Dashboard */}
        <main className="admin-page-content">
          {activeTab === 'kategori' ? (
            <CategoryManagementView onShowToast={showToast} />
          ) : activeTab === 'produk' ? (
            <AdminProductManagementView
              currentUser={currentUser}
              onShowToast={showToast}
              onNavigate={onNavigate}
            />
          ) : activeTab === 'tambah-produk' ? (
            <CreateProductView
              onNavigate={onNavigate}
              onShowToast={showToast}
            />
          ) : activeTab === 'edit-produk' ? (
            <EditProductView
              productId={editProductId || 1}
              onNavigate={onNavigate}
              onShowToast={showToast}
            />
          ) : activeTab === 'sampah' ? (
            <ProductTrashView
              currentUser={currentUser}
              onNavigate={onNavigate}
              onShowToast={showToast}
            />
          ) : activeTab === 'konten' ? (
            <WebsiteContentView
              currentUser={currentUser}
              onNavigate={onNavigate}
              onShowToast={showToast}
            />
          ) : activeTab === 'pengaturan' ? (
            <StoreSettingsView
              currentUser={currentUser}
              onNavigate={onNavigate}
              onShowToast={showToast}
            />
          ) : activeTab === 'pengguna' ? (
            <UsersView
              currentUser={currentUser}
              onNavigate={onNavigate}
              onShowToast={showToast}
            />
          ) : activeTab === 'profil' ? (
            <MyProfileView
              currentUser={currentUser}
              onUpdateUser={handleUpdateCurrentUser}
              onShowToast={showToast}
              onNavigate={onNavigate}
            />
          ) : (
            <div className="admin-content-container admin-animate-fade">
              {/* Banner Simulasi Portofolio */}
              <div className="anim-enter anim-stagger-1">
                <DashboardSimulationNotice />
              </div>

              {/* Heading Halaman & Tombol Tambah Produk */}
              <div className="anim-enter anim-stagger-2">
                <DashboardHeading
                  currentUser={currentUser}
                  onAddProductClick={handleAddProduct}
                />
              </div>

              {/* Lima Kartu Statistik Ringkasan Katalog */}
              <div className="anim-enter anim-stagger-3">
                <CatalogSummaryGrid metrics={metrics} />
              </div>

              {/* Tabel Lima Produk Terakhir Diperbarui */}
              <div className="anim-enter anim-stagger-4">
                <RecentProductsTable
                  products={metrics.recentProducts}
                  onViewAllProducts={handleViewAllProducts}
                  onEditProduct={handleEditProduct}
                />
              </div>
            </div>
          )}
        </main>

        {/* Footer Sederhana */}
        <AdminFooter />
      </div>

      {/* Notifikasi Toast untuk Aksi Demo */}
      <ToastNotice
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
