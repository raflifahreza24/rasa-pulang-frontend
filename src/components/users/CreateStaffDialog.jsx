import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export default function CreateStaffDialog({
  isOpen,
  onClose,
  onSubmit,
  existingEmails = [],
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = useCallback(() => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  // Kunci scroll body dan tangani tombol Escape saat modal aktif
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Nama staf wajib diisi.';
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      newErrors.email = 'Masukkan alamat email yang valid.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        newErrors.email = 'Masukkan alamat email yang valid.';
      } else if (existingEmails.map((e) => e.toLowerCase()).includes(cleanEmail)) {
        newErrors.email = 'Email sudah digunakan.';
      }
    }

    if (!password) {
      newErrors.password = 'Password minimal delapan karakter.';
    } else if (password.length < 8) {
      newErrors.password = 'Password minimal delapan karakter.';
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Konfirmasi password tidak sesuai.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      onSubmit({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalJSX = (
    <div
      className="users-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-staff-modal-title"
      onClick={handleClose}
    >
      <div
        className="users-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="users-modal-header">
          <h2 id="create-staff-modal-title" className="users-modal-title">
            Tambah Akun Staf
          </h2>
          <p className="users-modal-desc">
            Buat akun terpisah untuk staf yang membantu mengelola katalog.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="users-modal-form" noValidate>
          {/* Field Nama */}
          <div className="users-form-group">
            <label htmlFor="staff-name-input" className="users-form-label">
              Nama Staf <span className="users-required">*</span>
            </label>
            <input
              id="staff-name-input"
              type="text"
              className={`users-form-input ${errors.name ? 'is-invalid' : ''}`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="Contoh: Budi Santoso"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'staff-name-error' : undefined}
              autoFocus
            />
            {errors.name && (
              <span id="staff-name-error" className="users-form-error">
                {errors.name}
              </span>
            )}
          </div>

          {/* Field Email */}
          <div className="users-form-group">
            <label htmlFor="staff-email-input" className="users-form-label">
              Email Staf <span className="users-required">*</span>
            </label>
            <input
              id="staff-email-input"
              type="email"
              className={`users-form-input ${errors.email ? 'is-invalid' : ''}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="staf.baru@rasapulang.example"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'staff-email-error' : undefined}
            />
            {errors.email && (
              <span id="staff-email-error" className="users-form-error">
                {errors.email}
              </span>
            )}
          </div>

          {/* Field Password Awal */}
          <div className="users-form-group">
            <label htmlFor="staff-password-input" className="users-form-label">
              Password Awal <span className="users-required">*</span>
            </label>
            <div className="users-password-wrapper">
              <input
                id="staff-password-input"
                type={showPassword ? 'text' : 'password'}
                className={`users-form-input users-password-input ${errors.password ? 'is-invalid' : ''}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                placeholder="Minimal 8 karakter"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'staff-password-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="users-password-toggle-btn"
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span id="staff-password-error" className="users-form-error">
                {errors.password}
              </span>
            )}
          </div>

          {/* Field Konfirmasi Password */}
          <div className="users-form-group">
            <label htmlFor="staff-confirm-password-input" className="users-form-label">
              Konfirmasi Password <span className="users-required">*</span>
            </label>
            <div className="users-password-wrapper">
              <input
                id="staff-confirm-password-input"
                type={showConfirmPassword ? 'text' : 'password'}
                className={`users-form-input users-password-input ${errors.confirmPassword ? 'is-invalid' : ''}`}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                }}
                placeholder="Ulangi password di atas"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'staff-confirm-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="users-password-toggle-btn"
                aria-label={showConfirmPassword ? 'Sembunyikan konfirmasi password' : 'Tampilkan konfirmasi password'}
              >
                {showConfirmPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
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
              <span id="staff-confirm-error" className="users-form-error">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <div className="users-modal-actions">
            <button
              type="button"
              onClick={handleClose}
              className="users-btn-cancel"
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button
              type="submit"
              className="users-btn-submit"
              disabled={isSubmitting}
            >
              Tambah Staf
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalJSX, document.body)
    : null;
}
