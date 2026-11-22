/**
 * Panel Informasi Bawah 'Tentang Pemulihan Produk'
 * Menampilkan ringkasan aturan pemulihan produk untuk pemilik toko.
 */
export default function RestoreInformationPanel() {
  return (
    <div className="product-trash-info-panel" role="region" aria-label="Tentang Pemulihan Produk">
      <div className="product-trash-info-icon" aria-hidden="true">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#DC722C"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      </div>

      <div className="product-trash-info-content">
        <h3 className="product-trash-info-title">Tentang Pemulihan Produk</h3>
        <ul className="product-trash-info-list">
          <li>Pemulihan mengembalikan produk ke Daftar Produk beserta informasi dan fotonya.</li>
          <li>Produk hanya terlihat pelanggan jika dipublikasikan dan kategorinya aktif.</li>
          <li>Produk yang dipulihkan tidak otomatis menjadi unggulan. Atur kembali melalui Edit Produk.</li>
        </ul>
        <p className="product-trash-info-footer">
          Tindakan pemulihan hanya dapat dilakukan oleh pemilik.
        </p>
      </div>
    </div>
  );
}
