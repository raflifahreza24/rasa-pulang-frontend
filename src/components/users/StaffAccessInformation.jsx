export default function StaffAccessInformation() {
  return (
    <div className="staff-rules-section">
      <div className="staff-rules-card" role="region" aria-labelledby="staff-rules-heading">
        <div className="staff-rules-header">
          <div className="staff-rules-icon-box" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#A64B17"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 id="staff-rules-heading" className="staff-rules-title">
            Aturan Akses Akun Staf
          </h2>
        </div>

        <ul className="staff-rules-list">
          <li>Staf dapat mengelola kategori dan menambah atau mengedit produk.</li>
          <li>
            Staf tidak dapat menghapus atau memulihkan produk, mengubah konten dan pengaturan toko, atau mengelola pengguna.
          </li>
          <li>Akun yang dinonaktifkan tidak dapat mengakses dashboard.</li>
        </ul>

        <p className="staff-rules-notice">
          Akun staf dibuat oleh pemilik. Tidak ada pendaftaran melalui website publik.
        </p>
      </div>

      <p className="staff-rules-footer-note">
        Gunakan akun terpisah agar akses pengelolaan tetap jelas.
      </p>
    </div>
  );
}
