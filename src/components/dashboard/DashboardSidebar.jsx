import { dashboardNavItems } from '../../data/dashboardData';

export default function DashboardSidebar({
  currentRole,
  activeTab,
  onSelectTab,
  metrics,
}) {
  return (
    <aside className="dash-sidebar" aria-label="Menu Navigasi Dashboard">
      <div className="dash-sidebar-section">
        <p className="dash-nav-group-title">MENU UTAMA</p>
        <nav className="dash-nav-list">
          {dashboardNavItems.map((item) => {
            const isAllowed = item.allowedRoles.includes(currentRole);
            const isActive = activeTab === item.id;

            // Jika role staf dan menu terlarang, tampilkan badge khusus pemilik / disabled
            if (!isAllowed) {
              return (
                <div
                  key={item.id}
                  className="dash-nav-item disabled"
                  title="Menu ini hanya dapat diakses oleh Pemilik Usaha"
                  aria-disabled="true"
                >
                  <span className="dash-nav-icon" aria-hidden="true">🔒</span>
                  <span className="dash-nav-text">{item.label}</span>
                  <span className="dash-lock-tag">Khusus Pemilik</span>
                </div>
              );
            }

            // Hitung badge angka untuk item tertentu
            let badgeValue = null;
            if (item.id === 'produk') badgeValue = metrics.totalProductsCount;
            if (item.id === 'kategori') badgeValue = metrics.activeCategoriesCount;
            if (item.id === 'sampah') badgeValue = metrics.trashCount;

            return (
              <button
                key={item.id}
                type="button"
                className={`dash-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="dash-nav-icon" aria-hidden="true">
                  {getIconSymbol(item.icon)}
                </span>
                <span className="dash-nav-text">{item.label}</span>
                {badgeValue !== null && (
                  <span className={`dash-nav-count ${item.id === 'sampah' && badgeValue > 0 ? 'alert' : ''}`}>
                    {badgeValue}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="dash-sidebar-footer">
        <div className="dash-role-info-card">
          <p className="dash-role-info-title">Hak Akses Aktif</p>
          <p className="dash-role-info-desc">
            {currentRole === 'pemilik'
              ? 'Anda memiliki akses penuh untuk mengelola katalog, konten web, pengaturan toko, dan akun staf.'
              : 'Anda memiliki akses operasional harian: mengelola produk, kategori, harga, dan ketersediaan stok.'}
          </p>
        </div>
      </div>
    </aside>
  );
}

function getIconSymbol(iconName) {
  switch (iconName) {
    case 'chart':
      return '📊';
    case 'box':
      return '📦';
    case 'folder':
      return '📁';
    case 'layout':
      return '🎨';
    case 'settings':
      return '⚙️';
    case 'users':
      return '👥';
    case 'trash':
      return '🗑️';
    case 'user':
      return '👤';
    default:
      return '📌';
  }
}
