import { useState } from 'react';
import ImageWithFallback from '../ui/ImageWithFallback';

export default function ProductGallery({ images = [], productName }) {
  const [activePosition, setActivePosition] = useState(0);
  const [prevProductName, setPrevProductName] = useState(productName);
  const [isFading, setIsFading] = useState(false);

  // Reset posisi aktif jika produk berganti (sesuai standar React)
  if (prevProductName !== productName) {
    setPrevProductName(productName);
    setActivePosition(0);
  }

  const activeImage = images[activePosition] || images[0] || {
    path: '',
    alt: productName,
    label: 'Foto produk',
  };

  const handleThumbnailClick = (index) => {
    if (index === activePosition) return;
    setIsFading(true);
    setTimeout(() => {
      setActivePosition(index);
      setIsFading(false);
    }, 120);
  };

  return (
    <div className="product-gallery-container detail-animate-gallery" aria-label={`Galeri foto ${productName}`}>
      {/* Area Tampil Foto Utama */}
      <div className="main-image-viewport">
        <div className={`main-image-inner ${isFading ? 'image-fading' : ''}`}>
          <ImageWithFallback
            src={activeImage.path}
            alt={activeImage.alt || productName}
            aspectRatio="1 / 1"
            placeholderLabel={activeImage.label || 'Foto produk'}
            priority={true}
          />
        </div>
      </div>

      {/* Baris Thumbnail (Maksimal 5 foto) */}
      {images.length > 1 && (
        <div className="gallery-thumbnails-row" role="tablist" aria-label="Pilihan foto produk">
          {images.map((img, index) => {
            const isActive = index === activePosition;
            return (
              <button
                key={img.id || index}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Lihat foto ${index + 1}: ${img.label || img.alt || productName}`}
                onClick={() => handleThumbnailClick(index)}
                className={`gallery-thumb-btn ${isActive ? 'thumb-active' : ''}`}
              >
                <div className="thumb-image-wrapper">
                  <ImageWithFallback
                    src={img.path}
                    alt={img.alt || `${productName} thumbnail ${index + 1}`}
                    aspectRatio="1 / 1"
                    placeholderLabel={img.label || 'Foto'}
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
