import { useRef } from 'react';
import ImageWithFallback from '../ui/ImageWithFallback';

export default function BusinessStorySection({
  storyData,
  onChange,
  onImageChange,
  onImageReset,
  hasCustomImage,
}) {
  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  return (
    <section className="website-content-card" aria-labelledby="story-section-title">
      <div className="website-content-card-header">
        <h2 id="story-section-title" className="website-content-card-title">
          2. Cerita Usaha
        </h2>
        <p className="website-content-card-desc">
          Informasi yang digunakan pada Beranda dan halaman Tentang Kami.
        </p>
      </div>

      <div className="website-content-grid-two-cols">
        {/* Kolom Kiri: Teks Cerita Usaha */}
        <div className="website-content-form-col">
          <div className="website-content-form-group">
            <label htmlFor="story-text" className="website-content-label">
              Cerita Usaha
            </label>
            <textarea
              id="story-text"
              name="text"
              rows={9}
              className="website-content-textarea website-content-textarea-story"
              value={storyData.text}
              onChange={(e) => onChange('text', e.target.value)}
              placeholder="Tuliskan cerita usaha, asal-usul toko, dan visi Rasa Pulang..."
            />
            <span className="website-content-field-hint">
              Gunakan paragraf singkat yang mudah dibaca.
            </span>
          </div>
        </div>

        {/* Kolom Kanan: Pratinjau & Ganti Foto Toko */}
        <div className="website-content-image-col">
          <label className="website-content-label">Foto Toko</label>
          <div className="website-content-image-preview-frame">
            <ImageWithFallback
              src={storyData.image}
              alt="Pratinjau foto interior toko Rasa Pulang"
              fallbackText="Foto interior toko"
              className="website-content-image-preview"
            />
          </div>

          <div className="website-content-upload-actions">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="website-content-hidden-file"
              aria-label="Pilih berkas foto interior toko"
            />
            <button
              type="button"
              onClick={handleFileClick}
              className="website-content-btn-upload"
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Ganti Foto Toko
            </button>

            {hasCustomImage && (
              <button
                type="button"
                onClick={onImageReset}
                className="website-content-btn-reset-image"
                title="Kembalikan ke foto toko sebelumnya"
              >
                Batalkan Penggantian
              </button>
            )}
          </div>

          <span className="website-content-upload-hint">
            JPG, PNG, atau WebP · Maksimal 2 MB.
          </span>
        </div>
      </div>
    </section>
  );
}
