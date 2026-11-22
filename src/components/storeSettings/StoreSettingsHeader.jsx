export default function StoreSettingsHeader() {
  return (
    <div className="store-settings-header">
      <div className="store-settings-header-main">
        <span className="store-settings-eyebrow">PENGELOLAAN</span>
        <h1 className="store-settings-title">Pengaturan Toko</h1>
        <p className="store-settings-subtitle">
          Kelola identitas, informasi operasional, dan kontak Rasa Pulang.
        </p>

        <div className="store-settings-meta">
          <span className="store-settings-badge-owner">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Khusus pemilik
          </span>
          <span className="store-settings-meta-divider" aria-hidden="true">|</span>
          <span className="store-settings-helper-text">
            Informasi tersimpan digunakan pada seluruh website publik.
          </span>
        </div>
      </div>
    </div>
  );
}
