import { useState, useEffect } from 'react';
import { checkUserPassword } from '../../data/usersStore';

export default function ChangePasswordForm({
  user,
  onSavePassword,
  onDirtyChange,
}) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pantau apakah ada input password yang sedang terisi
  useEffect(() => {
    const isDirty = Boolean(currentPassword || newPassword || confirmPassword);
    if (onDirtyChange) {
      onDirtyChange(isDirty);
    }
  }, [currentPassword, newPassword, confirmPassword, onDirtyChange]);

  const validate = () => {
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = 'Password saat ini wajib diisi.';
    } else if (!checkUserPassword(user?.email, currentPassword)) {
      newErrors.currentPassword = 'Password saat ini tidak sesuai.';
    }

    if (!newPassword) {
      newErrors.newPassword = 'Password baru wajib diisi.';
    } else if (newPassword === currentPassword) {
      newErrors.newPassword = 'Password baru harus berbeda dari password saat ini.';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password baru minimal delapan karakter.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password baru tidak sesuai.';
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'Konfirmasi password baru tidak sesuai.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = onSavePassword(currentPassword, newPassword);
      if (res && res.success) {
        // Bersihkan state password setelah berhasil
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowCurrent(false);
        setShowNew(false);
        setShowConfirm(false);
        setErrors({});
      } else if (res && res.error) {
        setErrors({ currentPassword: res.error });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="profile-card" aria-labelledby="password-card-heading">
      <div className="profile-card-header">
        <h2 id="password-card-heading" className="profile-card-title">
          2. Ubah Password
        </h2>
        <p className="profile-card-desc">
          Gunakan password yang berbeda dari password saat ini.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="profile-form" noValidate>
        {/* Field 1: Password Saat Ini (Full Width) */}
        <div className="profile-form-group">
          <label htmlFor="current-password-input" className="profile-form-label">
            Password Saat Ini
          </label>
          <div className="profile-password-input-wrapper">
            <svg
              className="profile-input-icon-left"
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
              id="current-password-input"
              type={showCurrent ? 'text' : 'password'}
              autoComplete="current-password"
              className={`profile-form-input profile-password-field ${errors.currentPassword ? 'is-invalid' : ''}`}
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                if (errors.currentPassword) setErrors((prev) => ({ ...prev, currentPassword: undefined }));
              }}
              placeholder="Masukkan password saat ini"
              aria-invalid={!!errors.currentPassword}
              aria-describedby={errors.currentPassword ? 'current-pw-error' : undefined}
            />
            <button
              type="button"
              onClick={() => setShowCurrent((prev) => !prev)}
              className="profile-password-eye-btn"
              aria-label={showCurrent ? 'Sembunyikan password saat ini' : 'Tampilkan password saat ini'}
            >
              {showCurrent ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="23" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <span id="current-pw-error" className="profile-field-error">
              {errors.currentPassword}
            </span>
          )}
        </div>

        {/* Baris 2: Dua Kolom (Password Baru & Konfirmasi) */}
        <div className="profile-grid-two-cols">
          {/* Kolom Kiri: Password Baru */}
          <div className="profile-form-group">
            <label htmlFor="new-password-input" className="profile-form-label">
              Password Baru
            </label>
            <div className="profile-password-input-wrapper">
              <svg
                className="profile-input-icon-left"
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
                id="new-password-input"
                type={showNew ? 'text' : 'password'}
                autoComplete="new-password"
                className={`profile-form-input profile-password-field ${errors.newPassword ? 'is-invalid' : ''}`}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: undefined }));
                }}
                placeholder="Masukkan password baru"
                aria-invalid={!!errors.newPassword}
                aria-describedby={errors.newPassword ? 'new-pw-error' : 'new-pw-hint'}
              />
              <button
                type="button"
                onClick={() => setShowNew((prev) => !prev)}
                className="profile-password-eye-btn"
                aria-label={showNew ? 'Sembunyikan password baru' : 'Tampilkan password baru'}
              >
                {showNew ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="23" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.newPassword ? (
              <span id="new-pw-error" className="profile-field-error">
                {errors.newPassword}
              </span>
            ) : (
              <span id="new-pw-hint" className="profile-field-hint">
                Gunakan password yang kuat dan mudah Anda ingat.
              </span>
            )}
          </div>

          {/* Kolom Kanan: Konfirmasi Password Baru */}
          <div className="profile-form-group">
            <label htmlFor="confirm-password-input" className="profile-form-label">
              Konfirmasi Password Baru
            </label>
            <div className="profile-password-input-wrapper">
              <svg
                className="profile-input-icon-left"
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
                id="confirm-password-input"
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                className={`profile-form-input profile-password-field ${errors.confirmPassword ? 'is-invalid' : ''}`}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                }}
                placeholder="Ulangi password baru"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'confirm-pw-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="profile-password-eye-btn"
                aria-label={showConfirm ? 'Sembunyikan konfirmasi password baru' : 'Tampilkan konfirmasi password baru'}
              >
                {showConfirm ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="23" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span id="confirm-pw-error" className="profile-field-error">
                {errors.confirmPassword}
              </span>
            )}
          </div>
        </div>

        {/* Kotak Catatan Beige Keamanan */}
        <div className="profile-notice-box">
          <svg
            className="profile-notice-shield-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A64B17"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>
            Jangan bagikan password kepada siapa pun. Perubahan password hanya berlaku untuk akun Anda sendiri.
          </span>
        </div>

        <div className="profile-card-action-row">
          <button
            type="submit"
            className="profile-btn-save"
            disabled={isSubmitting}
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
              <circle cx="7.5" cy="15.5" r="5.5" />
              <path d="M21 2l-9.6 9.6" />
              <path d="M15.5 7.5l3 3L22 7l-3-3" />
            </svg>
            Simpan Password
          </button>
        </div>
      </form>
    </section>
  );
}
