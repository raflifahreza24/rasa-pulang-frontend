export default function StoreSettingsRestrictedView({ onBackToDashboard }) {
  return (
    <div className="store-settings-restricted-container admin-animate-fade">
      <div className="store-settings-restricted-card">
        <div className="store-settings-restricted-icon-box">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#DC722C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h2 className="store-settings-restricted-title">Akses tidak tersedia</h2>
        <p className="store-settings-restricted-desc">
          Halaman Pengaturan Toko hanya dapat diakses oleh akun Pemilik (Dina Prameswari). Akun staf tidak memiliki izin untuk mengubah identitas toko maupun kontak operasional.
        </p>
        <button
          type="button"
          onClick={onBackToDashboard}
          className="store-settings-restricted-btn"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}
