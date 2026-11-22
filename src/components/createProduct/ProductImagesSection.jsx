import { useRef } from 'react';

export default function ProductImagesSection({
  primaryImage,
  additionalImages = [],
  errors = {},
  onSelectPrimaryImage,
  onRemovePrimaryImage,
  onAddAdditionalImages,
  onRemoveAdditionalImage,
}) {
  const primaryInputRef = useRef(null);
  const additionalInputRef = useRef(null);

  // Validasi file lokal sebelum diproses
  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return 'Format tidak didukung. Harap pilih gambar JPG, PNG, atau WebP.';
    }
    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      return 'Ukuran gambar melebihi 2 MB.';
    }
    return null;
  };

  const handlePrimaryFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      alert(error);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    onSelectPrimaryImage({ file, previewUrl: objectUrl });
  };

  const handleAdditionalFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = 4 - additionalImages.length;
    if (files.length > remainingSlots) {
      alert(`Maksimal 4 foto tambahan. Anda hanya dapat menambahkan ${remainingSlots} foto lagi.`);
    }

    const validNewImages = [];
    for (const file of files.slice(0, remainingSlots)) {
      const error = validateFile(file);
      if (error) {
        alert(`${file.name}: ${error}`);
        continue;
      }
      validNewImages.push({
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }

    if (validNewImages.length > 0) {
      onAddAdditionalImages(validNewImages);
    }

    if (additionalInputRef.current) {
      additionalInputRef.current.value = '';
    }
  };

  return (
    <section className="create-product-card-section" aria-labelledby="section-photos-title">
      <div className="create-product-section-header">
        <h2 id="section-photos-title" className="create-product-section-title">
          4. Foto Produk
        </h2>
        <p className="create-product-section-subtitle">
          Gunakan foto yang jelas dan konsisten agar produk mudah dikenali.
        </p>
      </div>

      <div className="create-product-fields-wrap">
        <div className="create-product-photos-layout">
          {/* Sisi Kiri: Foto Utama (Wajib) */}
          <div className="create-product-primary-photo-col">
            <span className="create-product-label photo-header">
              Foto Utama <span className="text-required">*</span>
            </span>

            {primaryImage?.previewUrl ? (
              <div className="create-product-primary-preview-box">
                <img
                  src={primaryImage.previewUrl}
                  alt="Pratinjau Foto Utama Produk"
                  className="create-product-primary-img"
                />
                <div className="create-product-img-overlay">
                  <button
                    type="button"
                    className="create-product-btn-img-action change"
                    onClick={() => primaryInputRef.current?.click()}
                    aria-label="Ganti Foto Utama"
                  >
                    Ganti
                  </button>
                  <button
                    type="button"
                    className="create-product-btn-img-action remove"
                    onClick={onRemovePrimaryImage}
                    aria-label="Hapus Foto Utama"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`create-product-primary-dropzone ${errors.primaryImage ? 'has-error' : ''}`}
                onClick={() => primaryInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    primaryInputRef.current?.click();
                  }
                }}
                aria-label="Pilih foto utama produk dari perangkat"
              >
                <div className="create-product-dropzone-icon-wrap" aria-hidden="true">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8A7365"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                    <line x1="12" y1="11" x2="12" y2="17" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                  </svg>
                </div>
                <span className="create-product-dropzone-title">Unggah Foto Utama</span>
                <span className="create-product-dropzone-subtitle">Klik untuk memilih gambar</span>
              </div>
            )}

            <input
              ref={primaryInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              className="create-product-hidden-file"
              onChange={handlePrimaryFileChange}
              aria-label="Unggah Foto Utama Produk"
            />

            {errors.primaryImage && (
              <p className="create-product-error-text" role="alert">
                {errors.primaryImage}
              </p>
            )}
          </div>

          {/* Sisi Kanan: Foto Tambahan (Opsional, Maks 4 Slot) */}
          <div className="create-product-additional-photos-col">
            <span className="create-product-label photo-header">
              Foto Tambahan <span className="create-product-optional-tag">(Opsional)</span>
            </span>

            <div className="create-product-additional-slots-row">
              {[0, 1, 2, 3].map((index) => {
                const item = additionalImages[index];

                return (
                  <div key={index} className="create-product-sub-slot-wrap">
                    {item ? (
                      <div className="create-product-sub-preview-box">
                        <img
                          src={item.previewUrl}
                          alt={`Pratinjau Foto Tambahan ${index + 1}`}
                          className="create-product-sub-img"
                        />
                        <button
                          type="button"
                          className="create-product-btn-sub-remove"
                          onClick={() => onRemoveAdditionalImage(index)}
                          aria-label={`Hapus foto tambahan ${index + 1}`}
                          title="Hapus foto"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div
                        className="create-product-sub-dropzone"
                        onClick={() => additionalInputRef.current?.click()}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            additionalInputRef.current?.click();
                          }
                        }}
                        aria-label={`Unggah foto tambahan slot ${index + 1}`}
                      >
                        <span className="create-product-plus-icon" aria-hidden="true">+</span>
                        <span className="create-product-slot-label">Foto {index + 1}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <input
              ref={additionalInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              multiple
              className="create-product-hidden-file"
              onChange={handleAdditionalFilesChange}
              aria-label="Unggah Foto Tambahan Produk"
            />

            <p className="create-product-helper-text">
              Maksimal 4 foto tambahan.
            </p>
          </div>
        </div>

        {/* Panel Informasi Format & Ukuran */}
        <div className="create-product-format-note">
          <svg
            className="create-product-note-icon"
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
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>JPG, PNG, atau WebP · Maksimal 2 MB per gambar.</span>
        </div>

        <p className="create-product-helper-text photo-bottom">
          Foto utama wajib tersedia. Foto tambahan membantu pelanggan melihat detail produk.
        </p>
      </div>
    </section>
  );
}
