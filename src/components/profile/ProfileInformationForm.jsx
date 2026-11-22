import { useState, useEffect } from 'react';

export default function ProfileInformationForm({
  user,
  onSaveProfile,
  onDirtyChange,
}) {
  const [name, setName] = useState(user?.name || '');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pantau apakah ada perubahan draft nama
  useEffect(() => {
    const isDirty = (name || '').trim() !== (user?.name || '').trim();
    if (onDirtyChange) {
      onDirtyChange(isDirty);
    }
  }, [name, user?.name, onDirtyChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();

    if (!cleanName) {
      setError('Nama lengkap wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    try {
      onSaveProfile(cleanName);
      setError('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isUnchanged = name.trim() === (user?.name || '').trim();

  return (
    <section className="profile-card" aria-labelledby="profile-info-heading">
      <div className="profile-card-header">
        <h2 id="profile-info-heading" className="profile-card-title">
          1. Informasi Profil
        </h2>
        <p className="profile-card-desc">
          Nama digunakan pada identitas akun di dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="profile-form" noValidate>
        <div className="profile-grid-two-cols">
          {/* Kolom Kiri: Nama Lengkap */}
          <div className="profile-form-group">
            <label htmlFor="profile-fullname-input" className="profile-form-label">
              Nama Lengkap
            </label>
            <input
              id="profile-fullname-input"
              type="text"
              className={`profile-form-input ${error ? 'is-invalid' : ''}`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Masukkan nama lengkap Anda..."
              aria-invalid={!!error}
              aria-describedby={error ? 'profile-name-error' : undefined}
            />
            {error && (
              <span id="profile-name-error" className="profile-field-error">
                {error}
              </span>
            )}

            <div className="profile-role-display-text">
              Peran akun: <strong>{user?.roleLabel || (user?.role === 'owner' ? 'Pemilik' : 'Staf')}</strong>
            </div>
          </div>

          {/* Kolom Kanan: Email Readonly */}
          <div className="profile-form-group">
            <label htmlFor="profile-email-readonly" className="profile-form-label">
              Email
            </label>
            <div className="profile-readonly-input-wrapper">
              <svg
                className="profile-readonly-lock-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A6F64"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="profile-email-readonly"
                type="email"
                readOnly
                className="profile-form-input profile-form-input-readonly"
                value={user?.email || ''}
                aria-describedby="profile-email-hint"
              />
            </div>
            <span id="profile-email-hint" className="profile-field-hint">
              Email digunakan untuk masuk dan tidak diubah melalui halaman ini.
            </span>
          </div>
        </div>

        <div className="profile-card-action-row">
          <button
            type="submit"
            className="profile-btn-save"
            disabled={isSubmitting || isUnchanged}
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
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Simpan Profil
          </button>
        </div>
      </form>
    </section>
  );
}
