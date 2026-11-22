import { useState } from 'react';
import LoginVisualPanel from '../components/auth/LoginVisualPanel';
import LoginForm from '../components/auth/LoginForm';
import ToastNotice from '../components/ui/ToastNotice';

export default function LoginPage({ onNavigate, onLoginSuccess }) {
  const [toastMessage, setToastMessage] = useState('');

  const handleLoginSuccess = (user) => {
    setToastMessage(`Login berhasil sebagai ${user.roleLabel} (${user.name}). Membuka dashboard...`);
    setTimeout(() => {
      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
      if (onNavigate) {
        onNavigate('/dashboard');
      }
    }, 900);
  };

  const handleBackToWebsite = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/');
    }
  };

  return (
    <div className="login-page-root">
      {/* 1. Strip Simulasi Portofolio Paling Atas */}
      <div className="login-top-banner" role="region" aria-label="Catatan status simulasi portofolio">
        <p className="login-top-banner-text">
          Simulasi portofolio — bisnis dan akun bukan data operasional toko.
        </p>
      </div>

      {/* 2. Kontainer Utama Halaman Login */}
      <main className="login-main-container">
        <div className="login-content-wrapper login-animate-fade">
          {/* Panel Kiri: Foto Interior Toko & Teks */}
          <LoginVisualPanel />

          {/* Kolom Kanan: Kartu Formulir Login & Tautan Kembali */}
          <div className="login-form-column">
            <LoginForm onLoginSuccess={handleLoginSuccess} />

            {/* Tautan Kembali ke Website */}
            <div className="login-back-wrapper">
              <a
                href="/"
                onClick={handleBackToWebsite}
                className="login-back-link"
                aria-label="Kembali ke Beranda Website Rasa Pulang"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Kembali ke Website</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer Sederhana */}
      <footer className="login-simple-footer">
        <p className="login-footer-text">
          <em>Rasa Pulang</em> · Akses pengelolaan untuk pemilik dan staf
        </p>
      </footer>

      {/* Notifikasi Toast */}
      <ToastNotice
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
