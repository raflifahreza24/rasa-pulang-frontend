export default function OwnerAccountSummary({ owner, onManageProfile }) {
  if (!owner) return null;

  return (
    <div className="owner-summary-card" aria-label="Identitas Akun Pemilik">
      <div className="owner-summary-left">
        {/* Avatar Inisial Bulat */}
        <div className="owner-avatar-circle" aria-hidden="true">
          {owner.initials || 'DP'}
        </div>

        <div className="owner-info-text">
          <span className="owner-name-text">{owner.name}</span>
          <span className="owner-email-text">{owner.email}</span>
        </div>

        <span className="owner-summary-divider" aria-hidden="true">|</span>

        <span className="owner-badge-tag">
          {owner.roleLabel || 'Pemilik'}
        </span>

        <span className="owner-account-label">
          Akun Anda
        </span>
      </div>

      <div className="owner-summary-right">
        <button
          type="button"
          onClick={onManageProfile}
          className="owner-btn-manage-profile"
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
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Kelola melalui Profil Saya
        </button>
      </div>
    </div>
  );
}
