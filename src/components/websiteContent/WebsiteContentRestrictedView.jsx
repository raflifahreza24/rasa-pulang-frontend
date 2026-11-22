export default function WebsiteContentRestrictedView({ onBackToDashboard }) {
  return (
    <div className="website-content-restricted-container admin-animate-fade">
      <div className="website-content-restricted-card">
        <div className="website-content-restricted-icon-box">
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
        <h2 className="website-content-restricted-title">Akses Terbatas</h2>
        <p className="website-content-restricted-desc">
          Halaman Pengelolaan Konten Website hanya dapat diakses oleh akun Pemilik (Dina Prameswari). Akun staf tidak memiliki izin untuk mengubah konten website.
        </p>
        <button
          type="button"
          onClick={onBackToDashboard}
          className="website-content-restricted-btn"
        >
          Kembali ke Ringkasan
        </button>
      </div>
    </div>
  );
}
