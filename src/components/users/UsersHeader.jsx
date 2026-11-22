export default function UsersHeader({ onAddStaff }) {
  return (
    <div className="users-page-header">
      <div className="users-header-main">
        <span className="users-eyebrow">PENGELOLAAN</span>
        <div className="users-title-row">
          <h1 className="users-title">Pengguna</h1>
          <span className="users-badge-owner">
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
        </div>
        <p className="users-subtitle">
          Kelola akun staf yang membantu memperbarui katalog Rasa Pulang.
        </p>
      </div>

      <div className="users-header-action">
        <button
          type="button"
          onClick={onAddStaff}
          className="users-btn-add-staff"
          aria-label="Buka formulir tambah staf baru"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Tambah Staf
        </button>
      </div>
    </div>
  );
}
