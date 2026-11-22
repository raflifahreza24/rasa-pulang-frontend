export default function DashboardHeader({
  currentRole,
  onRoleChange,
  currentUser,
  onNavigate,
}) {
  return (
    <header className="dash-header">
      <div className="dash-header-left">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('/');
          }}
          className="dash-brand-link"
          aria-label="Kembali ke Website Publik Rasa Pulang"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M16 3L3 13.5V27C3 28.1 3.9 29 5 29H27C28.1 29 29 28.1 29 27V13.5L16 3Z"
              stroke="#DC722C"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 20C11 17.2 13.2 15 16 15C18.8 15 21 17.2 21 20"
              stroke="#DC722C"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="16" cy="11.5" r="2" fill="#DC722C" />
          </svg>
          <span className="dash-brand-title">Rasa Pulang</span>
          <span className="dash-badge-portal">Dashboard Kelola</span>
        </a>
      </div>

      <div className="dash-header-right">
        {/* Role Switcher Simulasi untuk Pemilik & Staf */}
        <div className="dash-role-switcher" role="group" aria-label="Pilih peran simulasi dashboard">
          <span className="dash-role-label">Mode Akses:</span>
          <button
            type="button"
            className={`dash-role-btn ${currentRole === 'pemilik' ? 'active' : ''}`}
            onClick={() => onRoleChange('pemilik')}
            title="Akses penuh sebagai Pemilik Usaha (Dina Prameswari)"
          >
            👑 Pemilik
          </button>
          <button
            type="button"
            className={`dash-role-btn ${currentRole === 'staf' ? 'active' : ''}`}
            onClick={() => onRoleChange('staf')}
            title="Akses terbatas sebagai Staf Toko (Siti Rahmawati)"
          >
            💼 Staf
          </button>
        </div>

        {/* Tombol Lihat Website Publik */}
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('/')}
          className="dash-btn-public"
          title="Buka Website Publik Rasa Pulang"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          <span>Lihat Website</span>
        </button>

        {/* Profil Singkat Pengguna Aktif */}
        <div className="dash-user-pill">
          <div className="dash-user-avatar">{currentUser.avatarText}</div>
          <div className="dash-user-meta">
            <span className="dash-user-name">{currentUser.name}</span>
            <span className="dash-user-role-tag">{currentUser.roleLabel}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
