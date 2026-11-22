export default function UsersRestrictedView({ onBackToDashboard }) {
  return (
    <div className="users-restricted-container admin-animate-fade">
      <div className="users-restricted-card">
        <div className="users-restricted-icon-box" aria-hidden="true">
          <svg
            width="32"
            height="32"
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
        <h2 className="users-restricted-title">Akses tidak tersedia</h2>
        <p className="users-restricted-desc">
          Halaman Pengelolaan Pengguna hanya dapat diakses oleh akun Pemilik (Dina Prameswari). Akun staf tidak memiliki izin untuk mengelola pengguna.
        </p>
        <button
          type="button"
          onClick={onBackToDashboard}
          className="users-restricted-btn"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}
