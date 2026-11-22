import { useState, useMemo } from 'react';

/**
 * Deteksi keberadaan file gambar di folder public/images/rasa-pulang
 * Menggunakan import.meta.glob Vite untuk menghindari request 404 saat gambar belum dimasukkan.
 */
let existingAssetsMap = null;
try {
  // Vite mendukung eager globbing untuk mendeteksi file lokal yang sudah ada di disk
  const assets = import.meta.glob('/public/images/rasa-pulang/**/*.{webp,png,jpg,jpeg,svg}', { eager: true });
  existingAssetsMap = assets;
} catch {
  existingAssetsMap = null;
}

/**
 * Komponen gambar reusable dengan fallback placeholder elegan.
 *
 * @param {string} src - URL gambar publik (misal: '/images/rasa-pulang/hero/hero-snacks.webp')
 * @param {string} alt - Alt text deskriptif untuk aksesibilitas
 * @param {string} aspectRatio - Rasio aspek CSS (misal: '16 / 11', '1 / 1', '4 / 3')
 * @param {string} placeholderLabel - Label untuk placeholder (default: 'Foto produk')
 * @param {string} className - Kelas CSS tambahan
 * @param {string} objectFit - CSS object-fit ('cover', 'contain', dsb.)
 * @param {boolean} priority - true jika hero (eager loading), false jika lazy loading
 */
export default function ImageWithFallback({
  src,
  alt = 'Foto Rasa Pulang',
  aspectRatio = '1 / 1',
  placeholderLabel = 'Foto produk',
  className = '',
  objectFit = 'cover',
  priority = false,
}) {
  const [loadFailed, setLoadFailed] = useState(false);

  // Periksa apakah file fisik sudah ada di disk
  const isPhysicallyAvailable = useMemo(() => {
    if (!src) return false;
    if (!existingAssetsMap) {
      // Jika environment bukan Vite atau glob tidak tersedia, biarkan browser memuat
      return true;
    }
    // Normalisasi path '/images/...' -> '/public/images/...'
    const publicPath = src.startsWith('/public') ? src : `/public${src}`;
    return Boolean(existingAssetsMap[publicPath]);
  }, [src]);

  // Tampilkan placeholder jika file belum ditambahkan atau gagal dimuat
  const shouldShowPlaceholder = !isPhysicallyAvailable || loadFailed;

  return (
    <div
      className={`image-wrapper ${className}`}
      style={{
        aspectRatio,
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#F2EBE1',
      }}
    >
      {shouldShowPlaceholder ? (
        <div
          className="image-placeholder"
          role="img"
          aria-label={alt || placeholderLabel}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: '#F2EBE1',
            color: '#8A7365',
            padding: '12px',
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          {/* Ikon gambar sederhana & rapi */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ opacity: 0.7 }}
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              lineHeight: 1.2,
              opacity: 0.85,
            }}
          >
            {placeholderLabel}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onError={() => setLoadFailed(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            objectPosition: 'center',
            display: 'block',
            transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      )}
    </div>
  );
}
