import { useRef } from 'react';
import ImageWithFallback from '../ui/ImageWithFallback';

/**
 * Panel 4: Foto Produk (Khusus Halaman Edit Produk)
 * Mengelola Foto Utama dengan badge 'Utama', tombol 'Ganti Foto Utama',
 * serta hingga 4 Foto Tambahan dengan tombol 'Jadikan Utama' (swap) dan hapus '✕'.
 */
export default function EditProductImagesSection({
  primaryImage,
  additionalImages = [],
  errors = {},
  onPrimaryImageChange,
  onAddAdditionalImage,
  onRemoveAdditionalImage,
  onSwapWithPrimary,
}) {
  const primaryFileInputRef = useRef(null);
  const additionalFileInputRef = useRef(null);

  // Validasi format dan ukuran file
  const validateFile = (file) => {
    if (!file) return 'Harap pilih berkas gambar.';
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return 'Format tidak didukung. Harap pilih gambar JPG, PNG, atau WebP.';
    }
    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      return 'Ukuran gambar melebihi 2 MB. Harap pilih gambar yang lebih kecil.';
    }
    return null;
  };

  // Handler pemilihan foto utama baru
  const handlePrimaryFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      alert(error);
      if (primaryFileInputRef.current) primaryFileInputRef.current.value = '';
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    onPrimaryImageChange({
      id: `local-primary-${Date.now()}`,
      path: objectUrl,
      file,
      alt: 'Foto Utama Produk Baru',
      label: 'Foto utama',
      isBlob: true,
    });

    if (primaryFileInputRef.current) primaryFileInputRef.current.value = '';
  };

  // Handler penambahan foto tambahan
  const handleAdditionalFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (additionalImages.length >= 4) {
      alert('Maksimal 4 foto tambahan yang dapat digunakan.');
      if (additionalFileInputRef.current) additionalFileInputRef.current.value = '';
      return;
    }

    const error = validateFile(file);
    if (error) {
      alert(error);
      if (additionalFileInputRef.current) additionalFileInputRef.current.value = '';
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    onAddAdditionalImage({
      id: `local-add-${Date.now()}`,
      path: objectUrl,
      file,
      alt: `Foto Tambahan ${additionalImages.length + 1}`,
      label: `Foto ${additionalImages.length + 1}`,
      isBlob: true,
    });

    if (additionalFileInputRef.current) additionalFileInputRef.current.value = '';
  };

  const emptySlotsCount = Math.max(0, 4 - additionalImages.length);

  return (
    <section className="create-product-card-section" aria-labelledby="section-photos-title">
      <div className="create-product-section-header">
        <h2 id="section-photos-title" className="create-product-section-title">
          4. Foto Produk
        </h2>
        <p className="create-product-section-subtitle">
          Kelola foto yang sudah tersimpan atau tambahkan foto baru.
        </p>
      </div>

      <div className="create-product-fields-wrap">
        <div className="edit-product-photos-layout">
          {/* Sisi Kiri: Foto Utama */}
          <div className="edit-product-primary-col">
            <span className="create-product-label">
              Foto Utama <span className="text-required">*</span>
            </span>

            <div className={`edit-product-primary-card ${errors.primaryImage ? 'has-error' : ''}`}>
              <div className="edit-product-primary-img-wrapper">
                <span className="edit-product-primary-badge">Utama</span>
                <ImageWithFallback
                  src={primaryImage?.path}
                  alt={primaryImage?.alt || 'Foto Utama Produk'}
                  className="edit-product-primary-img"
                  fallbackText="Foto Utama"
                />
              </div>

              {/* Tombol Ganti Foto Utama */}
              <input
                ref={primaryFileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={handlePrimaryFileSelect}
                aria-label="Pilih berkas foto utama baru"
              />
              <button
                type="button"
                className="edit-product-btn-change-primary"
                onClick={() => primaryFileInputRef.current?.click()}
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
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span>Ganti Foto Utama</span>
              </button>
            </div>

            {errors.primaryImage && (
              <p className="create-product-error-text" role="alert">
                {errors.primaryImage}
              </p>
            )}
          </div>

          {/* Sisi Kanan: Foto Tambahan (Maksimal 4 Slot) */}
          <div className="edit-product-additional-col">
            <span className="create-product-label">
              Foto Tambahan (Opsional)
            </span>

            <input
              ref={additionalFileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={handleAdditionalFileSelect}
              aria-label="Pilih berkas foto tambahan baru"
            />

            <div className="edit-product-additional-grid">
              {/* Slot yang terisi foto */}
              {additionalImages.map((img, index) => (
                <div key={img.id || index} className="edit-product-additional-slot filled">
                  <div className="edit-product-additional-img-wrap">
                    <ImageWithFallback
                      src={img.path}
                      alt={img.alt || `Foto Tambahan ${index + 1}`}
                      className="edit-product-additional-img"
                      fallbackText={img.label || `Foto ${index + 1}`}
                    />
                    {/* Tombol Hapus X */}
                    <button
                      type="button"
                      className="edit-product-btn-delete-slot"
                      onClick={() => onRemoveAdditionalImage(index)}
                      title={`Hapus foto tambahan ${index + 1}`}
                      aria-label={`Hapus foto tambahan ${index + 1}`}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  {/* Tombol Jadikan Utama */}
                  <button
                    type="button"
                    className="edit-product-btn-make-primary"
                    onClick={() => onSwapWithPrimary(index)}
                  >
                    Jadikan Utama
                  </button>
                </div>
              ))}

              {/* Slot kosong untuk penambahan foto */}
              {Array.from({ length: emptySlotsCount }).map((_, index) => (
                <button
                  key={`empty-${index}`}
                  type="button"
                  className="edit-product-additional-slot empty"
                  onClick={() => additionalFileInputRef.current?.click()}
                  title="Tambah foto tambahan"
                  aria-label="Tambah foto tambahan"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8C7362"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span className="edit-product-empty-slot-text">Tambah Foto</span>
                </button>
              ))}
            </div>

            {/* Info Jumlah Slot Terpakai */}
            <p className="edit-product-slot-counter">
              {additionalImages.length} dari 4 foto tambahan digunakan.
            </p>
          </div>
        </div>

        {/* Catatan Format & Batas Ukuran */}
        <div className="create-product-note-badge">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8C7362"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>JPG, PNG, atau WebP · Maksimal 2 MB per gambar.</span>
        </div>

        <p className="create-product-helper-text">
          Perubahan foto diterapkan setelah Anda menyimpan. Produk wajib memiliki satu foto utama.
        </p>
      </div>
    </section>
  );
}
