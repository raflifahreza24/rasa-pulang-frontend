export default function WebsiteContentHeader({ onViewWebsite }) {
  return (
    <div className="website-content-header">
      <div className="website-content-header-main">
        <span className="website-content-eyebrow">PENGELOLAAN</span>
        <h1 className="website-content-title">Konten Website</h1>
        <p className="website-content-subtitle">
          Perbarui banner, cerita usaha, dan keunggulan Rasa Pulang.
        </p>

        <div className="website-content-meta">
          <span className="website-content-badge-owner">
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
          <span className="website-content-helper-text">
            Perubahan ditampilkan di website publik setelah disimpan.
          </span>
        </div>
      </div>

      <div className="website-content-header-action">
        <button
          type="button"
          onClick={onViewWebsite}
          className="website-content-btn-website"
          aria-label="Lihat tampilan website publik"
        >
          <svg
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
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Lihat Website
        </button>
      </div>
    </div>
  );
}
