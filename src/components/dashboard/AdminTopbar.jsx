import { useState, useEffect, useRef } from 'react';

export default function AdminTopbar({
  currentUser,
  activeTab = 'ringkasan',
  breadcrumbTitle,
  onViewWebsite,
  onProfileClick,
  onLogout,
  onOpenSidebar,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentSegment = breadcrumbTitle || (
    activeTab === 'kategori' ? 'Kategori' :
    activeTab === 'produk' ? 'Produk' :
    activeTab === 'sampah' ? 'Sampah Produk' :
    activeTab === 'konten' ? 'Konten Website' :
    activeTab === 'pengaturan' ? 'Pengaturan Toko' :
    activeTab === 'pengguna' ? 'Pengguna' :
    activeTab === 'profil' ? 'Profil Saya' :
    'Ringkasan'
  );

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        {/* Tombol Hamburger Mobile */}
        <button
          type="button"
          className="admin-hamburger-btn"
          onClick={onOpenSidebar}
          aria-label="Buka menu navigasi sidebar"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Breadcrumb Topbar */}
        <div className="admin-topbar-breadcrumb">
          <span className="admin-breadcrumb-segment">Dashboard</span>
          <span className="admin-breadcrumb-separator">/</span>
          {activeTab === 'tambah-produk' ? (
            <>
              <span className="admin-breadcrumb-segment">Produk</span>
              <span className="admin-breadcrumb-separator">/</span>
              <span className="admin-breadcrumb-current">Tambah Produk</span>
            </>
          ) : activeTab === 'edit-produk' ? (
            <>
              <span className="admin-breadcrumb-segment">Produk</span>
              <span className="admin-breadcrumb-separator">/</span>
              <span className="admin-breadcrumb-current">Edit Produk</span>
            </>
          ) : (
            <span className="admin-breadcrumb-current">{currentSegment}</span>
          )}
        </div>
      </div>

      <div className="admin-topbar-right">
        {/* Tombol Lihat Website */}
        <button
          type="button"
          onClick={onViewWebsite}
          className="admin-btn-outline-website"
          title="Buka Website Publik Rasa Pulang"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          <span>Lihat Website</span>
        </button>

        <div className="admin-topbar-divider" />

        {/* Profil Pengguna & Dropdown Menu */}
        <div className="admin-user-menu-wrapper" ref={dropdownRef}>
          <button
            type="button"
            className="admin-user-menu-trigger"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            aria-label="Menu akun pengguna"
          >
            <div className="admin-user-avatar">
              {currentUser?.initials || 'DP'}
            </div>
            <div className="admin-user-text">
              <span className="admin-user-fullname">{currentUser?.name || 'Dina Prameswari'}</span>
              <span className="admin-user-badge">{currentUser?.label || 'Pemilik'}</span>
            </div>
            <svg
              className={`admin-user-chevron ${dropdownOpen ? 'rotated' : ''}`}
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
          </button>

          {/* Menu Dropdown Popup */}
          {dropdownOpen && (
            <div className="admin-dropdown-menu" role="menu">
              <div className="admin-dropdown-header">
                <p className="admin-dropdown-name">{currentUser?.name}</p>
                <p className="admin-dropdown-email">{currentUser?.email}</p>
              </div>
              <div className="admin-dropdown-divider" />
              <button
                type="button"
                className="admin-dropdown-item"
                role="menuitem"
                onClick={() => {
                  setDropdownOpen(false);
                  if (onProfileClick) onProfileClick();
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Profil Saya</span>
              </button>
              <button
                type="button"
                className="admin-dropdown-item logout"
                role="menuitem"
                onClick={() => {
                  setDropdownOpen(false);
                  if (onLogout) onLogout();
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Keluar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
