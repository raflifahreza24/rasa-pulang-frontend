import { useState } from 'react';
import { simulateLogin } from '../../data/demoAccounts';

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setFieldErrors({});

    // Validasi field kosong awal
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email wajib diisi.';
    }
    if (!password) {
      errors.password = 'Password wajib diisi.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await simulateLogin(email, password);
      if (result.success) {
        setPassword(''); // Bersihkan password dari state memori
        if (onLoginSuccess) {
          onLoginSuccess(result.user);
        }
      } else {
        setErrorMessage(result.error || 'Email atau password tidak sesuai.');
      }
    } catch {
      setErrorMessage('Terjadi kendala saat memproses login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-card">
      {/* A. Logo & Wordmark Proyek */}
      <div className="login-brand-header">
        <svg
          className="login-brand-icon"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M16 3L3 13.5V27C3 28.1 3.9 29 5 29H27C28.1 29 29 28.1 29 27V13.5L16 3Z"
            stroke="#DC722C"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 20C11 17.2 13.2 15 16 15C18.8 15 21 17.2 21 20"
            stroke="#DC722C"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="16" cy="11.5" r="2" fill="#DC722C" />
        </svg>
        <span className="login-brand-wordmark">Rasa Pulang</span>
      </div>

      {/* B. Identitas Dashboard & Judul */}
      <div className="login-header-text">
        <p className="login-eyebrow">DASHBOARD PEMILIK & STAF</p>
        <h1 className="login-title">Masuk ke Dashboard</h1>
        <p className="login-description">
          Gunakan akun yang telah disiapkan untuk mengelola katalog toko.
        </p>
      </div>

      {/* Pesan Kesalahan Umum */}
      {errorMessage && (
        <div className="login-alert-error" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Formulir Login */}
      <form onSubmit={handleSubmit} noValidate className="login-form">
        {/* Field Email */}
        <div className="login-field-group">
          <label htmlFor="login-email" className="login-label">
            Email
          </label>
          <div className={`login-input-wrapper ${fieldErrors.email ? 'has-error' : ''}`}>
            <span className="login-input-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <input
              id="login-email"
              type="email"
              name="email"
              autoComplete="username"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) {
                  setFieldErrors((prev) => ({ ...prev, email: null }));
                }
                if (errorMessage) setErrorMessage('');
              }}
              className="login-input"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              disabled={isSubmitting}
            />
          </div>
          {fieldErrors.email && (
            <p id="email-error" className="login-field-error">
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Field Password */}
        <div className="login-field-group">
          <label htmlFor="login-password" className="login-label">
            Password
          </label>
          <div className={`login-input-wrapper ${fieldErrors.password ? 'has-error' : ''}`}>
            <span className="login-input-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="current-password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: null }));
                }
                if (errorMessage) setErrorMessage('');
              }}
              className="login-input with-toggle"
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={fieldErrors.password ? 'password-error' : undefined}
              disabled={isSubmitting}
            />
            <button
              type="button"
              className="login-password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              tabIndex={0}
              disabled={isSubmitting}
            >
              {showPassword ? (
                /* Icon Mata Dicoret (Hide) */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                /* Icon Mata (Show) */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {fieldErrors.password && (
            <p id="password-error" className="login-field-error">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* Tombol Submit "Masuk ->" */}
        <button
          type="submit"
          className="login-submit-btn hover-button-solid"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="login-btn-loading">
              <span className="login-spinner" aria-hidden="true" />
              <span>Memproses...</span>
            </span>
          ) : (
            <span className="login-btn-content">
              <span>Masuk</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          )}
        </button>

        {/* Bantuan Akses Staf */}
        <div className="login-help-note">
          <svg className="login-help-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>
            Akun staf dibuat oleh pemilik. Hubungi pemilik jika mengalami kendala akses.
          </span>
        </div>

        {/* Divider & Badge Simulasi */}
        <div className="login-divider-wrap">
          <div className="login-divider-line" />
          <span className="login-simulation-badge">SIMULASI PORTOFOLIO</span>
          <div className="login-divider-line" />
        </div>
      </form>
    </div>
  );
}
