/**
 * Header Halaman Edit Produk Dashboard
 * Menampilkan Eyebrow, Judul H1, Deskripsi Dinamis, Tanggal Terakhir Diperbarui,
 * Penanda Kolom Wajib, dan Tombol Kembali ke Daftar.
 */
export default function EditProductHeader({
  productName,
  updatedAtText,
  onBackClick,
}) {
  return (
    <div className="create-product-header-wrap">
      <div className="create-product-header-left">
        <span className="create-product-eyebrow">KATALOG</span>
        <h1 className="create-product-page-title">Edit Produk</h1>
        <p className="create-product-page-desc">
          Perbarui informasi {productName || 'produk'}.
        </p>
        {updatedAtText && (
          <p className="edit-product-updated-text">
            Terakhir diperbarui: {updatedAtText}
          </p>
        )}
        <p className="create-product-required-legend">
          Kolom bertanda <span className="text-required">*</span> wajib diisi.
        </p>
      </div>

      <button
        type="button"
        className="create-product-btn-back"
        onClick={onBackClick}
        aria-label="Kembali ke Daftar Produk"
      >
        <span aria-hidden="true">&larr;</span>
        <span>Kembali ke Daftar</span>
      </button>
    </div>
  );
}
