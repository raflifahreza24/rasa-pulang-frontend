import { useRef } from 'react';
import ImageWithFallback from '../ui/ImageWithFallback';

export default function BannerContentSection({
  bannerData,
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
    <section className="website-content-card" aria-labelledby="banner-section-title">
      <div className="website-content-card-header">
        <h2 id="banner-section-title" className="website-content-card-title">
          1. Banner Utama
        </h2>
        <p className="website-content-card-desc">
          Konten yang muncul pada bagian utama Beranda.
        </p>
      </div>

      <div className="website-content-grid-two-cols">
        {/* Kolom Kiri: Teks Banner */}
        <div className="website-content-form-col">
          <div className="website-content-form-group">
            <label htmlFor="banner-title" className="website-content-label">
              Judul Banner
            </label>
            <input
              id="banner-title"
              type="text"
              name="title"
              className="website-content-input"
              value={bannerData.title}
              onChange={(e) => onChange('title', e.target.value)}
              placeholder="Masukkan judul banner utama..."
            />
          </div>

          <div className="website-content-form-group">
            <label htmlFor="banner-intro" className="website-content-label">
              Kalimat Pengantar
            </label>
            <textarea
              id="banner-intro"
              name="intro"
              rows={4}
              className="website-content-textarea"
              value={bannerData.intro}
              onChange={(e) => onChange('intro', e.target.value)}
              placeholder="Tulis kalimat pengantar banner..."
            />
          </div>
        </div>

        {/* Kolom Kanan: Pratinjau & Ganti Gambar */}
        <div className="website-content-image-col">
          <label className="website-content-label">Gambar Banner</label>
          <div className="website-content-image-preview-frame">
            <ImageWithFallback
              src={bannerData.image}
              alt="Pratinjau gambar banner utama"
              fallbackText="Gambar banner utama"
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
              aria-label="Pilih berkas foto banner utama"
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
              Ganti Gambar Banner
            </button>

            {hasCustomImage && (
              <button
                type="button"
                onClick={onImageReset}
                className="website-content-btn-reset-image"
                title="Kembalikan ke gambar sebelumnya"
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

      {/* Catatan Bawah Panel */}
      <div className="website-content-notice-box">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#A64B17"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span>Versi pertama menggunakan satu banner utama.</span>
      </div>
    </section>
  );
}
