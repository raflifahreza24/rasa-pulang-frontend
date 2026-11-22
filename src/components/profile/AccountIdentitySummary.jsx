export default function AccountIdentitySummary({ user }) {
  if (!user) return null;

  return (
    <div className="profile-identity-card" aria-label="Ringkasan Identitas Akun">
      <div className="profile-identity-inner">
        {/* Avatar Inisial Bulat */}
        <div className="profile-avatar-circle" aria-hidden="true">
          {user.initials || 'DP'}
        </div>

        <span className="profile-identity-divider" aria-hidden="true">|</span>

        <div className="profile-identity-names">
          <span className="profile-user-name">{user.name}</span>
          <span className="profile-user-email">{user.email}</span>
        </div>

        <span className="profile-role-badge">
          {user.roleLabel || (user.role === 'owner' ? 'Pemilik' : 'Staf')}
        </span>

        <span className="profile-identity-divider" aria-hidden="true">|</span>

        <span className="profile-own-account-label">
          Akun Anda
        </span>
      </div>
    </div>
  );
}
