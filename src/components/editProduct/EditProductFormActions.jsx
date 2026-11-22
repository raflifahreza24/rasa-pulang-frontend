/**
 * Sticky Bottom Actions Bar untuk Halaman Edit Produk
 * Menampilkan teks petunjuk dan tombol Batal serta Simpan Perubahan.
 */
export default function EditProductFormActions({
  onCancel,
  onSubmit,
  isSubmitting = false,
}) {
  return (
    <div className="create-product-actions-bar">
      <div className="create-product-actions-hint">
        <span>Periksa kembali perubahan sebelum menyimpan.</span>
      </div>

      <div className="create-product-actions-buttons">
        <button
          type="button"
          className="create-product-btn-cancel"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Batal
        </button>

        <button
          type="button"
          className="create-product-btn-submit"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          <svg
            width="17"
            height="17"
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
          <span>Simpan Perubahan</span>
        </button>
      </div>
    </div>
  );
}
