import { useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Modal Dialog Konfirmasi Pemulihan Produk (Portal Layar Penuh)
 * Mencegah tindakan ganda dan mengunci scroll body saat terbuka.
 */
export default function RestoreProductModal({
  isOpen,
  onClose,
  onConfirm,
  product,
  isRestoring = false,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="product-trash-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isRestoring) onClose();
      }}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="restore-dialog-title"
      aria-describedby="restore-dialog-desc"
    >
      <div className="product-trash-dialog-card admin-animate-fade">
        {/* Ikon Pemulihan / Undo */}
        <div className="product-trash-dialog-icon-wrap" aria-hidden="true">
          <svg
            width="28"
            height="28"
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

        <div className="product-trash-dialog-content">
          <h3 id="restore-dialog-title" className="product-trash-dialog-title">
            Pulihkan produk?
          </h3>
          <p id="restore-dialog-desc" className="product-trash-dialog-desc">
            Produk &lsquo;{product?.name}&rsquo; akan dikembalikan ke Daftar Produk beserta informasi dan fotonya.
          </p>
          <p className="product-trash-dialog-subtext">
            Produk hanya terlihat pelanggan jika dipublikasikan dan kategorinya aktif. Status unggulan perlu diatur kembali melalui Edit Produk.
          </p>
        </div>

        <div className="product-trash-dialog-actions">
          <button
            type="button"
            className="product-trash-btn-dialog secondary"
            onClick={onClose}
            disabled={isRestoring}
          >
            Batal
          </button>
          <button
            type="button"
            className="product-trash-btn-dialog primary"
            onClick={onConfirm}
            disabled={isRestoring}
          >
            Pulihkan Produk
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}
